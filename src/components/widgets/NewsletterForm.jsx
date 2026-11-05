import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import styles from "../../style";
import Icon from "../ui/Icon";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Newsletter sign-up (mock) — validates and confirms with a toast. */
const NewsletterForm = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();

  const submit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setEmail("");
    toast({ title: "You're on the list!", description: `We'll send money tips to ${email} twice a month.` });
  };

  return (
    <form onSubmit={submit} noValidate className={className}>
      <label htmlFor="newsletter-email" className="font-poppins font-medium text-[18px] leading-[27px] text-white block">
        Newsletter
      </label>
      <p className="font-poppins text-[14px] text-dimWhite mt-2 mb-4">Money tips and product news. No spam, ever.</p>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "newsletter-error" : undefined}
          className={`${styles.input} py-2.5 min-w-0`}
        />
        <button type="submit" aria-label="Subscribe to newsletter" className="shrink-0 w-12 rounded-[10px] bg-blue-gradient text-primary flex items-center justify-center btn-glow">
          <Icon name="send" size={18} />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className="font-poppins text-[13px] text-red-300 mt-2">
          {error}
        </p>
      )}
    </form>
  );
};

export default NewsletterForm;
