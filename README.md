# Northvault — business banking for freelancers and small teams

**Northvault** is a product concept by **Yaroslav Tsarenko**: a business account for freelancers and small teams
with multi-currency accounts, cards, invoices, tax pots and transfers. This repository is the front-end prototype —
a multi-page marketing site plus a working mock banking workspace.

> Concept only. Northvault is not a bank and is not regulated. There is no backend and no network calls:
> accounts, transfers, sign-ups and forms are simulated in the browser, and every figure is illustrative.

Built with **React 19**, **React Router 7**, **Vite 7** and **Tailwind CSS 3** (plain JS/JSX).

## Art direction

"Quiet private bank": a light, editorial interface where numbers are set like headlines.

| Token | Value | Use |
| --- | --- | --- |
| Ivory | `#F6F3EC` | Page background |
| Forest | `#0E3B2C` | Brand colour, primary actions, dark panels |
| Brass | `#B8893D` | Restrained accent: logo dial, card chip, index numbers |
| Ink | `#121614` | Text |

- **Type:** Instrument Serif (display, headlines, balances) and Instrument Sans (UI, body, tables), from Google Fonts.
- **Layout:** 12-column grid, numbered section markers with hairline rules, tables and ledgers over decorative cards.
- **Illustration:** everything is drawn in HTML/CSS/SVG — the balances panel, card renders, invoice, phone mock-ups,
  charts and journal covers. No photos, no gradients on text, no glow or blob effects.
- **Accessibility:** WCAG AA text contrast on all surfaces, visible focus rings, reduced-motion support.

Design tokens live in `tailwind.config.cjs`; shared type and control classes in `src/style.js`.

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
| `/` | Hero with an HTML balances panel and card, facts, accounts table, live invoice, pot split, cards, FX converter, testimonials, pricing, FAQ |
| `/features`, `/features/:slug` | Platform index and six feature pages (multi-currency accounts, invoices, tax pots, cards, transfers, security), each with an interactive widget |
| `/product` | Auto-playing product tour in a CSS phone, tax-reserve / runway planner (`#calculator`), FX converter (`#converter`) |
| `/cards` | Card line-up, card designer (`#customizer`) with live tilt and flip, specification, FAQ |
| `/pricing` | Monthly / yearly toggle, fee comparison table, yearly fee estimator, FAQ |
| `/business` | Northvault for teams: team cards with limits, cash-flow chart, roles matrix |
| `/security` | Payee confirmation mock-up, controls, interactive protection score, practices (no certification claims) |
| `/about` | The concept brief, principles, design system specimen, roadmap and credits |
| `/careers`, `/careers/:slug` | Example roles with filters, job pages with a mock application form |
| `/blog`, `/blog/:slug` | Journal with category filter, SVG covers, reading progress |
| `/help` | Searchable help centre with highlighted matches and topic filters |
| `/contact` | Validated contact form (`?topic=sales` preselects the topic) |
| `/login`, `/signup` | Mock login (any credentials / demo workspace) and a 5-step onboarding wizard |
| `/dashboard/*` | Mock workspace: multi-currency balances, cash flow, pots, open invoices, transactions, cards, settings, send-money flow |
| `/privacy`, `/terms` | Concept privacy notice and terms |

## Where things live

```
src/
  App.jsx                 routes (all pages lazy-loaded)
  style.js                shared type scale and control classes
  index.css               base styles, card render, slider, dialog, reveal
  lib/format.js           currency and date formatting
  constants/              all copy and mock data (features, pricing, blog, careers, faq, cards, dashboard)
  components/             Navbar, Footer, Button, CTA
    ui/                   Icon, Logo, CreditCard, Cover, Phone, charts, Accordion, Field, Modal, Switch…
    widgets/              CurrencyConverter, InvoicePreview, IncomeSplit, FinanceCalculator, FeeEstimator,
                          CardCustomizer, SecurityCheckup, TeamSpendControls, SupportChat, NewsletterForm
    home/                 HeroComposition
    dashboard/            SendMoneyModal, TransactionRow
  layouts/                SiteLayout and DashboardLayout
  pages/                  one file per route (+ pages/dashboard/*)
public/                   favicon, app icons, OG image, manifest, robots.txt, sitemap.xml
```

## Assets and credits

- Logo, favicon, app icons and Open Graph image: original artwork made for this concept (SVG, rendered to PNG).
- Icons: inline SVG paths in the style of [Lucide](https://lucide.dev) (ISC licence).
- Fonts: [Instrument Sans and Instrument Serif](https://fonts.google.com/) (SIL Open Font License).
- No third-party photographs or illustrations are used.

## Deployment

Static SPA. Deep links are handled by `vercel.json` (Vercel) and `public/_redirects` (Netlify).
Set `VITE_SITE_URL` (see `.env`, currently a placeholder `https://northvault.example`) to the real origin, and update
the domain in `public/robots.txt` and `public/sitemap.xml`.
