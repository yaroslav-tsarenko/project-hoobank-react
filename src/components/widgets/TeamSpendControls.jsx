import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import { usd0 } from "../../lib/format";
import styles from "../../style";
import AnimatedNumber from "../ui/AnimatedNumber";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import Switch from "../ui/Switch";

const START = [
  { id: "m1", name: "Marta Kowalska", role: "Illustration", limit: 1500, active: true },
  { id: "m2", name: "Pavel Ruden", role: "Development", limit: 2500, active: true },
  { id: "m3", name: "Inès Moreau", role: "Copywriting", limit: 800, active: false },
];
const NEW_PEOPLE = [
  { name: "Noah Fischer", role: "Motion" },
  { name: "Ama Mensah", role: "Operations" },
  { name: "Liam Chen", role: "Bookkeeping" },
  { name: "Sofia Varga", role: "Research" },
];

/** Mock team cards with per-person limits, freeze toggles and “add a person”. */
const TeamSpendControls = ({ className = "" }) => {
  const [members, setMembers] = useState(START);
  const toast = useToast();
  const total = members.filter((m) => m.active).reduce((s, m) => s + m.limit, 0);

  const patch = (id, p) => setMembers((list) => list.map((m) => (m.id === id ? { ...m, ...p } : m)));

  const add = () => {
    const next = NEW_PEOPLE[(members.length - START.length) % NEW_PEOPLE.length];
    const id = `m${members.length + 1}`;
    setMembers((list) => [...list, { id, ...next, limit: 1000, active: true }]);
    toast({ title: `Card issued to ${next.name}`, description: "A virtual card with a $1,000 monthly limit is ready." });
  };

  return (
    <div className={`${styles.card} shadow-lift ${className}`}>
      <div className="flex flex-wrap items-end justify-between gap-4 p-5 sm:p-6 border-b border-line">
        <div>
          <h3 className="font-sans font-semibold text-[15px] text-ink">Team cards</h3>
          <p className="font-sans text-muted text-[13px] mt-0.5">Limits and freezes apply instantly.</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-sans text-muted text-[13px]">Active monthly limits</p>
          <p className="font-serif text-[32px] leading-none text-ink mt-1">
            <AnimatedNumber value={total} format={usd0} />
          </p>
        </div>
      </div>
      <ul>
        {members.map((m) => (
          <li key={m.id} className={`px-5 sm:px-6 py-4 border-b border-line transition-opacity ${m.active ? "" : "opacity-60"}`}>
            <div className="flex items-center gap-3">
              <Avatar name={m.name} size="w-9 h-9 text-[13px]" />
              <div className="flex-1 min-w-0">
                <p className="font-sans font-medium text-ink text-[15px] truncate">{m.name}</p>
                <p className="font-sans text-muted text-[13px]">{m.role}</p>
              </div>
              <span className="font-sans text-[12px] text-muted hidden xs:inline">{m.active ? "Active" : "Frozen"}</span>
              <Switch checked={m.active} onChange={(v) => patch(m.id, { active: v })} label={`${m.name}: card ${m.active ? "active" : "frozen"}`} hideLabel />
            </div>
            <div className="mt-3 flex items-center gap-4 pl-12">
              <input
                type="range"
                min={100}
                max={10000}
                step={100}
                value={m.limit}
                disabled={!m.active}
                onChange={(e) => patch(m.id, { limit: Number(e.target.value) })}
                aria-label={`Monthly limit for ${m.name}`}
                className="range flex-1"
                style={{ "--pct": `${((m.limit - 100) / 9900) * 100}%` }}
              />
              <span className="font-sans font-medium text-ink num w-[64px] text-right text-[14px]">{usd0(m.limit)}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="p-4 sm:p-5">
        <button
          type="button"
          onClick={add}
          disabled={members.length >= START.length + NEW_PEOPLE.length}
          className="w-full h-11 rounded-full border border-dashed border-ink/30 font-sans text-[14px] text-ink hover:border-forest hover:text-forest transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
        >
          <Icon name="plus" size={16} /> Add a person
        </button>
      </div>
    </div>
  );
};

export default TeamSpendControls;
