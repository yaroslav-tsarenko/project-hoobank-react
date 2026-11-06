import Button from "../components/Button";
import CTA from "../components/CTA";
import { BarChart } from "../components/ui/charts";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import TeamSpendControls from "../components/widgets/TeamSpendControls";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const BENEFITS = [
  { icon: "users", title: "Roles that match real work", text: "Owner, Admin, Member and Accountant. Accountants can export everything and move nothing." },
  { icon: "card", title: "Cards with a monthly cap", text: "Issue a card to a contractor for a project and freeze it the day the project ends." },
  { icon: "shieldCheck", title: "Approvals above a threshold", text: "Payments over an amount you choose wait for a second person to confirm." },
  { icon: "fileText", title: "Invoices in the studio’s name", text: "Shared templates, numbering and reminders, whoever sends the invoice." },
  { icon: "globe", title: "Pay contractors abroad", text: "Hold euros or zloty for the people you pay in them, and pay out over local rails." },
  { icon: "download", title: "Month-end in one export", text: "Receipts, categories and VAT codes in a single file for Xero, QuickBooks or CSV." },
];

const FLOW = [
  { label: "Jan", in: 31000, out: 24500 },
  { label: "Feb", in: 28500, out: 23800 },
  { label: "Mar", in: 36200, out: 26100 },
  { label: "Apr", in: 33900, out: 25400 },
  { label: "May", in: 41000, out: 28700 },
  { label: "Jun", in: 38600, out: 27900 },
];
const k = (v) => `$${(v / 1000).toFixed(1)}k`;

const Business = () => {
  usePageMeta("For teams", "Northvault for small teams: roles, team cards with limits, approvals, shared invoicing and month-end exports.");
  return (
    <>
      <PageHero
        eyebrow="Northvault for teams"
        title="For studios of"
        highlight="two to ten."
        description="When a practice becomes a small team, the account has to keep up: more cards, a second pair of eyes on payments and an accountant who can see everything."
        aside={<TeamSpendControls className="w-full max-w-[520px]" />}
      >
        <Button to="/contact?topic=sales">Talk to us</Button>
        <Button to="/pricing" variant="outline">
          Team plan pricing
        </Button>
      </PageHero>

      <Container className="py-16 sm:py-24">
        <SectionHeading index="01" eyebrow="Built for small teams" title="What changes when you add people." className="mb-12" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-line border border-line rounded-card overflow-hidden">
          {BENEFITS.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 3) * 80} className="bg-ivory p-6 sm:p-8">
              <Icon name={b.icon} size={22} className="text-forest" />
              <h3 className="font-serif text-[28px] leading-[1.1] text-ink mt-8">{b.title}</h3>
              <p className="font-sans text-[15px] leading-[1.6] text-muted mt-3">{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>

      <Container className="py-16 sm:py-24 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <SectionHeading
            className="md:col-span-5"
            index="02"
            eyebrow="Cash flow"
            title="See the month before it ends."
            description="Money in against money out, by month, with the same categories your accountant uses. Hover the bars for the figures."
          >
            <Button to="/dashboard" variant="outline" className="mt-8">
              Open the demo workspace
            </Button>
          </SectionHeading>
          <Reveal className={`md:col-span-7 ${styles.card} p-6 sm:p-8`}>
            <div className="flex items-center justify-between mb-6">
              <p className="font-sans font-semibold text-[15px] text-ink">Lowe &amp; Field, first half</p>
              <div className="flex gap-4 font-sans text-[13px] text-muted">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-forest" />
                  In
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-brass" />
                  Out
                </span>
              </div>
            </div>
            <BarChart
              data={FLOW}
              format={k}
              series={[
                { key: "in", label: "Money in", color: "#0e3b2c" },
                { key: "out", label: "Money out", color: "#b8893d" },
              ]}
            />
          </Reveal>
        </div>
      </Container>

      <Container className="py-16 sm:py-24 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <SectionHeading className="md:col-span-5" index="03" eyebrow="Roles" title="Who can do what." />
          <Reveal className="md:col-span-7 overflow-x-auto border-y border-line">
            <table className="w-full min-w-[520px] font-sans text-[14px]">
              <caption className="sr-only">Permissions by role</caption>
              <thead>
                <tr className="border-b border-ink text-left">
                  <th scope="col" className="py-3 pr-4 font-normal text-muted">
                    &nbsp;
                  </th>
                  {["Owner", "Admin", "Member", "Accountant"].map((r) => (
                    <th key={r} scope="col" className="py-3 px-3 font-medium text-ink text-center">
                      {r}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Send payments", [true, true, false, false]],
                  ["Approve large payments", [true, true, false, false]],
                  ["Use a card", [true, true, true, false]],
                  ["Create invoices", [true, true, true, false]],
                  ["Export statements", [true, true, false, true]],
                  ["Manage people", [true, false, false, false]],
                ].map(([label, vals]) => (
                  <tr key={label} className="border-b border-line last:border-b-0">
                    <th scope="row" className="py-3 pr-4 text-left font-normal text-muted">
                      {label}
                    </th>
                    {vals.map((v, i) => (
                      <td key={i} className="py-3 px-3 text-center">
                        {v ? <Icon name="check" size={17} className="text-forest mx-auto" label="Allowed" /> : <span className="text-faint" aria-label="Not allowed">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
        <CTA title="Bring the team over in an afternoon." text="Invite people, issue their cards and set limits before the next project starts." primary={{ to: "/contact?topic=sales", label: "Book a walkthrough" }} secondary={{ to: "/signup?plan=team", label: "Start on Team" }} />
      </Container>
    </>
  );
};

export default Business;
