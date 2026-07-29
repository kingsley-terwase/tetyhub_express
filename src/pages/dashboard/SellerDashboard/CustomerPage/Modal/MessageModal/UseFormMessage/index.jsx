import { useState } from "react";

/**
 * @typedef {{
 *   subject:  string,
 *   channel:  string,
 *   message:  string,
 * }} MessageForm
 */

export const channels = ["Email", "SMS", "Push Notification", "In-App"];

const defaultForm = /** @type {MessageForm} */ ({
  subject: "",
  channel: "Email",
  message: "",
});

/**
 * @returns {{
 *   form:     MessageForm,
 *   errors:   Partial<MessageForm>,
 *   set:      (key: keyof MessageForm) => (e: React.ChangeEvent<HTMLInputElement>) => void,
 *   validate: () => boolean,
 *   reset:    () => void,
 * }}
 */
export function useMessageForm() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState(
    /** @type {Partial<MessageForm>} */ ({}),
  );

  /** @param {keyof MessageForm} key */
  const set =
    (key) => (/** @type {React.ChangeEvent<HTMLInputElement>} */ e) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: "" }));
    };

  const validate = () => {
    /** @type {Partial<MessageForm>} */
    const e = {};
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message cannot be empty";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const reset = () => {
    setForm(defaultForm);
    setErrors({});
  };

  return { form, errors, set, validate, reset };
}
