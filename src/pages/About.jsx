import { CTA, Testimonials } from "../components";
import Button from "../components/Button";
import Container from "../components/ui/Container";
import CountUp from "../components/ui/CountUp";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import { people01, people02, people03, robot } from "../assets";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const VALUES = [
  { icon: "heart", title: "Customers first", text: "Every decision starts with what’s best for the people who trust us with their money." },
  { icon: "sparkles", title: "Radically simple", text: "Finance is complicated. Our product shouldn’t be." },
  { icon: "shieldCheck", title: "Trust by default", text: "Transparent fees, honest communication and security in everything we build." },
  { icon: "target", title: "Ship & learn", text: "Small teams, fast iterations and a bias for action." },
];

const TEAM = [
  { name: "Herman Jensen", role: "Co-founder & CEO", img: people01 },
  { name: "Steve Mark", role: "Co-founder & CTO", img: people02 },
  { name: "Kenn Gallagher", role: "Head of Security", img: people03 },
  { name: "Olivia Park", role: "Head of Design" },
  { name: "Dmytro Koval", role: "VP Engineering" },
  { name: "Sara Lindqvist", role: "Head of Growth" },
];

const TIMELINE = [
  { year: "2019", text: "HooBank founded in a tiny Kyiv co-working space." },
  { year: "2020", text: "First 1,000 customers and our very first card." },
  { year: "2022", text: "Launched multi-currency wallets across Europe." },
  { year: "2024", text: "HooBank for Business and team cards." },
  { year: "2026", text: "Card Studio, 3,800+ active users and counting." },
];

const About = () => {
  usePageMeta("About us", "Meet the team behind HooBank and the story of how we’re building the next generation payment method.");
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="We’re building the bank"
        highlight="we always wanted."
        description="HooBank started with a simple frustration: banking felt slow, opaque and stuck in the past. So we set out to build something better."
        aside={<img src={robot} alt="" width="1000" height="1007" className="w-full max-w-[460px] h-auto motion-safe:animate-float" />}
      >
        <Button to="/careers">Join the team</Button>
        <Button to="/contact" variant="outline">
          Get in touch
        </Button>
      </PageHero>

      <Container className="py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: 3800, suffix: "+", label: "Active users" },
            { value: 230, suffix: "+", label: "Business clients" },
            { value: 64, label: "Team members" },
            { value: 12, label: "Countries" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className={`${styles.glassCard} p-6`}>
              <p className="font-poppins font-semibold text-[32px] sm:text-[40px] text-white">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="font-poppins text-gradient uppercase tracking-[0.12em] text-[13px]">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeading eyebrow="What we believe" title="Our values" className="mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 100} className="feature-card rounded-[20px] p-6 border border-white/5">
              <Icon name={v.icon} size={28} className="text-secondary" />
              <h3 className={`${styles.heading4} mt-4`}>{v.title}</h3>
              <p className="font-poppins text-dimWhite text-[15px] mt-2">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      <Container className="py-16">
        <SectionHeading eyebrow="Milestones" title="The journey so far" className="mb-12" />
        <ol className="relative border-l border-white/10 ml-3 flex flex-col gap-10">
          {TIMELINE.map((t, i) => (
            <Reveal as="li" key={t.year} delay={i * 80} className="pl-8 relative">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-gradient pulse-dot" aria-hidden="true" />
              <p className="font-poppins font-semibold text-gradient text-[20px]">{t.year}</p>
              <p className="font-poppins text-dimWhite text-[16px] mt-1">{t.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>

      <Container className="py-16">
        <SectionHeading eyebrow="Leadership" title="The people behind HooBank" className="mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 100} className="feedback-card rounded-[20px] p-6 border border-white/5 flex flex-col items-center text-center">
              {m.img ? (
                <img src={m.img} alt="" loading="lazy" width="96" height="96" className="w-20 h-20 rounded-full" />
              ) : (
                <span className="w-20 h-20 rounded-full bg-blue-gradient text-primary font-poppins font-semibold text-[24px] flex items-center justify-center">
                  {m.name.split(" ").map((p) => p[0]).join("")}
                </span>
              )}
              <p className="font-poppins font-semibold text-white text-[17px] mt-4">{m.name}</p>
              <p className="font-poppins text-dimWhite text-[14px]">{m.role}</p>
            </Reveal>
          ))}
        </div>
        <Testimonials />
        <CTA title="Want to build with us?" text="We’re hiring across engineering, design and product." primary={{ to: "/careers", label: "See open roles" }} secondary={{ to: "/blog", label: "Read our blog" }} />
      </Container>
    </>
  );
};

export default About;
