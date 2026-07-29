// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { CheckmarkCircle24Filled } from "@fluentui/react-icons";
import StarRow from "../Starrow";

function RatingBreakdown({ breakdown, fg, border }) {
  return (
    <Stack gap={0.9} sx={{ maxWidth: 320 }}>
      {breakdown.map((row) => (
        <Stack key={row.stars} direction="row" alignItems="center" gap={1}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 12,
              color: fg.tertiary,
              width: 34,
            }}
          >
            {row.stars}★
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              height: 6,
              borderRadius: 4,
              backgroundColor: border.primary,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                width: `${row.percent}%`,
                height: "100%",
                backgroundColor: "#f5a623",
              }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 11.5,
              color: fg.tertiary,
              width: 32,
              textAlign: "right",
            }}
          >
            {row.percent}%
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function ReviewCard({ review, fg, border, main }) {
  return (
    <Box sx={{ py: 1.8, borderBottom: `1px solid ${border.primary}` }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 0.6 }}
      >
        <Stack direction="row" alignItems="center" gap={0.8}>
          <StarRow rating={review.rating} size={13} />
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 13,
              fontWeight: 700,
              color: fg.primary,
            }}
          >
            {review.name}
          </Typography>
          {review.verified && (
            <Stack direction="row" alignItems="center" gap={0.3}>
              <CheckmarkCircle24Filled
                style={{ fontSize: 13, color: main.primary }}
              />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 10.5,
                  color: main.primary,
                  fontWeight: 600,
                }}
              >
                Verified Purchase
              </Typography>
            </Stack>
          )}
        </Stack>
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: 11, color: fg.tertiary }}
        >
          {review.date}
        </Typography>
      </Stack>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 13.5,
          color: fg.secondary,
          lineHeight: 1.6,
        }}
      >
        {review.comment}
      </Typography>
    </Box>
  );
}

// Pure content, no nav/state — `activeTab` is owned by ProductDetailPage and
// passed down, since the nav that controls it lives in the sticky sidebar,
// a different part of the tree entirely.
export default function ProductInfoTabs({
  product,
  activeTab,
  border,
  fg,
  main,
  bg,
}) {
  return (
    <Box sx={{ py: { xs: 3, md: 4 } }}>
      {activeTab === "description" && (
        <Stack gap={2.5} sx={{ maxWidth: 720 }}>
          {product.descriptionSections.map((section) => (
            <Box key={section.heading}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 15,
                  fontWeight: 700,
                  color: fg.primary,
                  mb: 0.6,
                }}
              >
                {section.heading}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 14,
                  color: fg.secondary,
                  lineHeight: 1.7,
                }}
              >
                {section.body}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}

      {activeTab === "specifications" && (
        <Stack gap={1} sx={{ maxWidth: 520 }}>
          {product.specs.map(([label, value]) => (
            <Stack
              key={label}
              direction="row"
              justifyContent="space-between"
              sx={{ py: 0.9, borderBottom: `1px solid ${border.primary}` }}
            >
              <Typography
                sx={{ fontFamily: "Poppins", fontSize: 13, color: fg.tertiary }}
              >
                {label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 13,
                  fontWeight: 600,
                  color: fg.primary,
                  textAlign: "right",
                  maxWidth: "60%",
                }}
              >
                {value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}

      {activeTab === "reviews" && (
        <Box sx={{ maxWidth: 640 }}>
          <Stack
            direction="row"
            gap={4}
            flexWrap="wrap"
            alignItems="flex-start"
            sx={{ mb: 2 }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 40,
                  fontWeight: 800,
                  color: fg.primary,
                  lineHeight: 1,
                }}
              >
                {product.rating}.0
              </Typography>
              <StarRow rating={product.rating} size={16} />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  color: fg.tertiary,
                  mt: 0.5,
                }}
              >
                {product.ratingCount.toLocaleString()} ratings
              </Typography>
            </Box>
            <RatingBreakdown
              breakdown={product.ratingBreakdown}
              fg={fg}
              border={border}
            />
          </Stack>

          <Stack>
            {product.reviews.map((review) => (
              <ReviewCard
                key={`${review.name}-${review.date}`}
                review={review}
                fg={fg}
                border={border}
                main={main}
              />
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
