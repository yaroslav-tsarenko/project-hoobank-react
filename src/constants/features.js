import { send, shield, star } from "../assets";

/**
 * Feature catalogue: drives /features and /features/:slug.
 * `widget` picks the interactive demo rendered on the detail page.
 */
export const features = [
  {
    slug: "rewards",
    icon: star,
    iconName: "star",
    title: "Rewards",
    content: "The best credit cards offer some tantalizing combinations of promotions and prizes",
    tagline: "Earn up to 5% back on the things you already buy.",
    description:
      "Every swipe, tap and online checkout earns HooPoints. Boosted categories rotate each quarter, and points never expire while your account is open — redeem them for cash back, travel or gift cards in a tap.",
    highlights: [
      "5% back on rotating categories, 1.5% on everything else",
      "Instant point crediting — no waiting for statements",
      "Redeem for cash, travel or partner gift cards",
      "Welcome bonus of 20,000 points in your first 90 days",
    ],
    stats: [
      { label: "Avg. yearly rewards", value: 412, prefix: "$" },
      { label: "Partner brands", value: 180, suffix: "+" },
      { label: "Points expiry", value: 0, suffix: " days" },
    ],
    widget: "rewards",
  },
  {
    slug: "secured",
    icon: shield,
    iconName: "shieldCheck",
    title: "100% Secured",
    content: "We take proactive steps make sure your information and transactions are secure.",
    tagline: "Bank-grade protection that runs quietly in the background.",
    description:
      "From biometric sign-in to real-time fraud scoring on every transaction, HooBank layers multiple defences so your money stays yours. Freeze a card in one tap and get alerted the moment something looks off.",
    highlights: [
      "256-bit encryption in transit and at rest",
      "Real-time fraud monitoring with instant alerts",
      "One-tap card freeze and virtual cards for online shopping",
      "Zero-liability protection on unauthorised charges",
    ],
    stats: [
      { label: "Fraud checks / sec", value: 12000, suffix: "+" },
      { label: "Uptime", value: 99.99, suffix: "%", decimals: 2 },
      { label: "Liability on fraud", value: 0, prefix: "$" },
    ],
    widget: "security",
  },
  {
    slug: "balance-transfer",
    icon: send,
    iconName: "send",
    title: "Balance Transfer",
    content: "A balance transfer credit card can save you a lot of money in interest charges.",
    tagline: "Move high-interest debt and pay it down faster.",
    description:
      "Transfer balances from other cards and enjoy 0% intro APR for 18 months. Our planner shows exactly how much you'll save and how fast you can be debt-free.",
    highlights: [
      "0% intro APR for 18 months on transfers",
      "Transfer up to 95% of your credit line",
      "Payoff planner with monthly reminders",
      "No hidden fees, ever",
    ],
    stats: [
      { label: "Intro APR", value: 0, suffix: "%" },
      { label: "Months interest-free", value: 18 },
      { label: "Avg. interest saved", value: 1240, prefix: "$" },
    ],
    widget: "calculator",
  },
  {
    slug: "instant-payments",
    iconName: "zap",
    title: "Instant Payments",
    content: "Send and receive money in seconds, 24/7 — even on weekends and holidays.",
    tagline: "Money that moves at the speed of a message.",
    description:
      "Pay friends with a phone number, split bills in a group chat style feed, or request money with a shareable link. Transfers between HooBank users land instantly and for free.",
    highlights: [
      "Free instant transfers between HooBank accounts",
      "Split bills and track who paid what",
      "Payment links and QR codes for requests",
      "Scheduled and recurring payments",
    ],
    stats: [
      { label: "Avg. transfer time", value: 2, suffix: "s" },
      { label: "Transfer fees", value: 0, prefix: "$" },
      { label: "Availability", value: 24, suffix: "/7" },
    ],
    widget: "none",
  },
  {
    slug: "global-transfers",
    iconName: "globe",
    title: "Global Transfers",
    content: "Hold, convert and send 30+ currencies at the real mid-market exchange rate.",
    tagline: "One account, thirty currencies, zero markup.",
    description:
      "Travel or work across borders without the hidden FX markups. Hold multiple currencies, convert in a tap at the mid-market rate and send money abroad with transparent, tiny fees.",
    highlights: [
      "Real mid-market exchange rate, no markup",
      "Multi-currency wallets with local account details",
      "Spend abroad with no foreign transaction fees",
      "Rate alerts when your target rate is hit",
    ],
    stats: [
      { label: "Currencies", value: 30, suffix: "+" },
      { label: "Countries", value: 160, suffix: "+" },
      { label: "FX markup", value: 0, suffix: "%" },
    ],
    widget: "converter",
  },
  {
    slug: "smart-budgeting",
    iconName: "pieChart",
    title: "Smart Budgeting",
    content: "Automatic categories, spending insights and goals that keep you on track.",
    tagline: "See where every dollar goes — automatically.",
    description:
      "HooBank categorises every transaction, builds budgets that adapt to your habits and nudges you before you overspend. Round-ups and savings goals make growing your balance effortless.",
    highlights: [
      "Automatic spending categories and monthly reports",
      "Adaptive budgets with gentle overspend nudges",
      "Round-ups into high-yield savings pots",
      "Shared budgets for couples and roommates",
    ],
    stats: [
      { label: "Savings APY", value: 4.2, suffix: "%", decimals: 1 },
      { label: "Avg. saved / month", value: 186, prefix: "$" },
      { label: "Categories", value: 24 },
    ],
    widget: "budget",
  },
];

export const getFeature = (slug) => features.find((f) => f.slug === slug);
