import { Table, TableHead, TableBody } from "@/components/ui";
import {
  CalendarClockRegular,
  CircleRegular,
  DiversityRegular,
  MoneyRegular,
  PersonRegular,
  CheckboxUncheckedRegular,
  CheckboxCheckedFilled,
  ShoppingBagRegular,
} from "@fluentui/react-icons";
import { TableCell, TableRow, Checkbox, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";
import { UserCell, DueDateCell, IdCell } from "./lib";
import { useState } from "react";
import { StatusChip } from "@/components/shared";

/**
 * @typedef {"pending" | "processing" | "completed" | "cancelled"} OrderStatus
 *
 * @typedef {{
 *   id:          string,
 *   order:     string,
 *   description: string,
 *   dueDate:     string,
 *   amount:      string,
 *   user:      string,
 *   status:      OrderStatus,
 * }} Order
 *
 * @typedef {{
 *   label: string,
 *   icon?: import("react").ComponentType | null,
 * }} Column
 */

/** @type {Column[]} */

/** @type {Order[]} */
const orders = [
  {
    id: "4YBJ6",
    order: "📱 Smartphone",
    description: "A handheld device used for calling, etc.",
    dueDate: "Today",
    amount: "$700",
    user: "Peter Pan",
    status: "pending",
  },
  {
    id: "9B112",
    order: "💻 Laptop",
    description: "A portable computer designed for work. etc",
    dueDate: "Today",
    amount: "$1200",
    user: "Juliet Romeo",
    status: "completed",
  },
  {
    id: "5KD88",
    order: "🎧 Wireless Headphones",
    description: "Bluetooth-enabled headphones.",
    dueDate: "Today",
    amount: "$400",
    user: "Viju Mike",
    status: "cancelled",
  },
  {
    id: "7MN45",
    order: "👟 Running Shoes",
    description: "Lightweight, cushioned footwear",
    dueDate: "Tomorrow",
    amount: "$1500",
    user: "Sarah Johnson",
    status: "pending",
  },
  {
    id: "3PQ12",
    order: "⌚ Smartwatch",
    description: "A wearable device that tracks fitness",
    dueDate: "Next Week",
    amount: "$2000",
    user: "Ahmed Hassan",
    status: "cancelled",
  },
  {
    id: "8RS67",
    order: "🧲 Refrigerator",
    description: "makes water cool.",
    dueDate: "Next Week",
    amount: "$2500",
    user: "Maria Garcia",
    status: "completed",
  },
];

/** @type {Column[]} */
const columns = [
  { label: "", icon: null },
  { label: "ID" },
  { label: "Order", icon: ShoppingBagRegular },
  { label: "Description", icon: DiversityRegular },
  { label: "Due Date", icon: CalendarClockRegular },
  { label: "Amount", icon: MoneyRegular },
  { label: "User", icon: PersonRegular },
  { label: "Status", icon: CircleRegular },
];

/** @type {string[]} */
const avatarColors = [
  "#6366f1",
  "#ec4899",
  "#14b8a6",
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
];

export default function Orders() {
  const { bg, fg, main, border } = useColor();

  /** @type {[string[], import("react").Dispatch<import("react").SetStateAction<string[]>>]} */
  // @ts-ignore
  const [selected, setSelected] = useState([]);

  /** @param {string} id */
  const toggleOne = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <Table>
      <TableHead
        // @ts-ignore
        columns={columns}
      />

      <TableBody loading={false} count={orders.length} span={columns.length}>
        {orders.map((row, i) => {
          const isSelected = selected.includes(row.id);

          return (
            <TableRow
              key={row.id}
              selected={isSelected}
              onClick={() => toggleOne(row.id)}
              sx={{
                cursor: "pointer",
                transition: "background .15s",
                borderBottom: `1px solid ${border.primary}`,
                "&:hover": { backgroundColor: bg.secondary },
                "&.Mui-selected": { backgroundColor: bg.secondary },
              }}
            >
              <TableCell padding="checkbox" sx={{ pl: spacingTokens.md }}>
                <Checkbox
                  size="small"
                  checked={isSelected}
                  onChange={() => toggleOne(row.id)}
                  onClick={(e) => e.stopPropagation()}
                  icon={
                    <CheckboxUncheckedRegular
                      fontSize={18}
                      color={fg.tertiary}
                    />
                  }
                  checkedIcon={
                    <CheckboxCheckedFilled fontSize={18} color={main.primary} />
                  }
                />
              </TableCell>

              <TableCell>
                <IdCell id={row.id} bg={bg.tertiary} fg={fg.secondary} />
              </TableCell>

              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: fg.primary }}
                >
                  {row.order}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body2" sx={{ color: fg.secondary }}>
                  {row.description}
                </Typography>
              </TableCell>

              <TableCell>
                <DueDateCell date={row.dueDate} main={main} />
              </TableCell>

              <TableCell>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ color: fg.primary }}
                >
                  {row.amount}
                </Typography>
              </TableCell>

              <TableCell>
                <UserCell
                  name={row.user}
                  color={avatarColors[i % avatarColors.length]}
                />
              </TableCell>

              <TableCell>
                <StatusChip
                  // @ts-ignore
                  status={row.status}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
