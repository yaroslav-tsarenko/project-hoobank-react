import { useEffect, useState } from "react";

const read = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
};

/** Object state persisted to localStorage (merged over `initial` so new fields get defaults). */
export default function useLocalStorage(key, initial) {
  const [state, setState] = useState(() => read(key, initial));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      /* storage may be unavailable (private mode) — ignore */
    }
  }, [key, state]);

  return [state, setState];
}
