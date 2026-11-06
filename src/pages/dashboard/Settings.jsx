import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Avatar from "../../components/ui/Avatar";
import Field from "../../components/ui/Field";
import Modal from "../../components/ui/Modal";
import Switch from "../../components/ui/Switch";
import { EMAIL_RE } from "../../components/widgets/NewsletterForm";
import { useToast } from "../../context/ToastContext";
import usePageMeta from "../../hooks/usePageMeta";
import styles from "../../style";

const Settings = () => {
  usePageMeta("Settings", "Manage your Northvault demo profile and preferences.");
  const toast = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "Alex Morgan", email: "alex@morganstudio.example", phone: "+44 20 7946 0958", business: "Morgan Studio" });
  const [errors, setErrors] = useState({});
  const [prefs, setPrefs] = useState({ push: true, email: false, weekly: true, payee: true, approvals: true, split: true, currency: "USD" });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const save = (e) => {
    e.preventDefault();
    const next = {};
    if (profile.name.trim().length < 2) next.name = "Name is too short.";
    if (!EMAIL_RE.test(profile.email)) next.email = "Enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast({ title: "Profile updated", description: "Saved for this session only." });
  };

  const toggle = (k, label) => (v) => {
    setPrefs((p) => ({ ...p, [k]: v }));
    toast({ title: `${label} ${v ? "on" : "off"}`, variant: "info", duration: 2200 });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <form onSubmit={save} noValidate className={`${styles.panel} flex flex-col gap-5`} aria-labelledby="profile">
        <h2 id="profile" className="font-sans font-semibold text-ink text-[15px]">
          Profile and business
        </h2>
        <div className="flex items-center gap-4">
          <Avatar name={profile.name || "A M"} size="w-14 h-14 text-[18px]" />
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Photo upload is a mock", variant: "info" })}>
            Change photo
          </Button>
        </div>
        <Field label="Full name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} error={errors.name} />
        <Field label="Trading name" value={profile.business} onChange={(e) => setProfile({ ...profile, business: e.target.value })} />
        <Field label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} error={errors.email} />
        <Field label="Phone" type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
        <Field as="select" label="Reporting currency" value={prefs.currency} onChange={(e) => setPrefs({ ...prefs, currency: e.target.value })}>
          <option value="USD">USD — US Dollar</option>
          <option value="EUR">EUR — Euro</option>
          <option value="GBP">GBP — British Pound</option>
        </Field>
        <Button type="submit" className="self-start" size="sm">
          Save changes
        </Button>
      </form>

      <div className="flex flex-col gap-5">
        <section className={`${styles.panel} flex flex-col gap-5`} aria-labelledby="notif">
          <h2 id="notif" className="font-sans font-semibold text-ink text-[15px]">
            Notifications
          </h2>
          <Switch label="Push notifications" description="Every payment in and out" checked={prefs.push} onChange={toggle("push", "Push notifications")} />
          <Switch label="Invoice updates by email" description="Viewed, paid and overdue invoices" checked={prefs.email} onChange={toggle("email", "Invoice emails")} />
          <Switch label="Monday summary" description="Last week’s money in, money out and pots" checked={prefs.weekly} onChange={toggle("weekly", "Monday summary")} />
        </section>
        <section className={`${styles.panel} flex flex-col gap-5`} aria-labelledby="sec">
          <h2 id="sec" className="font-sans font-semibold text-ink text-[15px]">
            Security and automation
          </h2>
          <Switch label="Confirm new payees" description="A second step before paying someone new" checked={prefs.payee} onChange={toggle("payee", "Payee confirmation")} />
          <Switch label="Approve transfers over $5,000" description="Asks a second device to confirm" checked={prefs.approvals} onChange={toggle("approvals", "Large transfer approval")} />
          <Switch label="Auto-split client payments" description="25% to Income tax, 5% to VAT" checked={prefs.split} onChange={toggle("split", "Auto-split")} />
        </section>
        <section className={`${styles.panel} border-negative/30`} aria-labelledby="danger">
          <h2 id="danger" className="font-sans font-semibold text-ink text-[15px]">
            Close workspace
          </h2>
          <p className="font-sans text-muted text-[14px] mt-1">Closing is permanent in a real account. In this demo it simply signs you out.</p>
          <button type="button" onClick={() => setConfirmOpen(true)} className="mt-4 h-10 rounded-full border border-negative/50 text-negative hover:bg-negative/5 px-4 font-sans text-[14px] transition">
            Close workspace
          </button>
        </section>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Close this workspace?">
        <p className="font-sans text-muted">This would close Morgan Studio and cancel its cards. In the demo nothing is deleted; you will be taken back to the home page.</p>
        <div className="flex justify-end gap-3 mt-8">
          <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>
            Keep workspace
          </Button>
          <button
            type="button"
            onClick={() => {
              setConfirmOpen(false);
              toast({ title: "Workspace closed (not really)", description: "Demo only.", variant: "info" });
              navigate("/");
            }}
            className="h-10 rounded-full bg-negative hover:bg-[#82301f] text-ivory px-4 font-sans text-[14px] transition"
          >
            Yes, close it
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
