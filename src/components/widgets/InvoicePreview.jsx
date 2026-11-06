import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import { fmt } from "../../lib/format";
import { LogoMark } from "../ui/Logo";
import Icon from "../ui/Icon";

const LINES = [
  { item: "Brand identity, phase 2", qty: 1, price: 3000 },
  { item: "Design system documentation", qty: 1, price: 1200 },
];
const TOTAL = LINES.reduce((s, l) => s + l.qty * l.price, 0);

/** An invoice document drawn in HTML. "Simulate payment" shows how matching works. */
const InvoicePreview = ({ className = "", interactive = true }) => {
  const [paid, setPaid] = useState(false);
  const toast = useToast();

  const simulate = () => {
    setPaid(true);
    toast({ title: "INV-0145 matched and marked paid", description: "€4,200.00 arrived by SEPA; €1,050.00 moved to the tax pot. (Demo)" });
  };

  const timeline = [
    { label: "Sent", date: "Nov 1", done: true },
    { label: "Viewed", date: "Nov 2", done: true },
    { label: paid ? "Paid" : "Reminder", date: paid ? "Nov 6" : "Nov 11", done: paid },
  ];

  return (
    <div className={`bg-paper border border-line rounded-card shadow-lift overflow-hidden ${className}`}>
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-serif text-[26px] leading-none text-ink">Morgan Studio</p>
            <p className="font-sans text-[13px] text-muted mt-2">Alex Morgan · Berlin</p>
          </div>
          <div className="text-right">
            <p className="font-sans text-[12px] uppercase tracking-[0.14em] text-muted">Invoice</p>
            <p className="font-sans font-semibold text-[15px] text-ink num mt-1">INV-0145</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-8 font-sans text-[13px]">
          <div>
            <p className="text-muted">Billed to</p>
            <p className="text-ink mt-1">Orbit Labs GmbH</p>
            <p className="text-muted">Torstraße 12, Berlin</p>
          </div>
          <div className="text-right">
            <p className="text-muted">Due</p>
            <p className="text-ink mt-1 num">14 November 2026</p>
            <p className="text-muted">Net 14</p>
          </div>
        </div>

        <table className="w-full mt-8 font-sans text-[14px]">
          <caption className="sr-only">Invoice lines</caption>
          <thead>
            <tr className="text-muted text-left border-b border-ink">
              <th scope="col" className="font-normal pb-2">Description</th>
              <th scope="col" className="font-normal pb-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {LINES.map((l) => (
              <tr key={l.item} className="border-b border-line">
                <td className="py-3 text-ink">{l.item}</td>
                <td className="py-3 text-right text-ink num">{fmt(l.price * l.qty, "EUR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-baseline justify-between mt-4">
          <p className="font-sans text-[13px] text-muted max-w-[60%]">VAT reverse charge applies.</p>
          <p className="font-serif text-[34px] leading-none text-ink num">{fmt(TOTAL, "EUR")}</p>
        </div>

        <div className="mt-6 rounded-control bg-ivory border border-line px-4 py-3 flex items-center gap-3">
          <LogoMark size={26} />
          <p className="font-sans text-[13px] text-muted min-w-0">
            Pay to <span className="text-ink num">DE89 3704 0044 •••• 3104</span> · Northvault EUR account
          </p>
        </div>
      </div>

      <div className="border-t border-line bg-ivory/60 px-6 sm:px-8 py-4">
        <ol className="flex items-center gap-2 font-sans text-[12px]" aria-label="Invoice status">
          {timeline.map((t, i) => (
            <li key={t.label} className="flex items-center gap-2 flex-1 min-w-0">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${t.done ? "bg-forest border-forest text-ivory" : "border-ink/30 text-muted bg-paper"}`}>
                {t.done ? <Icon name="check" size={11} strokeWidth={2.5} /> : <span className="w-1.5 h-1.5 rounded-full bg-ink/30" />}
              </span>
              <span className="min-w-0">
                <span className={`block ${t.done ? "text-ink font-medium" : "text-muted"}`}>{t.label}</span>
                <span className="block text-muted num">{t.date}</span>
              </span>
              {i < timeline.length - 1 && <span className="h-px flex-1 bg-line hidden xs:block" />}
            </li>
          ))}
        </ol>
        {interactive && (
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-line">
            <p className="font-sans text-[13px] text-muted" aria-live="polite">
              {paid ? "Matched to an incoming SEPA payment; 25% moved to the tax pot." : "Waiting for payment from Orbit Labs."}
            </p>
            <button
              type="button"
              onClick={paid ? () => setPaid(false) : simulate}
              className={`h-9 px-4 rounded-full font-sans text-[13px] font-medium transition ${paid ? "border border-line text-ink hover:border-ink/40" : "bg-forest text-ivory hover:bg-forest-700"}`}
            >
              {paid ? "Reset" : "Simulate payment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicePreview;
