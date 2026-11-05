import {
  people01,
  people02,
  people03,
  facebook,
  instagram,
  linkedin,
  twitter,
  airbnb,
  binance,
  coinbase,
  dropbox,
  send,
  shield,
  star,
} from "../assets";

export * from "./features";

/** Primary navigation (desktop bar + mobile menu). */
export const navLinks = [
  { id: "features", title: "Features", to: "/features" },
  { id: "product", title: "Product", to: "/product" },
  { id: "cards", title: "Cards", to: "/cards" },
  { id: "pricing", title: "Pricing", to: "/pricing" },
  { id: "business", title: "Business", to: "/business" },
  { id: "help", title: "Help", to: "/help" },
];

/** Extra links only shown in the mobile menu. */
export const mobileExtraLinks = [
  { title: "Security", to: "/security" },
  { title: "About", to: "/about" },
  { title: "Careers", to: "/careers" },
  { title: "Blog", to: "/blog" },
  { title: "Contact", to: "/contact" },
];

/** The three highlight features shown on the landing page (full list lives in ./features.js). */
export const homeFeatures = [
  { slug: "rewards", icon: star },
  { slug: "secured", icon: shield },
  { slug: "balance-transfer", icon: send },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: people01,
  },
  {
    id: "feedback-2",
    content: "Money makes your life easier. If you're lucky to have it, you're lucky.",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: people02,
  },
  {
    id: "feedback-3",
    content:
      "It is usually people in the money business, finance, and international trade that are really rich.",
    name: "Kenn Gallagher",
    title: "Founder & Leader",
    img: people03,
  },
];

/** Count-up stats. `value` is numeric so it can animate. */
export const stats = [
  { id: "stats-1", title: "User Active", value: 3800, suffix: "+" },
  { id: "stats-2", title: "Trusted by Company", value: 230, suffix: "+" },
  { id: "stats-3", title: "Transaction", value: 230, prefix: "$", suffix: "M+" },
];

export const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", to: "/features" },
      { name: "Product tour", to: "/product" },
      { name: "Cards", to: "/cards" },
      { name: "Pricing", to: "/pricing" },
      { name: "Live demo", to: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About us", to: "/about" },
      { name: "Careers", to: "/careers" },
      { name: "Blog", to: "/blog" },
      { name: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", to: "/help" },
      { name: "Business", to: "/business" },
      { name: "Security", to: "/security" },
      { name: "Privacy Policy", to: "/privacy" },
      { name: "Terms & Services", to: "/terms" },
    ],
  },
];

export const socialMedia = [
  { id: "social-media-1", name: "Instagram", icon: instagram, link: "https://www.instagram.com/" },
  { id: "social-media-2", name: "Facebook", icon: facebook, link: "https://www.facebook.com/" },
  { id: "social-media-3", name: "Twitter", icon: twitter, link: "https://www.twitter.com/" },
  { id: "social-media-4", name: "LinkedIn", icon: linkedin, link: "https://www.linkedin.com/" },
];

export const clients = [
  { id: "client-1", name: "Airbnb", logo: airbnb },
  { id: "client-2", name: "Binance", logo: binance },
  { id: "client-3", name: "Coinbase", logo: coinbase },
  { id: "client-4", name: "Dropbox", logo: dropbox },
];

export const storeLinks = {
  apple: "https://www.apple.com/app-store/",
  google: "https://play.google.com/store",
};
