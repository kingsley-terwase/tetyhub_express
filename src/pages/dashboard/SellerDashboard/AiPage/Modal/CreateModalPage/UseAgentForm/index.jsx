import { useState } from "react";

/**
 * @typedef {{
 *   name:        string,
 *   type:        string,
 *   model:       string,
 *   description: string,
 *   status:      string,
 * }} AgentForm
 */

export const defaultForm = /** @type {AgentForm} */ ({
  name: "",
  type: "",
  model: "",
  description: "",
  status: "idle",
});

export const agentTypes = [
  "Recommendation",
  "Classification",
  "Prediction",
  "NLP",
  "Optimization",
  "Conversational",
  "Generation",
];
export const agentModels = [
  "GPT-4o",
  "GPT-4o-mini",
  "Claude 3.5",
  "Claude 3",
  "Gemini 1.5 Pro",
];
export const agentStatuses = ["idle", "running", "failed"];

/**
 * @returns {{
 *   form:     AgentForm,
 *   errors:   Partial<AgentForm>,
 *   set:      (key: keyof AgentForm) => (e: React.ChangeEvent<HTMLInputElement>) => void,
 *   validate: () => boolean,
 *   reset:    () => void,
 * }}
 */
export function useAgentForm() {
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState(/** @type {Partial<AgentForm>} */ ({}));

  /** @param {keyof AgentForm} key */
  const set =
    (key) => (/** @type {React.ChangeEvent<HTMLInputElement>} */ e) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: "" }));
    };

  const validate = () => {
    /** @type {Partial<AgentForm>} */
    const e = {};
    if (!form.name.trim()) e.name = "Agent name is required";
    if (!form.type) e.type = "Select an agent type";
    if (!form.model) e.model = "Select a model";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const reset = () => {
    setForm(defaultForm);
    setErrors({});
  };

  return { form, errors, set, validate, reset };
}
