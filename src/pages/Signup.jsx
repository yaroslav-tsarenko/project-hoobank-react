import { useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/ui/Container";
import CreditCard from "../components/ui/CreditCard";
import Field from "../components/ui/Field";
import Icon from "../components/ui/Icon";
import Segmented from "../components/ui/Segmented";
import { CARD_STORAGE_KEY } from "../components/widgets/CardCustomizer";
import { EMAIL_RE } from "../components/widgets/NewsletterForm";
import { cardColors, cardFinishes, defaultCardDesign } from "../constants/cards";
import { plans } from "../constants/pricing";
import { useToast } from "../context/ToastContext";
import useLocalStorage from "../hooks/useLocalStorage";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const STEPS = ["Account", "Security", "Plan", "Card", "Review"];
const COUNTRIES = ["United States", "United Kingdom", "Ukraine", "Germany", "Poland", "France", "Spain", "Other"];

const RULES = [
  { id: "len", label: "8+ characters", test: (p) => p.length >= 8 },
  { id: "upper", label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "num", label: "Number", test: (p) => /\d/.test(p) },
  { id: "sym", label: "Symbol", test: (p) => /[^A-Za-z0-9]/.test(p) },
];
const STRENGTH = [
  { label: "Too weak", color: "#f87171" },
  { label: "Weak", color: "#fb923c" },
  { label: "Fair", color: "#f6c26b" },
  { label: "Good", color: "#7de7eb" },
  { label: "Strong", color: "#5ce1e6" },
];

const Confetti = () => (
  <div className="absolute inset-x-0 top-0 h-0 pointer-events-none" aria-hidden="true">
    {Array.from({ length: 36 }, (_, i) => (
      <span
        key={i}
        className="confetti-piece"
        style={{
          left: `${(i * 29) % 100}%`,
          background: ["#5ce1e6", "#fc67fa", "#f6c26b", "#def9fa"][i % 4],
          "--dx": `${((i * 47) % 160) - 80}px`,
          "--rot": `${360 + ((i * 53) % 540)}deg`,
          "--delay": `${(i % 9) * 0.08}s`,
          "--dur": `${2 + (i % 5) * 0.3}s`,
        }}
      />
    ))}
  </div>
);

const Stepper = ({ step }) => (
  <ol className="flex items-center gap-2 mb-10" aria-label="Sign-up progress">
    {STEPS.map((s, i) => {
      const done = i < step;
      const current = i === step;
      return (
        <li key={s} className="flex-1 flex flex-col gap-2" aria-current={current ? "step" : undefined}>
          <span className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <span className={`block h-full bg-blue-gradient transition-all duration-500 ${done || current ? "w-full" : "w-0"} ${current ? "opacity-70" : ""}`} />
          </span>
          <span className={`font-poppins text-[12px] hidden xs:block ${current ? "text-white" : done ? "text-secondary" : "text-dimWhite"}`}>
            {done && <Icon name="check" size={12} className="inline mr-1" />}
            {s}
          </span>
        </li>
      );
    })}
  </ol>
);

const Signup = () => {
  usePageMeta("Open an account", "Open a HooBank account in minutes — choose a plan, design your card and start spending.");
  const [params] = useSearchParams();
  const toast = useToast();
  const [, saveCard] = useLocalStorage(CARD_STORAGE_KEY, defaultCardDesign);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const formRef = useRef(null);

  const scrollToForm = () => {
    const el = formRef.current;
    if (el && el.getBoundingClientRect().top < 80) el.scrollIntoView({ block: "start" });
  };
  const goTo = (n) => {
    setStep(n);
    scrollToForm();
  };
  const [data, setData] = useState(() => ({
    name: "",
    email: "",
    country: "United States",
    password: "",
    confirm: "",
    terms: false,
    plan: plans.some((p) => p.id === params.get("plan")) ? params.get("plan") : "plus",
    billing: params.get("billing") === "monthly" ? "monthly" : "annual",
    color: "cyan",
    finish: "glossy",
  }));

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const passed = RULES.filter((r) => r.test(data.password)).length;
  const strength = STRENGTH[data.password ? passed : 0];
  const plan = plans.find((p) => p.id === data.plan);
  const price = data.billing === "annual" ? plan.annual : plan.monthly;
  const firstName = data.name.trim().split(" ")[0] || "there";

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (data.name.trim().length < 2) e.name = "Please enter your full name.";
      if (!EMAIL_RE.test(data.email)) e.email = "Please enter a valid email address.";
    }
    if (step === 1) {
      if (passed < 3) e.password = "Choose a stronger password (meet at least 3 rules).";
      if (data.confirm !== data.password) e.confirm = "Passwords don’t match.";
      if (!data.terms) e.terms = "Please accept the terms to continue.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (step < STEPS.length - 1) {
      goTo(step + 1);
      return;
    }
    saveCard({ color: data.color, finish: data.finish, name: data.name.trim(), tier: plan.id === "starter" ? "Classic" : plan.name });
    setDone(true);
    window.scrollTo({ top: 0, behavior: "instant" });
    toast({ title: "Account created 🎉", description: "Demo account — no data left your browser." });
  };

  const design = { color: data.color, finish: data.finish, name: data.name || "Your Name", tier: plan.id === "starter" ? "Classic" : plan.name };

  if (done) {
    return (
      <Container className="py-16">
        <div className={`${styles.card} relative overflow-hidden p-8 sm:p-14 max-w-[640px] mx-auto text-center border-gradient`}>
          <Confetti />
          <span className="w-20 h-20 mx-auto rounded-full bg-blue-gradient text-primary flex items-center justify-center animate-pop-in">
            <svg viewBox="0 0 24 24" className="w-10 h-10 check-draw" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <h1 className={`${styles.heading2} mt-8`}>
            Welcome aboard, <span className="text-gradient">{firstName}!</span>
          </h1>
          <p className={`${styles.paragraph} mt-4`}>
            Your {plan.name} account is ready and your card is on its way. We sent a (pretend) confirmation to {data.email}.
          </p>
          <div className="max-w-[360px] mx-auto mt-10">
            <CreditCard design={design} />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Button to="/dashboard">Go to dashboard</Button>
            <Button to="/cards#customizer" variant="outline">
              Customize card
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-16 relative">
      <div className="absolute w-[50%] h-[60%] left-0 top-0 blue__gradient" aria-hidden="true" />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_380px] gap-10 items-start relative">
        <form ref={formRef} onSubmit={next} noValidate className={`${styles.card} p-6 sm:p-10 scroll-mt-28`}>
          <p className="font-poppins text-[14px] text-dimWhite">
            Step {step + 1} of {STEPS.length}
          </p>
          <h1 className={`${styles.heading3} mb-6`}>
            {["Create your account", "Secure your account", "Choose your plan", "Design your card", "Review & confirm"][step]}
          </h1>
          <Stepper step={step} />

          <div key={step} className="animate-fade-up flex flex-col gap-5">
            {step === 0 && (
              <>
                <Field label="Full name" value={data.name} onChange={set("name")} error={errors.name} autoComplete="name" placeholder="Alex Morgan" autoFocus />
                <Field label="Email" type="email" value={data.email} onChange={set("email")} error={errors.email} autoComplete="email" placeholder="you@example.com" />
                <Field as="select" label="Country of residence" value={data.country} onChange={set("country")}>
                  {COUNTRIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <Field
                  label="Password"
                  type={showPw ? "text" : "password"}
                  value={data.password}
                  onChange={set("password")}
                  error={errors.password}
                  autoComplete="new-password"
                  autoFocus
                  right={
                    <button type="button" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? "Hide password" : "Show password"} className="w-9 h-9 rounded-full text-dimWhite hover:text-white flex items-center justify-center">
                      <Icon name={showPw ? "eyeOff" : "eye"} size={18} />
                    </button>
                  }
                />
                <div aria-live="polite">
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className="flex-1 h-1.5 rounded-full transition-colors duration-300" style={{ background: data.password && i < passed ? strength.color : "rgba(255,255,255,0.1)" }} />
                    ))}
                  </div>
                  <p className="font-poppins text-[13px] mt-2" style={{ color: data.password ? strength.color : "rgba(255,255,255,0.5)" }}>
                    Strength: {data.password ? strength.label : "—"}
                  </p>
                  <ul className="grid grid-cols-2 gap-2 mt-3">
                    {RULES.map((r) => {
                      const ok = r.test(data.password);
                      return (
                        <li key={r.id} className={`font-poppins text-[13px] flex items-center gap-2 transition-colors ${ok ? "text-secondary" : "text-dimWhite"}`}>
                          <Icon name={ok ? "check" : "x"} size={14} /> {r.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Field label="Confirm password" type={showPw ? "text" : "password"} value={data.confirm} onChange={set("confirm")} error={errors.confirm} autoComplete="new-password" />
                <div>
                  <label className="flex items-start gap-3 font-poppins text-[14px] text-dimWhite cursor-pointer">
                    <input type="checkbox" checked={data.terms} onChange={set("terms")} className="w-4 h-4 mt-1 accent-[#5ce1e6]" aria-invalid={errors.terms ? true : undefined} />
                    <span>
                      I agree to the{" "}
                      <Link to="/terms" target="_blank" className="text-secondary hover:underline">
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" target="_blank" className="text-secondary hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.terms && <p className="font-poppins text-[13px] text-red-300 mt-2">{errors.terms}</p>}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <Segmented
                  label="Billing period"
                  value={data.billing}
                  onChange={(v) => setData((d) => ({ ...d, billing: v }))}
                  className="self-start"
                  options={[
                    { value: "monthly", label: "Monthly" },
                    { value: "annual", label: "Annual · −20%" },
                  ]}
                />
                <div role="radiogroup" aria-label="Plan" className="grid gap-3">
                  {plans.map((p) => {
                    const on = data.plan === p.id;
                    const pr = data.billing === "annual" ? p.annual : p.monthly;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => setData((d) => ({ ...d, plan: p.id }))}
                        className={`text-left rounded-[16px] border p-5 flex items-center gap-4 transition ${on ? "border-secondary/70 bg-white/5" : "border-white/10 hover:border-white/30"}`}
                      >
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${on ? "border-secondary" : "border-white/30"}`}>
                          {on && <span className="w-2.5 h-2.5 rounded-full bg-secondary" />}
                        </span>
                        <span className="flex-1">
                          <span className="font-poppins font-semibold text-white text-[17px]">{p.name}</span>
                          {p.popular && <span className="ml-2 rounded-full bg-blue-gradient text-primary text-[11px] font-poppins font-medium px-2 py-0.5">Popular</span>}
                          <span className="block font-poppins text-dimWhite text-[13px] mt-1">{p.description}</span>
                        </span>
                        <span className="font-poppins font-semibold text-white">{pr ? `$${pr}/mo` : "Free"}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <fieldset>
                  <legend className={styles.label}>Colour</legend>
                  <div className="flex flex-wrap gap-3">
                    {cardColors.map((c) => (
                      <button key={c.id} type="button" aria-label={c.name} aria-pressed={data.color === c.id} onClick={() => setData((d) => ({ ...d, color: c.id }))} className={`w-11 h-11 rounded-full transition ring-offset-2 ring-offset-[#11101d] ${data.color === c.id ? "ring-2 ring-secondary scale-110" : "hover:scale-105"}`} style={{ background: c.background }} />
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className={styles.label}>Finish</legend>
                  <div className="flex flex-wrap gap-2">
                    {cardFinishes.map((f) => (
                      <button key={f.id} type="button" aria-pressed={data.finish === f.id} onClick={() => setData((d) => ({ ...d, finish: f.id }))} className={`${styles.chip} ${data.finish === f.id ? styles.chipActive : styles.chipIdle}`}>
                        {f.name}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="md:hidden">
                  <CreditCard design={design} />
                </div>
              </>
            )}

            {step === 4 && (
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["Name", data.name],
                  ["Email", data.email],
                  ["Country", data.country],
                  ["Plan", `${plan.name} · ${price ? `$${price}/mo (${data.billing})` : "Free"}`],
                  ["Card", `${cardColors.find((c) => c.id === data.color).name}, ${cardFinishes.find((f) => f.id === data.finish).name}`],
                  ["Password", "•".repeat(Math.min(data.password.length, 12))],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-[14px] bg-white/5 p-4 min-w-0">
                    <dt className="font-poppins text-[13px] text-dimWhite">{k}</dt>
                    <dd className="font-poppins text-white truncate">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 mt-10">
            {step > 0 ? (
              <Button variant="ghost" size="sm" onClick={() => goTo(step - 1)}>
                <Icon name="arrowLeft" size={16} /> Back
              </Button>
            ) : (
              <Link to="/login" className="font-poppins text-[14px] text-dimWhite hover:text-white">
                Have an account? <span className="text-secondary">Log in</span>
              </Link>
            )}
            <Button type="submit">
              {step === STEPS.length - 1 ? "Create account" : "Continue"} <Icon name="arrowRight" size={18} />
            </Button>
          </div>
        </form>

        <aside className="hidden md:flex flex-col gap-6 sticky top-28">
          <div className="motion-safe:animate-float">
            <CreditCard design={design} />
          </div>
          <div className={`${styles.glassCard} p-6`}>
            <p className="font-poppins text-dimWhite text-[13px]">Your plan</p>
            <p className="font-poppins font-semibold text-white text-[20px]">
              {plan.name} <span className="text-gradient">{price ? `$${price}/mo` : "Free"}</span>
            </p>
            <ul className="flex flex-col gap-2 mt-4">
              {plan.features.slice(0, 4).map((f) => (
                <li key={f} className="flex gap-2 font-poppins text-[13px] text-dimWhite">
                  <Icon name="check" size={14} className="text-secondary mt-[3px]" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Container>
  );
};

export default Signup;
