export const blogCategories = ["All", "Tax", "Currency", "Invoicing", "Product", "Security"];

/** Fictional authors for the concept journal. Avatars are drawn as initials. */
const authors = {
  mira: { name: "Mira Halvorsen", role: "Editor, business finance" },
  jonah: { name: "Jonah Petit", role: "Product design" },
  adaeze: { name: "Adaeze Okafor", role: "Security" },
};

/**
 * Mock articles. `body` is a list of simple blocks rendered by BlogPost.
 * `cover` picks one of the SVG cover patterns in components/ui/Cover.jsx.
 */
export const posts = [
  {
    slug: "how-much-to-set-aside-for-tax",
    title: "How much of each invoice should you set aside for tax?",
    excerpt: "A simple percentage rule beats a year-end scramble. How to pick yours, and when to adjust it.",
    category: "Tax",
    date: "2026-10-28",
    readTime: 6,
    author: authors.mira,
    cover: { pattern: "bars", tone: "forest" },
    featured: true,
    body: [
      { type: "p", text: "Most freelancers do not run out of money because they earn too little. They run out because the balance they see includes money that already belongs to the tax office." },
      { type: "h2", text: "Start with a flat percentage" },
      { type: "p", text: "Look at last year’s total tax bill and divide it by last year’s income. That number, rounded up to the nearest 5%, is your starting rule. If this is your first year, 25% is a cautious default in most of Europe and the US." },
      { type: "ul", items: ["Apply the rule to every payment, not to what is left at the end of the month", "Keep VAT in its own pot if you charge it", "Review the rule each quarter against your actual liability"] },
      { type: "h2", text: "Make the split automatic" },
      { type: "p", text: "A rule you have to remember is a rule you will skip in a busy month. In Northvault, a pot rule runs the moment a client payment arrives, before you have a chance to spend it." },
      { type: "quote", text: "The balance you can spend should be the balance you see." },
      { type: "p", text: "None of this replaces an accountant. It simply means the conversation with them starts from a full pot rather than an apology." },
    ],
  },
  {
    slug: "pricing-in-your-clients-currency",
    title: "Pricing in your client’s currency without losing 3% on conversion",
    excerpt: "Quoting in euros to a Berlin agency is good service. Converting it through a high-street bank is an expensive habit.",
    category: "Currency",
    date: "2026-10-14",
    readTime: 5,
    author: authors.mira,
    cover: { pattern: "arcs", tone: "brass" },
    body: [
      { type: "p", text: "Clients like invoices in their own currency. It saves them a conversion and makes you easier to approve. The cost usually lands on your side, hidden in the exchange rate." },
      { type: "h2", text: "Know the two numbers" },
      { type: "p", text: "Every conversion has a mid-market rate and a markup. Banks often fold the markup into the rate, so a 2–3% fee looks like a slightly worse rate. Ask to see both." },
      { type: "ul", items: ["Hold the currency if you have costs in it", "Convert in larger, less frequent batches", "Set a rate alert instead of converting on payday"] },
      { type: "h2", text: "Quote with a buffer for long projects" },
      { type: "p", text: "For engagements longer than three months, agree a review point for the exchange rate or add a small currency clause. It keeps the conversation friendly when rates move." },
    ],
  },
  {
    slug: "a-reminder-schedule-for-late-invoices",
    title: "Late invoices: a reminder schedule that stays polite",
    excerpt: "Three short messages, sent at the right moments, resolve most late payments without a difficult call.",
    category: "Invoicing",
    date: "2026-09-30",
    readTime: 4,
    author: authors.jonah,
    cover: { pattern: "lines", tone: "ink" },
    body: [
      { type: "p", text: "Most late invoices are not disputes. They are sitting in an inbox, waiting for someone to forward them to finance." },
      { type: "h2", text: "The three-step schedule" },
      { type: "ul", items: ["Three days before the due date: a friendly heads-up with the invoice attached", "On the due date: a one-line note and the payment link", "Seven days after: a direct question about when payment is scheduled"] },
      { type: "p", text: "Keep each message short and specific. Include the invoice number, the amount and the account details every time, so nobody has to search." },
      { type: "quote", text: "Reminders work best when they make paying easier than ignoring." },
    ],
  },
  {
    slug: "designing-a-quiet-bank",
    title: "Designing Northvault: why a bank should feel quiet",
    excerpt: "Notes on the type, colour and layout decisions behind the concept, and the things we chose to leave out.",
    category: "Product",
    date: "2026-09-12",
    readTime: 7,
    author: authors.jonah,
    cover: { pattern: "grid", tone: "forest" },
    body: [
      { type: "p", text: "Money software tends to shout: bright gradients, confetti, badges for every action. For people running a business, the money is not a game. We wanted the opposite feeling, closer to a well-kept ledger." },
      { type: "h2", text: "Numbers set like headlines" },
      { type: "p", text: "Balances are set in a serif at large sizes, with tabular figures so columns line up. The interface itself uses a plain sans-serif, which keeps controls readable at small sizes." },
      { type: "h2", text: "One brand colour, one accent" },
      { type: "p", text: "Deep forest green carries the brand and every primary action. Brass is used sparingly, for the card, the logo dial and the occasional detail. Everything else is ivory, ink and hairline rules." },
      { type: "ul", items: ["No gradients on text", "No decorative blobs or glows", "Every fee written out in plain words"] },
      { type: "quote", text: "Calm is a feature when the subject is money." },
    ],
  },
  {
    slug: "five-checks-before-approving-a-payee",
    title: "Five checks before you approve a new payee",
    excerpt: "Invoice redirection fraud targets small businesses. These checks take a minute and stop most of it.",
    category: "Security",
    date: "2026-08-21",
    readTime: 4,
    author: authors.adaeze,
    cover: { pattern: "rings", tone: "claret" },
    body: [
      { type: "p", text: "The most common fraud against small businesses is not a hacked account. It is a convincing email asking you to pay a real supplier into a new account." },
      { type: "h2", text: "The checks" },
      { type: "ul", items: ["Did the change of bank details arrive by email only?", "Have you confirmed it by phone, using a number you already had?", "Does the account name match the supplier exactly?", "Is the request unusually urgent?", "Would a second person on the team approve it?"] },
      { type: "p", text: "Northvault asks for a second confirmation for every new payee. On the Team plan, you can require that confirmation to come from someone else." },
    ],
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);
