import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import CreditCard from "../../components/ui/CreditCard";
import Icon from "../../components/ui/Icon";
import RangeField from "../../components/ui/RangeField";
import Switch from "../../components/ui/Switch";
import { CARD_STORAGE_KEY } from "../../components/widgets/CardCustomizer";
import { cardColors, cardFinishes, defaultCardDesign } from "../../constants/cards";
import { useToast } from "../../context/ToastContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import usePageMeta from "../../hooks/usePageMeta";

const panel = "rounded-[24px] bg-black-gradient border border-white/5 p-5 sm:p-6";
const usd = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

const DashboardCards = () => {
  usePageMeta("Cards", "Manage your HooBank demo cards.");
  const toast = useToast();
  const [design] = useLocalStorage(CARD_STORAGE_KEY, defaultCardDesign);
  const [flipped, setFlipped] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [limit, setLimit] = useState(5000);
  const [controls, setControls] = useState({ online: true, contactless: true, atm: true, abroad: false });
  const [virtuals, setVirtuals] = useState([{ id: "v1", label: "Subscriptions", color: "aurora", finish: "holo", digits: "3307" }]);

  const toggleFreeze = (v) => {
    setFrozen(v);
    toast({ title: v ? "Card frozen" : "Card unfrozen", description: v ? "No new payments will go through until you unfreeze it." : "You’re good to go.", variant: v ? "info" : "success" });
  };

  const addVirtual = () => {
    const color = cardColors[Math.floor(Math.random() * cardColors.length)].id;
    const finish = cardFinishes[Math.floor(Math.random() * cardFinishes.length)].id;
    const digits = String(1000 + Math.floor(Math.random() * 9000));
    setVirtuals((list) => [...list, { id: `v${Date.now()}`, label: `Virtual card ${list.length + 1}`, color, finish, digits }]);
    toast({ title: "Virtual card created", description: `Ending in ${digits} — ready for online shopping.` });
  };

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText("4821 3390 1276 4821");
      toast({ title: "Card number copied", description: "Demo number — it won't work anywhere." });
    } catch {
      toast({ title: "Copy not available", description: "Your browser blocked clipboard access.", variant: "info" });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6">
      <section className={panel} aria-labelledby="main-card">
        <div className="flex items-center justify-between mb-5">
          <h2 id="main-card" className="font-poppins font-semibold text-white text-[18px]">Physical card</h2>
          <Link to="/cards#customizer" className="font-poppins text-[13px] text-secondary hover:underline flex items-center gap-1">
            <Icon name="sparkles" size={14} /> Edit design
          </Link>
        </div>
        <div className="max-w-[460px] mx-auto">
          <CreditCard design={design} flipped={flipped} frozen={frozen} />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-6 max-w-[460px] mx-auto">
          {[
            { icon: "rotate", label: flipped ? "Front" : "Flip", onClick: () => setFlipped((f) => !f), pressed: flipped },
            { icon: "snowflake", label: frozen ? "Unfreeze" : "Freeze", onClick: () => toggleFreeze(!frozen), pressed: frozen },
            { icon: reveal ? "eyeOff" : "eye", label: reveal ? "Hide" : "Details", onClick: () => setReveal((r) => !r), pressed: reveal },
          ].map((a) => (
            <button key={a.label} type="button" onClick={a.onClick} aria-pressed={a.pressed} className={`rounded-[16px] py-3 flex flex-col items-center gap-1.5 font-poppins text-[13px] transition ${a.pressed ? "bg-blue-gradient text-primary" : "bg-white/5 text-white hover:bg-white/10"}`}>
              <Icon name={a.icon} size={18} /> {a.label}
            </button>
          ))}
        </div>
        {reveal && (
          <dl className="grid grid-cols-2 gap-3 mt-5 max-w-[460px] mx-auto animate-fade-up">
            <div className="col-span-2 rounded-[14px] bg-white/5 p-4 flex items-center justify-between gap-3">
              <div>
                <dt className="font-poppins text-[12px] text-dimWhite">Card number</dt>
                <dd className="font-poppins text-white tabular-nums tracking-[0.08em]">4821 3390 1276 4821</dd>
              </div>
              <button type="button" onClick={copyNumber} aria-label="Copy card number" className="w-9 h-9 rounded-full hover:bg-white/10 text-dimWhite hover:text-white flex items-center justify-center">
                <Icon name="copy" size={16} />
              </button>
            </div>
            <div className="rounded-[14px] bg-white/5 p-4">
              <dt className="font-poppins text-[12px] text-dimWhite">Expiry</dt>
              <dd className="font-poppins text-white">08/29</dd>
            </div>
            <div className="rounded-[14px] bg-white/5 p-4">
              <dt className="font-poppins text-[12px] text-dimWhite">CVV</dt>
              <dd className="font-poppins text-white">123</dd>
            </div>
          </dl>
        )}
      </section>

      <div className="flex flex-col gap-6">
        <section className={panel} aria-labelledby="limits">
          <h2 id="limits" className="font-poppins font-semibold text-white text-[18px] mb-5">Limits & controls</h2>
          <RangeField label="Monthly spending limit" value={limit} min={500} max={20000} step={500} onChange={setLimit} format={usd} />
          <div className="flex justify-between font-poppins text-[13px] mt-3">
            <span className="text-dimWhite">Spent this month</span>
            <span className="text-white">{usd(1980)} ({Math.round((1980 / limit) * 100)}%)</span>
          </div>
          <div className="flex flex-col gap-5 mt-6">
            {[
              ["online", "Online payments", "Shop on the web and in apps"],
              ["contactless", "Contactless", "Tap to pay in stores"],
              ["atm", "ATM withdrawals", "Cash at any ATM worldwide"],
              ["abroad", "Payments abroad", "Use your card outside your home country"],
            ].map(([k, label, desc]) => (
              <Switch key={k} label={label} description={desc} checked={controls[k]} onChange={(v) => setControls((c) => ({ ...c, [k]: v }))} />
            ))}
          </div>
        </section>

        <section className={panel} aria-labelledby="virtual">
          <div className="flex items-center justify-between mb-4">
            <h2 id="virtual" className="font-poppins font-semibold text-white text-[18px]">Virtual cards</h2>
            <Button size="sm" variant="outline" onClick={addVirtual} disabled={virtuals.length >= 4}>
              <Icon name="plus" size={16} /> New
            </Button>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {virtuals.map((v) => (
              <li key={v.id} className="animate-fade-up">
                <CreditCard design={{ color: v.color, finish: v.finish, name: design.name, tier: "Virtual" }} lastDigits={v.digits} />
                <p className="font-poppins text-[13px] text-dimWhite mt-2 truncate">{v.label} · •••• {v.digits}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DashboardCards;
