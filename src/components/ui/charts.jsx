import { useState } from "react";
import useInView from "../../hooks/useInView";

/** Donut chart. data: [{ label, value, color }] */
export const DonutChart = ({ data, size = 220, thickness = 26, centerTitle, centerValue, className = "" }) => {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(null);
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = data.reduce(
    (acc, d) => {
      const length = (d.value / total) * circumference;
      acc.list.push({ ...d, length, offset: acc.offset });
      acc.offset += length;
      return acc;
    },
    { list: [], offset: 0 }
  ).list;

  const current = active != null ? segments[active] : null;

  return (
    <div ref={ref} className={`relative inline-flex ${className}`} style={{ width: size, maxWidth: "100%" }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto -rotate-90" role="img" aria-label={data.map((d) => `${d.label}: ${Math.round((d.value / total) * 100)}%`).join(", ")}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={thickness} />
        {segments.map((s, i) => (
          <circle
            key={s.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={s.color}
            strokeWidth={active === i ? thickness + 6 : thickness}
            strokeDasharray={`${inView ? Math.max(s.length - 3, 0) : 0} ${circumference}`}
            strokeDashoffset={-s.offset}
            strokeLinecap="butt"
            style={{ transition: "stroke-dasharray 1s cubic-bezier(.25,.46,.45,.94), stroke-width .2s ease", transitionDelay: `${i * 90}ms` }}
            onPointerEnter={() => setActive(i)}
            onPointerLeave={() => setActive(null)}
            className="cursor-pointer"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-8">
        <p className="font-poppins text-[13px] text-dimWhite">{current ? current.label : centerTitle}</p>
        <p className="font-poppins font-semibold text-[22px] text-white tabular-nums">
          {current ? `${Math.round((current.value / total) * 100)}%` : centerValue}
        </p>
      </div>
    </div>
  );
};

/** Grouped bar chart. data: [{ label, a, b }], series: [{ key, label, color }] */
export const BarChart = ({ data, series, height = 220, format = (v) => v, className = "" }) => {
  const [ref, inView] = useInView();
  const [hover, setHover] = useState(null);
  const width = 600;
  const pad = { top: 16, bottom: 28, left: 8, right: 8 };
  const max = Math.max(...data.flatMap((d) => series.map((s) => d[s.key]))) * 1.1;
  const groupW = (width - pad.left - pad.right) / data.length;
  const barW = Math.min(26, (groupW * 0.6) / series.length);
  const innerH = height - pad.top - pad.bottom;

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label="Monthly income versus spending">
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`bar-${s.key}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={s.color} />
              <stop offset="100%" stopColor={s.color} stopOpacity="0.35" />
            </linearGradient>
          ))}
        </defs>
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line key={t} x1={pad.left} x2={width - pad.right} y1={pad.top + innerH * (1 - t)} y2={pad.top + innerH * (1 - t)} stroke="rgba(255,255,255,0.06)" />
        ))}
        {data.map((d, i) => {
          const gx = pad.left + groupW * i + groupW / 2;
          return (
            <g key={d.label} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} className="cursor-pointer">
              <rect x={pad.left + groupW * i} y={pad.top} width={groupW} height={innerH} fill={hover === i ? "rgba(255,255,255,0.04)" : "transparent"} rx="10" />
              {series.map((s, si) => {
                const h = (d[s.key] / max) * innerH;
                const x = gx - (barW * series.length + 6 * (series.length - 1)) / 2 + si * (barW + 6);
                return (
                  <rect
                    key={s.key}
                    x={x}
                    y={pad.top + innerH - h}
                    width={barW}
                    height={h}
                    rx="6"
                    fill={`url(#bar-${s.key})`}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "bottom",
                      transform: inView ? "scaleY(1)" : "scaleY(0)",
                      transition: `transform .9s cubic-bezier(.25,.46,.45,.94) ${i * 70}ms`,
                    }}
                  />
                );
              })}
              <text x={gx} y={height - 8} textAnchor="middle" className="fill-[rgba(255,255,255,0.6)] font-poppins" fontSize="13">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      {hover != null && (
        <div
          className="absolute top-0 glass bg-[#0b0f1d]/90 rounded-[12px] px-3 py-2 pointer-events-none font-poppins text-[13px]"
          style={{ left: `${((hover + 0.5) / data.length) * 100}%`, transform: "translateX(-50%)" }}
        >
          <p className="text-white font-semibold">{data[hover].label}</p>
          {series.map((s) => (
            <p key={s.key} className="text-dimWhite whitespace-nowrap">
              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: s.color }} />
              {s.label}: {format(data[hover][s.key])}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

/** Smooth area/line chart. series: [{ key, label, color, values: number[] }] */
export const AreaChart = ({ series, labels, height = 240, className = "", ariaLabel = "Growth chart" }) => {
  const width = 600;
  const pad = { top: 12, bottom: 26, left: 4, right: 4 };
  const all = series.flatMap((s) => s.values);
  const max = Math.max(...all, 1) * 1.08;
  const n = series[0].values.length;
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const pt = (v, i) => [pad.left + (n === 1 ? 0 : (innerW * i) / (n - 1)), pad.top + innerH - (v / max) * innerH];

  const linePath = (values) =>
    values
      .map((v, i) => {
        const [x, y] = pt(v, i);
        if (i === 0) return `M${x},${y}`;
        const [px, py] = pt(values[i - 1], i - 1);
        const cx = (px + x) / 2;
        return `C${cx},${py} ${cx},${y} ${x},${y}`;
      })
      .join(" ");

  const step = Math.max(1, Math.ceil(labels.length / 6));

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`w-full h-auto ${className}`} role="img" aria-label={ariaLabel}>
      <defs>
        {series.map((s) => (
          <linearGradient key={s.key} id={`area-${s.key}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={pad.left} x2={width - pad.right} y1={pad.top + innerH * (1 - t)} y2={pad.top + innerH * (1 - t)} stroke="rgba(255,255,255,0.06)" />
      ))}
      {series.map((s) => {
        const d = linePath(s.values);
        const [lx] = pt(0, n - 1);
        const [fx] = pt(0, 0);
        return (
          <g key={s.key}>
            <path d={`${d} L${lx},${pad.top + innerH} L${fx},${pad.top + innerH} Z`} fill={`url(#area-${s.key})`} style={{ transition: "d .5s ease" }} />
            <path d={d} fill="none" stroke={s.color} strokeWidth="3" strokeLinecap="round" style={{ transition: "d .5s ease" }} />
          </g>
        );
      })}
      {labels.map((l, i) =>
        i % step === 0 || i === labels.length - 1 ? (
          <text key={l} x={pt(0, i)[0]} y={height - 6} textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"} className="fill-[rgba(255,255,255,0.6)] font-poppins" fontSize="13">
            {l}
          </text>
        ) : null
      )}
    </svg>
  );
};
