import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";

// @ts-ignore
export default function Section({ title, icon: Icon, children }) {
  const { bg, fg, border } = useColor();

  return (
    <Box
      sx={{
        borderRadius: radius[8],
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        overflow: "hidden",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          px: spacingTokens.md,
          py: spacingTokens.sm,
          borderBottom: `1px solid ${border.primary}`,
        }}
      >
        <Icon fontSize={16} color={fg.tertiary} />
        <Typography variant="body2" fontWeight={600} sx={{ color: fg.primary }}>
          {title}
        </Typography>
      </Stack>

      <Box sx={{ p: spacingTokens.md }}>{children}</Box>
    </Box>
  );
}
