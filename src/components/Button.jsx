import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-forest text-ivory hover:bg-forest-700 active:bg-forest-900",
  outline: "border border-ink/25 text-ink bg-transparent hover:border-ink hover:bg-paper",
  ghost: "text-ink bg-transparent hover:bg-sand",
  light: "bg-ivory text-forest hover:bg-paper",
  outlineLight: "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/5",
};

const SIZES = {
  md: "h-12 px-6 text-[15px]",
  sm: "h-10 px-4 text-[14px]",
};

/**
 * Brand button. Renders a router <Link> when `to` is set, an external <a> (new tab) when `href` is set,
 * otherwise a <button>. With no destination and no onClick it links to /signup.
 */
const Button = ({ to, href, children = "Open an account", variant = "primary", size = "md", className = "", type = "button", ...rest }) => {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium whitespace-nowrap transition-colors duration-200 disabled:opacity-45 disabled:pointer-events-none ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
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
