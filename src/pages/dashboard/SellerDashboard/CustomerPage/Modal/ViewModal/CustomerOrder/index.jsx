// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";

const ORDER_STATUS = {
  completed: { bg: "#d1fae5", fg: "#065f46" },
  pending: { bg: "#fef9c3", fg: "#854d0e" },
  refunded: { bg: "#fee2e2", fg: "#991b1b" },
};

/** @param {{ order: import("../lib").CustomerOrder }} props */
function OrderRow({ order }) {
  const { fg, bg, border } = useColor();
  const s = ORDER_STATUS[order.status] ?? ORDER_STATUS.pending;

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        px: 1.5,
        py: 1.2,
        borderRadius: "10px",
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        gap: 1.5,
      }}
    >
      <Box flex={1} minWidth={0}>
        <Typography
          sx={{ fontSize: 13, fontWeight: 600, color: fg.primary, mb: 0.2 }}
        >
          {order.item}
        </Typography>
        <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
          {order.date} · #{order.id}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}>
        ${order.amount.toLocaleString()}
      </Typography>
      <Box
        sx={{
          px: 1,
          py: 0.3,
          borderRadius: "6px",
          backgroundColor: s.bg,
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: 10,
            fontWeight: 700,
            color: s.fg,
            textTransform: "capitalize",
          }}
        >
          {order.status}
        </Typography>
      </Box>
    </Stack>
  );
}

/** @param {{ customer: import("../lib").Customer }} props */
export function CustomerOrders({ customer }) {
  const { fg } = useColor();
  const orders = customer.orders ?? [];

  if (!orders.length)
    return (
      <Box sx={{ pt: 4, textAlign: "center" }}>
        <Typography sx={{ fontSize: 13, color: fg.tertiary }}>
          No orders found.
        </Typography>
      </Box>
    );

  return (
    <Stack gap={1} pt={2}>
      {orders.map((o) => (
        <OrderRow key={o.id} order={o} />
      ))}
    </Stack>
  );
}
