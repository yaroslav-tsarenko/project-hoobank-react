import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Container from "../components/ui/Container";
import Field from "../components/ui/Field";
import Icon from "../components/ui/Icon";
import PageHero from "../components/ui/PageHero";
import { EMAIL_RE } from "../components/widgets/NewsletterForm";
import { getJob } from "../constants/careers";
import { useToast } from "../context/ToastContext";
import usePageMeta from "../hooks/usePageMeta";
import styles from "../style";
import NotFound from "./NotFound";

const ApplyForm = ({ job }) => {
  const toast = useToast();
  const [form, setForm] = useState({ name: "", email: "", link: "", note: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.link.trim()) next.link = "Add a link to your CV, LinkedIn or portfolio.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSent(true);
    toast({ title: "Application recorded", description: `Thanks, ${form.name.split(" ")[0]}. Your ${job.title} application was not sent anywhere; this is a demo.` });
  };

  if (sent) {
    return (
      <div className={`${styles.card} p-8 text-center`}>
        <span className="w-14 h-14 mx-auto rounded-full bg-forest text-ivory flex items-center justify-center animate-pop-in">
          <Icon name="check" size={26} strokeWidth={2.4} />
        </span>
        <h2 className="font-serif text-[34px] text-ink mt-6">Application received</h2>
        <p className="font-sans text-muted mt-2">This is a demo: nothing was sent, and the form has been cleared.</p>
        <Button to="/careers" variant="outline" size="sm" className="mt-6">
          Back to all roles
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={`${styles.card} p-6 sm:p-8 flex flex-col gap-5`} id="apply">
      <h2 className="font-serif text-[32px] leading-tight text-ink">Apply for this role</h2>
      <Field label="Full name" value={form.name} onChange={set("name")} error={errors.name} autoComplete="name" />
      <Field label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} autoComplete="email" />
      <Field label="CV, LinkedIn or portfolio link" value={form.link} onChange={set("link")} error={errors.link} placeholder="https://" />
      <Field as="textarea" label="Anything you would like us to know (optional)" value={form.note} onChange={set("note")} />
      <Button type="submit">Submit application</Button>
    </form>
  );
};

const CareerContent = ({ job }) => {
  usePageMeta(job.title, `${job.title} at Northvault (example role) — ${job.location}. ${job.summary}`);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: job.title }]}
        title={job.title}
        description={job.summary}
        note="Example role for the Northvault concept."
        aside={
          <dl className="w-full max-w-[380px] border-t border-line font-sans text-[15px]">
            {[
              ["Team", job.department],
              ["Location", job.location],
              ["Type", job.type],
              ["Salary", job.salary],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3.5 border-b border-line">
                <dt className="text-muted">{k}</dt>
                <dd className="text-ink text-right num">{v}</dd>
              </div>
            ))}
          </dl>
        }
      >
        <Button to="#apply">Apply now</Button>
        <Button to="/careers" variant="outline">
          All roles
        </Button>
      </PageHero>
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 flex flex-col gap-14">
            {[
              ["What you will do", job.responsibilities],
              ["What we are looking for", job.requirements],
            ].map(([title, items]) => (
              <section key={title}>
                <h2 className="font-serif text-[36px] leading-tight text-ink">{title}</h2>
                <ul className="mt-6 border-t border-line">
                  {items.map((it) => (
                    <li key={it} className="flex gap-3 py-3.5 border-b border-line font-sans text-[16px] text-ink">
                      <Icon name="check" size={18} className="text-forest mt-1" />
                      {it}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <section>
              <h2 className="font-serif text-[36px] leading-tight text-ink">How we hire</h2>
              <ol className="mt-6 border-t border-line">
                {["Intro call, 30 minutes", "A conversation about your past work", "A short, paid practical exercise", "Meet the people you would work with"].map((s, i) => (
                  <li key={s} className="grid grid-cols-[40px_1fr] py-3.5 border-b border-line font-sans text-[16px] text-ink">
                    <span className="font-serif text-[24px] leading-none text-brass-dark num">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </section>
          </div>
          <div className="md:col-span-5 md:sticky md:top-28">
            <ApplyForm job={job} />
          </div>
        </div>
      </Container>
    </>
  );
};

const CareerDetail = () => {
  const { slug } = useParams();
  const job = getJob(slug);
  if (!job) return <NotFound />;
  return <CareerContent key={job.slug} job={job} />;
};

export default CareerDetail;
