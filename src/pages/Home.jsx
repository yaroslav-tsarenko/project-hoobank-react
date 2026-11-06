import { Link } from "react-router-dom";
import Button from "../components/Button";
import CTA from "../components/CTA";
import HeroComposition from "../components/home/HeroComposition";
import Accordion from "../components/ui/Accordion";
import Avatar from "../components/ui/Avatar";
import Container from "../components/ui/Container";
import CreditCard from "../components/ui/CreditCard";
import Icon from "../components/ui/Icon";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import CurrencyConverter from "../components/widgets/CurrencyConverter";
import IncomeSplit from "../components/widgets/IncomeSplit";
import InvoicePreview from "../components/widgets/InvoicePreview";
import { testimonials } from "../constants";
import { faqs } from "../constants/faq";
import { feeLines, plans } from "../constants/pricing";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const FACTS = [
  { value: "12", label: "currencies in one workspace, with local details for USD, EUR and GBP" },
  { value: "0.35%", label: "over the mid-market rate on Studio, shown before you convert" },
  { value: "$0", label: "for local transfers over ACH, SEPA and Faster Payments" },
  { value: "4", label: "pots that split every client payment the moment it lands" },
];

const ACCOUNT_ROWS = [
  { code: "USD", name: "US dollar", rail: "ACH and wire", details: "Routing 0260 •••• · Account ••2209", note: "For US clients and platforms" },
  { code: "EUR", name: "Euro", rail: "SEPA", details: "IBAN DE89 3704 0044 •••• 3104", note: "For clients in the euro area" },
  { code: "GBP", name: "Pound sterling", rail: "Faster Payments", details: "Sort code 04-00-•• · Account ••6621", note: "For UK agencies and clients" },
  { code: "CHF · SEK · PLN · +6", name: "Held balances", rail: "Convert or pay out", details: "Hold, convert at mid-market, pay suppliers", note: "No local details" },
];

const CARD_POINTS = [
  { icon: "card", title: "A virtual card per subscription", text: "Cancel one tool without reissuing the card for everything else." },
  { icon: "users", title: "Cards for collaborators", text: "Monthly caps per person, frozen or unfrozen in one step." },
  { icon: "fileText", title: "Receipts attached to payments", text: "Forward the email or take a photo; it lands on the right line." },
];

const Hero = () => (
  <Container as="section" className="pt-10 sm:pt-16 pb-16 sm:pb-24">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10 items-center">
      <div className="md:col-span-6 animate-fade-up">
        <p className="section-marker max-w-[460px] mb-8">
          <span>Business banking for independents</span>
        </p>
        <h1 className={styles.display}>
          Business banking, kept in <em className="italic text-forest">good order.</em>
        </h1>
        <p className={`${styles.lead} mt-7 max-w-[520px]`}>
          Northvault gives freelancers and small teams multi-currency accounts, cards, invoices and transfers in one calm workspace, with every fee written out before you act.
        </p>
        <div className="flex flex-wrap gap-3 mt-9">
          <Button to="/signup">Open an account</Button>
          <Button to="/dashboard" variant="outline">
            Explore the demo <Icon name="arrowRight" size={16} />
          </Button>
        </div>
        <p className="font-sans text-[13px] text-faint mt-6">A product concept. No real accounts are opened and no money moves.</p>
      </div>
      <div className="md:col-span-6">
        <HeroComposition />
      </div>
    </div>
  </Container>
);

const Facts = () => (
  <Container as="section" aria-label="Northvault at a glance">
    <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-px bg-line border-y border-line">
      {FACTS.map((f, i) => (
        <Reveal as="li" key={f.value} delay={i * 80} className="bg-ivory py-7 xs:px-6">
          <p className={`${styles.bigNumber} text-[52px] leading-none`}>{f.value}</p>
          <p className="font-sans text-[15px] leading-[1.5] text-muted mt-3 max-w-[260px]">{f.label}</p>
        </Reveal>
      ))}
    </ul>
  </Container>
);

