import { radiusTokens, spacingTokens } from "@/lib/theme";
import { Stack } from "@mui/material";
import { Typography } from "@/components/ui";
import useColor from "@/contexts/color/useColor";

/**
 * @param {import("@/types/global.d").SupportSuggestion} props
 */
export default function Suggestion({ label, icon: Icon, color }) {
  const { bg } = useColor();
  return (
    <Stack
      gap={spacingTokens.sm}
      alignItems="center"
      justifyContent="center"
      sx={{
        px: spacingTokens.lg,
        py: spacingTokens.xl,
        borderRadius: radiusTokens.xl,
        backgroundColor: bg.tertiary,
      }}
    >
      <Icon fontSize={32} color={color}></Icon>
      <Typography lineHeight={1.25} textAlign="center" variant="caption" fontWeight={500}>
        {label}
      </Typography>
    </Stack>
  );
}
