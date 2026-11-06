import { useState } from "react";
import Button from "../components/Button";
import CTA from "../components/CTA";
import Accordion from "../components/ui/Accordion";
import AnimatedNumber from "../components/ui/AnimatedNumber";
import Container from "../components/ui/Container";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import Segmented from "../components/ui/Segmented";
import FeeEstimator from "../components/widgets/FeeEstimator";
import { comparison, plans, pricingFaq } from "../constants/pricing";
import usePageMeta from "../hooks/usePageMeta";

const Cell = ({ value }) =>
  typeof value === "boolean" ? (
    value ? (
      <Icon name="check" size={18} className="text-forest mx-auto" label="Included" />
    ) : (
      <span className="text-faint" aria-label="Not included">
        —
      </span>
    )
  ) : (
    <span className="text-ink num">{value}</span>
  );

const Pricing = () => {
  usePageMeta("Pricing", "Northvault pricing: Solo is free, Studio is $12 a month and Team is $29 a month. Every fee on one page.");
  const [billing, setBilling] = useState("annual");

  return (
    <>
      <PageHero eyebrow="Pricing" title="Three plans." highlight="One page of fees." description="Start free and move up when the work does. Switch or cancel at any time; nothing is hidden in the exchange rate.">
        <Segmented
          label="Billing period"
          value={billing}
          onChange={setBilling}
          options={[
            { value: "monthly", label: "Monthly" },
            { value: "annual", label: "Yearly, save about 17%" },
          ]}
        />
      </PageHero>

      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((p, i) => {
            const price = billing === "annual" ? p.annual : p.monthly;
            return (
              <Reveal key={p.id} delay={i * 100} className={`relative rounded-card p-7 sm:p-8 flex flex-col border ${p.popular ? "bg-forest text-ivory border-forest" : "bg-paper border-line"}`}>
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className={`font-serif text-[36px] leading-none ${p.popular ? "text-ivory" : "text-ink"}`}>{p.name}</h2>
                  {p.popular && <span className="font-sans text-[12px] uppercase tracking-[0.12em] text-brass-light">Most chosen</span>}
                </div>
                <p className={`font-sans text-[15px] leading-[1.55] mt-3 min-h-[48px] ${p.popular ? "text-ivory/80" : "text-muted"}`}>{p.description}</p>
                <p className="mt-8 flex items-end gap-2">
                  <span className={`font-serif text-[72px] leading-[0.9] ${p.popular ? "text-ivory" : "text-ink"}`}>
                    <AnimatedNumber value={price} format={(v) => `$${Math.round(v)}`} />
                  </span>
                  <span className={`font-sans text-[14px] mb-1 ${p.popular ? "text-ivory/75" : "text-muted"}`}>per month</span>
                </p>
                <p className={`font-sans text-[13px] mt-2 h-5 num ${p.popular ? "text-ivory/75" : "text-muted"}`}>
                  {price > 0 && billing === "annual" ? `$${price * 12} billed yearly` : price > 0 ? "Billed monthly" : "Free, with no time limit"}
                </p>
                <ul className={`mt-8 mb-10 border-t ${p.popular ? "border-ivory/20" : "border-line"}`}>
                  {p.features.map((f) => (
                    <li key={f} className={`flex gap-3 py-3 border-b font-sans text-[15px] ${p.popular ? "border-ivory/20 text-ivory" : "border-line text-ink"}`}>
                      <Icon name="check" size={18} className={`mt-0.5 ${p.popular ? "text-brass-light" : "text-forest"}`} /> {f}
                    </li>
                  ))}
                </ul>
                <Button to={`/signup?plan=${p.id}&billing=${billing}`} variant={p.popular ? "light" : "outline"} className="mt-auto">
                  {p.cta}
                </Button>
              </Reveal>
            );
          })}
        </div>
        <p className="font-sans text-[13px] text-faint mt-6">Prices are illustrative for this concept and exclude any applicable sales tax or VAT.</p>
      </Container>

      <Container id="compare" className="py-16 sm:py-20 border-t border-line">
        <SectionHeading index="01" eyebrow="Compare" title="Every fee, side by side." className="mb-12" />
        <Reveal className="overflow-x-auto border-y border-line">
          <table className="w-full min-w-[640px] font-sans text-[15px]">
            <caption className="sr-only">Plan comparison</caption>
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="text-left py-4 pr-6 text-muted font-normal">
                  &nbsp;
                </th>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className="py-4 px-4 text-center font-serif font-normal text-[26px] text-ink">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-b-0">
                  <th scope="row" className="text-left py-4 pr-6 text-muted font-normal">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={plans[i].id} className={`py-4 px-4 text-center ${plans[i].popular ? "bg-forest-50" : ""}`}>
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>

      <Container className="py-16 sm:py-20 border-t border-line">
        <SectionHeading index="02" eyebrow="Estimate" title="Put in your own numbers." description="A year of conversions and transfers, priced on each plan and against a typical high-street business account." className="mb-12" />
        <Reveal>
          <FeeEstimator />
        </Reveal>
      </Container>

      <Container className="py-16 sm:py-20 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <SectionHeading className="md:col-span-5" index="03" eyebrow="Questions" title="About pricing." description="Running a studio with more than ten people? Talk to us about a custom setup.">
            <Button to="/business" variant="outline" size="sm" className="mt-8">
              Northvault for teams
            </Button>
          </SectionHeading>
          <div className="md:col-span-7">
            <Accordion items={pricingFaq} defaultOpen="p1" />
          </div>
        </div>
        <CTA title="Start on Solo today." text="No credit check, no minimum balance, no fee to leave." />
      </Container>
    </>
  );
};

export default Pricing;
