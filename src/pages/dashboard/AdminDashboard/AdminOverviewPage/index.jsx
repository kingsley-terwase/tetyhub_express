// @ts-nocheck
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  Wallet24Regular,
  Cart24Regular,
  PersonAvailable24Regular,
  ClipboardTaskListLtr24Regular,
  Warning24Regular,
  ChevronRight24Regular,
  StoreMicrosoft24Regular,
  ImageMultiple24Regular,
  ArrowRight24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import {
  PageHeader,
  SectionCard,
  KpiCard,
  StatusChip,
  PillTabs,
  money,
} from "../data";

// ---- Mock data — wire these up to real admin queries ----
const REVENUE_SERIES = [
  { day: "Mon", revenue: 182000 },
  { day: "Tue", revenue: 219500 },
  { day: "Wed", revenue: 164000 },
  { day: "Thu", revenue: 258000 },
  { day: "Fri", revenue: 301500 },
  { day: "Sat", revenue: 342000 },
  { day: "Sun", revenue: 276000 },
];

const PENDING_SELLERS = [
  {
    id: "s1",
    name: "Kaduna Kitchens",
    category: "Home services",
    waiting: "2d",
  },
  {
    id: "s2",
    name: "Bright Frame Studio",
    category: "Photography",
    waiting: "6h",
  },
  { id: "s3", name: "Ilé Repairs Co.", category: "Handyman", waiting: "1d" },
];

const FLAGGED_LISTINGS = [
  {
    id: "l1",
    title: "iPhone 13 Pro — brand new sealed",
    seller: "TechDeals NG",
    reason: "Suspected counterfeit claim",
  },
  {
    id: "l2",
    title: "3-bedroom shortlet, Lekki",
    seller: "UrbanStay",
    reason: "Duplicate listing",
  },
];

const RECENT_ORDERS = [
  {
    id: "TH-402911",
    customer: "Amaka O.",
    seller: "SparkleCo",
    amount: 16500,
    status: "completed",
  },
  {
    id: "TH-402910",
    customer: "Bayo A.",
    seller: "Studio Nine",
    amount: 45000,
    status: "in_progress",
  },
  {
    id: "TH-402909",
    customer: "Chiamaka N.",
    seller: "FixIt Pros",
    amount: 8000,
    status: "disputed",
  },
  {
    id: "TH-402908",
    customer: "David E.",
    seller: "GreenThumb",
    amount: 22000,
    status: "confirmed",
  },
];

const ACTIVITY = [
  {
    id: "a1",
    text: "Approved seller \u201cNaija Cleaners\u201d",
    time: "12m ago",
    tone: "approved",
  },
  {
    id: "a2",
    text: "Rejected listing \u201cUsed generator, no receipt\u201d",
    time: "48m ago",
    tone: "rejected",
  },
  {
    id: "a3",
    text: "Refunded order TH-402877 (₦12,000)",
    time: "1h ago",
    tone: "pending",
  },
  {
    id: "a4",
    text: "New dispute opened on TH-402909",
    time: "2h ago",
    tone: "flagged",
  },
  {
    id: "a5",
    text: "Payout batch of ₦1.8M sent to 34 sellers",
    time: "5h ago",
    tone: "approved",
  },
];

const RANGE_TABS = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
];

