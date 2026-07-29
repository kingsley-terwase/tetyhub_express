// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { CheckmarkCircle24Filled } from "@fluentui/react-icons";
import { spacingTokens, radiusTokens } from "@/lib/theme";

const MAX_HIGHLIGHTS = 14;

// Pulls the section headings straight from product.descriptionSections —
// not separately-authored content, so it can never drift out of sync with
// what the "Product details" tab actually says below it.
export default function KeyHighlights({ product, fg, border, main, bg }) {
  const highlights = product.descriptionSections
    .slice(0, MAX_HIGHLIGHTS)
    .map((s) => s.heading);

  return (
    <Box
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        backgroundColor: bg.secondary,
        p: spacingTokens.md,
        mt: spacingTokens.md,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 12.5,
          fontWeight: 700,
          color: fg.secondary,
          mb: 1.2,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        Key Highlights
      </Typography>
      <Stack gap={1}>
        {highlights.map((heading) => (
          <Stack key={heading} direction="row" alignItems="flex-start" gap={1}>
            <CheckmarkCircle24Filled
              style={{
                fontSize: 17,
                color: main.primary,
                flexShrink: 0,
                marginTop: 1,
              }}
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 13.5,
                color: fg.primary,
                lineHeight: 1.5,
              }}
            >
              {heading}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
