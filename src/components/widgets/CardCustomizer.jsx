import { useState } from "react";
import { Link } from "react-router-dom";
import { cardColors, cardFinishes, defaultCardDesign } from "../../constants/cards";
import { useToast } from "../../context/ToastContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import styles from "../../style";
import Button from "../Button";
import CreditCard from "../ui/CreditCard";
import Icon from "../ui/Icon";

export const CARD_STORAGE_KEY = "hoobank.card-design";

/** Card Studio: colour / finish / name / tier with live 3D preview, flip and save (localStorage). */
const CardCustomizer = () => {
  const [saved, setSaved] = useLocalStorage(CARD_STORAGE_KEY, defaultCardDesign);
  const [design, setDesign] = useState(saved);
  const [flipped, setFlipped] = useState(false);
  const toast = useToast();

  const update = (patch) => setDesign((d) => ({ ...d, ...patch }));

  const surprise = () => {
    const color = cardColors[Math.floor(Math.random() * cardColors.length)].id;
    const finish = cardFinishes[Math.floor(Math.random() * cardFinishes.length)].id;
    update({ color, finish });
  };

  const save = () => {
    setSaved(design);
    toast({ title: "Design saved", description: "Your card now appears in the demo dashboard → Cards." });
  };

  const dirty = JSON.stringify(saved) !== JSON.stringify(design);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 items-center">
      <div className="relative flex flex-col items-center">
        <div className="absolute w-[70%] h-[60%] blue__gradient" aria-hidden="true" />
        <div className="absolute w-[40%] h-[40%] right-0 top-0 pink__gradient opacity-70" aria-hidden="true" />
        <div className="relative w-full max-w-[460px] motion-safe:animate-float">
          <CreditCard design={design} flipped={flipped} />
        </div>
        <p className="font-poppins text-[13px] text-dimWhite mt-6 flex items-center gap-2">
          <Icon name="sparkles" size={14} className="text-secondary" /> Move your cursor over the card to tilt it
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <Button variant="outline" size="sm" onClick={() => setFlipped((f) => !f)} aria-pressed={flipped}>
            <Icon name="rotate" size={16} /> {flipped ? "Show front" : "Flip card"}
          </Button>
          <Button variant="ghost" size="sm" onClick={surprise}>
            <Icon name="sparkles" size={16} /> Surprise me
          </Button>
        </div>
      </div>

      <div className={`${styles.card} p-6 sm:p-8 flex flex-col gap-7`}>
        <fieldset>
          <legend className={styles.label}>Colour</legend>
          <div className="flex flex-wrap gap-3">
            {cardColors.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => update({ color: c.id })}
                aria-pressed={design.color === c.id}
                aria-label={c.name}
                title={c.name}
                className={`w-11 h-11 rounded-full transition ring-offset-2 ring-offset-[#11101d] ${design.color === c.id ? "ring-2 ring-secondary scale-110" : "hover:scale-105"}`}
                style={{ background: c.background }}
              />
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className={styles.label}>Finish</legend>
          <div className="grid grid-cols-2 gap-3">
            {cardFinishes.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => update({ finish: f.id })}
                aria-pressed={design.finish === f.id}
                className={`text-left rounded-[14px] border p-3 transition ${design.finish === f.id ? "border-secondary/70 bg-white/5" : "border-white/10 hover:border-white/30"}`}
              >
                <span className="block font-poppins font-medium text-[15px] text-white">{f.name}</span>
                <span className="block font-poppins text-[12px] leading-[18px] text-dimWhite mt-1">{f.description}</span>
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
            onChange={(e) => update({ name: e.target.value.replace(/[^a-zA-Z .'-]/g, "") })}
            className={styles.input}
            placeholder="Your name"
            aria-describedby="card-name-hint"
          />
          <p id="card-name-hint" className="font-poppins text-[12px] text-dimWhite mt-2">
            {22 - design.name.length} characters left · letters only
          </p>
        </div>

        <fieldset>
          <legend className={styles.label}>Tier label</legend>
          <div className="flex flex-wrap gap-2">
            {["Classic", "Plus", "Premium"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => update({ tier: t })}
                aria-pressed={design.tier === t}
                className={`${styles.chip} ${design.tier === t ? styles.chipActive : styles.chipIdle}`}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button onClick={save} disabled={!dirty} size="sm">
            <Icon name="check" size={16} /> {dirty ? "Save design" : "Saved"}
          </Button>
          <Link to="/dashboard/cards" className="font-poppins text-[15px] text-secondary hover:underline">
            See it in the dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardCustomizer;
