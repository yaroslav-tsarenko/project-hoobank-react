export const plans = [
  {
    id: "solo",
    name: "Solo",
    monthly: 0,
    annual: 0,
    description: "For a first year of freelancing, or a side practice.",
    features: [
      "USD, EUR and GBP accounts with local details",
      "Unlimited local transfers",
      "Up to 5 invoices a month",
      "1 physical and 1 virtual card",
      "FX at mid-market + 0.55%",
    ],
    cta: "Start on Solo",
  },
  {
    id: "studio",
    name: "Studio",
    monthly: 12,
    annual: 10,
    popular: true,
    description: "For full-time independents who invoice in more than one currency.",
    features: [
      "All 12 currencies",
      "Unlimited invoices with reminders",
      "Tax and reserve pots with auto-split",
      "Accounting export (CSV, Xero, QuickBooks)",
      "FX at mid-market + 0.35%",
    ],
    cta: "Choose Studio",
  },
  {
    id: "team",
    name: "Team",
    monthly: 29,
    annual: 24,
    description: "For studios and small teams of up to ten people.",
    features: [
      "Everything in Studio",
      "Up to 10 users with roles",
      "Team cards with per-person limits",
      "Approvals for payments over a threshold",
      "FX at mid-market + 0.25%",
    ],
    cta: "Choose Team",
  },
];

export const comparison = [
  { label: "Users", values: ["1", "1 + accountant", "Up to 10"] },
  { label: "Currencies you can hold", values: ["3", "12", "12"] },
  { label: "FX fee over mid-market", values: ["0.55%", "0.35%", "0.25%"] },
  { label: "Local transfers (ACH, SEPA, Faster Payments)", values: ["Free", "Free", "Free"] },
  { label: "International (SWIFT) transfers", values: ["$6 each", "$4 each", "$3 each"] },
  { label: "Invoices per month", values: ["5", "Unlimited", "Unlimited"] },
  { label: "Tax and reserve pots", values: [false, true, true] },
  { label: "Approval flows", values: [false, false, true] },
  { label: "Free ATM withdrawals per month", values: ["$200", "$400", "$400 per card"] },
  { label: "Support", values: ["Email", "Email and chat", "Priority chat"] },
];

/** Single source for the "fees in one line" lists. */
export const feeLines = [
  { label: "Account opening", value: "Free" },
  { label: "Local transfers", value: "Free" },
  { label: "Converting currencies", value: "From 0.25%" },
  { label: "SWIFT transfer", value: "From $3" },
  { label: "Card payments abroad", value: "Mid-market rate" },
  { label: "Closing the account", value: "Free" },
];

export const pricingFaq = [
  {
    id: "p1",
    question: "Can I switch plans at any time?",
    answer: "Yes. Upgrades apply straight away and are pro-rated; downgrades take effect at the end of the billing period. There is no fee either way.",
  },
  {
    id: "p2",
    question: "How is the FX fee calculated?",
    answer: "We take the mid-market rate at the moment you convert and add the percentage for your plan. Both numbers, and the amount you will receive, are shown before you confirm.",
  },
  {
    id: "p3",
    question: "How does annual billing work?",
    answer: "You pay for twelve months up front and save about 17% compared with monthly billing. If you cancel, the unused months are refunded.",
  },
  {
    id: "p4",
    question: "Are there fees that are not on this page?",
    answer: "No. Every fee is listed here and shown in the app before you confirm an action. If a partner bank charges a fee on an incoming SWIFT payment, you will see it itemised on the transaction.",
  },
];
