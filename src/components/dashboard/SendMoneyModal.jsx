import { useState } from "react";
import { contacts } from "../../constants/dashboard";
import styles from "../../style";
import Button from "../Button";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";

const usd = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
const initials = (name) => name.split(" ").map((p) => p[0]).join("").slice(0, 2);

export const Avatar = ({ person, size = "w-11 h-11" }) =>
  person.img ? (
    <img src={person.img} alt="" className={`${size} rounded-full shrink-0`} />
  ) : (
    <span className={`${size} rounded-full shrink-0 bg-blue-gradient text-primary font-poppins font-semibold text-[14px] flex items-center justify-center`}>
      {initials(person.name)}
    </span>
  );

const TITLES = ["Send money", "How much?", "Confirm transfer", "Sending…", "Money sent"];

/** Multi-step mock transfer: recipient → amount → confirm → processing → success. */
const SendFlow = ({ balance, onSend, onClose }) => {
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const value = parseFloat(amount) || 0;
  const list = contacts.filter((c) => `${c.name} ${c.handle}`.toLowerCase().includes(query.trim().toLowerCase()));
  const custom = query.trim().length > 1 && list.length === 0 ? { id: "new", name: query.trim(), handle: "New recipient" } : null;

  const pick = (c) => {
    setRecipient(c);
    setStep(1);
  };

  const toConfirm = (e) => {
    e.preventDefault();
    if (value <= 0) return setError("Enter an amount greater than $0.");
    if (value > balance) return setError(`That's more than your balance of ${usd(balance)}.`);
    if (value > 10000) return setError("Demo limit is $10,000 per transfer.");
    setError("");
    setStep(2);
  };

  const confirm = () => {
    setStep(3);
    window.setTimeout(() => {
      onSend({ recipient, amount: value, note });
      setStep(4);
    }, 1400);
  };

  return (
    <div>
      <p className="font-poppins text-[13px] text-dimWhite mb-1">Step {Math.min(step + 1, 4)} of 4</p>
      <h2 className="font-poppins font-semibold text-[22px] text-white pr-10 mb-5">{TITLES[step]}</h2>
      <div className="h-1 rounded-full bg-white/10 mb-6 overflow-hidden">
        <div className="h-full bg-blue-gradient transition-all duration-500" style={{ width: `${(Math.min(step, 3) / 3) * 100}%` }} />
      </div>

      {step === 0 && (
        <div className="animate-fade-up">
          <label className="relative block">
            <span className="sr-only">Search contacts</span>
            <Icon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dimWhite" />
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name, @handle or phone" className={`${styles.input} pl-11`} />
          </label>
          <ul className="flex flex-col gap-1 mt-4 max-h-[300px] overflow-y-auto">
            {[...list, ...(custom ? [custom] : [])].map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => pick(c)} className="w-full flex items-center gap-3 rounded-[14px] p-3 hover:bg-white/5 transition text-left">
                  <Avatar person={c} />
                  <span className="flex-1">
                    <span className="block font-poppins text-white">{c.name}</span>
                    <span className="block font-poppins text-[13px] text-dimWhite">{c.handle}</span>
                  </span>
                  <Icon name="chevronRight" size={18} className="text-dimWhite" />
                </button>
              </li>
            ))}
            {list.length === 0 && !custom && <li className="font-poppins text-dimWhite text-[14px] p-3">Type at least 2 characters to add someone new.</li>}
          </ul>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={toConfirm} className="animate-fade-up flex flex-col gap-5" noValidate>
          <div className="flex items-center gap-3 rounded-[14px] bg-white/5 p-3">
            <Avatar person={recipient} />
            <span className="flex-1 font-poppins text-white">{recipient.name}</span>
            <button type="button" onClick={() => setStep(0)} className="font-poppins text-[13px] text-secondary hover:underline">
              Change
            </button>
          </div>
          <label className="block">
            <span className={styles.label}>Amount (USD)</span>
            <span className="relative block">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-poppins text-[28px] text-dimWhite">$</span>
              <input
                autoFocus
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1").slice(0, 9))}
                placeholder="0.00"
                aria-invalid={error ? true : undefined}
                className={`${styles.input} pl-10 text-[28px] font-semibold`}
              />
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {[20, 50, 100, 250].map((q) => (
              <button key={q} type="button" onClick={() => setAmount(String(q))} className={`${styles.chip} ${styles.chipIdle}`}>
                ${q}
              </button>
            ))}
          </div>
          <label className="block">
            <span className={styles.label}>Note (optional)</span>
            <input value={note} maxLength={60} onChange={(e) => setNote(e.target.value)} placeholder="Dinner 🍣" className={styles.input} />
          </label>
          {error && <p className="font-poppins text-[13px] text-red-300" role="alert">{error}</p>}
          <p className="font-poppins text-[13px] text-dimWhite">Available: {usd(balance)}</p>
          <div className="flex justify-between gap-3">
            <Button variant="ghost" size="sm" onClick={() => setStep(0)}>
              Back
            </Button>
            <Button type="submit" size="sm">
              Review <Icon name="arrowRight" size={16} />
            </Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="animate-fade-up flex flex-col gap-5">
          <div className="text-center rounded-[20px] bg-black-gradient p-6">
            <Avatar person={recipient} size="w-16 h-16 mx-auto" />
            <p className="font-poppins text-dimWhite text-[14px] mt-3">You’re sending</p>
            <p className="font-poppins font-semibold text-[40px] text-gradient">{usd(value)}</p>
            <p className="font-poppins text-white">to {recipient.name}</p>
          </div>
          <dl className="font-poppins text-[14px] flex flex-col gap-2">
            {[
              ["Fee", "$0.00"],
              ["Arrives", "Instantly"],
              ["Note", note || "—"],
              ["Balance after", usd(balance - value)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <dt className="text-dimWhite">{k}</dt>
                <dd className="text-white">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex justify-between gap-3">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
              Edit
            </Button>
            <Button size="sm" onClick={confirm}>
              <Icon name="lock" size={16} /> Confirm & send
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center py-10 gap-4" role="status">
          <div className="spinner" />
          <p className="font-poppins text-dimWhite">Securing your transfer…</p>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col items-center text-center py-4 gap-3" role="status">
          <span className="w-20 h-20 rounded-full bg-blue-gradient text-primary flex items-center justify-center animate-pop-in">
            <svg viewBox="0 0 24 24" className="w-10 h-10 check-draw" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <p className="font-poppins font-semibold text-[28px] text-white mt-2">{usd(value)} sent!</p>
          <p className="font-poppins text-dimWhite">{recipient.name} will get it instantly. (Demo — no real money moved.)</p>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" size="sm" onClick={() => { setStep(0); setRecipient(null); setAmount(""); setNote(""); setQuery(""); }}>
              Send another
            </Button>
            <Button size="sm" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

const SendMoneyModal = ({ open, onClose, balance, onSend }) => (
  <Modal open={open} onClose={onClose}>
    <SendFlow balance={balance} onSend={onSend} onClose={onClose} />
  </Modal>
);

export default SendMoneyModal;
