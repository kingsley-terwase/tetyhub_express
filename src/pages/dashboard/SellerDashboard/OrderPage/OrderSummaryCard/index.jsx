import { Stack } from "@mui/material";
import {
  ShoppingBagRegular,
  ClockRegular,
  VehicleShipRegular,
  MoneyRegular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";
import { StatCard } from "./StatCard";

/**
 * @param {{ orders: any[] }} props
 */
export function OrderSummaryCards({ orders }) {
  const { main, status: s } = useColor();

  const total = orders.length;
  const pending = orders.filter(
    (o) => o.status === "pending" || o.status === "processing",
  ).length;
  const shipped = orders.filter((o) => o.status === "shipped").length;
  const revenue = Math.round(
    orders
      .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
      .reduce((sum, o) => sum + o.total, 0),
  );

  const cards = [
    {
      label: "Total Orders",
      end: total,
      sub: "All time",
      icon: ShoppingBagRegular,
      iconColor: main.primary,
      iconBg: s?.primary?.secondary ?? "#dbeafe",
      delay: 0,
    },
    {
      label: "Pending / Processing",
      end: pending,
      sub: "Awaiting action",
      icon: ClockRegular,
      iconColor: s?.warning?.primary ?? main.warning,
      iconBg: s?.warning?.secondary ?? "#fef3c7",
      delay: 90,
    },
    {
      label: "Shipped",
      end: shipped,
      sub: "In transit",
      icon: VehicleShipRegular,
      iconColor: s?.info?.primary ?? "#3b82f6",
      iconBg: s?.info?.secondary ?? "#dbeafe",
      delay: 180,
    },
    {
      label: "Revenue",
      end: revenue,
      sub: "Excl. cancelled",
      icon: MoneyRegular,
      iconColor: s?.success?.primary ?? main.success,
      iconBg: s?.success?.secondary ?? "#d1fae5",
      delay: 270,
      prefix: "$",
    },
  ];

  return (
    <Stack direction="row" gap={spacingTokens.sm} flexWrap="wrap">
      {cards.map((c) => (
        <StatCard key={c.label} {...c} />
      ))}
    </Stack>
  );
}
