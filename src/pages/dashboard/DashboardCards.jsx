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
import { usd0 } from "../../lib/format";
import styles from "../../style";

const VIRTUAL_LABELS = ["Software subscriptions", "Ads budget", "Travel bookings", "Hosting"];

const DashboardCards = () => {
  usePageMeta("Cards", "Manage your Northvault demo cards.");
  const toast = useToast();
  const [design] = useLocalStorage(CARD_STORAGE_KEY, defaultCardDesign);
  const [flipped, setFlipped] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [limit, setLimit] = useState(5000);
  const [controls, setControls] = useState({ online: true, contactless: true, atm: true, abroad: false });
  const [virtuals, setVirtuals] = useState([{ id: "v1", label: VIRTUAL_LABELS[0], color: "graphite", finish: "matte", digits: "3307" }]);

  const toggleFreeze = (v) => {
    setFrozen(v);
    toast({ title: v ? "Card frozen" : "Card unfrozen", description: v ? "New payments will be declined until you unfreeze it." : "The card works again.", variant: v ? "info" : "success" });
  };

  const addVirtual = () => {
    const color = cardColors[Math.floor(Math.random() * cardColors.length)].id;
    const finish = cardFinishes[Math.floor(Math.random() * cardFinishes.length)].id;
    const digits = String(1000 + Math.floor(Math.random() * 9000));
    setVirtuals((list) => [...list, { id: `v${Date.now()}`, label: VIRTUAL_LABELS[list.length % VIRTUAL_LABELS.length], color, finish, digits }]);
    toast({ title: "Virtual card created", description: `Ending in ${digits}, ready for online payments.` });
  };

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText("4821 3390 1276 4821");
      toast({ title: "Card number copied", description: "A demo number; it will not work anywhere." });
    } catch {
      toast({ title: "Copy not available", description: "Your browser blocked clipboard access.", variant: "info" });
    }
  };

  const used = Math.round((1980 / limit) * 100);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5">
      <section className={`${styles.panel} lg:self-start`} aria-labelledby="main-card">
        <div className="flex items-center justify-between mb-5">
          <h2 id="main-card" className="font-sans font-semibold text-ink text-[15px]">
            Physical card
          </h2>
          <Link to="/cards#customizer" className="font-sans text-[13px] text-forest link">
            Edit design
          </Link>
        </div>
        <div className="max-w-[440px] mx-auto">
          <CreditCard design={design} flipped={flipped} frozen={frozen} />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-6 max-w-[440px] mx-auto">
          {[
            { icon: "rotate", label: flipped ? "Front" : "Flip", onClick: () => setFlipped((f) => !f), pressed: flipped },
            { icon: "snowflake", label: frozen ? "Unfreeze" : "Freeze", onClick: () => toggleFreeze(!frozen), pressed: frozen },
            { icon: reveal ? "eyeOff" : "eye", label: reveal ? "Hide" : "Details", onClick: () => setReveal((r) => !r), pressed: reveal },
          ].map((a) => (
            <button
              key={a.icon}
              type="button"
              onClick={a.onClick}
              aria-pressed={a.pressed}
              className={`rounded-control py-3 flex flex-col items-center gap-1.5 font-sans text-[13px] border transition ${a.pressed ? "bg-forest text-ivory border-forest" : "bg-paper text-ink border-line hover:border-ink/40"}`}
            >
              <Icon name={a.icon} size={18} /> {a.label}
            </button>
          ))}
        </div>
        {reveal && (
          <dl className="mt-5 max-w-[440px] mx-auto border-t border-line animate-fade-up">
            <div className="flex items-center justify-between gap-3 py-3 border-b border-line">
              <div>
                <dt className="font-sans text-[12px] text-muted">Card number</dt>
                <dd className="font-sans text-ink num tracking-[0.08em]">4821 3390 1276 4821</dd>
              </div>
              <button type="button" onClick={copyNumber} aria-label="Copy card number" className="w-9 h-9 rounded-full hover:bg-sand text-muted hover:text-ink flex items-center justify-center">
                <Icon name="copy" size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2">
              <div className="py-3 border-b border-line">
                <dt className="font-sans text-[12px] text-muted">Expires</dt>
                <dd className="font-sans text-ink num">08/29</dd>
              </div>
              <div className="py-3 border-b border-line">
                <dt className="font-sans text-[12px] text-muted">Security code</dt>
                <dd className="font-sans text-ink num">123</dd>
              </div>
            </div>
          </dl>
        )}
      </section>

      <div className="flex flex-col gap-5">
        <section className={styles.panel} aria-labelledby="limits">
          <h2 id="limits" className="font-sans font-semibold text-ink text-[15px] mb-5">
            Limits and controls
          </h2>
          <RangeField label="Monthly spending limit" value={limit} min={500} max={20000} step={500} onChange={setLimit} format={usd0} />
          <div className="flex justify-between font-sans text-[13px] mt-3">
            <span className="text-muted">Spent this month</span>
            <span className="text-ink num">
              {usd0(1980)} ({used}%)
            </span>
          </div>
          <div className="flex flex-col gap-5 mt-6 pt-5 border-t border-line">
            {[
              ["online", "Online payments", "Websites and in-app purchases"],
              ["contactless", "Contactless", "Tap to pay in shops"],
              ["atm", "Cash withdrawals", "Any ATM worldwide"],
              ["abroad", "Payments abroad", "Card use outside your home country"],
            ].map(([k, label, desc]) => (
              <Switch key={k} label={label} description={desc} checked={controls[k]} onChange={(v) => setControls((c) => ({ ...c, [k]: v }))} />
            ))}
          </div>
        </section>

        <section className={styles.panel} aria-labelledby="virtual">
          <div className="flex items-center justify-between mb-4">
            <h2 id="virtual" className="font-sans font-semibold text-ink text-[15px]">
              Virtual cards
            </h2>
            <Button size="sm" variant="outline" onClick={addVirtual} disabled={virtuals.length >= 4}>
              <Icon name="plus" size={16} /> New card
            </Button>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {virtuals.map((v) => (
              <li key={v.id} className="animate-fade-up">
                <CreditCard design={{ color: v.color, finish: v.finish, name: design.name, tier: "Virtual" }} lastDigits={v.digits} tilt={false} />
                <p className="font-sans text-[13px] text-muted mt-2 truncate num">
                  {v.label} · {v.digits}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DashboardCards;
