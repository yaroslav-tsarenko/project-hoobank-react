export const cardColors = [
  { id: "cyan", name: "Cyan Wave", background: "linear-gradient(135deg, #5ce1e6 0%, #33bbcf 35%, #214d76 100%)" },
  { id: "midnight", name: "Midnight", background: "linear-gradient(144deg, #3a3a46 -30%, #11101d 70%)" },
  { id: "aurora", name: "Aurora", background: "linear-gradient(135deg, #f4c4f3 0%, #fc67fa 40%, #5b21b6 100%)" },
  { id: "ocean", name: "Deep Ocean", background: "linear-gradient(160deg, #214d76 0%, #0b1f3a 55%, #00040f 100%)" },
  { id: "sunset", name: "Sunset", background: "linear-gradient(135deg, #ffd29d 0%, #fc8a7a 45%, #c2389e 100%)" },
  { id: "emerald", name: "Emerald", background: "linear-gradient(135deg, #7de7eb 0%, #09977c 45%, #064e3b 100%)" },
];

export const cardFinishes = [
  { id: "glossy", name: "Glossy", description: "Mirror-like sheen that follows the light." },
  { id: "matte", name: "Matte", description: "Soft-touch texture with a subtle grain." },
  { id: "metal", name: "Brushed metal", description: "Fine brushed lines with a steel glint." },
  { id: "holo", name: "Holographic", description: "Iridescent colour shift as you tilt." },
];

export const defaultCardDesign = {
  color: "cyan",
  finish: "glossy",
  name: "Alex Morgan",
  tier: "Plus",
};

export const cardTiers = [
  {
    id: "classic",
    name: "Classic",
    price: "Free",
    design: { color: "midnight", finish: "matte", name: "Classic Member", tier: "Classic" },
    perks: ["1% cash back", "Free virtual card", "Instant freeze"],
  },
  {
    id: "plus",
    name: "Plus",
    price: "$9 / mo",
    design: { color: "cyan", finish: "glossy", name: "Plus Member", tier: "Plus" },
    perks: ["Up to 3% cash back", "30+ currencies", "Premium finishes"],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$19 / mo",
    design: { color: "aurora", finish: "holo", name: "Premium Member", tier: "Premium" },
    perks: ["5% travel & dining", "Lounge access", "Travel insurance"],
  },
];

export const getCardColor = (id) => cardColors.find((c) => c.id === id) ?? cardColors[0];
