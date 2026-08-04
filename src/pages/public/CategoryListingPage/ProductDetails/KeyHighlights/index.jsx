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
        p: { xs: 1.6, sm: spacingTokens.md },
        mt: { xs: 1.6, sm: spacingTokens.md },
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: { xs: 11.5, sm: 12.5 },
          fontWeight: 700,
          color: fg.secondary,
          mb: { xs: 1, sm: 1.2 },
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        Key Highlights
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          columnGap: { xs: 0, sm: 2 },
          rowGap: { xs: 0.9, sm: 1 },
        }}
      >
        {highlights.map((heading) => (
          <Stack
            key={heading}
            direction="row"
            alignItems="flex-start"
            gap={{ xs: 0.8, sm: 1 }}
            sx={{ minWidth: 0 }}
          >
            <CheckmarkCircle24Filled
              style={{
                fontSize: 16,
                color: main.primary,
                flexShrink: 0,
                marginTop: 1,
              }}
            />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: { xs: 12.5, sm: 13.5 },
                color: fg.primary,
                lineHeight: 1.5,
                overflowWrap: "break-word",
                minWidth: 0,
              }}
            >
              {heading}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
