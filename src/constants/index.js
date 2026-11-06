export * from "./features";

/** Primary navigation (desktop bar + mobile menu). */
export const navLinks = [
  { id: "features", title: "Platform", to: "/features" },
  { id: "product", title: "Tour", to: "/product" },
  { id: "cards", title: "Cards", to: "/cards" },
  { id: "business", title: "Teams", to: "/business" },
  { id: "pricing", title: "Pricing", to: "/pricing" },
  { id: "help", title: "Help", to: "/help" },
];

/** Extra links only shown in the mobile menu. */
export const mobileExtraLinks = [
  { title: "Security", to: "/security" },
  { title: "About", to: "/about" },
  { title: "Careers", to: "/careers" },
  { title: "Journal", to: "/blog" },
  { title: "Contact", to: "/contact" },
];

/** Fictional customers; modest, specific claims only. Avatars are initials. */
export const testimonials = [
  {
    id: "q1",
    content: "I invoice in three currencies. Having the tax pot fill itself means I no longer keep a separate spreadsheet for it.",
    name: "Inès Moreau",
    title: "Copywriter, Lyon",
  },
  {
    id: "q2",
    content: "The fee is written on the screen before I convert. That sounds like a low bar, and it is the reason I moved.",
    name: "Tomasz Wierzbicki",
    title: "Motion designer, Kraków",
  },
  {
    id: "q3",
    content: "Our two contractors have cards with a monthly cap. Month-end now takes an afternoon instead of two.",
    name: "Hannah Lowe",
    title: "Studio lead, Lowe & Field, Bristol",
  },
];

export const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Platform", to: "/features" },
      { name: "Product tour", to: "/product" },
      { name: "Cards", to: "/cards" },
      { name: "Pricing", to: "/pricing" },
      { name: "Live demo", to: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About the concept", to: "/about" },
      { name: "Careers", to: "/careers" },
      { name: "Journal", to: "/blog" },
      { name: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help centre", to: "/help" },
      { name: "For teams", to: "/business" },
      { name: "Security", to: "/security" },
      { name: "Privacy", to: "/privacy" },
      { name: "Terms", to: "/terms" },
    ],
  },
];
