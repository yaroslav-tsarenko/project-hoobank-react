import { useEffect, useId, useRef } from "react";
import Icon from "./Icon";

/** Accessible modal built on native <dialog> (focus trap + Escape for free). */
const Modal = ({ open, onClose, title, children, className = "" }) => {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={title ? titleId : undefined}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className={`glass bg-[#0b0f1d]/95 rounded-[24px] p-6 sm:p-8 relative ${className}`}>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-dimWhite hover:text-white hover:bg-white/10 transition"
        >
          <Icon name="x" size={18} />
        </button>
        {title && (
          <h2 id={titleId} className="font-poppins font-semibold text-[22px] text-white pr-10 mb-6">
            {title}
          </h2>
        )}
        {open && children}
      </div>
    </dialog>
  );
};

export default Modal;
