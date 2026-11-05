import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";

const QUICK = ["How do I get a card?", "Are transfers free?", "Is my money safe?", "Talk to a human"];

const reply = (text) => {
  const t = text.toLowerCase();
  if (t.includes("card")) return { text: "You can design your card in Card Studio and get a virtual card instantly after sign-up.", link: { to: "/cards#customizer", label: "Open Card Studio" } };
  if (t.includes("transfer") || t.includes("send") || t.includes("free")) return { text: "Transfers between HooBank users are always free and instant. International transfers use the real mid-market rate.", link: { to: "/features/global-transfers", label: "See global transfers" } };
  if (t.includes("safe") || t.includes("secur") || t.includes("fraud")) return { text: "Your money is protected with 256-bit encryption, real-time fraud checks and zero-liability card protection.", link: { to: "/security", label: "How we keep you safe" } };
  if (t.includes("price") || t.includes("plan") || t.includes("cost") || t.includes("fee")) return { text: "Starter is free forever. Plus and Premium add more rewards and perks — all with a 30-day free trial.", link: { to: "/pricing", label: "Compare plans" } };
  if (t.includes("human") || t.includes("agent") || t.includes("person")) return { text: "Of course! Our team replies within a few minutes, 24/7.", link: { to: "/contact", label: "Contact support" } };
  return { text: "Great question! Our Help Center has quick answers on accounts, cards, payments and security.", link: { to: "/help", label: "Visit Help Center" } };
};

let nextId = 1;
const makeMsg = (from, text, link) => ({ id: nextId++, from, text, link });

/** Floating mock support chat with canned bot replies + typing indicator. */
const SupportChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState(() => [makeMsg("bot", "Hi there 👋 I’m Hoo, your HooBank assistant. How can I help today?")]);
  const listRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const send = (text) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setMessages((m) => [...m, makeMsg("me", clean)]);
    setInput("");
    setTyping(true);
    timerRef.current = window.setTimeout(() => {
      const r = reply(clean);
      setMessages((m) => [...m, makeMsg("bot", r.text, r.link)]);
      setTyping(false);
    }, 1100);
  };

  return (
    <div className="fixed z-[90] bottom-5 right-5 flex flex-col items-end gap-3">
      {open && (
        <div
          id="support-chat"
          role="dialog"
          aria-label="Support chat"
          className="w-[min(360px,calc(100vw-40px))] h-[min(480px,calc(100vh-120px))] glass bg-[#0b0f1d]/95 rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-fade-up"
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-black-gradient">
            <span className="w-9 h-9 rounded-full bg-blue-gradient text-primary flex items-center justify-center font-poppins font-semibold">H</span>
            <div className="flex-1">
              <p className="font-poppins font-semibold text-white text-[15px]">Hoo Assistant</p>
              <p className="font-poppins text-[12px] text-dimWhite flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online · demo bot
              </p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="w-8 h-8 rounded-full hover:bg-white/10 text-dimWhite hover:text-white flex items-center justify-center">
              <Icon name="x" size={16} />
            </button>
          </div>
          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`max-w-[85%] rounded-[16px] px-4 py-2.5 font-poppins text-[14px] leading-[21px] ${m.from === "me" ? "self-end bg-blue-gradient text-primary rounded-br-[4px]" : "self-start bg-white/5 text-white rounded-bl-[4px]"}`}>
                {m.text}
                {m.link && (
                  <Link to={m.link.to} onClick={() => setOpen(false)} className="block mt-2 text-secondary font-medium hover:underline">
                    {m.link.label} →
                  </Link>
                )}
              </div>
            ))}
            {typing && (
              <div className="self-start bg-white/5 rounded-[16px] px-4 py-3 flex gap-1" aria-label="Assistant is typing">
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            )}
          </div>
          <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
            {QUICK.map((q) => (
              <button key={q} type="button" onClick={() => send(q)} className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 font-poppins text-[12px] text-dimWhite hover:text-white hover:border-secondary/60 transition">
                {q}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 p-3 border-t border-white/10"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message…" aria-label="Message" className="flex-1 min-w-0 rounded-[10px] bg-white/5 border border-white/10 px-3 py-2 font-poppins text-[14px] text-white placeholder:text-white/40 outline-none focus:border-secondary/60" />
            <button type="submit" aria-label="Send message" className="w-10 h-10 rounded-[10px] bg-blue-gradient text-primary flex items-center justify-center">
              <Icon name="send" size={16} />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="support-chat"
        aria-label={open ? "Close support chat" : "Open support chat"}
        className="w-14 h-14 rounded-full bg-blue-gradient text-primary shadow-[0_10px_40px_-8px_rgba(92,225,230,0.6)] flex items-center justify-center btn-glow"
      >
        <Icon name={open ? "x" : "chat"} size={24} />
      </button>
    </div>
  );
};

export default SupportChat;
