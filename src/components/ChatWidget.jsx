import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { business } from "../data/site";

const WELCOME_MESSAGE = {
  role: "assistant",
  content: `Hi, I'm the virtual assistant for ${business.name}. Ask me about Express Entry, PNP, study or work permits, sponsorship, or anything else — and I can point you toward booking a free consultation.`,
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  async function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("The chat service isn't reachable right now.");
      }

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 flex h-[28rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white shadow-xl shadow-navy-950/15"
          >
            <div className="flex items-center justify-between bg-navy-950 px-5 py-4 text-cream-50">
              <div>
                <p className="font-display text-sm font-semibold">{business.name}</p>
                <p className="text-xs text-cream-50/60">Usually replies in a few seconds</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1 text-cream-50/70 transition-colors hover:bg-white/10 hover:text-cream-50"
              >
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-navy-950 text-cream-50"
                        : "bg-cream-100 text-ink-900"
                    }`}
                  >
                    {m.content}
                  </p>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <p className="rounded-2xl bg-cream-100 px-4 py-2 text-sm text-ink-500">Typing…</p>
                </div>
              )}
              {error && (
                <div className="flex justify-start">
                  <p className="max-w-[85%] rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>

            <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-navy-900/10 px-3 py-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question…"
                className="flex-1 rounded-full border border-navy-900/10 bg-cream-50 px-4 py-2 text-sm text-ink-900 outline-none focus:border-gold-500"
                disabled={loading}
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-500 text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-40"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-navy-950 shadow-lg shadow-navy-950/25 transition-colors hover:bg-gold-400"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
