import { useMemo, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import Icon from "../../components/ui/Icon";
import Segmented from "../../components/ui/Segmented";
import TransactionRow, { money } from "../../components/dashboard/TransactionRow";
import { spendingCategories } from "../../constants/dashboard";
import { useToast } from "../../context/ToastContext";
import usePageMeta from "../../hooks/usePageMeta";
import styles from "../../style";

const longDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

const TransactionsView = ({ initialQuery }) => {
  usePageMeta("Transactions", "Search and filter your HooBank demo transactions.");
  const { transactions, hidden } = useOutletContext();
  const toast = useToast();
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState("all");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return transactions.filter(
      (t) =>
        (type === "all" || (type === "in" ? t.amount > 0 : t.amount < 0)) &&
        (category === "all" || t.category === category) &&
        (!q || `${t.name} ${spendingCategories[t.category].label} ${t.note ?? ""}`.toLowerCase().includes(q))
    );
  }, [transactions, query, type, category]);

  const groups = useMemo(() => {
    const map = new Map();
    filtered.forEach((t) => map.set(t.date, [...(map.get(t.date) ?? []), t]));
    return [...map.entries()];
  }, [filtered]);

  const totalIn = filtered.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalOut = filtered.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 xs:grid-cols-3 gap-4">
        {[
          { label: "Transactions", value: filtered.length, raw: true },
          { label: "Money in", value: totalIn },
          { label: "Money out", value: totalOut },
        ].map((s) => (
          <div key={s.label} className="rounded-[20px] bg-black-gradient border border-white/5 p-5">
            <p className="font-poppins text-[13px] text-dimWhite">{s.label}</p>
            <p className="font-poppins font-semibold text-white text-[24px] tabular-nums">{s.raw ? s.value : money(s.value, hidden)}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[24px] bg-black-gradient border border-white/5 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search transactions</span>
            <Icon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dimWhite" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by merchant, category or note" className={`${styles.input} pl-11`} />
          </label>
          <Segmented label="Direction" size="sm" value={type} onChange={setType} options={[{ value: "all", label: "All" }, { value: "in", label: "Money in" }, { value: "out", label: "Money out" }]} />
          <button type="button" onClick={() => toast({ title: "Statement exported", description: `${filtered.length} transactions → hoobank-statement.csv (mock)` })} className={`${styles.chip} ${styles.chipIdle} justify-center`}>
            <Icon name="download" size={16} /> Export
          </button>
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1" role="group" aria-label="Filter by category">
          {[["all", "All categories"], ...Object.entries(spendingCategories).map(([k, v]) => [k, v.label])].map(([k, label]) => (
            <button key={k} type="button" onClick={() => setCategory(k)} aria-pressed={category === k} className={`${styles.chip} shrink-0 ${category === k ? styles.chipActive : styles.chipIdle}`}>
              {k !== "all" && <Icon name={spendingCategories[k].icon} size={14} />} {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] bg-black-gradient border border-white/5 p-3 sm:p-5" aria-live="polite">
        {groups.length === 0 ? (
          <div className="text-center py-14">
            <Icon name="search" size={30} className="mx-auto text-secondary" />
            <p className="font-poppins text-white font-semibold mt-3">No transactions found</p>
            <button type="button" onClick={() => { setQuery(""); setType("all"); setCategory("all"); }} className="font-poppins text-[14px] text-secondary hover:underline mt-2">
              Clear filters
            </button>
          </div>
        ) : (
          groups.map(([date, list]) => (
            <section key={date} className="mb-2">
              <h2 className="font-poppins text-[13px] text-dimWhite px-3 pt-3 pb-1">{longDate(date)}</h2>
              <ul>
                {list.map((t) => (
                  <TransactionRow key={t.id} tx={t} hidden={hidden} />
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
};

const Transactions = () => {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  return <TransactionsView key={q} initialQuery={q} />;
};

export default Transactions;
