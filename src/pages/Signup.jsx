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

const STEPS = ["Business", "Security", "Plan", "Card", "Review"];
const TITLES = ["Tell us about the business", "Secure the workspace", "Choose a plan", "Choose your card", "Check and confirm"];
const COUNTRIES = ["Germany", "United Kingdom", "United States", "France", "Netherlands", "Poland", "Portugal", "Spain", "Ukraine", "Other"];
const TYPES = ["Sole trader / freelancer", "Limited company", "Partnership"];

const RULES = [
  { id: "len", label: "12+ characters", test: (p) => p.length >= 12 },
  { id: "upper", label: "An uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { id: "num", label: "A number", test: (p) => /\d/.test(p) },
  { id: "sym", label: "A symbol", test: (p) => /[^A-Za-z0-9]/.test(p) },
];
const STRENGTH = [
  { label: "Too weak", color: "#9c3a2b" },
  { label: "Weak", color: "#9c3a2b" },
  { label: "Fair", color: "#80601f" },
  { label: "Good", color: "#22604a" },
  { label: "Strong", color: "#0e3b2c" },
];

const Stepper = ({ step }) => (
  <ol className="grid grid-cols-5 gap-2 mb-10" aria-label="Sign-up progress">
    {STEPS.map((s, i) => {
      const done = i < step;
      const current = i === step;
      return (
        <li key={s} className="flex flex-col gap-2" aria-current={current ? "step" : undefined}>
          <span className="h-[2px] bg-line overflow-hidden">
            <span className={`block h-full bg-forest transition-all duration-500 ${done || current ? "w-full" : "w-0"}`} />
          </span>
          <span className={`font-sans text-[12px] hidden xs:flex items-center gap-1 ${current ? "text-ink font-medium" : done ? "text-forest" : "text-muted"}`}>
            {done && <Icon name="check" size={12} strokeWidth={2.4} />}
            {s}
          </span>
        </li>
      );
    })}
  </ol>
);

const Signup = () => {
  usePageMeta("Open an account", "Open a Northvault workspace: business details, security, plan and card. A concept flow; nothing leaves your browser.");
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
    business: "",
    email: "",
    country: "Germany",
    type: TYPES[0],
    password: "",
    confirm: "",
    terms: false,
    plan: plans.some((p) => p.id === params.get("plan")) ? params.get("plan") : "studio",
    billing: params.get("billing") === "monthly" ? "monthly" : "annual",
    color: "forest",
    finish: "matte",
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
      if (passed < 3) e.password = "Choose a stronger password (meet at least three rules).";
      if (data.confirm !== data.password) e.confirm = "The passwords do not match.";
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
    saveCard({ color: data.color, finish: data.finish, name: data.name.trim(), tier: plan.name });
    setDone(true);
    window.scrollTo({ top: 0, behavior: "instant" });
    toast({ title: "Workspace created", description: "Demo only: no data left your browser." });
  };

  const design = { color: data.color, finish: data.finish, name: data.name || "Your Name", tier: plan.name };

  if (done) {
    return (
      <Container className="py-16 sm:py-24">
        <div className={`${styles.card} p-8 sm:p-14 max-w-[680px] mx-auto text-center`}>
          <span className="w-16 h-16 mx-auto rounded-full bg-forest text-ivory flex items-center justify-center animate-pop-in">
            <svg viewBox="0 0 24 24" className="w-8 h-8 check-draw" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <h1 className="font-serif text-[44px] sm:text-[56px] leading-[1.05] text-ink mt-8">
            Welcome, <em className="italic text-forest">{firstName}.</em>
          </h1>
          <p className="font-sans text-[17px] leading-[1.6] text-muted mt-4 max-w-[480px] mx-auto">
            {data.business ? `${data.business} is` : "Your workspace is"} set up on {plan.name}. In a real launch, a confirmation would go to {data.email}; here, nothing was sent.
          </p>
          <div className="max-w-[340px] mx-auto mt-10">
            <CreditCard design={design} />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <Button to="/dashboard">Go to the workspace</Button>
            <Button to="/cards#customizer" variant="outline">
              Adjust the card
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-16">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        <form ref={formRef} onSubmit={next} noValidate className={`md:col-span-7 ${styles.card} p-6 sm:p-10 scroll-mt-28`}>
          <p className="font-sans text-[13px] text-muted num">
            Step {step + 1} of {STEPS.length}
          </p>
          <h1 className="font-serif text-[38px] sm:text-[44px] leading-[1.05] text-ink mt-1 mb-8">{TITLES[step]}</h1>
          <Stepper step={step} />

          <div key={step} className="animate-fade-up flex flex-col gap-5">
            {step === 0 && (
              <>
                <Field label="Your full name" value={data.name} onChange={set("name")} error={errors.name} autoComplete="name" placeholder="Alex Morgan" autoFocus />
                <Field label="Trading name (optional)" value={data.business} onChange={set("business")} autoComplete="organization" placeholder="Morgan Studio" />
                <Field label="Work email" type="email" value={data.email} onChange={set("email")} error={errors.email} autoComplete="email" placeholder="you@studio.com" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field as="select" label="Country of business" value={data.country} onChange={set("country")}>
                    {COUNTRIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Field>
                  <Field as="select" label="Business type" value={data.type} onChange={set("type")}>
                    {TYPES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Field>
                </div>
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
                    <button type="button" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? "Hide password" : "Show password"} className="w-9 h-9 rounded-full text-muted hover:text-ink flex items-center justify-center">
                      <Icon name={showPw ? "eyeOff" : "eye"} size={18} />
                    </button>
                  }
                />
                <div aria-live="polite">
                  <div className="flex gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <span key={i} className="flex-1 h-[3px] transition-colors duration-300" style={{ background: data.password && i < passed ? strength.color : "#dcd5c6" }} />
                    ))}
                  </div>
                  <p className="font-sans text-[13px] mt-2" style={{ color: data.password ? strength.color : "#4f5651" }}>
                    Strength: {data.password ? strength.label : "not set"}
                  </p>
                  <ul className="grid grid-cols-2 gap-2 mt-3">
                    {RULES.map((r) => {
                      const ok = r.test(data.password);
                      return (
                        <li key={r.id} className={`font-sans text-[13px] flex items-center gap-2 transition-colors ${ok ? "text-forest" : "text-muted"}`}>
                          <Icon name={ok ? "check" : "minus"} size={14} strokeWidth={2} /> {r.label}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Field label="Confirm password" type={showPw ? "text" : "password"} value={data.confirm} onChange={set("confirm")} error={errors.confirm} autoComplete="new-password" />
                <p className="font-sans text-[13px] text-muted">After sign-up, the concept replaces this password with a passkey on your device.</p>
                <div>
                  <label className="flex items-start gap-3 font-sans text-[14px] text-muted cursor-pointer">
                    <input type="checkbox" checked={data.terms} onChange={set("terms")} className="w-4 h-4 mt-0.5" aria-invalid={errors.terms ? true : undefined} />
                    <span>
                      I understand Northvault is a concept and agree to the{" "}
                      <Link to="/terms" target="_blank" className="text-forest link">
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" target="_blank" className="text-forest link">
                        Privacy notice
                      </Link>
                      .
                    </span>
                  </label>
                  {errors.terms && <p className="font-sans text-[13px] text-negative mt-2">{errors.terms}</p>}
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
                    { value: "annual", label: "Yearly, about 17% less" },
                  ]}
                />
                <div role="radiogroup" aria-label="Plan" className="border-t border-line">
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
                        className={`w-full text-left border-b border-line px-3 py-5 flex items-center gap-4 transition ${on ? "bg-forest-50" : "hover:bg-sand/50"}`}
                      >
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${on ? "border-forest" : "border-ink/30"}`}>{on && <span className="w-2.5 h-2.5 rounded-full bg-forest" />}</span>
                        <span className="flex-1">
                          <span className="font-serif text-[26px] leading-none text-ink">{p.name}</span>
                          {p.popular && <span className="ml-3 font-sans text-[11px] uppercase tracking-[0.12em] text-brass-dark">Most chosen</span>}
                          <span className="block font-sans text-muted text-[14px] mt-1.5">{p.description}</span>
                        </span>
                        <span className="font-sans font-medium text-ink num">{pr ? `$${pr}/mo` : "Free"}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <fieldset>
                  <legend className={styles.label}>Material</legend>
                  <div className="grid grid-cols-3 xs:grid-cols-6 gap-2">
                    {cardColors.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={data.color === c.id}
                        onClick={() => setData((d) => ({ ...d, color: c.id }))}
                        className={`rounded-control border p-1.5 transition ${data.color === c.id ? "border-forest ring-1 ring-forest" : "border-line hover:border-ink/40"}`}
                      >
                        <span className="block h-8 rounded-[4px]" style={{ background: c.background }} />
                        <span className="block font-sans text-[12px] text-ink mt-1">{c.name}</span>
                      </button>
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
              <dl className="border-t border-line">
                {[
                  ["Name", data.name],
                  ["Business", data.business || "Not provided"],
                  ["Email", data.email],
                  ["Country and type", `${data.country} · ${data.type}`],
                  ["Plan", `${plan.name} · ${price ? `$${price}/mo, billed ${data.billing === "annual" ? "yearly" : "monthly"}` : "Free"}`],
                  ["Card", `${cardColors.find((c) => c.id === data.color).name}, ${cardFinishes.find((f) => f.id === data.finish).name.toLowerCase()}`],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[130px_1fr] gap-4 py-3 border-b border-line font-sans text-[15px]">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-ink truncate">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 mt-10 pt-6 border-t border-line">
            {step > 0 ? (
              <Button variant="ghost" size="sm" onClick={() => goTo(step - 1)}>
                <Icon name="arrowLeft" size={16} /> Back
              </Button>
            ) : (
              <Link to="/login" className="font-sans text-[14px] text-muted hover:text-ink">
                Already have a workspace? <span className="text-forest link">Log in</span>
              </Link>
            )}
            <Button type="submit">
              {step === STEPS.length - 1 ? "Create workspace" : "Continue"} <Icon name="arrowRight" size={16} />
            </Button>
          </div>
        </form>

        <aside className="hidden md:flex md:col-span-5 flex-col gap-6 sticky top-28">
          <div className="rounded-card bg-sand/70 border border-line p-10">
            <CreditCard design={design} />
          </div>
          <div className={`${styles.card} p-6`}>
            <p className="font-sans text-muted text-[13px]">Your plan</p>
            <p className="flex items-baseline justify-between mt-1">
              <span className="font-serif text-[32px] leading-none text-ink">{plan.name}</span>
              <span className="font-sans font-medium text-ink num">{price ? `$${price}/mo` : "Free"}</span>
            </p>
            <ul className="mt-5 border-t border-line">
              {plan.features.slice(0, 4).map((f) => (
                <li key={f} className="flex gap-2 py-2.5 border-b border-line last:border-b-0 font-sans text-[14px] text-ink">
                  <Icon name="check" size={16} className="text-forest mt-0.5" /> {f}
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
