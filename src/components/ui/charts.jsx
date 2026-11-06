import { useState } from "react";
import useInView from "../../hooks/useInView";

const GRID = "#dcd5c6";
const LABEL = "#4f5651";

/** Donut chart. data: [{ label, value, color }] */
export const DonutChart = ({ data, size = 220, thickness = 18, centerTitle, centerValue, className = "" }) => {
  const [ref, inView] = useInView();
  const [active, setActive] = useState(null);
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const radius = (size - thickness) / 2 - 4;
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
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto -rotate-90"
        role="img"
        aria-label={data.map((d) => `${d.label}: ${Math.round((d.value / total) * 100)}%`).join(", ")}
      >
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#ece7dc" strokeWidth={thickness} />
        {segments.map((s, i) => (
          <circle
            key={s.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={s.color}
            strokeWidth={active === i ? thickness + 4 : thickness}
            strokeDasharray={`${inView ? Math.max(s.length - 2, 0) : 0} ${circumference}`}
            strokeDashoffset={-s.offset}
            style={{ transition: "stroke-dasharray .9s cubic-bezier(.22,.61,.36,1), stroke-width .2s ease", transitionDelay: `${i * 70}ms` }}
            onPointerEnter={() => setActive(i)}
            onPointerLeave={() => setActive(null)}
            className="cursor-pointer"
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-8">
        <p className="font-sans text-[13px] text-muted">{current ? current.label : centerTitle}</p>
        <p className="font-serif text-[28px] leading-tight text-ink num">
          {current ? `${Math.round((current.value / total) * 100)}%` : centerValue}
        </p>
      </div>
    </div>
  );
};

/** Grouped bar chart. data: [{ label, a, b }], series: [{ key, label, color }] */
export const BarChart = ({ data, series, height = 220, format = (v) => v, className = "", ariaLabel = "Monthly money in versus money out" }) => {
  const [ref, inView] = useInView();
  const [hover, setHover] = useState(null);
  const width = 600;
  const pad = { top: 16, bottom: 28, left: 4, right: 4 };
  const max = Math.max(...data.flatMap((d) => series.map((s) => d[s.key]))) * 1.1;
  const groupW = (width - pad.left - pad.right) / data.length;
  const barW = Math.min(22, (groupW * 0.5) / series.length);
  const innerH = height - pad.top - pad.bottom;

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" role="img" aria-label={ariaLabel}>
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line key={t} x1={pad.left} x2={width - pad.right} y1={pad.top + innerH * (1 - t)} y2={pad.top + innerH * (1 - t)} stroke={GRID} strokeDasharray="2 4" />
        ))}
        <line x1={pad.left} x2={width - pad.right} y1={pad.top + innerH} y2={pad.top + innerH} stroke={GRID} />
        {data.map((d, i) => {
          const gx = pad.left + groupW * i + groupW / 2;
          return (
            <g key={d.label} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} className="cursor-pointer">
              <rect x={pad.left + groupW * i} y={pad.top} width={groupW} height={innerH} fill={hover === i ? "rgba(14,59,44,0.05)" : "transparent"} />
              {series.map((s, si) => {
                const h = (d[s.key] / max) * innerH;
                const x = gx - (barW * series.length + 4 * (series.length - 1)) / 2 + si * (barW + 4);
                return (
                  <rect
                    key={s.key}
                    x={x}
                    y={pad.top + innerH - h}
                    width={barW}
                    height={h}
                    rx="2"
                    fill={s.color}
                    style={{
                      transformBox: "fill-box",
                      transformOrigin: "bottom",
                      transform: inView ? "scaleY(1)" : "scaleY(0)",
                      transition: `transform .8s cubic-bezier(.22,.61,.36,1) ${i * 60}ms`,
                    }}
                  />
                );
              })}
              <text x={gx} y={height - 8} textAnchor="middle" fill={LABEL} fontSize="13" fontFamily="Instrument Sans, sans-serif">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      {hover != null && (
        <div
          className="absolute top-0 bg-paper border border-line shadow-lift rounded-control px-3 py-2 pointer-events-none font-sans text-[13px]"
          style={{ left: `${((hover + 0.5) / data.length) * 100}%`, transform: "translateX(-50%)" }}
        >
          <p className="text-ink font-semibold">{data[hover].label}</p>
          {series.map((s) => (
            <p key={s.key} className="text-muted whitespace-nowrap num">
              <span className="inline-block w-2 h-2 mr-2" style={{ background: s.color }} />
              {s.label}: {format(data[hover][s.key])}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

/** Line/area chart. series: [{ key, label, color, values: number[], fill?: boolean }] */
export const AreaChart = ({ series, labels, height = 240, className = "", ariaLabel = "Growth chart" }) => {
  const width = 600;
  const pad = { top: 12, bottom: 26, left: 4, right: 4 };
  const all = series.flatMap((s) => s.values);
  const max = Math.max(...all, 1) * 1.08;
  const n = series[0].values.length;
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const pt = (v, i) => [pad.left + (n === 1 ? 0 : (innerW * i) / (n - 1)), pad.top + innerH - (Math.max(v, 0) / max) * innerH];

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
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={pad.left} x2={width - pad.right} y1={pad.top + innerH * (1 - t)} y2={pad.top + innerH * (1 - t)} stroke={GRID} strokeDasharray="2 4" />
      ))}
      <line x1={pad.left} x2={width - pad.right} y1={pad.top + innerH} y2={pad.top + innerH} stroke={GRID} />
      {series.map((s) => {
        const d = linePath(s.values);
        const [lx] = pt(0, n - 1);
        const [fx] = pt(0, 0);
        return (
          <g key={s.key}>
            {s.fill !== false && <path d={`${d} L${lx},${pad.top + innerH} L${fx},${pad.top + innerH} Z`} fill={s.color} fillOpacity="0.08" />}
            <path d={d} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeDasharray={s.dashed ? "5 5" : undefined} />
          </g>
        );
      })}
      {labels.map((l, i) =>
        i % step === 0 || i === labels.length - 1 ? (
          <text
            key={l}
            x={pt(0, i)[0]}
            y={height - 6}
            textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}
            fill={LABEL}
            fontSize="13"
            fontFamily="Instrument Sans, sans-serif"
          >
            {l}
          </text>
        ) : null
      )}
    </svg>
  );
};
