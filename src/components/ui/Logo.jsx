/** Northvault mark: a vault dial with a north needle. */
export const LogoMark = ({ size = 28, tone = "forest", className = "" }) => {
  const bg = tone === "ivory" ? "#f6f3ec" : "#0e3b2c";
  const needle = tone === "ivory" ? "#0e3b2c" : "#f6f3ec";
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={`shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill={bg} />
      <circle cx="32" cy="32" r="19" fill="none" stroke="#b8893d" strokeWidth="2.5" />
      <path d="M32 15.5 38.5 32H25.5Z" fill={needle} />
      <path d="M25.5 32h13L32 48.5Z" fill={needle} fillOpacity=".28" />
    </svg>
  );
};

/** The dial and needle without the tile, for watermarks on dark panels. */
export const DialMark = ({ size = 200, className = "" }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true" focusable="false">
    <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="32" cy="32" r="19" fill="none" stroke="currentColor" strokeWidth="0.6" />
    <path d="M32 9.5 39 32H25Z" fill="currentColor" />
    <path d="M25 32h14L32 54.5Z" fill="currentColor" fillOpacity=".4" />
  </svg>
);

/** Mark + serif wordmark. `tone="ivory"` for dark backgrounds. */
const Logo = ({ tone = "forest", size = 28, className = "" }) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <LogoMark size={size} tone={tone} />
    <span className={`font-serif text-[24px] leading-none tracking-[-0.01em] ${tone === "ivory" ? "text-ivory" : "text-ink"}`}>Northvault</span>
  </span>
);

export default Logo;
