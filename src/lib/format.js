/** Currency formatting helpers shared by widgets and the demo app. */
export const fmt = (value, currency = "USD", digits) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: digits ?? (currency === "JPY" ? 0 : 2),
    maximumFractionDigits: digits ?? (currency === "JPY" ? 0 : 2),
  }).format(Number.isFinite(value) ? value : 0);

export const usd = (value, digits) => fmt(value, "USD", digits);
export const usd0 = (value) => fmt(value, "USD", 0);

/** Signed amount for ledgers: +$1,200.00 / −$45.00. */
export const signed = (value, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, signDisplay: "exceptZero" })
    .format(value)
    .replace("-", "−");

export const shortDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export const longDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const initials = (name) =>
  name
    .split(/\s+/)
    .filter((p) => /[A-Za-zÀ-ÿ]/.test(p[0] ?? ""))
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
