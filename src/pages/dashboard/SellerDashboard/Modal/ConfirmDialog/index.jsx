// @ts-nocheck
import { Stack, Typography } from "@mui/material";
import { ModalShell, PrimaryButton, GhostButton } from "../../SellerUi";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  danger,
  fg,
  bg,
  border,
  main,
}) {
  const accent = danger ? { primary: "#F04F4F" } : main;
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={title}
      bg={bg}
      fg={fg}
      border={border}
      maxWidth={380}
      footer={
        <>
          <Stack sx={{ flex: 1 }}>
            <GhostButton onClick={onClose} fg={fg} border={border} main={main}>
              Cancel
            </GhostButton>
          </Stack>
          <Stack sx={{ flex: 1 }}>
            <PrimaryButton
              onClick={() => {
                onConfirm?.();
                onClose?.();
              }}
              main={accent}
            >
              {confirmLabel}
            </PrimaryButton>
          </Stack>
        </>
      }
    >
      <Typography sx={{ fontSize: 13.5, color: fg.secondary, lineHeight: 1.6 }}>
        {message}
      </Typography>
    </ModalShell>
  );
}
