export const departments = ["All", "Engineering", "Design", "Product", "Operations"];

export const perks = [
  { icon: "globe", title: "Remote within Europe", text: "Work from anywhere within ±2 hours of CET, with two team weeks a year in Lisbon." },
  { icon: "heart", title: "Health and time off", text: "Private health cover, 28 days of leave plus public holidays, and a quiet August." },
  { icon: "trendingUp", title: "Equity", text: "Every permanent role includes share options, explained in plain numbers at offer stage." },
  { icon: "book", title: "Learning budget", text: "€1,500 a year for courses, books and conferences, no approval form required." },
];

/** Example roles for the concept. Applications are simulated in the browser. */
export const jobs = [
  {
    slug: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote · Europe",
    type: "Full-time",
    salary: "€80k – €105k",
    summary: "Build the Northvault web app: dashboards, invoices and the card designer, with accessibility treated as a feature.",
    responsibilities: ["Own features from design review to release", "Keep the design system and its documentation healthy", "Set and hold performance budgets for the app"],
    requirements: ["5+ years building production React applications", "Strong CSS and a careful eye for typography", "Experience testing complex forms and money-related UI"],
  },
  {
    slug: "backend-engineer-payments",
    title: "Backend Engineer, Payments",
    department: "Engineering",
    location: "Lisbon or Remote",
    type: "Full-time",
    salary: "€75k – €100k",
    summary: "Design the services that move money between currencies and rails, and make them boring in the best way.",
    responsibilities: ["Build integrations with payment rails and partner banks", "Improve reliability, idempotency and observability", "Work with compliance on new markets"],
    requirements: ["Experience with distributed systems and queues", "Go, Kotlin or a similar language", "Payments or ledger experience is a plus"],
  },
  {
    slug: "product-designer",
    title: "Product Designer",
    department: "Design",
    location: "Remote · Europe",
    type: "Full-time",
    salary: "€65k – €85k",
    summary: "Shape how independents see and manage their money, from first invoice to year-end export.",
    responsibilities: ["Design flows from research to polished detail", "Prototype interactions for desktop and mobile", "Contribute to the Northvault design system"],
    requirements: ["A portfolio of shipped product work", "Comfort with dense, data-heavy interfaces", "Clear writing; you will draft a lot of interface copy"],
  },
  {
    slug: "product-manager-invoicing",
    title: "Product Manager, Invoicing",
    department: "Product",
    location: "London · Hybrid",
    type: "Full-time",
    salary: "£75k – £90k",
    summary: "Lead invoicing and payment matching, the part of Northvault our customers touch every week.",
    responsibilities: ["Define the roadmap for invoices and reminders", "Work with accounting software partners", "Measure outcomes, not output"],
    requirements: ["4+ years in product management", "Experience with B2B or fintech products", "Confidence with numbers and SQL"],
  },
  {
    slug: "customer-specialist",
    title: "Customer Specialist",
    department: "Operations",
    location: "Remote",
    type: "Part-time",
    salary: "€24 – €30 / hr",
    summary: "Be the person customers reach when something about their money needs a human answer.",
    responsibilities: ["Resolve questions by chat and email", "Write and maintain help-centre articles", "Bring patterns back to the product team"],
    requirements: ["Excellent written English", "Patience and precision", "Experience with business customers is a plus"],
  },
  {
    slug: "security-engineer",
    title: "Security Engineer",
    department: "Engineering",
    location: "Remote · Europe",
    type: "Full-time",
    salary: "€85k – €115k",
    summary: "Keep customer money and data safe by building security into every part of the product.",
    responsibilities: ["Threat modelling and secure design reviews", "Run the responsible disclosure programme", "Automate detection and response"],
    requirements: ["Background in application or cloud security", "Hands-on with cloud infrastructure", "Able to explain risk to non-specialists"],
  },
];

export const getJob = (slug) => jobs.find((j) => j.slug === slug);
