import { radiusTokens, spacingTokens, typefaces } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { ArrowEnterFilled } from "@fluentui/react-icons";
import { Box } from "@mui/material";

export default function MessageInput() {
  const { fg, bg } = useColor();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: bg.tertiary,
        borderRadius: radiusTokens.lg,
        py: spacingTokens.xs,
        px: spacingTokens.sm,
      }}
    >
      <Box
        flex={1}
        component="input"
        placeholder="Ask Something"
        sx={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          fontFamily: typefaces.default,
          px: spacingTokens.sm,
          color: fg.primary,
          "&::placeholder": {
            color: fg.secondary,
          },
        }}
      />
      <ArrowEnterFilled fontSize={32} color={fg.secondary} style={{ cursor: "pointer" }} />
    </Box>
  );
}
