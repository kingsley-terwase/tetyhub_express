// @ts-nocheck
import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import {
  ModalShell,
  ModalField,
  PrimaryButton,
  GhostButton,
} from "../../SellerUi";
import { radiusTokens } from "@/lib/theme";

const TYPES = ["Product", "Service"];
const CATEGORIES = [
  "Home services",
  "Electronics",
  "Fashion",
  "Design services",
  "Vehicles",
  "Handyman & repairs",
];

export default function ListingFormModal({
  open,
  onClose,
  initial,
  onSave,
  fg,
  bg,
  border,
  main,
}) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState({
    title: "",
    type: "Service",
    category: CATEGORIES[0],
    price: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    if (open)
      setForm(
        initial
          ? { ...initial }
          : {
              title: "",
              type: "Service",
              category: CATEGORIES[0],
              price: "",
              stock: "",
              description: "",
            },
      );
  }, [open, initial]);

  const canSave = form.title.trim() && form.price.trim();

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit listing" : "Add a new listing"}
      subtitle={isEdit ? form.title : "This goes live on TETYHUB once saved."}
      bg={bg}
      fg={fg}
      border={border}
      maxWidth={520}
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
                onClose?.();
              }}
              main={main}
            >
              {isEdit ? "Save changes" : "Publish listing"}
            </PrimaryButton>
          </Stack>
        </>
      }
    >
      <Stack direction="row" gap={0.8} sx={{ mb: 1.8 }}>
        {TYPES.map((t) => {
          const active = form.type === t;
          return (
            <Stack
              key={t}
              onClick={() => setForm({ ...form, type: t })}
              alignItems="center"
              sx={{
                flex: 1,
                py: 1,
                borderRadius: radiusTokens.sm ?? 8,
                border: `1.5px solid ${active ? main.primary : border.primary}`,
                color: active ? main.primary : fg.secondary,
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {t}
            </Stack>
          );
        })}
      </Stack>

      <ModalField
        label="Title"
        value={form.title}
        onChange={(v) => setForm({ ...form, title: v })}
        placeholder={
          form.type === "Service"
            ? "e.g. Deep home window cleaning"
            : "e.g. Wireless noise-cancelling headphones"
        }
        fg={fg}
        border={border}
      />

      <Stack gap={0.6} sx={{ mb: 1.6 }}>
        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
          Category
        </Typography>
        <Stack direction="row" gap={0.8} flexWrap="wrap">
          {CATEGORIES.map((c) => {
            const active = form.category === c;
            return (
              <Stack
                key={c}
                onClick={() => setForm({ ...form, category: c })}
                sx={{
                  px: 1.3,
                  py: 0.6,
                  borderRadius: 999,
                  border: `1px solid ${active ? main.primary : border.primary}`,
                  color: active ? main.primary : fg.secondary,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {c}
              </Stack>
            );
          })}
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={1.4}
        sx={{ minWidth: 0 }}
      >
        <Stack sx={{ flex: 1, minWidth: 0 }}>
          <ModalField
            label={form.type === "Service" ? "Starting price (₦)" : "Price (₦)"}
            value={form.price}
            onChange={(v) => setForm({ ...form, price: v })}
            placeholder="12000"
            fg={fg}
            border={border}
          />
        </Stack>
        {form.type === "Product" && (
          <Stack sx={{ flex: 1, minWidth: 0 }}>
            <ModalField
              label="Stock quantity"
              value={form.stock}
              onChange={(v) => setForm({ ...form, stock: v })}
              placeholder="20"
              fg={fg}
              border={border}
            />
          </Stack>
        )}
      </Stack>

      <ModalField
        label="Description"
        value={form.description}
        onChange={(v) => setForm({ ...form, description: v })}
        placeholder="What's included, turnaround time, and anything a buyer should know."
        multiline
        minRows={3}
        fg={fg}
        border={border}
      />
    </ModalShell>
  );
}
