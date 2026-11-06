import { useEffect, useState } from "react";
import Button from "../components/Button";
import CTA from "../components/CTA";
import Container from "../components/ui/Container";
import CreditCard from "../components/ui/CreditCard";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Phone from "../components/ui/Phone";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import CurrencyConverter from "../components/widgets/CurrencyConverter";
import FinanceCalculator from "../components/widgets/FinanceCalculator";
import { initialTransactions, openInvoices, savingsGoals, spendingCategories } from "../constants/dashboard";
import usePageMeta from "../hooks/usePageMeta";
import { fmt, signed, usd0 } from "../lib/format";

const STEPS = [
  { id: "open", title: "Open a workspace", text: "Photo ID, a selfie and your business details. Sole traders can start with personal ID only." },
  { id: "card", title: "Get your cards", text: "A virtual card is ready straight away; the physical card follows in three to five working days." },
  { id: "invoice", title: "Send your first invoice", text: "Your account details are filled in for you. Reminders go out on the schedule you choose." },
  { id: "pots", title: "Split every payment", text: "Tax, reserve, operating and pay-yourself pots fill up as client payments land." },
];

const Screen = ({ step }) => {
  switch (step) {
    case "open":
      return (
        <div className="flex flex-col gap-3 px-5 py-3">
          <p className="font-serif text-[26px] leading-tight text-ink">Your business</p>
          <div className="h-[2px] bg-line">
            <div className="h-full w-2/3 bg-forest" />
          </div>
          {[
            ["Trading name", "Morgan Studio"],
            ["Business type", "Sole trader"],
            ["Country", "Germany"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-[8px] bg-paper border border-line px-3 py-2">
              <p className="font-sans text-[11px] text-muted">{k}</p>
              <p className="font-sans text-[13px] text-ink">{v}</p>
            </div>
          ))}
          <div className="rounded-full bg-forest text-ivory text-center py-2.5 font-sans font-medium text-[13px] mt-2">Continue</div>
          <p className="font-sans text-[11px] text-muted text-center">Step 2 of 3 · ID check next</p>
        </div>
      );
    case "card":
      return (
        <div className="px-5 py-3 flex flex-col gap-4">
          <p className="font-serif text-[26px] leading-tight text-ink">Cards</p>
          <CreditCard design={{ color: "forest", finish: "linen", name: "Alex Morgan", tier: "Studio" }} tilt={false} />
          <div className="grid grid-cols-3 gap-2">
            {["Freeze", "Details", "Limits"].map((a) => (
              <div key={a} className="rounded-[8px] border border-line bg-paper py-2 text-center font-sans text-[11px] text-ink">
                {a}
              </div>
            ))}
          </div>
          <div className="border-t border-line pt-3">
            <p className="font-sans text-[11px] text-muted">Virtual · Software subscriptions</p>
            <p className="font-sans text-[13px] text-ink num">•••• 3307 · $400 monthly cap</p>
          </div>
        </div>
      );
    case "invoice":
      return (
        <div className="px-5 py-3 flex flex-col gap-3">
          <p className="font-serif text-[26px] leading-tight text-ink">Invoices</p>
          <ul className="border-t border-line">
            {openInvoices.map((inv) => (
              <li key={inv.id} className="flex items-center justify-between py-2.5 border-b border-line">
                <span>
                  <span className="block font-sans text-[13px] text-ink">{inv.client}</span>
                  <span className="block font-sans text-[11px] text-muted num">{inv.id}</span>
                </span>
                <span className="text-right">
                  <span className="block font-sans text-[13px] text-ink num">{fmt(inv.amount, inv.currency, 0)}</span>
                  <span className={`block font-sans text-[11px] ${inv.status === "Overdue" ? "text-negative" : "text-muted"}`}>{inv.status}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="rounded-full border border-ink/25 text-ink text-center py-2 font-sans font-medium text-[12px]">New invoice</div>
        </div>
      );
    default:
      return (
        <div className="px-5 py-3 flex flex-col gap-4">
          <p className="font-serif text-[26px] leading-tight text-ink">Pots</p>
          {savingsGoals.map((g) => (
            <div key={g.id}>
              <div className="flex justify-between font-sans text-[12px] mb-1.5">
                <span className="text-ink">{g.name}</span>
                <span className="text-muted num">{usd0(g.saved)}</span>
              </div>
              <div className="h-[3px] bg-line">
                <div className="h-full" style={{ width: `${(g.saved / g.target) * 100}%`, background: g.color }} />
              </div>
            </div>
          ))}
          <div className="rounded-[8px] bg-paper border border-line p-3 font-sans text-[12px] text-muted">
            <span className="text-forest font-semibold num">+$1,600.00</span> moved to Income tax from INV-0142
          </div>
        </div>
      );
  }
};

const ProductTour = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => setActive((a) => (a + 1) % STEPS.length), 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)}>
      <ol className="md:col-span-6 border-t border-line" aria-label="Product tour steps">
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.id} className="border-b border-line">
              <button type="button" onClick={() => setActive(i)} aria-current={on ? "step" : undefined} className="w-full text-left py-6 grid grid-cols-[48px_1fr] gap-4 group">
                <span className={`font-serif text-[34px] leading-none num transition-colors ${on ? "text-forest" : "text-faint group-hover:text-ink"}`}>{i + 1}</span>
                <span>
                  <span className={`block font-serif text-[28px] leading-tight transition-colors ${on ? "text-ink" : "text-muted group-hover:text-ink"}`}>{s.title}</span>
                  <span className={`block font-sans text-[15px] leading-[1.6] text-muted overflow-hidden transition-all ${on ? "max-h-24 mt-2 opacity-100" : "max-h-0 opacity-0"}`}>{s.text}</span>
                  {on && (
                    <span className="block h-[2px] bg-line mt-4 overflow-hidden">
                      <span key={`${active}-${paused}`} className={`block h-full bg-forest ${paused ? "w-full" : "tour-progress"}`} />
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="md:col-span-6 flex justify-center">
        <div className="rounded-card bg-sand/70 border border-line w-full flex justify-center py-12">
          <Phone active={active}>
            <div key={STEPS[active].id} className="h-full animate-fade-up" aria-live="polite">
              <Screen step={STEPS[active].id} />
            </div>
          </Phone>
        </div>
      </div>
    </div>
  );
};

