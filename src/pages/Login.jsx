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
  usePageMeta("Log in", "Log in to your HooBank account.");
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const enterDemo = (message) => {
    setLoading(true);
    window.setTimeout(() => {
      toast({ title: "Welcome back, Alex!", description: message });
      navigate("/dashboard");
    }, 800);
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!EMAIL_RE.test(form.email)) next.email = "Enter the email you signed up with.";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    enterDemo("Demo mode: any credentials work. Nothing is sent anywhere.");
  };

  return (
    <Container className="py-10 sm:py-16 relative">
      <div className="absolute w-[40%] h-[50%] right-0 top-0 pink__gradient opacity-50" aria-hidden="true" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
        <div className="hidden md:flex flex-col items-start">
          <h1 className={styles.heading1}>
            Welcome <span className="text-gradient">back.</span>
          </h1>
          <p className={`${styles.paragraph} mt-5 max-w-[440px]`}>Your money is right where you left it — growing, protected and ready to move.</p>
          <div className="w-full max-w-[420px] mt-10 motion-safe:animate-float">
            <CreditCard design={{ color: "ocean", finish: "metal", name: "Alex Morgan", tier: "Premium" }} />
          </div>
        </div>

        <form onSubmit={submit} noValidate className={`${styles.card} p-6 sm:p-10 w-full max-w-[480px] mx-auto flex flex-col gap-5 border-gradient`}>
          <div>
            <h2 className={`${styles.heading3} md:block hidden`}>Log in</h2>
            <h1 className={`${styles.heading3} md:hidden`}>Log in</h1>
            <p className="font-poppins text-dimWhite text-[15px] mt-1">
              New to HooBank?{" "}
              <Link to="/signup" className="text-secondary hover:underline">
                Create an account
              </Link>
            </p>
          </div>
          <Field label="Email" type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="you@example.com" />
          <Field
            label="Password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
            right={
              <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} className="w-9 h-9 rounded-full text-dimWhite hover:text-white flex items-center justify-center">
                <Icon name={show ? "eyeOff" : "eye"} size={18} />
              </button>
            }
          />
          <div className="flex items-center justify-between gap-4 font-poppins text-[14px]">
            <label className="flex items-center gap-2 text-dimWhite cursor-pointer">
              <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })} className="w-4 h-4 accent-[#5ce1e6]" />
              Remember me
            </label>
            <Link to="/help" className="text-secondary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <span className="spinner !w-5 !h-5 !border-2" aria-label="Signing in" /> : "Log in"}
          </Button>
          <div className="flex items-center gap-4 font-poppins text-[13px] text-dimWhite">
            <span className="flex-1 h-px bg-white/10" /> or <span className="flex-1 h-px bg-white/10" />
          </div>
          <Button variant="outline" onClick={() => enterDemo("You’re exploring the demo account.")} disabled={loading}>
            <Icon name="sparkles" size={18} /> Continue with demo account
          </Button>
          <div className="grid grid-cols-2 gap-3">
            {[
              { name: "Google", icon: "globe" },
              { name: "Apple", icon: "smartphone" },
            ].map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => toast({ title: `${p.name} sign-in is a mock`, description: "Social login isn’t wired up in this demo.", variant: "info" })}
                className="rounded-[10px] border border-white/10 hover:border-white/30 py-3 flex items-center justify-center gap-2 font-poppins text-[15px] text-white transition"
              >
                <Icon name={p.icon} size={18} /> {p.name}
              </button>
            ))}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;
