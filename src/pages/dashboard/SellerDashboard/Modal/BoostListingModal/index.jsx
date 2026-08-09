// @ts-nocheck
import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { ModalShell, PrimaryButton, GhostButton, money } from "../../SellerUi";
import { radiusTokens } from "@/lib/theme";

const PLANS = [
  { key: "3d", label: "3 days", price: 2500 },
  { key: "7d", label: "7 days", price: 5000 },
  { key: "14d", label: "14 days", price: 9000 },
];

export default function BoostListingModal({
  open,
  onClose,
  listing,
  onConfirm,
  fg,
  bg,
  border,
  main,
}) {
  const [plan, setPlan] = useState("7d");
  const selected = PLANS.find((p) => p.key === plan);

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Boost this listing"
      subtitle={listing?.title}
      bg={bg}
      fg={fg}
      border={border}
      maxWidth={420}
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
                onConfirm?.(listing, selected);
                onClose?.();
              }}
              main={main}
            >
              Boost for {money(selected.price)}
            </PrimaryButton>
          </Stack>
        </>
      }
    >
      <Typography sx={{ fontSize: 12.5, color: fg.tertiary, mb: 1.6 }}>
        Boosted listings appear higher in search and category browsing.
      </Typography>
      <Stack gap={0.9}>
        {PLANS.map((p) => {
          const active = plan === p.key;
          return (
            <Stack
              key={p.key}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => setPlan(p.key)}
              sx={{
                border: `1.5px solid ${active ? main.primary : border.primary}`,
                backgroundColor: active ? `${main.primary}0a` : "transparent",
                borderRadius: radiusTokens.sm ?? 8,
                px: 1.6,
                py: 1.2,
                cursor: "pointer",
              }}
            >
              <Typography
                sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
              >
                {p.label}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: active ? main.primary : fg.secondary,
                }}
              >
                {money(p.price)}
              </Typography>
            </Stack>
          );
        })}
      </Stack>
    </ModalShell>
  );
}
