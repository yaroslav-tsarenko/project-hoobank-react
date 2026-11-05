import { people01, people02, people03 } from "../assets";

export const spendingCategories = {
  shopping: { label: "Shopping", icon: "bag", color: "#5ce1e6" },
  food: { label: "Food & Drink", icon: "coffee", color: "#fc67fa" },
  travel: { label: "Travel", icon: "plane", color: "#f6c26b" },
  bills: { label: "Bills", icon: "zap", color: "#7c8cff" },
  entertainment: { label: "Entertainment", icon: "play", color: "#34d399" },
  transfer: { label: "Transfers", icon: "send", color: "#94a3b8" },
  income: { label: "Income", icon: "briefcase", color: "#33bbcf" },
};

export const contacts = [
  { id: "c1", name: "Herman Jensen", handle: "@herman", img: people01 },
  { id: "c2", name: "Steve Mark", handle: "@stevem", img: people02 },
  { id: "c3", name: "Kenn Gallagher", handle: "@kenn", img: people03 },
  { id: "c4", name: "Olivia Park", handle: "@olivia" },
  { id: "c5", name: "Dmytro Koval", handle: "@dmytro" },
  { id: "c6", name: "Sara Lindqvist", handle: "@saral" },
];

/** Mock transactions (negative = money out). */
export const initialTransactions = [
  { id: "t1", name: "Salary — Acme Inc.", category: "income", amount: 4850, date: "2026-11-03" },
  { id: "t2", name: "Blue Bottle Coffee", category: "food", amount: -6.4, date: "2026-11-03" },
  { id: "t3", name: "Airbnb", category: "travel", amount: -412.0, date: "2026-11-02" },
  { id: "t4", name: "Spotify", category: "entertainment", amount: -10.99, date: "2026-11-02" },
  { id: "t5", name: "Whole Foods Market", category: "food", amount: -84.35, date: "2026-11-01" },
  { id: "t6", name: "Electricity bill", category: "bills", amount: -72.1, date: "2026-11-01" },
  { id: "t7", name: "Herman Jensen", category: "transfer", amount: -45.0, date: "2026-10-31" },
  { id: "t8", name: "Zara", category: "shopping", amount: -129.9, date: "2026-10-30" },
  { id: "t9", name: "Uber", category: "travel", amount: -18.25, date: "2026-10-30" },
  { id: "t10", name: "Freelance — Studio Nine", category: "income", amount: 1200, date: "2026-10-29" },
  { id: "t11", name: "Netflix", category: "entertainment", amount: -15.49, date: "2026-10-28" },
  { id: "t12", name: "Apple Store", category: "shopping", amount: -249.0, date: "2026-10-27" },
  { id: "t13", name: "Internet — FiberNet", category: "bills", amount: -39.99, date: "2026-10-26" },
  { id: "t14", name: "Sushi Bar Kyoto", category: "food", amount: -56.8, date: "2026-10-25" },
  { id: "t15", name: "Steve Mark", category: "transfer", amount: 60.0, date: "2026-10-24" },
  { id: "t16", name: "IKEA", category: "shopping", amount: -312.45, date: "2026-10-23" },
  { id: "t17", name: "Ryanair", category: "travel", amount: -89.0, date: "2026-10-22" },
  { id: "t18", name: "Cinema City", category: "entertainment", amount: -24.0, date: "2026-10-21" },
  { id: "t19", name: "Gym membership", category: "bills", amount: -45.0, date: "2026-10-20" },
  { id: "t20", name: "Farmers market", category: "food", amount: -32.6, date: "2026-10-19" },
];

export const initialBalance = 24562.84;

export const monthlyFlow = [
  { label: "Jun", income: 5200, spending: 3100 },
  { label: "Jul", income: 5400, spending: 3900 },
  { label: "Aug", income: 5100, spending: 2800 },
  { label: "Sep", income: 6050, spending: 3350 },
  { label: "Oct", income: 6200, spending: 3600 },
  { label: "Nov", income: 6050, spending: 1980 },
];

export const savingsGoals = [
  { id: "g1", name: "Japan trip", saved: 2400, target: 4000, color: "#5ce1e6" },
  { id: "g2", name: "Emergency fund", saved: 7800, target: 10000, color: "#fc67fa" },
  { id: "g3", name: "New laptop", saved: 650, target: 2200, color: "#f6c26b" },
];
