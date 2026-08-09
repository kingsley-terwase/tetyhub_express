// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import {
  Tag24Regular,
  Add24Regular,
  Copy24Regular,
  PauseCircle24Regular,
  PlayCircle24Regular,
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
  StatBlock,
  ProgressBar,
  RowAction,
  money,
} from "../data";

const COUPONS = [
  {
    id: "c1",
    code: "WELCOME10",
    type: "10% off",
    cap: "Max ₦5,000",
    used: 842,
    limit: 2000,
    expires: "31 Dec 2026",
    status: "live",
  },
  {
    id: "c2",
    code: "LEKKI2K",
    type: "₦2,000 off",
    cap: "Min spend ₦15,000",
    used: 118,
    limit: 300,
    expires: "20 Aug 2026",
    status: "live",
  },
  {
    id: "c3",
    code: "SELLERBOOST",
    type: "15% off",
    cap: "New sellers only",
    used: 44,
    limit: 200,
    expires: "1 Sep 2026",
    status: "scheduled",
  },
  {
    id: "c4",
    code: "EASTER25",
    type: "25% off",
    cap: "Max ₦8,000",
    used: 610,
    limit: 610,
    expires: "1 Apr 2026",
    status: "expired",
  },
];

const TABS = [
  { key: "live", label: "Live" },
  { key: "scheduled", label: "Scheduled" },
  { key: "expired", label: "Expired" },
];

export default function PromotionsCouponsPage() {
  const { fg, border, main } = useColor();
  const [tab, setTab] = useState("live");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [coupons, setCoupons] = useState(COUPONS);

  const counts = useMemo(
    () => ({
      live: coupons.filter((c) => c.status === "live").length,
      scheduled: coupons.filter((c) => c.status === "scheduled").length,
      expired: coupons.filter((c) => c.status === "expired").length,
    }),
    [coupons],
  );

  const filtered = coupons.filter(
    (c) =>
      c.status === tab && c.code.toLowerCase().includes(query.toLowerCase()),
  );

  const toggleStatus = (id) =>
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "live" ? "scheduled" : "live" }
          : c,
      ),
    );

  return (
    <Box>
      <PageHeader
        title="Promotions & Coupons"
        subtitle="Discount codes buyers can apply at checkout."
        action={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={0.7}
            onClick={() => setShowForm((v) => !v)}
            sx={{
              backgroundColor: main.primary,
              color: "#fff",
              borderRadius: radiusTokens.sm ?? 8,
              px: 1.8,
              py: 1,
              cursor: "pointer",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Add24Regular style={{ fontSize: 16 }} />
            <Typography
              sx={{ fontSize: 12.5, fontWeight: 700, fontFamily: "Poppins" }}
            >
              New coupon
            </Typography>
          </Stack>
        }
      />

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2.4 }}>
        <StatBlock
          label="Live coupons"
          value={String(counts.live)}
          accent="#22C55E"
        />
        <StatBlock
          label="Total redemptions"
          value={coupons.reduce((s, c) => s + c.used, 0).toLocaleString()}
        />
        <StatBlock
          label="Scheduled"
          value={String(counts.scheduled)}
          accent="#58A6FF"
        />
      </Stack>

      {showForm && (
        <SectionCard sx={{ mb: 2.4 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 800,
              fontSize: 14,
              color: fg.primary,
              mb: 1.6,
            }}
          >
            Create a new coupon
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            gap={1.4}
            sx={{ mb: 1.4 }}
          >
            <FormField
              label="Code"
              placeholder="e.g. AUGUST15"
              border={border}
              fg={fg}
            />
            <FormField
              label="Discount"
              placeholder="e.g. 15% or ₦2,000"
              border={border}
              fg={fg}
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            gap={1.4}
            sx={{ mb: 1.8 }}
          >
            <FormField
              label="Usage limit"
              placeholder="e.g. 500"
              border={border}
              fg={fg}
            />
            <FormField
              label="Expiry date"
              placeholder="e.g. 30 Sep 2026"
              border={border}
              fg={fg}
            />
          </Stack>
          <Stack direction="row" justifyContent="flex-end">
            <Box
              sx={{
                backgroundColor: main.primary,
                color: "#fff",
                borderRadius: radiusTokens.sm ?? 8,
                px: 2.2,
                py: 1,
                fontSize: 12.5,
                fontWeight: 700,
                fontFamily: "Poppins",
                cursor: "pointer",
                width: { xs: "100%", sm: "auto" },
                textAlign: "center",
              }}
            >
              Create coupon
            </Box>
          </Stack>
        </SectionCard>
      )}

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
          placeholder="Search code"
        />
      </Stack>

      {filtered.length === 0 ? (
        <SectionCard>
          <EmptyState
            icon={Tag24Regular}
            title={`No ${tab} coupons`}
            subtitle="Create a coupon to see it here."
          />
        </SectionCard>
      ) : (
        <Stack gap={1.4}>
          {filtered.map((c) => (
            <SectionCard key={c.id}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "stretch", md: "center" }}
                gap={1.6}
              >
                <Stack sx={{ flex: "1 1 24%", minWidth: 0 }}>
                  <Stack direction="row" alignItems="center" gap={0.8}>
                    <Typography
                      sx={{
                        fontFamily: "Poppins",
                        fontWeight: 800,
                        fontSize: 14,
                        color: fg.primary,
                        letterSpacing: 0.5,
                      }}
                    >
                      {c.code}
                    </Typography>
                    <Copy24Regular
                      style={{
                        fontSize: 13,
                        color: fg.tertiary,
                        cursor: "pointer",
                      }}
                    />
                  </Stack>
                  <Typography
                    sx={{ fontSize: 11.5, color: fg.tertiary, mt: 0.2 }}
                  >
                    {c.type} · {c.cap}
                  </Typography>
                </Stack>

                <Stack sx={{ flex: "1 1 30%" }} gap={0.5}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
                      {c.used.toLocaleString()} / {c.limit.toLocaleString()}{" "}
                      used
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
                      Expires {c.expires}
                    </Typography>
                  </Stack>
                  <ProgressBar
                    value={c.used}
                    max={c.limit}
                    accent={c.used >= c.limit ? "#F85149" : undefined}
                  />
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                  sx={{ flex: "1 1 20%" }}
                >
                  <StatusChip
                    status={
                      c.status === "live"
                        ? "approved"
                        : c.status === "scheduled"
                          ? "in_review"
                          : "cancelled"
                    }
                    size="sm"
                  />
                  {c.status !== "expired" && (
                    <RowAction
                      icon={
                        c.status === "live"
                          ? PauseCircle24Regular
                          : PlayCircle24Regular
                      }
                      label={c.status === "live" ? "Pause" : "Activate"}
                      tone={c.status === "live" ? "danger" : "primary"}
                      onClick={() => toggleStatus(c.id)}
                    />
                  )}
                </Stack>
              </Stack>
            </SectionCard>
          ))}
        </Stack>
      )}
    </Box>
  );
}

function FormField({ label, placeholder, border, fg }) {
  return (
    <Stack sx={{ flex: 1 }} gap={0.6}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: fg.secondary }}>
        {label}
      </Typography>
      <Box
        sx={{
          border: `1px solid ${border.primary}`,
          borderRadius: radiusTokens.sm ?? 8,
          px: 1.4,
          py: 1,
        }}
      >
        <InputBase
          placeholder={placeholder}
          sx={{
            fontSize: 16,
            width: "100%",
            color: fg.primary,
            "& input": { fontSize: 16 },
          }}
        />
      </Box>
    </Stack>
  );
}
