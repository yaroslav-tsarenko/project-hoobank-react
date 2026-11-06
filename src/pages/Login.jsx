import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/ui/Container";
import CreditCard from "../components/ui/CreditCard";
import Field from "../components/ui/Field";
import Icon from "../components/ui/Icon";
import { EMAIL_RE } from "../components/widgets/NewsletterForm";
import { useToast } from "../context/ToastContext";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const Login = () => {
  usePageMeta("Log in", "Log in to the Northvault demo workspace.");
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const enterDemo = (message) => {
    setLoading(true);
    window.setTimeout(() => {
      toast({ title: "Welcome back, Alex", description: message });
      navigate("/dashboard");
    }, 700);
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!EMAIL_RE.test(form.email)) next.email = "Enter the email you signed up with.";
    if (form.password.length < 6) next.password = "Passwords are at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    enterDemo("Demo mode: any credentials work and nothing is sent anywhere.");
  };

  return (
    <Container className="py-10 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        <div className="hidden md:flex md:col-span-6 rounded-card bg-forest text-ivory p-10 lg:p-14 flex-col justify-between overflow-hidden">
          <div>
            <p className="font-sans text-[12px] uppercase tracking-[0.14em] text-brass-light">Morgan Studio</p>
            <h1 className="font-serif text-[56px] leading-[1.02] mt-6">
              Welcome <em className="italic">back.</em>
            </h1>
            <p className="font-sans text-[17px] leading-[1.6] text-ivory/80 mt-5 max-w-[400px]">Two invoices were paid while you were away, and the tax pot is 79% of the way to its target.</p>
          </div>
          <div className="w-full max-w-[380px] mt-12 rotate-[-4deg]">
            <CreditCard design={{ color: "ivory", finish: "matte", name: "Alex Morgan", tier: "Studio" }} tilt={false} />
          </div>
        </div>

        <form onSubmit={submit} noValidate className={`md:col-span-6 ${styles.card} p-6 sm:p-10 lg:p-14 w-full flex flex-col gap-5 justify-center`}>
          <div>
            <h2 className="font-serif text-[44px] leading-none text-ink">Log in</h2>
            <p className="font-sans text-muted text-[15px] mt-3">
              New to Northvault?{" "}
              <Link to="/signup" className="text-forest link">
                Open an account
              </Link>
            </p>
          </div>
          <Field label="Email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="you@studio.com" />
          <Field
            label="Password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            right={
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="w-9 h-9 rounded-full text-muted hover:text-ink flex items-center justify-center">
                <Icon name={show ? "eyeOff" : "eye"} size={18} />
              </button>
            }
          />
          <div className="flex items-center justify-between gap-4 font-sans text-[14px]">
            <label className="flex items-center gap-2 text-muted cursor-pointer">
              <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} className="w-4 h-4" />
              Keep me signed in
            </label>
            <Link to="/help" className="text-forest link">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <span className="spinner !w-5 !h-5 !border-2 !border-ivory/30 !border-t-ivory" aria-label="Signing in" /> : "Log in"}
          </Button>
          <div className="flex items-center gap-4 font-sans text-[13px] text-muted">
            <span className="flex-1 h-px bg-line" /> or <span className="flex-1 h-px bg-line" />
          </div>
          <Button variant="outline" onClick={() => enterDemo("You are exploring the demo workspace.")} disabled={loading}>
            <Icon name="key" size={18} /> Use the demo workspace
          </Button>
          <button
            type="button"
            onClick={() => toast({ title: "Passkeys are a mock here", description: "In the concept, passkeys replace passwords entirely.", variant: "info" })}
            className="h-12 rounded-full border border-line hover:border-ink/40 flex items-center justify-center gap-2 font-sans text-[15px] text-ink transition"
          >
            <Icon name="fingerprint" size={18} /> Sign in with a passkey
          </button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
