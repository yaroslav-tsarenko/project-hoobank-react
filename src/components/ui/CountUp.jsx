import useCountUp from "../../hooks/useCountUp";
import useInView from "../../hooks/useInView";

/** Number that counts up from zero the first time it scrolls into view. */
const CountUp = ({ value, prefix = "", suffix = "", decimals = 0, duration = 1400, className = "" }) => {
  const [ref, inView] = useInView();
  const current = useCountUp(value, { duration, start: inView });
  const formatted = current.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={`num ${className}`}>
      <span aria-hidden="true">
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
};

export default CountUp;
