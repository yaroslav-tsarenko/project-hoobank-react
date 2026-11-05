/** Pill segmented control (radio-group semantics). options: [{ value, label }] */
const Segmented = ({ options, value, onChange, label, className = "", size = "md" }) => (
  <div role="radiogroup" aria-label={label} className={`inline-flex p-1 rounded-full bg-white/5 border border-white/10 ${className}`}>
    {options.map((opt) => {
      const active = opt.value === value;
      return (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={active}
          onClick={() => onChange(opt.value)}
          className={`rounded-full font-poppins font-medium transition ${size === "sm" ? "px-3 py-1.5 text-[13px]" : "px-5 py-2 text-[15px]"} ${active ? "bg-blue-gradient text-primary shadow" : "text-dimWhite hover:text-white"}`}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

export default Segmented;
