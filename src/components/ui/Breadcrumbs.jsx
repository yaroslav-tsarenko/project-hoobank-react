import { Link } from "react-router-dom";
import Icon from "./Icon";

const Breadcrumbs = ({ items }) => (
  <nav aria-label="Breadcrumb" className="mb-6">
    <ol className="flex flex-wrap items-center gap-2 font-poppins text-[14px] text-dimWhite">
      {items.map((item, i) => (
        <li key={item.label} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="hover:text-secondary transition">
              {item.label}
            </Link>
          ) : (
            <span aria-current="page" className="text-white">
              {item.label}
            </span>
          )}
          {i < items.length - 1 && <Icon name="chevronRight" size={14} />}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
