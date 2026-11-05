/** Accessible on/off switch. */
const Switch = ({ checked, onChange, label, description, className = "" }) => (
  <label className={`flex items-center justify-between gap-4 cursor-pointer ${className}`}>
    <span className="flex flex-col">
      <span className="font-poppins font-medium text-[16px] text-white">{label}</span>
      {description && <span className="font-poppins text-[14px] leading-[20px] text-dimWhite">{description}</span>}
    </span>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 w-[52px] h-[30px] rounded-full transition-colors ${checked ? "bg-blue-gradient" : "bg-white/10"}`}
    >
      <span
        className={`absolute top-[3px] left-[3px] w-6 h-6 rounded-full shadow transition-transform ${checked ? "translate-x-[22px] bg-primary" : "bg-white"}`}
      />
    </button>
  </label>
);

export default Switch;
