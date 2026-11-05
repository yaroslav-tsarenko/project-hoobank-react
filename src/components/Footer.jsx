import { Link } from "react-router-dom";
import styles from "../style";
import { logo } from "../assets";
import { footerLinks, socialMedia } from "../constants";
import NewsletterForm from "./widgets/NewsletterForm";

const YEAR = new Date().getFullYear();

const Footer = () => (
  <footer className={`${styles.flexCenter} ${styles.paddingY} flex-col`}>
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full gap-10`}>
      <div className="flex-[1] flex flex-col justify-start">
        <Link to="/" aria-label="HooBank home" className="w-fit">
          <img src={logo} alt="HooBank" loading="lazy" className="w-[266px] max-w-full h-[72.14px] object-contain object-left" />
        </Link>
        <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
          A new way to make the payments easy, reliable and secure.
        </p>
        <NewsletterForm className="mt-8 max-w-[360px]" />
      </div>

      <div className="flex-[1.5] w-full grid grid-cols-2 ss:grid-cols-3 gap-8">
        {footerLinks.map((footerlink) => (
          <div key={footerlink.title} className="flex flex-col">
            <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-white">{footerlink.title}</h4>
            <ul className="list-none mt-4 flex flex-col gap-4">
              {footerlink.links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="font-poppins font-normal text-[16px] leading-[24px] text-dimWhite hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col gap-6 pt-6 border-t-[1px] border-t-[#3F3E45]">
      <p className="font-poppins font-normal text-center text-[16px] sm:text-[18px] leading-[27px] text-white">
        Copyright Ⓒ {YEAR} HooBank. All Rights Reserved.
      </p>

      <ul className="flex flex-row gap-6 list-none">
        {socialMedia.map((social) => (
          <li key={social.id}>
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`HooBank on ${social.name} (opens in a new tab)`}
              className="block opacity-80 hover:opacity-100 hover:-translate-y-0.5 transition"
            >
              <img src={social.icon} alt="" loading="lazy" className="w-[21px] h-[21px] object-contain" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

export default Footer;