export default function AdminOverviewPage() {
  const { fg, fg2, bg, border, main } = useColor();
  const navigate = useNavigate();
  const [range, setRange] = useState("7d");

  const weekTotal = useMemo(
    () => REVENUE_SERIES.reduce((s, d) => s + d.revenue, 0),
    [],
  );

  return (
    <Box>
      <PageHeader
        title="Admin Overview"
        subtitle="Everything moving through TETYHUB right now."
        action={
          <PillTabs tabs={RANGE_TABS} value={range} onChange={setRange} />
        }
      />

      {/* ---- Urgent banner: only shows when something actually needs eyes ---- */}
      {(PENDING_SELLERS.length > 0 || FLAGGED_LISTINGS.length > 0) && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.4,
            border: "1px solid rgba(240,177,0,0.35)",
            backgroundColor: "rgba(240,177,0,0.08)",
            borderRadius: radiusTokens.md,
            px: { xs: 1.6, sm: 2.2 },
            py: 1.4,
            mb: { xs: 2.5, md: 3 },
            flexWrap: "wrap",
          }}
        >
          <Warning24Regular
            style={{ fontSize: 20, color: "#F0B100", flexShrink: 0 }}
          />
          <Typography sx={{ fontSize: 13, color: fg.primary, flexGrow: 1 }}>
            <b>{PENDING_SELLERS.length} seller applications</b> and{" "}
            <b>{FLAGGED_LISTINGS.length} flagged listings</b> are waiting on
            review.
          </Typography>
          <Typography
            onClick={() => navigate("/dashboard/admin/seller-approvals")}
            sx={{
              fontSize: 12.5,
              fontWeight: 700,
              color: "#F0B100",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Review now →
          </Typography>
        </Box>
      )}

      {/* ---- KPI row ---- */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        gap={{ xs: 1.4, sm: 1.6 }}
        sx={{ mb: { xs: 2.5, md: 3 } }}
      >
        <KpiCard
          icon={Wallet24Regular}
          label={`Revenue (${range})`}
          value={money(weekTotal)}
          delta={12.4}
          accent="#22C55E"
        />
        <KpiCard
          icon={Cart24Regular}
          label="Orders in progress"
          value="86"
          delta={4.1}
          accent="#58A6FF"
        />
        <KpiCard
          icon={PersonAvailable24Regular}
          label="Active sellers"
          value="312"
          delta={2.8}
          accent="#A371F7"
        />
        <KpiCard
          icon={ClipboardTaskListLtr24Regular}
          label="Pending approvals"
          value={String(PENDING_SELLERS.length + FLAGGED_LISTINGS.length)}
          delta={-8.3}
          accent="#F0B100"
        />
      </Stack>

      {/* ---- Chart + Activity ---- */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        gap={{ xs: 1.4, sm: 1.6 }}
        sx={{ mb: { xs: 2.5, md: 3 } }}
      >
        <SectionCard sx={{ flex: { lg: "1 1 62%" }, minWidth: 0 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Stack gap={0.2}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontWeight: 800,
                  fontSize: 15,
                  color: fg.primary,
                }}
              >
                Revenue
              </Typography>
              <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                Gross merchandise value, platform-wide
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: 18,
                color: fg.primary,
              }}
            >
              {money(weekTotal)}
            </Typography>
          </Stack>
          <Box sx={{ height: { xs: 180, sm: 220 }, mx: -1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={REVENUE_SERIES}
                margin={{ top: 4, right: 8, left: 8, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={main.primary}
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="100%"
                      stopColor={main.primary}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  stroke={border.primary}
                  strokeDasharray="3 4"
                />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: fg.tertiary, fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ stroke: border.primary }}
                  contentStyle={{
                    background: bg.primary,
                    border: `1px solid ${border.primary}`,
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: fg.secondary }}
                  formatter={(v) => [money(v), "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={main.primary}
                  strokeWidth={2.4}
                  fill="url(#revFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </SectionCard>

        <SectionCard sx={{ flex: { lg: "1 1 38%" }, minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 800,
              fontSize: 15,
              color: fg.primary,
              mb: 1.8,
            }}
          >
            Recent activity
          </Typography>
          <Stack gap={1.6}>
            {ACTIVITY.map((a, i) => (
              <Stack
                key={a.id}
                direction="row"
                gap={1.2}
                alignItems="flex-start"
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    pt: 0.4,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor:
                        a.tone === "approved"
                          ? "#22C55E"
                          : a.tone === "rejected" || a.tone === "flagged"
                            ? "#F85149"
                            : "#F0B100",
                      flexShrink: 0,
                    }}
                  />
                  {i < ACTIVITY.length - 1 && (
                    <Box
                      sx={{
                        width: "1px",
                        flexGrow: 1,
                        minHeight: 20,
                        backgroundColor: border.primary,
                        mt: 0.4,
                      }}
                    />
                  )}
                </Box>
                <Stack sx={{ pb: 0.2 }}>
                  <Typography
                    sx={{ fontSize: 12.5, color: fg.primary, lineHeight: 1.4 }}
                  >
                    {a.text}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 11, color: fg.tertiary, mt: 0.2 }}
                  >
                    {a.time}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      </Stack>

      {/* ---- Pending queues + recent orders ---- */}
      <Stack direction={{ xs: "column", lg: "row" }} gap={{ xs: 1.4, sm: 1.6 }}>
        <SectionCard sx={{ flex: 1, minWidth: 0 }} noPadding>
          <QueuePanel
            icon={StoreMicrosoft24Regular}
            title="Seller approvals"
            count={PENDING_SELLERS.length}
            viewAllHref="/dashboard/admin/seller-approvals"
            navigate={navigate}
            fg={fg}
            border={border}
            main={main}
          >
            {PENDING_SELLERS.map((s) => (
              <Stack
                key={s.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={1}
                sx={{
                  px: { xs: 1.75, sm: 2.4 },
                  py: 1.3,
                  borderTop: `1px solid ${border.primary}`,
                }}
              >
                <Stack sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                    noWrap
                  >
                    {s.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 11.5, color: fg.tertiary }}
                    noWrap
                  >
                    {s.category}
                  </Typography>
                </Stack>
                <Stack alignItems="flex-end" sx={{ flexShrink: 0 }}>
                  <StatusChip status="pending" size="sm" />
                  <Typography
                    sx={{ fontSize: 10.5, color: fg.tertiary, mt: 0.4 }}
                  >
                    waiting {s.waiting}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </QueuePanel>
        </SectionCard>

        <SectionCard sx={{ flex: 1, minWidth: 0 }} noPadding>
          <QueuePanel
            icon={ImageMultiple24Regular}
            title="Flagged listings"
            count={FLAGGED_LISTINGS.length}
            viewAllHref="/dashboard/admin/listing-moderation"
            navigate={navigate}
            fg={fg}
            border={border}
            main={main}
          >
            {FLAGGED_LISTINGS.map((l) => (
              <Stack
                key={l.id}
                gap={0.3}
                sx={{
                  px: { xs: 1.75, sm: 2.4 },
                  py: 1.3,
                  borderTop: `1px solid ${border.primary}`,
                }}
              >
                <Typography
                  sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                  noWrap
                >
                  {l.title}
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                  {l.seller} · {l.reason}
                </Typography>
              </Stack>
            ))}
          </QueuePanel>
        </SectionCard>

        <SectionCard sx={{ flex: 1.2, minWidth: 0 }} noPadding>
          <QueuePanel
            icon={Cart24Regular}
            title="Recent orders"
            count={RECENT_ORDERS.length}
            viewAllHref="/dashboard/admin/orders"
            navigate={navigate}
            fg={fg}
            border={border}
            main={main}
          >
            {RECENT_ORDERS.map((o) => (
              <Stack
                key={o.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={1}
                sx={{
                  px: { xs: 1.75, sm: 2.4 },
                  py: 1.3,
                  borderTop: `1px solid ${border.primary}`,
                }}
              >
                <Stack sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                    noWrap
                  >
                    {o.customer}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 11.5, color: fg.tertiary }}
                    noWrap
                  >
                    {o.id} · {o.seller}
                  </Typography>
                </Stack>
                <Stack alignItems="flex-end" sx={{ flexShrink: 0 }}>
                  <Typography
                    sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}
                  >
                    {money(o.amount)}
                  </Typography>
                  <Box sx={{ mt: 0.3 }}>
                    <StatusChip status={o.status} size="sm" />
                  </Box>
                </Stack>
              </Stack>
            ))}
          </QueuePanel>
        </SectionCard>
      </Stack>
    </Box>
  );
}

function QueuePanel({
  icon: Icon,
  title,
  count,
  viewAllHref,
  navigate,
  children,
  fg,
  border,
  main,
}) {
  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: { xs: 1.75, sm: 2.4 }, py: 1.6 }}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <Icon style={{ fontSize: 17, color: fg.secondary }} />
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 800,
              fontSize: 13.5,
              color: fg.primary,
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              fontSize: 10.5,
              fontWeight: 700,
              borderRadius: 999,
              px: 0.8,
              minWidth: 18,
              textAlign: "center",
              backgroundColor: `${main.primary}18`,
              color: main.primary,
            }}
          >
            {count}
          </Box>
        </Stack>
        <Box
          onClick={() => navigate(viewAllHref)}
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: fg.tertiary,
          }}
        >
          <ChevronRight24Regular style={{ fontSize: 16 }} />
        </Box>
      </Stack>
      {count === 0 ? (
        <Box
          sx={{
            px: { xs: 1.75, sm: 2.4 },
            py: 2,
            borderTop: `1px solid ${border.primary}`,
          }}
        >
          <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>
            All clear — nothing waiting.
          </Typography>
        </Box>
      ) : (
        children
      )}
    </Box>
  );
}
