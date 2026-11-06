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
  { id: "getting-started", icon: "home", text: "Who it is for, what you need, the concept" },
  { id: "cards", icon: "card", text: "Delivery, materials, lost cards" },
  { id: "payments", icon: "send", text: "Transfers, exchange rates, card payments" },
  { id: "security", icon: "shieldCheck", text: "Sign-in, roles, unusual payments" },
  { id: "account", icon: "user", text: "Plans, pots, closing a workspace" },
];

const Help = () => {
  usePageMeta("Help centre", "Answers about Northvault accounts, cards, payments and security.");
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const q = query.trim();

  const results = useMemo(
    () => faqs.filter((f) => (cat === "all" || f.category === cat) && (!q || `${f.question} ${f.answer}`.toLowerCase().includes(q.toLowerCase()))),
    [q, cat]
  );

  const items = results.map((f) => ({
    id: f.id,
    question: <Highlight text={f.question} query={q} />,
    answer: <Highlight text={f.answer} query={q} />,
  }));

  return (
    <>
      <PageHero eyebrow="Help centre" title="Short answers," highlight="written plainly." description="Search the questions people ask most, or browse by topic. If the answer is not here, the team is one message away.">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full max-w-[620px]">
          <label htmlFor="help-search" className="sr-only">
            Search help articles
          </label>
          <Icon name="search" size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id="help-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try “exchange rate”, “accountant” or “card”"
            className={`${styles.input} pl-14 py-4 text-[17px] rounded-full shadow-lift`}
          />
        </form>
      </PageHero>

      <Container className="py-14">
        <ul className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-5 gap-px bg-line border border-line rounded-card overflow-hidden">
          {TOPICS.map((t, i) => {
            const label = faqCategories.find((c) => c.id === t.id).label;
            const on = cat === t.id;
            return (
              <Reveal as="li" key={t.id} delay={i * 60}>
                <button
                  type="button"
                  onClick={() => {
                    setCat(t.id);
                    document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  aria-pressed={on}
                  className={`w-full h-full text-left p-5 transition-colors ${on ? "bg-forest-50" : "bg-ivory hover:bg-paper"}`}
                >
                  <Icon name={t.icon} size={20} className="text-forest" />
                  <p className="font-serif text-[24px] leading-tight text-ink mt-5">{label}</p>
                  <p className="font-sans text-muted text-[13px] mt-1">{t.text}</p>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </Container>

      <Container id="faq" className="py-14 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-3">
            <h2 className="font-serif text-[36px] leading-tight text-ink">Questions</h2>
            <div className="flex md:flex-col flex-wrap gap-2 mt-6" role="group" aria-label="Filter by topic">
              {faqCategories.map((c) => (
                <button key={c.id} type="button" onClick={() => setCat(c.id)} aria-pressed={cat === c.id} className={`${styles.chip} md:justify-between ${cat === c.id ? styles.chipActive : styles.chipIdle}`}>
                  {c.label}
                  <span className="opacity-70 text-[12px] num">{c.id === "all" ? faqs.length : faqs.filter((f) => f.category === c.id).length}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="md:col-span-9">
            <p className="font-sans text-muted text-[14px] mb-4" aria-live="polite">
              {results.length} {results.length === 1 ? "answer" : "answers"}
              {q && (
                <>
                  {" "}
                  for “<span className="text-ink">{q}</span>”
                </>
              )}
            </p>
            {items.length > 0 ? (
              <Accordion key={`${cat}-${q}`} items={items} defaultOpen={q ? items[0].id : null} />
            ) : (
              <div className="border-y border-line py-14 text-center">
                <p className="font-serif text-[30px] text-ink">No answers for that yet.</p>
                <p className="font-sans text-muted mt-2">Try a different word, or ask the team directly.</p>
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setQuery("");
                      setCat("all");
                    }}
                  >
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

      <Container className="py-14 pb-24 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <Reveal className={`${styles.card} p-7 sm:p-8 md:col-span-8`}>
            <h2 className="font-serif text-[32px] leading-tight text-ink">Longer guides</h2>
            <ul className="mt-6 border-t border-line">
              {posts.slice(0, 4).map((p) => (
                <li key={p.slug} className="border-b border-line last:border-b-0">
                  <Link to={`/blog/${p.slug}`} className="group flex items-center gap-4 py-4 font-sans text-[16px] text-ink">
                    <span className="font-sans text-[12px] uppercase tracking-[0.12em] text-brass-dark w-[84px] shrink-0">{p.category}</span>
                    <span className="flex-1 group-hover:text-forest transition-colors">{p.title}</span>
                    <Icon name="arrowRight" size={16} className="text-muted group-hover:translate-x-1 transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="rounded-card bg-forest text-ivory p-7 sm:p-8 md:col-span-4 flex flex-col">
            <Icon name="chat" size={24} className="text-brass-light" />
            <h2 className="font-serif text-[32px] leading-tight mt-6">Still need a hand?</h2>
            <p className="font-sans text-[15px] text-ivory/80 mt-2 mb-8">In a real launch: people, not bots, on weekdays from 8:00 to 20:00 CET.</p>
            <Button to="/contact" variant="light" className="mt-auto self-start">
              Contact us
            </Button>
          </Reveal>
        </div>
      </Container>
    </>
  );
};

export default Help;
