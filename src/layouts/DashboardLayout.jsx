import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import SendMoneyModal from "../components/dashboard/SendMoneyModal";
import Avatar from "../components/ui/Avatar";
import Icon from "../components/ui/Icon";
import Logo from "../components/ui/Logo";
import PageLoader from "../components/ui/PageLoader";
import { initialBalance, initialTransactions } from "../constants/dashboard";
import { useToast } from "../context/ToastContext";
import { usd } from "../lib/format";
import styles from "../style";

const localISODate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const NAV = [
  { to: "/dashboard", label: "Overview", icon: "home", end: true },
  { to: "/dashboard/transactions", label: "Transactions", icon: "list" },
  { to: "/dashboard/cards", label: "Cards", icon: "card" },
  { to: "/dashboard/settings", label: "Settings", icon: "sliders" },
];

const NOTIFICATIONS = [
  { id: "n1", icon: "arrowDownLeft", text: "Halden Studio paid INV-0142 ($6,400.00)", time: "2 days ago" },
  { id: "n2", icon: "shieldCheck", text: "New sign-in approved on MacBook Air", time: "3 days ago" },
  { id: "n3", icon: "fileText", text: "INV-0143 to Kestrel Audio is overdue", time: "5 days ago" },
];

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(NOTIFICATIONS.length);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Notifications${unread ? ` (${unread} unread)` : ""}`}
        className="relative w-10 h-10 rounded-full border border-line bg-paper hover:border-ink/40 text-ink flex items-center justify-center transition"
      >
        <Icon name="bell" size={18} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-brass text-ink text-[11px] font-sans font-semibold flex items-center justify-center px-1">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-[min(340px,calc(100vw-32px))] bg-paper border border-line rounded-card p-2 shadow-float z-50 animate-fade-up">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="font-sans font-semibold text-ink text-[14px]">Notifications</p>
            <button type="button" onClick={() => setUnread(0)} className="font-sans text-[13px] text-forest link">
              Mark all read
            </button>
          </div>
          <ul className="flex flex-col">
            {NOTIFICATIONS.map((n, i) => (
              <li key={n.id} className={`flex gap-3 rounded-control p-3 ${i < unread ? "bg-forest-50" : ""}`}>
                <span className="w-8 h-8 rounded-full bg-paper border border-line text-forest flex items-center justify-center">
                  <Icon name={n.icon} size={15} />
                </span>
                <span className="flex-1">
                  <span className="block font-sans text-[14px] text-ink leading-snug">{n.text}</span>
                  <span className="block font-sans text-[12px] text-muted mt-0.5">{n.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const sideLink = ({ isActive }) =>
  `relative flex items-center gap-3 rounded-control px-3 py-2.5 font-sans text-[15px] transition ${isActive ? "bg-forest-50 text-forest font-medium before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-forest" : "text-muted hover:text-ink hover:bg-sand/60"}`;

const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

/** Mock banking app shell: sidebar (desktop) / bottom tabs (mobile), header, shared demo state via Outlet context. */
const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [balance, setBalance] = useState(initialBalance);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [hidden, setHidden] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [search, setSearch] = useState("");

  const onSend = useCallback(
    ({ recipient, amount, note }) => {
      setBalance((b) => b - amount);
      setTransactions((list) => [{ id: `t-${Date.now()}`, name: recipient.name, category: "transfer", amount: -amount, date: localISODate(), note, fresh: true }, ...list]);
      toast({ title: "Transfer sent", description: `${usd(amount)} to ${recipient.name}. (Demo — no money moved.)` });
    },
    [toast]
  );

  const ctx = useMemo(() => ({ balance, transactions, hidden, setHidden, openSend: () => setSendOpen(true), setBalance, setTransactions }), [balance, transactions, hidden]);

  const logout = () => {
    toast({ title: "Signed out", description: "Demo session ended.", variant: "info" });
    navigate("/login");
  };

  const title = NAV.find((n) => (n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)))?.label ?? "Workspace";

  return (
    <div className="min-h-screen bg-ivory flex overflow-x-clip">
      <div className="hidden md:block w-[248px] shrink-0 border-r border-line bg-paper">
      <aside className="flex flex-col h-screen sticky top-0 px-4 py-6">
        <Link to="/" aria-label="Northvault home" className="px-2">
          <Logo size={26} />
        </Link>
        <div className="mt-8 mx-1 rounded-control border border-line px-3 py-2.5">
          <p className="font-sans text-[12px] text-muted">Workspace</p>
          <p className="font-sans font-medium text-[14px] text-ink">Morgan Studio · Studio plan</p>
        </div>
        <nav aria-label="Workspace" className="flex flex-col gap-0.5 mt-6">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={sideLink}>
              <Icon name={n.icon} size={18} /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-1">
          <div className="rounded-control bg-sand/70 p-4 mb-3">
            <p className="font-sans font-semibold text-[14px] text-ink">Concept demo</p>
            <p className="font-sans text-[13px] leading-[1.5] text-muted mt-1">Balances and transfers are simulated in your browser.</p>
          </div>
          <Link to="/" className="flex items-center gap-3 px-3 py-2 font-sans text-[14px] text-muted hover:text-ink">
            <Icon name="arrowLeft" size={16} /> Back to website
          </Link>
          <button type="button" onClick={logout} className="flex items-center gap-3 px-3 py-2 font-sans text-[14px] text-muted hover:text-ink">
            <Icon name="logOut" size={16} /> Log out
          </button>
        </div>
      </aside>
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-sm border-b border-line">
          <div className="flex items-center gap-4 px-4 sm:px-8 h-[72px]">
            <Link to="/" aria-label="Northvault home" className="md:hidden shrink-0">
              <Logo size={24} />
            </Link>
            <div className="hidden md:block">
              <p className="font-sans text-[13px] text-muted">{today}</p>
              <h1 className="font-serif text-[30px] leading-none text-ink mt-1">{title}</h1>
            </div>
            <form
              role="search"
              className="hidden sm:block flex-1 max-w-[340px] ml-auto relative"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/dashboard/transactions${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ""}`);
              }}
            >
              <label htmlFor="dash-search" className="sr-only">
                Search transactions
              </label>
              <Icon name="search" size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input id="dash-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions" className={`${styles.input} pl-10 py-2 rounded-full`} />
            </form>
            <div className="flex items-center gap-2.5 ml-auto sm:ml-0">
              <button type="button" onClick={() => setSendOpen(true)} className="hidden xs:flex items-center gap-2 h-10 rounded-full bg-forest text-ivory font-sans font-medium text-[14px] px-4 hover:bg-forest-700 transition-colors">
                <Icon name="send" size={16} /> Send
              </button>
              <Notifications />
              <Link to="/dashboard/settings" aria-label="Profile settings">
                <Avatar name="Alex Morgan" />
              </Link>
            </div>
          </div>
        </header>

        <main id="main" className="flex-1 px-4 sm:px-8 py-6 sm:py-8 pb-28 md:pb-12">
          <h1 className="md:hidden font-serif text-[34px] leading-none text-ink mb-6">{title}</h1>
          <Suspense fallback={<PageLoader />}>
            <Outlet context={ctx} />
          </Suspense>
        </main>
      </div>

      <nav aria-label="Workspace" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-paper border-t border-line grid grid-cols-5 px-2 pb-[env(safe-area-inset-bottom)]">
        {NAV.slice(0, 2).map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `flex flex-col items-center gap-1 py-3 font-sans text-[11px] ${isActive ? "text-forest font-medium" : "text-muted"}`}>
            <Icon name={n.icon} size={20} /> {n.label}
          </NavLink>
        ))}
        <button type="button" onClick={() => setSendOpen(true)} className="flex flex-col items-center gap-1 py-2 font-sans text-[11px] text-ink" aria-label="Send money">
          <span className="w-11 h-11 -mt-6 rounded-full bg-forest text-ivory flex items-center justify-center shadow-float">
            <Icon name="send" size={20} />
          </span>
          Send
        </button>
        {NAV.slice(2).map((n) => (
          <NavLink key={n.to} to={n.to} className={({ isActive }) => `flex flex-col items-center gap-1 py-3 font-sans text-[11px] ${isActive ? "text-forest font-medium" : "text-muted"}`}>
            <Icon name={n.icon} size={20} /> {n.label}
          </NavLink>
        ))}
      </nav>

      <SendMoneyModal open={sendOpen} onClose={() => setSendOpen(false)} balance={balance} onSend={onSend} />
    </div>
  );
};

export default DashboardLayout;
