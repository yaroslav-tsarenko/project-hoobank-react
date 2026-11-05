import { useState } from "react";
import { CTA } from "../components";
import Button from "../components/Button";
import Accordion from "../components/ui/Accordion";
import AnimatedNumber from "../components/ui/AnimatedNumber";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import Segmented from "../components/ui/Segmented";
import SectionHeading from "../components/ui/SectionHeading";
import { comparison, plans, pricingFaq } from "../constants/pricing";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const Cell = ({ value }) =>
  typeof value === "boolean" ? (
    value ? (
      <Icon name="check" size={18} className="text-secondary mx-auto" label="Included" />
    ) : (
      <span className="text-white/30" aria-label="Not included">—</span>
    )
  ) : (
    <span className="text-white">{value}</span>
  );

const Pricing = () => {
  usePageMeta("Pricing", "Simple, transparent pricing. Start free with HooBank Starter or upgrade to Plus or Premium for more rewards and perks.");
  const [billing, setBilling] = useState("annual");

  return (
    <>
      <PageHero
        eyebrow="30-day free trial on every paid plan"
        title="Simple pricing,"
        highlight="no surprises."
        description="Start free and upgrade when you’re ready. Switch or cancel any time."
      >
        <Segmented
          label="Billing period"
          value={billing}
          onChange={setBilling}
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "annual", label: "Annual · save 20%" },
          ]}
        />
      </PageHero>

      <Container className="pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((p, i) => {
            const price = billing === "annual" ? p.annual : p.monthly;
            return (
              <Reveal
                key={p.id}
                delay={i * 120}
                className={`relative rounded-[24px] p-8 flex flex-col lift ${p.popular ? "bg-black-gradient border-gradient md:-translate-y-4 box-shadow" : "glass"}`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-8 rounded-full bg-blue-gradient text-primary font-poppins font-semibold text-[12px] px-3 py-1">
                    Most popular
                  </span>
                )}
                <h2 className={styles.heading3}>{p.name}</h2>
                <p className="font-poppins text-dimWhite text-[15px] mt-2 min-h-[48px]">{p.description}</p>
                <p className="mt-6 flex items-end gap-2">
                  <span className="font-poppins font-semibold text-[52px] leading-none text-white">
                    <AnimatedNumber value={price} format={(v) => `$${Math.round(v)}`} />
                  </span>
                  <span className="font-poppins text-dimWhite text-[15px] mb-1">/ month</span>
                </p>
                <p className="font-poppins text-[13px] text-dimWhite mt-2 h-5">
                  {price > 0 && billing === "annual" ? `Billed $${price * 12} yearly` : price > 0 ? "Billed monthly" : "Free forever"}
                </p>
                <ul className="flex flex-col gap-3 mt-8 mb-10">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 font-poppins text-[15px] text-dimWhite">
                      <Icon name="check" size={18} className="text-secondary mt-[2px]" /> {f}
                    </li>
                  ))}
                </ul>
                <Button to={`/signup?plan=${p.id}&billing=${billing}`} variant={p.popular ? "primary" : "outline"} className="mt-auto">
                  {p.cta}
                </Button>
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Container id="compare" className="py-16">
        <SectionHeading eyebrow="Compare" title="Every detail, side by side" className="mb-10" />
        <Reveal className="overflow-x-auto rounded-[20px] border border-white/10">
          <table className="w-full min-w-[560px] font-poppins text-[15px]">
            <caption className="sr-only">Plan comparison</caption>
            <thead>
              <tr className="bg-white/[0.03]">
                <th scope="col" className="text-left px-6 py-4 text-dimWhite font-medium">Feature</th>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className="px-6 py-4 text-white font-semibold text-center">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <th scope="row" className="text-left px-6 py-4 text-dimWhite font-normal">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={plans[i].id} className="px-6 py-4 text-center"><Cell value={v} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12">
          <SectionHeading eyebrow="FAQ" title="Pricing questions">
            <p className={`${styles.paragraph} mt-5`}>
              Running a company? See our <Button to="/business" variant="ghost" size="sm" className="ml-1">business plans</Button>
            </p>
          </SectionHeading>
          <Accordion items={pricingFaq} defaultOpen="p1" />
        </div>
        <CTA title="Start free today." text="No credit check, no minimum balance, no paperwork." />
      </Container>
    </>
  );
};

export default Pricing;
