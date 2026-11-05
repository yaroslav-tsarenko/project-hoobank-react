import styles from "../../style";
import Reveal from "./Reveal";

const SectionHeading = ({ eyebrow, title, description, align = "left", className = "", children }) => (
  <Reveal className={`flex flex-col ${align === "center" ? "items-center text-center mx-auto" : "items-start"} max-w-[760px] ${className}`}>
    {eyebrow && (
      <p className={`${styles.eyebrow} mb-3`}>
        <span className="text-gradient">{eyebrow}</span>
      </p>
    )}
    <h2 className={styles.heading2}>{title}</h2>
    {description && <p className={`${styles.paragraph} mt-5 max-w-[620px]`}>{description}</p>}
    {children}
  </Reveal>
);

export default SectionHeading;
