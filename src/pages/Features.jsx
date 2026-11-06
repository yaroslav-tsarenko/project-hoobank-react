import { Link } from "react-router-dom";
import Button from "../components/Button";
import CTA from "../components/CTA";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import FinanceCalculator from "../components/widgets/FinanceCalculator";
import { features } from "../constants";
import usePageMeta from "../hooks/usePageMeta";

/** Numbered feature entry used on /features and in related lists. */
export const FeatureEntry = ({ feature, index }) => (
  <Link to={`/features/${feature.slug}`} className="group flex flex-col h-full bg-ivory p-6 sm:p-8 hover:bg-paper transition-colors">
    <div className="flex items-center justify-between">
      <span className="font-sans text-[13px] text-brass-dark num">{String(index + 1).padStart(2, "0")}</span>
      <Icon name={feature.iconName} size={22} className="text-forest" />
    </div>
    <h3 className="font-serif text-[32px] leading-[1.1] text-ink mt-10 group-hover:text-forest transition-colors">{feature.title}</h3>
    <p className="font-sans text-[15px] leading-[1.6] text-muted mt-3">{feature.content}</p>
    <span className="mt-auto pt-8 inline-flex items-center gap-2 font-sans text-[14px] font-medium text-ink">
      Read more <Icon name="arrowRight" size={16} className="group-hover:translate-x-1 transition" />
    </span>
  </Link>
);

const Features = () => {
  usePageMeta("Platform", "Multi-currency accounts, invoices, tax pots, cards, transfers and security: everything in the Northvault platform.");
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="Six parts of one"
        highlight="business account."
        description="Each part works on its own and better together: an invoice is matched to a payment, the payment is split into pots, and the card spending lands next to both."
      >
        <Button to="/signup">Open an account</Button>
        <Button to="/product" variant="outline">
          Take the tour
        </Button>
      </PageHero>

      <Container className="py-16 sm:py-20">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-line border border-line rounded-card overflow-hidden">
          {features.map((f, i) => (
            <Reveal as="li" key={f.slug} delay={(i % 3) * 80}>
              <FeatureEntry feature={f} index={i} />
            </Reveal>
          ))}
        </ul>
      </Container>

      <Container className="py-16 sm:py-20 border-t border-line">
        <SectionHeading eyebrow="Planning" title="Two numbers worth knowing every month." description="How much to keep for tax, and how long the cash would last. Move the sliders; nothing is saved." className="mb-12" />
        <Reveal>
          <FinanceCalculator />
        </Reveal>
        <CTA title="Ready when the next invoice is." text="Open a Solo workspace for free. No minimum balance, no paperwork beyond ID." />
      </Container>
    </>
  );
};

export default Features;
