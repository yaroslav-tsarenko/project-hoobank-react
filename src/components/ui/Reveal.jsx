import useInView from "../../hooks/useInView";

/** Fades + lifts its children in when scrolled into view (disabled under prefers-reduced-motion). */
const Reveal = ({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) => {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`reveal ${inView ? "is-visible" : ""} ${className}`} style={{ "--reveal-delay": `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
