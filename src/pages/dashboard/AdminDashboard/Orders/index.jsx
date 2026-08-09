// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Cart24Regular,
  ChevronRight24Regular,
  ArrowDownload24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import {
  PageHeader,
  SectionCard,
  StatusChip,
  PillTabs,
  SearchField,
  EmptyState,
  money,
} from "../data";

// ---- Mock orders — replace with a real paginated query ----
const ORDERS = [
  {
    id: "TH-402911",
    customer: "Amaka Obi",
    seller: "SparkleCo",
    items: "Window cleaning + oven add-on",
    amount: 16500,
    date: "6 Aug 2026",
    status: "completed",
  },
  {
    id: "TH-402910",
    customer: "Bayo Adewale",
    seller: "Studio Nine",
    items: "Logo & brand identity design",
    amount: 45000,
    date: "6 Aug 2026",
    status: "in_progress",
  },
  {
    id: "TH-402909",
    customer: "Chiamaka Nwosu",
    seller: "FixIt Pros",
    items: "Plumbing repair",
    amount: 8000,
    date: "5 Aug 2026",
    status: "disputed",
  },
  {
    id: "TH-402908",
    customer: "David Eze",
    seller: "GreenThumb",
    items: "Garden landscaping",
    amount: 22000,
    date: "5 Aug 2026",
    status: "confirmed",
  },
  {
    id: "TH-402907",
    customer: "Fatima Bello",
    seller: "Kaduna Kitchens",
    items: "Small chops (100 pcs)",
    amount: 30000,
    date: "4 Aug 2026",
    status: "completed",
  },
  {
    id: "TH-402906",
    customer: "Grace Effiong",
    seller: "Naija Cleaners",
    items: "Full apartment deep clean",
    amount: 18000,
    date: "4 Aug 2026",
    status: "cancelled",
  },
  {
    id: "TH-402905",
    customer: "Ibrahim Sule",
    seller: "QuickFix Autos",
    items: "Brake pad replacement",
    amount: 26500,
    date: "3 Aug 2026",
    status: "pending",
  },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "in_progress", label: "In progress" },
  { key: "completed", label: "Completed" },
  { key: "disputed", label: "Disputed" },
];

