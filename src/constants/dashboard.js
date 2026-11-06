/** Categories for the mock ledger. Colours come from the muted data-viz palette. */
export const spendingCategories = {
  income: { label: "Client payments", icon: "arrowDownLeft", color: "#0e3b2c" },
  software: { label: "Software", icon: "monitor", color: "#56687a" },
  contractors: { label: "Contractors", icon: "users", color: "#6e4b63" },
  travel: { label: "Travel", icon: "plane", color: "#b0654c" },
  office: { label: "Office", icon: "building", color: "#a8a193" },
  meals: { label: "Meals", icon: "coffee", color: "#b8893d" },
  tax: { label: "Tax pot", icon: "layers", color: "#7f9c88" },
  transfer: { label: "Transfers", icon: "send", color: "#8b8577" },
};

export const contacts = [
  { id: "c1", name: "Marta Kowalska", handle: "Illustrator · PLN · ••42" },
  { id: "c2", name: "Pavel Ruden", handle: "Developer · EUR · ••18" },
  { id: "c3", name: "Inès Moreau", handle: "Copywriter · EUR · ••07" },
  { id: "c4", name: "Halden Studio", handle: "Client · USD · ••90" },
  { id: "c5", name: "Sam Whitaker", handle: "Photographer · GBP · ••31" },
  { id: "c6", name: "Linden Coworking", handle: "Supplier · USD · ••64" },
];

/** Mock ledger for the USD account (negative = money out). */
export const initialTransactions = [
  { id: "t1", name: "Halden Studio — INV-0142", category: "income", amount: 6400, date: "2026-11-03" },
  { id: "t2", name: "Tax pot — 25% of INV-0142", category: "tax", amount: -1600, date: "2026-11-03" },
  { id: "t3", name: "Figma", category: "software", amount: -45, date: "2026-11-03" },
  { id: "t4", name: "Linden Coworking", category: "office", amount: -290, date: "2026-11-02" },
  { id: "t5", name: "Marta Kowalska — illustrations", category: "contractors", amount: -1200, date: "2026-11-01" },
  { id: "t6", name: "Lufthansa", category: "travel", amount: -312.4, date: "2026-10-31" },
  { id: "t7", name: "Google Workspace", category: "software", amount: -14.4, date: "2026-10-31" },
  { id: "t8", name: "Kaffeebar Mitte", category: "meals", amount: -18.6, date: "2026-10-30" },
  { id: "t9", name: "Orbit Labs — INV-0139", category: "income", amount: 3250, date: "2026-10-29" },
  { id: "t10", name: "Tax pot — 25% of INV-0139", category: "tax", amount: -812.5, date: "2026-10-29" },
  { id: "t11", name: "Adobe Creative Cloud", category: "software", amount: -62.99, date: "2026-10-28" },
  { id: "t12", name: "Deutsche Bahn", category: "travel", amount: -89, date: "2026-10-27" },
  { id: "t13", name: "Notion", category: "software", amount: -10, date: "2026-10-26" },
  { id: "t14", name: "Pavel Ruden — development retainer", category: "contractors", amount: -2100, date: "2026-10-25" },
  { id: "t15", name: "Fable & Co — INV-0137", category: "income", amount: 1850, date: "2026-10-24" },
  { id: "t16", name: "Linear", category: "software", amount: -16, date: "2026-10-23" },
  { id: "t17", name: "Hotel Brummell", category: "travel", amount: -186, date: "2026-10-22" },
  { id: "t18", name: "Stationery", category: "office", amount: -38.5, date: "2026-10-21" },
  { id: "t19", name: "Client lunch — Orbit Labs", category: "meals", amount: -64.2, date: "2026-10-20" },
  { id: "t20", name: "Converted from EUR account", category: "transfer", amount: 500, date: "2026-10-19" },
];

/** USD account balance; the other accounts are static for the demo. */
export const initialBalance = 48210.64;

export const otherAccounts = [
  { code: "EUR", name: "Euro account", balance: 12480.2, details: "IBAN DE89 •••• •••• 3104" },
  { code: "GBP", name: "Pound account", balance: 3915, details: "Sort code 04-00-•• · ••6621" },
];

export const usdAccountDetails = "ACH routing 0260 •••• · acct ••2209";

export const monthlyFlow = [
  { label: "Jun", income: 9800, spending: 6100 },
  { label: "Jul", income: 11200, spending: 6900 },
  { label: "Aug", income: 7400, spending: 5200 },
  { label: "Sep", income: 12600, spending: 7300 },
  { label: "Oct", income: 10900, spending: 6600 },
  { label: "Nov", income: 6400, spending: 3560 },
];

/** Pots: money set aside inside the account. */
export const savingsGoals = [
  { id: "g1", name: "Income tax", saved: 14200, target: 18000, color: "#0e3b2c" },
  { id: "g2", name: "VAT", saved: 3120, target: 4000, color: "#b8893d" },
  { id: "g3", name: "New laptop", saved: 1450, target: 3000, color: "#7f9c88" },
];

export const openInvoices = [
  { id: "INV-0145", client: "Orbit Labs", amount: 4200, currency: "EUR", due: "2026-11-14", status: "Sent" },
  { id: "INV-0144", client: "Fable & Co", amount: 1850, currency: "GBP", due: "2026-11-08", status: "Viewed" },
  { id: "INV-0143", client: "Kestrel Audio", amount: 2600, currency: "USD", due: "2026-10-30", status: "Overdue" },
];
