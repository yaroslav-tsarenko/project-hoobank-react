import styles from "../../style";
import Breadcrumbs from "./Breadcrumbs";
import Container from "./Container";

/**
 * Shared hero for inner pages. `highlight` is set in italic serif — the editorial
 * equivalent of an accent, without gradient text.
 */
const PageHero = ({ eyebrow, title, highlight, after, description, crumbs, aside, children, note }) => (
  <Container as="section" className="pt-10 sm:pt-16 pb-14 sm:pb-20 border-b border-line">
    <div className={`grid grid-cols-1 gap-12 ${aside ? "md:grid-cols-12 md:items-center" : ""}`}>
      <div className={`flex flex-col animate-fade-up ${aside ? "md:col-span-7 items-start" : "items-start max-w-[960px]"}`}>
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && <p className={`${styles.overline} mb-6`}>{eyebrow}</p>}
        <h1 className={styles.h1}>
          {title} {highlight && <em className="italic text-forest">{highlight}</em>} {after}
        </h1>
        {description && <p className={`${styles.lead} mt-6 max-w-[600px]`}>{description}</p>}
        {children && <div className="flex flex-wrap items-center gap-3 mt-9">{children}</div>}
        {note && <p className="font-sans text-[13px] text-faint mt-5">{note}</p>}
      </div>
      {aside && <div className="md:col-span-5 w-full flex justify-center md:justify-end">{aside}</div>}
    </div>
  </Container>
);

export default PageHero;
