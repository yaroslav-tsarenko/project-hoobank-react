import { useState } from "react";
import { Link } from "react-router-dom";
import { cardColors, cardFinishes, defaultCardDesign } from "../../constants/cards";
import { useToast } from "../../context/ToastContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import styles from "../../style";
import Button from "../Button";
import CreditCard from "../ui/CreditCard";
import Icon from "../ui/Icon";

export const CARD_STORAGE_KEY = "northvault.card-design";

/** Card designer: material / finish / name / plan label with live preview, flip and save (localStorage). */
const CardCustomizer = () => {
  const [saved, setSaved] = useLocalStorage(CARD_STORAGE_KEY, defaultCardDesign);
  const [design, setDesign] = useState(saved);
  const [flipped, setFlipped] = useState(false);
  const toast = useToast();

  const update = (patch) => setDesign((d) => ({ ...d, ...patch }));

  const shuffle = () => {
    const color = cardColors[Math.floor(Math.random() * cardColors.length)].id;
    const finish = cardFinishes[Math.floor(Math.random() * cardFinishes.length)].id;
    update({ color, finish });
  };

  const save = () => {
    setSaved(design);
    toast({ title: "Design saved", description: "It now appears on the Cards page of the demo workspace." });
  };

  const dirty = JSON.stringify(saved) !== JSON.stringify(design);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-7 rounded-card bg-sand/70 border border-line flex flex-col items-center justify-center px-6 py-12 sm:py-16">
        <div className="w-full max-w-[440px]">
          <CreditCard design={design} flipped={flipped} />
        </div>
        <div className="w-full max-w-[440px] h-3 mt-6 rounded-[50%] bg-ink/10 blur-md" aria-hidden="true" />
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Button variant="outline" size="sm" onClick={() => setFlipped((f) => !f)} aria-pressed={flipped}>
            <Icon name="rotate" size={16} /> {flipped ? "Show front" : "Show back"}
          </Button>
          <Button variant="ghost" size="sm" onClick={shuffle}>
            <Icon name="repeat" size={16} /> Shuffle material
          </Button>
        </div>
        <p className="font-sans text-[13px] text-muted mt-4">Move the pointer over the card to see the light change.</p>
      </div>

      <div className={`md:col-span-5 ${styles.card} p-6 sm:p-7 flex flex-col gap-7`}>
        <fieldset>
          <legend className={styles.label}>Material</legend>
          <div className="grid grid-cols-3 gap-2">
            {cardColors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => update({ color: c.id })}
                aria-pressed={design.color === c.id}
                className={`rounded-control border p-2 text-left transition ${design.color === c.id ? "border-forest ring-1 ring-forest" : "border-line hover:border-ink/40"}`}
              >
                <span className="block h-8 rounded-[5px]" style={{ background: c.background }} />
                <span className="block font-sans text-[13px] text-ink mt-1.5">{c.name}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={styles.label}>Finish</legend>
          <div className="border-t border-line">
            {cardFinishes.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => update({ finish: f.id })}
                aria-pressed={design.finish === f.id}
                className="w-full flex items-center gap-3 py-2.5 border-b border-line text-left group"
              >
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${design.finish === f.id ? "border-forest" : "border-ink/30 group-hover:border-ink/60"}`}>
                  {design.finish === f.id && <span className="w-2 h-2 rounded-full bg-forest" />}
                </span>
                <span className="flex-1">
                  <span className="block font-sans font-medium text-[14px] text-ink">{f.name}</span>
                  <span className="block font-sans text-[13px] text-muted">{f.description}</span>
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="card-name" className={styles.label}>
            Name on card
          </label>
          <input
            id="card-name"
            value={design.name}
            maxLength={22}
            onChange={(e) => update({ name: e.target.value.replace(/[^a-zA-ZÀ-ÿ .'-]/g, "") })}
            className={styles.input}
            placeholder="Your name"
            aria-describedby="card-name-hint"
          />
          <p id="card-name-hint" className="font-sans text-[13px] text-faint mt-1.5 num">
            {22 - design.name.length} characters left · letters only
          </p>
        </div>

        <fieldset>
          <legend className={styles.label}>Plan label</legend>
          <div className="flex flex-wrap gap-2">
            {["Solo", "Studio", "Team"].map((t) => (
              <button key={t} type="button" onClick={() => update({ tier: t })} aria-pressed={design.tier === t} className={`${styles.chip} ${design.tier === t ? styles.chipActive : styles.chipIdle}`}>
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <Button onClick={save} disabled={!dirty} size="sm">
            <Icon name="check" size={16} /> {dirty ? "Save design" : "Saved"}
          </Button>
          <Link to="/dashboard/cards" className="font-sans text-[14px] text-forest link">
            See it in the workspace
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardCustomizer;
