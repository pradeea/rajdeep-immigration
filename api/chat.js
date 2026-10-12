import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import { business, services, process as processSteps } from "../src/data/site.js";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : null;

const MODEL = "gemini-3.5-flash-lite";
const EMBEDDING_MODEL = "gemini-embedding-001";
const EMBEDDING_DIMENSIONS = 768;
const RETRY_DELAYS_MS = [400, 1200];
const MAX_HISTORY_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;
const POLICY_MATCH_COUNT = 4;

function buildSystemInstruction() {
  const serviceList = services
    .map((s) => `- ${s.title}: ${s.description}`)
    .join("\n");
  const processList = processSteps
    .map((p) => `${p.step}. ${p.title} — ${p.description}`)
    .join("\n");

  return `You are the virtual assistant for ${business.name}, the immigration consulting practice of ${business.founder}, a ${business.credential}. You appear as a chat widget on the practice's website.

TONE: Warm, clear, professional, concise. Plain language, no legal jargon. Never sound robotic or overly formal.

SERVICES OFFERED:
${serviceList}

TYPICAL PROCESS:
${processList}

CONTACT & BOOKING:
- Book a free consultation via Calendly: ${business.calendlyUrl}
- Phone: ${business.phone}
- WhatsApp: ${business.whatsapp}
- Email: ${business.email}
- Address: ${business.addressLine1}, ${business.addressLine2}
- Instagram: ${business.instagramHandle} (${business.instagramUrl})

YOUR JOB:
1. Answer general questions about Canadian immigration pathways and which of the services above might fit the visitor's situation.
2. When a visitor seems ready to move forward, or asks how to book/get started, actively guide them to book a free consultation at ${business.calendlyUrl} — mention it by name and encourage them to click it. You cannot book the appointment yourself or access the calendar; you can only point them to the link.
3. If they'd rather talk directly, offer the phone number or WhatsApp link.

BOUNDARIES:
- You are NOT a Regulated Canadian Immigration Consultant and must never give definitive legal advice, guarantee outcomes, or assess someone's individual eligibility with certainty. Only a licensed RCIC (Rajdeep) can do that after a proper consultation.
- For anything specific to someone's personal case (exact eligibility, timelines, document review), say that's exactly what the free consultation is for, and point them to booking.
- If asked about something unrelated to immigration or this business, politely redirect to how you can help with their immigration questions.
- Keep answers short (2-4 sentences) unless the visitor asks for detail. This is a chat widget, not an essay.`;
}

function sanitizeMessages(rawMessages) {
  if (!Array.isArray(rawMessages)) return null;

  const trimmed = rawMessages.slice(-MAX_HISTORY_MESSAGES);
  const cleaned = [];

  for (const m of trimmed) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) continue;
    if (typeof m.content !== "string" || !m.content.trim()) continue;
    cleaned.push({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content.slice(0, MAX_MESSAGE_LENGTH) }],
    });
  }

  return cleaned;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retrievePolicyContext(question) {
  if (!supabase || !question) return "";

  try {
    const { embeddings } = await ai.models.embedContent({
      model: EMBEDDING_MODEL,
      contents: question,
      config: { taskType: "RETRIEVAL_QUERY", outputDimensionality: EMBEDDING_DIMENSIONS },
    });

    const { data, error } = await supabase.rpc("match_policy_chunks", {
      query_embedding: embeddings[0].values,
      match_count: POLICY_MATCH_COUNT,
    });

    if (error) {
      console.error("Policy retrieval error:", error.message);
      return "";
    }

    return (data ?? []).map((row) => `[${row.source}]\n${row.content}`).join("\n\n");
  } catch (err) {
    console.error("Policy retrieval failed:", err);
    return "";
  }
}

async function generateWithRetry(params) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await ai.models.generateContent(params);
    } catch (err) {
      const isOverloaded = err?.status === 503;
      if (!isOverloaded || attempt >= RETRY_DELAYS_MS.length) throw err;
      await sleep(RETRY_DELAYS_MS[attempt]);
    }
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!process.env.GEMINI_API_KEY) {
    res.status(500).json({ error: "Chat is not configured yet." });
    return;
  }

  const contents = sanitizeMessages(req.body?.messages);

  if (!contents || contents.length === 0) {
    res.status(400).json({ error: "No message provided." });
    return;
  }

  try {
    const lastUserMessage = [...contents].reverse().find((m) => m.role === "user")?.parts?.[0]?.text ?? "";
    const policyContext = await retrievePolicyContext(lastUserMessage);
    const systemInstruction =
      buildSystemInstruction() +
      (policyContext
        ? `\n\nRELEVANT POLICY REFERENCE (use this to answer accurately; paraphrase, don't quote verbatim):\n${policyContext}`
        : "");

    const response = await generateWithRetry({
      model: MODEL,
      contents,
      config: {
        systemInstruction,
        maxOutputTokens: 500,
      },
    });

    const text = response.text;

    res.status(200).json({ reply: text });
  } catch (err) {
    console.error("Chat API error:", err);
    res.status(502).json({ error: "The assistant is unavailable right now. Please try again shortly." });
  }
}
