import { DialMark } from "./ui/Logo";
import Button from "./Button";
import Reveal from "./ui/Reveal";

/** Closing call to action on a forest panel. */
const CTA = ({
  title = "Open a workspace in about ten minutes.",
  text = "Start on Solo for free. Move to Studio or Team when the work does.",
  primary = { to: "/signup", label: "Open an account" },
  secondary = { to: "/dashboard", label: "Explore the demo" },
  className = "",
}) => (
  <Reveal as="section" className={`relative overflow-hidden rounded-card bg-forest text-ivory px-6 py-12 sm:px-12 sm:py-16 my-16 sm:my-24 ${className}`}>
    <DialMark size={420} className="absolute right-[-90px] top-1/2 -translate-y-1/2 text-ivory opacity-[0.07] pointer-events-none" />
    <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:items-end">
      <div className="md:col-span-8">
        <h2 className="font-serif text-[38px] leading-[1.05] sm:text-[52px] text-ivory max-w-[680px]">{title}</h2>
        <p className="font-sans text-[17px] leading-[1.6] text-ivory/80 mt-5 max-w-[520px]">{text}</p>
      </div>
      <div className="md:col-span-4 flex flex-wrap gap-3 md:justify-end">
        <Button to={primary.to} variant="light">
          {primary.label}
        </Button>
        {secondary && (
          <Button to={secondary.to} variant="outlineLight">
            {secondary.label}
          </Button>
        )}
      </div>
    </div>
  </Reveal>
);

export default CTA;
