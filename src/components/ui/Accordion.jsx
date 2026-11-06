import { useId, useState } from "react";
import Icon from "./Icon";

/** Single-open accordion separated by hairlines. Items: { id, question, answer } (answer may be a node). */
const Accordion = ({ items, defaultOpen = null, className = "" }) => {
  const [openId, setOpenId] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className={`border-t border-line ${className}`}>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${baseId}-${item.id}`;
        return (
          <div key={item.id} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className="group w-full flex items-start justify-between gap-6 text-left py-5 font-sans font-medium text-[17px] leading-[1.45] text-ink"
              >
                <span className="group-hover:text-forest transition-colors">{item.question}</span>
                <span className={`mt-0.5 shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition ${open ? "bg-forest border-forest text-ivory" : "border-line text-muted group-hover:border-ink/40"}`}>
                  <Icon name={open ? "minus" : "plus"} size={14} strokeWidth={2} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden" inert={!open}>
                <div className="pb-6 pr-10 font-sans text-[16px] leading-[1.65] text-muted max-w-prose">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
