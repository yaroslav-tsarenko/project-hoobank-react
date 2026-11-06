import { LogoMark } from "../ui/Logo";
import CreditCard from "../ui/CreditCard";
import Icon from "../ui/Icon";

const ACCOUNTS = [
  { code: "USD", label: "ACH · ••2209", amount: "$48,210.64" },
  { code: "EUR", label: "IBAN · ••3104", amount: "€12,480.20" },
  { code: "GBP", label: "Sort code · ••6621", amount: "£3,915.00" },
];

/** Hero illustration built from real UI pieces: balances panel, a card render and a payment notice. */
const HeroComposition = () => (
  <div className="relative w-full max-w-[560px] mx-auto pb-[150px] xs:pb-[170px]">
    <div className="relative bg-paper border border-line rounded-card shadow-float p-5 xs:p-7" aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <LogoMark size={24} />
          <span className="font-sans text-[13px] font-medium text-ink">Morgan Studio</span>
        </div>
        <span className="font-sans text-[12px] text-muted">Nov 3, 09:41</span>
      </div>
      <p className="font-sans text-[13px] text-muted mt-6">Total across accounts</p>
      <p className="font-serif text-[46px] xs:text-[56px] leading-none text-ink num mt-1">$66,731.77</p>
      <p className="font-sans text-[13px] text-positive mt-2 num">+$6,400.00 since Friday</p>

      <ul className="mt-6 border-t border-line">
        {ACCOUNTS.map((a) => (
          <li key={a.code} className="flex items-center gap-3 py-3 border-b border-line">
            <span className="w-11 h-7 rounded-[5px] border border-line bg-ivory font-sans font-semibold text-[11px] tracking-[0.06em] text-ink flex items-center justify-center">{a.code}</span>
            <span className="flex-1 font-sans text-[13px] text-muted num">{a.label}</span>
            <span className="font-sans font-medium text-[14px] text-ink num">{a.amount}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between pt-4">
        <span className="font-sans text-[13px] text-muted">Tax pot</span>
        <span className="flex items-center gap-3">
          <span className="w-24 xs:w-32 h-[3px] bg-line overflow-hidden">
            <span className="block h-full w-[79%] bg-forest" />
          </span>
          <span className="font-sans text-[13px] text-ink num">$14,200 of $18,000</span>
        </span>
      </div>
    </div>

    <div className="absolute left-0 xs:-left-6 bottom-6 xs:bottom-10 w-[46%] xs:w-[250px] bg-paper border border-line rounded-control shadow-lift p-3 flex items-start gap-3 animate-fade-up [animation-delay:500ms] z-[2]" aria-hidden="true">
      <span className="w-8 h-8 rounded-full bg-forest text-ivory flex items-center justify-center shrink-0">
        <Icon name="arrowDownLeft" size={15} />
      </span>
      <span className="min-w-0">
        <span className="block font-sans text-[13px] font-medium text-ink leading-tight">
          Halden Studio paid <span className="whitespace-nowrap">INV-0142</span>
        </span>
        <span className="block font-sans text-[12px] text-muted num mt-0.5">+$6,400.00, 25% to tax</span>
      </span>
    </div>

    <div className="absolute right-0 xs:-right-6 bottom-0 w-[56%] xs:w-[290px] rotate-[-5deg] z-[1]">
      <CreditCard design={{ color: "forest", finish: "linen", name: "Alex Morgan", tier: "Studio" }} tilt={false} label="Forest linen Northvault card" />
    </div>
  </div>
);

export default HeroComposition;
