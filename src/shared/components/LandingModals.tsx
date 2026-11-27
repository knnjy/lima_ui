import { useState, type FormEvent } from "react";
import Modal from "./Modal";

export type LandingModalKey = "privacy" | "terms" | "contact" | null;

type Props = { active: LandingModalKey; onClose: () => void };

const DRAFT_NOTE = "Draft overview · Final policy wording requires review.";

export default function LandingModals({ active, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: send to your backend (e.g. Supabase) when it's ready
    console.log("Contact message:", form);
    setForm({ name: "", email: "", subject: "", message: "" });
    onClose();
  };

  return (
    <>
      <Modal
        open={active === "privacy"}
        title="Your privacy matters"
        subtitle="A simple overview of your information and farm access."
        onClose={onClose}
      >
        <div className="lima-modal__sections">
          <div className="lima-modal__section">
            <h3>Information you share</h3>
            <p>LiMa uses account details and the farm information you enter to help you manage livestock, records, and farm activities.</p>
          </div>
          <div className="lima-modal__section">
            <h3>Farm access</h3>
            <p>Only invite people you trust. Review who has access to your farm before sharing sensitive records.</p>
          </div>
          <div className="lima-modal__section">
            <h3>Your privacy questions</h3>
            <p>Use Contact to ask about your information, account access, or a request to update or delete your details.</p>
          </div>
        </div>
        <div className="lima-modal__note">{DRAFT_NOTE}</div>
        <button className="lima-btn lima-btn--primary" onClick={onClose}>Back to LiMa</button>
      </Modal>

      <Modal
        open={active === "terms"}
        title="Terms of use"
        subtitle="A few ground rules for growing with LiMa."
        onClose={onClose}
      >
        <div className="lima-modal__sections">
          <div className="lima-modal__section">
            <h3>Using LiMa</h3>
            {/* TODO: replace with the full Figma text */}
            <p>Use LiMa responsibly to manage farms you own or have permission to manage.</p>
          </div>
          <div className="lima-modal__section">
            <h3>Your farm records</h3>
            {/* TODO: replace with the full Figma text */}
            <p>You are responsible for the information you add and the records you keep.</p>
          </div>
          <div className="lima-modal__section">
            <h3>Guidance, not professional advice</h3>
            {/* TODO: replace with the full Figma text */}
            <p>Reminders and suggestions support your daily work. They do not replace professional veterinary or financial advice.</p>
          </div>
        </div>
        <div className="lima-modal__note">{DRAFT_NOTE}</div>
        <button className="lima-btn lima-btn--primary" onClick={onClose}>Back to LiMa</button>
      </Modal>

      <Modal
        open={active === "contact"}
        title="Get in touch"
        subtitle="Have a question about LiMa? Send a message about your account, farm records, or anything else you need help with."
        onClose={onClose}
      >
        <form className="lima-form" onSubmit={handleSubmit}>
          <div className="lima-form__row">
            <div className="lima-field">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" placeholder="Your name" value={form.name} onChange={update("name")} required />
            </div>
            <div className="lima-field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} required />
            </div>
          </div>
          <div className="lima-field">
            <label htmlFor="c-subject">Subject</label>
            <input id="c-subject" placeholder="What do you need help with?" value={form.subject} onChange={update("subject")} required />
          </div>
          <div className="lima-field">
            <label htmlFor="c-message">Message</label>
            <textarea id="c-message" placeholder="Tell us a little more…" value={form.message} onChange={update("message")} required />
          </div>
          <p className="lima-form__help">Please don’t include your password or sensitive farm details.</p>
          <div className="lima-form__actions">
            <button type="button" className="lima-btn lima-btn--secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="lima-btn lima-btn--primary">Send message</button>
          </div>
        </form>
      </Modal>
    </>
  );
}