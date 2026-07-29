// @ts-nocheck
import { useState } from "react";

export const TABS = ["Overview", "Orders", "Notes"];

/**
 * @param {{ customer: import("../lib").Customer | null }} params
 */
export function useCustomerView({ customer }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const reset = () => {
    setActiveTab("Overview");
    setNotes(customer?.notes ?? "");
    setSaved(false);
  };

  const handleSaveNotes = () => {
    console.log("save notes:", notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return {
    activeTab,
    setActiveTab,
    notes,
    setNotes,
    saved,
    handleSaveNotes,
    reset,
  };
}
