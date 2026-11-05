import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Accordion from "../components/ui/Accordion";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import { posts } from "../constants/blog";
import { faqCategories, faqs } from "../constants/faq";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const Highlight = ({ text, query }) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${escapeRe(query)})`, "gi"));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="hl">
        {p}
      </mark>
    ) : (
      p
    )
  );
};

const TOPICS = [
  { id: "getting-started", icon: "sparkles", text: "Opening an account, deposits and availability" },
  { id: "cards", icon: "card", text: "Delivery, design, lost or stolen cards" },
  { id: "payments", icon: "send", text: "Transfers, limits and international payments" },
  { id: "security", icon: "shieldCheck", text: "Protection, fraud and two-factor sign-in" },
  { id: "account", icon: "user", text: "Plans, shared spaces and closing your account" },
];

const Help = () => {
  usePageMeta("Help Center", "Search answers about HooBank accounts, cards, payments and security, or contact our 24/7 support team.");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const q = query.trim();

  const results = useMemo(
    () =>
      faqs.filter(
        (f) =>
          (cat === "all" || f.category === cat) &&
          (!q || `${f.question} ${f.answer}`.toLowerCase().includes(q.toLowerCase()))
      ),
    [q, cat]
  );

  const items = results.map((f) => ({
    id: f.id,
    question: <Highlight text={f.question} query={q} />,
    answer: <Highlight text={f.answer} query={q} />,
  }));

  return (
    <>
      <PageHero eyebrow="Support · 24/7" title="How can we" highlight="help you?" description="Search our knowledge base or browse by topic. Still stuck? Our team is one message away.">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-[620px] mx-auto">
          <label htmlFor="help-search" className="sr-only">
            Search help articles
          </label>
          <Icon name="search" size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-dimWhite" />
          <input
            id="help-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “card”, “transfer” or “fraud”…"
            className={`${styles.input} pl-14 py-4 text-[17px] rounded-full`}
          />
        </form>
      </PageHero>

      <Container className="pb-10">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-4">
          {TOPICS.map((t, i) => {
            const label = faqCategories.find((c) => c.id === t.id).label;
            return (
              <Reveal key={t.id} delay={i * 60}>
                <button
                  type="button"
                  onClick={() => {
                    setCat(t.id);
                    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`w-full h-full text-left feature-card rounded-[20px] border p-5 ${cat === t.id ? "border-secondary/60 bg-white/[0.03]" : "border-white/5"}`}
                >
                  <Icon name={t.icon} size={24} className="text-secondary" />
                  <p className="font-poppins font-semibold text-white mt-3">{label}</p>
                  <p className="font-poppins text-dimWhite text-[13px] mt-1">{t.text}</p>
                </button>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Container id="faq" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10">
          <div>
            <h2 className={styles.heading3}>Frequently asked</h2>
            <div className="flex md:flex-col flex-wrap gap-2 mt-6" role="group" aria-label="Filter by topic">
              {faqCategories.map((c) => (
                <button key={c.id} type="button" onClick={() => setCat(c.id)} aria-pressed={cat === c.id} className={`${styles.chip} md:justify-start ${cat === c.id ? styles.chipActive : styles.chipIdle}`}>
                  {c.label}
                  <span className="opacity-70 text-[12px]">{c.id === "all" ? faqs.length : faqs.filter((f) => f.category === c.id).length}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-poppins text-dimWhite text-[14px] mb-4" aria-live="polite">
              {results.length} {results.length === 1 ? "answer" : "answers"}
              {q && (
                <>
                  {" "}for “<span className="text-white">{q}</span>”
                </>
              )}
            </p>
            {items.length > 0 ? (
              <Accordion key={`${cat}-${q}`} items={items} defaultOpen={q ? items[0].id : null} />
            ) : (
              <div className={`${styles.card} p-10 text-center`}>
                <Icon name="search" size={32} className="text-secondary mx-auto" />
                <p className="font-poppins text-white font-semibold text-[18px] mt-4">No answers found</p>
                <p className="font-poppins text-dimWhite mt-2">Try a different word, or ask our team directly.</p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  <Button variant="outline" size="sm" onClick={() => { setQuery(""); setCat("all"); }}>
                    Clear search
                  </Button>
                  <Button to="/contact" size="sm">
                    Contact support
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>

      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal className={`${styles.card} p-8 md:col-span-2`}>
            <h2 className={styles.heading3}>Popular guides</h2>
            <ul className="flex flex-col mt-6 divide-y divide-white/5">
              {posts.slice(0, 4).map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} className="group flex items-center gap-4 py-4 font-poppins text-white hover:text-secondary transition-colors">
                    <Icon name="book" size={18} className="text-secondary" />
                    <span className="flex-1">{p.title}</span>
                    <Icon name="arrowRight" size={16} className="group-hover:translate-x-1 transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120} className={`${styles.card} p-8 flex flex-col border-gradient`}>
            <Icon name="chat" size={30} className="text-secondary" />
            <h2 className={`${styles.heading3} mt-4`}>Still need help?</h2>
            <p className="font-poppins text-dimWhite mt-2 mb-8">Real humans, 24/7. Average reply time: 3 minutes.</p>
            <Button to="/contact" className="mt-auto">
              Contact us
            </Button>
          </Reveal>
        </div>
      </Container>
    </>
  );
};

export default Help;
