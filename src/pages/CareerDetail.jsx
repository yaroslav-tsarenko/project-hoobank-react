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
    toast({ title: "Application sent!", description: `Thanks ${form.name.split(" ")[0]} — the ${job.title} hiring team will reply within 5 days.` });
  };

  if (sent) {
    return (
      <div className={`${styles.card} p-8 text-center`}>
        <span className="w-16 h-16 mx-auto rounded-full bg-blue-gradient text-primary flex items-center justify-center animate-pop-in">
          <Icon name="check" size={30} strokeWidth={3} />
        </span>
        <h2 className={`${styles.heading3} mt-6`}>Application received</h2>
        <p className="font-poppins text-dimWhite mt-2">This is a demo — nothing was actually sent.</p>
        <Button to="/careers" variant="outline" size="sm" className="mt-6">
          Back to all roles
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={`${styles.card} p-6 sm:p-8 flex flex-col gap-5`} id="apply">
      <h2 className={styles.heading3}>Apply for this role</h2>
      <Field label="Full name" value={form.name} onChange={set("name")} error={errors.name} autoComplete="name" />
      <Field label="Email" type="email" value={form.email} onChange={set("email")} error={errors.email} autoComplete="email" />
      <Field label="CV / LinkedIn / portfolio URL" value={form.link} onChange={set("link")} error={errors.link} placeholder="https://" />
      <Field as="textarea" label="Why HooBank? (optional)" value={form.note} onChange={set("note")} />
      <Button type="submit">Submit application</Button>
    </form>
  );
};

const CareerContent = ({ job }) => {
  usePageMeta(job.title, `${job.title} at HooBank — ${job.location}. ${job.summary}`);
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Careers", to: "/careers" }, { label: job.title }]}
        title={job.title}
        description={job.summary}
        aside={
          <ul className={`${styles.glassCard} p-6 w-full max-w-[380px] flex flex-col gap-4 font-poppins text-[15px]`}>
            {[
              ["briefcase", job.department],
              ["mapPin", job.location],
              ["clock", job.type],
              ["wallet", job.salary],
            ].map(([ic, v]) => (
              <li key={ic} className="flex items-center gap-3 text-white">
                <span className="w-10 h-10 rounded-full bg-dimBlue text-secondary flex items-center justify-center">
                  <Icon name={ic} size={18} />
                </span>
                {v}
              </li>
            ))}
          </ul>
        }
      >
        <Button to="#apply">Apply now</Button>
        <Button to="/careers" variant="outline">
          All roles
        </Button>
      </PageHero>
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-12 items-start">
          <div className="flex flex-col gap-10">
            {[
              ["What you’ll do", job.responsibilities],
              ["What we’re looking for", job.requirements],
            ].map(([title, items]) => (
              <section key={title}>
                <h2 className={styles.heading3}>{title}</h2>
                <ul className="flex flex-col gap-3 mt-5">
                  {items.map((it) => (
                    <li key={it} className="flex gap-3 font-poppins text-dimWhite text-[16px]">
                      <Icon name="check" size={18} className="text-secondary mt-[3px]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <section>
              <h2 className={styles.heading3}>How we hire</h2>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                {["Intro call (30 min)", "Skills conversation", "Practical exercise", "Meet the team"].map((s, i) => (
                  <li key={s} className={`${styles.glassCard} p-4 font-poppins text-[15px] text-white`}>
                    <span className="text-gradient font-semibold mr-2">0{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </section>
          </div>
          <div className="md:sticky md:top-28">
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
