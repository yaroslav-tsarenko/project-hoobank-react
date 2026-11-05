import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import styles from "../../style";
import AnimatedNumber from "../ui/AnimatedNumber";
import Icon from "../ui/Icon";
import Switch from "../ui/Switch";

const usd = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

const START = [
  { id: "m1", name: "Olivia Park", role: "Marketing", limit: 2500, active: true },
  { id: "m2", name: "Dmytro Koval", role: "Engineering", limit: 1200, active: true },
  { id: "m3", name: "Sara Lindqvist", role: "Sales", limit: 4000, active: false },
];
const NEW_PEOPLE = [
  { name: "Noah Fischer", role: "Design" },
  { name: "Mia Rossi", role: "Operations" },
  { name: "Liam Chen", role: "Finance" },
  { name: "Ava Novak", role: "Support" },
];

const initials = (name) => name.split(" ").map((p) => p[0]).join("");

/** Mock team cards with per-person limits, freeze toggles and “add member”. */
const TeamSpendControls = () => {
  const [members, setMembers] = useState(START);
  const toast = useToast();
  const total = members.filter((m) => m.active).reduce((s, m) => s + m.limit, 0);

  const patch = (id, p) => setMembers((list) => list.map((m) => (m.id === id ? { ...m, ...p } : m)));

  const add = () => {
    const next = NEW_PEOPLE[(members.length - START.length) % NEW_PEOPLE.length];
    const id = `m${members.length + 1}`;
    setMembers((list) => [...list, { id, ...next, limit: 1000, active: true }]);
    toast({ title: `Card issued to ${next.name}`, description: "A virtual card is ready to use instantly." });
  };

  return (
    <div className={`${styles.card} p-6 sm:p-8`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h3 className={styles.heading3}>Team cards</h3>
          <p className="font-poppins text-dimWhite text-[14px] mt-1">Set limits and freeze cards in real time.</p>
        </div>
        <div className="text-left sm:text-right">
          <p className="font-poppins text-dimWhite text-[13px]">Active monthly limits</p>
          <p className="font-poppins font-semibold text-[28px] text-gradient">
            <AnimatedNumber value={total} format={usd} />
          </p>
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {members.map((m) => (
          <li key={m.id} className={`rounded-[16px] border border-white/5 bg-white/[0.03] p-4 transition ${m.active ? "" : "opacity-60"}`}>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-blue-gradient text-primary font-poppins font-semibold text-[14px] flex items-center justify-center">{initials(m.name)}</span>
              <div className="flex-1 min-w-0">
                <p className="font-poppins font-medium text-white text-[15px] truncate">{m.name}</p>
                <p className="font-poppins text-dimWhite text-[13px]">{m.role}</p>
              </div>
              <Switch checked={m.active} onChange={(v) => patch(m.id, { active: v })} label={m.active ? "Active" : "Frozen"} />
            </div>
            <div className="mt-4 flex items-center gap-4">
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
              <span className="font-poppins font-semibold text-white tabular-nums w-[72px] text-right">{usd(m.limit)}</span>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" onClick={add} disabled={members.length >= START.length + NEW_PEOPLE.length} className="mt-5 w-full rounded-[14px] border border-dashed border-white/20 py-3 font-poppins text-[15px] text-dimWhite hover:text-white hover:border-secondary/60 transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none">
        <Icon name="plus" size={16} /> Add team member
      </button>
    </div>
  );
};

export default TeamSpendControls;
