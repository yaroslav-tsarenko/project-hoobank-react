import { useEffect, useRef, useState } from "react";

/**
 * Observes an element and reports when it enters the viewport.
 * Returns [ref, inView]. With `once` (default) it stops observing after the first hit.
 */
export default function useInView({ once = true, rootMargin = "0px 0px -8% 0px", threshold = 0.12 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView];
}
