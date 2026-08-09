// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Person24Regular,
  Open24Regular,
  PersonProhibited24Regular,
  CheckmarkCircle24Regular,
  Mail24Regular,
  Call24Regular,
  Location24Regular,
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
  Avatar,
  StatBlock,
  RowAction,
  SidePanel,
  PanelSectionTitle,
  DetailRow,
  money,
} from "../data";

const BUYERS = [
  {
    id: "b1",
    name: "Amaka Obi",
    email: "amaka.o@gmail.com",
    phone: "0803 118 2290",
    city: "Lagos",
    joined: "Feb 2025",
    orders: 12,
    spent: 184000,
    status: "active",
    recentOrders: [
      { id: "TH-402911", amount: 16500, status: "completed" },
      { id: "TH-402340", amount: 22000, status: "completed" },
    ],
  },
  {
    id: "b2",
    name: "Bayo Adewale",
    email: "bayo.a@yahoo.com",
    phone: "0705 990 1187",
    city: "Ibadan",
    joined: "May 2025",
    orders: 4,
    spent: 92500,
    status: "active",
    recentOrders: [{ id: "TH-402910", amount: 45000, status: "in_progress" }],
  },
  {
    id: "b3",
    name: "Chiamaka Nwosu",
    email: "chi.nwosu@gmail.com",
    phone: "0812 550 6674",
    city: "Lagos",
    joined: "Jan 2025",
    orders: 21,
    spent: 340000,
    status: "flagged",
    recentOrders: [
      { id: "TH-402909", amount: 8000, status: "disputed" },
      { id: "TH-402611", amount: 12500, status: "completed" },
    ],
  },
  {
    id: "b4",
    name: "David Eze",
    email: "d.eze@outlook.com",
    phone: "0906 220 4471",
    city: "Abuja",
    joined: "Sep 2025",
    orders: 2,
    spent: 22000,
    status: "active",
    recentOrders: [{ id: "TH-402908", amount: 22000, status: "confirmed" }],
  },
  {
    id: "b5",
    name: "Halima Yusuf",
    email: "halima.y@gmail.com",
    phone: "0701 883 9012",
    city: "Kano",
    joined: "Mar 2024",
    orders: 47,
    spent: 1120000,
    status: "active",
    recentOrders: [
      { id: "TH-402500", amount: 34000, status: "completed" },
      { id: "TH-402200", amount: 61000, status: "completed" },
    ],
  },
  {
    id: "b6",
    name: "Emeka Obi",
    email: "emeka.obi90@gmail.com",
    phone: "0813 442 0091",
    city: "Enugu",
    joined: "Jul 2025",
    orders: 1,
    spent: 8000,
    status: "banned",
    recentOrders: [{ id: "TH-401902", amount: 8000, status: "cancelled" }],
  },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "flagged", label: "Flagged" },
  { key: "banned", label: "Banned" },
];

