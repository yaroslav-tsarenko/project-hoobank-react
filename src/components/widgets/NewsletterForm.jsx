import { useId, useState } from "react";
import { useToast } from "../../context/ToastContext";
import Icon from "../ui/Icon";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Newsletter sign-up (mock) — validates and confirms with a toast. `tone="dark"` for forest backgrounds. */
const NewsletterForm = ({ className = "", tone = "light", title = "The Northvault letter", text = "One email a month on tax, currencies and getting paid. No promotions." }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();
  const id = useId();
  const dark = tone === "dark";

  const submit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setEmail("");
    toast({ title: "You are on the list", description: `The next letter goes to ${email}. (Demo — nothing was sent.)` });
  };

  return (
    <form onSubmit={submit} noValidate className={className}>
      <label htmlFor={id} className={`font-serif text-[24px] leading-tight block ${dark ? "text-ivory" : "text-ink"}`}>
        {title}
      </label>
      <p className={`font-sans text-[14px] leading-[1.55] mt-2 mb-4 ${dark ? "text-ivory/75" : "text-muted"}`}>{text}</p>
      <div className={`flex items-center gap-2 border-b pb-2 ${dark ? "border-ivory/30 focus-within:border-ivory" : "border-ink/30 focus-within:border-ink"}`}>
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`flex-1 min-w-0 bg-transparent outline-none font-sans text-[16px] py-1.5 ${dark ? "text-ivory placeholder:text-ivory/50" : "text-ink placeholder:text-faint"}`}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition ${dark ? "bg-ivory text-forest hover:bg-paper" : "bg-forest text-ivory hover:bg-forest-700"}`}
        >
          <Icon name="arrowRight" size={16} strokeWidth={2} />
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className={`font-sans text-[13px] mt-2 ${dark ? "text-brass-light" : "text-negative"}`}>
          {error}
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
