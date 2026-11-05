import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On every navigation: scroll to `#hash` target if present (waiting for lazy pages to render),
 * otherwise jump to the top of the page.
 */
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return undefined;
    }
    const id = decodeURIComponent(hash.slice(1));
    const started = performance.now();
    let raf;
    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        return;
      }
      if (performance.now() - started < 4000) raf = requestAnimationFrame(attempt);
    };
    attempt();
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash, key]);

  return null;
};

export default ScrollManager;
