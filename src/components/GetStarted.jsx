import { Link } from "react-router-dom";
import styles from "../style";
import { arrowUp } from "../assets";

const GetStarted = () => (
  <Link
    to="/signup"
    aria-label="Get started — open an account"
    className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-blue-gradient p-[2px] cursor-pointer group transition-transform duration-300 hover:scale-105 hover:rotate-[-6deg]`}
  >
    <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full`}>
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
          <span className="text-gradient">Get</span>
        </p>
        <img
          src={arrowUp}
          alt=""
          className="w-[23px] h-[23px] object-contain transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>

      <p className="font-poppins font-medium text-[18px] leading-[23.4px]">
        <span className="text-gradient">Started</span>
      </p>
    </div>
  </Link>
);

export default GetStarted;
