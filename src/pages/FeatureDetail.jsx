import { Link, useParams } from "react-router-dom";
import { CTA } from "../components";
import Button from "../components/Button";
import Container from "../components/ui/Container";
import CountUp from "../components/ui/CountUp";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import BudgetPlanner from "../components/widgets/BudgetPlanner";
import CurrencyConverter from "../components/widgets/CurrencyConverter";
import FinanceCalculator from "../components/widgets/FinanceCalculator";
import RewardsEstimator from "../components/widgets/RewardsEstimator";
import SecurityCheckup from "../components/widgets/SecurityCheckup";
import { features, getFeature } from "../constants";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";
import NotFound from "./NotFound";

const STEPS = [
  { icon: "smartphone", title: "Open the app", text: "Sign up in minutes with just your phone and ID." },
  { icon: "sliders", title: "Switch it on", text: "Enable the feature from your home screen in one tap." },
  { icon: "sparkles", title: "Enjoy the upside", text: "Watch the results roll in, tracked in real time." },
];

const Widget = ({ type }) => {
  switch (type) {
    case "rewards":
      return <RewardsEstimator />;
    case "security":
      return <SecurityCheckup />;
    case "calculator":
      return <FinanceCalculator defaultMode="loan" />;
    case "converter":
      return (
        <div className="max-w-[560px] mx-auto">
          <CurrencyConverter />
        </div>
      );
    case "budget":
      return <BudgetPlanner />;
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
        crumbs={[{ label: "Home", to: "/" }, { label: "Features", to: "/features" }, { label: feature.title }]}
        highlight={feature.title}
        description={feature.description}
        aside={
          <div className={`${styles.card} p-8 w-full max-w-[460px] border-gradient`}>
            <div className={`w-16 h-16 rounded-full ${styles.flexCenter} bg-dimBlue text-secondary mb-6`}>
              {feature.icon ? <img src={feature.icon} alt="" className="w-8 h-8" /> : <Icon name={feature.iconName} size={30} />}
            </div>
            <p className="font-poppins font-semibold text-[22px] text-white mb-6">{feature.tagline}</p>
            <ul className="flex flex-col gap-4">
              {feature.highlights.map((h) => (
                <li key={h} className="flex gap-3 font-poppins text-[15px] text-dimWhite">
                  <span className="w-6 h-6 shrink-0 rounded-full bg-blue-gradient text-primary flex items-center justify-center">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Button to="/signup">Get started</Button>
        <Button to="/pricing" variant="outline">
          See pricing
        </Button>
      </PageHero>

      <Container className="py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {feature.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className={`${styles.glassCard} p-6`}>
              <p className="font-poppins font-semibold text-[40px] text-white">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="font-poppins text-gradient uppercase tracking-[0.12em] text-[14px]">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      {feature.widget !== "none" && (
        <Container className="py-12" id="try">
          <Reveal>
            <Widget type={feature.widget} />
          </Reveal>
        </Container>
      )}

      <Container className="py-12">
        <h2 className={`${styles.heading2} mb-10`}>How it works</h2>
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 120} className="feature-card rounded-[20px] p-6 border border-white/5">
              <span className="font-poppins text-[14px] text-gradient font-semibold">Step {i + 1}</span>
              <div className="flex items-center gap-3 mt-3">
                <Icon name={s.icon} size={22} className="text-secondary" />
                <h3 className={styles.heading4}>{s.title}</h3>
              </div>
              <p className="font-poppins text-dimWhite text-[15px] mt-2">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <nav aria-label="More features" className="flex flex-col sm:flex-row justify-between gap-4 mt-16">
          <Link to={`/features/${prev.slug}`} className="group flex items-center gap-3 font-poppins text-dimWhite hover:text-white">
            <Icon name="arrowLeft" size={18} className="group-hover:-translate-x-1 transition" />
            <span>
              <span className="block text-[13px]">Previous</span>
              <span className="text-white font-medium">{prev.title}</span>
            </span>
          </Link>
          <Link to={`/features/${next.slug}`} className="group flex items-center gap-3 font-poppins text-dimWhite hover:text-white sm:text-right">
            <span>
              <span className="block text-[13px]">Next</span>
              <span className="text-white font-medium">{next.title}</span>
            </span>
            <Icon name="arrowRight" size={18} className="group-hover:translate-x-1 transition" />
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
