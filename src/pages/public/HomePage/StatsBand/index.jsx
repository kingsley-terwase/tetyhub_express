// @ts-nocheck
import { Box, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";
// @ts-ignore
import { useReveal, useCountUp } from "../Hooks";

const FONTS = {
  body: "Bebas Neue",
};

const STATS = [
  { target: 12400, suffix: "+", label: "Active sellers" },
  { target: 58200, suffix: "+", label: "Products & services listed" },
  { target: 203000, suffix: "+", label: "Orders delivered" },
  { target: 98, suffix: "%", label: "Buyers who return within 30 days" },
];

// @ts-ignore
function StatItem({ stat, fg, main }) {
  const [ref, isVisible] = useReveal({ threshold: 0.4 });
  const count = useCountUp(stat.target, { start: isVisible, duration: 1800 });

  return (
    <Box ref={ref} sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          fontFamily: FONTS.body,
          fontSize: { xs: 32, md: 42 },
          fontWeight: 700,
          color: main.primary,
          lineHeight: 1,
          mb: spacingTokens.xs,
        }}
      >
        {count.toLocaleString()}
        {stat.suffix}
      </Typography>
      <Typography
        sx={{
          fontFamily: FONTS.body,
          fontSize: 14,
          color: fg.secondary,
          maxWidth: 180,
          mx: "auto",
        }}
      >
        {stat.label}
      </Typography>
    </Box>
  );
}

export default function StatsBand() {
  const { bg, fg, main, border } = useColor();

  return (
    <Box
      sx={{
        px: { xs: spacingTokens.md, md: spacingTokens.xl },
        py: spacingTokens.xl,
        backgroundColor: bg.secondary,
        borderTop: `1px solid ${border.primary}`,
        borderBottom: `1px solid ${border.primary}`,
        display: "grid",
        gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: spacingTokens.lg,
      }}
    >
      {STATS.map((stat) => (
        <StatItem key={stat.label} stat={stat} fg={fg} main={main} />
      ))}
    </Box>
  );
}
