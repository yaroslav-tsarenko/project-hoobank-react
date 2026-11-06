import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { mobileExtraLinks, navLinks } from "../constants";
import useScrolled from "../hooks/useScrolled";
import styles from "../style";
import Button from "./Button";
import Icon from "./ui/Icon";
import Logo from "./ui/Logo";

const desktopLinkClass = ({ isActive }) =>
  `font-sans text-[15px] py-1 border-b transition-colors ${isActive ? "text-ink border-ink" : "text-muted border-transparent hover:text-ink"}`;

const Navbar = () => {
  const location = useLocation();
  // The menu is "open" only for the location it was opened on, so any navigation closes it.
  const [openedOn, setOpenedOn] = useState(null);
  const open = openedOn === location.key;
  const scrolled = useScrolled();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpenedOn(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const toggle = () => setOpenedOn(open ? null : location.key);

  return (
    <header className={`sticky top-0 z-[80] w-full transition-[background,border-color] duration-300 border-b ${scrolled || open ? "bg-ivory/95 backdrop-blur-sm border-line" : "bg-ivory border-transparent"}`}>
      <nav aria-label="Main" className={`${styles.container} flex h-[72px] items-center justify-between gap-6`}>
        <Link to="/" aria-label="Northvault home" className="shrink-0">
          <Logo size={28} />
        </Link>

        <ul className="list-none md:flex hidden items-center gap-7 lg:gap-9">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <NavLink to={nav.to} className={desktopLinkClass}>
                {nav.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="md:flex hidden items-center gap-5 shrink-0">
          <NavLink to="/login" className={desktopLinkClass}>
            Log in
          </NavLink>
          <Button to="/signup" size="sm">
            Open an account
          </Button>
        </div>

        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden w-11 h-11 -mr-2 flex items-center justify-center rounded-full text-ink hover:bg-sand"
        >
          <Icon name={open ? "x" : "menu"} size={24} />
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-ivory border-t border-line overflow-y-auto animate-fade-up">
          <div className={`${styles.container} py-6`}>
            <ul className="list-none border-t border-line">
              {navLinks.map((nav) => (
                <li key={nav.to} className="border-b border-line">
                  <NavLink to={nav.to} className={({ isActive }) => `flex items-center justify-between py-4 font-serif text-[30px] leading-none ${isActive ? "text-forest italic" : "text-ink"}`}>
                    {nav.title}
                    <Icon name="arrowRight" size={20} className="text-muted" />
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className="list-none grid grid-cols-2 gap-x-6 gap-y-3 mt-6">
              {mobileExtraLinks.map((nav) => (
                <li key={nav.to}>
                  <NavLink to={nav.to} className={({ isActive }) => `font-sans text-[16px] ${isActive ? "text-ink font-medium" : "text-muted"}`}>
                    {nav.title}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3 mt-8">
              <Button to="/login" variant="outline">
                Log in
              </Button>
              <Button to="/signup">Open an account</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
