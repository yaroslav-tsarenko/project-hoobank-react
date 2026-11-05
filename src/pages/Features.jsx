import { CTA } from "../components";
import Button from "../components/Button";
import { FeatureCard } from "../components/Business";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import FinanceCalculator from "../components/widgets/FinanceCalculator";
import { features } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

const Features = () => {
  usePageMeta("Features", "Rewards, security, balance transfers, instant payments, global transfers and smart budgeting — everything HooBank can do.");
  return (
    <>
      <PageHero
        eyebrow="Six reasons to switch"
        title="Everything your money"
        highlight="needs to grow."
        description="From rewards that actually add up to bank-grade security and instant global transfers, HooBank packs a full bank into one beautiful app."
      >
        <Button to="/signup">Open free account</Button>
        <Button to="/product" variant="outline">
          Take the tour
        </Button>
      </PageHero>

      <Container className="pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.slug} delay={(i % 3) * 100}>
              <FeatureCard {...f} className="h-full bg-white/[0.02] border border-white/5" />
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeading
          eyebrow="Do the maths"
          title="See what HooBank saves you"
          description="Play with the numbers — every result updates instantly."
          className="mb-10"
        />
        <Reveal>
          <FinanceCalculator />
        </Reveal>
        <CTA title="Ready when you are." text="Open an account in under five minutes. No paperwork, no minimum balance." />
      </Container>
    </>
  );
};

export default Features;
