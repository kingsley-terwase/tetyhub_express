// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Star24Filled,
  Star24Regular,
  Warning24Filled,
  CheckmarkCircle24Regular,
  DeleteDismiss24Regular,
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
} from "../data";

const REVIEWS = [
  {
    id: "r1",
    reviewer: "Sadiq Bello",
    target: "TechDeals NG",
    rating: 1,
    text: "This seller is a total scam, never buy from them, waste of money and time!!!",
    reason: "Reported by seller — suspected competitor attack",
    status: "flagged",
    date: "3h ago",
  },
  {
    id: "r2",
    reviewer: "Ngozi Iwu",
    target: "Studio Nine",
    rating: 5,
    text: "Absolutely loved working with them on our new brand identity. Highly recommend!",
    reason: "Reported — suspected incentivized/fake review",
    status: "flagged",
    date: "1d ago",
  },
  {
    id: "r3",
    reviewer: "Peter Chukwu",
    target: "FixIt Pros",
    rating: 4,
    text: "Good service overall, technician arrived a bit late but fixed the issue.",
    reason: null,
    status: "approved",
    date: "2d ago",
  },
  {
    id: "r4",
    reviewer: "Anonymous",
    target: "UrbanStay",
    rating: 2,
    text: "Contains contact details and links outside the platform, violates guidelines.",
    reason: "Auto-flagged — off-platform contact info detected",
    status: "flagged",
    date: "4d ago",
  },
];

const TABS = [
  { key: "flagged", label: "Flagged" },
  { key: "approved", label: "Approved" },
  { key: "removed", label: "Removed" },
];

export default function ReviewsModerationPage() {
  const { fg, border } = useColor();
  const [tab, setTab] = useState("flagged");
  const [query, setQuery] = useState("");
  const [reviews, setReviews] = useState(REVIEWS);

  const counts = useMemo(
    () => ({
      flagged: reviews.filter((r) => r.status === "flagged").length,
      approved: reviews.filter((r) => r.status === "approved").length,
      removed: reviews.filter((r) => r.status === "removed").length,
    }),
    [reviews],
  );

  const filtered = reviews.filter(
    (r) =>
      r.status === tab &&
      (r.reviewer.toLowerCase().includes(query.toLowerCase()) ||
        r.target.toLowerCase().includes(query.toLowerCase())),
  );

  const setStatus = (id, status) =>
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

  return (
    <Box>
      <PageHeader
        title="Reviews Moderation"
        subtitle="Keep ratings honest — catch fake or abusive reviews."
      />

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2.4 }}>
        <StatBlock
          label="Flagged reviews"
          value={String(counts.flagged)}
          accent={counts.flagged > 0 ? "#F85149" : undefined}
        />
        <StatBlock
          label="Approved this week"
          value={String(counts.approved)}
          accent="#22C55E"
        />
        <StatBlock label="Removed this week" value={String(counts.removed)} />
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
          placeholder="Search reviewer or seller"
        />
      </Stack>

      {filtered.length === 0 ? (
        <SectionCard>
          <EmptyState
            icon={Star24Regular}
            title={`No ${tab} reviews`}
            subtitle="Nothing to review in this view."
          />
        </SectionCard>
      ) : (
        <Stack gap={1.4}>
          {filtered.map((r) => (
            <SectionCard key={r.id}>
              <Stack direction={{ xs: "column", md: "row" }} gap={1.6}>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1.2}
                  sx={{ flex: "0 0 auto", md: { flex: "0 0 200px" } }}
                >
                  <Avatar name={r.reviewer} />
                  <Stack sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                      noWrap
                    >
                      {r.reviewer}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 11.5, color: fg.tertiary }}
                      noWrap
                    >
                      on {r.target} · {r.date}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack sx={{ flexGrow: 1, minWidth: 0 }} gap={0.8}>
                  <Stack direction="row" gap={0.2}>
                    {[1, 2, 3, 4, 5].map((n) =>
                      n <= r.rating ? (
                        <Star24Filled
                          key={n}
                          style={{ fontSize: 14, color: "#F0B100" }}
                        />
                      ) : (
                        <Star24Regular
                          key={n}
                          style={{ fontSize: 14, color: border.primary }}
                        />
                      ),
                    )}
                  </Stack>
                  <Typography
                    sx={{ fontSize: 13, color: fg.secondary, lineHeight: 1.5 }}
                  >
                    "{r.text}"
                  </Typography>
                  {r.reason && (
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={0.6}
                      sx={{
                        backgroundColor: "rgba(248,81,73,0.08)",
                        border: "1px solid rgba(248,81,73,0.25)",
                        borderRadius: radiusTokens.sm ?? 8,
                        px: 1.2,
                        py: 0.7,
                        width: "fit-content",
                        maxWidth: "100%",
                      }}
                    >
                      <Warning24Filled
                        style={{
                          fontSize: 13,
                          color: "#F85149",
                          flexShrink: 0,
                        }}
                      />
                      <Typography sx={{ fontSize: 11.5, color: "#F85149" }}>
                        {r.reason}
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                {r.status === "flagged" && (
                  <Stack
                    direction={{ xs: "row", md: "column" }}
                    gap={0.7}
                    sx={{ flexShrink: 0 }}
                  >
                    <RowAction
                      icon={CheckmarkCircle24Regular}
                      label="Keep"
                      tone="primary"
                      onClick={() => setStatus(r.id, "approved")}
                    />
                    <RowAction
                      icon={DeleteDismiss24Regular}
                      label="Remove"
                      tone="danger"
                      onClick={() => setStatus(r.id, "removed")}
                    />
                  </Stack>
                )}
              </Stack>
            </SectionCard>
          ))}
        </Stack>
      )}
    </Box>
  );
}
