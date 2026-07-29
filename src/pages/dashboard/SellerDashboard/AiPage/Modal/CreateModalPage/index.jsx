import { Stack } from "@mui/material";
import { useColor } from "@/contexts/color";
import { useAgentForm } from "./UseAgentForm";
import {
  AgentNameField,
  AgentTypeModelFields,
  AgentStatusField,
  AgentDescriptionField,
} from "./AgentFormFields";
import { AgentModalActions } from "./AgentModalActions";
import ModalLayout from "@/layouts/ModalLayout";

/**
 * @param {{
 *   open:     boolean,
 *   onClose:  () => void,
 *   onSave:   (form: import("./UseAgentForm").AgentForm) => void,
 *   loading?: boolean,
 * }} props
 */
export function CreateAgentModal({ open, onClose, onSave, loading = false }) {
  const { fg, bg, border, main, status: s } = useColor();
  const { form, errors, set, validate, reset } = useAgentForm();

  const statusDot = {
    idle: s?.warning?.primary ?? main.warning,
    running: s?.success?.primary ?? main.success,
    failed: s?.error?.primary ?? main.error,
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: bg.secondary,
      "& fieldset": { borderColor: border.primary },
      "&:hover fieldset": { borderColor: fg.tertiary },
      "&.Mui-focused fieldset": { borderColor: main.primary },
    },
    "& input, & textarea, & .MuiSelect-select": {
      color: fg.primary,
      fontSize: 14,
    },
    "& .MuiFormLabel-root": { color: fg.tertiary, fontSize: 13 },
    "& .MuiFormHelperText-root": { fontSize: 11 },
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <ModalLayout
      open={open}
      onClose={handleClose}
      title="Create AI Agent"
      caption="Configure and deploy a new AI agent"
      round={8}
      width={{ xs: "94%", sm: "78%", md: "56%", lg: "42%", xl: "34%" }}
      py={5}
      px={5}
      actionSlot={
        <AgentModalActions
          onCancel={handleClose}
          onSave={handleSave}
          loading={loading}
        />
      }
    >
      <Stack gap={2.5}>
        <AgentNameField
          value={form.name}
          error={errors.name ?? ""}
          onChange={set("name")}
          inputSx={inputSx}
          fg={fg}
        />
        <AgentTypeModelFields
          form={form}
          errors={errors}
          set={set}
          inputSx={inputSx}
          fg={fg}
        />
        <AgentStatusField
          value={form.status}
          onChange={set("status")}
          inputSx={inputSx}
          fg={fg}
          statusDot={statusDot}
        />
        <AgentDescriptionField
          value={form.description}
          onChange={set("description")}
          inputSx={inputSx}
          fg={fg}
        />
      </Stack>
    </ModalLayout>
  );
}
