import { useEffect } from "react";

const SITE = "HooBank";
const DEFAULT_TITLE = "HooBank — The Next Generation Payment Method";
const DEFAULT_DESCRIPTION =
  "HooBank is the next generation payment method: rewarding cards, instant transfers, smart budgeting and bank-grade security in one beautiful app.";

const setMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/** Sets document title + description (and their OG/Twitter mirrors) for the current page. */
export default function usePageMeta(title, description = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE}` : DEFAULT_TITLE;
    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
  }, [title, description]);
}
