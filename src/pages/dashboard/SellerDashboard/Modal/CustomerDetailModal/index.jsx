// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { Mail24Regular } from "@fluentui/react-icons";
import {
  ModalShell,
  PrimaryButton,
  GhostButton,
  Pill,
  Avatar,
  money,
} from "../../SellerUi";
import { radiusTokens } from "@/lib/theme";

export default function CustomerDetailModal({
  open,
  onClose,
  customer,
  onMessage,
  fg,
  bg,
  border,
  main,
}) {
  if (!customer) return null;

  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title={customer.name}
      subtitle={customer.email}
      bg={bg}
      fg={fg}
      border={border}
      maxWidth={460}
      footer={
        <>
          <Stack sx={{ flex: 1 }}>
            <GhostButton onClick={onClose} fg={fg} border={border} main={main}>
              Close
            </GhostButton>
          </Stack>
          <Stack sx={{ flex: 1 }}>
            <PrimaryButton
              icon={Mail24Regular}
              onClick={() => {
                onMessage?.(customer);
                onClose?.();
              }}
              main={main}
            >
              Message
            </PrimaryButton>
          </Stack>
        </>
      }
    >
      <Stack direction="row" alignItems="center" gap={1.4} sx={{ mb: 2.2 }}>
        <Avatar name={customer.name} size={48} />
        <Stack sx={{ minWidth: 0 }}>
          <Typography
            noWrap
            sx={{ fontSize: 15, fontWeight: 800, color: fg.primary }}
          >
            {customer.name}
          </Typography>
          <Stack direction="row" gap={0.7} sx={{ mt: 0.4 }}>
            <Pill label={customer.tier} tone="brand" />
            <Pill
              label={customer.segment}
              tone={
                customer.segment === "At risk"
                  ? "danger"
                  : customer.segment === "Vip"
                    ? "brand"
                    : "info"
              }
            />
          </Stack>
        </Stack>
      </Stack>

      <Box
        sx={{
          border: `1px solid ${border.primary}`,
          borderRadius: radiusTokens.sm ?? 8,
          p: 1.6,
          mb: 1.8,
        }}
      >
        <StatRow label="Total orders" value={customer.orders} fg={fg} />
        <StatRow label="Lifetime spend" value={money(customer.spent)} fg={fg} />
        <StatRow label="Country" value={customer.country} fg={fg} />
        <StatRow label="Phone" value={customer.phone || "—"} fg={fg} />
      </Box>

      <Typography
        sx={{ fontSize: 12, fontWeight: 700, color: fg.tertiary, mb: 1 }}
      >
        RECENT ORDERS
      </Typography>
      <Stack gap={0.9}>
        {(customer.recentOrders || []).map((o) => (
          <Stack
            key={o.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack sx={{ minWidth: 0 }}>
              <Typography
                noWrap
                sx={{ fontSize: 12.5, fontWeight: 600, color: fg.primary }}
              >
                {o.item}
              </Typography>
              <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
                {o.date}
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontSize: 12.5,
                fontWeight: 700,
                color: fg.primary,
                flexShrink: 0,
              }}
            >
              {money(o.total)}
            </Typography>
          </Stack>
        ))}
        {!(customer.recentOrders || []).length && (
          <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>
            No orders yet.
          </Typography>
        )}
      </Stack>
    </ModalShell>
  );
}

function StatRow({ label, value, fg }) {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.5 }}>
      <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
        {value}
      </Typography>
    </Stack>
  );
}
