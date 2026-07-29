import { Stack } from "@mui/material";
import { useColor } from "@/contexts/color";
import { useCustomerForm } from "./UseForm";
import {
  CustomerIdentityFields,
  CustomerContactFields,
  CustomerClassifyFields,
} from "./CustomerFormFields";
import { CustomerModalActions } from "./CustomerModalActions";
import ModalLayout from "@/layouts/ModalLayout";

/**
 * @param {{
 *   open:     boolean,
 *   onClose:  () => void,
 *   onSave:   (form: import("./UseForm").CustomerForm) => void,
 *   loading?: boolean,
 * }} props
 */
export function CreateCustomerModal({
  open,
  onClose,
  onSave,
  loading = false,
}) {
  const { fg, bg, border, main } = useColor();
  const { form, errors, set, validate, reset } = useCustomerForm();

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
      title="Add New Customer"
      caption="Create a customer account manually"
      round={8}
      width={{ xs: "94%", sm: "78%", md: "56%", lg: "42%", xl: "34%" }}
      py={5}
      px={5}
      actionSlot={
        <CustomerModalActions
          onCancel={handleClose}
          onSave={handleSave}
          loading={loading}
        />
      }
    >
      <Stack gap={2}>
        <CustomerIdentityFields
          form={form}
          errors={errors}
          set={set}
          inputSx={inputSx}
          fg={fg}
        />
        <CustomerContactFields
          form={form}
          errors={errors}
          set={set}
          inputSx={inputSx}
          fg={fg}
        />
        <CustomerClassifyFields
          form={form}
          set={set}
          inputSx={inputSx}
          fg={fg}
        />
      </Stack>
    </ModalLayout>
  );
}
