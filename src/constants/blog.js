import { people01, people02, people03 } from "../assets";

export const blogCategories = ["All", "Saving", "Credit", "Product", "Security", "Travel"];

const authors = {
  herman: { name: "Herman Jensen", role: "Head of Product", img: people01 },
  steve: { name: "Steve Mark", role: "Personal Finance Editor", img: people02 },
  kenn: { name: "Kenn Gallagher", role: "Security Lead", img: people03 },
};

/** Mock articles. `body` is a list of simple blocks rendered by BlogPost. */
export const posts = [
  {
    slug: "build-an-emergency-fund",
    title: "How to build an emergency fund without feeling the pinch",
    excerpt: "Small, automatic habits beat heroic budgeting. Here’s a realistic plan to save three months of expenses.",
    category: "Saving",
    date: "2026-10-28",
    readTime: 6,
    author: authors.steve,
    cover: "linear-gradient(135deg, #5ce1e6 0%, #214d76 70%)",
    featured: true,
    body: [
      { type: "p", text: "An emergency fund is the quiet hero of personal finance. It turns a broken laptop or surprise vet bill from a crisis into an inconvenience — and it keeps you away from high-interest debt." },
      { type: "h2", text: "Start with a tiny, specific goal" },
      { type: "p", text: "Three to six months of expenses sounds intimidating. Instead, aim for your first $500. Once that’s done, set the next milestone at one month of essential spending." },
      { type: "ul", items: ["Round up every card purchase into a savings pot", "Move 5% of each paycheck automatically on payday", "Park windfalls — tax refunds, bonuses — straight into the fund"] },
      { type: "h2", text: "Keep it separate, but reachable" },
      { type: "p", text: "Your fund should live somewhere you won’t dip into for everyday spending but can access instantly in a real emergency. A dedicated savings pot earning interest is ideal." },
      { type: "quote", text: "The best savings plan is the one you never have to think about." },
      { type: "p", text: "Review your target once a year. As your expenses grow, so should your safety net." },
    ],
  },
  {
    slug: "credit-score-myths",
    title: "7 credit score myths that are costing you money",
    excerpt: "Checking your own score doesn’t hurt it, and closing old cards can. We bust the most common misconceptions.",
    category: "Credit",
    date: "2026-10-14",
    readTime: 5,
    author: authors.herman,
    cover: "linear-gradient(135deg, #f4c4f3 0%, #fc67fa 45%, #33bbcf 100%)",
    body: [
      { type: "p", text: "Your credit score influences the rates you get on loans, cards and even some rental applications. Yet much of what people believe about it is simply wrong." },
      { type: "h2", text: "Myth 1: Checking your score lowers it" },
      { type: "p", text: "Soft checks — like viewing your own score in the HooBank app — have zero impact. Only hard inquiries from lenders can cause a small, temporary dip." },
      { type: "h2", text: "Myth 2: You need to carry a balance" },
      { type: "p", text: "Paying your statement in full every month is the best thing you can do. Carrying a balance just costs you interest." },
      { type: "ul", items: ["Keep utilisation under 30%", "Never miss a payment — set up autopay", "Keep your oldest accounts open"] },
      { type: "p", text: "Small, consistent habits move your score more than any trick." },
    ],
  },
  {
    slug: "introducing-card-studio",
    title: "Introducing Card Studio: design a card that’s truly yours",
    excerpt: "Choose your colour, finish and the name on the front. Preview it in 3D before it ships.",
    category: "Product",
    date: "2026-09-30",
    readTime: 3,
    author: authors.herman,
    cover: "linear-gradient(160deg, #214d76 0%, #11101d 60%, #fc67fa 140%)",
    body: [
      { type: "p", text: "Your card is the most physical part of your bank. Today we’re launching Card Studio, a playful way to make it your own." },
      { type: "h2", text: "Four finishes, six colours" },
      { type: "p", text: "From soft-touch matte to holographic shimmer, every finish is previewed in real time. Tilt the card with your mouse to see how light plays across it." },
      { type: "quote", text: "We wanted the card to feel like something you’d be proud to put on the table." },
      { type: "p", text: "Card Studio is available today for all plans, with premium finishes included in Plus and Premium." },
    ],
  },
  {
    slug: "spot-a-phishing-scam",
    title: "How to spot a phishing scam in under 10 seconds",
    excerpt: "Scammers are getting smarter. These five checks will keep your account safe.",
    category: "Security",
    date: "2026-09-12",
    readTime: 4,
    author: authors.kenn,
    cover: "linear-gradient(135deg, #09977c 0%, #214d76 60%, #00040f 100%)",
    body: [
      { type: "p", text: "HooBank will never ask for your password, PIN or one-time code by phone, email or text. If someone does, it’s a scam." },
      { type: "h2", text: "The five-point check" },
      { type: "ul", items: ["Is the sender address exactly right?", "Does the message create urgency or fear?", "Does the link go where it says?", "Are they asking for codes or passwords?", "Would HooBank normally contact you this way?"] },
      { type: "p", text: "When in doubt, open the app directly and check your notifications — real alerts always appear there." },
    ],
  },
  {
    slug: "travel-money-guide",
    title: "The no-nonsense guide to spending money abroad",
    excerpt: "Avoid dynamic currency conversion, skip airport kiosks and always pay in local currency.",
    category: "Travel",
    date: "2026-08-21",
    readTime: 7,
    author: authors.steve,
    cover: "linear-gradient(135deg, #ffd29d 0%, #fc8a7a 45%, #214d76 100%)",
    body: [
      { type: "p", text: "Foreign transaction fees and bad exchange rates can quietly add 5% or more to every trip. A few simple rules keep that money in your pocket." },
      { type: "h2", text: "Always pay in the local currency" },
      { type: "p", text: "When a card terminal asks if you’d like to pay in your home currency, say no. That ‘convenience’ comes with a poor rate." },
      { type: "h2", text: "Convert before you go" },
      { type: "p", text: "Use a multi-currency wallet to convert at the mid-market rate when rates look good, then spend directly from that balance." },
      { type: "quote", text: "Travel light, convert smart, and never use an airport kiosk." },
    ],
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);
