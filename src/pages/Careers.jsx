import { useState } from "react";
import { Link } from "react-router-dom";
import { CTA } from "../components";
import Button from "../components/Button";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { departments, jobs, perks } from "../constants/careers";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const Careers = () => {
  usePageMeta("Careers", "Join HooBank and help build the next generation payment method. Remote-first roles in engineering, design, product and operations.");
  const [dept, setDept] = useState("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = jobs.filter(
    (j) => (dept === "All" || j.department === dept) && (!q || `${j.title} ${j.location} ${j.summary}`.toLowerCase().includes(q))
  );

  return (
    <>
      <PageHero
        eyebrow={`${jobs.length} open roles`}
        title="Build the future of"
        highlight="money with us."
        description="We’re a remote-first team of builders, designers and dreamers on a mission to make banking feel effortless."
      >
        <Button to="#roles">View open roles</Button>
        <Button to="/about" variant="outline">
          About HooBank
        </Button>
      </PageHero>

      <Container className="py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className={`${styles.glassCard} p-6`}>
              <Icon name={p.icon} size={26} className="text-secondary" />
              <h3 className={`${styles.heading4} mt-4`}>{p.title}</h3>
              <p className="font-poppins text-dimWhite text-[14px] mt-2">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container id="roles" className="py-16">
        <SectionHeading eyebrow="Open positions" title="Find your role" className="mb-8" />
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
            <Icon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dimWhite" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search roles…" className={`${styles.input} pl-11`} />
          </label>
        </div>

        <ul className="flex flex-col gap-4" aria-live="polite">
          {list.map((j) => (
            <li key={j.slug}>
              <Link to={`/careers/${j.slug}`} className="group feature-card rounded-[20px] border border-white/5 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="font-poppins text-[13px] text-gradient font-medium uppercase tracking-[0.12em]">{j.department}</p>
                  <h3 className="font-poppins font-semibold text-white text-[20px] mt-1">{j.title}</h3>
                  <p className="font-poppins text-dimWhite text-[14px] mt-1">{j.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2 font-poppins text-[13px] text-dimWhite">
                  <span className="rounded-full bg-white/5 px-3 py-1 flex items-center gap-1.5"><Icon name="mapPin" size={14} />{j.location}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1 flex items-center gap-1.5"><Icon name="clock" size={14} />{j.type}</span>
                </div>
                <Icon name="arrowRight" size={20} className="text-secondary group-hover:translate-x-1 transition hidden sm:block" />
              </Link>
            </li>
          ))}
        </ul>
        {list.length === 0 && (
          <div className="text-center py-16">
            <p className={styles.paragraph}>No roles match your search.</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => { setDept("All"); setQuery(""); }}>
              Clear filters
            </Button>
          </div>
        )}
        <CTA title="Don’t see your role?" text="We’re always keen to meet talented people. Send us a note and tell us how you’d like to help." primary={{ to: "/contact?topic=careers", label: "Get in touch" }} secondary={null} />
      </Container>
    </>
  );
};

export default Careers;
