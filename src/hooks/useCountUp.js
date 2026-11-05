import { useEffect, useState } from "react";
import useDocumentVisible from "./useDocumentVisible";
import useReducedMotion from "./useReducedMotion";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/** Animates from 0 to `target` once `start` becomes true. */
export default function useCountUp(target, { duration = 1600, start = true } = {}) {
  const reduced = useReducedMotion();
  const visible = useDocumentVisible();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start || reduced) return undefined;
    let raf;
    const begin = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - begin) / duration);
      setValue(target * easeOut(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Safety net: if rAF is throttled (background/embedded views), still land on the target.
    const fallback = window.setTimeout(() => {
      cancelAnimationFrame(raf);
      setValue(target);
    }, duration + 200);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    };
  }, [target, duration, start, reduced]);

  if (reduced || !visible) return target;
  return value;
}
