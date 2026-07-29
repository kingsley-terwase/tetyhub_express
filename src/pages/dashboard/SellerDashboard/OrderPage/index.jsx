import { useState, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Table, TableHead, TableBody } from "@/components/ui";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";

import { orders, columns, avatarColors } from "./lib.js";
import { AddRegular, ArrowDownloadRegular } from "@fluentui/react-icons";

import { usePagination } from "@/lib/pagination.js";
import { OrderSummaryCards } from "./OrderSummaryCard/index.jsx";
import { OrderRow } from "./OrderRow/index.jsx";
import { TablePagination } from "@/components/shared/index.js";
import FilterOrder from "./FilterOrder/index.jsx";
import { useAuthStore } from "@/store/auth.js";
import { getRoleKey, getRoleBasePath } from "@/lib/roles.js";

export default function OrderPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();

  const { permission } = useAuthStore.getState();
  // @ts-ignore
  const role = getRoleKey(permission);
  const isSeller = role === "seller";
  // @ts-ignore
  const base = getRoleBasePath(permission);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [risk, setRisk] = useState("all");
  const [selected, setSelected] = useState([]);

  /** toggle select */
  const toggleOne = (/** @type {string} */ id) =>
    // @ts-ignore
    setSelected((p) =>
      // @ts-ignore
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  /** filtering */
  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.customer.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "all" || o.status === status;
      const matchRisk = risk === "all" || o.risk === risk;

      return matchSearch && matchStatus && matchRisk;
    });
  }, [search, status, risk]);

  const pg = usePagination({
    data: filtered,
    defaultPerPage: 5,
  });

  return (
    <Stack gap={spacingTokens.md}>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ color: fg.primary }}>
            Orders
          </Typography>
          <Typography variant="caption" sx={{ color: fg.tertiary }}>
            {filtered.length} order{filtered.length !== 1 ? "s" : ""} found
          </Typography>
        </Box>

        {isSeller && (
          <Stack direction="row" gap={1}>
            <Stack
              direction="row"
              alignItems="center"
              gap={0.6}
              sx={{
                px: 1.5,
                py: 0.8,
                borderRadius: 1.5,
                cursor: "pointer",
                border: `1px solid ${border.primary}`,
                backgroundColor: bg.secondary,
                "&:hover": { backgroundColor: bg.tertiary },
              }}
            >
              <ArrowDownloadRegular fontSize={16} color={fg.secondary} />
              <Typography
                sx={{ fontSize: 13, fontWeight: 600, color: fg.secondary }}
              >
                Export
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              gap={0.6}
              onClick={() => navigate(`${base}/create-order`)}
              sx={{
                px: 1.5,
                py: 0.8,
                borderRadius: 1.5,
                cursor: "pointer",
                backgroundColor: main.primary,
                "&:hover": { opacity: 0.9 },
              }}
            >
              <AddRegular fontSize={16} color="#fff" />
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                Create Order
              </Typography>
            </Stack>
          </Stack>
        )}
      </Stack>

      <OrderSummaryCards orders={orders} />

      <Box
        sx={{
          borderRadius: radius[8],
          border: `1px solid ${border.primary}`,
          backgroundColor: bg.secondary,
          overflow: "hidden",
        }}
      >
        <FilterOrder
          // @ts-ignore
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          risk={risk}
          setRisk={setRisk}
          selected={selected}
          onResetPage={() => pg.setPage(1)}
        />

        <Table>
          <TableHead columns={columns} />
          <TableBody
            loading={false}
            count={pg.paginated.length}
            span={columns.length}
          >
            {pg.paginated.map((row, i) => (
              <OrderRow
                key={row.id}
                row={row}
                avatarColor={avatarColors[i % avatarColors.length]}
                // @ts-ignore
                selected={selected.includes(row.id)}
                onSelect={() => toggleOne(row.id)}
                onPrint={(id) => console.log("print", id)}
              />
            ))}
          </TableBody>
        </Table>

        <TablePagination {...pg} total={filtered.length} />
      </Box>
    </Stack>
  );
}
