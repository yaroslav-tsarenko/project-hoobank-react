import { useEffect, useMemo, useState } from "react";
import { currencies } from "../../constants/currencies";
import AnimatedNumber from "../ui/AnimatedNumber";
import Icon from "../ui/Icon";
import styles from "../../style";

const BANK_MARKUP = 0.03;

const money = (value, currency) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: currency === "JPY" ? 0 : 2 }).format(
    Number.isFinite(value) ? value : 0
  );

const CurrencySelect = ({ label, value, onChange }) => (
  <label className="flex flex-col gap-2 min-w-0">
    <span className="font-poppins text-[13px] text-dimWhite">{label}</span>
    <select value={value} onChange={(e) => onChange(e.target.value)} className={`${styles.input} cursor-pointer`}>
      {currencies.map((c) => (
        <option key={c.code} value={c.code}>
          {c.flag} {c.code} — {c.name}
        </option>
      ))}
    </select>
  </label>
);

/** Mock currency converter with “live” rate jitter, swap button and animated result. */
const CurrencyConverter = ({ className = "" }) => {
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [turns, setTurns] = useState(0);
  const [jitter, setJitter] = useState({});
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    let tick = 0;
    const id = window.setInterval(() => {
      tick += 1;
      if (tick % 6 === 0) {
        setJitter(Object.fromEntries(currencies.map((c) => [c.code, 1 + (Math.random() - 0.5) * 0.004])));
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
  const result = numeric * rate;
  const saved = result * BANK_MARKUP;

  const swap = () => {
    setFrom(to);
    setTo(from);
    setTurns((t) => t + 1);
  };

  return (
    <div className={`${styles.card} p-6 sm:p-8 border-gradient ${className}`}>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h3 className={styles.heading4}>Currency converter</h3>
        <span className="flex items-center gap-2 font-poppins text-[13px] text-dimWhite" aria-live="off">
          <span className="w-2 h-2 rounded-full bg-secondary pulse-dot" aria-hidden="true" />
          Live · {secondsAgo}s ago
        </span>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-poppins text-[13px] text-dimWhite">You send</span>
        <input
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1").slice(0, 12))}
          className={`${styles.input} text-[22px] font-semibold`}
          aria-label="Amount to convert"
        />
      </label>

      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 mt-4">
        <CurrencySelect label="From" value={from} onChange={setFrom} />
        <button
          type="button"
          onClick={swap}
          aria-label="Swap currencies"
          className="mb-[2px] w-12 h-12 rounded-full bg-blue-gradient text-primary flex items-center justify-center btn-glow"
          style={{ transform: `rotate(${turns * 180}deg)`, transition: "transform .5s cubic-bezier(.25,.46,.45,.94)" }}
        >
          <Icon name="swap" size={20} />
        </button>
        <CurrencySelect label="To" value={to} onChange={setTo} />
      </div>

      <div className="mt-6 rounded-[16px] bg-white/5 p-5">
        <p className="font-poppins text-[13px] text-dimWhite">Recipient gets</p>
        <p className="font-poppins font-semibold text-[32px] leading-[44px] text-gradient break-all" aria-live="polite">
          <AnimatedNumber value={result} format={(v) => money(v, to)} />
        </p>
        <p className="font-poppins text-[14px] text-dimWhite mt-1 tabular-nums">
          1 {from} = {rate.toFixed(rate < 0.1 ? 5 : 4)} {to} · 0% markup
        </p>
      </div>

      <p className="font-poppins text-[14px] text-dimWhite mt-4 flex items-start gap-2">
        <Icon name="sparkles" size={16} className="text-secondary mt-[3px]" />
        <span>
          You save about <span className="text-white font-medium">{money(saved, to)}</span> vs. a typical bank’s 3% FX markup.
        </span>
      </p>
    </div>
  );
};

export default CurrencyConverter;
