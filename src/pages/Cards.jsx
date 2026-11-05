import { CTA } from "../components";
import Button from "../components/Button";
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

const HeroCards = () => (
  <div className="relative w-full max-w-[480px] h-[340px] xs:h-[380px]">
    <div className="absolute w-[70%] h-[70%] left-10 top-10 blue__gradient" aria-hidden="true" />
    {cardTiers.map((t, i) => (
      <div
        key={t.id}
        className="absolute w-[78%]"
        style={{ left: `${i * 11}%`, top: `${i * 22}%`, transform: `rotate(${-10 + i * 8}deg)`, zIndex: i }}
      >
        <CreditCard design={t.design} lastDigits={["1024", "4821", "7777"][i]} />
      </div>
    ))}
  </div>
);

const Cards = () => {
  usePageMeta("Cards", "Compare HooBank Classic, Plus and Premium cards and design your own in Card Studio with a live 3D preview.");
  const cardFaqs = faqs.filter((f) => f.category === "cards");

  return (
    <>
      <PageHero
        eyebrow="Card Studio is live"
        title="A card as"
        highlight="unique as you."
        description="Three tiers, six colours, four finishes and your name on the front. Tilt it, flip it, love it."
        aside={<HeroCards />}
      >
        <Button to="#customizer">Design your card</Button>
        <Button to="#lineup" variant="outline">
          Compare cards
        </Button>
      </PageHero>

      <Container id="lineup" className="py-16">
        <SectionHeading eyebrow="The lineup" title="Pick the card that fits your life" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardTiers.map((t, i) => (
            <Reveal key={t.id} delay={i * 120} className={`${styles.card} p-6 flex flex-col ${t.popular ? "border-gradient" : ""}`}>
              <CreditCard design={t.design} lastDigits={["1024", "4821", "7777"][i]} />
              <div className="flex items-center justify-between mt-6">
                <h3 className={styles.heading3}>{t.name}</h3>
                {t.popular && <span className="rounded-full bg-blue-gradient text-primary font-poppins font-medium text-[12px] px-3 py-1">Most popular</span>}
              </div>
              <p className="font-poppins text-gradient font-semibold text-[18px] mt-1">{t.price}</p>
              <ul className="flex flex-col gap-3 mt-5 mb-8">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-center gap-3 font-poppins text-[15px] text-dimWhite">
                    <Icon name="check" size={16} className="text-secondary" /> {p}
                  </li>
                ))}
              </ul>
              <Button to={`/signup?plan=${t.id === "classic" ? "starter" : t.id}`} variant={t.popular ? "primary" : "outline"} size="sm" className="mt-auto">
                Get {t.name}
              </Button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container id="customizer" className="py-16">
        <SectionHeading
          eyebrow="Card Studio"
          title="Design it. Tilt it. Flip it."
          description="Your design is saved on this device and shows up in the demo dashboard."
          className="mb-12"
        />
        <CardCustomizer />
      </Container>

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12">
          <SectionHeading eyebrow="Card FAQ" title="Questions about cards?">
            <Button to="/help" variant="outline" size="sm" className="mt-8">
              Visit Help Center
            </Button>
          </SectionHeading>
          <Accordion items={cardFaqs} defaultOpen={cardFaqs[0].id} />
        </div>
        <CTA title="Your new card is a minute away." primary={{ to: "/signup", label: "Open account" }} secondary={{ to: "/pricing", label: "See pricing" }} />
      </Container>
    </>
  );
};

export default Cards;
