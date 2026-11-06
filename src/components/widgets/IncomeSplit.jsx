import { useState } from "react";
import { usd, usd0 } from "../../lib/format";
import styles from "../../style";
import AnimatedNumber from "../ui/AnimatedNumber";
import RangeField from "../ui/RangeField";
import Segmented from "../ui/Segmented";

const RULES = {
  standard: [25, 10, 35, 30],
  cautious: [30, 15, 30, 25],
  lean: [20, 5, 40, 35],
};
const POTS = [
  { label: "Income tax", color: "#0e3b2c", fg: "#f6f3ec", hint: "Kept until the tax bill is due" },
  { label: "Reserve", color: "#7f9c88", fg: "#121614", hint: "Three months of costs, then it stops" },
  { label: "Operating", color: "#b8893d", fg: "#121614", hint: "Software, contractors, travel" },
  { label: "Pay yourself", color: "#56687a", fg: "#f6f3ec", hint: "Sent to your personal account on the 1st" },
];

/** Shows how a pot rule splits one incoming client payment. */
const IncomeSplit = ({ className = "" }) => {
  const [amount, setAmount] = useState(6400);
  const [rule, setRule] = useState("standard");
  const split = RULES[rule];
  const data = POTS.map((p, i) => ({ ...p, pct: split[i], value: (amount * split[i]) / 100 }));

  return (
    <div className={`${styles.card} p-6 sm:p-10 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-line">
        <div>
          <p className={styles.overline}>Pot rule</p>
          <h3 className={`${styles.h3} mt-2`}>Where one payment goes</h3>
        </div>
        <Segmented
          label="Split rule"
          value={rule}
          onChange={setRule}
          options={[
            { value: "lean", label: "Lean" },
            { value: "standard", label: "Standard" },
            { value: "cautious", label: "Cautious" },
          ]}
        />
      </div>

      <RangeField label="A client payment arrives" value={amount} min={500} max={25000} step={100} onChange={setAmount} format={usd0} />

      <div className="mt-10">
        <div className="flex h-12 w-full overflow-hidden rounded-[6px]" role="img" aria-label={data.map((d) => `${d.label} ${d.pct}%`).join(", ")}>
          {data.map((d) => (
            <div key={d.label} className="h-full transition-[width] duration-500 flex items-center px-1.5 sm:px-3 min-w-0" style={{ width: `${d.pct}%`, background: d.color }}>
              <span className={`font-sans font-semibold text-[13px] num truncate ${d.pct < 8 ? "sr-only" : ""}`} style={{ color: d.fg }}>
                {d.pct}%
              </span>
            </div>
          ))}
        </div>
        <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 mt-6 border-t border-line">
          {data.map((d) => (
            <li key={d.label} className="py-4 md:pr-4 border-b md:border-b-0 border-line">
              <span className="flex items-center gap-2 font-sans text-[14px] text-ink">
                <span className="w-2.5 h-2.5" style={{ background: d.color }} />
                {d.label}
              </span>
              <span className="block font-serif text-[32px] leading-tight text-ink mt-1">
                <AnimatedNumber value={d.value} format={(v) => usd(v)} />
              </span>
              <span className="block font-sans text-[13px] text-muted mt-1">{d.hint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IncomeSplit;