export default function AdminOrdersPage() {
  const { fg, border, main } = useColor();
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  const gmv = useMemo(() => ORDERS.reduce((s, o) => s + o.amount, 0), []);
  const disputes = ORDERS.filter((o) => o.status === "disputed").length;
  const avg = Math.round(gmv / ORDERS.length);

  const filtered = ORDERS.filter(
    (o) =>
      (tab === "all" || o.status === tab) &&
      (o.customer.toLowerCase().includes(query.toLowerCase()) ||
        o.seller.toLowerCase().includes(query.toLowerCase()) ||
        o.id.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <Box>
      <PageHeader
        title="Orders"
        subtitle="Every booking placed across the platform."
        action={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={0.7}
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.sm ?? 8,
              px: 1.6,
              py: 1,
              cursor: "pointer",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <ArrowDownload24Regular
              style={{ fontSize: 15, color: fg.secondary }}
            />
            <Typography
              sx={{ fontSize: 12.5, fontWeight: 700, color: fg.secondary }}
            >
              Export CSV
            </Typography>
          </Stack>
        }
      />

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2.4 }}>
        <StatBlock
          label="Gross merchandise value"
          value={money(gmv)}
          fg={fg}
          border={border}
        />
        <StatBlock
          label="Average order value"
          value={money(avg)}
          fg={fg}
          border={border}
        />
        <StatBlock
          label="Open disputes"
          value={String(disputes)}
          fg={fg}
          border={border}
          accent={disputes > 0 ? "#F85149" : undefined}
        />
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        gap={1.2}
        sx={{ mb: 2 }}
      >
        <PillTabs tabs={TABS} value={tab} onChange={setTab} />
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search order, customer, seller"
        />
      </Stack>

      <SectionCard noPadding>
        {filtered.length === 0 ? (
          <EmptyState
            icon={Cart24Regular}
            title="No orders match"
            subtitle="Try a different filter or search term."
          />
        ) : (
          <>
            {/* Desktop table header */}
            <Stack
              direction="row"
              sx={{
                display: { xs: "none", md: "flex" },
                px: 2.4,
                py: 1.2,
                borderBottom: `1px solid ${border.primary}`,
              }}
            >
              <HeadCell w="16%">Order</HeadCell>
              <HeadCell w="20%">Customer</HeadCell>
              <HeadCell w="18%">Seller</HeadCell>
              <HeadCell w="20%">Items</HeadCell>
              <HeadCell w="12%">Amount</HeadCell>
              <HeadCell w="14%">Status</HeadCell>
            </Stack>

            <Stack>
              {filtered.map((o) => (
                <Stack
                  key={o.id}
                  direction={{ xs: "column", md: "row" }}
                  alignItems={{ xs: "flex-start", md: "center" }}
                  gap={{ xs: 0.6, md: 0 }}
                  sx={{
                    px: { xs: 1.75, sm: 2.4 },
                    py: 1.5,
                    borderBottom: `1px solid ${border.primary}`,
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.02)" },
                    "&:last-of-type": { borderBottom: "none" },
                  }}
                >
                  <Cell w="16%">
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                    >
                      {o.id}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: 11,
                        color: fg.tertiary,
                        display: { xs: "block", md: "none" },
                      }}
                    >
                      {o.date}
                    </Typography>
                  </Cell>
                  <Cell w="20%" label="Customer" fg={fg}>
                    <Typography sx={{ fontSize: 13, color: fg.primary }}>
                      {o.customer}
                    </Typography>
                  </Cell>
                  <Cell w="18%" label="Seller" fg={fg}>
                    <Typography sx={{ fontSize: 13, color: fg.secondary }}>
                      {o.seller}
                    </Typography>
                  </Cell>
                  <Cell w="20%" label="Items" fg={fg}>
                    <Typography
                      sx={{ fontSize: 12.5, color: fg.secondary }}
                      noWrap
                    >
                      {o.items}
                    </Typography>
                  </Cell>
                  <Cell w="12%" label="Amount" fg={fg}>
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                    >
                      {money(o.amount)}
                    </Typography>
                  </Cell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      width: { xs: "100%", md: "14%" },
                      mt: { xs: 0.6, md: 0 },
                    }}
                  >
                    <StatusChip status={o.status} size="sm" />
                    <ChevronRight24Regular
                      style={{
                        fontSize: 16,
                        color: fg.tertiary,
                        display: "inline-block",
                      }}
                      className="desktop-only"
                    />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </>
        )}
      </SectionCard>
    </Box>
  );
}

function StatBlock({ label, value, fg, border, accent }) {
  return (
    <Box
      sx={{
        flex: 1,
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        px: 2,
        py: 1.6,
      }}
    >
      <Typography sx={{ fontSize: 12, color: fg.tertiary, mb: 0.6 }}>
        {label}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Syne",
          fontWeight: 700,
          fontSize: 19,
          color: accent ?? fg.primary,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function HeadCell({ children, w }) {
  return (
    <Box sx={{ width: w, flexShrink: 0 }}>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          color: "text.secondary",
          opacity: 0.6,
          textTransform: "uppercase",
          letterSpacing: 0.4,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

function Cell({ children, w, label, fg }) {
  return (
    <Box sx={{ width: { xs: "100%", md: w }, flexShrink: 0 }}>
      {label && (
        <Typography
          sx={{
            fontSize: 10,
            color: fg.tertiary,
            display: { xs: "block", md: "none" },
            mb: 0.1,
          }}
        >
          {label}
        </Typography>
      )}
      {children}
    </Box>
  );
}
