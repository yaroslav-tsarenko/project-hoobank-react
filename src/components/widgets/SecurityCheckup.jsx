import { useState } from "react";
import styles from "../../style";
import AnimatedNumber from "../ui/AnimatedNumber";
import Switch from "../ui/Switch";

const CHECKS = [
  { id: "passkey", label: "Passkey sign-in", description: "Device-bound keys instead of passwords and SMS codes.", weight: 25 },
  { id: "devices", label: "Approve new devices", description: "A new laptop or phone must be confirmed from a trusted one.", weight: 20 },
  { id: "payee", label: "Confirm new payees", description: "A second step before the first payment to anyone new.", weight: 20 },
  { id: "threshold", label: "Approval over $5,000", description: "Large transfers need a second confirmation.", weight: 15 },
  { id: "roles", label: "Read-only accountant role", description: "Your accountant can export, but cannot pay.", weight: 10 },
  { id: "abroad", label: "Lock card use abroad", description: "Re-enable it in one step when you travel.", weight: 10 },
];

const verdict = (score) => {
  if (score >= 90) return { label: "Well protected", text: "Every recommended control is on." };
  if (score >= 60) return { label: "Good", text: "A couple of controls would close the remaining gaps." };
  if (score >= 35) return { label: "Partly protected", text: "Turn on payee confirmation and device approval next." };
  return { label: "Needs attention", text: "Start with passkeys; they stop most account takeovers." };
};

/** Toggle security settings to see a protection score change. */
const SecurityCheckup = () => {
  const [on, setOn] = useState({ passkey: true, payee: true });
  const score = CHECKS.reduce((s, c) => s + (on[c.id] ? c.weight : 0), 0);
  const v = verdict(score);

  return (
    <div className={`${styles.card} grid grid-cols-1 md:grid-cols-12`}>
      <div className="md:col-span-5 p-6 sm:p-10 border-b md:border-b-0 md:border-r border-line flex flex-col">
        <p className={styles.overline}>Protection score</p>
        <p className="font-serif text-[96px] leading-none text-ink mt-4" aria-live="polite">
          <AnimatedNumber value={score} format={(n) => Math.round(n)} />
          <span className="text-[32px] text-muted"> / 100</span>
        </p>
        <div className="flex gap-1 mt-6" aria-hidden="true">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className={`h-2 flex-1 transition-colors duration-300 ${i < score / 5 ? "bg-forest" : "bg-line"}`} />
          ))}
        </div>
        <p className="font-serif text-[28px] text-forest mt-6">{v.label}</p>
        <p className="font-sans text-[15px] text-muted mt-1">{v.text}</p>
      </div>
      <div className="md:col-span-7 p-6 sm:p-10 flex flex-col gap-5">
        <h3 className="font-sans font-semibold text-[15px] text-ink">Your controls</h3>
        {CHECKS.map((c) => (
          <Switch key={c.id} checked={!!on[c.id]} onChange={(val) => setOn((s) => ({ ...s, [c.id]: val }))} label={c.label} description={c.description} />
        ))}
      </div>
    </div>
  );
};

export default SecurityCheckup;
