/** Segmented control (radio-group semantics). options: [{ value, label }] */
const Segmented = ({ options, value, onChange, label, className = "", size = "md" }) => (
  <div role="radiogroup" aria-label={label} className={`inline-flex p-1 rounded-full bg-sand/70 border border-line ${className}`}>
    {options.map((opt) => {
      const active = opt.value === value;
      return (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(opt.value)}
          className={`rounded-full font-sans font-medium transition whitespace-nowrap ${size === "sm" ? "px-3 py-1.5 text-[13px]" : "px-4 py-2 text-[14px]"} ${active ? "bg-paper text-ink shadow-[0_1px_2px_rgba(18,22,20,0.12)]" : "text-muted hover:text-ink"}`}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

export default Segmented;
