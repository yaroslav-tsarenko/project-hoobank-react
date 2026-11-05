import styles from "../style";
import Button from "./Button";
import Reveal from "./ui/Reveal";

const CTA = ({
  title = "Let’s try our service now!",
  text = "Everything you need to accept card payments and grow your business anywhere on the planet.",
  primary = { to: "/signup", label: "Get Started" },
  secondary = { to: "/dashboard", label: "View demo" },
}) => (
  <Reveal
    as="section"
    className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow relative overflow-hidden`}
  >
    <div className="absolute -right-20 -top-20 w-[280px] h-[280px] rounded-full bg-secondary/10 blur-3xl" aria-hidden="true" />
    <div className="flex-1 flex flex-col relative">
      <h2 className={styles.heading2}>{title}</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>{text}</p>
    </div>

    <div className={`${styles.flexCenter} flex-wrap gap-4 sm:ml-10 ml-0 sm:mt-0 mt-10 relative`}>
      <Button to={primary.to}>{primary.label}</Button>
      {secondary && (
        <Button to={secondary.to} variant="outline">
          {secondary.label}
        </Button>
      )}
    </div>
  </Reveal>
);

export default CTA;
