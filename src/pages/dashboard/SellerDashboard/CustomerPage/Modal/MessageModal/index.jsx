import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { useMessageForm } from "./UseFormMessage";
import {
  MessageChannelField,
  MessageSubjectField,
  MessageBodyField,
} from "./MsgFormFields";
import { MessageModalActions } from "./MsgModalActions";
import { ModalLayout } from "@/layouts";

/**
 * @param {{
 *   open:       boolean,
 *   onClose:    () => void,
 *   onSend:     (form: import("./UseFormMessage").MessageForm) => void,
 *   customer:   { name: string, email: string, avatar: string } | null,
 *   loading?:   boolean,
 * }} props
 */
export function MessageCustomerModal({
  open,
  onClose,
  onSend,
  customer,
  loading = false,
}) {
  const { fg, bg, border, main } = useColor();
  const { form, errors, set, validate, reset } = useMessageForm();

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

  const handleSend = () => {
    if (!validate()) return;
    onSend(form);
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
      title="Message Customer"
      caption="Send a direct message to this customer"
      round={8}
      width={{ xs: "94%", sm: "78%", md: "56%", lg: "42%", xl: "34%" }}
      py={5}
      px={5}
      actionSlot={
        <MessageModalActions
          onCancel={handleClose}
          onSend={handleSend}
          loading={loading}
          channel={form.channel}
        />
      }
    >
      <Stack gap={2}>
        {customer && (
          <Stack
            direction="row"
            alignItems="center"
            gap={1.5}
            sx={{
              p: 1.2,
              borderRadius: 1.5,
              backgroundColor: bg.secondary,
              border: `1px solid ${border.primary}`,
            }}
          >
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                backgroundColor: main.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
                {customer.avatar}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{ color: fg.primary }}
              >
                {customer.name}
              </Typography>
              <Typography variant="caption" sx={{ color: fg.tertiary }}>
                {customer.email}
              </Typography>
            </Box>
            <Box
              sx={{
                ml: "auto",
                px: 1,
                py: 0.3,
                borderRadius: 1,
                backgroundColor: `${main.primary}18`,
              }}
            >
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{ color: main.primary }}
              >
                Recipient
              </Typography>
            </Box>
          </Stack>
        )}

        <MessageChannelField
          value={form.channel}
          onChange={set("channel")}
          inputSx={inputSx}
          fg={fg}
        />
        <MessageSubjectField
          value={form.subject}
          error={errors.subject ?? ""}
          onChange={set("subject")}
          inputSx={inputSx}
          fg={fg}
        />
        <MessageBodyField
          value={form.message}
          error={errors.message ?? ""}
          onChange={set("message")}
          inputSx={inputSx}
          fg={fg}
          channel={form.channel}
        />
      </Stack>
    </ModalLayout>
  );
}
