import { Link } from "react-router-dom";
import { Billing, Business, CardDeal, Clients, CTA, Hero, Stats, Testimonials } from "../components";
import Icon from "../components/ui/Icon";
import Reveal from "../components/ui/Reveal";
import CurrencyConverter from "../components/widgets/CurrencyConverter";
import usePageMeta from "../hooks/usePageMeta";
import styles, { layout } from "../style";

const TRY_LINKS = [
  { to: "/cards#customizer", icon: "card", title: "Design your card", text: "Pick a colour and finish, then tilt it in 3D." },
  { to: "/product#calculator", icon: "trendingUp", title: "Plan your savings", text: "See how 4.2% APY grows your money." },
  { to: "/dashboard", icon: "pieChart", title: "Explore the dashboard", text: "Send mock money and track spending." },
];

const LiveTools = () => (
  <section id="try-it" className={layout.section}>
    <Reveal className={`${layout.sectionInfo} md:mr-10`}>
      <p className={`${styles.eyebrow} mb-3`}>
        <span className="text-gradient">Try it live</span>
      </p>
      <h2 className={styles.heading2}>
        Feel HooBank <br className="sm:block hidden" /> before you join.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Convert currencies at the real mid-market rate, design a card or play with a full demo dashboard — no sign-up
        required.
      </p>
      <ul className="flex flex-col gap-4 mt-8 w-full max-w-[520px]">
        {TRY_LINKS.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="group flex items-center gap-4 p-4 rounded-[20px] feature-card">
              <span className={`w-12 h-12 rounded-full ${styles.flexCenter} bg-dimBlue text-secondary`}>
                <Icon name={l.icon} size={22} />
              </span>
              <span className="flex-1">
                <span className="block font-poppins font-semibold text-white text-[17px]">{l.title}</span>
                <span className="block font-poppins text-dimWhite text-[14px]">{l.text}</span>
              </span>
              <Icon name="arrowRight" size={18} className="text-secondary group-hover:translate-x-1 transition" />
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
    <Reveal delay={120} className={`${layout.sectionImg} w-full`}>
      <div className="absolute w-[60%] h-[60%] blue__gradient" aria-hidden="true" />
      <CurrencyConverter className="relative w-full max-w-[520px]" />
    </Reveal>
  </section>
);

const Home = () => {
  usePageMeta(null);
  return (
    <>
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={styles.boxWidth}>
          <Hero />
        </div>
      </div>

      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={styles.boxWidth}>
          <Stats />
          <Business />
          <Billing />
          <LiveTools />
          <CardDeal />
          <Testimonials />
          <Clients />
          <CTA />
        </div>
      </div>
    </>
  );
};

export default Home;
