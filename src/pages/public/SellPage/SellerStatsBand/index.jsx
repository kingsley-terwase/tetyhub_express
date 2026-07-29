// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { useReveal, useCountUp } from "../../HomePage/Hooks";

const STATS = [
  { value: 1840, suffix: "+", label: "Active sellers" },
  { value: 26000, suffix: "+", label: "Products listed" },
  { value: 48, suffix: "h", label: "Avg. payout time" },
  { value: 97, suffix: "%", label: "Seller satisfaction" },
];

function Stat({ stat }) {
  const { fg, main } = useColor();
  const { ref, isVisible } = useReveal();
  const value = useCountUp(stat.value, { duration: 1400, start: isVisible });

  return (
    <Stack ref={ref} alignItems="center" sx={{ flex: "1 1 140px" }}>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: { xs: 26, md: 32 },
          fontWeight: 800,
          color: main.primary,
        }}
      >
        {value.toLocaleString()}
        {stat.suffix}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 13,
          color: fg.secondary,
          mt: 0.3,
        }}
      >
        {stat.label}
      </Typography>
    </Stack>
  );
}

export default function SellerStatsBand() {
  const { bg, border } = useColor();

  return (
    <Box sx={{ px: { xs: 3, md: 8 }, py: 6 }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-around"
        sx={{
          borderRadius: 4,
          border: `1px solid ${border.primary}`,
          backgroundColor: bg.secondary,
          py: 4,
          px: 3,
        }}
      >
        {STATS.map((s) => (
          <Stat key={s.label} stat={s} />
        ))}
      </Stack>
    </Box>
  );
}
