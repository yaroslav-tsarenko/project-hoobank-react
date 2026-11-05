import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/ui/Container";
import Field from "../components/ui/Field";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import { EMAIL_RE } from "../components/widgets/NewsletterForm";
import { useToast } from "../context/ToastContext";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";

const TOPICS = [
  { value: "support", label: "Account support" },
  { value: "sales", label: "Business & sales" },
  { value: "press", label: "Press" },
  { value: "careers", label: "Careers" },
  { value: "security", label: "Security report" },
];

const OFFICES = [
  { city: "Kyiv", address: "12 Khreshchatyk St, Kyiv 01001", x: 62, y: 34 },
  { city: "London", address: "1 Finsbury Ave, London EC2M", x: 47, y: 30 },
  { city: "New York", address: "88 Spring St, New York, NY", x: 26, y: 38 },
];

const CHANNELS = [
  { icon: "chat", title: "Live chat", text: "Tap the chat bubble — avg. reply in 3 min.", to: "/help" },
  { icon: "mail", title: "Email", text: "hello@hoobank.example", href: "mailto:hello@hoobank.example" },
  { icon: "phone", title: "Phone", text: "+1 (555) 010-2049 · 24/7", href: "tel:+15550102049" },
];

const ContactContent = ({ topic }) => {
  usePageMeta("Contact", "Get in touch with HooBank support, sales, press or security teams — we reply fast, 24/7.");
  const initialTopic = TOPICS.some((t) => t.value === topic) ? topic : "support";
  const toast = useToast();
  const [form, setForm] = useState({ name: "", email: "", topic: initialTopic, message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) next.message = "Your message should be at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      toast({ title: "Message sent", description: `Thanks, ${form.name.split(" ")[0]}! We’ll reply to ${form.email} shortly. (Demo — nothing was sent.)` });
      setForm({ name: "", email: "", topic: form.topic, message: "" });
    }, 900);
  };

  return (
    <>
      <PageHero eyebrow="We reply in minutes" title="Let’s" highlight="talk." description="Questions, feedback or partnership ideas — pick a channel or send us a message below." />

      <Container className="pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CHANNELS.map((c, i) => {
            const inner = (
              <>
                <span className="w-12 h-12 rounded-full bg-dimBlue text-secondary flex items-center justify-center">
                  <Icon name={c.icon} size={22} />
                </span>
                <span className="block font-poppins font-semibold text-white mt-4">{c.title}</span>
                <span className="block font-poppins text-dimWhite text-[14px] mt-1">{c.text}</span>
              </>
            );
            return (
              <Reveal key={c.title} delay={i * 100}>
                {c.to ? (
                  <Link to={c.to} className="block w-full h-full p-6 rounded-[20px] bg-white/5 feature-card">
                    {inner}
                  </Link>
                ) : (
                  <a href={c.href} className="block w-full h-full p-6 rounded-[20px] bg-white/5 feature-card">
                    {inner}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>

      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <form onSubmit={submit} noValidate className={`${styles.card} p-6 sm:p-10 flex flex-col gap-5`}>
            <h2 className={styles.heading3}>Send a message</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Name" value={form.name} onChange={set("name")} error={errors.name} autoComplete="name" />
              <Field label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} autoComplete="email" />
            </div>
            <Field as="select" label="Topic" value={form.topic} onChange={set("topic")}>
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </Field>
            <Field as="textarea" label="Message" value={form.message} onChange={set("message")} error={errors.message} hint={`${form.message.length}/1000`} maxLength={1000} />
            <Button type="submit" disabled={sending}>
              {sending ? (
                <>
                  <span className="spinner !w-5 !h-5 !border-2" /> Sending…
                </>
              ) : (
                <>
                  Send message <Icon name="send" size={18} />
                </>
              )}
            </Button>
          </form>

          <Reveal className={`${styles.card} p-6 sm:p-8`}>
            <h2 className={styles.heading3}>Our offices</h2>
            <div className="relative mt-6 aspect-[16/9] rounded-[16px] overflow-hidden bg-[#060a18] border border-white/5" role="img" aria-label="Map showing HooBank offices in New York, London and Kyiv">
              <div className="absolute inset-0 grid-bg" aria-hidden="true" />
              <svg viewBox="0 0 100 56" className="absolute inset-0 w-full h-full" aria-hidden="true">
                <path d="M26 38 Q36 20 47 30 T62 34" fill="none" stroke="url(#route)" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
                <defs>
                  <linearGradient id="route" x1="0" x2="1">
                    <stop offset="0%" stopColor="#5ce1e6" />
                    <stop offset="100%" stopColor="#fc67fa" />
                  </linearGradient>
                </defs>
              </svg>
              {OFFICES.map((o) => (
                <span key={o.city} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: `${o.x}%`, top: `${o.y * (100 / 56)}%` }}>
                  <span className="w-3 h-3 rounded-full bg-secondary pulse-dot" />
                  <span className="font-poppins text-[11px] text-white mt-1 bg-primary/70 rounded px-1.5">{o.city}</span>
                </span>
              ))}
            </div>
            <ul className="flex flex-col gap-4 mt-6">
              {OFFICES.map((o) => (
                <li key={o.city} className="flex gap-3">
                  <Icon name="mapPin" size={20} className="text-secondary mt-0.5" />
                  <span>
                    <span className="block font-poppins text-white font-medium">{o.city}</span>
                    <span className="block font-poppins text-dimWhite text-[14px]">{o.address}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </>
  );
};

const Contact = () => {
  const [params] = useSearchParams();
  const topic = params.get("topic") ?? "";
  return <ContactContent key={topic} topic={topic} />;
};

export default Contact;
