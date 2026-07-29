import { Stack } from "@mui/material";
import { useColor } from "@/contexts/color";
import {
  NameField,
  CategoryStatusFields,
  PriceDurationFields,
  ProviderTagsFields,
} from "./ServiceFormFields";
import { ServiceModalActions } from "./ServiceModalActions";
import { useServiceForm } from "./UseServiceForm";
import ModalLayout from "@/layouts/ModalLayout";

/**
 * @param {{
 *   open:     boolean,
 *   onClose:  () => void,
 *   onSave:   (form: import("./UseServiceForm").ServiceForm) => void,
 *   loading?: boolean,
 * }} props
 */
export function EditServiceModal({ open, onClose, onSave, loading = false }) {
  const { fg, bg, border, main, status: s } = useColor();
  const { form, errors, set, validate, reset } = useServiceForm();

  const statusDot = {
    available: s?.success?.primary ?? main.success,
    unavailable: s?.error?.primary ?? main.error,
    maintenance: s?.warning?.primary ?? main.warning,
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: bg.secondary,
      "& fieldset": { borderColor: border.primary },
      "&:hover fieldset": { borderColor: fg.tertiary },
      "&.Mui-focused fieldset": { borderColor: main.primary },
    },
    "& input, & .MuiSelect-select": { color: fg.primary, fontSize: 14 },
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
      title="Edit Service"
      caption="Fill in the details to edit the service"
      round={8}
      width={{ xs: "94%", sm: "78%", md: "56%", lg: "42%", xl: "34%" }}
      py={5}
      px={5}
      actionSlot={
        <ServiceModalActions
          onCancel={handleClose}
          onSave={handleSave}
          loading={loading}
        />
      }
    >
      <Stack gap={2.5}>
        <NameField
          value={form.name}
          error={errors.name ?? ""}
          onChange={set("name")}
          inputSx={inputSx}
          fg={fg}
        />
        <CategoryStatusFields
          form={form}
          errors={errors}
          set={set}
          inputSx={inputSx}
          fg={fg}
          statusDot={statusDot}
        />
        <PriceDurationFields
          form={form}
          errors={errors}
          set={set}
          inputSx={inputSx}
          fg={fg}
        />
        <ProviderTagsFields
          form={form}
          errors={errors}
          set={set}
          inputSx={inputSx}
          fg={fg}
        />
      </Stack>
    </ModalLayout>
  );
}
