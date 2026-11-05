import { Link } from "react-router-dom";
import { getFeature, homeFeatures } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";

export const FeatureCard = ({ icon, title, content, slug, iconName, className = "" }) => (
  <Link
    to={`/features/${slug}`}
    className={`group flex flex-row p-6 rounded-[20px] feature-card ${className}`}
  >
    <div className={`w-[64px] h-[64px] shrink-0 rounded-full ${styles.flexCenter} bg-dimBlue text-secondary`}>
      {icon ? <img src={icon} alt="" className="w-[50%] h-[50%] object-contain" /> : <Icon name={iconName} size={28} />}
    </div>
    <div className="flex-1 flex flex-col ml-3">
      <h3 className="font-poppins font-semibold text-white text-[18px] leading-[23.4px] mb-1 flex items-center gap-2">
        {title}
        <Icon name="arrowRight" size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition text-secondary" />
      </h3>
      <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px]">{content}</p>
    </div>
  </Link>
);

const Business = () => (
  <section id="features" className={layout.section}>
    <Reveal className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        You do the business, <br className="sm:block hidden" /> we’ll handle the money.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        With the right credit card, you can improve your financial life by building credit, earning rewards and
        saving money. But with hundreds of credit cards on the market.
      </p>

      <div className="flex flex-wrap gap-4 mt-10">
        <Button to="/features">Explore features</Button>
        <Button to="/business" variant="outline">
          For business
        </Button>
      </div>
    </Reveal>

    <div className={`${layout.sectionImg} flex-col gap-6`}>
      {homeFeatures.map((f, i) => (
        <Reveal key={f.slug} delay={i * 120} className="w-full">
          <FeatureCard {...getFeature(f.slug)} icon={f.icon} />
        </Reveal>
      ))}
    </div>
  </section>
);

export default Business;
