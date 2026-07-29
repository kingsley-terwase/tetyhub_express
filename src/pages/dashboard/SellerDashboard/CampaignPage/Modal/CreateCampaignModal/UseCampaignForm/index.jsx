import { useState } from "react";

/** @type {import("../lib").CampaignDraft} */
const initialForm = {
  name: "",
  status: "active",
  startDate: "",
  endDate: "",
  budget: "",
  type: "",
};

/**
 * @param {{ onSubmit?: (draft: import("../lib").CampaignDraft) => void, onClose: () => void }} params
 */
export function useCampaignForm({ onSubmit, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(
    /** @type {Record<string, string>} */ ({}),
  );

  /** @param {string} field @param {string} value */
  const handleChange = (field, value) => {
    setForm((/** @type {any} */ prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    /** @type {Record<string, string>} */
    const next = {};
    if (!form.name.trim()) next.name = "Campaign name is required";
    if (!form.type) next.type = "Please select a campaign type";
    if (!form.startDate) next.startDate = "Start date is required";
    if (form.budget && isNaN(Number(form.budget)))
      next.budget = "Budget must be a number";
    return next;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    onSubmit?.(form);
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  const handleCancel = () => {
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  return { form, errors, handleChange, handleSubmit, handleCancel };
}
