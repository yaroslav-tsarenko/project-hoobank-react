import { useEffect, useMemo, useState } from "react";
import { currencies } from "../../constants/currencies";
import { fmt } from "../../lib/format";
import styles from "../../style";
import AnimatedNumber from "../ui/AnimatedNumber";
import Icon from "../ui/Icon";
import Segmented from "../ui/Segmented";

const BANK_MARKUP = 0.03;
const PLAN_FEES = { solo: 0.0055, studio: 0.0035, team: 0.0025 };

const CurrencySelect = ({ label, value, onChange }) => (
  <label className="relative shrink-0">
    <span className="sr-only">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none cursor-pointer rounded-full border border-line bg-ivory pl-4 pr-9 h-11 font-sans font-semibold text-[15px] tracking-[0.04em] text-ink outline-none focus:border-forest"
    >
      {currencies.map((c) => (
        <option key={c.code} value={c.code}>
          {c.code} · {c.name}
        </option>
      ))}
    </select>
    <Icon name="chevronDown" size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted" />
  </label>
);

/** FX converter with mock “live” rate movement, plan fees, swap and a bank comparison. */
const CurrencyConverter = ({ className = "", compact = false }) => {
  const [amount, setAmount] = useState("2500");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [plan, setPlan] = useState("studio");
  const [jitter, setJitter] = useState({});
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    let tick = 0;
    const id = window.setInterval(() => {
      tick += 1;
      if (tick % 8 === 0) {
        setJitter(Object.fromEntries(currencies.map((c) => [c.code, 1 + (Math.random() - 0.5) * 0.003])));
        setSecondsAgo(0);
      } else {
        setSecondsAgo((s) => s + 1);
      }
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const rateOf = useMemo(() => {
    const map = Object.fromEntries(currencies.map((c) => [c.code, c.rate * (c.code === "USD" ? 1 : jitter[c.code] ?? 1)]));
    return (code) => map[code];
  }, [jitter]);

  const numeric = parseFloat(amount) || 0;
  const rate = rateOf(to) / rateOf(from);
  const feePct = from === to ? 0 : PLAN_FEES[plan];
  const fee = numeric * feePct;
  const result = (numeric - fee) * rate;
  const bank = numeric * rate * (1 - (from === to ? 0 : BANK_MARKUP));
  const saved = Math.max(result - bank, 0);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className={`${styles.card} shadow-lift ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 pt-5">
        <h3 className="font-sans font-semibold text-[15px] text-ink">Convert</h3>
        <span className="flex items-center gap-1.5 font-sans text-[13px] text-muted num" aria-live="off">
          <Icon name="clock" size={14} /> Rates refreshed {secondsAgo}s ago
        </span>
      </div>

      <div className="px-5 sm:px-6 pt-5">
        <div className="rounded-control border border-line bg-ivory/60 p-4">
          <label htmlFor="fx-amount" className="font-sans text-[13px] text-muted">
            You convert
          </label>
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3 mt-1">
            <input
              id="fx-amount"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1").slice(0, 12))}
              className="w-full xs:flex-1 min-w-0 bg-transparent outline-none font-serif text-[40px] leading-tight text-ink num"
            />
            <CurrencySelect label="Currency you convert from" value={from} onChange={setFrom} />
          </div>
        </div>

        <div className="relative h-0 flex justify-center">
          <button
            type="button"
            onClick={swap}
            aria-label="Swap currencies"
            className="absolute -top-[18px] w-9 h-9 rounded-full bg-paper border border-line text-ink flex items-center justify-center hover:border-ink/50 hover:rotate-180 transition-transform duration-500 z-[1]"
          >
            <Icon name="swap" size={16} />
          </button>
        </div>

        <div className="rounded-control border border-line p-4 mt-2">
          <p className="font-sans text-[13px] text-muted">They receive</p>
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3 mt-1">
            <p className="w-full xs:flex-1 min-w-0 font-serif text-[40px] leading-tight text-forest truncate" aria-live="polite">
              <AnimatedNumber value={result} format={(v) => fmt(v, to).replace(/^[^\d-]+/, "")} />
            </p>
            <CurrencySelect label="Currency they receive" value={to} onChange={setTo} />
          </div>
        </div>
      </div>

      <dl className="px-5 sm:px-6 mt-5 font-sans text-[14px]">
        {[
          ["Mid-market rate", `1 ${from} = ${rate.toFixed(rate < 0.1 ? 5 : 4)} ${to}`],
          [`Northvault fee (${(feePct * 100).toFixed(2)}%)`, fmt(fee, from)],
          ["Typical bank (3% in the rate)", fmt(bank, to)],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 py-2 border-t border-line">
            <dt className="text-muted">{k}</dt>
            <dd className="text-ink num text-right">{v}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-4 py-2 border-t border-line">
          <dt className="text-ink font-medium">You keep, compared with the bank</dt>
          <dd className="text-forest font-semibold num">{fmt(saved, to)}</dd>
        </div>
      </dl>

      {!compact && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-6 py-4 mt-3 border-t border-line bg-ivory/50 rounded-b-card">
          <span className="font-sans text-[13px] text-muted">Fee by plan</span>
          <Segmented
            label="Plan"
            size="sm"
            value={plan}
            onChange={setPlan}
            options={[
              { value: "solo", label: "Solo" },
              { value: "studio", label: "Studio" },
              { value: "team", label: "Team" },
            ]}
          />
        </div>
      )}
      {compact && <div className="h-5" />}
    </div>
  );
};

export default CurrencyConverter;
