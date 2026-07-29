import { useState } from "react";

/**
 * @typedef {{
 *   name:    string,
 *   email:   string,
 *   phone:   string,
 *   country: string,
 *   segment: string,
 *   status:  string,
 * }} CustomerForm
 */

export const segments = ["new", "returning", "vip", "at-risk", "lapsed"];
export const statuses = ["active", "suspended", "blocked"];
export const countries = [
  "Ghana",
  "Nigeria",
  "Kenya",
  "South Africa",
  "USA",
  "UK",
  "Canada",
  "Australia",
  "France",
  "Germany",
];

const defaultForm = /** @type {CustomerForm} */ ({
  name: "",
  email: "",
  phone: "",
  country: "",
  segment: "new",
  status: "active",
});

/**
 * @returns {{
 *   form:     CustomerForm,
 *   errors:   Partial<CustomerForm>,
 *   set:      (key: keyof CustomerForm) => (e: React.ChangeEvent<HTMLInputElement>) => void,
 *   validate: () => boolean,
 *   reset:    () => void,
 * }}
 */
export function useCustomerForm() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState(
    /** @type {Partial<CustomerForm>} */ ({}),
  );

  /** @param {keyof CustomerForm} key */
  const set =
    (key) => (/** @type {React.ChangeEvent<HTMLInputElement>} */ e) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: "" }));
    };

  const validate = () => {
    /** @type {Partial<CustomerForm>} */
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.country) e.country = "Select a country";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const reset = () => {
    setForm(defaultForm);
    setErrors({});
  };

  return { form, errors, set, validate, reset };
}
