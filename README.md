# HooBank — The Next Generation Payment Method

A multi-page, front-end-only marketing site and mock banking app for the fictional fintech **HooBank**.
Everything is layout and mock interactivity — there is **no backend and no network calls**; forms, transfers
and sign-ups are simulated in the browser.

Built with **React 19**, **React Router 7**, **Vite 7** and **Tailwind CSS 3** (plain JS/JSX).

## Quick start

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build at http://localhost:4400
npm run lint      # ESLint (flat config, react + react-hooks), fails on any warning
```

Requires Node.js 20.19+.

## Pages

| Route | What's there |
| --- | --- |
| `/` | Original landing page, polished: count-up stats, feature cards → feature pages, live currency converter, logo marquee, CTAs |
| `/features`, `/features/:slug` | Feature catalogue + detail pages (rewards, secured, balance-transfer, instant-payments, global-transfers, smart-budgeting), each with its own interactive widget |
| `/product` | Auto-playing product tour with phone mockup, savings / balance-transfer calculator (`#calculator`), currency converter (`#converter`) |
| `/cards` | Card lineup and **Card Studio** customizer (`#customizer`) with live 3D tilt + flip |
| `/pricing` | Monthly / annual toggle with animated prices, comparison table, FAQ |
| `/business` | Team card spend controls widget, cash-flow chart, benefits |
| `/security` | Interactive security checkup score |
| `/about`, `/careers`, `/careers/:slug` | Story, timeline, team; filterable job board and job pages with a mock application form |
| `/blog`, `/blog/:slug` | 5 mock articles with category filter, reading progress bar, like / copy-link |
| `/help` | Searchable help center with highlighted matches, topic filters and FAQ accordion |
| `/contact` | Validated contact form (`?topic=sales` etc. preselects the topic), offices map |
| `/login`, `/signup` | Mock login (any credentials / demo account) and a 5-step onboarding wizard with validation, password strength and success screen |
| `/dashboard/*` | Mock banking app with its own layout: overview, transactions, cards, settings |
| `/privacy`, `/terms` | Legal pages with in-page table of contents |
| `*` | Styled 404 (also shown for unknown feature / blog / career slugs) |

## Mock interactive features

- **Card Studio** — colour, finish (glossy / matte / brushed metal / holographic), name and tier; mouse-follow 3D tilt, flip to back, “Surprise me”; the saved design (localStorage) appears in the dashboard.
- **Finance calculator** — savings growth (area chart) and balance-transfer planner (donut chart) with animated results.
- **Currency converter** — mock mid-market rates with live jitter, swap button, animated result and savings vs. a bank markup.
- **Dashboard** — count-up balance with hide toggle, quick actions, cash-flow bar chart, spending donut, savings goals, transaction search / filters, **Send money** modal (recipient → amount → confirm → success) that updates balance and history, card freeze / details / limits / virtual cards, settings with toggles.
- **Signup wizard**, **pricing toggle**, **help search**, **FAQ accordions**, **support chat bot**, **toasts** for every form, rewards / budget / security widgets, team spend controls.
- Scroll-reveal and hover effects; all motion is disabled under `prefers-reduced-motion`.

## Where things live

```
src/
  App.jsx                 routes (all pages lazy-loaded)
  main.jsx                BrowserRouter + ToastProvider
  style.js                shared Tailwind class strings (headings, cards, inputs, chips…)
  index.css               design tokens: gradients, glass, reveal, marquee, 3D card, dialog…
  constants/              ALL content & mock data
    index.js              nav, footer, stats, testimonials, socials, clients
    features.js           feature catalogue (+ /features/:slug)
    blog.js  careers.js   articles and jobs (+ slug pages)
    faq.js   pricing.js   help center & pricing content
    cards.js              card colours, finishes, tiers
    currencies.js         mock FX rates
    dashboard.js          transactions, contacts, chart data, goals
  components/             landing sections (Hero, Business, Billing…), Navbar, Footer, Button
    ui/                   primitives: Icon, Modal, Accordion, Field, Switch, Segmented, RangeField,
                          Reveal, CountUp, AnimatedNumber, Marquee, PageHero, CreditCard, charts
    widgets/              interactive widgets (CardCustomizer, CurrencyConverter, FinanceCalculator…)
    dashboard/            SendMoneyModal, TransactionRow
  layouts/                SiteLayout (navbar/footer/chat) and DashboardLayout
  pages/                  one file per route (+ pages/dashboard/*)
  hooks/                  usePageMeta, useInView, useCountUp, useAnimatedNumber, useLocalStorage…
public/                   favicon, OG image, robots.txt, sitemap.xml, _redirects, manifest
```

To edit copy, start in `src/constants/`. To add a page, create it in `src/pages/`, register it in
`src/App.jsx`, and link it from `navLinks` / `footerLinks` in `src/constants/index.js`.
Each page sets its own `<title>` and meta description via `usePageMeta(title, description)`.

## Deployment

It's a static SPA, so any static host works. Deep links are handled by:

- **Vercel** — `vercel.json` rewrites all paths to `index.html`.
- **Netlify** — `public/_redirects` (`/* /index.html 200`).

Set `VITE_SITE_URL` (see `.env`) to the production origin so canonical / Open Graph URLs are absolute,
and update the domain in `public/robots.txt` and `public/sitemap.xml`.
