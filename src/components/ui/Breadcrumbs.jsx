import { Link } from "react-router-dom";

const Breadcrumbs = ({ items, className = "" }) => (
  <nav aria-label="Breadcrumb" className={`mb-8 ${className}`}>
    <ol className="flex flex-wrap items-center gap-2 font-sans text-[14px] text-muted">
      {items.map((item, i) => (
        <li key={item.label} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="hover:text-ink link">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-ink">
              {item.label}
            </span>
          )}
          {i < items.length - 1 && <span aria-hidden="true" className="text-line">/</span>}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
