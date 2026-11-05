import { useRef } from "react";
import { logo } from "../../assets";
import { cardFinishes, getCardColor } from "../../constants/cards";
import useReducedMotion from "../../hooks/useReducedMotion";

const ContactlessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" style={{ width: "7cqw", height: "7cqw" }}>
    <path d="M8.5 8.5a5 5 0 0 1 0 7" />
    <path d="M12 6a8.5 8.5 0 0 1 0 12" />
    <path d="M15.5 3.5a12 12 0 0 1 0 17" />
  </svg>
);

/**
 * Interactive 3D card preview. Follows the pointer with a tilt + light sheen,
 * and flips to show the back when `flipped` is true. Tilt is disabled for reduced motion.
 */
const CreditCard = ({ design, flipped = false, tilt = true, lastDigits = "4821", frozen = false, className = "", label }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const color = getCardColor(design.color);
  const name = (design.name || "Your Name").toUpperCase().slice(0, 22);
  const finishName = (cardFinishes.find((f) => f.id === design.finish)?.name ?? design.finish).toLowerCase();

  const handleMove = (e) => {
    if (!tilt || reduced || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.classList.add("is-tilting");
    el.style.setProperty("--ry", `${(px - 0.5) * 26}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 22}deg`);
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
      aria-label={label ?? `${color.name} ${finishName} HooBank card for ${name}${flipped ? ", back side" : ""}`}
    >
      <div ref={ref} className={`card-3d w-full aspect-[1.586/1] ${flipped ? "is-flipped" : ""}`}>
        {/* Front */}
        <div className={`card-face finish-${design.finish} text-white`} style={{ background: color.background }}>
          <div className="card-sheen" />
          <div className="absolute inset-0 flex flex-col justify-between" style={{ padding: "6.5cqw" }}>
            <div className="flex items-start justify-between">
              <img src={logo} alt="" style={{ width: "30cqw" }} className="h-auto drop-shadow" />
              <span className="font-poppins font-semibold uppercase tracking-[0.2em] opacity-90" style={{ fontSize: "3.2cqw" }}>
                {design.tier || "Plus"}
              </span>
            </div>
            <div className="flex items-center gap-[4cqw]">
              <div className="card-chip rounded-[1.6cqw] relative overflow-hidden" style={{ width: "13cqw", height: "10cqw" }}>
                <span className="absolute inset-x-0 top-1/2 h-px bg-black/25" />
                <span className="absolute inset-y-0 left-1/3 w-px bg-black/25" />
                <span className="absolute inset-y-0 right-1/3 w-px bg-black/25" />
              </div>
              <ContactlessIcon />
            </div>
            <p className="font-poppins font-medium tabular-nums tracking-[0.12em] drop-shadow" style={{ fontSize: "6cqw" }}>
              {lastDigits.slice(0, 4)} •••• •••• {lastDigits}
            </p>
            <div className="flex items-end justify-between gap-[3cqw]">
              <div className="min-w-0">
                <p className="uppercase opacity-70" style={{ fontSize: "2.6cqw" }}>
                  Card holder
                </p>
                <p className="font-poppins font-semibold truncate tracking-[0.08em]" style={{ fontSize: "4.2cqw" }}>
                  {name}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="uppercase opacity-70" style={{ fontSize: "2.6cqw" }}>
                  Valid thru
                </p>
                <p className="font-poppins font-semibold tabular-nums" style={{ fontSize: "4.2cqw" }}>
                  08/29
                </p>
              </div>
              <div className="flex shrink-0" aria-hidden="true">
                <span className="rounded-full bg-white/80" style={{ width: "8cqw", height: "8cqw" }} />
                <span className="rounded-full bg-white/40 -ml-[3.4cqw]" style={{ width: "8cqw", height: "8cqw" }} />
              </div>
            </div>
          </div>
          {frozen && (
            <div className="absolute inset-0 bg-[#9dedf0]/25 backdrop-blur-[2px] flex items-center justify-center">
              <span className="font-poppins font-semibold uppercase tracking-[0.3em] bg-primary/70 rounded-full px-[4cqw] py-[1.5cqw]" style={{ fontSize: "3.6cqw" }}>
                Frozen
              </span>
            </div>
          )}
        </div>

        {/* Back */}
        <div className={`card-face card-face--back finish-${design.finish} text-white`} style={{ background: color.background }}>
          <div className="absolute left-0 right-0 bg-black/80" style={{ top: "11%", height: "17%" }} />
          <div className="absolute flex items-center" style={{ top: "38%", left: "6.5cqw", right: "6.5cqw" }}>
            <div
              className="flex-1 bg-white/90 text-primary italic font-poppins truncate"
              style={{ fontSize: "3.6cqw", padding: "1.6cqw 3cqw", backgroundImage: "repeating-linear-gradient(-45deg, #fff 0 4px, #eef 4px 8px)" }}
            >
              {name}
            </div>
            <div className="bg-white text-primary font-poppins font-semibold tabular-nums" style={{ fontSize: "3.8cqw", padding: "1.6cqw 3cqw" }}>
              •••
            </div>
          </div>
          <p className="absolute font-poppins opacity-70 leading-snug" style={{ bottom: "16%", left: "6.5cqw", right: "35cqw", fontSize: "2.4cqw" }}>
            This card is issued by HooBank (demo). If found, please return to any HooBank partner or call +1 (555) 010-2049.
          </p>
          <div
            className="absolute rounded-[1.5cqw]"
            style={{ right: "6.5cqw", bottom: "12%", width: "18cqw", height: "12cqw", background: "conic-gradient(from 90deg, #ff7ad9, #7afcff, #fffb7d, #a17aff, #ff7ad9)", opacity: 0.8 }}
          />
          <div className="card-sheen" />
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
