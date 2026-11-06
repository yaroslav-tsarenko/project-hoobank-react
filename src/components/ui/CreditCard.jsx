import { useRef } from "react";
import { cardFinishes, getCardColor } from "../../constants/cards";
import useReducedMotion from "../../hooks/useReducedMotion";

const Contactless = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" style={{ width: "6cqw", height: "6cqw", opacity: 0.8 }}>
    <path d="M8.5 8.5a5 5 0 0 1 0 7" />
    <path d="M12 6a8.5 8.5 0 0 1 0 12" />
    <path d="M15.5 3.5a12 12 0 0 1 0 17" />
  </svg>
);

/** The dial-and-needle mark, drawn without the square so it sits on any material. */
const Dial = ({ accent, ink }) => (
  <svg viewBox="0 0 40 40" aria-hidden="true" style={{ width: "7.5cqw", height: "7.5cqw" }}>
    <circle cx="20" cy="20" r="17" fill="none" stroke={accent} strokeWidth="2" />
    <path d="M20 5.5 25.5 20h-11Z" fill={ink} />
    <path d="M14.5 20h11L20 34.5Z" fill={ink} fillOpacity=".3" />
  </svg>
);

/**
 * Northvault card render, drawn entirely in HTML/CSS. Follows the pointer with a gentle tilt
 * and flips to the back when `flipped` is true. Tilt is disabled for reduced motion.
 */
const CreditCard = ({ design, flipped = false, tilt = true, lastDigits = "4821", frozen = false, className = "", label }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const color = getCardColor(design.color);
  const name = (design.name || "Your Name").toUpperCase().slice(0, 22);
  const finishName = (cardFinishes.find((f) => f.id === design.finish)?.name ?? design.finish).toLowerCase();
  const ink = color.ink;

  const handleMove = (e) => {
    if (!tilt || reduced || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.classList.add("is-tilting");
    el.style.setProperty("--ry", `${(px - 0.5) * 14}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 12}deg`);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-tilting");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  };

  return (
    <div
      className={`card-scene w-full [container-type:inline-size] ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      role="img"
      aria-label={label ?? `${color.name} ${finishName} Northvault card for ${name}${flipped ? ", back side" : ""}${frozen ? ", frozen" : ""}`}
    >
      <div ref={ref} className={`card-3d w-full aspect-[1.586/1] ${flipped ? "is-flipped" : ""}`}>
        {/* Front */}
        <div className={`card-face finish-${design.finish}`} style={{ background: color.background, color: ink }}>
          <div className="card-light" />
          <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: "6.5cqw" }}>
            <div className="flex items-start justify-between">
              <div className="flex items-center" style={{ gap: "2.2cqw" }}>
                <Dial accent={color.accent} ink={ink} />
                <span className="font-serif leading-none" style={{ fontSize: "6.2cqw" }}>
                  Northvault
                </span>
              </div>
              <span className="font-sans font-medium uppercase" style={{ fontSize: "2.6cqw", letterSpacing: "0.22em", opacity: 0.85, marginTop: "1.6cqw" }}>
                {design.tier || "Studio"}
              </span>
            </div>

            <div className="flex items-center" style={{ gap: "3.5cqw" }}>
              <div className="card-chip relative overflow-hidden" style={{ width: "11.5cqw", height: "8.8cqw", borderRadius: "1.6cqw" }}>
                <span className="absolute inset-x-0 top-1/2 h-px bg-black/25" />
                <span className="absolute inset-y-0 left-1/3 w-px bg-black/25" />
                <span className="absolute inset-y-0 right-1/3 w-px bg-black/25" />
              </div>
              <Contactless color={ink} />
            </div>

            <div className="flex items-end justify-between" style={{ gap: "3cqw" }}>
              <div className="min-w-0">
                <p className="font-sans font-medium truncate" style={{ fontSize: "3.4cqw", letterSpacing: "0.16em" }}>
                  {name}
                </p>
                <p className="font-sans num" style={{ fontSize: "3.4cqw", letterSpacing: "0.14em", opacity: 0.8, marginTop: "1.2cqw" }}>
                  •••• {lastDigits}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-sans uppercase" style={{ fontSize: "2.3cqw", letterSpacing: "0.2em", opacity: 0.75 }}>
                  Business debit
                </p>
                <div style={{ height: "1px", background: color.accent, marginTop: "1.6cqw", opacity: 0.9 }} />
              </div>
            </div>
          </div>
          {frozen && (
            <div className="absolute inset-0 bg-ivory/55 flex items-center justify-center">
              <span className="font-sans font-semibold uppercase bg-paper text-forest border border-line rounded-full" style={{ fontSize: "3.2cqw", letterSpacing: "0.24em", padding: "1.4cqw 4cqw" }}>
                Frozen
              </span>
            </div>
          )}
        </div>

        {/* Back */}
        <div className={`card-face card-face--back finish-${design.finish}`} style={{ background: color.background, color: ink }}>
          <div className="absolute left-0 right-0 bg-[#121614]" style={{ top: "12%", height: "16%" }} />
          <div className="absolute flex items-center" style={{ top: "38%", left: "6.5cqw", right: "6.5cqw", gap: "2cqw" }}>
            <div
              className="flex-1 text-ink italic font-serif truncate"
              style={{ fontSize: "4cqw", padding: "1.4cqw 3cqw", background: "repeating-linear-gradient(-45deg, #fbfaf6 0 3px, #efe9dc 3px 6px)" }}
            >
              {name}
            </div>
            <div className="bg-paper text-ink font-sans font-semibold num" style={{ fontSize: "3.6cqw", padding: "1.4cqw 3cqw" }}>
              •••
            </div>
          </div>
          <p className="absolute font-sans leading-snug" style={{ bottom: "12%", left: "6.5cqw", right: "30cqw", fontSize: "2.3cqw", opacity: 0.75 }}>
            Concept card for demonstration only. Northvault is a product concept; no account or card exists.
          </p>
          <div className="absolute" style={{ right: "6.5cqw", bottom: "11%" }}>
            <Dial accent={color.accent} ink={ink} />
          </div>
          <div className="card-light" />
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
