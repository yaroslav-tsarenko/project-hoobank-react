export const departments = ["All", "Engineering", "Design", "Product", "Operations"];

export const perks = [
  { icon: "globe", title: "Remote-first", text: "Work from anywhere in ±3 hours of CET with quarterly team meetups." },
  { icon: "heart", title: "Health & wellbeing", text: "Private health cover, mental-health support and a monthly wellness budget." },
  { icon: "trendingUp", title: "Equity for everyone", text: "Every employee gets stock options — we win together." },
  { icon: "book", title: "Learning budget", text: "$2,000 a year for courses, books and conferences." },
];

export const jobs = [
  {
    slug: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote · Europe",
    type: "Full-time",
    salary: "$95k – $130k",
    summary: "Build delightful, accessible banking experiences in React used by thousands of customers every day.",
    responsibilities: [
      "Own features end-to-end across our web app and marketing site",
      "Champion accessibility and performance budgets",
      "Collaborate closely with design on motion and interaction",
    ],
    requirements: [
      "5+ years building production React apps",
      "Strong CSS skills and an eye for detail",
      "Experience with design systems and testing",
    ],
  },
  {
    slug: "backend-engineer-payments",
    title: "Backend Engineer, Payments",
    department: "Engineering",
    location: "Kyiv or Remote",
    type: "Full-time",
    salary: "$90k – $125k",
    summary: "Design reliable services that move money instantly and safely across borders.",
    responsibilities: ["Build and scale payment rails", "Improve reliability and observability", "Work with compliance on new markets"],
    requirements: ["Experience with distributed systems", "Go, Kotlin or similar", "Bonus: card or payments domain knowledge"],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote · Europe",
    type: "Full-time",
    salary: "$80k – $110k",
    summary: "Shape how people feel about money through clear, beautiful product design.",
    responsibilities: ["Design flows from discovery to polish", "Prototype interactions and motion", "Contribute to the HooBank design system"],
    requirements: ["Portfolio of shipped product work", "Fluent in Figma and prototyping", "Comfortable with research and data"],
  },
  {
    slug: "product-manager-cards",
    title: "Product Manager, Cards",
    department: "Product",
    location: "London · Hybrid",
    type: "Full-time",
    salary: "£85k – £105k",
    summary: "Lead the roadmap for our card products, rewards and Card Studio.",
    responsibilities: ["Define strategy and roadmap", "Work with partners and card networks", "Measure outcomes and iterate"],
    requirements: ["4+ years in product management", "Fintech or payments experience", "Strong analytical skills"],
  },
  {
    slug: "customer-success-specialist",
    title: "Customer Success Specialist",
    department: "Operations",
    location: "Remote",
    type: "Part-time",
    salary: "$25 – $32 / hr",
    summary: "Be the friendly human behind our 24/7 support and help customers get the most from HooBank.",
    responsibilities: ["Resolve customer questions via chat and email", "Spot trends and share insights with product", "Write help-center articles"],
    requirements: ["Excellent written English", "Empathy and patience", "Experience in support is a plus"],
  },
  {
    slug: "security-engineer",
    title: "Security Engineer",
    department: "Engineering",
    location: "Remote · Europe",
    type: "Full-time",
    salary: "$100k – $140k",
    summary: "Keep our customers’ money and data safe by building security into everything we ship.",
    responsibilities: ["Threat modelling and secure design reviews", "Run our bug bounty programme", "Automate detection and response"],
    requirements: ["Background in application or cloud security", "Hands-on with cloud infrastructure", "Clear communicator"],
  },
];

export const getJob = (slug) => jobs.find((j) => j.slug === slug);
