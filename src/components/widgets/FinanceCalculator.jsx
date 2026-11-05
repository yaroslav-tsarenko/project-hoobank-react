import { useMemo, useState } from "react";
import styles from "../../style";
import AnimatedNumber from "../ui/AnimatedNumber";
import RangeField from "../ui/RangeField";
import Segmented from "../ui/Segmented";
import { AreaChart, DonutChart } from "../ui/charts";

const usd = (v, digits = 0) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: digits }).format(v);

const Stat = ({ label, value, digits = 0, highlight }) => (
  <div className="rounded-[16px] bg-white/5 p-4 min-w-0">
    <p className="font-poppins text-[13px] text-dimWhite">{label}</p>
    <p className={`font-poppins font-semibold text-[20px] sm:text-[22px] truncate ${highlight ? "text-gradient" : "text-white"}`}>
      <AnimatedNumber value={value} format={(v) => usd(v, digits)} />
    </p>
  </div>
);

const SavingsPanel = () => {
  const [initial, setInitial] = useState(5000);
  const [monthly, setMonthly] = useState(400);
  const [years, setYears] = useState(10);
  const [apy, setApy] = useState(4.2);

  const { balances, contributions } = useMemo(() => {
    const r = apy / 100 / 12;
    let bal = initial;
    const b = [initial];
    const c = [initial];
    for (let y = 1; y <= years; y += 1) {
      for (let m = 0; m < 12; m += 1) bal = bal * (1 + r) + monthly;
      b.push(bal);
      c.push(initial + monthly * 12 * y);
    }
    return { balances: b, contributions: c };
  }, [initial, monthly, years, apy]);

  const final = balances[balances.length - 1];
  const contributed = contributions[contributions.length - 1];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">
        <RangeField label="Initial deposit" value={initial} min={0} max={50000} step={500} onChange={setInitial} format={(v) => usd(v)} />
        <RangeField label="Monthly contribution" value={monthly} min={0} max={3000} step={50} onChange={setMonthly} format={(v) => usd(v)} />
        <RangeField label="Time horizon" value={years} min={1} max={30} onChange={setYears} format={(v) => `${v} yr${v > 1 ? "s" : ""}`} />
        <RangeField label="Savings APY" value={apy} min={0.5} max={6} step={0.1} onChange={setApy} format={(v) => `${v.toFixed(1)}%`} />
      </div>
      <div className="flex flex-col gap-4 min-w-0">
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
          <Stat label="Final balance" value={final} highlight />
          <Stat label="You put in" value={contributed} />
          <Stat label="Interest earned" value={final - contributed} />
        </div>
        <div className="rounded-[16px] bg-white/5 p-4">
          <AreaChart
            ariaLabel={`Savings growth over ${years} years`}
            labels={balances.map((_, i) => (i === 0 ? "Now" : `Y${i}`))}
            series={[
              { key: "bal", label: "Balance", color: "#5ce1e6", values: balances },
              { key: "con", label: "Contributions", color: "#fc67fa", values: contributions },
            ]}
          />
          <div className="flex gap-5 mt-2 font-poppins text-[13px] text-dimWhite">
            <span className="flex items-center gap-2"><span className="w-3 h-1 rounded bg-[#5ce1e6]" />Balance</span>
            <span className="flex items-center gap-2"><span className="w-3 h-1 rounded bg-[#fc67fa]" />Contributions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoanPanel = () => {
  const [amount, setAmount] = useState(12000);
  const [months, setMonths] = useState(36);
  const [apr, setApr] = useState(14.9);

  const { payment, interest, interestWithIntro } = useMemo(() => {
    const r = apr / 100 / 12;
    const pay = r === 0 ? amount / months : (amount * r) / (1 - Math.pow(1 + r, -months));
    let bal = amount;
    let introInterest = 0;
    for (let m = 0; m < months && bal > 0; m += 1) {
      const i = m < 18 ? 0 : bal * r;
      introInterest += i;
      bal = bal + i - pay;
    }
    return { payment: pay, interest: pay * months - amount, interestWithIntro: Math.max(introInterest, 0) };
  }, [amount, months, apr]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-6">
        <RangeField label="Balance to transfer" value={amount} min={1000} max={100000} step={500} onChange={setAmount} format={(v) => usd(v)} />
        <RangeField label="Payoff term" value={months} min={6} max={84} step={6} onChange={setMonths} format={(v) => `${v} months`} />
        <RangeField label="Current card APR" value={apr} min={0} max={30} step={0.1} onChange={setApr} format={(v) => `${v.toFixed(1)}%`} />
      </div>
      <div className="flex flex-col gap-4 min-w-0">
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
          <Stat label="Monthly payment" value={payment} digits={2} highlight />
          <Stat label="Interest elsewhere" value={interest} />
          <Stat label="Saved with HooBank" value={Math.max(interest - interestWithIntro, 0)} />
        </div>
        <div className="rounded-[16px] bg-white/5 p-5 flex flex-col xs:flex-row items-center gap-6">
          <DonutChart
            size={180}
            thickness={22}
            centerTitle="Total cost"
            centerValue={usd(amount + interest)}
            data={[
              { label: "Principal", value: amount, color: "#5ce1e6" },
              { label: "Interest", value: Math.max(interest, 0.0001), color: "#fc67fa" },
            ]}
          />
          <ul className="font-poppins text-[14px] text-dimWhite flex flex-col gap-3">
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#5ce1e6]" />Principal {usd(amount)}</li>
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#fc67fa]" />Interest {usd(interest)}</li>
            <li className="text-white">0% intro APR for the first 18 months on HooBank.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

/** Savings / balance-transfer calculator with sliders, animated results and SVG charts. */
const FinanceCalculator = ({ defaultMode = "savings", className = "" }) => {
  const [mode, setMode] = useState(defaultMode);
  return (
    <div className={`${styles.card} p-6 sm:p-10 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h3 className={styles.heading3}>{mode === "savings" ? "Savings calculator" : "Balance transfer planner"}</h3>
        <Segmented
          label="Calculator mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "savings", label: "Savings" },
            { value: "loan", label: "Balance transfer" },
          ]}
        />
      </div>
      {mode === "savings" ? <SavingsPanel /> : <LoanPanel />}
    </div>
  );
};

export default FinanceCalculator;
