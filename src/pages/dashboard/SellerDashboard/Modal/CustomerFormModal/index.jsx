// @ts-nocheck
import { useState } from "react";
import { Stack } from "@mui/material";
import {
  ModalShell,
  ModalField,
  PrimaryButton,
  GhostButton,
} from "../../SellerUi";

export default function CustomerFormModal({
  open,
  onClose,
  onSave,
  fg,
  bg,
  border,
  main,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
  });
  const canSave = form.name.trim() && form.email.trim();

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Add customer"
      subtitle="Keep track of a buyer even before their first order."
      bg={bg}
      fg={fg}
      border={border}
      maxWidth={440}
      footer={
        <>
          <Stack sx={{ flex: 1 }}>
            <GhostButton onClick={onClose} fg={fg} border={border} main={main}>
              Cancel
            </GhostButton>
          </Stack>
          <Stack sx={{ flex: 1 }}>
            <PrimaryButton
              disabled={!canSave}
              onClick={() => {
                onSave?.(form);
                setForm({ name: "", email: "", phone: "", country: "" });
                onClose?.();
              }}
              main={main}
            >
              Add customer
            </PrimaryButton>
          </Stack>
        </>
      }
    >
      <ModalField
        label="Full name"
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
        placeholder="Ada Okafor"
        fg={fg}
        border={border}
      />
      <ModalField
        label="Email"
        value={form.email}
        onChange={(v) => setForm({ ...form, email: v })}
        placeholder="ada@email.com"
        fg={fg}
        border={border}
      />
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={1.4}
        sx={{ minWidth: 0 }}
      >
        <Stack sx={{ flex: 1, minWidth: 0 }}>
          <ModalField
            label="Phone"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
            placeholder="080X XXX XXXX"
            fg={fg}
            border={border}
          />
        </Stack>
        <Stack sx={{ flex: 1, minWidth: 0 }}>
          <ModalField
            label="Country"
            value={form.country}
            onChange={(v) => setForm({ ...form, country: v })}
            placeholder="Nigeria"
            fg={fg}
            border={border}
          />
        </Stack>
      </Stack>
    </ModalShell>
  );
}
