import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";
import Reveal from "./ui/Reveal";

const CardDeal = () => (
  <section className={layout.section}>
    <Reveal className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Find a better card deal <br className="sm:block hidden" /> in few easy steps.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Arcu tortor, purus in mattis at sed integer faucibus. Aliquet quis aliquet eget mauris tortor. Aliquet
        ultrices ac, ametau.
      </p>

      <div className="flex flex-wrap gap-4 mt-10">
        <Button to="/cards#customizer">Design your card</Button>
        <Button to="/cards" variant="outline">
          Compare cards
        </Button>
      </div>
    </Reveal>

    <Reveal className={layout.sectionImg} delay={120}>
      <img src={card} alt="HooBank app widgets: card scanning, spending analysis and payment methods" loading="lazy" width="900" height="789" className="w-[100%] h-[100%] lift rounded-[20px]" />
    </Reveal>
  </section>
);

export default CardDeal;
