import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import CTA from "../components/CTA";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { departments, jobs, perks } from "../constants/careers";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const Careers = () => {
  usePageMeta("Careers", "Example roles at Northvault, a concept business bank: engineering, design, product and operations.");
  const [dept, setDept] = useState("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = jobs.filter((j) => (dept === "All" || j.department === dept) && (!q || `${j.title} ${j.location} ${j.summary}`.toLowerCase().includes(q)));

  return (
    <>
      <PageHero
        eyebrow={`Careers · ${jobs.length} example roles`}
        title="Build a bank that"
        highlight="keeps its composure."
        description="A small, remote-first team in Europe, working on software people trust with their income."
        note="Northvault is a concept; these roles illustrate the careers flow and applications are not sent anywhere."
      >
        <Button to="#roles">See the roles</Button>
        <Button to="/about" variant="outline">
          About the concept
        </Button>
      </PageHero>

      <Container className="py-16 sm:py-20">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-card overflow-hidden">
          {perks.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 80} className="bg-ivory p-6">
              <Icon name={p.icon} size={22} className="text-forest" />
              <h3 className="font-serif text-[26px] leading-tight text-ink mt-6">{p.title}</h3>
              <p className="font-sans text-[14px] leading-[1.6] text-muted mt-2">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Container id="roles" className="py-16 sm:py-20 border-t border-line">
        <SectionHeading index="01" eyebrow="Open roles" title="Find your role." className="mb-10" />
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by department">
            {departments.map((d) => (
              <button key={d} type="button" onClick={() => setDept(d)} aria-pressed={dept === d} className={`${styles.chip} ${dept === d ? styles.chipActive : styles.chipIdle}`}>
                {d}
              </button>
            ))}
          </div>
          <label className="relative md:w-[300px]">
            <span className="sr-only">Search roles</span>
            <Icon name="search" size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search roles" className={`${styles.input} pl-10 rounded-full`} />
          </label>
        </div>

        <ul className="border-t border-line" aria-live="polite">
          {list.map((j) => (
            <li key={j.slug} className="border-b border-line">
              <Link to={`/careers/${j.slug}`} className="group grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-7 items-center">
                <span className="md:col-span-2 font-sans text-[13px] uppercase tracking-[0.12em] text-brass-dark">{j.department}</span>
                <span className="md:col-span-6">
                  <span className="block font-serif text-[30px] leading-tight text-ink group-hover:text-forest transition-colors">{j.title}</span>
                  <span className="block font-sans text-[15px] text-muted mt-1">{j.summary}</span>
                </span>
                <span className="md:col-span-3 font-sans text-[14px] text-muted">
                  {j.location} · {j.type}
                </span>
                <span className="md:col-span-1 flex md:justify-end">
                  <Icon name="arrowRight" size={20} className="text-muted group-hover:text-forest group-hover:translate-x-1 transition" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {list.length === 0 && (
          <div className="text-center py-16">
            <p className="font-serif text-[28px] text-ink">No roles match that search.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setDept("All");
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
        <CTA title="Not seeing your role?" text="Tell us what you would like to work on and how you would approach it." primary={{ to: "/contact?topic=careers", label: "Get in touch" }} secondary={null} />
      </Container>
    </>
  );
};

export default Careers;
