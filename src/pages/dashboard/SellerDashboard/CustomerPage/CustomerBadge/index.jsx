import { Typography, Box } from "@mui/material";

/** @type {Record<string, { bg: string, color: string }>} */
const tierConfig = {
  Bronze: { bg: "#fef3c7", color: "#92400e" },
  Silver: { bg: "#f3f4f6", color: "#374151" },
  Gold: { bg: "#fef9c3", color: "#854d0e" },
  Platinum: { bg: "#ede9fe", color: "#4c1d95" },
};

/** @type {Record<string, { bg: string, color: string }>} */
const segmentConfig = {
  new: { bg: "#dbeafe", color: "#1e40af" },
  returning: { bg: "#d1fae5", color: "#065f46" },
  vip: { bg: "#ede9fe", color: "#4c1d95" },
  "at-risk": { bg: "#fef3c7", color: "#92400e" },
  lapsed: { bg: "#fee2e2", color: "#991b1b" },
};

/**
 * @param {{ tier: string }} props
 */
export function TierBadge({ tier }) {
  const c = tierConfig[tier] ?? tierConfig.Bronze;
  return (
    <Box
      sx={{
        display: "inline-block",
        px: 1,
        py: 0.3,
        borderRadius: 1,
        backgroundColor: c.bg,
      }}
    >
      <Typography variant="caption" fontWeight={700} sx={{ color: c.color }}>
        {tier}
      </Typography>
    </Box>
  );
}

/**
 * @param {{ segment: string }} props
 */
export function SegmentBadge({ segment }) {
  const c = segmentConfig[segment] ?? segmentConfig.new;
  const label =
    segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");
  return (
    <Box
      sx={{
        display: "inline-block",
        px: 1,
        py: 0.3,
        borderRadius: "999px",
        backgroundColor: c.bg,
      }}
    >
      <Typography variant="caption" fontWeight={600} sx={{ color: c.color }}>
        {label}
      </Typography>
    </Box>
  );
}
