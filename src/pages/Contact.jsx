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
  { value: "sales", label: "Teams and partnerships" },
  { value: "press", label: "Press" },
  { value: "careers", label: "Careers" },
  { value: "security", label: "Security report" },
];

const OFFICES = [
  { city: "Lisbon", address: "Rua da Prata 80, 1100-415 Lisboa", time: "Product and engineering" },
  { city: "Berlin", address: "Torstraße 140, 10119 Berlin", time: "Partnerships" },
  { city: "London", address: "18 Hatton Garden, London EC1N 8AT", time: "Customer operations" },
];

const CHANNELS = [
  { icon: "chat", title: "Chat", text: "The Questions button, bottom right", to: "/help" },
  { icon: "mail", title: "Email", text: "hello@northvault.example", href: "mailto:hello@northvault.example" },
  { icon: "phone", title: "Phone", text: "+44 20 7946 0000, weekdays", href: "tel:+442079460000" },
];

const ContactContent = ({ topic }) => {
  usePageMeta("Contact", "Contact the Northvault concept team about accounts, teams, press, careers or security.");
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
    if (form.message.trim().length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      toast({ title: "Message recorded", description: `Thanks, ${form.name.split(" ")[0]}. In this demo nothing was sent to ${form.email}.` });
      setForm({ name: "", email: "", topic: form.topic, message: "" });
    }, 900);
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Write to us." highlight="A person reads it." description="Questions about the concept, a team setup or a security report. Pick a channel or use the form." />

      <Container className="py-14">
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line rounded-card overflow-hidden">
          {CHANNELS.map((c, i) => {
            const inner = (
              <>
                <Icon name={c.icon} size={20} className="text-forest" />
                <span className="block font-serif text-[28px] leading-tight text-ink mt-6">{c.title}</span>
                <span className="block font-sans text-muted text-[15px] mt-1">{c.text}</span>
              </>
            );
            const cls = "block w-full h-full p-6 bg-ivory hover:bg-paper transition-colors";
            return (
              <Reveal as="li" key={c.title} delay={i * 80}>
                {c.to ? (
                  <Link to={c.to} className={cls}>
                    {inner}
                  </Link>
                ) : (
                  <a href={c.href} className={cls}>
                    {inner}
                  </a>
                )}
              </Reveal>
            );
          })}
        </ul>
      </Container>

      <Container className="py-14 pb-24 border-t border-line">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <form onSubmit={submit} noValidate className={`${styles.card} md:col-span-7 p-6 sm:p-10 flex flex-col gap-5`}>
            <h2 className="font-serif text-[36px] leading-tight text-ink">Send a message</h2>
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
            <Field as="textarea" label="Message" value={form.message} onChange={set("message")} error={errors.message} hint={`${form.message.length} / 1000`} maxLength={1000} />
            <Button type="submit" disabled={sending} className="self-start">
              {sending ? (
                <>
                  <span className="spinner !w-4 !h-4 !border-2 !border-ivory/30 !border-t-ivory" /> Sending
                </>
              ) : (
                <>
                  Send message <Icon name="arrowRight" size={16} />
                </>
              )}
            </Button>
          </form>

          <Reveal className="md:col-span-5">
            <h2 className="font-serif text-[36px] leading-tight text-ink">Offices</h2>
            <p className="font-sans text-[14px] text-muted mt-2">Fictional addresses for the concept.</p>
            <ul className="mt-6 border-t border-line">
              {OFFICES.map((o) => (
                <li key={o.city} className="py-5 border-b border-line grid grid-cols-[110px_1fr] gap-4">
                  <span className="font-serif text-[26px] leading-none text-ink">{o.city}</span>
                  <span>
                    <span className="block font-sans text-[15px] text-ink">{o.address}</span>
                    <span className="block font-sans text-[13px] text-muted mt-0.5">{o.time}</span>
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
