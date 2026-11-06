import { useEffect } from "react";

const SITE = "Northvault";
const DEFAULT_TITLE = "Northvault — Business banking for freelancers and small teams";
const DEFAULT_DESCRIPTION =
  "Northvault is a concept business bank for freelancers and small teams: multi-currency accounts, cards, invoices and transfers in one calm workspace.";

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
