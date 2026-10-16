import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import { policies } from "./policies.js";

const requiredEnv = ["GEMINI_API_KEY", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

for (const policy of policies) {
  const { embeddings } = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: policy.content,
    config: { taskType: "RETRIEVAL_DOCUMENT", outputDimensionality: 768 },
  });

  const { error } = await supabase.from("policy_chunks").insert({
    content: policy.content,
    source: policy.source,
    embedding: embeddings[0].values,
  });

  if (error) {
    console.error(`Failed to insert "${policy.source}":`, error.message);
  } else {
    console.log(`Inserted: ${policy.source}`);
  }
}
