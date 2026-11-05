import { useState } from "react";
import styles from "../../style";
import RangeField from "../ui/RangeField";
import Segmented from "../ui/Segmented";
import { DonutChart } from "../ui/charts";

const PRESETS = {
  "50/30/20": [50, 30, 20],
  "60/20/20": [60, 20, 20],
  "70/20/10": [70, 20, 10],
};
const LABELS = [
  { label: "Needs", color: "#5ce1e6", hint: "Rent, groceries, bills" },
  { label: "Wants", color: "#fc67fa", hint: "Dining, shopping, fun" },
  { label: "Savings", color: "#f6c26b", hint: "Goals, investing, debt" },
];
const usd = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

/** Split a monthly income using a budgeting rule and visualise it. */
const BudgetPlanner = () => {
  const [income, setIncome] = useState(4200);
  const [preset, setPreset] = useState("50/30/20");
  const split = PRESETS[preset];
  const data = LABELS.map((l, i) => ({ ...l, value: (income * split[i]) / 100 }));

  return (
    <div className={`${styles.card} p-6 sm:p-10`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h3 className={styles.heading3}>Budget planner</h3>
        <Segmented label="Budget rule" size="sm" value={preset} onChange={setPreset} options={Object.keys(PRESETS).map((k) => ({ value: k, label: k }))} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-6">
          <RangeField label="Monthly take-home pay" value={income} min={1000} max={15000} step={100} onChange={setIncome} format={usd} />
          <ul className="flex flex-col gap-3">
            {data.map((d) => (
              <li key={d.label} className="flex items-center justify-between rounded-[14px] bg-white/5 px-4 py-3">
                <span className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                  <span>
                    <span className="block font-poppins text-white text-[15px]">{d.label}</span>
                    <span className="block font-poppins text-dimWhite text-[12px]">{d.hint}</span>
                  </span>
                </span>
                <span className="font-poppins font-semibold text-white tabular-nums">{usd(d.value)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center">
          <DonutChart data={data} size={240} centerTitle="Monthly" centerValue={usd(income)} />
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;
