import { Box, Typography, Button, Stack } from "@mui/material";
import { Chat24Regular } from "@fluentui/react-icons";
import { spacingTokens, radiusTokens } from "@/lib/theme";

// A condensed recap of the buy box — thumbnail, name, price, a quick
// "Add to Cart", and a chat prompt — placed at the natural end of the
// description/specs/reviews content, right before related products.
// Distinct from the main sticky buy box up top: that one follows you as
// you scroll past the description; this one is a one-time recap you land
// on once you've actually finished reading, so you don't have to scroll
// back up to act on it.
// @ts-ignore
export default function ProductSummaryCard({ product, fg, border, main, bg }) {
  const discount = product.originalPrice
    ? Math.round(100 - (product.price / product.originalPrice) * 100)
    : null;

  return (
    <Box
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        backgroundColor: bg.secondary,
        p: { xs: spacingTokens.md, md: spacingTokens.lg },
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: radiusTokens.sm,
          overflow: "hidden",
          border: `1px solid ${border.primary}`,
          backgroundColor: "#fff",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={product.images[0]}
          alt={product.name}
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>

      <Box sx={{ flexGrow: 1, minWidth: 180 }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 13.5,
            fontWeight: 600,
            color: fg.primary,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            maxWidth: 320,
          }}
        >
          {product.name}
        </Typography>
        <Stack direction="row" alignItems="baseline" gap={1}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 17,
              fontWeight: 800,
              color: fg.primary,
            }}
          >
            ₦{product.price.toLocaleString()}
          </Typography>
          {product.originalPrice && (
            <>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  color: fg.tertiary,
                  textDecoration: "line-through",
                }}
              >
                ₦{product.originalPrice.toLocaleString()}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#ef4444",
                }}
              >
                -{discount}%
              </Typography>
            </>
          )}
        </Stack>
      </Box>

      <Button
        variant="contained"
        sx={{
          backgroundColor: main.primary,
          textTransform: "none",
          fontFamily: "Poppins",
          fontWeight: 700,
          fontSize: 13,
          borderRadius: radiusTokens.md,
          px: 3,
          py: 1,
        }}
      >
        Add to Cart
      </Button>

      <Stack
        direction="row"
        alignItems="center"
        gap={1}
        sx={{
          borderLeft: { xs: "none", sm: `1px solid ${border.primary}` },
          pl: { xs: 0, sm: 2 },
          ml: { xs: 0, sm: 1 },
        }}
      >
        <Box>
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 11.5, color: fg.tertiary }}
          >
            Questions about this product?
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            gap={0.5}
            sx={{ cursor: "pointer", color: main.primary }}
          >
            <Chat24Regular style={{ fontSize: 15 }} />
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 12.5,
                fontWeight: 700,
                color: main.primary,
              }}
            >
              Chat
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
