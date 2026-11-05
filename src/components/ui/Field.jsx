import { useId } from "react";
import styles from "../../style";

/** Label + input/select/textarea + hint/error, wired up with aria attributes. */
const Field = ({ label, error, hint, as = "input", className = "", children, right, ...props }) => {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const common = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: `${styles.input} ${right ? "pr-12" : ""}`,
    ...props,
  };

  let control;
  if (as === "select") control = <select {...common}>{children}</select>;
  else if (as === "textarea") control = <textarea rows={5} {...common} />;
  else control = <input {...common} />;

  return (
    <div className={className}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className="relative">
        {control}
        {right && <div className="absolute inset-y-0 right-2 flex items-center">{right}</div>}
      </div>
      {error ? (
        <p id={`${id}-error`} className="font-poppins text-[13px] text-red-300 mt-2">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="font-poppins text-[13px] text-dimWhite mt-2">
          {hint}
        </p>
      ) : null}
    </div>
  );
};

export default Field;
