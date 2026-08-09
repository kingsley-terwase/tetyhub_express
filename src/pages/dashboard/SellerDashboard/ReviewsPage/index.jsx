// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Star24Filled,
  Star24Regular as StarOutline,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import {
  PageHeader,
  SectionCard,
  FilterChips,
  Avatar,
  Pill,
  EmptyState,
} from "../SellerUi";
import ReviewReplyModal from "../Modal/ReviewReplyModal";

const REVIEWS = [
  {
    id: "r1",
    customer: "Sarah Johnson",
    rating: 5,
    comment:
      "Sarah's team was on time, thorough, and the windows have never looked better. Booking again next month.",
    item: "Deep window cleaning",
    date: "3 Aug 2026",
    reply: null,
  },
  {
    id: "r2",
    customer: "Ahmed Hassan",
    rating: 4,
    comment:
      "Great communication throughout the logo process. Took a little longer than expected but the result was worth it.",
    item: "Logo & brand identity design",
    date: "1 Aug 2026",
    reply:
      "Thanks Ahmed! We'll tighten up our turnaround time for the next round.",
  },
  {
    id: "r3",
    customer: "Peter Pan",
    rating: 2,
    comment:
      "The repair fixed the immediate issue but the same problem came back within a week.",
    item: "Handyman repair visit",
    date: "29 Jul 2026",
    reply: null,
  },
];

export default function ReviewsPage() {
  const { fg, bg, border, main } = useColor();
  const [reviews, setReviews] = useState(REVIEWS);
  const [filter, setFilter] = useState("all");
  const [replying, setReplying] = useState(null);

  const avg = (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1);
  const distribution = useMemo(() => {
    const d = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => (d[r.rating] += 1));
    return d;
  }, [reviews]);

  const tabs = [
    { key: "all", label: "All", count: reviews.length },
    {
      key: "unanswered",
      label: "Needs reply",
      count: reviews.filter((r) => !r.reply).length,
    },
  ];

  const filtered = reviews.filter((r) => (filter === "all" ? true : !r.reply));

  const submitReply = (review, text) =>
    setReviews((rs) =>
      rs.map((r) => (r.id === review.id ? { ...r, reply: text } : r)),
    );

  return (
    <Box>
      <PageHeader
        title="Reviews"
        subtitle="What buyers are saying about your store."
        fg={fg}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "220px 1fr" },
          gap: { xs: 2, sm: 2.6 },
          mb: { xs: 2.4, md: 3 },
        }}
      >
        <SectionCard border={border}>
          <Stack alignItems="center" gap={0.4}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 800,
                fontSize: 32,
                color: fg.primary,
              }}
            >
              {avg}
            </Typography>
            <Stack direction="row" gap={0.2}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star24Filled
                  key={i}
                  style={{
                    fontSize: 15,
                    color: i < Math.round(avg) ? "#E8912D" : border.primary,
                  }}
                />
              ))}
            </Stack>
            <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
              {reviews.length} reviews
            </Typography>
          </Stack>
        </SectionCard>
        <SectionCard border={border}>
          <Stack gap={0.9}>
            {[5, 4, 3, 2, 1].map((star) => (
              <Stack key={star} direction="row" alignItems="center" gap={1}>
                <Typography
                  sx={{ fontSize: 11.5, color: fg.tertiary, width: 12 }}
                >
                  {star}
                </Typography>
                <Star24Filled style={{ fontSize: 12, color: "#E8912D" }} />
                <Box
                  sx={{
                    flexGrow: 1,
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: `${fg.secondary}14`,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${(distribution[star] / reviews.length) * 100}%`,
                      height: "100%",
                      backgroundColor: "#E8912D",
                    }}
                  />
                </Box>
                <Typography
                  sx={{
                    fontSize: 11.5,
                    color: fg.tertiary,
                    width: 18,
                    textAlign: "right",
                  }}
                >
                  {distribution[star]}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      </Box>

      <Box sx={{ mb: 2 }}>
        <FilterChips
          tabs={tabs}
          active={filter}
          onChange={setFilter}
          fg={fg}
          border={border}
          main={main}
        />
      </Box>

      {filtered.length === 0 ? (
        <EmptyState
          icon={StarOutline}
          title="Nothing here"
          subtitle="You're all caught up."
          fg={fg}
          border={border}
        />
      ) : (
        <Stack gap={1.4}>
          {filtered.map((r) => (
            <SectionCard key={r.id} border={border}>
              <Stack direction="row" gap={1.2}>
                <Avatar name={r.customer} />
                <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={1}
                  >
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Typography
                        sx={{
                          fontSize: 13.5,
                          fontWeight: 700,
                          color: fg.primary,
                        }}
                      >
                        {r.customer}
                      </Typography>
                      <Stack direction="row" gap={0.15}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star24Filled
                            key={i}
                            style={{
                              fontSize: 11,
                              color: i < r.rating ? "#E8912D" : border.primary,
                            }}
                          />
                        ))}
                      </Stack>
                    </Stack>
                    <Typography
                      sx={{ fontSize: 11, color: fg.tertiary, flexShrink: 0 }}
                    >
                      {r.date}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{ fontSize: 11.5, color: fg.tertiary, mt: 0.3 }}
                  >
                    {r.item}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: fg.secondary,
                      lineHeight: 1.6,
                      mt: 1,
                    }}
                  >
                    {r.comment}
                  </Typography>

                  {r.reply ? (
                    <Box
                      sx={{
                        mt: 1.4,
                        backgroundColor: `${main.primary}0a`,
                        borderRadius: radiusTokens.sm ?? 8,
                        p: 1.4,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: main.primary,
                          mb: 0.4,
                        }}
                      >
                        Your reply
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12.5,
                          color: fg.secondary,
                          lineHeight: 1.5,
                        }}
                      >
                        {r.reply}
                      </Typography>
                    </Box>
                  ) : (
                    <Box
                      onClick={() => setReplying(r)}
                      sx={{
                        display: "inline-block",
                        mt: 1.2,
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: main.primary,
                        cursor: "pointer",
                      }}
                    >
                      Reply to review
                    </Box>
                  )}
                </Stack>
              </Stack>
            </SectionCard>
          ))}
        </Stack>
      )}

      <ReviewReplyModal
        open={Boolean(replying)}
        onClose={() => setReplying(null)}
        review={replying}
        onSubmit={submitReply}
        fg={fg}
        bg={bg}
        border={border}
        main={main}
      />
    </Box>
  );
}
