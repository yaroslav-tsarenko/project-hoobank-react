import { Link } from "react-router-dom";
import styles from "../style";
import { discount, robot } from "../assets";
import Button from "./Button";
import GetStarted from "./GetStarted";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 animate-fade-up`}>
        <Link
          to="/pricing"
          className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2 hover:shadow-[0_0_0_1px_rgba(92,225,230,0.4)] transition"
        >
          <img src={discount} alt="" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2 text-[16px] xs:text-[18px]`}>
            <span className="text-white">20%</span> Discount For <span className="text-white">1 Month</span> Account
          </p>
        </Link>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            The Next <br className="sm:block hidden" /> <span className="text-gradient">Generation</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[44px] xs:text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Payment Method.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Our team of experts uses a methodology to identify the credit cards most likely to fit your needs. We
          examine annual percentage rates, annual fees.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button to="/signup">Open free account</Button>
          <Button to="/dashboard" variant="outline">
            Try the live demo
          </Button>
        </div>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img
          src={robot}
          alt="Robotic hand holding a HooBank card"
          width="1000"
          height="1007"
          fetchPriority="high"
          className="w-[100%] h-[100%] relative z-[5] motion-safe:animate-float"
        />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" aria-hidden="true" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" aria-hidden="true" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" aria-hidden="true" />
        {/* gradient end */}
      </div>

      <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div>
    </section>
  );
};

export default Hero;
