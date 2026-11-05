import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { close, logo, menu } from "../assets";
import { mobileExtraLinks, navLinks } from "../constants";
import useScrolled from "../hooks/useScrolled";
import styles from "../style";
import Button from "./Button";

const desktopLinkClass = ({ isActive }) =>
  `font-poppins font-normal text-[16px] transition-colors link-underline pb-1 ${isActive ? "text-white is-active" : "text-dimWhite hover:text-white"}`;

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
    <header
      className={`sticky top-0 z-[80] w-full transition-[background,box-shadow,backdrop-filter] duration-300 ${scrolled || open ? "bg-primary/80 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]" : "bg-transparent"}`}
    >
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <nav aria-label="Main" className={`${styles.boxWidth} flex py-5 justify-between items-center`}>
          <Link to="/" aria-label="HooBank home" className="shrink-0">
            <img src={logo} alt="HooBank" className="w-[124px] h-[32px]" />
          </Link>

          <ul className="list-none md:flex hidden justify-center items-center flex-1 gap-8 lg:gap-10">
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
              Open account
            </Button>
          </div>

          <div className="md:hidden flex flex-1 justify-end items-center">
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="w-11 h-11 -mr-2 flex items-center justify-center rounded-full hover:bg-white/5"
            >
              <img src={open ? close : menu} alt="" className="w-[28px] h-[28px] object-contain" />
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpenedOn(null)}
            className="md:hidden fixed inset-0 top-[80px] bg-primary/60 backdrop-blur-sm cursor-default"
          />
          <div
            id="mobile-menu"
            className="md:hidden absolute top-[76px] right-0 left-0 mx-4 p-6 bg-black-gradient rounded-xl sidebar shadow-2xl max-h-[calc(100vh-96px)] overflow-y-auto"
          >
            <ul className="list-none grid grid-cols-2 gap-x-6 gap-y-4">
              {[...navLinks, ...mobileExtraLinks].map((nav) => (
                <li key={nav.to}>
                  <NavLink
                    to={nav.to}
                    className={({ isActive }) =>
                      `font-poppins font-medium text-[16px] block py-1 ${isActive ? "text-white" : "text-dimWhite"}`
                    }
                  >
                    {({ isActive }) => (
                      <span className="flex items-center gap-2">
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />}
                        {nav.title}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
              <Button to="/login" variant="outline" size="sm">
                Log in
              </Button>
              <Button to="/signup" size="sm">
                Open account
              </Button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
