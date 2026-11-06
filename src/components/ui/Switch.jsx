/** Accessible on/off switch. */
const Switch = ({ checked, onChange, label, description, className = "", hideLabel = false }) => (
  <label className={`flex items-center justify-between gap-4 cursor-pointer ${className}`}>
    {!hideLabel && (
      <span className="flex flex-col">
        <span className="font-sans font-medium text-[15px] text-ink">{label}</span>
        {description && <span className="font-sans text-[14px] leading-[1.45] text-muted">{description}</span>}
      </span>
    )}
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 w-[44px] h-[26px] rounded-full border transition-colors ${checked ? "bg-forest border-forest" : "bg-sand border-line"}`}
    >
      <span className={`absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-paper shadow-[0_1px_2px_rgba(18,22,20,0.25)] transition-transform ${checked ? "translate-x-[18px]" : ""}`} />
    </button>
  </label>
);

export default Switch;
