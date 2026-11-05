import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { logo, people01 } from "../assets";
import SendMoneyModal from "../components/dashboard/SendMoneyModal";
import Icon from "../components/ui/Icon";
import PageLoader from "../components/ui/PageLoader";
import { initialBalance, initialTransactions } from "../constants/dashboard";
import { useToast } from "../context/ToastContext";
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
  { id: "n1", icon: "briefcase", text: "Salary of $4,850.00 received", time: "2d ago" },
  { id: "n2", icon: "shieldCheck", text: "New sign-in from MacBook Pro", time: "3d ago" },
  { id: "n3", icon: "sparkles", text: "You earned 412 HooPoints this month", time: "5d ago" },
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
        className="relative w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition"
      >
        <Icon name="bell" size={20} />
        {unread > 0 && (
          <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] rounded-full bg-accentPink text-primary text-[11px] font-poppins font-semibold flex items-center justify-center px-1">
            {unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-[min(320px,calc(100vw-32px))] glass bg-[#0b0f1d]/95 rounded-[20px] p-4 shadow-2xl z-50 animate-fade-up">
          <div className="flex items-center justify-between mb-3">
            <p className="font-poppins font-semibold text-white">Notifications</p>
            <button type="button" onClick={() => setUnread(0)} className="font-poppins text-[13px] text-secondary hover:underline">
              Mark all read
            </button>
          </div>
          <ul className="flex flex-col gap-1">
            {NOTIFICATIONS.map((n, i) => (
              <li key={n.id} className={`flex gap-3 rounded-[12px] p-3 ${i < unread ? "bg-white/5" : ""}`}>
                <span className="w-9 h-9 rounded-full bg-dimBlue text-secondary flex items-center justify-center">
                  <Icon name={n.icon} size={16} />
                </span>
                <span className="flex-1">
                  <span className="block font-poppins text-[14px] text-white">{n.text}</span>
                  <span className="block font-poppins text-[12px] text-dimWhite">{n.time}</span>
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
  `flex items-center gap-3 rounded-[14px] px-4 py-3 font-poppins text-[15px] transition ${isActive ? "bg-blue-gradient text-primary font-medium shadow-[0_10px_30px_-12px_rgba(92,225,230,0.6)]" : "text-dimWhite hover:text-white hover:bg-white/5"}`;

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

  const onSend = useCallback(({ recipient, amount, note }) => {
    setBalance((b) => b - amount);
    setTransactions((list) => [
      { id: `t-${Date.now()}`, name: recipient.name, category: "transfer", amount: -amount, date: localISODate(), note, fresh: true },
      ...list,
    ]);
    toast({ title: "Transfer complete", description: `${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)} sent to ${recipient.name}.` });
  }, [toast]);

  const ctx = useMemo(
    () => ({ balance, transactions, hidden, setHidden, openSend: () => setSendOpen(true), setBalance, setTransactions }),
    [balance, transactions, hidden]
  );

  const logout = () => {
    toast({ title: "Signed out", description: "See you soon! (Demo session ended.)", variant: "info" });
    navigate("/login");
  };

  const title = NAV.find((n) => (n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)))?.label ?? "Dashboard";

  return (
    <div className="min-h-screen bg-primary flex overflow-x-clip">
      <aside className="hidden md:flex flex-col w-[260px] shrink-0 h-screen sticky top-0 border-r border-white/5 bg-[#03060f] p-6">
        <Link to="/" aria-label="HooBank home">
          <img src={logo} alt="HooBank" className="w-[124px] h-[32px]" />
        </Link>
        <nav aria-label="Dashboard" className="flex flex-col gap-1 mt-10">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={sideLink}>
              <Icon name={n.icon} size={18} /> {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <div className="rounded-[20px] bg-black-gradient p-5 border border-white/5 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-secondary/20 blur-2xl" aria-hidden="true" />
            <p className="font-poppins font-semibold text-white">Go Premium</p>
            <p className="font-poppins text-[13px] text-dimWhite mt-1">5% cash back on travel & lounge access.</p>
            <Link to="/pricing" className="inline-block mt-3 font-poppins text-[13px] text-secondary hover:underline">
              Compare plans →
            </Link>
          </div>
          <Link to="/" className="flex items-center gap-3 px-4 py-2 font-poppins text-[14px] text-dimWhite hover:text-white">
            <Icon name="arrowLeft" size={16} /> Back to website
          </Link>
          <button type="button" onClick={logout} className="flex items-center gap-3 px-4 py-2 font-poppins text-[14px] text-dimWhite hover:text-white">
            <Icon name="logOut" size={16} /> Log out
          </button>
        </div>
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-40 bg-primary/80 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center gap-4 px-4 sm:px-8 py-4">
            <Link to="/" aria-label="HooBank home" className="md:hidden shrink-0">
              <img src={logo} alt="HooBank" className="w-[100px] h-[26px]" />
            </Link>
            <div className="hidden md:block">
              <p className="font-poppins text-[13px] text-dimWhite">Good to see you, Alex 👋</p>
              <h1 className="font-poppins font-semibold text-[22px] text-white">{title}</h1>
            </div>
            <form
              role="search"
              className="hidden sm:block flex-1 max-w-[360px] ml-auto relative"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/dashboard/transactions${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ""}`);
              }}
            >
              <label htmlFor="dash-search" className="sr-only">
                Search transactions
              </label>
              <Icon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dimWhite" />
              <input id="dash-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions…" className={`${styles.input} pl-11 py-2.5 rounded-full`} />
            </form>
            <div className="flex items-center gap-3 ml-auto sm:ml-0">
              <button type="button" onClick={() => setSendOpen(true)} className="hidden xs:flex items-center gap-2 rounded-full bg-blue-gradient text-primary font-poppins font-medium text-[14px] px-4 py-2.5 btn-glow">
                <Icon name="send" size={16} /> Send
              </button>
              <Notifications />
              <Link to="/dashboard/settings" aria-label="Profile settings">
                <img src={people01} alt="" className="w-11 h-11 rounded-full border-2 border-secondary/40" />
              </Link>
            </div>
          </div>
        </header>

        <main id="main" className="flex-1 px-4 sm:px-8 py-6 sm:py-8 pb-28 md:pb-10">
          <h1 className="md:hidden font-poppins font-semibold text-[24px] text-white mb-5">{title}</h1>
          <Suspense fallback={<PageLoader />}>
            <Outlet context={ctx} />
          </Suspense>
        </main>
      </div>

      <nav aria-label="Dashboard" className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#03060f]/95 backdrop-blur-xl border-t border-white/10 grid grid-cols-5 px-2 pb-[env(safe-area-inset-bottom)]">
        {NAV.slice(0, 2).map((n) => (
          <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `flex flex-col items-center gap-1 py-3 font-poppins text-[11px] ${isActive ? "text-secondary" : "text-dimWhite"}`}>
            <Icon name={n.icon} size={20} /> {n.label}
          </NavLink>
        ))}
        <button type="button" onClick={() => setSendOpen(true)} className="flex flex-col items-center gap-1 py-2 font-poppins text-[11px] text-white" aria-label="Send money">
          <span className="w-11 h-11 -mt-6 rounded-full bg-blue-gradient text-primary flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(92,225,230,0.7)]">
            <Icon name="send" size={20} />
          </span>
          Send
        </button>
        {NAV.slice(2).map((n) => (
          <NavLink key={n.to} to={n.to} className={({ isActive }) => `flex flex-col items-center gap-1 py-3 font-poppins text-[11px] ${isActive ? "text-secondary" : "text-dimWhite"}`}>
            <Icon name={n.icon} size={20} /> {n.label}
          </NavLink>
        ))}
      </nav>

      <SendMoneyModal open={sendOpen} onClose={() => setSendOpen(false)} balance={balance} onSend={onSend} />
    </div>
  );
};

export default DashboardLayout;
