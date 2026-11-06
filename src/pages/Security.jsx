import Button from "../components/Button";
import CTA from "../components/CTA";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import { LogoMark } from "../components/ui/Logo";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import SecurityCheckup from "../components/widgets/SecurityCheckup";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const LAYERS = [
  { icon: "key", title: "Passkeys, not passwords", text: "Sign-in uses keys bound to your devices. There is no SMS code to intercept or password to reuse." },
  { icon: "smartphone", title: "Trusted devices", text: "A new phone or laptop must be approved from one you already use." },
  { icon: "users", title: "Confirmation for new payees", text: "The first payment to anyone new needs a second step, which stops most invoice-redirection fraud." },
  { icon: "lock", title: "Approvals over a threshold", text: "Large transfers wait for a second confirmation, from you or from someone else on the team." },
  { icon: "snowflake", title: "Freeze in one step", text: "Freeze and unfreeze any card from the app; virtual cards can be locked to a single merchant." },
  { icon: "list", title: "A complete audit log", text: "Every sign-in, change and approval is recorded and can be exported." },
];

const PRACTICES = [
  "Encryption in transit (TLS 1.3) and at rest",
  "Least-privilege access for staff, reviewed quarterly",
  "Independent penetration testing before launch",
  "A public responsible-disclosure policy",
];

const Security = () => {
  usePageMeta("Security", "How Northvault is designed to protect business money: passkeys, trusted devices, payee confirmation, approvals and an audit log.");
  return (
    <>
      <PageHero
        eyebrow="Security"
        title="Protection that stays"
        highlight="out of the way."
        description="Most fraud against small businesses is a convincing request to pay the wrong account. Northvault is designed to catch that moment without slowing down everything else."
        aside={
          <div className={`${styles.card} w-full max-w-[420px] p-7 sm:p-8`}>
            <div className="flex items-center gap-3">
              <LogoMark size={32} />
              <p className="font-sans font-semibold text-[15px] text-ink">Confirm new payee</p>
            </div>
            <p className="font-serif text-[30px] leading-tight text-ink mt-6">Paying Kestrel Audio Ltd for the first time</p>
            <dl className="mt-6 border-t border-line font-sans text-[14px]">
              {[
                ["Account name", "Kestrel Audio Ltd"],
                ["Name check", "Matches the account"],
                ["Amount", "$2,600.00"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2.5 border-b border-line">
                  <dt className="text-muted">{k}</dt>
                  <dd className={`text-right ${k === "Name check" ? "text-positive font-medium" : "text-ink"} num`}>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="grid grid-cols-2 gap-2 mt-6" aria-hidden="true">
              <span className="h-10 rounded-full border border-line flex items-center justify-center font-sans text-[14px] text-ink">Cancel</span>
              <span className="h-10 rounded-full bg-forest flex items-center justify-center font-sans text-[14px] text-ivory gap-2">
                <Icon name="fingerprint" size={16} /> Confirm
              </span>
            </div>
          </div>
        }
      >
        <Button to="#checkup">Check your settings</Button>
        <Button to="/help" variant="outline">
          Security questions
        </Button>
      </PageHero>

      <Container className="py-16 sm:py-24">
        <SectionHeading index="01" eyebrow="Defence in layers" title="Six controls between you and a bad payment." className="mb-12" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-line border border-line rounded-card overflow-hidden">
          {LAYERS.map((l, i) => (
            <Reveal as="li" key={l.title} delay={(i % 3) * 80} className="bg-ivory p-6 sm:p-8">
              <Icon name={l.icon} size={22} className="text-forest" />
              <h3 className="font-serif text-[28px] leading-[1.1] text-ink mt-8">{l.title}</h3>
              <p className="font-sans text-[15px] leading-[1.6] text-muted mt-3">{l.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Container id="checkup" className="py-16 sm:py-24 border-t border-line">
        <SectionHeading index="02" eyebrow="Interactive" title="How protected is your setup?" description="Switch controls on and off to see how each one changes the score." className="mb-12" />
        <Reveal>
          <SecurityCheckup />
        </Reveal>
      </Container>

      <Container className="py-16 sm:py-24 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <SectionHeading
            className="md:col-span-5"
            index="03"
            eyebrow="Practices"
            title="What a launch would require."
            description="Northvault is a concept, so it holds no certifications. These are the practices the product is designed around, and what a real launch with a licensed partner would need to evidence."
          >
            <Button to="/contact?topic=security" variant="outline" size="sm" className="mt-8">
              Report a security issue
            </Button>
          </SectionHeading>
          <Reveal className="md:col-span-7">
            <ul className="border-t border-line">
              {PRACTICES.map((p, i) => (
                <li key={p} className="grid grid-cols-[48px_1fr] gap-4 py-5 border-b border-line">
                  <span className="font-serif text-[28px] leading-none text-brass-dark num">{i + 1}</span>
                  <span className="font-sans text-[17px] text-ink">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <CTA title="Calm, by design." text="See how the controls feel in the demo workspace." primary={{ to: "/dashboard", label: "Open the demo" }} secondary={{ to: "/signup", label: "Open an account" }} />
      </Container>
    </>
  );
};

export default Security;
