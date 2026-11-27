import { useEffect, useId, useRef, type ReactNode } from "react";
import "./Modal.css";

type ModalProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, title, subtitle, onClose, children }: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="lima-modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        className="lima-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <div className="lima-modal__header">
          <h2 id={titleId} className="lima-modal__title">{title}</h2>
          <button className="lima-modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        {subtitle && <p className="lima-modal__subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}