import { useState } from "react";

/**
 * @typedef {{
 *   name:     string,
 *   category: string,
 *   price:    string,
 *   duration: string,
 *   provider: string,
 *   status:   string,
 *   tags:     string,
 * }} ServiceForm
 */

export const defaultForm = /** @type {ServiceForm} */ ({
  name: "",
  category: "",
  price: "",
  duration: "",
  provider: "",
  status: "available",
  tags: "",
});

export const categories = [
  "Design",
  "Marketing",
  "Tech",
  "Content",
  "Consulting",
  "Support",
];
export const statuses = ["available", "unavailable", "maintenance"];
export const durations = [
  "1 day",
  "2 days",
  "3 days",
  "5 days",
  "7 days",
  "14 days",
  "30 days",
  "Monthly",
];

/**
 * @returns {{
 *   form:    ServiceForm,
 *   errors:  Partial<ServiceForm>,
 *   set:     (key: keyof ServiceForm) => (e: React.ChangeEvent<HTMLInputElement>) => void,
 *   validate: () => boolean,
 *   reset:   () => void,
 * }}
 */
export function useServiceForm() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState(
    /** @type {Partial<ServiceForm>} */ ({}),
  );

  /** @param {keyof ServiceForm} key */
  const set =
    (key) => (/** @type {React.ChangeEvent<HTMLInputElement>} */ e) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: "" }));
    };

  const validate = () => {
    /** @type {Partial<ServiceForm>} */
    const e = {};
    if (!form.name.trim()) e.name = "Service name is required";
    if (!form.category) e.category = "Select a category";
    if (!form.price.trim()) e.price = "Price is required";
    if (!form.duration) e.duration = "Select a duration";
    if (!form.provider.trim()) e.provider = "Provider name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const reset = () => {
    setForm(defaultForm);
    setErrors({});
  };

  return { form, errors, set, validate, reset };
}
