import useAnimatedNumber from "../../hooks/useAnimatedNumber";

/** Tweens between values whenever `value` changes. `format` turns the number into display text. */
const AnimatedNumber = ({ value, format = (n) => n.toFixed(2), duration = 600, from, className = "" }) => {
  const display = useAnimatedNumber(value, duration, from ?? value);
  return <span className={`num ${className}`}>{format(display)}</span>;
};

export default AnimatedNumber;
