import { Link } from "react-router-dom";
import { footerLinks } from "../constants";
import styles from "../style";
import Logo from "./ui/Logo";
import NewsletterForm from "./widgets/NewsletterForm";

const YEAR = new Date().getFullYear();

const Footer = () => (
  <footer className="bg-forest-900 text-ivory">
    <div className={`${styles.container} pt-16 sm:pt-20 pb-10`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5 flex flex-col">
          <Link to="/" aria-label="Northvault home" className="w-fit">
            <Logo tone="ivory" size={30} />
          </Link>
          <p className="font-serif text-[28px] leading-[1.15] text-ivory/90 mt-8 max-w-[380px]">Business banking, kept in good order.</p>
          <NewsletterForm tone="dark" className="mt-10 max-w-[380px]" />
        </div>

        <div className="md:col-span-7 grid grid-cols-2 xs:grid-cols-3 gap-8">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="font-sans font-medium uppercase tracking-[0.14em] text-[12px] text-brass-light">{group.title}</h2>
              <ul className="list-none mt-5 flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link to={link.to} className="font-sans text-[15px] text-ivory/80 hover:text-ivory transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 pt-6 border-t border-ivory/15 flex flex-col md:flex-row gap-4 md:items-center md:justify-between font-sans text-[13px] leading-[1.6] text-ivory/70">
        <p>
          © {YEAR} Northvault. A product concept designed and built by Yaroslav Tsarenko.
        </p>
        <p className="max-w-[520px] md:text-right">
          Not a bank and not regulated. No accounts are opened and no money moves; every figure on this site is illustrative.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
