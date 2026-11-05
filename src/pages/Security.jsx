import { CTA } from "../components";
import Button from "../components/Button";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import SecurityCheckup from "../components/widgets/SecurityCheckup";
import { shield } from "../assets";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const LAYERS = [
  { icon: "lock", title: "Encryption everywhere", text: "256-bit AES at rest and TLS 1.3 in transit for every byte of data." },
  { icon: "fingerprint", title: "Biometric sign-in", text: "Face ID, fingerprint and device binding keep strangers out." },
  { icon: "zap", title: "Real-time fraud scoring", text: "Every transaction is scored in milliseconds against hundreds of signals." },
  { icon: "snowflake", title: "One-tap freeze", text: "Lost your card? Freeze and unfreeze it instantly from the app." },
  { icon: "card", title: "Virtual cards", text: "Disposable card numbers for online shopping and subscriptions." },
  { icon: "bell", title: "Instant alerts", text: "Know about every payment the second it happens." },
];

const BADGES = ["PCI DSS Level 1", "SOC 2 Type II", "GDPR compliant", "ISO 27001"];

const Security = () => {
  usePageMeta("Security", "How HooBank keeps your money and data safe: encryption, biometric sign-in, real-time fraud scoring and instant card freeze.");
  return (
    <>
      <PageHero
        eyebrow="100% Secured"
        title="Your money,"
        highlight="locked down."
        description="Multiple layers of protection work quietly in the background so you can spend, save and send with total peace of mind."
        aside={
          <div className="relative w-[260px] h-[260px] xs:w-[320px] xs:h-[320px] flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-secondary/20 motion-safe:animate-[spin_30s_linear_infinite]" style={{ borderStyle: "dashed" }} />
            <div className="absolute inset-8 rounded-full border border-white/10" />
            <div className="absolute inset-16 rounded-full bg-dimBlue pulse-dot" />
            <img src={shield} alt="" className="relative w-24 h-24 motion-safe:animate-float" />
            {["lock", "fingerprint", "key", "bell"].map((ic, i) => (
              <span
                key={ic}
                className="absolute w-12 h-12 rounded-full glass flex items-center justify-center text-secondary"
                style={{ top: `${50 - 46 * Math.cos((i * Math.PI) / 2)}%`, left: `${50 + 46 * Math.sin((i * Math.PI) / 2)}%`, transform: "translate(-50%, -50%)" }}
              >
                <Icon name={ic} size={20} />
              </span>
            ))}
          </div>
        }
      >
        <Button to="#checkup">Run a security checkup</Button>
        <Button to="/help" variant="outline">
          Security FAQ
        </Button>
      </PageHero>

      <Container className="py-16">
        <SectionHeading eyebrow="Defence in depth" title="Six layers between you and fraud" className="mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAYERS.map((l, i) => (
            <Reveal key={l.title} delay={(i % 3) * 100} className="feature-card rounded-[20px] p-6 border border-white/5">
              <span className={`w-14 h-14 rounded-full ${styles.flexCenter} bg-dimBlue text-secondary`}>
                <Icon name={l.icon} size={24} />
              </span>
              <h3 className={`${styles.heading4} mt-5`}>{l.title}</h3>
              <p className="font-poppins text-dimWhite text-[15px] mt-2">{l.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container id="checkup" className="py-16">
        <SectionHeading eyebrow="Interactive" title="How protected are you?" description="Flip the switches to see how each setting raises your protection score." className="mb-10" />
        <Reveal>
          <SecurityCheckup />
        </Reveal>
      </Container>

      <Container className="py-16">
        <Reveal className={`${styles.card} p-8 sm:p-12 flex flex-col md:flex-row gap-10 items-start md:items-center`}>
          <div className="flex-1">
            <h2 className={styles.heading3}>Certified and audited</h2>
            <p className={`${styles.paragraph} mt-3 max-w-[520px]`}>
              Independent auditors review our controls every year. Found a vulnerability? Our bug bounty pays up to $10,000.
            </p>
            <Button to="/contact?topic=security" variant="outline" size="sm" className="mt-6">
              Report a vulnerability
            </Button>
          </div>
          <ul className="grid grid-cols-2 gap-3 w-full md:w-auto">
            {BADGES.map((b) => (
              <li key={b} className="rounded-[14px] border border-white/10 px-4 py-3 font-poppins text-[14px] text-white flex items-center gap-2">
                <Icon name="shieldCheck" size={18} className="text-secondary" /> {b}
              </li>
            ))}
          </ul>
        </Reveal>
        <CTA title="Bank with confidence." />
      </Container>
    </>
  );
};

export default Security;
