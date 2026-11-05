/** Infinite horizontal marquee. Pauses on hover; becomes a static wrapped row under reduced motion. */
const Marquee = ({ children, duration = 30, className = "", gapClass = "gap-16 pr-16" }) => (
  <div className={`marquee overflow-hidden w-full ${className}`}>
    <div className="marquee-track" style={{ "--marquee-duration": `${duration}s` }}>
      <div className={`flex shrink-0 items-center ${gapClass}`}>{children}</div>
      <div className={`flex shrink-0 items-center ${gapClass}`} aria-hidden="true" data-clone="" inert>
        {children}
      </div>
    </div>
  </div>
);

export default Marquee;
