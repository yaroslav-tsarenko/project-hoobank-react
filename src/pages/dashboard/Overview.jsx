import { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import TransactionRow from "../../components/dashboard/TransactionRow";
import AnimatedNumber from "../../components/ui/AnimatedNumber";
import { BarChart, DonutChart } from "../../components/ui/charts";
import CreditCard from "../../components/ui/CreditCard";
import Icon from "../../components/ui/Icon";
import { CARD_STORAGE_KEY } from "../../components/widgets/CardCustomizer";
import { defaultCardDesign } from "../../constants/cards";
import { getRate } from "../../constants/currencies";
import { monthlyFlow, openInvoices, otherAccounts, savingsGoals, spendingCategories, usdAccountDetails } from "../../constants/dashboard";
import { useToast } from "../../context/ToastContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import usePageMeta from "../../hooks/usePageMeta";
import { fmt, shortDate, usd, usd0 } from "../../lib/format";
import styles from "../../style";

const PanelTitle = ({ id, children, action }) => (
  <div className="flex items-center justify-between gap-4 mb-4">
    <h2 id={id} className="font-sans font-semibold text-ink text-[15px]">
      {children}
    </h2>
    {action}
  </div>
);

const STATUS = {
  Sent: "bg-sand text-ink",
  Viewed: "bg-forest-50 text-forest",
  Overdue: "bg-[#f3e1dc] text-negative",
};

const Overview = () => {
  usePageMeta("Overview", "Your Northvault demo workspace.");
  const { balance, transactions, hidden, setHidden, openSend, setBalance } = useOutletContext();
  const toast = useToast();
  const [design] = useLocalStorage(CARD_STORAGE_KEY, defaultCardDesign);
  const [goals, setGoals] = useState(savingsGoals);

  const total = balance + otherAccounts.reduce((s, a) => s + a.balance / getRate(a.code), 0);

  const spending = useMemo(() => {
    const totals = {};
    transactions
      .filter((t) => t.amount < 0 && t.category !== "tax")
      .forEach((t) => {
        totals[t.category] = (totals[t.category] ?? 0) + -t.amount;
      });
    return Object.entries(totals)
      .map(([k, v]) => ({ key: k, label: spendingCategories[k].label, color: spendingCategories[k].color, value: v }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);
  const spent = spending.reduce((s, c) => s + c.value, 0);
  const income = transactions.filter((t) => t.amount > 0 && t.category === "income").reduce((s, t) => s + t.amount, 0);

  const actions = [
    { icon: "send", label: "Send", onClick: openSend },
    { icon: "fileText", label: "Request", onClick: () => toast({ title: "Payment link copied", description: "northvault.example/pay/morgan-studio — share it to get paid. (Mock)" }) },
    {
      icon: "plus",
      label: "Add funds",
      onClick: () => {
        setBalance((b) => b + 100);
        toast({ title: "Added $100.00", description: "From your linked personal account. (Mock)" });
      },
    },
    { icon: "card", label: "Cards", to: "/dashboard/cards" },
  ];

  const addToGoal = (id) => {
    const goal = goals.find((g) => g.id === id);
    if (goal.saved >= goal.target) return;
    setGoals((list) => list.map((g) => (g.id === id ? { ...g, saved: Math.min(g.target, g.saved + 50) } : g)));
    setBalance((b) => b - 50);
    toast({ title: `$50 moved to ${goal.name}`, description: goal.saved + 50 >= goal.target ? "That pot has reached its target." : "Moved from the USD account." });
  };

  const accounts = [{ code: "USD", name: "Dollar account", balance, details: usdAccountDetails, live: true }, ...otherAccounts];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <section className={`${styles.panel} lg:col-span-2`} aria-labelledby="balance-title">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p id="balance-title" className="font-sans text-muted text-[14px]">
              Total across accounts, in USD
            </p>
            <p className="font-serif text-[48px] xs:text-[64px] leading-[1.05] text-ink mt-1 num" aria-live="polite">
              {hidden ? "$ ••••••" : <AnimatedNumber value={total} from={0} duration={1200} format={usd} />}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setHidden((h) => !h)}
            aria-pressed={hidden}
            aria-label={hidden ? "Show balances" : "Hide balances"}
            className="w-10 h-10 rounded-full border border-line hover:border-ink/40 text-ink flex items-center justify-center shrink-0"
          >
            <Icon name={hidden ? "eyeOff" : "eye"} size={18} />
          </button>
        </div>

        <ul className="mt-6 border-t border-line">
          {accounts.map((a) => (
            <li key={a.code} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3.5 border-b border-line">
              <span className="w-11 h-8 rounded-[6px] border border-line font-sans font-semibold text-[12px] tracking-[0.06em] text-ink flex items-center justify-center bg-ivory">{a.code}</span>
              <span className="min-w-0">
                <span className="block font-sans text-[15px] text-ink">{a.name}</span>
                <span className="block font-sans text-[13px] text-muted truncate num">{a.details}</span>
              </span>
              <span className="font-sans font-medium text-[16px] text-ink num text-right">{hidden ? "••••" : fmt(a.balance, a.code)}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mt-5">
          {actions.map((a) =>
            a.to ? (
              <Link key={a.label} to={a.to} className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-line bg-paper font-sans text-[14px] text-ink hover:border-ink/40">
                <Icon name={a.icon} size={16} /> {a.label}
              </Link>
            ) : (
              <button
                key={a.label}
                type="button"
                onClick={a.onClick}
                className={`inline-flex items-center gap-2 h-10 px-4 rounded-full font-sans text-[14px] ${a.label === "Send" ? "bg-forest text-ivory hover:bg-forest-700" : "border border-line bg-paper text-ink hover:border-ink/40"}`}
              >
                <Icon name={a.icon} size={16} /> {a.label}
              </button>
            )
          )}
        </div>
      </section>

      <section className={styles.panel} aria-labelledby="card-title">
        <PanelTitle
          id="card-title"
          action={
            <Link to="/dashboard/cards" className="font-sans text-[13px] text-forest link">
              Manage
            </Link>
          }
        >
          Main card
        </PanelTitle>
        <CreditCard design={design} />
        <div className="flex justify-between font-sans text-[13px] mt-5">
          <span className="text-muted">Spent this month</span>
          <span className="text-ink num">$1,980 of $5,000</span>
        </div>
        <div className="h-[3px] bg-line mt-2 overflow-hidden" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} aria-label="Monthly card limit used">
          <div className="h-full w-[40%] bg-forest" />
        </div>
        <dl className="mt-6 border-t border-line font-sans text-[13px]">
          {[
            ["Online and contactless", "On"],
            ["Payments abroad", "Off"],
            ["Virtual cards", "1 active"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-2.5 border-b border-line">
              <dt className="text-muted">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${styles.panel} lg:col-span-2`} aria-labelledby="flow-title">
        <PanelTitle
          id="flow-title"
          action={
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
          }
        >
          Cash flow, last six months
        </PanelTitle>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="font-sans text-[13px] text-muted">Client payments this period</p>
            <p className="font-serif text-[30px] text-ink num">{hidden ? "••••" : usd0(income)}</p>
          </div>
          <div>
            <p className="font-sans text-[13px] text-muted">Business spending</p>
            <p className="font-serif text-[30px] text-ink num">{hidden ? "••••" : usd0(spent)}</p>
          </div>
        </div>
        <BarChart
          data={monthlyFlow}
          format={(v) => usd0(v)}
          series={[
            { key: "income", label: "In", color: "#0e3b2c" },
            { key: "spending", label: "Out", color: "#b8893d" },
          ]}
        />
      </section>

      <section className={styles.panel} aria-labelledby="spend-title">
        <PanelTitle id="spend-title">Spending by category</PanelTitle>
        <div className="flex justify-center">
          <DonutChart data={spending} size={200} centerTitle="Spent" centerValue={hidden ? "••••" : usd0(spent)} />
        </div>
        <ul className="grid grid-cols-1 gap-2 mt-5">
          {spending.map((c) => (
            <li key={c.key} className="flex items-center gap-2 font-sans text-[13px] text-muted min-w-0">
              <span className="w-2.5 h-2.5 shrink-0" style={{ background: c.color }} />
              <span className="truncate">{c.label}</span>
              <span className="ml-auto text-ink num">{Math.round((c.value / spent) * 100)}%</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.panel} lg:col-span-2`} aria-labelledby="recent-title">
        <PanelTitle
          id="recent-title"
          action={
            <Link to="/dashboard/transactions" className="font-sans text-[13px] text-forest link">
              View all
            </Link>
          }
        >
          Recent activity, USD account
        </PanelTitle>
        <ul className="flex flex-col border-t border-line">
          {transactions.slice(0, 7).map((t) => (
            <TransactionRow key={t.id} tx={t} hidden={hidden} />
          ))}
        </ul>
      </section>

      <div className="flex flex-col gap-5">
        <section className={styles.panel} aria-labelledby="goals-title">
          <PanelTitle id="goals-title">Pots</PanelTitle>
          <ul className="flex flex-col gap-5">
            {goals.map((g) => {
              const pct = (g.saved / g.target) * 100;
              return (
                <li key={g.id}>
                  <div className="flex items-baseline justify-between font-sans text-[14px] mb-2">
                    <span className="text-ink">{g.name}</span>
                    <span className="text-muted num">
                      {usd0(g.saved)} / {usd0(g.target)}
                    </span>
                  </div>
                  <div className="h-[3px] bg-line overflow-hidden" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`${g.name} progress`}>
                    <div className="h-full transition-[width] duration-700" style={{ width: `${pct}%`, background: g.color }} />
                  </div>
                  <button type="button" onClick={() => addToGoal(g.id)} disabled={pct >= 100} className="mt-2 font-sans text-[13px] text-forest link disabled:text-muted disabled:no-underline">
                    {pct >= 100 ? "Target reached" : "Move $50 in"}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={styles.panel} aria-labelledby="inv-title">
          <PanelTitle id="inv-title">Open invoices</PanelTitle>
          <ul className="border-t border-line">
            {openInvoices.map((inv) => (
              <li key={inv.id} className="flex items-center gap-3 py-3 border-b border-line last:border-b-0">
                <span className="flex-1 min-w-0">
                  <span className="block font-sans text-[14px] text-ink truncate">{inv.client}</span>
                  <span className="block font-sans text-[12px] text-muted num">
                    {inv.id} · due {shortDate(inv.due)}
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-sans font-medium text-[14px] text-ink num">{hidden ? "••••" : fmt(inv.amount, inv.currency, 0)}</span>
                  <span className={`inline-block mt-1 rounded-[4px] px-1.5 py-0.5 font-sans text-[11px] font-medium ${STATUS[inv.status]}`}>{inv.status}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Overview;
