import { spendingCategories } from "../../constants/dashboard";
import Icon from "../ui/Icon";

export const money = (v, hidden = false) =>
  hidden ? "••••" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", signDisplay: "exceptZero" }).format(v);

export const shortDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

const TransactionRow = ({ tx, hidden }) => {
  const cat = spendingCategories[tx.category];
  return (
    <li className={`flex items-center gap-4 rounded-[14px] px-3 py-3 hover:bg-white/[0.03] transition ${tx.fresh ? "animate-fade-up bg-secondary/5" : ""}`}>
      <span className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ background: `${cat.color}1f`, color: cat.color }}>
        <Icon name={cat.icon} size={18} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-poppins text-white text-[15px] truncate">{tx.name}</span>
        <span className="block font-poppins text-dimWhite text-[13px] truncate">
          {cat.label} · {shortDate(tx.date)}
          {tx.note ? ` · ${tx.note}` : ""}
        </span>
      </span>
      <span className={`font-poppins font-semibold tabular-nums text-[15px] ${tx.amount > 0 ? "text-secondary" : "text-white"}`}>{money(tx.amount, hidden)}</span>
    </li>
  );
};

export default TransactionRow;
