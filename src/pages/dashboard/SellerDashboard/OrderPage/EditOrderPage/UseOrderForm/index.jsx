import { useState } from "react";

/**
 * @typedef {{
 *   id:       string,
 *   name:     string,
 *   sku:      string,
 *   qty:      number,
 *   price:    number,
 * }} OrderItem
 *
 * @typedef {{
 *   customer:   string,
 *   email:      string,
 *   phone:      string,
 *   address:    string,
 *   channel:    string,
 *   payment:    string,
 *   shipping:   string,
 *   notes:      string,
 *   items:      OrderItem[],
 * }} OrderForm
 */

export const channels = ["Web", "Mobile", "POS", "Marketplace", "Phone"];
export const payments = [
  "Card",
  "Bank Transfer",
  "Cash",
  "PayPal",
  "Store Credit",
];
export const shippings = ["Standard", "Express", "Same Day", "Click & Collect"];

const defaultForm = /** @type {OrderForm} */ ({
  customer: "",
  email: "",
  phone: "",
  address: "",
  channel: "Web",
  payment: "Card",
  shipping: "Standard",
  notes: "",
  items: [],
});

/**
 * @returns {{
 *   form:       OrderForm,
 *   errors:     Partial<Record<keyof OrderForm, string>>,
 *   set:        (key: keyof OrderForm) => (e: React.ChangeEvent<HTMLInputElement>) => void,
 *   addItem:    (item: OrderItem) => void,
 *   removeItem: (id: string) => void,
 *   updateQty:  (id: string, qty: number) => void,
 *   validate:   () => boolean,
 *   reset:      () => void,
 *   total:      number,
 * }}
 */
export function useOrderForm() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState(
    /** @type {Partial<Record<keyof OrderForm, string>>} */ ({}),
  );

  /** @param {keyof OrderForm} key */
  const set =
    (key) => (/** @type {React.ChangeEvent<HTMLInputElement>} */ e) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: "" }));
    };

  /** @param {OrderItem} item */
  const addItem = (item) =>
    setForm((p) => ({
      ...p,
      items: p.items.find((i) => i.id === item.id)
        ? p.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...p.items, item],
    }));

  /** @param {string} id */
  const removeItem = (id) =>
    setForm((p) => ({ ...p, items: p.items.filter((i) => i.id !== id) }));

  /**
   * @param {string} id
   * @param {number} qty
   */
  const updateQty = (id, qty) =>
    setForm((p) => ({
      ...p,
      items: p.items.map((i) => (i.id === id ? { ...i, qty } : i)),
    }));

  const validate = () => {
    /** @type {Partial<Record<keyof OrderForm, string>>} */
    const e = {};
    if (!form.customer.trim()) e.customer = "Customer name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.address.trim()) e.address = "Shipping address is required";
    if (form.items.length === 0) e.items = "Add at least one product";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const reset = () => {
    setForm(defaultForm);
    setErrors({});
  };

  const total = form.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return {
    form,
    errors,
    set,
    addItem,
    removeItem,
    updateQty,
    validate,
    reset,
    total,
  };
}
