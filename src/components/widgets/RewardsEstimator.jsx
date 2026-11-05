import { useState } from "react";
import styles from "../../style";
import AnimatedNumber from "../ui/AnimatedNumber";
import RangeField from "../ui/RangeField";
import Segmented from "../ui/Segmented";

const RATES = {
  starter: { groceries: 1, dining: 1, travel: 1, other: 1 },
  plus: { groceries: 3, dining: 3, travel: 2, other: 1.5 },
  premium: { groceries: 3, dining: 5, travel: 5, other: 2 },
};
const CATS = [
  { key: "groceries", label: "Groceries", color: "#5ce1e6" },
  { key: "dining", label: "Dining out", color: "#fc67fa" },
  { key: "travel", label: "Travel", color: "#f6c26b" },
  { key: "other", label: "Everything else", color: "#7c8cff" },
];
const usd = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

/** Estimates yearly cash back for a monthly spending mix. */
const RewardsEstimator = () => {
  const [plan, setPlan] = useState("plus");
  const [spend, setSpend] = useState({ groceries: 450, dining: 250, travel: 200, other: 600 });
  const yearly = CATS.map((c) => ({ ...c, value: (spend[c.key] * 12 * RATES[plan][c.key]) / 100 }));
  const total = yearly.reduce((s, c) => s + c.value, 0);
  const max = Math.max(...yearly.map((c) => c.value), 1);

  return (
    <div className={`${styles.card} p-6 sm:p-10`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h3 className={styles.heading3}>Rewards estimator</h3>
        <Segmented label="Plan" value={plan} onChange={setPlan} options={[{ value: "starter", label: "Starter" }, { value: "plus", label: "Plus" }, { value: "premium", label: "Premium" }]} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-6">
          {CATS.map((c) => (
            <RangeField key={c.key} label={`${c.label} / month`} value={spend[c.key]} min={0} max={2000} step={25} onChange={(v) => setSpend((s) => ({ ...s, [c.key]: v }))} format={usd} />
          ))}
        </div>
        <div className="flex flex-col">
          <p className="font-poppins text-dimWhite text-[15px]">Estimated rewards per year</p>
          <p className="font-poppins font-semibold text-[48px] leading-[64px] text-gradient">
            <AnimatedNumber value={total} format={usd} />
          </p>
          <div className="flex flex-col gap-4 mt-6">
            {yearly.map((c) => (
              <div key={c.key}>
                <div className="flex justify-between font-poppins text-[14px] mb-2">
                  <span className="text-dimWhite">{c.label} · {RATES[plan][c.key]}%</span>
                  <span className="text-white tabular-nums">{usd(c.value)}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${(c.value / max) * 100}%`, background: c.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsEstimator;
