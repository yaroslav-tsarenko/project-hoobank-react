import Button from "../components/Button";
import CTA from "../components/CTA";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import { LogoMark } from "../components/ui/Logo";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import usePageMeta from "../hooks/usePageMeta";

const PRINCIPLES = [
  { title: "Show the fee before the button", text: "Every action that costs money shows the cost, the rate and the result first. No percentages folded into exchange rates." },
  { title: "Separate the money that is not yours", text: "Tax and reserves are taken out as payments arrive, so the balance you see is the balance you can spend." },
  { title: "Fewer screens, denser ones", text: "People running a business want the ledger, not a feed. Tables, hairlines and tabular figures over cards and confetti." },
  { title: "Quiet by default", text: "One brand colour, one accent, no animation that is not explaining something." },
];

const PALETTE = [
  { name: "Ivory", hex: "#F6F3EC", cls: "bg-ivory border border-line", text: "text-ink" },
  { name: "Forest", hex: "#0E3B2C", cls: "bg-forest", text: "text-ivory" },
  { name: "Brass", hex: "#B8893D", cls: "bg-brass", text: "text-ink" },
  { name: "Ink", hex: "#121614", cls: "bg-ink", text: "text-ivory" },
];

const ROADMAP = [
  { phase: "Phase 1", title: "Accounts and cards", text: "USD, EUR and GBP accounts with local details, debit cards, local transfers." },
  { phase: "Phase 2", title: "Invoices and pots", text: "Invoicing with payment matching, reminders, and percentage rules for pots." },
  { phase: "Phase 3", title: "Teams", text: "Roles, approvals, team cards with limits and the accountant view." },
  { phase: "Phase 4", title: "More currencies", text: "Local details for CHF, SEK and PLN; scheduled conversions with rate alerts." },
];

