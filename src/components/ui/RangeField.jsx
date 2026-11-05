import { useId } from "react";

/** Labeled slider with a gradient-filled track and live value readout. */
const RangeField = ({ label, value, min, max, step = 1, onChange, format = (v) => v }) => {
  const id = useId();
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label htmlFor={id} className="font-poppins text-[15px] text-dimWhite">
          {label}
        </label>
        <output htmlFor={id} className="font-poppins font-semibold text-[16px] text-white tabular-nums">
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
