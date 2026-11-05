export const plans = [
  {
    id: "starter",
    name: "Starter",
    monthly: 0,
    annual: 0,
    description: "Everything you need to get going with modern banking.",
    features: [
      "Free virtual & physical card",
      "Instant transfers between HooBank users",
      "Smart spending categories",
      "1% cash back on everything",
    ],
    cta: "Start for free",
  },
  {
    id: "plus",
    name: "Plus",
    monthly: 9,
    annual: 7,
    popular: true,
    description: "More rewards, more currencies and premium card designs.",
    features: [
      "Everything in Starter",
      "Up to 3% cash back + rotating 5% categories",
      "Hold & convert 30+ currencies",
      "Custom metal-look card finishes",
      "4.2% APY savings pots",
    ],
    cta: "Choose Plus",
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 19,
    annual: 15,
    description: "For globetrotters and power users who want it all.",
    features: [
      "Everything in Plus",
      "5% cash back on travel & dining",
      "Airport lounge access (6 visits/yr)",
      "Travel & purchase insurance",
      "Priority 24/7 human support",
    ],
    cta: "Go Premium",
  },
];

export const comparison = [
  { label: "Virtual & physical cards", values: ["2", "5", "Unlimited"] },
  { label: "Cash back", values: ["1%", "Up to 3%", "Up to 5%"] },
  { label: "Free ATM withdrawals / month", values: ["$200", "$600", "$1,500"] },
  { label: "Multi-currency wallets", values: [false, true, true] },
  { label: "Savings APY", values: ["2.1%", "4.2%", "4.6%"] },
  { label: "Lounge access", values: [false, false, true] },
  { label: "Travel insurance", values: [false, false, true] },
  { label: "Priority support", values: [false, true, true] },
];

export const pricingFaq = [
  {
    id: "p1",
    question: "Can I switch plans at any time?",
    answer: "Yes. Upgrades apply instantly and downgrades take effect at the end of your current billing cycle — no fees either way.",
  },
  {
    id: "p2",
    question: "Is there a free trial for Plus or Premium?",
    answer: "Every paid plan comes with a 30-day free trial. Cancel any time before it ends and you won't be charged.",
  },
  {
    id: "p3",
    question: "How does annual billing work?",
    answer: "Pay once a year and save roughly 20% compared to monthly billing. You can still cancel and get a pro-rated refund.",
  },
  {
    id: "p4",
    question: "Are there any hidden fees?",
    answer: "No. Every fee we charge is listed on this page and inside the app before you confirm any action.",
  },
];
