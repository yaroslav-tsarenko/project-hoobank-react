import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import Icon from "../components/ui/Icon";

const ToastContext = createContext(null);

const VARIANTS = {
  success: { icon: "check", ring: "bg-forest text-ivory" },
  info: { icon: "info", ring: "bg-sand text-ink" },
  error: { icon: "x", ring: "bg-negative text-ivory" },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ title, description = "", variant = "success", duration = 4200 }) => {
      idRef.current += 1;
      const id = idRef.current;
      setToasts((list) => [...list.slice(-3), { id, title, description, variant }]);
      window.setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed z-[100] top-4 left-1/2 -translate-x-1/2 sm:top-auto sm:bottom-6 sm:left-6 sm:translate-x-0 flex flex-col gap-2 w-[calc(100vw-32px)] max-w-[380px] pointer-events-none"
      >
        {toasts.map((t) => {
          const v = VARIANTS[t.variant] ?? VARIANTS.success;
          return (
            <div key={t.id} role="status" className="pointer-events-auto bg-paper border border-line rounded-card p-4 flex items-start gap-3 shadow-float animate-fade-up">
              <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${v.ring}`}>
                <Icon name={v.icon} size={14} strokeWidth={2.2} />
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-[15px] text-ink">{t.title}</p>
                {t.description && <p className="font-sans text-[13px] leading-[1.5] text-muted mt-0.5">{t.description}</p>}
              </div>
              <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss notification" className="text-muted hover:text-ink transition">
                <Icon name="x" size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx.toast;
}
