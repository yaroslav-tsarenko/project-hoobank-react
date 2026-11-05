import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const SUGGESTIONS = [
  { to: "/features", label: "Features", icon: "sparkles" },
  { to: "/cards", label: "Cards", icon: "card" },
  { to: "/pricing", label: "Pricing", icon: "percent" },
  { to: "/help", label: "Help Center", icon: "info" },
];

const NotFound = ({ compact = false }) => {
  usePageMeta("Page not found", "The page you’re looking for doesn’t exist or has moved.");
  const { pathname } = useLocation();

  return (
    <Container as="section" className={`relative ${compact ? "py-10" : "py-16 sm:py-24"}`}>
      <div className="absolute w-[40%] h-[50%] left-1/4 top-0 blue__gradient" aria-hidden="true" />
      <div className="relative flex flex-col items-center text-center" data-not-found="">
        <p className="font-poppins font-semibold text-[110px] xs:text-[160px] leading-none text-gradient select-none" aria-hidden="true">
          404
        </p>
        <h1 className={`${styles.heading2} mt-4`}>This page took a day off.</h1>
        <p className={`${styles.paragraph} mt-4 max-w-[520px]`}>
          We couldn’t find <code className="text-white bg-white/5 rounded px-2 py-0.5 break-all">{pathname}</code>. It may have moved, or the link might be
          mistyped.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Button to={compact ? "/dashboard" : "/"}>
            <Icon name="home" size={18} /> {compact ? "Back to dashboard" : "Back to home"}
          </Button>
          <Button to="/contact" variant="outline">
            Report a broken link
          </Button>
        </div>
        {!compact && (
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 w-full max-w-[720px]">
            {SUGGESTIONS.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="feature-card rounded-[20px] border border-white/5 p-5 flex flex-col items-center gap-3 font-poppins text-white">
                  <Icon name={s.icon} size={24} className="text-secondary" />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default NotFound;
