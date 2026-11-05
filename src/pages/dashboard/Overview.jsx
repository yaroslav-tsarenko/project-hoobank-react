import { useMemo, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { BarChart, DonutChart } from "../../components/ui/charts";
import AnimatedNumber from "../../components/ui/AnimatedNumber";
import CreditCard from "../../components/ui/CreditCard";
import Icon from "../../components/ui/Icon";
import TransactionRow, { money } from "../../components/dashboard/TransactionRow";
import { CARD_STORAGE_KEY } from "../../components/widgets/CardCustomizer";
import { defaultCardDesign } from "../../constants/cards";
import { monthlyFlow, savingsGoals, spendingCategories } from "../../constants/dashboard";
import { useToast } from "../../context/ToastContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import usePageMeta from "../../hooks/usePageMeta";

const usd = (v) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(v);
const panel = "rounded-[24px] bg-black-gradient border border-white/5 p-5 sm:p-6";

const Overview = () => {
  usePageMeta("Dashboard", "Your HooBank demo dashboard.");
  const { balance, transactions, hidden, setHidden, openSend, setBalance } = useOutletContext();
  const toast = useToast();
  const [design] = useLocalStorage(CARD_STORAGE_KEY, defaultCardDesign);
  const [goals, setGoals] = useState(savingsGoals);

  const spending = useMemo(() => {
    const totals = {};
    transactions.filter((t) => t.amount < 0).forEach((t) => {
      totals[t.category] = (totals[t.category] ?? 0) + -t.amount;
    });
    return Object.entries(totals)
      .map(([k, v]) => ({ key: k, label: spendingCategories[k].label, color: spendingCategories[k].color, value: v }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);
  const spent = spending.reduce((s, c) => s + c.value, 0);
  const income = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);

  const actions = [
    { icon: "send", label: "Send", onClick: openSend },
    { icon: "download", label: "Request", onClick: () => toast({ title: "Payment link copied", description: "hoo.bank/pay/alex — share it to get paid. (Mock)" }) },
    {
      icon: "plus",
      label: "Top up",
      onClick: () => {
        setBalance((b) => b + 100);
        toast({ title: "Added $100.00", description: "Top-up from your linked debit card. (Mock)" });
      },
    },
    { icon: "card", label: "Cards", to: "/dashboard/cards" },
  ];

  const addToGoal = (id) => {
    const goal = goals.find((g) => g.id === id);
    if (goal.saved >= goal.target) return;
    setGoals((list) => list.map((g) => (g.id === id ? { ...g, saved: Math.min(g.target, g.saved + 50) } : g)));
    setBalance((b) => b - 50);
    toast({ title: `$50 moved to “${goal.name}”`, description: goal.saved + 50 >= goal.target ? "Goal reached — nice work! 🎉" : "Keep it up!" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className={`${panel} lg:col-span-2 relative overflow-hidden`} aria-labelledby="balance-title">
        <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-secondary/10 blur-3xl" aria-hidden="true" />
        <div className="flex items-center justify-between gap-4">
          <p id="balance-title" className="font-poppins text-dimWhite text-[14px]">Total balance</p>
          <button type="button" onClick={() => setHidden((h) => !h)} aria-pressed={hidden} aria-label={hidden ? "Show balance" : "Hide balance"} className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center">
            <Icon name={hidden ? "eyeOff" : "eye"} size={18} />
          </button>
        </div>
        <p className="font-poppins font-semibold text-[36px] xs:text-[48px] leading-tight text-white mt-1 tabular-nums" aria-live="polite">
          {hidden ? "$ ••••••" : <AnimatedNumber value={balance} from={0} duration={1400} format={usd} />}
        </p>
        <p className="font-poppins text-[14px] text-secondary flex items-center gap-1 mt-1">
          <Icon name="trendingUp" size={16} /> +8.4% vs last month
        </p>
        <div className="grid grid-cols-4 gap-3 mt-6 max-w-[460px]">
          {actions.map((a) => {
            const inner = (
              <>
                <span className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-blue-gradient group-hover:text-primary text-white flex items-center justify-center transition">
                  <Icon name={a.icon} size={20} />
                </span>
                <span className="font-poppins text-[13px] text-dimWhite group-hover:text-white">{a.label}</span>
              </>
            );
            return a.to ? (
              <Link key={a.label} to={a.to} className="group flex flex-col items-center gap-2">
                {inner}
              </Link>
            ) : (
              <button key={a.label} type="button" onClick={a.onClick} className="group flex flex-col items-center gap-2">
                {inner}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="rounded-[16px] bg-white/5 p-4">
            <p className="font-poppins text-[13px] text-dimWhite flex items-center gap-1.5"><Icon name="arrowDownLeft" size={14} className="text-secondary" /> Income</p>
            <p className="font-poppins font-semibold text-white text-[20px] tabular-nums">{hidden ? "••••" : usd(income)}</p>
          </div>
          <div className="rounded-[16px] bg-white/5 p-4">
            <p className="font-poppins text-[13px] text-dimWhite flex items-center gap-1.5"><Icon name="arrowUpRight" size={14} className="text-accentPink" /> Spending</p>
            <p className="font-poppins font-semibold text-white text-[20px] tabular-nums">{hidden ? "••••" : usd(spent)}</p>
          </div>
        </div>
      </section>

      <section className={panel} aria-labelledby="card-title">
        <div className="flex items-center justify-between mb-4">
          <h2 id="card-title" className="font-poppins font-semibold text-white text-[18px]">My card</h2>
          <Link to="/dashboard/cards" className="font-poppins text-[13px] text-secondary hover:underline">Manage</Link>
        </div>
        <CreditCard design={design} />
        <div className="flex justify-between font-poppins text-[13px] mt-4">
          <span className="text-dimWhite">Monthly limit</span>
          <span className="text-white">$1,980 / $5,000</span>
        </div>
        <div className="h-2 rounded-full bg-white/10 mt-2 overflow-hidden">
          <div className="h-full w-[40%] bg-blue-gradient rounded-full" />
        </div>
      </section>

      <section className={`${panel} lg:col-span-2`} aria-labelledby="flow-title">
        <div className="flex items-center justify-between mb-4">
          <h2 id="flow-title" className="font-poppins font-semibold text-white text-[18px]">Cash flow</h2>
          <div className="flex gap-4 font-poppins text-[13px] text-dimWhite">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#5ce1e6]" />Income</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#fc67fa]" />Spending</span>
          </div>
        </div>
        <BarChart
          data={monthlyFlow}
          format={(v) => usd(v)}
          series={[
            { key: "income", label: "Income", color: "#5ce1e6" },
            { key: "spending", label: "Spending", color: "#fc67fa" },
          ]}
        />
      </section>

      <section className={panel} aria-labelledby="spend-title">
        <h2 id="spend-title" className="font-poppins font-semibold text-white text-[18px] mb-4">Spending by category</h2>
        <div className="flex justify-center">
          <DonutChart data={spending} size={200} centerTitle="Spent" centerValue={hidden ? "••••" : usd(spent).replace(/\.\d+$/, "")} />
        </div>
        <ul className="grid grid-cols-2 gap-2 mt-5">
          {spending.map((c) => (
            <li key={c.key} className="flex items-center gap-2 font-poppins text-[13px] text-dimWhite min-w-0">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
              <span className="truncate">{c.label}</span>
              <span className="ml-auto text-white">{Math.round((c.value / spent) * 100)}%</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${panel} lg:col-span-2`} aria-labelledby="recent-title">
        <div className="flex items-center justify-between mb-2">
          <h2 id="recent-title" className="font-poppins font-semibold text-white text-[18px]">Recent transactions</h2>
          <Link to="/dashboard/transactions" className="font-poppins text-[13px] text-secondary hover:underline">View all</Link>
        </div>
        <ul className="flex flex-col">
          {transactions.slice(0, 6).map((t) => (
            <TransactionRow key={t.id} tx={t} hidden={hidden} />
          ))}
        </ul>
      </section>

      <section className={panel} aria-labelledby="goals-title">
        <h2 id="goals-title" className="font-poppins font-semibold text-white text-[18px] mb-4">Savings goals</h2>
        <ul className="flex flex-col gap-5">
          {goals.map((g) => {
            const pct = (g.saved / g.target) * 100;
            return (
              <li key={g.id}>
                <div className="flex items-center justify-between font-poppins text-[14px] mb-2">
                  <span className="text-white">{g.name}</span>
                  <span className="text-dimWhite tabular-nums">{money(g.saved).replace("+", "")} / {money(g.target).replace("+", "")}</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/10 overflow-hidden" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`${g.name} progress`}>
                  <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${pct}%`, background: g.color }} />
                </div>
                <button type="button" onClick={() => addToGoal(g.id)} disabled={pct >= 100} className="mt-2 font-poppins text-[13px] text-secondary hover:underline disabled:text-dimWhite disabled:no-underline">
                  {pct >= 100 ? "Goal reached ✓" : "+ Add $50"}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Overview;
