import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import CTA from "../components/CTA";
import Container from "../components/ui/Container";
import CountUp from "../components/ui/CountUp";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import CurrencyConverter from "../components/widgets/CurrencyConverter";
import FeeEstimator from "../components/widgets/FeeEstimator";
import IncomeSplit from "../components/widgets/IncomeSplit";
import InvoicePreview from "../components/widgets/InvoicePreview";
import SecurityCheckup from "../components/widgets/SecurityCheckup";
import TeamSpendControls from "../components/widgets/TeamSpendControls";
import { features, getFeature } from "../constants";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";
import NotFound from "./NotFound";

const STEPS = [
  { title: "Open a workspace", text: "ID check and business details, about ten minutes in the concept flow." },
  { title: "Turn it on", text: "Every feature is on by default where it makes sense, and off where it should be your choice." },
  { title: "Check the numbers", text: "Fees, rates and arrival times are shown before you confirm anything." },
];

const Widget = ({ type }) => {
  switch (type) {
    case "converter":
      return (
        <div className="max-w-[560px] mx-auto">
          <CurrencyConverter />
        </div>
      );
    case "invoice":
      return (
        <div className="max-w-[620px] mx-auto">
          <InvoicePreview />
        </div>
      );
    case "split":
      return <IncomeSplit />;
    case "team":
      return (
        <div className="max-w-[620px] mx-auto">
          <TeamSpendControls />
        </div>
      );
    case "fees":
      return <FeeEstimator />;
    case "security":
      return <SecurityCheckup />;
    default:
      return null;
  }
};

const FeatureDetailContent = ({ feature }) => {
  usePageMeta(feature.title, `${feature.tagline} ${feature.content}`);
  const index = features.findIndex((f) => f.slug === feature.slug);
  const next = features[(index + 1) % features.length];
  const prev = features[(index - 1 + features.length) % features.length];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Platform", to: "/features" }, { label: feature.title }]}
        title={feature.title}
        description={feature.description}
        aside={
          <div className={`${styles.card} p-7 sm:p-8 w-full max-w-[460px]`}>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full border border-line text-forest flex items-center justify-center">
                <Icon name={feature.iconName} size={20} />
              </span>
              <span className="font-sans text-[13px] text-brass-dark num">{String(index + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}</span>
            </div>
            <p className="font-serif text-[30px] leading-[1.15] text-ink mt-6">{feature.tagline}</p>
            <ul className="mt-6 border-t border-line">
              {feature.highlights.map((h) => (
                <li key={h} className="flex gap-3 py-3 border-b border-line font-sans text-[15px] text-ink">
                  <Icon name="check" size={18} className="text-forest mt-0.5" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Button to="/signup">Open an account</Button>
        <Button to="/pricing" variant="outline">
          See pricing
        </Button>
      </PageHero>

      <Container className="py-12">
        <ul className="grid grid-cols-1 xs:grid-cols-3 gap-px bg-line border-y border-line">
          {feature.stats.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 80} className="bg-ivory py-7 xs:px-6">
              <p className="font-serif text-[52px] leading-none text-ink">
                {s.display ?? <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />}
              </p>
              <p className="font-sans text-[15px] text-muted mt-3">{s.label}</p>
            </Reveal>
          ))}
        </ul>
      </Container>

      {feature.widget !== "none" && (
        <Container className="py-16 sm:py-20" id="try">
          <SectionHeading eyebrow="Try it" title="Works the same in the demo." description="Everything below is interactive and runs entirely in your browser." className="mb-12" />
          <Reveal>
            <Widget type={feature.widget} />
          </Reveal>
        </Container>
      )}

      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <SectionHeading className="md:col-span-4" eyebrow="Getting started" title="Three steps." />
          <ol className="md:col-span-8 border-t border-line">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="grid grid-cols-[56px_1fr] gap-4 py-6 border-b border-line">
                <span className="font-serif text-[36px] leading-none text-brass-dark num">{i + 1}</span>
                <span>
                  <span className="block font-sans font-semibold text-[17px] text-ink">{s.title}</span>
                  <span className="block font-sans text-[15px] leading-[1.6] text-muted mt-1">{s.text}</span>
                </span>
              </Reveal>
            ))}
          </ol>
        </div>

        <nav aria-label="More features" className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line rounded-card overflow-hidden mt-20">
          <Link to={`/features/${prev.slug}`} className="group bg-ivory hover:bg-paper p-6 flex items-center gap-4 transition-colors">
            <Icon name="arrowLeft" size={18} className="text-muted group-hover:-translate-x-1 transition" />
            <span>
              <span className="block font-sans text-[13px] text-muted">Previous</span>
              <span className="block font-serif text-[26px] leading-tight text-ink">{prev.title}</span>
            </span>
          </Link>
          <Link to={`/features/${next.slug}`} className="group bg-ivory hover:bg-paper p-6 flex items-center justify-end gap-4 text-right transition-colors">
            <span>
              <span className="block font-sans text-[13px] text-muted">Next</span>
              <span className="block font-serif text-[26px] leading-tight text-ink">{next.title}</span>
            </span>
            <Icon name="arrowRight" size={18} className="text-muted group-hover:translate-x-1 transition" />
          </Link>
        </nav>
        <CTA />
      </Container>
    </>
  );
};

const FeatureDetail = () => {
  const { slug } = useParams();
  const feature = getFeature(slug);
  if (!feature) return <NotFound />;
  return <FeatureDetailContent key={feature.slug} feature={feature} />;
};

export default FeatureDetail;
