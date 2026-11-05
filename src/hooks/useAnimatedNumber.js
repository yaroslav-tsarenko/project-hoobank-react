import { useEffect, useRef, useState } from "react";
import useDocumentVisible from "./useDocumentVisible";
import useReducedMotion from "./useReducedMotion";

const easeOut = (t) => 1 - Math.pow(1 - t, 3);

/**
 * Smoothly tweens from the previously shown value to the new `value`.
 * Pass `initial` (e.g. 0) to also animate on mount — a count-up.
 */
export default function useAnimatedNumber(value, duration = 600, initial = value) {
  const reduced = useReducedMotion();
  const visible = useDocumentVisible();
  const [display, setDisplay] = useState(initial);
  const fromRef = useRef(initial);

  useEffect(() => {
    if (reduced) {
      fromRef.current = value;
      return undefined;
    }
    const from = fromRef.current;
    if (from === value) return undefined;
    let raf;
    const begin = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - begin) / duration);
      const next = from + (value - from) * easeOut(t);
      fromRef.current = next;
      setDisplay(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Safety net: if rAF is throttled (background/embedded views), still land on the final value.
    const fallback = window.setTimeout(() => {
      cancelAnimationFrame(raf);
      fromRef.current = value;
      setDisplay(value);
    }, duration + 200);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    };
  }, [value, duration, reduced]);

  return reduced || !visible ? value : display;
}
