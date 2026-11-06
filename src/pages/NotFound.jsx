import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import usePageMeta from "../hooks/usePageMeta";

const SUGGESTIONS = [
  { to: "/features", label: "Platform" },
  { to: "/cards", label: "Cards" },
  { to: "/pricing", label: "Pricing" },
  { to: "/help", label: "Help centre" },
];

const NotFound = ({ compact = false }) => {
  usePageMeta("Page not found", "The page you are looking for does not exist or has moved.");
  const { pathname } = useLocation();

  return (
    <Container as="section" className={compact ? "py-10" : "py-16 sm:py-24"}>
      <div className="max-w-[760px]" data-not-found="">
        <p className="font-sans text-[12px] uppercase tracking-[0.14em] text-muted">Error 404</p>
        <p className="font-serif text-[120px] xs:text-[180px] leading-[0.9] text-forest mt-4 select-none num" aria-hidden="true">
          404
        </p>
        <h1 className="font-serif text-[40px] sm:text-[56px] leading-[1.05] text-ink mt-6">This page is not in the ledger.</h1>
        <p className="font-sans text-[18px] leading-[1.6] text-muted mt-5">
          Nothing lives at <code className="font-mono text-[15px] text-ink bg-sand px-1.5 py-0.5 rounded break-all">{pathname}</code>. It may have moved, or the link may be mistyped.
        </p>
        <div className="flex flex-wrap gap-3 mt-10">
          <Button to={compact ? "/dashboard" : "/"}>{compact ? "Back to the overview" : "Back to the home page"}</Button>
          <Button to="/contact" variant="outline">
            Report a broken link
          </Button>
        </div>
        {!compact && (
          <ul className="mt-14 border-t border-line">
            {SUGGESTIONS.map((s) => (
              <li key={s.to} className="border-b border-line">
                <Link to={s.to} className="group flex items-center justify-between py-4 font-serif text-[28px] text-ink hover:text-forest">
                  {s.label}
                  <Icon name="arrowRight" size={20} className="text-muted group-hover:translate-x-1 transition" />
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