const MobileLedger = () => (
  <Phone active={0}>
    <div className="px-5 py-3">
      <p className="font-sans text-[12px] text-muted">USD account</p>
      <p className="font-serif text-[34px] leading-tight text-ink num">$48,210.64</p>
      <ul className="mt-3 border-t border-line">
        {initialTransactions.slice(0, 7).map((t) => (
          <li key={t.id} className="flex items-center justify-between gap-2 py-2 border-b border-line">
            <span className="min-w-0">
              <span className="block font-sans text-[12px] text-ink truncate">{t.name}</span>
              <span className="block font-sans text-[10px] text-muted">{spendingCategories[t.category].label}</span>
            </span>
            <span className={`font-sans text-[12px] num shrink-0 ${t.amount > 0 ? "text-positive" : "text-ink"}`}>{signed(t.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  </Phone>
);

const Product = () => {
  usePageMeta("Product tour", "A tour of Northvault: open a workspace, get cards, send invoices and split every payment into pots.");
  return (
    <>
      <PageHero
        eyebrow="Product tour"
        title="From first invoice to"
        highlight="year-end export."
        description="How a working week looks in Northvault. Everything on this page is interactive, so go ahead and press things."
      >
        <Button to="#tour">Start the tour</Button>
        <Button to="/dashboard" variant="outline">
          Open the demo workspace
        </Button>
      </PageHero>

      <Container id="tour" className="py-16 sm:py-24">
        <SectionHeading index="01" eyebrow="How it works" title="Four steps to a working account." className="mb-12" />
        <ProductTour />
      </Container>

      <Container id="calculator" className="py-16 sm:py-24 border-t border-line">
        <SectionHeading index="02" eyebrow="Planning" title="Plan with real numbers." description="Estimate a tax reserve or see how long your cash would last at the current pace." className="mb-12" />
        <Reveal>
          <FinanceCalculator />
        </Reveal>
      </Container>

      <Container id="converter" className="py-16 sm:py-24 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <SectionHeading
            className="md:col-span-5"
            index="03"
            eyebrow="Currency"
            title="Hold it, convert it, or pay with it."
            description="Keep euros for euro costs, convert the rest when the rate suits you. The fee is a fixed percentage over mid-market, written next to the result."
          >
            <Button to="/features/multi-currency-accounts" variant="outline" className="mt-8">
              Multi-currency accounts
            </Button>
          </SectionHeading>
          <Reveal delay={100} className="md:col-span-6 md:col-start-7">
            <CurrencyConverter />
          </Reveal>
        </div>
      </Container>

      <Container className="py-16 sm:py-24 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <Reveal className="md:col-span-6 flex justify-center">
            <div className="rounded-card bg-forest w-full flex justify-center py-12">
              <MobileLedger />
            </div>
          </Reveal>
          <SectionHeading
            className="md:col-span-5 md:col-start-8"
            index="04"
            eyebrow="On your phone"
            title="The same ledger, in your pocket."
            description="The concept is designed mobile-first: approve a payment, snap a receipt or freeze a card from the queue at the post office."
          >
            <ul className="mt-8 w-full border-t border-line">
              {["Passkey sign-in with Face ID or fingerprint", "Receipts captured from the camera", "Push notifications for every payment"].map((t) => (
                <li key={t} className="flex gap-3 py-3 border-b border-line font-sans text-[15px] text-ink">
                  <Icon name="check" size={18} className="text-forest mt-0.5" /> {t}
                </li>
              ))}
            </ul>
          </SectionHeading>
        </div>
        <CTA />
      </Container>
    </>
  );
};

export default Product;
