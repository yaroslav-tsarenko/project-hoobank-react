/** Card materials. `ink` is the text colour that keeps AA contrast on the material. */
export const cardColors = [
  { id: "forest", name: "Forest", background: "linear-gradient(155deg, #175440 0%, #0e3b2c 48%, #0a2b20 100%)", ink: "#f6f3ec", accent: "#dcbb7e" },
  { id: "graphite", name: "Graphite", background: "linear-gradient(155deg, #2b302d 0%, #171b19 55%, #0d0f0e 100%)", ink: "#f6f3ec", accent: "#dcbb7e" },
  { id: "ivory", name: "Ivory", background: "linear-gradient(155deg, #fbf8f1 0%, #efe9dc 55%, #e2dacb 100%)", ink: "#121614", accent: "#80601f" },
  { id: "brass", name: "Brass", background: "linear-gradient(155deg, #d4ac68 0%, #b8893d 50%, #93692a 100%)", ink: "#121614", accent: "#121614" },
  { id: "claret", name: "Claret", background: "linear-gradient(155deg, #6b2a31 0%, #4f1d23 55%, #361317 100%)", ink: "#f6f3ec", accent: "#dcbb7e" },
  { id: "slate", name: "Slate", background: "linear-gradient(155deg, #55636f 0%, #3b4650 55%, #283038 100%)", ink: "#f6f3ec", accent: "#dcbb7e" },
];

export const cardFinishes = [
  { id: "matte", name: "Matte", description: "Soft-touch coating, no glare." },
  { id: "linen", name: "Linen", description: "A fine woven texture you can feel." },
  { id: "brushed", name: "Brushed metal", description: "Stainless steel core, brushed by hand." },
  { id: "mirror", name: "Mirror", description: "A clear lacquer with a gentle sheen." },
];

export const defaultCardDesign = {
  color: "forest",
  finish: "matte",
  name: "Alex Morgan",
  tier: "Studio",
};

export const cardTiers = [
  {
    id: "solo",
    name: "Solo",
    price: "Free",
    design: { color: "ivory", finish: "matte", name: "Solo Member", tier: "Solo" },
    perks: ["1 physical + 1 virtual card", "Spend in 12 currencies", "Instant freeze and unfreeze"],
  },
  {
    id: "studio",
    name: "Studio",
    price: "$12 / month",
    design: { color: "forest", finish: "linen", name: "Studio Member", tier: "Studio" },
    perks: ["Up to 5 cards, 20 virtual", "Merchant and category locks", "Receipts matched automatically"],
    popular: true,
  },
  {
    id: "team",
    name: "Team",
    price: "$29 / month",
    design: { color: "graphite", finish: "brushed", name: "Team Member", tier: "Team" },
    perks: ["Cards for up to 10 people", "Per-person monthly limits", "Approval for spend over a threshold"],
  },
];

export const getCardColor = (id) => cardColors.find((c) => c.id === id) ?? cardColors[0];
