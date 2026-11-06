import { useMemo, useState } from "react";
import { usd0 } from "../../lib/format";
import styles from "../../style";
import AnimatedNumber from "../ui/AnimatedNumber";
import RangeField from "../ui/RangeField";
import Segmented from "../ui/Segmented";
import { AreaChart } from "../ui/charts";

const Stat = ({ label, value, format = usd0, accent }) => (
  <div className="min-w-0 py-3 xs:py-0 xs:px-4 first:pl-0 border-t xs:border-t-0 xs:border-l first:border-0 border-line">
    <p className="font-sans text-[13px] text-muted">{label}</p>
    <p className={`font-serif text-[30px] leading-tight truncate ${accent ? "text-forest" : "text-ink"}`}>
      {typeof value === "number" ? <AnimatedNumber value={value} format={format} /> : value}
    </p>
  </div>
);

const Legend = ({ items }) => (
  <div className="flex flex-wrap gap-5 mt-2 font-sans text-[13px] text-muted">
    {items.map((i) => (
      <span key={i.label} className="flex items-center gap-2">
        <span className="w-4 h-0 border-t-2" style={{ borderColor: i.color, borderStyle: i.dashed ? "dashed" : "solid" }} />
        {i.label}
      </span>
    ))}
  </div>
);

const ReservePanel = () => {
  const [income, setIncome] = useState(8500);
  const [rate, setRate] = useState(25);
  const [months, setMonths] = useState(6);
  const [already, setAlready] = useState(4000);
  const [bill, setBill] = useState(17000);

  const { pot, labels } = useMemo(() => {
    const p = Array.from({ length: months + 1 }, (_, m) => already + (income * rate * m) / 100);
    return { pot: p, labels: p.map((_, i) => (i === 0 ? "Now" : `M${i}`)) };
  }, [income, rate, months, already]);

  const perMonth = (income * rate) / 100;
  const atDue = pot[pot.length - 1];
  const gap = atDue - bill;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
      <div className="md:col-span-5 flex flex-col gap-7">
        <RangeField label="Invoiced per month" value={income} min={1000} max={30000} step={250} onChange={setIncome} format={usd0} />
        <RangeField label="Set aside for tax" value={rate} min={10} max={45} onChange={setRate} format={(v) => `${v}%`} />
        <RangeField label="Months until the bill" value={months} min={1} max={12} onChange={setMonths} format={(v) => `${v} month${v > 1 ? "s" : ""}`} />
        <RangeField label="Already in the tax pot" value={already} min={0} max={30000} step={500} onChange={setAlready} format={usd0} />
        <RangeField label="Expected tax bill" value={bill} min={1000} max={60000} step={500} onChange={setBill} format={usd0} />
      </div>
      <div className="md:col-span-7 flex flex-col gap-6 min-w-0">
        <div className="grid grid-cols-1 xs:grid-cols-3">
          <Stat label="Into the pot each month" value={perMonth} accent />
          <Stat label="In the pot when due" value={atDue} />
          <Stat label={gap >= 0 ? "Left over" : "Shortfall"} value={Math.abs(gap)} />
        </div>
        <div className="border-t border-line pt-4">
          <AreaChart
            ariaLabel={`Tax pot growing to ${usd0(atDue)} over ${months} months against an expected bill of ${usd0(bill)}`}
            labels={labels}
            series={[
              { key: "pot", label: "Tax pot", color: "#0e3b2c", values: pot },
              { key: "bill", label: "Expected bill", color: "#b8893d", values: pot.map(() => bill), fill: false, dashed: true },
            ]}
          />
          <Legend
            items={[
              { label: "Tax pot", color: "#0e3b2c" },
              { label: "Expected bill", color: "#b8893d", dashed: true },
            ]}
          />
        </div>
        <p className="font-sans text-[13px] text-faint">Illustrative only, not tax advice. Your accountant should confirm the right percentage.</p>
      </div>
    </div>
  );
};

const RunwayPanel = () => {
  const [cash, setCash] = useState(42000);
  const [revenue, setRevenue] = useState(9000);
  const [costs, setCosts] = useState(11500);

  const net = revenue - costs;
  const balances = useMemo(() => Array.from({ length: 19 }, (_, i) => Math.max(cash + net * i, 0)), [cash, net]);
  const runway = net >= 0 ? null : cash / -net;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
      <div className="md:col-span-5 flex flex-col gap-7">
        <RangeField label="Cash in the business" value={cash} min={2000} max={200000} step={1000} onChange={setCash} format={usd0} />
        <RangeField label="Average monthly revenue" value={revenue} min={0} max={40000} step={250} onChange={setRevenue} format={usd0} />
        <RangeField label="Monthly costs, including your pay" value={costs} min={1000} max={40000} step={250} onChange={setCosts} format={usd0} />
      </div>
      <div className="md:col-span-7 flex flex-col gap-6 min-w-0">
        <div className="grid grid-cols-1 xs:grid-cols-3">
          <Stat label="Net each month" value={net} format={(v) => `${v < 0 ? "−" : "+"}${usd0(Math.abs(v))}`} />
          <Stat label="Runway" value={runway == null ? "Positive" : `${runway >= 18 ? "18+" : runway.toFixed(1)} mo`} accent />
          <Stat label="Cash in 12 months" value={balances[12]} />
        </div>
        <div className="border-t border-line pt-4">
          <AreaChart
            ariaLabel={runway == null ? "Cash balance grows over 18 months" : `Cash lasts about ${runway.toFixed(1)} months`}
            labels={balances.map((_, i) => (i === 0 ? "Now" : `M${i}`))}
            series={[{ key: "cash", label: "Cash", color: "#0e3b2c", values: balances }]}
          />
          <Legend items={[{ label: "Projected cash", color: "#0e3b2c" }]} />
        </div>
      </div>
    </div>
  );
};

/** Planning calculators: tax reserve and runway, with sliders, animated results and SVG charts. */
const FinanceCalculator = ({ defaultMode = "reserve", className = "" }) => {
  const [mode, setMode] = useState(defaultMode);
  return (
    <div className={`${styles.card} p-6 sm:p-10 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-line">
        <div>
          <p className={styles.overline}>Planner</p>
          <h3 className={`${styles.h3} mt-2`}>{mode === "reserve" ? "How much to set aside for tax" : "How long the cash will last"}</h3>
        </div>
        <Segmented
          label="Planner mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "reserve", label: "Tax reserve" },
            { value: "runway", label: "Runway" },
          ]}
        />
      </div>
      {mode === "reserve" ? <ReservePanel /> : <RunwayPanel />}
    </div>
  );
};

export default FinanceCalculator;
