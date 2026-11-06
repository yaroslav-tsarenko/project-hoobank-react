/** Generated SVG covers for journal articles — no photos, just pattern and tone. */
const TONES = {
  forest: { bg: "#0e3b2c", fg: "#dcbb7e", soft: "#22604a" },
  brass: { bg: "#e9dcc0", fg: "#0e3b2c", soft: "#c9a764" },
  ink: { bg: "#1c201e", fg: "#f6f3ec", soft: "#3a403c" },
  claret: { bg: "#4f1d23", fg: "#dcbb7e", soft: "#6b2a31" },
};

const Pattern = ({ pattern, fg, soft }) => {
  switch (pattern) {
    case "bars":
      return (
        <g>
          {[38, 62, 48, 86, 70, 112, 96].map((h, i) => (
            <rect key={i} x={70 + i * 46} y={250 - h} width="26" height={h} fill={i === 5 ? fg : soft} />
          ))}
          <line x1="50" x2="430" y1="250" y2="250" stroke={fg} strokeWidth="1.5" />
        </g>
      );
    case "arcs":
      return (
        <g fill="none" stroke={fg} strokeWidth="1.5">
          {[60, 100, 140, 180, 220].map((r) => (
            <circle key={r} cx="360" cy="300" r={r} opacity={r === 140 ? 1 : 0.45} />
          ))}
          <path d="M40 210 C140 120 220 260 340 150" stroke={soft} strokeWidth="2" />
        </g>
      );
    case "lines":
      return (
        <g stroke={fg} strokeWidth="1.5">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1="60" x2={i === 3 ? 280 : 420 - (i % 3) * 60} y1={70 + i * 22} y2={70 + i * 22} opacity={i === 3 ? 1 : 0.35} />
          ))}
          <rect x="60" y="240" width="90" height="26" fill={fg} stroke="none" />
        </g>
      );
    case "rings":
      return (
        <g fill="none" stroke={fg} strokeWidth="1.5">
          <circle cx="240" cy="150" r="90" />
          <circle cx="240" cy="150" r="64" opacity="0.5" />
          <path d="M240 72 262 150h-44Z" fill={fg} stroke="none" />
          <path d="M218 150h44l-22 78Z" fill={soft} stroke="none" />
        </g>
      );
    default:
      return (
        <g stroke={fg} strokeWidth="1" opacity="0.55">
          {Array.from({ length: 11 }, (_, i) => (
            <line key={`v${i}`} x1={40 + i * 40} x2={40 + i * 40} y1="30" y2="270" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`h${i}`} x1="40" x2="440" y1={30 + i * 40} y2={30 + i * 40} />
          ))}
          <rect x="200" y="110" width="80" height="80" fill={fg} opacity="0.9" stroke="none" />
        </g>
      );
  }
};

const Cover = ({ cover, className = "" }) => {
  const tone = TONES[cover?.tone] ?? TONES.forest;
  return (
    <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" className={`block w-full h-full ${className}`} aria-hidden="true" focusable="false">
      <rect width="480" height="300" fill={tone.bg} />
      <Pattern pattern={cover?.pattern} fg={tone.fg} soft={tone.soft} />
    </svg>
  );
};

export default Cover;
