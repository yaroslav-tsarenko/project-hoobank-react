import { apple, bill, google } from "../assets";
import { storeLinks } from "../constants";
import styles, { layout } from "../style";
import Button from "./Button";
import Reveal from "./ui/Reveal";

const Billing = () => (
  <section id="product" className={layout.sectionReverse}>
    <Reveal className={layout.sectionImgReverse}>
      <img
        src={bill}
        alt="HooBank app screens: recent transactions, checkout and payment confirmation"
        loading="lazy"
        width="900"
        height="834"
        className="w-[100%] h-[100%] relative z-[5]"
      />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" aria-hidden="true" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" aria-hidden="true" />
      {/* gradient end */}
    </Reveal>

    <Reveal className={layout.sectionInfo} delay={100}>
      <h2 className={styles.heading2}>
        Easily control your <br className="sm:block hidden" /> billing & invoicing
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Elit enim sed massa etiam. Mauris eu adipiscing ultrices ametodio aenean neque. Fusce ipsum orci rhoncus
        aliporttitor integer platea placerat.
      </p>

      <div className="flex flex-row flex-wrap items-center gap-5 sm:mt-10 mt-6">
        <a href={storeLinks.apple} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store (opens in a new tab)" className="lift rounded-[8px]">
          <img src={apple} alt="" className="w-[128.86px] h-[42.05px] object-contain" />
        </a>
        <a href={storeLinks.google} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play (opens in a new tab)" className="lift rounded-[8px]">
          <img src={google} alt="" className="w-[144.17px] h-[43.08px] object-contain" />
        </a>
        <Button to="/product" variant="outline" size="sm">
          Take the product tour
        </Button>
      </div>
    </Reveal>
  </section>
);

export default Billing;
