/**
 * Feature catalogue: drives /features and /features/:slug.
 * `widget` picks the interactive demo rendered on the detail page.
 * Stats are product specifications of the concept, not usage claims.
 */
export const features = [
  {
    slug: "multi-currency-accounts",
    iconName: "globe",
    title: "Multi-currency accounts",
    content: "Hold 12 currencies, with local account details in the US, the UK and the euro area.",
    tagline: "Get paid like a local in three markets.",
    description:
      "Give a US client ACH details, a German client an IBAN and a London agency a sort code — all landing in one Northvault workspace. Keep each balance in its own currency and convert only when the rate suits you.",
    highlights: [
      "Local details for USD, EUR and GBP; hold 9 more currencies",
      "Convert at the mid-market rate plus a fixed, visible percentage",
      "Rate alerts when a currency pair reaches your target",
      "Statements per currency for your accountant",
    ],
    stats: [
      { label: "Currencies you can hold", value: 12 },
      { label: "FX fee on Studio", value: 0.35, suffix: "%", decimals: 2 },
      { label: "Regions with local details", value: 3 },
    ],
    widget: "converter",
  },
  {
    slug: "invoices",
    iconName: "fileText",
    title: "Invoices",
    content: "Draft, send and reconcile invoices from the account the money lands in.",
    tagline: "Invoices that match themselves to payments.",
    description:
      "Because the invoice and the account live together, Northvault can match an incoming payment to the right invoice, mark it paid and file the receipt. Polite reminders go out on a schedule you set.",
    highlights: [
      "Invoice in any of 12 currencies, with your bank details pre-filled",
      "Automatic matching of payments to open invoices",
      "Reminder schedule: before due, on due date, 7 days after",
      "Export to CSV, Xero or QuickBooks",
    ],
    stats: [
      { label: "Invoice templates", value: 4 },
      { label: "Reminder steps you can set", value: 3 },
      { label: "Invoices a month on Studio", value: 0, display: "Unlimited" },
    ],
    widget: "invoice",
  },
  {
    slug: "tax-pots",
    iconName: "layers",
    title: "Tax & reserve pots",
    content: "Split every incoming payment into tax, operating and pay-yourself pots automatically.",
    tagline: "Know which part of the balance is actually yours.",
    description:
      "Set a rule once — say 25% to tax, 10% to a reserve, the rest to operating — and Northvault applies it to every client payment the moment it arrives. Pots sit in the same account and can be moved back in one step.",
    highlights: [
      "Percentage rules per currency or per client",
      "Separate VAT pot for invoices that include VAT",
      "Pots shown separately from your spendable balance",
      "Quarterly summary of what was set aside",
    ],
    stats: [
      { label: "Pots per workspace", value: 8 },
      { label: "Default tax rule", value: 25, suffix: "%" },
      { label: "Steps to undo a split", value: 1 },
    ],
    widget: "split",
  },
  {
    slug: "cards",
    iconName: "card",
    title: "Cards & spend controls",
    content: "Physical and virtual cards with per-card limits, merchant locks and instant freeze.",
    tagline: "A card for each purpose, each with its own rules.",
    description:
      "Issue a virtual card for every subscription, a physical card for travel and cards for collaborators with a monthly cap. Lock a card to one merchant, freeze it from your phone and see receipts attached to each payment.",
    highlights: [
      "Virtual cards in seconds, physical cards in 3–5 working days",
      "Monthly limits per card and per person",
      "Merchant and category locks",
      "Receipt capture by photo or email forwarding",
    ],
    stats: [
      { label: "Virtual cards on Studio", value: 20 },
      { label: "Card materials", value: 6 },
      { label: "Seconds to freeze", value: 1 },
    ],
    widget: "team",
  },
  {
    slug: "transfers",
    iconName: "send",
    title: "Transfers",
    content: "Local and international transfers, with the fee and arrival time shown before you confirm.",
    tagline: "Every transfer priced before you press send.",
    description:
      "Pay a contractor in Poland, a printer in the UK or yourself. Northvault routes local payments over local rails and shows the exact fee, rate and expected arrival up front — no correspondent-bank surprises on your side.",
    highlights: [
      "Free local transfers over ACH, SEPA and Faster Payments",
      "SWIFT for everything else, from $3",
      "Scheduled and recurring payments",
      "Approval step for payments above a threshold (Team)",
    ],
    stats: [
      { label: "Local transfer fee", value: 0, prefix: "$" },
      { label: "SWIFT from", value: 3, prefix: "$" },
      { label: "Payment rails", value: 4 },
    ],
    widget: "fees",
  },
  {
    slug: "security",
    iconName: "shieldCheck",
    title: "Security",
    content: "Device-bound sign-in, approvals for large payments and a complete audit trail.",
    tagline: "Protection that stays out of the way until it matters.",
    description:
      "Northvault binds your account to trusted devices, asks for a second confirmation on new payees and large transfers, and keeps an audit log of every change — useful the day you add an accountant or a second director.",
    highlights: [
      "Passkeys and device binding instead of SMS codes",
      "Confirmation for new payees and transfers over your threshold",
      "Role-based access for accountants and team members",
      "Exportable audit log of every sign-in and change",
    ],
    stats: [
      { label: "Roles you can assign", value: 4 },
      { label: "Audit log retention", value: 7, suffix: " years" },
      { label: "SMS codes", value: 0 },
    ],
    widget: "security",
  },
];

export const getFeature = (slug) => features.find((f) => f.slug === slug);
