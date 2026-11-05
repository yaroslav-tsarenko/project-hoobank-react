import { useEffect, useState } from "react";

/** True once the page has scrolled past `offset` pixels. */
export default function useScrolled(offset = 12) {
  const [scrolled, setScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > offset);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}
