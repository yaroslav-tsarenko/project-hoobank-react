import { useState } from "react";
import { contacts } from "../../constants/dashboard";
import { usd } from "../../lib/format";
import styles from "../../style";
import Button from "../Button";
import Avatar from "../ui/Avatar";
import Icon from "../ui/Icon";
import Modal from "../ui/Modal";

const TITLES = ["Send money", "How much?", "Check and confirm", "Sending", "Transfer sent"];

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
  const custom = query.trim().length > 1 && list.length === 0 ? { id: "new", name: query.trim(), handle: "New payee · needs confirmation" } : null;

  const pick = (c) => {
    setRecipient(c);
    setStep(1);
  };

  const toConfirm = (e) => {
    e.preventDefault();
    if (value <= 0) return setError("Enter an amount greater than $0.");
    if (value > balance) return setError(`That is more than the ${usd(balance)} in your USD account.`);
    if (value > 10000) return setError("The demo limit is $10,000 per transfer.");
    setError("");
    setStep(2);
  };

  const confirm = () => {
    setStep(3);
    window.setTimeout(() => {
      onSend({ recipient, amount: value, note });
      setStep(4);
    }, 1300);
  };

  const reset = () => {
    setStep(0);
    setRecipient(null);
    setAmount("");
    setNote("");
    setQuery("");
  };

  return (
    <div>
      <p className="font-sans text-[13px] text-muted mb-1 num">Step {Math.min(step + 1, 4)} of 4</p>
      <h2 className="font-serif text-[32px] leading-tight text-ink pr-10 mb-5">{TITLES[step]}</h2>
      <div className="h-[2px] bg-line mb-6 overflow-hidden">
        <div className="h-full bg-forest transition-all duration-500" style={{ width: `${(Math.min(step, 3) / 3) * 100}%` }} />
      </div>

      {step === 0 && (
        <div className="animate-fade-up">
          <label className="relative block">
            <span className="sr-only">Search payees</span>
            <Icon name="search" size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Name, client or supplier" className={`${styles.input} pl-10`} />
          </label>
          <ul className="flex flex-col mt-3 max-h-[300px] overflow-y-auto">
            {[...list, ...(custom ? [custom] : [])].map((c) => (
              <li key={c.id} className="border-b border-line last:border-b-0">
                <button type="button" onClick={() => pick(c)} className="w-full flex items-center gap-3 px-2 py-3 hover:bg-sand/60 transition text-left">
                  <Avatar name={c.name} />
                  <span className="flex-1">
                    <span className="block font-sans text-ink">{c.name}</span>
                    <span className="block font-sans text-[13px] text-muted">{c.handle}</span>
                  </span>
                  <Icon name="chevronRight" size={18} className="text-muted" />
                </button>
              </li>
            ))}
            {list.length === 0 && !custom && <li className="font-sans text-muted text-[14px] p-3">Type at least two characters to add a new payee.</li>}
          </ul>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={toConfirm} className="animate-fade-up flex flex-col gap-5" noValidate>
          <div className="flex items-center gap-3 rounded-control border border-line p-3">
            <Avatar name={recipient.name} />
            <span className="flex-1 font-sans text-ink">{recipient.name}</span>
            <button type="button" onClick={() => setStep(0)} className="font-sans text-[13px] text-forest link">
              Change
            </button>
          </div>
          <label className="block">
            <span className={styles.label}>Amount, from the USD account</span>
            <span className="relative block">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-serif text-[32px] text-muted">$</span>
              <input
                autoFocus
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1").slice(0, 9))}
                placeholder="0.00"
                aria-invalid={error ? true : undefined}
                className={`${styles.input} pl-10 py-3 font-serif text-[32px] num`}
              />
            </span>
          </label>
          <div className="flex flex-wrap gap-2">
            {[250, 500, 1200, 2100].map((q) => (
              <button key={q} type="button" onClick={() => setAmount(String(q))} className={`${styles.chip} ${styles.chipIdle} num`}>
                {usd(q, 0)}
              </button>
            ))}
          </div>
          <label className="block">
            <span className={styles.label}>Reference (optional)</span>
            <input value={note} maxLength={60} onChange={(e) => setNote(e.target.value)} placeholder="e.g. October illustrations" className={styles.input} />
          </label>
          {error && (
            <p className="font-sans text-[13px] text-negative" role="alert">
              {error}
            </p>
          )}
          <p className="font-sans text-[13px] text-muted num">Available: {usd(balance)}</p>
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
          <div className="rounded-control bg-ivory border border-line p-6 text-center">
            <p className="font-sans text-muted text-[14px]">You are sending</p>
            <p className="font-serif text-[48px] leading-tight text-ink num">{usd(value)}</p>
            <p className="font-sans text-ink">to {recipient.name}</p>
          </div>
          <dl className="font-sans text-[14px] border-t border-line">
            {[
              ["Fee", "$0.00 (local transfer)"],
              ["Arrives", "Today, usually within minutes"],
              ["Reference", note || "None"],
              ["Balance after", usd(balance - value)],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2.5 border-b border-line">
                <dt className="text-muted">{k}</dt>
                <dd className="text-ink text-right num">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex justify-between gap-3">
            <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
              Edit
            </Button>
            <Button size="sm" onClick={confirm}>
              <Icon name="lock" size={16} /> Confirm and send
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col items-center py-10 gap-4" role="status">
          <div className="spinner" />
          <p className="font-sans text-muted">Confirming with your device</p>
        </div>
      )}

      {step === 4 && (
        <div className="flex flex-col items-center text-center py-4 gap-3" role="status">
          <span className="w-16 h-16 rounded-full bg-forest text-ivory flex items-center justify-center animate-pop-in">
            <svg viewBox="0 0 24 24" className="w-8 h-8 check-draw" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <p className="font-serif text-[34px] text-ink mt-2 num">{usd(value)} sent</p>
          <p className="font-sans text-muted max-w-[360px]">{recipient.name} should see it shortly. This is a demo, so no real money moved.</p>
          <div className="flex gap-3 mt-4">
            <Button variant="outline" size="sm" onClick={reset}>
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
