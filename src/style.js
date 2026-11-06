/**
 * Shared Tailwind class strings — the Northvault type scale and control styles.
 * Display sizes use Instrument Serif; UI and body use Instrument Sans.
 */
const styles = {
  container: "w-full max-w-site mx-auto px-5 sm:px-8 lg:px-10",

  display: "font-serif font-normal text-ink text-[52px] leading-[0.98] xs:text-[64px] sm:text-[80px] md:text-[92px] tracking-[-0.02em]",
  h1: "font-serif font-normal text-ink text-[44px] leading-[1.02] sm:text-[60px] md:text-[68px] tracking-[-0.015em]",
  h2: "font-serif font-normal text-ink text-[36px] leading-[1.05] sm:text-[48px] tracking-[-0.01em]",
  h3: "font-serif font-normal text-ink text-[28px] leading-[1.1] sm:text-[32px]",
  h4: "font-sans font-semibold text-ink text-[17px] leading-[1.35]",
  lead: "font-sans text-muted text-[18px] leading-[1.6] sm:text-[19px]",
  body: "font-sans text-muted text-[16px] leading-[1.65]",
  small: "font-sans text-muted text-[14px] leading-[1.55]",
  overline: "font-sans font-medium uppercase tracking-[0.14em] text-[12px] leading-4 text-muted",
  bigNumber: "font-serif font-normal text-ink num tracking-[-0.01em]",

  card: "rounded-card bg-paper border border-line",
  panel: "rounded-card bg-paper border border-line p-5 sm:p-6",
  input:
    "w-full rounded-control bg-paper border border-line px-3.5 py-2.5 font-sans text-[16px] text-ink placeholder:text-faint outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/15 aria-[invalid=true]:border-negative",
  label: "font-sans font-medium text-[14px] text-ink mb-1.5 block",
  chip: "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-sans text-[14px] transition border",
  chipActive: "bg-forest text-ivory border-forest",
  chipIdle: "bg-paper border-line text-muted hover:text-ink hover:border-ink/40",
};

export default styles;
