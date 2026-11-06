import { useMemo, useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import TransactionRow, { money } from "../../components/dashboard/TransactionRow";
import Icon from "../../components/ui/Icon";
import Segmented from "../../components/ui/Segmented";
import { spendingCategories } from "../../constants/dashboard";
import { useToast } from "../../context/ToastContext";
import usePageMeta from "../../hooks/usePageMeta";
import { longDate } from "../../lib/format";
import styles from "../../style";

const TransactionsView = ({ initialQuery }) => {
  usePageMeta("Transactions", "Search and filter your Northvault demo transactions.");
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

  const clear = () => {
    setQuery("");
    setType("all");
    setCategory("all");
  };

  return (
    <div className="flex flex-col gap-5">
      <div className={`${styles.card} grid grid-cols-1 xs:grid-cols-3 divide-y xs:divide-y-0 xs:divide-x divide-line`}>
        {[
          { label: "Transactions shown", value: filtered.length, raw: true },
          { label: "Money in", value: totalIn },
          { label: "Money out", value: totalOut },
        ].map((s) => (
          <div key={s.label} className="p-5">
            <p className="font-sans text-[13px] text-muted">{s.label}</p>
            <p className="font-serif text-[34px] leading-tight text-ink num">{s.raw ? s.value : money(s.value, hidden)}</p>
          </div>
        ))}
      </div>

      <div className={`${styles.panel}`}>
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search transactions</span>
            <Icon name="search" size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by payee, category or reference" className={`${styles.input} pl-10`} />
          </label>
          <Segmented
            label="Direction"
            size="sm"
            value={type}
            onChange={setType}
            options={[
              { value: "all", label: "All" },
              { value: "in", label: "Money in" },
              { value: "out", label: "Money out" },
            ]}
          />
          <button
            type="button"
            onClick={() => toast({ title: "Statement exported", description: `${filtered.length} transactions to northvault-usd-statement.csv (mock)` })}
            className={`${styles.chip} ${styles.chipIdle} justify-center h-10`}
          >
            <Icon name="download" size={16} /> Export CSV
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

      <div className={`${styles.panel} pt-2`} aria-live="polite">
        {groups.length === 0 ? (
          <div className="text-center py-14">
            <p className="font-serif text-[28px] text-ink">Nothing matches those filters</p>
            <button type="button" onClick={clear} className="font-sans text-[14px] text-forest link mt-2">
              Clear filters
            </button>
          </div>
        ) : (
          groups.map(([date, list]) => (
            <section key={date}>
              <h2 className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-muted px-2 pt-5 pb-2 border-b border-line">{longDate(date)}</h2>
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