export default function BuyersDirectoryPage() {
  const { fg, border } = useColor();
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [buyers, setBuyers] = useState(BUYERS);
  const [selected, setSelected] = useState(null);

  const counts = useMemo(
    () => ({
      all: buyers.length,
      active: buyers.filter((b) => b.status === "active").length,
      flagged: buyers.filter((b) => b.status === "flagged").length,
      banned: buyers.filter((b) => b.status === "banned").length,
    }),
    [buyers],
  );

  const totalSpend = buyers.reduce((s, b) => s + b.spent, 0);

  const filtered = buyers.filter(
    (b) =>
      (tab === "all" || b.status === tab) &&
      (b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.email.toLowerCase().includes(query.toLowerCase())),
  );

  const setStatus = (id, status) => {
    setBuyers((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    setSelected((prev) =>
      prev && prev.id === id ? { ...prev, status } : prev,
    );
  };

  return (
    <Box>
      <PageHeader
        title="Buyers Directory"
        subtitle="Customer accounts across the platform."
      />

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2.4 }}>
        <StatBlock label="Total buyers" value={String(buyers.length)} />
        <StatBlock label="Lifetime spend" value={money(totalSpend)} />
        <StatBlock
          label="Flagged / banned"
          value={String(counts.flagged + counts.banned)}
          accent={counts.flagged + counts.banned > 0 ? "#F85149" : undefined}
        />
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        gap={1.2}
        sx={{ mb: 2 }}
      >
        <PillTabs tabs={TABS} value={tab} onChange={setTab} counts={counts} />
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search name or email"
        />
      </Stack>

      <SectionCard noPadding>
        {filtered.length === 0 ? (
          <EmptyState
            icon={Person24Regular}
            title="No buyers match"
            subtitle="Try a different filter or search."
          />
        ) : (
          <Stack>
            {filtered.map((b) => (
              <Stack
                key={b.id}
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "stretch", md: "center" }}
                gap={{ xs: 1.2, md: 1.6 }}
                sx={{
                  px: { xs: 1.75, sm: 2.4 },
                  py: 1.6,
                  borderBottom: `1px solid ${border.primary}`,
                  "&:last-of-type": { borderBottom: "none" },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1.2}
                  sx={{ flex: "1 1 34%", minWidth: 0 }}
                >
                  <Avatar name={b.name} />
                  <Stack sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                      noWrap
                    >
                      {b.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 11.5, color: fg.tertiary }}
                      noWrap
                    >
                      {b.email}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  gap={2.4}
                  sx={{ flex: "1 1 36%" }}
                  flexWrap="wrap"
                >
                  <MiniStat label="Joined" value={b.joined} fg={fg} />
                  <MiniStat label="Orders" value={b.orders} fg={fg} />
                  <MiniStat
                    label="Total spent"
                    value={money(b.spent)}
                    fg={fg}
                  />
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                  sx={{ flex: "1 1 22%" }}
                >
                  <StatusChip
                    status={
                      b.status === "active"
                        ? "approved"
                        : b.status === "flagged"
                          ? "flagged"
                          : "rejected"
                    }
                    size="sm"
                  />
                  <Stack direction="row" gap={0.6}>
                    <RowAction
                      icon={Open24Regular}
                      label="View"
                      onClick={() => setSelected(b)}
                    />
                    {b.status !== "banned" ? (
                      <RowAction
                        icon={PersonProhibited24Regular}
                        label="Ban"
                        tone="danger"
                        onClick={() => setStatus(b.id, "banned")}
                      />
                    ) : (
                      <RowAction
                        icon={CheckmarkCircle24Regular}
                        label="Unban"
                        tone="primary"
                        onClick={() => setStatus(b.id, "active")}
                      />
                    )}
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}
      </SectionCard>

      <SidePanel
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        subtitle={selected?.email}
        avatar={selected && <Avatar name={selected.name} size={40} />}
        footer={
          selected && (
            <Stack direction="row" gap={0.8}>
              {selected.status !== "banned" ? (
                <RowAction
                  icon={PersonProhibited24Regular}
                  label="Ban account"
                  tone="danger"
                  onClick={() => setStatus(selected.id, "banned")}
                />
              ) : (
                <RowAction
                  icon={CheckmarkCircle24Regular}
                  label="Unban account"
                  tone="primary"
                  onClick={() => setStatus(selected.id, "active")}
                />
              )}
            </Stack>
          )
        }
      >
        {selected && (
          <Stack gap={2.4}>
            <Stack direction="row" gap={1.4}>
              <StatBlock label="Orders" value={String(selected.orders)} />
              <StatBlock label="Total spent" value={money(selected.spent)} />
            </Stack>

            <Box>
              <PanelSectionTitle>Overview</PanelSectionTitle>
              <DetailRow
                label="Status"
                value={
                  <StatusChip
                    status={
                      selected.status === "active"
                        ? "approved"
                        : selected.status === "flagged"
                          ? "flagged"
                          : "rejected"
                    }
                    size="sm"
                  />
                }
              />
              <DetailRow label="Member since" value={selected.joined} />
            </Box>

            <Box>
              <PanelSectionTitle>Contact</PanelSectionTitle>
              <Stack gap={1}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Mail24Regular style={{ fontSize: 15, color: fg.tertiary }} />
                  <Typography sx={{ fontSize: 12.5, color: fg.primary }}>
                    {selected.email}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Call24Regular style={{ fontSize: 15, color: fg.tertiary }} />
                  <Typography sx={{ fontSize: 12.5, color: fg.primary }}>
                    {selected.phone}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Location24Regular
                    style={{ fontSize: 15, color: fg.tertiary }}
                  />
                  <Typography sx={{ fontSize: 12.5, color: fg.primary }}>
                    {selected.city}
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            <Box>
              <PanelSectionTitle>Order history</PanelSectionTitle>
              <Stack gap={0.9}>
                {selected.recentOrders.map((o) => (
                  <Stack
                    key={o.id}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      border: `1px solid ${border.primary}`,
                      borderRadius: radiusTokens.sm ?? 8,
                      px: 1.4,
                      py: 0.9,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: fg.primary,
                      }}
                    >
                      {o.id}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography
                        sx={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: fg.primary,
                        }}
                      >
                        {money(o.amount)}
                      </Typography>
                      <StatusChip status={o.status} size="sm" />
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        )}
      </SidePanel>
    </Box>
  );
}

function MiniStat({ label, value, fg }) {
  return (
    <Stack sx={{ minWidth: 78 }}>
      <Typography sx={{ fontSize: 10.5, color: fg.tertiary }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
        {value}
      </Typography>
    </Stack>
  );
}
