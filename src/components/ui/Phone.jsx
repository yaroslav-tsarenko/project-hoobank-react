import Icon from "./Icon";

/** A simple phone frame drawn in CSS. Children render inside the screen. */
const Phone = ({ children, active = 0, className = "" }) => (
  <div className={`relative w-[288px] h-[584px] rounded-[46px] bg-ink p-[10px] shadow-float ${className}`}>
    <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[86px] h-[24px] rounded-full bg-ink z-10" aria-hidden="true" />
    <div className="w-full h-full rounded-[37px] bg-ivory overflow-hidden flex flex-col">
      <div className="flex justify-between px-7 pt-4 pb-3 font-sans text-[12px] font-semibold text-ink num">
        <span>9:41</span>
        <span className="flex gap-1 items-center" aria-hidden="true">
          <span className="w-4 h-2.5 rounded-[2px] border border-ink" />
        </span>
      </div>
      <div className="flex-1 min-h-0">{children}</div>
      <div className="grid grid-cols-4 border-t border-line py-3 bg-paper" aria-hidden="true">
        {["home", "card", "fileText", "layers"].map((ic, i) => (
          <span key={ic} className={`flex justify-center ${i === active ? "text-forest" : "text-faint"}`}>
            <Icon name={ic} size={18} />
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default Phone;
