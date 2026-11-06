import Button from "../components/Button";
import CTA from "../components/CTA";
import Accordion from "../components/ui/Accordion";
import Container from "../components/ui/Container";
import CreditCard from "../components/ui/CreditCard";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import CardCustomizer from "../components/widgets/CardCustomizer";
import { cardTiers } from "../constants/cards";
import { faqs } from "../constants/faq";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const DIGITS = ["1024", "4821", "7730"];

const HeroCards = () => (
  <div className="relative w-full max-w-[460px] h-[320px] xs:h-[380px]">
    {cardTiers.map((t, i) => (
      <div key={t.id} className="absolute w-[76%]" style={{ left: `${i * 12}%`, top: `${i * 20}%`, transform: `rotate(${-7 + i * 6}deg)`, zIndex: i }}>
        <CreditCard design={t.design} lastDigits={DIGITS[i]} tilt={i === 2} />
      </div>
    ))}
  </div>
);

const SPECS = [
  ["Size", "ISO ID-1, 85.6 × 54 mm"],
  ["Network", "A major card network via the issuing partner"],
  ["Number on the card", "Last four digits only; full number in the app"],
  ["Contactless", "Yes, with Apple Pay and Google Pay"],
  ["Metal option", "Brushed stainless steel core, 13 g"],
];

const Cards = () => {
  usePageMeta("Cards", "Northvault cards for Solo, Studio and Team plans. Six materials, four finishes, per-card limits and instant freeze.");
  const cardFaqs = faqs.filter((f) => f.category === "cards");

  return (
    <>
      <PageHero
        eyebrow="Cards"
        title="A card that"
        highlight="looks the part."
        description="Six materials, four finishes and your name, printed small. Every card has its own limits, locks and receipts."
        aside={<HeroCards />}
      >
        <Button to="#customizer">Design your card</Button>
        <Button to="#lineup" variant="outline">
          Compare cards
        </Button>
      </PageHero>

      <Container id="lineup" className="py-16 sm:py-24">
        <SectionHeading index="01" eyebrow="The line-up" title="One card per plan, as many virtual cards as you need." className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line rounded-card overflow-hidden">
          {cardTiers.map((t, i) => (
            <Reveal key={t.id} delay={i * 100} className="bg-ivory p-6 sm:p-8 flex flex-col">
              <CreditCard design={t.design} lastDigits={DIGITS[i]} />
              <div className="flex items-baseline justify-between gap-3 mt-8">
                <h3 className="font-serif text-[34px] leading-none text-ink">{t.name}</h3>
                <p className="font-sans text-[15px] text-ink num">{t.price}</p>
              </div>
              {t.popular && <p className="font-sans text-[12px] uppercase tracking-[0.12em] text-brass-dark mt-2">Most chosen</p>}
              <ul className="mt-6 mb-8 border-t border-line">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 py-3 border-b border-line font-sans text-[15px] text-ink">
                    <Icon name="check" size={18} className="text-forest mt-0.5" /> {p}
                  </li>
                ))}
              </ul>
              <Button to={`/signup?plan=${t.id}`} variant={t.popular ? "primary" : "outline"} size="sm" className="mt-auto self-start">
                Choose {t.name}
              </Button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container id="customizer" className="py-16 sm:py-24 border-t border-line">
        <SectionHeading index="02" eyebrow="Card designer" title="Choose the material, then the finish." description="Your design is saved on this device and appears in the demo workspace." className="mb-12" />
        <CardCustomizer />
      </Container>

      <Container className="py-16 sm:py-24 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <SectionHeading index="03" eyebrow="Specification" title="The details." />
            <dl className="mt-10 border-t border-line">
              {SPECS.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[140px_1fr] gap-4 py-3 border-b border-line font-sans text-[14px]">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="md:col-span-7">
            <p className={`${styles.overline} mb-6`}>Card questions</p>
            <Accordion items={cardFaqs} defaultOpen={cardFaqs[0].id} />
            <Button to="/help" variant="outline" size="sm" className="mt-8">
              More in the help centre
            </Button>
          </div>
        </div>
        <CTA title="Your virtual card is ready the moment you sign up." primary={{ to: "/signup", label: "Open an account" }} secondary={{ to: "/pricing", label: "See pricing" }} />
      </Container>
    </>
  );
};

export default Cards;
