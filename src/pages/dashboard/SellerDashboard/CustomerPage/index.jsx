// @ts-nocheck
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import {
  Add24Regular,
  ArrowDown24Regular,
  Eye24Regular,
  Edit24Regular,
  Mail24Regular,
  People24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import {
  PageHeader,
  SectionCard,
  FilterChips,
  Toolbar,
  Select,
  Pill,
  Avatar,
  EmptyState,
  PrimaryButton,
  GhostButton,
  money,
} from "../SellerUi";
import CustomerDetailModal from "../Modal/CustomerDetailModal";
import CustomerFormModal from "../Modal/CustomerFormModal";

const COUNTRY_FLAG = {
  USA: "🇺🇸",
  Egypt: "🇪🇬",
  UK: "🇬🇧",
  AUS: "🇦🇺",
  Spain: "🇪🇸",
  Nigeria: "🇳🇬",
};

const CUSTOMERS = [
  {
    id: "c1",
    name: "Sarah Johnson",
    email: "sarah@email.com",
    country: "USA",
    orders: 24,
    spent: 4280,
    tier: "Gold",
    segment: "Vip",
    recentOrders: [
      { id: 1, item: "Deep window cleaning", date: "3 Aug", total: 12000 },
    ],
  },
  {
    id: "c2",
    name: "Ahmed Hassan",
    email: "ahmed@email.com",
    country: "Egypt",
    orders: 3,
    spent: 210,
    tier: "Bronze",
    segment: "New",
    recentOrders: [],
  },
  {
    id: "c3",
    name: "Juliet Romeo",
    email: "juliet@email.com",
    country: "UK",
    orders: 18,
    spent: 3120,
    tier: "Silver",
    segment: "Returning",
    recentOrders: [
      { id: 2, item: "Oven deep clean", date: "1 Aug", total: 4500 },
    ],
  },
  {
    id: "c4",
    name: "Peter Pan",
    email: "peter@email.com",
    country: "AUS",
    orders: 1,
    spent: 45,
    tier: "Bronze",
    segment: "At risk",
    recentOrders: [],
  },
  {
    id: "c5",
    name: "Maria Garcia",
    email: "maria@email.com",
    country: "Spain",
    orders: 41,
    spent: 9100,
    tier: "Platinum",
    segment: "Vip",
    recentOrders: [
      { id: 3, item: "Logo design", date: "30 Jul", total: 45000 },
    ],
  },
];

const TIER_TONE = {
  Gold: "warning",
  Bronze: "warning",
  Silver: "neutral",
  Platinum: "brand",
};
const SEGMENT_TONE = {
  Vip: "brand",
  New: "info",
  Returning: "success",
  "At risk": "warning",
  Lapsed: "neutral",
};

export default function CustomerPage() {
  const { fg, bg, border, main } = useColor();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [segmentSelect, setSegmentSelect] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [viewing, setViewing] = useState(null);

  const tabs = useMemo(() => {
    const bySeg = customers.reduce(
      (acc, c) => ({ ...acc, [c.segment]: (acc[c.segment] || 0) + 1 }),
      {},
    );
    return [
      { key: "all", label: "All", count: customers.length },
      ...Object.keys(SEGMENT_TONE)
        .map((s) => ({ key: s, label: s.toLowerCase(), count: bySeg[s] || 0 }))
        .filter((t) => t.count > 0),
    ];
  }, [customers]);

  const filtered = customers.filter(
    (c) =>
      (filter === "all" || c.segment === filter) &&
      (segmentSelect === "all" || c.segment === segmentSelect) &&
      c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const goToMessage = (customer) =>
    navigate("/dashboard/seller/messages", { state: { customer } });

  return (
    <Box>
      <PageHeader
        title="Customers"
        subtitle={`${customers.length} customers found`}
        fg={fg}
        action={
          <Stack
            direction="row"
            gap={1}
            sx={{ width: { xs: "100%", sm: "auto" } }}
          >
            <GhostButton fg={fg} border={border} main={main} onClick={() => {}}>
              <ArrowDown24Regular style={{ fontSize: 15, marginRight: 6 }} />
              Export
            </GhostButton>
            <Box sx={{ flexGrow: { xs: 1, sm: 0 } }}>
              <PrimaryButton
                icon={Add24Regular}
                main={main}
                onClick={() => setAddOpen(true)}
              >
                Add customer
              </PrimaryButton>
            </Box>
          </Stack>
        }
      />

      <Stack gap={1.6} sx={{ mb: 2 }}>
        <FilterChips
          tabs={tabs}
          active={filter}
          onChange={setFilter}
          fg={fg}
          border={border}
          main={main}
        />
        <Toolbar
          search={search}
          onSearch={setSearch}
          placeholder="Search customers..."
          border={border}
          fg={fg}
          right={
            <Select
              value={segmentSelect}
              onChange={setSegmentSelect}
              options={[
                { value: "all", label: "All segments" },
                ...Object.keys(SEGMENT_TONE).map((s) => ({
                  value: s,
                  label: s,
                })),
              ]}
              border={border}
              fg={fg}
            />
          }
        />
      </Stack>

      {filtered.length === 0 ? (
        <EmptyState
          icon={People24Regular}
          title="No customers match"
          subtitle="Adjust your filters or add a new customer."
          fg={fg}
          border={border}
        />
      ) : (
        <SectionCard noPadding border={border}>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0,1.8fr) minmax(0,0.9fr) minmax(0,0.7fr) minmax(0,0.9fr) minmax(0,0.8fr) minmax(0,1fr) 96px",
                px: 2.4,
                py: 1.4,
                gap: 1,
              }}
            >
              {[
                "Customer",
                "Country",
                "Orders",
                "Spent",
                "Tier",
                "Segment",
                "Actions",
              ].map((h) => (
                <Typography
                  key={h}
                  sx={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: fg.tertiary,
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </Typography>
              ))}
            </Box>
            {filtered.map((c) => (
              <Box
                key={c.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(0,1.8fr) minmax(0,0.9fr) minmax(0,0.7fr) minmax(0,0.9fr) minmax(0,0.8fr) minmax(0,1fr) 96px",
                  alignItems: "center",
                  px: 2.4,
                  py: 1.3,
                  gap: 1,
                  borderTop: `1px solid ${border.primary}`,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1.2}
                  sx={{ minWidth: 0 }}
                >
                  <Avatar name={c.name} />
                  <Stack sx={{ minWidth: 0 }}>
                    <Typography
                      noWrap
                      sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                    >
                      {c.name}
                    </Typography>
                    <Typography
                      noWrap
                      sx={{ fontSize: 11.5, color: fg.tertiary }}
                    >
                      {c.email}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                  {COUNTRY_FLAG[c.country] || ""} {c.country}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                  {c.orders}
                </Typography>
                <Typography
                  sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}
                >
                  {money(c.spent)}
                </Typography>
                <Box>
                  <Pill label={c.tier} tone={TIER_TONE[c.tier]} />
                </Box>
                <Box>
                  <Pill label={c.segment} tone={SEGMENT_TONE[c.segment]} />
                </Box>
                <Stack direction="row" gap={0.4}>
                  <RowIcon
                    icon={Eye24Regular}
                    fg={fg}
                    onClick={() => setViewing(c)}
                  />
                  <RowIcon
                    icon={Mail24Regular}
                    fg={fg}
                    onClick={() => goToMessage(c)}
                  />
                </Stack>
              </Box>
            ))}
          </Box>

          <Stack sx={{ display: { xs: "flex", md: "none" } }}>
            {filtered.map((c) => (
              <Stack
                key={c.id}
                gap={1.1}
                sx={{ p: 1.75, borderTop: `1px solid ${border.primary}` }}
              >
                <Stack
                  direction="row"
                  gap={1.1}
                  alignItems="center"
                  sx={{ minWidth: 0 }}
                >
                  <Avatar name={c.name} />
                  <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography
                      noWrap
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                    >
                      {c.name}
                    </Typography>
                    <Typography
                      noWrap
                      sx={{ fontSize: 11.5, color: fg.tertiary }}
                    >
                      {c.email}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: fg.primary,
                      flexShrink: 0,
                    }}
                  >
                    {money(c.spent)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" gap={0.7}>
                    <Pill label={c.tier} tone={TIER_TONE[c.tier]} />
                    <Pill label={c.segment} tone={SEGMENT_TONE[c.segment]} />
                  </Stack>
                  <Stack direction="row" gap={0.4}>
                    <RowIcon
                      icon={Eye24Regular}
                      fg={fg}
                      onClick={() => setViewing(c)}
                    />
                    <RowIcon
                      icon={Mail24Regular}
                      fg={fg}
                      onClick={() => goToMessage(c)}
                    />
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      )}

      <CustomerFormModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={(form) =>
          setCustomers((cs) => [
            {
              id: `c${Date.now()}`,
              orders: 0,
              spent: 0,
              tier: "Bronze",
              segment: "New",
              recentOrders: [],
              ...form,
            },
            ...cs,
          ])
        }
        fg={fg}
        bg={bg}
        border={border}
        main={main}
      />
      <CustomerDetailModal
        open={Boolean(viewing)}
        onClose={() => setViewing(null)}
        customer={viewing}
        onMessage={goToMessage}
        fg={fg}
        bg={bg}
        border={border}
        main={main}
      />
    </Box>
  );
}

function RowIcon({ icon: Icon, onClick, fg }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 30,
        height: 30,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: fg.secondary,
        cursor: "pointer",
        "&:hover": { backgroundColor: `${fg.secondary}14` },
      }}
    >
      <Icon style={{ fontSize: 15 }} />
    </Box>
  );
}
