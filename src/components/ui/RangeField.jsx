import { useId } from "react";

/** Labelled slider with a filled track and live value readout. */
const RangeField = ({ label, value, min, max, step = 1, onChange, format = (v) => v }) => {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 mb-3">
        <label htmlFor={id} className="font-sans text-[15px] text-muted">
          {label}
        </label>
        <output htmlFor={id} className="font-sans font-semibold text-[16px] text-ink num">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range w-full"
        style={{ "--pct": `${pct}%` }}
      />
    </div>
  );
};

export default RangeField;
