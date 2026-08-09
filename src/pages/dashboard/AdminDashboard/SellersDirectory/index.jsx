// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  StoreMicrosoft24Regular,
  Star24Filled,
  PauseCircle24Regular,
  PlayCircle24Regular,
  Open24Regular,
  Mail24Regular,
  Call24Regular,
  Location24Regular,
  Calendar24Regular,
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

const SELLERS = [
  {
    id: "sl1",
    name: "SparkleCo",
    category: "Home services",
    orders: 214,
    revenue: 3120000,
    rating: 4.8,
    joined: "Jan 2025",
    status: "live",
    owner: "Ifeoma Chukwu",
    email: "hello@sparkleco.ng",
    phone: "0803 210 4471",
    city: "Lagos",
    recentOrders: [
      { id: "TH-402911", amount: 16500, status: "completed" },
      { id: "TH-402803", amount: 12000, status: "completed" },
      { id: "TH-402711", amount: 18500, status: "cancelled" },
    ],
  },
  {
    id: "sl2",
    name: "Studio Nine",
    category: "Design services",
    orders: 96,
    revenue: 4310000,
    rating: 4.9,
    joined: "Mar 2025",
    status: "live",
    owner: "Bayo Adewale",
    email: "team@studionine.co",
    phone: "0705 882 1190",
    city: "Lagos",
    recentOrders: [
      { id: "TH-402910", amount: 45000, status: "in_progress" },
      { id: "TH-402690", amount: 60000, status: "completed" },
    ],
  },
  {
    id: "sl3",
    name: "FixIt Pros",
    category: "Handyman & repairs",
    orders: 331,
    revenue: 2650000,
    rating: 4.3,
    joined: "Sep 2024",
    status: "live",
    owner: "Chidi Nwankwo",
    email: "support@fixitpros.ng",
    phone: "0812 334 5590",
    city: "Enugu",
    recentOrders: [
      { id: "TH-402909", amount: 8000, status: "disputed" },
      { id: "TH-402500", amount: 9500, status: "completed" },
    ],
  },
  {
    id: "sl4",
    name: "GreenThumb",
    category: "Landscaping",
    orders: 58,
    revenue: 980000,
    rating: 4.6,
    joined: "Nov 2025",
    status: "live",
    owner: "David Eze",
    email: "contact@greenthumb.ng",
    phone: "0906 771 2200",
    city: "Abuja",
    recentOrders: [{ id: "TH-402908", amount: 22000, status: "confirmed" }],
  },
  {
    id: "sl5",
    name: "TechDeals NG",
    category: "Electronics",
    orders: 412,
    revenue: 18400000,
    rating: 3.4,
    joined: "Feb 2024",
    status: "suspended",
    owner: "Sadiq Bello",
    email: "sales@techdealsng.com",
    phone: "0701 220 8834",
    city: "Lagos",
    recentOrders: [
      { id: "TH-402611", amount: 620000, status: "disputed" },
      { id: "TH-402401", amount: 145000, status: "completed" },
    ],
  },
  {
    id: "sl6",
    name: "UrbanStay",
    category: "Short-let apartments",
    orders: 77,
    revenue: 6200000,
    rating: 4.1,
    joined: "Jun 2025",
    status: "live",
    owner: "Tolu Adebanjo",
    email: "bookings@urbanstay.ng",
    phone: "0813 004 5521",
    city: "Lagos",
    recentOrders: [{ id: "TH-402755", amount: 95000, status: "completed" }],
  },
  {
    id: "sl7",
    name: "Naija Cleaners",
    category: "Home cleaning",
    orders: 143,
    revenue: 1890000,
    rating: 4.7,
    joined: "Aug 2025",
    status: "live",
    owner: "Grace Effiong",
    email: "hello@naijacleaners.ng",
    phone: "0809 442 7761",
    city: "Abuja",
    recentOrders: [
      { id: "TH-402906", amount: 18000, status: "cancelled" },
      { id: "TH-402700", amount: 15000, status: "completed" },
    ],
  },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "live", label: "Live" },
  { key: "suspended", label: "Suspended" },
];

