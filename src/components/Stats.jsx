import { stats } from "../constants";
import styles from "../style";
import CountUp from "./ui/CountUp";

const Stats = () => (
  <section aria-label="HooBank in numbers" className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
    {stats.map((stat) => (
      <div key={stat.id} className="flex-1 flex justify-start items-center flex-row m-3 min-w-[220px]">
        <h2 className="font-poppins font-semibold xs:text-[40.89px] text-[30.89px] xs:leading-[53.16px] leading-[43.16px] text-white">
          <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
        </h2>
        <p className="font-poppins font-normal xs:text-[20.45px] text-[15.45px] xs:leading-[26.58px] leading-[21.58px] text-gradient uppercase ml-3">
          {stat.title}
        </p>
      </div>
    ))}
  </section>
);

export default Stats;
