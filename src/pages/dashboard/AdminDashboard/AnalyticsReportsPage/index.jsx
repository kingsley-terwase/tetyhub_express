// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { ArrowDownload24Regular, Trophy24Filled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { PageHeader, SectionCard, PillTabs, StatBlock, money } from "../data";

const CATEGORY_PERF = [
  { name: "Home services", value: 4820000 },
  { name: "Electronics", value: 3960000 },
  { name: "Design", value: 3110000 },
  { name: "Vehicles", value: 2740000 },
  { name: "Fashion", value: 1580000 },
  { name: "Short-lets", value: 1240000 },
];

const LEADERBOARD = [
  { rank: 1, name: "Studio Nine", revenue: 4310000, orders: 96 },
  { rank: 2, name: "TechDeals NG", revenue: 3200000, orders: 210 },
  { rank: 3, name: "UrbanStay", revenue: 2870000, orders: 61 },
  { rank: 4, name: "SparkleCo", revenue: 2120000, orders: 214 },
  { rank: 5, name: "FixIt Pros", revenue: 1890000, orders: 331 },
];

const RANGE_TABS = [
  { key: "7d", label: "7 days" },
  { key: "30d", label: "30 days" },
  { key: "90d", label: "90 days" },
];

const RANK_COLOR = ["#F0B100", "#C0C0C0", "#CD7F32"];

export default function AnalyticsReportsPage() {
  const { fg, border, main, bg } = useColor();
  const [range, setRange] = useState("30d");

  return (
    <Box>
      <PageHeader
        title="Analytics & Reports"
        subtitle="Deeper numbers behind the overview snapshot."
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
              Export report
            </Typography>
          </Stack>
        }
      />

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2.4 }}>
        <StatBlock
          label="Total GMV"
          value={money(CATEGORY_PERF.reduce((s, c) => s + c.value, 0))}
          sub="Across all categories"
        />
        <StatBlock
          label="Repeat buyer rate"
          value="41%"
          sub="Ordered more than once"
          accent="#22C55E"
        />
        <StatBlock label="New sellers" value="18" sub="Joined this period" />
      </Stack>

      <Box sx={{ mb: { xs: 2.5, md: 3 } }}>
        <PillTabs tabs={RANGE_TABS} value={range} onChange={setRange} />
      </Box>

      <Stack direction={{ xs: "column", lg: "row" }} gap={1.6}>
        <SectionCard sx={{ flex: "1 1 58%", minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 800,
              fontSize: 15,
              color: fg.primary,
              mb: 0.3,
            }}
          >
            Revenue by category
          </Typography>
          <Typography sx={{ fontSize: 11.5, color: fg.tertiary, mb: 2 }}>
            Which categories are driving the most GMV
          </Typography>
          <Box sx={{ height: { xs: 240, sm: 280 }, mx: -1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CATEGORY_PERF}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  horizontal={false}
                  stroke={border.primary}
                  strokeDasharray="3 4"
                />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  width={100}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: fg.tertiary, fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  contentStyle={{
                    background: bg.primary,
                    border: `1px solid ${border.primary}`,
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  labelStyle={{ color: fg.secondary }}
                  formatter={(v) => [money(v), "Revenue"]}
                />
                <Bar
                  dataKey="value"
                  radius={[0, 6, 6, 0]}
                  fill={main.primary}
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </SectionCard>

        <SectionCard sx={{ flex: "1 1 42%", minWidth: 0 }} noPadding>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ px: { xs: 1.75, sm: 2.4 }, py: 2 }}
          >
            <Trophy24Filled style={{ fontSize: 17, color: "#F0B100" }} />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 800,
                fontSize: 15,
                color: fg.primary,
              }}
            >
              Top sellers
            </Typography>
          </Stack>
          <Stack>
            {LEADERBOARD.map((s) => (
              <Stack
                key={s.rank}
                direction="row"
                alignItems="center"
                gap={1.4}
                sx={{
                  px: { xs: 1.75, sm: 2.4 },
                  py: 1.3,
                  borderTop: `1px solid ${border.primary}`,
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                    color: s.rank <= 3 ? "#141414" : fg.tertiary,
                    backgroundColor:
                      s.rank <= 3 ? RANK_COLOR[s.rank - 1] : "transparent",
                    border:
                      s.rank <= 3 ? "none" : `1px solid ${border.primary}`,
                  }}
                >
                  {s.rank}
                </Box>
                <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                    noWrap
                  >
                    {s.name}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
                    {s.orders} orders
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: fg.primary,
                    flexShrink: 0,
                  }}
                >
                  {money(s.revenue)}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      </Stack>
    </Box>
  );
}