const Accounts = () => (
  <Container as="section" id="accounts" className="py-20 sm:py-28">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      <SectionHeading
        className="md:col-span-5"
        index="01"
        eyebrow="Accounts"
        title="Get paid like a local in three markets."
        description="Hand a US client ACH details, a Berlin agency an IBAN and a London studio a sort code. Each balance stays in its own currency until you decide to convert."
      >
        <Link to="/features/multi-currency-accounts" className="mt-8 inline-flex items-center gap-2 font-sans text-[15px] font-medium text-forest link">
          How multi-currency accounts work <Icon name="arrowRight" size={16} />
        </Link>
      </SectionHeading>
      <Reveal delay={100} className="md:col-span-7 md:pt-14">
        <div className={`${styles.card} overflow-hidden`}>
          <div className="hidden sm:grid grid-cols-[150px_1fr_150px] gap-4 px-6 py-3 border-b border-line bg-ivory/60 font-sans text-[12px] uppercase tracking-[0.12em] text-muted">
            <span>Currency</span>
            <span>Details you share</span>
            <span className="text-right">Rail</span>
          </div>
          <ul>
            {ACCOUNT_ROWS.map((a) => (
              <li key={a.code} className="grid grid-cols-1 sm:grid-cols-[150px_1fr_150px] gap-1 sm:gap-4 px-6 py-5 border-b border-line last:border-b-0">
                <span>
                  <span className="block font-sans font-semibold text-[15px] text-ink tracking-[0.04em]">{a.code}</span>
                  <span className="block font-sans text-[13px] text-muted">{a.name}</span>
                </span>
                <span>
                  <span className="block font-sans text-[15px] text-ink num">{a.details}</span>
                  <span className="block font-sans text-[13px] text-muted">{a.note}</span>
                </span>
                <span className="font-sans text-[14px] text-muted sm:text-right">{a.rail}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </Container>
);

const Invoices = () => (
  <section className="bg-paper border-y border-line">
    <Container className="py-20 sm:py-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <Reveal className="md:col-span-6 order-2 md:order-1">
          <InvoicePreview />
        </Reveal>
        <SectionHeading
          className="md:col-span-5 md:col-start-8 order-1 md:order-2"
          index="02"
          eyebrow="Invoices"
          title="The invoice and the account, finally in one place."
          description="Send an invoice with your Northvault details already on it. When the money arrives, it is matched, marked paid and split into your pots. Try it on the invoice."
        >
          <ul className="mt-8 w-full border-t border-line">
            {["Reminders before, on and after the due date", "Payment links for clients who prefer cards", "Export to Xero, QuickBooks or CSV"].map((t) => (
              <li key={t} className="flex gap-3 py-3 border-b border-line font-sans text-[15px] text-ink">
                <Icon name="check" size={18} className="text-forest mt-0.5" />
                {t}
              </li>
            ))}
          </ul>
        </SectionHeading>
      </div>
    </Container>
  </section>
);

const Pots = () => (
  <Container as="section" className="py-20 sm:py-28">
    <SectionHeading
      index="03"
      eyebrow="Pots"
      title="Know which part of the balance is yours."
      description="Set a rule once. Every client payment is split into tax, reserve, operating and pay-yourself pots as it lands, before anyone has a chance to spend it."
      className="mb-12"
    />
    <Reveal>
      <IncomeSplit />
    </Reveal>
  </Container>
);

const Cards = () => (
  <section className="bg-forest text-ivory overflow-hidden">
    <Container className="py-20 sm:py-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-14 items-center">
        <div className="md:col-span-5">
          <p className="flex items-center gap-4 font-sans font-medium uppercase tracking-[0.14em] text-[12px] text-ivory/75 mb-6 after:h-px after:flex-1 after:bg-ivory/20">
            <span className="text-brass-light num">04</span>
            <span>Cards</span>
          </p>
          <h2 className="font-serif text-[36px] leading-[1.05] sm:text-[48px] text-ivory">A card for each purpose, each with its own rules.</h2>
          <ul className="mt-10 border-t border-ivory/20">
            {CARD_POINTS.map((p) => (
              <li key={p.title} className="flex gap-4 py-5 border-b border-ivory/20">
                <Icon name={p.icon} size={20} className="text-brass-light mt-0.5" />
                <span>
                  <span className="block font-sans font-medium text-[16px] text-ivory">{p.title}</span>
                  <span className="block font-sans text-[15px] leading-[1.55] text-ivory/75 mt-1">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 mt-10">
            <Button to="/cards#customizer" variant="light">
              Design your card
            </Button>
            <Button to="/cards" variant="outlineLight">
              Compare cards
            </Button>
          </div>
        </div>
        <div className="md:col-span-7 relative min-h-[300px] xs:min-h-[380px] sm:min-h-[440px]">
          <div className="absolute left-[2%] top-[4%] w-[62%] rotate-[-8deg]">
            <CreditCard design={{ color: "ivory", finish: "matte", name: "Alex Morgan", tier: "Solo" }} lastDigits="1024" tilt={false} />
          </div>
          <div className="absolute right-[2%] top-[16%] w-[62%] rotate-[6deg]">
            <CreditCard design={{ color: "graphite", finish: "brushed", name: "Alex Morgan", tier: "Team" }} lastDigits="7730" tilt={false} />
          </div>
          <div className="absolute left-[18%] bottom-0 w-[64%]">
            <CreditCard design={{ color: "brass", finish: "mirror", name: "Alex Morgan", tier: "Studio" }} lastDigits="4821" />
          </div>
        </div>
      </div>
    </Container>
  </section>
);

const TryIt = () => (
  <Container as="section" id="try-it" className="py-20 sm:py-28">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
      <SectionHeading
        className="md:col-span-5"
        index="05"
        eyebrow="Currency"
        title="See the fee before you convert."
        description="The mid-market rate, our percentage and what a typical bank would have taken, side by side. Change the amount, the currencies or the plan."
      >
        <div className="mt-8 w-full border-t border-line">
          {[
            { to: "/cards#customizer", title: "Design a card", text: "Six materials, four finishes" },
            { to: "/product#calculator", title: "Plan your tax reserve", text: "How much to set aside each month" },
            { to: "/dashboard", title: "Open the demo workspace", text: "Send a mock transfer, freeze a card" },
          ].map((l) => (
            <Link key={l.to} to={l.to} className="group flex items-center gap-4 py-4 border-b border-line">
              <span className="flex-1">
                <span className="block font-sans font-medium text-[16px] text-ink group-hover:text-forest transition-colors">{l.title}</span>
                <span className="block font-sans text-[14px] text-muted">{l.text}</span>
              </span>
              <Icon name="arrowRight" size={18} className="text-muted group-hover:text-forest group-hover:translate-x-1 transition" />
            </Link>
          ))}
        </div>
      </SectionHeading>
      <Reveal delay={100} className="md:col-span-6 md:col-start-7 w-full">
        <CurrencyConverter />
      </Reveal>
    </div>
  </Container>
);

const Voices = () => (
  <section className="bg-paper border-y border-line">
    <Container className="py-20 sm:py-28">
      <SectionHeading index="06" eyebrow="From early testers" title="Quiet improvements, described plainly." className="mb-14" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x divide-line">
        {testimonials.map((t, i) => (
          <Reveal as="figure" key={t.id} delay={i * 100} className="md:px-8 first:md:pl-0 last:md:pr-0 flex flex-col">
            <blockquote className="flex-1 font-serif text-[26px] leading-[1.25] text-ink">“{t.content}”</blockquote>
            <figcaption className="flex items-center gap-3 mt-8">
              <Avatar name={t.name} />
              <span>
                <span className="block font-sans font-medium text-[15px] text-ink">{t.name}</span>
                <span className="block font-sans text-[13px] text-muted">{t.title}</span>
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
      <p className="font-sans text-[13px] text-faint mt-12">Fictional testers, written for this concept.</p>
    </Container>
  </section>
);

const PricingTeaser = () => (
  <Container as="section" className="py-20 sm:py-28">
    <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
      <SectionHeading className="md:col-span-5" index="07" eyebrow="Pricing" title="Fees you can read in one line." description="Three plans, one table of fees, nothing in the small print.">
        <dl className="mt-8 w-full border-t border-line">
          {feeLines.map((f) => (
            <div key={f.label} className="flex justify-between gap-4 py-3 border-b border-line font-sans text-[15px]">
              <dt className="text-muted">{f.label}</dt>
              <dd className="text-ink font-medium num">{f.value}</dd>
            </div>
          ))}
        </dl>
      </SectionHeading>
      <Reveal delay={100} className="md:col-span-7 md:pt-14">
        <ul className={`${styles.card} divide-y divide-line`}>
          {plans.map((p) => (
            <li key={p.id} className="grid grid-cols-1 xs:grid-cols-[1fr_auto] gap-x-6 gap-y-4 p-6 sm:p-7 xs:items-center">
              <div>
                <p className="font-serif text-[30px] leading-none text-ink">
                  {p.name}
                  {p.popular && <span className="block xs:inline xs:ml-3 mt-2 xs:mt-0 align-middle font-sans text-[12px] uppercase tracking-[0.12em] text-brass-dark">Most chosen</span>}
                </p>
                <p className="font-sans text-[15px] text-muted mt-2 max-w-[380px]">{p.description}</p>
              </div>
              <p className="xs:text-right">
                <span className="font-serif text-[40px] leading-none text-ink num">${p.annual}</span>
                <span className="block font-sans text-[13px] text-muted">{p.annual ? "per month, billed yearly" : "free, always"}</span>
              </p>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3 mt-6">
          <Button to="/pricing" variant="outline">
            Compare plans in detail
          </Button>
        </div>
      </Reveal>
    </div>
  </Container>
);

const Questions = () => {
  const items = faqs.filter((f) => ["f2", "f7", "f8", "f11"].includes(f.id));
  return (
    <Container as="section" className="pb-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-line pt-20 sm:pt-28">
        <SectionHeading className="md:col-span-5" index="08" eyebrow="Questions" title="Before you ask.">
          <Link to="/help" className="mt-8 inline-flex items-center gap-2 font-sans text-[15px] font-medium text-forest link">
            All answers in the help centre <Icon name="arrowRight" size={16} />
          </Link>
        </SectionHeading>
        <Reveal delay={100} className="md:col-span-7">
          <Accordion items={items} defaultOpen="f2" />
        </Reveal>
      </div>
    </Container>
  );
};

const Home = () => {
  usePageMeta(null);
  return (
    <>
      <Hero />
      <Facts />
      <Accounts />
      <Invoices />
      <Pots />
      <Cards />
      <TryIt />
      <Voices />
      <PricingTeaser />
      <Questions />
      <Container>
        <CTA />
      </Container>
    </>
  );
};

export default Home;
