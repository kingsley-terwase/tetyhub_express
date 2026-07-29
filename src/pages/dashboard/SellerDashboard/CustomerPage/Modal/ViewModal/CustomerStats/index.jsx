// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import {
  MoneyRegular,
  BoxRegular,
  CalendarRegular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";

/** @param {{ customer: import("../lib").Customer }} props */
export function CustomerStats({ customer }) {
  const { fg, bg, border } = useColor();

  const stats = [
    {
      icon: <MoneyRegular fontSize={16} />,
      label: "Total Spend",
      value: `$${customer.spent.toLocaleString()}`,
      accent: "#6366f1",
    },
    {
      icon: <BoxRegular fontSize={16} />,
      label: "Orders",
      value: customer.orders,
      accent: "#10b981",
    },
    {
      icon: <CalendarRegular fontSize={16} />,
      label: "Member Since",
      value: customer.joined,
      accent: "#f59e0b",
    },
  ];

  return (
    <Stack direction="row" gap={1.5} sx={{ px: 3, pt: 2.5, pb: 0.5 }}>
      {stats.map(({ icon, label, value, accent }) => (
        <Box
          key={label}
          flex={1}
          sx={{
            p: 1.8,
            borderRadius: "12px",
            border: `1px solid ${border.primary}`,
            backgroundColor: bg.secondary,
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: accent,
              borderRadius: "12px 12px 0 0",
            },
          }}
        >
          <Stack direction="row" alignItems="center" gap={0.8} mb={0.8}>
            <Box sx={{ color: accent, display: "flex" }}>{icon}</Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: fg.tertiary,
              }}
            >
              {label}
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: fg.primary,
              letterSpacing: "-0.5px",
            }}
          >
            {value}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
