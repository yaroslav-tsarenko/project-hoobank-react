import { useState } from "react";
import { usd0 } from "../../lib/format";
import styles from "../../style";
import AnimatedNumber from "../ui/AnimatedNumber";
import RangeField from "../ui/RangeField";
import Segmented from "../ui/Segmented";

const PLANS = {
  solo: { label: "Solo", monthly: 0, fx: 0.0055, swift: 6 },
  studio: { label: "Studio", monthly: 10, fx: 0.0035, swift: 4 },
  team: { label: "Team", monthly: 24, fx: 0.0025, swift: 3 },
};
// A typical high-street business account, for comparison.
const BANK = { monthly: 18, fx: 0.03, swift: 25, local: 0.35 };

/** Estimates yearly banking costs for a usage pattern and compares them with a typical bank. */
const FeeEstimator = ({ className = "" }) => {
  const [plan, setPlan] = useState("studio");
  const [fx, setFx] = useState(6000);
  const [swift, setSwift] = useState(3);
  const [local, setLocal] = useState(20);
  const p = PLANS[plan];

  const rows = [
    { label: "Plan fee", nv: p.monthly * 12, bank: BANK.monthly * 12 },
    { label: "Currency conversion", nv: fx * p.fx * 12, bank: fx * BANK.fx * 12 },
    { label: "SWIFT transfers", nv: swift * p.swift * 12, bank: swift * BANK.swift * 12 },
    { label: "Local transfers", nv: 0, bank: local * BANK.local * 12 },
  ];
  const total = rows.reduce((s, r) => s + r.nv, 0);
  const bankTotal = rows.reduce((s, r) => s + r.bank, 0);

  return (
    <div className={`${styles.card} p-6 sm:p-10 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-line">
        <div>
          <p className={styles.overline}>Fee estimate</p>
          <h3 className={`${styles.h3} mt-2`}>What a year of banking costs</h3>
        </div>
        <Segmented label="Plan" value={plan} onChange={setPlan} options={Object.entries(PLANS).map(([value, v]) => ({ value, label: v.label }))} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5 flex flex-col gap-7">
          <RangeField label="Converted per month" value={fx} min={0} max={50000} step={500} onChange={setFx} format={usd0} />
          <RangeField label="SWIFT transfers per month" value={swift} min={0} max={30} onChange={setSwift} format={(v) => v} />
          <RangeField label="Local transfers per month" value={local} min={0} max={200} step={5} onChange={setLocal} format={(v) => v} />
        </div>
        <div className="md:col-span-7 min-w-0">
          <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
            <div>
              <p className="font-sans text-[13px] text-muted">Northvault {p.label}, per year</p>
              <p className="font-serif text-[56px] leading-none text-forest mt-1">
                <AnimatedNumber value={total} format={usd0} />
              </p>
            </div>
            <div>
              <p className="font-sans text-[13px] text-muted">Typical bank, per year</p>
              <p className="font-serif text-[32px] leading-none text-muted mt-1">
                <AnimatedNumber value={bankTotal} format={usd0} />
              </p>
            </div>
          </div>
          <table className="w-full mt-8 font-sans text-[14px]">
            <caption className="sr-only">Yearly fees by type</caption>
            <thead>
              <tr className="text-left text-muted border-b border-line">
                <th scope="col" className="font-normal py-2">Fee</th>
                <th scope="col" className="font-normal py-2 text-right">Northvault</th>
                <th scope="col" className="font-normal py-2 text-right">Typical bank</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-b border-line">
                  <th scope="row" className="font-normal text-ink text-left py-2.5">{r.label}</th>
                  <td className="text-right text-ink num">{usd0(r.nv)}</td>
                  <td className="text-right text-muted num">{usd0(r.bank)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font-sans text-[13px] text-faint mt-4">
            Comparison assumes a $18 monthly account fee, a 3% margin in the exchange rate, $25 per SWIFT payment and $0.35 per local transfer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeeEstimator;
