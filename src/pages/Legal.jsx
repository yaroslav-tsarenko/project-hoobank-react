import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const DOCS = {
  privacy: {
    title: "Privacy Policy",
    description: "How HooBank collects, uses and protects your personal information.",
    updated: "November 1, 2026",
    sections: [
      { id: "overview", title: "Overview", body: ["This Privacy Policy explains what personal data HooBank collects, why we collect it and the choices you have. This is placeholder copy for a demo site and is not legal advice."] },
      { id: "data-we-collect", title: "Data we collect", body: ["Identity data such as your name, date of birth and government ID when you open an account.", "Contact data such as your email address, phone number and postal address.", "Transaction data about payments you make and receive, and device data such as IP address and app version."] },
      { id: "how-we-use", title: "How we use your data", body: ["To provide and improve our services, verify your identity, prevent fraud, comply with legal obligations and — with your consent — send you product news."] },
      { id: "sharing", title: "Sharing", body: ["We share data only with partner banks, card networks, identity verification providers and authorities where required by law. We never sell your personal data."] },
      { id: "your-rights", title: "Your rights", body: ["You can access, correct, export or delete your data, and object to certain processing. Contact privacy@hoobank.example to exercise your rights."] },
      { id: "cookies", title: "Cookies", body: ["This demo site does not set tracking cookies. It stores your card design and preferences in your browser’s local storage only."] },
    ],
  },
  terms: {
    title: "Terms & Services",
    description: "The terms that govern your use of HooBank products and services.",
    updated: "November 1, 2026",
    sections: [
      { id: "acceptance", title: "Acceptance of terms", body: ["By opening an account or using HooBank you agree to these terms. This is placeholder copy for a demo site and is not a binding agreement."] },
      { id: "accounts", title: "Your account", body: ["You must be at least 18 years old and provide accurate information. Keep your credentials safe and tell us immediately if you suspect unauthorised access."] },
      { id: "fees", title: "Fees", body: ["Plan fees and any transaction fees are shown on our Pricing page and in the app before you confirm an action."] },
      { id: "cards", title: "Cards", body: ["Cards remain our property and may be suspended to protect you from fraud. You can freeze or cancel a card at any time in the app."] },
      { id: "liability", title: "Liability", body: ["We are not liable for losses caused by events outside our reasonable control. Nothing in these terms limits liability that cannot be limited by law."] },
      { id: "changes", title: "Changes to these terms", body: ["We may update these terms from time to time. We’ll notify you at least 30 days before material changes take effect."] },
    ],
  },
};

const Legal = ({ doc }) => {
  const d = DOCS[doc];
  usePageMeta(d.title, d.description);
  const other = doc === "privacy" ? { to: "/terms", label: "Terms & Services" } : { to: "/privacy", label: "Privacy Policy" };

  return (
    <>
      <PageHero crumbs={[{ label: "Home", to: "/" }, { label: d.title }]} highlight={d.title} description={`Last updated ${d.updated}`} />
      <Container className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 items-start">
          <nav aria-label="On this page" className="md:sticky md:top-28">
            <p className={`${styles.eyebrow} text-dimWhite mb-4`}>On this page</p>
            <ul className="flex flex-col gap-3 border-l border-white/10">
              {d.sections.map((s) => (
                <li key={s.id}>
                  <Link to={`#${s.id}`} className="block pl-4 -ml-px border-l border-transparent hover:border-secondary font-poppins text-[15px] text-dimWhite hover:text-white transition">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-12 max-w-[760px]">
            {d.sections.map((s, i) => (
              <section key={s.id} id={s.id}>
                <h2 className={styles.heading3}>
                  <span className="text-gradient mr-3">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body.map((p) => (
                  <p key={p} className={`${styles.paragraph} mt-4`}>
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <p className="font-poppins text-dimWhite">
              Questions? <Link to="/contact" className="text-secondary hover:underline">Contact us</Link> · See also our{" "}
              <Link to={other.to} className="text-secondary hover:underline">
                {other.label}
              </Link>
              .
            </p>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Legal;
