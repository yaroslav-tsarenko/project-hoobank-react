import { useSyncExternalStore } from "react";

const subscribe = (cb) => {
  document.addEventListener("visibilitychange", cb);
  return () => document.removeEventListener("visibilitychange", cb);
};

/** False while the tab is in the background (requestAnimationFrame is paused there). */
export default function useDocumentVisible() {
  return useSyncExternalStore(subscribe, () => document.visibilityState !== "hidden", () => true);
}
