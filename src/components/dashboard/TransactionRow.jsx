import { spendingCategories } from "../../constants/dashboard";
import { shortDate, signed } from "../../lib/format";
import Icon from "../ui/Icon";

export const money = (v, hidden = false) => (hidden ? "••••" : signed(v));

/** One ledger line: category glyph, merchant, meta and a signed amount. */
const TransactionRow = ({ tx, hidden }) => {
  const cat = spendingCategories[tx.category];
  return (
    <li className={`flex items-center gap-4 px-2 py-3 border-b border-line last:border-b-0 ${tx.fresh ? "animate-fade-up bg-forest-50" : ""}`}>
      <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border" style={{ borderColor: `${cat.color}55`, color: cat.color, background: `${cat.color}12` }}>
        <Icon name={cat.icon} size={16} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-sans text-ink text-[15px] truncate">{tx.name}</span>
        <span className="block font-sans text-muted text-[13px] truncate">
          {cat.label} · {shortDate(tx.date)}
          {tx.note ? ` · ${tx.note}` : ""}
        </span>
      </span>
      <span className={`font-sans font-medium num text-[15px] ${tx.amount > 0 ? "text-positive" : "text-ink"}`}>{money(tx.amount, hidden)}</span>
    </li>
  );
};

export default TransactionRow;
