import { useEffect, useState } from "react";
import { CTA } from "../components";
import Button from "../components/Button";
import { DonutChart } from "../components/ui/charts";
import Container from "../components/ui/Container";
import CreditCard from "../components/ui/CreditCard";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import SectionHeading from "../components/ui/SectionHeading";
import CurrencyConverter from "../components/widgets/CurrencyConverter";
import FinanceCalculator from "../components/widgets/FinanceCalculator";
import { bill } from "../assets";
import { storeLinks } from "../constants";
import { savingsGoals } from "../constants/dashboard";
import usePageMeta from "../hooks/usePageMeta";

const STEPS = [
  { id: "open", icon: "smartphone", title: "Open an account in minutes", text: "Verify your ID with a selfie and you're in. No branch visits, no paperwork." },
  { id: "card", icon: "card", title: "Get your card instantly", text: "A virtual card is ready the moment you sign up — your designed physical card ships in days." },
  { id: "track", icon: "pieChart", title: "Track every dollar", text: "Spending is categorised automatically so you always know where your money goes." },
  { id: "grow", icon: "trendingUp", title: "Grow your savings", text: "Set goals, round up purchases and earn 4.2% APY on every savings pot." },
];

const Screen = ({ step }) => {
  switch (step) {
    case "open":
      return (
        <div className="flex flex-col gap-3 p-4">
          <p className="font-poppins font-semibold text-white text-[15px]">Create account</p>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full w-2/3 bg-blue-gradient" /></div>
          {["Full name", "Email", "Phone"].map((f) => (
            <div key={f} className="rounded-[10px] bg-white/5 border border-white/10 px-3 py-2.5 font-poppins text-[12px] text-dimWhite">{f}</div>
          ))}
          <div className="rounded-[10px] bg-blue-gradient text-primary text-center py-2.5 font-poppins font-medium text-[13px] mt-2">Continue</div>
          <p className="font-poppins text-[11px] text-dimWhite text-center">Step 2 of 3 · ID check</p>
        </div>
      );
    case "card":
      return (
        <div className="p-4 flex flex-col gap-4">
          <p className="font-poppins font-semibold text-white text-[15px]">Your cards</p>
          <CreditCard design={{ color: "cyan", finish: "glossy", name: "Alex Morgan", tier: "Plus" }} tilt={false} />
          <div className="grid grid-cols-3 gap-2">
            {["Freeze", "Details", "Limits"].map((a) => (
              <div key={a} className="rounded-[10px] bg-white/5 py-2 text-center font-poppins text-[11px] text-dimWhite">{a}</div>
            ))}
          </div>
        </div>
      );
    case "track":
      return (
        <div className="p-4 flex flex-col items-center gap-3">
          <p className="font-poppins font-semibold text-white text-[15px] self-start">November spending</p>
          <DonutChart
            size={170}
            thickness={18}
            centerTitle="Spent"
            centerValue="$1,980"
            data={[
              { label: "Shopping", value: 690, color: "#5ce1e6" },
              { label: "Food", value: 420, color: "#fc67fa" },
              { label: "Travel", value: 520, color: "#f6c26b" },
              { label: "Bills", value: 350, color: "#7c8cff" },
            ]}
          />
        </div>
      );
    default:
      return (
        <div className="p-4 flex flex-col gap-4">
          <p className="font-poppins font-semibold text-white text-[15px]">Savings goals</p>
          {savingsGoals.map((g) => (
            <div key={g.id}>
              <div className="flex justify-between font-poppins text-[12px] mb-1.5">
                <span className="text-white">{g.name}</span>
                <span className="text-dimWhite">{Math.round((g.saved / g.target) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(g.saved / g.target) * 100}%`, background: g.color }} />
              </div>
            </div>
          ))}
          <div className="rounded-[12px] bg-white/5 p-3 font-poppins text-[12px] text-dimWhite">
            <span className="text-gradient font-semibold">+$34.20</span> interest earned this month
          </div>
        </div>
      );
  }
};

const ProductTour = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => setActive((a) => (a + 1) % STEPS.length), 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} onFocus={() => setPaused(true)}>
      <ol className="flex flex-col gap-3" aria-label="Product tour steps">
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={on ? "step" : undefined}
                className={`w-full text-left rounded-[20px] p-5 flex gap-4 transition border ${on ? "bg-black-gradient border-white/10 box-shadow" : "border-transparent hover:bg-white/[0.03]"}`}
              >
                <span className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center transition ${on ? "bg-blue-gradient text-primary" : "bg-dimBlue text-secondary"}`}>
                  <Icon name={s.icon} size={22} />
                </span>
                <span className="flex-1">
                  <span className="block font-poppins font-semibold text-white text-[18px]">{s.title}</span>
                  <span className={`block font-poppins text-dimWhite text-[15px] leading-[24px] transition-all ${on ? "mt-1 opacity-100" : "opacity-70"}`}>{s.text}</span>
                  {on && (
                    <span className="block h-1 rounded-full bg-white/10 mt-4 overflow-hidden">
                      <span key={`${active}-${paused}`} className={`block h-full bg-blue-gradient ${paused ? "w-full" : "tour-progress"}`} />
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="relative flex justify-center">
        <div className="absolute w-[70%] h-[70%] blue__gradient" aria-hidden="true" />
        <div className="absolute w-[40%] h-[40%] top-0 right-10 pink__gradient" aria-hidden="true" />
        <div className="relative w-[290px] h-[580px] rounded-[44px] bg-[#05070f] border border-white/10 p-3 shadow-[0_40px_120px_-30px_rgba(51,187,207,0.45)]">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 rounded-b-[16px] bg-black z-10" aria-hidden="true" />
          <div className="w-full h-full rounded-[34px] bg-primary overflow-hidden flex flex-col">
            <div className="flex justify-between px-6 pt-3 pb-2 font-poppins text-[11px] text-white">
              <span>9:41</span>
              <span>HooBank</span>
            </div>
            <div key={STEPS[active].id} className="flex-1 animate-fade-up" aria-live="polite">
              <Screen step={STEPS[active].id} />
            </div>
            <div className="grid grid-cols-4 border-t border-white/10 py-3">
              {["home", "card", "pieChart", "user"].map((ic, i) => (
                <span key={ic} className={`flex justify-center ${i === active ? "text-secondary" : "text-white/40"}`}>
                  <Icon name={ic} size={18} />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Product = () => {
  usePageMeta("Product tour", "Take a tour of the HooBank app: open an account in minutes, get your card instantly, track spending and grow your savings.");
  return (
    <>
      <PageHero
        eyebrow="Product tour"
        title="One app."
        highlight="Your whole financial life."
        description="See how HooBank works, from sign-up to savings goals. Everything below is interactive — go ahead and play."
      >
        <Button to="#tour">Start the tour</Button>
        <Button to="/dashboard" variant="outline">
          Open live demo
        </Button>
      </PageHero>

      <Container id="tour" className="py-12">
        <SectionHeading eyebrow="How it works" title="From zero to banking in four steps" className="mb-12" />
        <ProductTour />
      </Container>

      <Container id="calculator" className="py-16">
        <SectionHeading eyebrow="Calculators" title="Plan ahead with real numbers" description="Estimate savings growth or see how much a 0% balance transfer saves you." className="mb-10" />
        <Reveal>
          <FinanceCalculator />
        </Reveal>
      </Container>

      <Container id="converter" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <SectionHeading
            eyebrow="Multi-currency"
            title="Spend like a local, anywhere."
            description="Hold 30+ currencies and convert instantly at the real mid-market rate. No markups, no surprises."
          >
            <div className="flex flex-wrap gap-4 mt-8">
              <Button to="/features/global-transfers" variant="outline">
                Global transfers
              </Button>
            </div>
          </SectionHeading>
          <Reveal delay={100}>
            <CurrencyConverter />
          </Reveal>
        </div>
      </Container>

      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <img src={bill} alt="HooBank app screens: recent transactions, checkout and payment confirmation" loading="lazy" width="900" height="834" className="w-full h-auto" />
          </Reveal>
          <SectionHeading eyebrow="Mobile app" title="Banking that fits in your pocket" description="Available on iOS and Android with Face ID, widgets and instant notifications.">
            <div className="flex flex-wrap gap-4 mt-8">
              <Button href={storeLinks.apple} variant="outline" aria-label="Download on the App Store (opens in a new tab)">
                <Icon name="download" size={18} /> App Store
              </Button>
              <Button href={storeLinks.google} variant="outline" aria-label="Get it on Google Play (opens in a new tab)">
                <Icon name="download" size={18} /> Google Play
              </Button>
            </div>
          </SectionHeading>
        </div>
        <CTA />
      </Container>
    </>
  );
};

export default Product;
