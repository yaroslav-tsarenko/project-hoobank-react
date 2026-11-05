import { useId, useState } from "react";
import Icon from "./Icon";

/** Single-open accordion. Items: { id, question, answer } (answer may be a node). */
const Accordion = ({ items, defaultOpen = null, className = "" }) => {
  const [openId, setOpenId] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${baseId}-${item.id}`;
        return (
          <div
            key={item.id}
            className={`rounded-[20px] border transition-colors ${open ? "bg-black-gradient border-white/10" : "border-white/5 hover:border-white/15"}`}
          >
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 font-poppins font-medium text-[17px] text-white"
              >
                <span>{item.question}</span>
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition ${open ? "bg-blue-gradient text-primary rotate-180" : "bg-white/5 text-dimWhite"}`}
                >
                  <Icon name="chevronDown" size={16} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!open}>
                <div className="px-6 pb-6 font-poppins text-[16px] leading-[27px] text-dimWhite">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
