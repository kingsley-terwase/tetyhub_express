import { radiusTokens, spacingTokens } from "@/lib/theme";
import { Stack, Box } from "@mui/material";
import { shortcuts } from "./lib";
import { useColor } from "@/contexts/color";
import { Typography } from "@/components/ui";

export default function Shortcuts() {
  const { elevate, shadow } = useColor();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      columnGap={spacingTokens.lg}
      rowGap={spacingTokens.xl}
      flexWrap="wrap"
    >
      {shortcuts.map((item, index) => (
        <Stack key={index} alignItems="center" justifyContent="center" gap={spacingTokens.sm}>
          <Box
            sx={{
              backgroundColor: elevate.primary,
              padding: `${spacingTokens.sm} ${spacingTokens.xl}`,
              boxShadow: shadow.default,
              borderRadius: radiusTokens.md,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <item.icon fontSize={32} color={item.color}></item.icon>
          </Box>
          <Typography color="secondary" sx={{ userSelect: "none" }}>
            {item.label}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
