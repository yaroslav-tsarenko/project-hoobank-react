import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import PageHero from "../components/ui/PageHero";
import usePageMeta from "../hooks/usePageMeta";

const DOCS = {
  privacy: {
    title: "Privacy",
    description: "How the Northvault concept site handles information.",
    updated: "November 1, 2026",
    sections: [
      { id: "overview", title: "Overview", body: ["Northvault is a product concept and this site is a front-end prototype. It has no backend, collects no personal data and sends nothing to any server. This page is written as an example of how a real privacy notice would be structured; it is not legal advice."] },
      { id: "data-we-collect", title: "What a real service would collect", body: ["Identity data such as your name, date of birth and photo ID when opening an account.", "Business data such as your trading name, registration and tax numbers.", "Transaction data about payments you make and receive, and device data used to keep your account secure."] },
      { id: "how-we-use", title: "How it would be used", body: ["To provide the service, verify identity, prevent fraud and meet legal obligations. Marketing would only be sent with consent."] },
      { id: "sharing", title: "Sharing", body: ["Data would be shared only with the licensed partner institution, card network, identity verification providers and authorities where the law requires it. It would never be sold."] },
      { id: "your-rights", title: "Your rights", body: ["You would be able to access, correct, export or delete your data, and to object to certain processing, by writing to privacy@northvault.example."] },
      { id: "storage", title: "Storage on this site", body: ["This site sets no cookies. It stores your card design in your browser’s local storage so the demo workspace can show it. Clearing site data removes it."] },
    ],
  },
  terms: {
    title: "Terms",
    description: "Terms of use for the Northvault concept site.",
    updated: "November 1, 2026",
    sections: [
      { id: "concept", title: "A concept, not a service", body: ["Northvault is not a bank, a payment institution or any regulated entity. Nothing on this site is an offer of financial services. Figures, fees, people and companies shown are illustrative."] },
      { id: "demo", title: "The demo workspace", body: ["Balances, transfers, cards and invoices in the demo are simulated in your browser. No money moves and no account is created."] },
      { id: "content", title: "Content", body: ["Journal articles are general information for freelancers and small businesses, not tax, legal or financial advice."] },
      { id: "ip", title: "Design and code", body: ["The Northvault name, design and code are the work of Yaroslav Tsarenko and are shown as a portfolio concept."] },
      { id: "liability", title: "Liability", body: ["The site is provided as is, for demonstration. Do not enter real personal or financial information into any form."] },
      { id: "changes", title: "Changes", body: ["These terms may be updated as the concept evolves. The date above shows the latest revision."] },
    ],
  },
};

const Legal = ({ doc }) => {
  const d = DOCS[doc];
  usePageMeta(d.title, d.description);
  const other = doc === "privacy" ? { to: "/terms", label: "Terms" } : { to: "/privacy", label: "Privacy" };

  return (
    <>
      <PageHero crumbs={[{ label: "Home", to: "/" }, { label: d.title }]} title={d.title} description={`${d.description} Last updated ${d.updated}.`} />
      <Container className="py-14 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <nav aria-label="On this page" className="md:col-span-3 md:sticky md:top-28">
            <p className="font-sans text-[12px] uppercase tracking-[0.14em] text-muted mb-4">On this page</p>
            <ul className="border-t border-line">
              {d.sections.map((s, i) => (
                <li key={s.id} className="border-b border-line">
                  <Link to={`#${s.id}`} className="flex gap-3 py-2.5 font-sans text-[15px] text-muted hover:text-ink transition">
                    <span className="num text-brass-dark w-6">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-8 md:col-start-5 flex flex-col gap-12 max-w-[700px]">
            {d.sections.map((s, i) => (
              <section key={s.id} id={s.id}>
                <h2 className="font-serif text-[34px] leading-tight text-ink">
                  <span className="text-brass-dark num mr-3 text-[24px] align-middle">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body.map((p) => (
                  <p key={p} className="font-sans text-[17px] leading-[1.7] text-muted mt-4">
                    {p}
                  </p>
                ))}
              </section>
            ))}
            <p className="font-sans text-muted pt-8 border-t border-line">
              Questions?{" "}
              <Link to="/contact" className="text-forest link">
                Contact us
              </Link>{" "}
              · See also{" "}
              <Link to={other.to} className="text-forest link">
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