const About = () => {
  usePageMeta("About the concept", "Northvault is a product concept by Yaroslav Tsarenko: the brief, the principles, the design system and the roadmap.");
  return (
    <>
      <PageHero
        eyebrow="About the concept"
        title="A business bank designed as if"
        highlight="calm were a feature."
        description="Northvault is a product concept: a business account for freelancers and small teams, designed and built as a working front-end prototype. This page is the brief behind it."
        aside={
          <figure className="w-full max-w-[420px] border-l-2 border-brass pl-6">
            <blockquote className="font-serif text-[32px] leading-[1.2] text-ink">“The balance you can spend should be the balance you see.”</blockquote>
            <figcaption className="font-sans text-[14px] text-muted mt-5">The one-line brief</figcaption>
          </figure>
        }
      >
        <Button to="/dashboard">Open the demo</Button>
        <Button to="/blog/designing-a-quiet-bank" variant="outline">
          Read the design notes
        </Button>
      </PageHero>

      <Container className="py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <SectionHeading className="md:col-span-5" index="01" eyebrow="The problem" title="Independents run a business on a personal account." />
          <Reveal className="md:col-span-7 flex flex-col gap-5 font-sans text-[18px] leading-[1.65] text-muted">
            <p>
              A freelance designer in Berlin invoices a US platform in dollars, a London agency in pounds and a local client in euros. The money lands in one account, gets converted at a rate nobody checked, and mixes with the money that belongs to
              the tax office.
            </p>
            <p>
              Northvault explores what an account would look like if it were built around that week: local details in three markets, invoices matched to payments, and pots that fill themselves — presented with the restraint of a private bank
              rather than the noise of a consumer app.
            </p>
          </Reveal>
        </div>
      </Container>

      <Container className="py-16 sm:py-24 border-t border-line">
        <SectionHeading index="02" eyebrow="Principles" title="Four rules the design follows." className="mb-12" />
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line rounded-card overflow-hidden">
          {PRINCIPLES.map((p, i) => (
            <Reveal as="li" key={p.title} delay={(i % 2) * 80} className="bg-ivory p-6 sm:p-8">
              <span className="font-serif text-[40px] leading-none text-brass-dark num">{i + 1}</span>
              <h3 className="font-serif text-[30px] leading-[1.1] text-ink mt-6">{p.title}</h3>
              <p className="font-sans text-[15px] leading-[1.6] text-muted mt-3 max-w-[460px]">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>

      <Container className="py-16 sm:py-24 border-t border-line">
        <SectionHeading index="03" eyebrow="Design system" title="Two typefaces, four colours, one rule." description="Instrument Serif for headlines and large figures, Instrument Sans for everything you read or press. Hairline rules do the work that shadows and gradients usually do." className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <Reveal className="md:col-span-7 rounded-card bg-paper border border-line p-6 sm:p-10 grid grid-cols-1 xs:grid-cols-2 gap-8">
            <div>
              <p className="font-serif text-[120px] leading-none text-ink">Aa</p>
              <p className="font-sans text-[14px] text-ink mt-4 font-medium">Instrument Serif</p>
              <p className="font-sans text-[13px] text-muted">Display, headlines, balances</p>
            </div>
            <div>
              <p className="font-sans text-[120px] leading-none text-ink tracking-[-0.03em]">Aa</p>
              <p className="font-sans text-[14px] text-ink mt-4 font-medium">Instrument Sans</p>
              <p className="font-sans text-[13px] text-muted">Interface, body, tables</p>
            </div>
            <p className="xs:col-span-2 font-serif text-[44px] leading-none text-ink num border-t border-line pt-6">$48,210.64 · €12,480.20</p>
          </Reveal>
          <Reveal delay={100} className="md:col-span-5 grid grid-cols-2 gap-px bg-line border border-line rounded-card overflow-hidden">
            {PALETTE.map((c) => (
              <div key={c.name} className={`${c.cls} p-5 flex flex-col justify-between min-h-[150px]`}>
                <span className={`font-serif text-[28px] ${c.text}`}>{c.name}</span>
                <span className={`font-sans text-[13px] num ${c.text} opacity-80`}>{c.hex}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>

      <Container className="py-16 sm:py-24 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <SectionHeading className="md:col-span-5" index="04" eyebrow="Roadmap" title="If it were built for real." description="The order a launch with a licensed partner institution would likely follow." />
          <ol className="md:col-span-7 border-t border-line">
            {ROADMAP.map((r, i) => (
              <Reveal as="li" key={r.phase} delay={i * 60} className="grid grid-cols-1 xs:grid-cols-[120px_1fr] gap-2 xs:gap-6 py-6 border-b border-line">
                <span className="font-sans text-[13px] uppercase tracking-[0.12em] text-brass-dark pt-1">{r.phase}</span>
                <span>
                  <span className="block font-serif text-[28px] leading-tight text-ink">{r.title}</span>
                  <span className="block font-sans text-[15px] leading-[1.6] text-muted mt-1">{r.text}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>

      <Container className="py-16 sm:py-24 border-t border-line">
        <Reveal className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-2">
            <LogoMark size={88} />
          </div>
          <div className="md:col-span-7">
            <p className="font-sans text-[12px] uppercase tracking-[0.14em] text-muted">Credits</p>
            <p className="font-serif text-[36px] leading-[1.15] text-ink mt-3">Concept, product design and front-end by Yaroslav Tsarenko.</p>
            <p className="font-sans text-[15px] text-muted mt-3">React, React Router, Vite and Tailwind CSS. Every illustration, card and chart on this site is drawn in HTML, CSS or SVG.</p>
          </div>
          <div className="md:col-span-3 flex md:justify-end">
            <Button to="/contact" variant="outline">
              Get in touch <Icon name="arrowRight" size={16} />
            </Button>
          </div>
        </Reveal>
        <CTA title="See it working." text="The demo workspace has balances, cards, transfers and settings, all simulated in your browser." primary={{ to: "/dashboard", label: "Open the demo" }} secondary={{ to: "/careers", label: "Example careers page" }} />
      </Container>
    </>
  );
};

export default About;
