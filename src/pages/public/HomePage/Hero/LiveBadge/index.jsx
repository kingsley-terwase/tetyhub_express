import { keyframes } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";

const HEADING_FONT = "Syne ";
const LIVE_GREEN = "#22c55e";

const ripple = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.4); opacity: 0; }
`;

export default function LiveBadge() {
  const { border, main } = useColor();

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.8}
      sx={{
        display: "inline-flex",
        border: `1px solid ${border.primary}`,
        borderRadius: radius.full,
        px: spacingTokens.md,
        py: 1,
        mb: spacingTokens.md,
        width: "fit-content",
      }}
    >
      <Box sx={{ position: "relative", width: 10, height: 10, flexShrink: 0 }}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backgroundColor: LIVE_GREEN,
            animation: `${ripple} 1.6s ease-out infinite`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backgroundColor: LIVE_GREEN,
          }}
        />
      </Box>

      <Typography
        sx={{
          fontFamily: HEADING_FONT,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: main.primary,
          lineHeight: 1,
        }}
      >
        Live marketplace
      </Typography>
    </Stack>
  );
}
