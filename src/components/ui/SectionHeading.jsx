import styles from "../../style";
import Reveal from "./Reveal";

/**
 * Editorial section heading: a numbered marker with a hairline, a serif title and an optional lead.
 * `index` is optional ("01"); `eyebrow` is the marker label.
 */
const SectionHeading = ({ index, eyebrow, title, description, align = "left", className = "", children }) => {
  const center = align === "center";
  return (
    <Reveal className={`flex flex-col ${center ? "items-center text-center mx-auto max-w-[760px]" : "items-start"} ${className}`}>
      {eyebrow &&
        (center ? (
          <p className={`${styles.overline} mb-5`}>{eyebrow}</p>
        ) : (
          <p className="section-marker w-full mb-6">
            {index && <span className="num text-brass-dark">{index}</span>}
            <span>{eyebrow}</span>
          </p>
        ))}
      <h2 className={`${styles.h2} max-w-[820px]`}>{title}</h2>
      {description && <p className={`${styles.lead} mt-5 max-w-[620px]`}>{description}</p>}
      {children}
    </Reveal>
  );
};

export default SectionHeading;
