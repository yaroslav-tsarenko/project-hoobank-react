import { useState } from "react";
import styles from "../../style";
import AnimatedNumber from "../ui/AnimatedNumber";
import Switch from "../ui/Switch";

const CHECKS = [
  { id: "twofa", label: "Two-factor authentication", description: "Codes on every new device sign-in.", weight: 25 },
  { id: "bio", label: "Biometric sign-in", description: "Face ID or fingerprint to open the app.", weight: 20 },
  { id: "alerts", label: "Instant transaction alerts", description: "Get pinged for every payment.", weight: 15 },
  { id: "virtual", label: "Virtual cards for online shopping", description: "Single-use numbers keep your real card safe.", weight: 15 },
  { id: "travel", label: "Block card use abroad", description: "Re-enable it in one tap when you travel.", weight: 10 },
  { id: "pin", label: "Separate payment PIN", description: "Extra confirmation for large transfers.", weight: 15 },
];

const verdict = (score) => {
  if (score >= 90) return { label: "Fort Knox", color: "#5ce1e6" };
  if (score >= 60) return { label: "Well protected", color: "#7de7eb" };
  if (score >= 35) return { label: "Getting there", color: "#f6c26b" };
  return { label: "Needs attention", color: "#fc67fa" };
};

/** Toggle security settings to watch your protection score animate. */
const SecurityCheckup = () => {
  const [on, setOn] = useState({ twofa: true, alerts: true });
  const score = CHECKS.reduce((s, c) => s + (on[c.id] ? c.weight : 0), 0);
  const v = verdict(score);
  const r = 70;
  const circ = 2 * Math.PI * r;

  return (
    <div className={`${styles.card} p-6 sm:p-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 items-center`}>
      <div className="flex flex-col items-center">
        <div className="relative w-[180px] h-[180px]">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90" aria-hidden="true">
            <circle cx="80" cy="80" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
            <circle
              cx="80"
              cy="80"
              r={r}
              fill="none"
              stroke={v.color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - score / 100)}
              style={{ transition: "stroke-dashoffset .7s cubic-bezier(.25,.46,.45,.94), stroke .4s" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center" aria-live="polite">
            <span className="font-poppins font-semibold text-[40px] text-white">
              <AnimatedNumber value={score} format={(n) => Math.round(n)} />
            </span>
            <span className="font-poppins text-[13px] text-dimWhite">of 100</span>
          </div>
        </div>
        <p className="font-poppins font-semibold text-[18px] mt-4" style={{ color: v.color }}>
          {v.label}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h3 className={styles.heading3}>Security checkup</h3>
        {CHECKS.map((c) => (
          <Switch key={c.id} checked={!!on[c.id]} onChange={(val) => setOn((s) => ({ ...s, [c.id]: val }))} label={c.label} description={c.description} />
        ))}
      </div>
    </div>
  );
};

export default SecurityCheckup;
