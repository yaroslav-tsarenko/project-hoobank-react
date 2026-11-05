import { CTA } from "../components";
import Button from "../components/Button";
import { BarChart } from "../components/ui/charts";
import Container from "../components/ui/Container";
import CountUp from "../components/ui/CountUp";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import TeamSpendControls from "../components/widgets/TeamSpendControls";
import Clients from "../components/Clients";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const BENEFITS = [
  { icon: "users", title: "Team cards", text: "Issue unlimited virtual and physical cards with per-person limits." },
  { icon: "list", title: "Invoices & billing", text: "Create, send and reconcile invoices without leaving HooBank." },
  { icon: "globe", title: "Global payouts", text: "Pay suppliers and contractors in 30+ currencies at mid-market rates." },
  { icon: "pieChart", title: "Real-time reporting", text: "Live dashboards, exports and accounting integrations." },
  { icon: "shieldCheck", title: "Approval flows", text: "Multi-step approvals and audit logs for every transaction." },
  { icon: "zap", title: "Instant onboarding", text: "Open a business account online in about 10 minutes." },
];

const REVENUE = [
  { label: "Jan", in: 42000, out: 31000 },
  { label: "Feb", in: 46000, out: 33000 },
  { label: "Mar", in: 51000, out: 35500 },
  { label: "Apr", in: 49000, out: 34000 },
  { label: "May", in: 58000, out: 37000 },
  { label: "Jun", in: 63000, out: 39000 },
];
const k = (v) => `$${Math.round(v / 1000)}k`;

const Business = () => {
  usePageMeta("Business", "HooBank for business: team cards with spend controls, invoicing, global payouts and real-time reporting.");
  return (
    <>
      <PageHero
        eyebrow="HooBank for Business"
        title="You do the business,"
        highlight="we’ll handle the money."
        description="Corporate cards, invoices, global payouts and live reporting — built for startups and growing teams."
        aside={
          <div className="w-full max-w-[520px]">
            <TeamSpendControls />
          </div>
        }
      >
        <Button to="/contact?topic=sales">Talk to sales</Button>
        <Button to="/pricing" variant="outline">
          See pricing
        </Button>
      </PageHero>

      <Container className="py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { value: 230, suffix: "+", label: "Companies onboarded" },
            { value: 18, suffix: " hrs", label: "Saved per month on bookkeeping" },
            { value: 0, prefix: "$", label: "Monthly fee on Starter" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className={`${styles.glassCard} p-6`}>
              <p className="font-poppins font-semibold text-[40px] text-white">
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="font-poppins text-dimWhite">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeading eyebrow="Built for teams" title="Everything finance teams ask for" className="mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 100} className="feature-card rounded-[20px] p-6 border border-white/5">
              <span className={`w-14 h-14 rounded-full ${styles.flexCenter} bg-dimBlue text-secondary`}>
                <Icon name={b.icon} size={24} />
              </span>
              <h3 className={`${styles.heading4} mt-5`}>{b.title}</h3>
              <p className="font-poppins text-dimWhite text-[15px] mt-2">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SectionHeading
            eyebrow="Cash flow"
            title="See your runway at a glance"
            description="Money in vs. money out, updated in real time. Hover the bars to explore."
          >
            <Button to="/dashboard" variant="outline" className="mt-8">
              Open demo dashboard
            </Button>
          </SectionHeading>
          <Reveal className={`${styles.card} p-6`}>
            <BarChart
              data={REVENUE}
              format={k}
              series={[
                { key: "in", label: "Money in", color: "#5ce1e6" },
                { key: "out", label: "Money out", color: "#fc67fa" },
              ]}
            />
          </Reveal>
        </div>
      </Container>

      <Container className="py-8">
        <Clients />
        <CTA title="Let’s grow your business." text="Book a 20-minute demo with our team and get your first three months of Plus free." primary={{ to: "/contact?topic=sales", label: "Book a demo" }} secondary={{ to: "/signup", label: "Open account" }} />
      </Container>
    </>
  );
};

export default Business;
