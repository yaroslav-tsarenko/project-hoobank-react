import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

const subscribe = (callback) => {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
};

const getSnapshot = () =>
  typeof window !== "undefined" && window.matchMedia ? window.matchMedia(QUERY).matches : false;

/** True when the user asked the OS to minimise motion. */
export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
