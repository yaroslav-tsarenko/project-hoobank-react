import { initials } from "../../lib/format";

const TONES = ["bg-forest-100 text-forest", "bg-brass-50 text-brass-dark", "bg-sand text-ink"];

/** Initials monogram used instead of photos. Tone is derived from the name so it stays stable. */
const Avatar = ({ name, size = "w-10 h-10 text-[14px]", className = "" }) => {
  const tone = TONES[[...name].reduce((s, c) => s + c.charCodeAt(0), 0) % TONES.length];
  return (
    <span aria-hidden="true" className={`${size} ${tone} rounded-full shrink-0 inline-flex items-center justify-center font-sans font-semibold tracking-[0.02em] ${className}`}>
      {initials(name)}
    </span>
  );
};

export default Avatar;
