import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Field from "../../components/ui/Field";
import Modal from "../../components/ui/Modal";
import Switch from "../../components/ui/Switch";
import { people01 } from "../../assets";
import { EMAIL_RE } from "../../components/widgets/NewsletterForm";
import { useToast } from "../../context/ToastContext";
import usePageMeta from "../../hooks/usePageMeta";

const panel = "rounded-[24px] bg-black-gradient border border-white/5 p-5 sm:p-6";

const Settings = () => {
  usePageMeta("Settings", "Manage your HooBank demo profile and preferences.");
  const toast = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "Alex Morgan", email: "alex@example.com", phone: "+1 555 010 2049" });
  const [errors, setErrors] = useState({});
  const [prefs, setPrefs] = useState({ push: true, email: false, weekly: true, twofa: true, biometric: true, round: false, currency: "USD" });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const save = (e) => {
    e.preventDefault();
    const next = {};
    if (profile.name.trim().length < 2) next.name = "Name is too short.";
    if (!EMAIL_RE.test(profile.email)) next.email = "Enter a valid email.";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast({ title: "Profile updated", description: "Your changes were saved (in memory only)." });
  };

  const toggle = (k, label) => (v) => {
    setPrefs((p) => ({ ...p, [k]: v }));
    toast({ title: `${label} ${v ? "on" : "off"}`, variant: "info", duration: 2200 });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <form onSubmit={save} noValidate className={`${panel} flex flex-col gap-5`} aria-labelledby="profile">
        <h2 id="profile" className="font-poppins font-semibold text-white text-[18px]">Profile</h2>
        <div className="flex items-center gap-4">
          <img src={people01} alt="" className="w-16 h-16 rounded-full border-2 border-secondary/40" />
          <Button size="sm" variant="outline" onClick={() => toast({ title: "Photo upload is a mock", variant: "info" })}>
            Change photo
          </Button>
        </div>
        <Field label="Full name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} error={errors.name} />
        <Field label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} error={errors.email} />
        <Field label="Phone" type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
        <Field as="select" label="Display currency" value={prefs.currency} onChange={(e) => setPrefs({ ...prefs, currency: e.target.value })}>
          <option value="USD">USD — US Dollar</option>
          <option value="EUR">EUR — Euro</option>
        </Field>
        <Button type="submit" className="self-start" size="sm">
          Save changes
        </Button>
      </form>

      <div className="flex flex-col gap-6">
        <section className={`${panel} flex flex-col gap-5`} aria-labelledby="notif">
          <h2 id="notif" className="font-poppins font-semibold text-white text-[18px]">Notifications</h2>
          <Switch label="Push notifications" description="Instant alerts for every payment" checked={prefs.push} onChange={toggle("push", "Push notifications")} />
          <Switch label="Email updates" description="Product news and tips" checked={prefs.email} onChange={toggle("email", "Email updates")} />
          <Switch label="Weekly summary" description="Your spending recap every Monday" checked={prefs.weekly} onChange={toggle("weekly", "Weekly summary")} />
        </section>
        <section className={`${panel} flex flex-col gap-5`} aria-labelledby="sec">
          <h2 id="sec" className="font-poppins font-semibold text-white text-[18px]">Security & savings</h2>
          <Switch label="Two-factor authentication" description="Required on new devices" checked={prefs.twofa} onChange={toggle("twofa", "Two-factor authentication")} />
          <Switch label="Biometric sign-in" description="Face ID / fingerprint" checked={prefs.biometric} onChange={toggle("biometric", "Biometric sign-in")} />
          <Switch label="Round-ups" description="Round purchases up into savings" checked={prefs.round} onChange={toggle("round", "Round-ups")} />
        </section>
        <section className={`${panel} border-red-400/20`} aria-labelledby="danger">
          <h2 id="danger" className="font-poppins font-semibold text-white text-[18px]">Danger zone</h2>
          <p className="font-poppins text-dimWhite text-[14px] mt-1">Closing your account is permanent (but this is a demo, so don’t worry).</p>
          <button type="button" onClick={() => setConfirmOpen(true)} className="mt-4 rounded-[10px] border border-red-400/40 text-red-300 hover:bg-red-400/10 px-4 py-2.5 font-poppins text-[15px] transition">
            Close account
          </button>
        </section>
      </div>

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Close your account?">
        <p className="font-poppins text-dimWhite">This would close your HooBank account and cancel all cards. In this demo nothing happens — you’ll just be signed out.</p>
        <div className="flex justify-end gap-3 mt-8">
          <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>
            Keep my account
          </Button>
          <button
            type="button"
            onClick={() => {
              setConfirmOpen(false);
              toast({ title: "Account closed (not really)", description: "Demo only — come back any time.", variant: "info" });
              navigate("/");
            }}
            className="rounded-[10px] bg-red-500/80 hover:bg-red-500 text-white px-4 py-2.5 font-poppins text-[15px] transition"
          >
            Yes, close it
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
