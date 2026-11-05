import styles from "../../style";
import Container from "./Container";
import Breadcrumbs from "./Breadcrumbs";

/** Shared hero for inner pages: eyebrow, gradient-highlighted title, description, actions and optional aside. */
const PageHero = ({ eyebrow, title, highlight, after, description, crumbs, aside, children }) => (
  <Container as="section" className="relative pt-6 sm:pt-12 pb-10 sm:pb-16">
    <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />
    <div className="absolute z-[0] w-[40%] h-[40%] top-0 right-0 pink__gradient opacity-60" aria-hidden="true" />
    <div className="absolute z-[0] w-[50%] h-[60%] left-0 bottom-0 blue__gradient" aria-hidden="true" />

    <div className={`relative z-[1] flex ${aside ? "md:flex-row" : ""} flex-col gap-12 items-center`}>
      <div className={`flex-1 flex flex-col ${aside ? "items-start" : "items-center text-center"} animate-fade-up`}>
        {crumbs && <Breadcrumbs items={crumbs} />}
        {eyebrow && (
          <p className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-5">
            <span className="w-2 h-2 rounded-full bg-secondary pulse-dot mr-3" aria-hidden="true" />
            <span className={`${styles.paragraph} text-[15px] leading-[24px]`}>{eyebrow}</span>
          </p>
        )}
        <h1 className={`${styles.heading1} ${aside ? "" : "max-w-[900px]"}`}>
          {title} {highlight && <span className="text-gradient">{highlight}</span>} {after}
        </h1>
        {description && (
          <p className={`${styles.paragraph} mt-6 ${aside ? "max-w-[520px]" : "max-w-[680px]"}`}>{description}</p>
        )}
        {children && (
          <div className={`flex flex-wrap gap-4 mt-10 ${aside ? "" : "justify-center"}`}>{children}</div>
        )}
      </div>
      {aside && <div className="flex-1 w-full flex justify-center relative">{aside}</div>}
    </div>
  </Container>
);

export default PageHero;
