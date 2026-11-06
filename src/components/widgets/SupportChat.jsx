import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import { LogoMark } from "../ui/Logo";

const QUICK = ["What does FX cost?", "How do tax pots work?", "Can my accountant log in?", "Talk to a person"];

const reply = (text) => {
  const t = text.toLowerCase();
  if (t.includes("fx") || t.includes("currenc") || t.includes("convert") || t.includes("rate"))
    return { text: "You get the mid-market rate plus 0.55% on Solo, 0.35% on Studio or 0.25% on Team. The final amount is shown before you confirm.", link: { to: "/features/multi-currency-accounts", label: "Multi-currency accounts" } };
  if (t.includes("tax") || t.includes("pot") || t.includes("vat"))
    return { text: "Set a rule once, for example 25% to tax, and it runs on every client payment as it arrives. Pots stay inside your account.", link: { to: "/features/tax-pots", label: "Tax and reserve pots" } };
  if (t.includes("accountant") || t.includes("access") || t.includes("team") || t.includes("role"))
    return { text: "Yes. The Accountant role can view transactions and export statements, but cannot move money or change cards.", link: { to: "/security", label: "Roles and security" } };
  if (t.includes("card")) return { text: "Virtual cards are ready immediately; physical cards arrive in 3–5 working days. You can design yours in the card designer.", link: { to: "/cards#customizer", label: "Open the card designer" } };
  if (t.includes("price") || t.includes("plan") || t.includes("cost") || t.includes("fee"))
    return { text: "Solo is free. Studio is $12 a month and Team is $29 a month, both less on annual billing. Every fee is listed on one page.", link: { to: "/pricing", label: "See pricing" } };
  if (t.includes("person") || t.includes("human") || t.includes("agent"))
    return { text: "Of course. In this concept, the contact form is the way to reach the team.", link: { to: "/contact", label: "Contact support" } };
  return { text: "The help centre covers accounts, cards, payments and security in short answers.", link: { to: "/help", label: "Visit the help centre" } };
};

let nextId = 1;
const makeMsg = (from, text, link) => ({ id: nextId++, from, text, link });

/** Floating mock support chat with canned replies and a typing indicator. */
const SupportChat = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState(() => [makeMsg("bot", "Hello. Ask about fees, currencies, cards or tax pots and I will point you to the right place.")]);
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
    }, 900);
  };

  return (
    <div className="fixed z-[90] bottom-5 right-5 flex flex-col items-end gap-3">
      {open && (
        <div
          id="support-chat"
          role="dialog"
          aria-label="Support chat"
          className="w-[min(360px,calc(100vw-40px))] h-[min(500px,calc(100vh-120px))] bg-paper border border-line rounded-card shadow-float flex flex-col overflow-hidden animate-fade-up"
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-line">
            <LogoMark size={32} />
            <div className="flex-1">
              <p className="font-sans font-semibold text-ink text-[15px]">Northvault support</p>
              <p className="font-sans text-[12px] text-muted">Demo assistant with canned answers</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="w-8 h-8 rounded-full hover:bg-sand text-muted hover:text-ink flex items-center justify-center">
              <Icon name="x" size={16} />
            </button>
          </div>
          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-ivory/60" aria-live="polite">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-[12px] px-3.5 py-2.5 font-sans text-[14px] leading-[1.5] ${m.from === "me" ? "self-end bg-forest text-ivory rounded-br-[3px]" : "self-start bg-paper border border-line text-ink rounded-bl-[3px]"}`}
              >
                {m.text}
                {m.link && (
                  <Link to={m.link.to} onClick={() => setOpen(false)} className="flex items-center gap-1 mt-2 text-forest font-medium link">
                    {m.link.label} <Icon name="arrowRight" size={14} />
                  </Link>
                )}
              </div>
            ))}
            {typing && (
              <div className="self-start bg-paper border border-line rounded-[12px] px-4 py-3 flex gap-1" aria-label="Assistant is typing">
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-ink" />
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-ink" />
                <span className="typing-dot w-1.5 h-1.5 rounded-full bg-ink" />
              </div>
            )}
          </div>
          <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-line">
            {QUICK.map((q) => (
              <button key={q} type="button" onClick={() => send(q)} className="shrink-0 rounded-full border border-line bg-paper px-3 py-1.5 font-sans text-[12px] text-muted hover:text-ink hover:border-ink/40 transition">
                {q}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question"
              aria-label="Message"
              className="flex-1 min-w-0 rounded-full bg-ivory border border-line px-4 py-2 font-sans text-[14px] text-ink placeholder:text-faint outline-none focus:border-forest"
            />
            <button type="submit" aria-label="Send message" className="w-10 h-10 rounded-full bg-forest text-ivory flex items-center justify-center hover:bg-forest-700">
              <Icon name="arrowRight" size={16} strokeWidth={2} />
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
        className="h-12 pl-4 pr-5 rounded-full bg-forest text-ivory shadow-float flex items-center gap-2 font-sans text-[14px] font-medium hover:bg-forest-700 transition-colors"
      >
        <Icon name={open ? "x" : "chat"} size={18} />
        {open ? "Close" : "Questions?"}
      </button>
    </div>
  );
};

export default SupportChat;