export default function SellersDirectory() {
  const { fg, border, main } = useColor();
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [sellers, setSellers] = useState(SELLERS);
  const [selected, setSelected] = useState(null);

  const counts = useMemo(
    () => ({
      all: sellers.length,
      live: sellers.filter((s) => s.status === "live").length,
      suspended: sellers.filter((s) => s.status === "suspended").length,
    }),
    [sellers],
  );

  const avgRating = (
    sellers.reduce((s, x) => s + x.rating, 0) / sellers.length
  ).toFixed(1);

  const filtered = sellers.filter(
    (s) =>
      (tab === "all" || s.status === tab) &&
      (s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.category.toLowerCase().includes(query.toLowerCase())),
  );

  const toggleStatus = (id) => {
    setSellers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "live" ? "suspended" : "live" }
          : s,
      ),
    );
    setSelected((prev) =>
      prev && prev.id === id
        ? { ...prev, status: prev.status === "live" ? "suspended" : "live" }
        : prev,
    );
  };

  return (
    <Box>
      <PageHeader
        title="Sellers Directory"
        subtitle="Every seller currently trading on TETYHUB."
      />

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2.4 }}>
        <StatBlock label="Total sellers" value={String(sellers.length)} />
        <StatBlock
          label="Average rating"
          value={`${avgRating} ★`}
          accent="#F0B100"
        />
        <StatBlock
          label="Suspended"
          value={String(counts.suspended)}
          accent={counts.suspended > 0 ? "#F85149" : undefined}
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
          placeholder="Search seller or category"
        />
      </Stack>

      <SectionCard noPadding>
        {filtered.length === 0 ? (
          <EmptyState
            icon={StoreMicrosoft24Regular}
            title="No sellers match"
            subtitle="Try a different filter or search."
          />
        ) : (
          <Stack>
            {filtered.map((s) => (
              <Stack
                key={s.id}
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
                  sx={{ flex: "1 1 30%", minWidth: 0 }}
                >
                  <Avatar name={s.name} />
                  <Stack sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                      noWrap
                    >
                      {s.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 11.5, color: fg.tertiary }}
                      noWrap
                    >
                      {s.category} · since {s.joined}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  gap={2.4}
                  sx={{ flex: "1 1 40%" }}
                  flexWrap="wrap"
                >
                  <MiniStat label="Orders" value={s.orders} fg={fg} />
                  <MiniStat label="Revenue" value={money(s.revenue)} fg={fg} />
                  <Stack sx={{ minWidth: 60 }}>
                    <Typography sx={{ fontSize: 10.5, color: fg.tertiary }}>
                      Rating
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={0.3}>
                      <Star24Filled
                        style={{ fontSize: 12, color: "#F0B100" }}
                      />
                      <Typography
                        sx={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: fg.primary,
                        }}
                      >
                        {s.rating}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                  sx={{ flex: "1 1 25%" }}
                >
                  <StatusChip status={s.status} size="sm" />
                  <Stack direction="row" gap={0.6}>
                    <RowAction
                      icon={Open24Regular}
                      label="View"
                      onClick={() => setSelected(s)}
                    />
                    <RowAction
                      icon={
                        s.status === "live"
                          ? PauseCircle24Regular
                          : PlayCircle24Regular
                      }
                      label={s.status === "live" ? "Suspend" : "Reinstate"}
                      tone={s.status === "live" ? "danger" : "primary"}
                      onClick={() => toggleStatus(s.id)}
                    />
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
        subtitle={selected?.category}
        avatar={selected && <Avatar name={selected.name} size={40} />}
        footer={
          selected && (
            <Stack direction="row" gap={0.8}>
              <RowAction
                icon={
                  selected.status === "live"
                    ? PauseCircle24Regular
                    : PlayCircle24Regular
                }
                label={
                  selected.status === "live"
                    ? "Suspend seller"
                    : "Reinstate seller"
                }
                tone={selected.status === "live" ? "danger" : "primary"}
                onClick={() => toggleStatus(selected.id)}
              />
            </Stack>
          )
        }
      >
        {selected && (
          <Stack gap={2.4}>
            <Stack direction="row" gap={1.4}>
              <StatBlock label="Orders" value={String(selected.orders)} />
              <StatBlock label="Revenue" value={money(selected.revenue)} />
            </Stack>

            <Box>
              <PanelSectionTitle>Overview</PanelSectionTitle>
              <DetailRow
                label="Status"
                value={<StatusChip status={selected.status} size="sm" />}
              />
              <DetailRow label="Owner" value={selected.owner} />
              <DetailRow label="Rating" value={`${selected.rating} ★`} />
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
              <PanelSectionTitle>Recent orders</PanelSectionTitle>
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
    <Stack sx={{ minWidth: 70 }}>
      <Typography sx={{ fontSize: 10.5, color: fg.tertiary }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
        {value}
      </Typography>
    </Stack>
  );
}
