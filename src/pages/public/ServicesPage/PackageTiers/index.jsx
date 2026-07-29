// @ts-nocheck
import { Box, Typography, Stack, Button } from "@mui/material";
import { CheckmarkCircle24Filled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

export default function PackageTiers({ packages, onSelect }) {
  const { bg, fg, border, main } = useColor();

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        gap: spacingTokens.md,
      }}
    >
      {packages.map((pkg) => (
        <Box
          key={pkg.name}
          sx={{
            position: "relative",
            border: `2px solid ${pkg.highlighted ? main.primary : border.primary}`,
            borderRadius: radiusTokens.md,
            backgroundColor: pkg.highlighted ? `${main.primary}08` : bg.primary,
            p: spacingTokens.md,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {pkg.highlighted && (
            <Box
              sx={{
                position: "absolute",
                top: -12,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: main.primary,
                color: "#fff",
                fontFamily: "Poppins",
                fontSize: 10.5,
                fontWeight: 700,
                px: 1.2,
                py: 0.3,
                borderRadius: radiusTokens.full ?? 999,
                whiteSpace: "nowrap",
              }}
            >
              MOST POPULAR
            </Box>
          )}

          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 13,
              fontWeight: 700,
              color: fg.secondary,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              mb: 0.8,
            }}
          >
            {pkg.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 24,
              fontWeight: 800,
              color: fg.primary,
              mb: 0.3,
            }}
          >
            ₦{pkg.price.toLocaleString()}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 11.5,
              color: main.primary,
              fontWeight: 600,
              mb: 1.6,
            }}
          >
            {pkg.turnaround}
          </Typography>

          <Stack gap={0.9} sx={{ flexGrow: 1, mb: 2 }}>
            {pkg.features.map((feature) => (
              <Stack
                key={feature}
                direction="row"
                alignItems="flex-start"
                gap={0.7}
              >
                <CheckmarkCircle24Filled
                  style={{
                    fontSize: 15,
                    color: main.primary,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 12.5,
                    color: fg.secondary,
                    lineHeight: 1.5,
                  }}
                >
                  {feature}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <Button
            fullWidth
            onClick={() => onSelect?.(pkg)}
            variant={pkg.highlighted ? "contained" : "outlined"}
            sx={{
              textTransform: "none",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 13,
              borderRadius: radiusTokens.sm,
              py: 1,
              backgroundColor: pkg.highlighted ? main.primary : "transparent",
              borderColor: main.primary,
              color: pkg.highlighted ? "#fff" : main.primary,
            }}
          >
            Select {pkg.name}
          </Button>
        </Box>
      ))}
    </Box>
  );
}
