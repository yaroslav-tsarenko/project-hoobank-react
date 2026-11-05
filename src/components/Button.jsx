import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-blue-gradient text-primary",
  outline: "border border-white/20 text-white bg-transparent hover:border-secondary/70 hover:text-secondary",
  ghost: "bg-white/5 text-white hover:bg-white/10",
};

const SIZES = {
  md: "py-4 px-6 text-[18px] rounded-[10px]",
  sm: "py-2.5 px-4 text-[15px] rounded-[10px]",
};

/**
 * Brand button. Renders a router <Link> when `to` is set, an external <a> (new tab) when `href` is set,
 * otherwise a <button>. With no destination and no onClick it links to /signup — the original "Get Started".
 */
const Button = ({
  to,
  href,
  children = "Get Started",
  variant = "primary",
  size = "md",
  styles = "",
  className = "",
  type = "button",
  ...rest
}) => {
  const cls = `inline-flex items-center justify-center gap-2 font-poppins font-medium outline-none btn-glow whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${styles} ${className}`;
  const destination = to ?? (!href && !rest.onClick && type === "button" ? "/signup" : undefined);

  if (destination) {
    return (
      <Link to={destination} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
};

export default Button;
