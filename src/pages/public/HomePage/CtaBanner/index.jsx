import { keyframes } from "@emotion/react";
import { Box, Typography, Button, Stack } from "@mui/material";
import {
  Rocket24Filled,
  CompassNorthwest24Regular,
  Flash24Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../Hooks";
import { useNavigate } from "react-router-dom";

const HEADING_FONT = "Bebas Neue";

// Dark navy anchor, shared with Footer.jsx — keeps the two darkest
// surfaces on the page visually related instead of two unrelated palettes.
const DEEP_NAVY = "#0B1224";

const floatBlob = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(12px, -10px) scale(1.08); }
`;

const stickerWiggle = keyframes`
  0%, 100% { transform: rotate(-9deg); }
  50% { transform: rotate(-4deg); }
`;

export default function CTABanner() {
  const { main } = useColor();
  // @ts-ignore
  const { ref, className } = useReveal();

  const navigate = useNavigate();

  // const handleSellers = () => {
  //   navigate("/categories");
  // };

  const handleMarketplace = () => {
    navigate("/categories");
  };

  return (
    <Box
      sx={{
        px: { xs: spacingTokens.md, md: spacingTokens.xl },
        py: spacingTokens.xl,
      }}
    >
      <Box
        ref={ref}
        className={className}
        sx={{
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          borderRadius: radiusTokens.lg,
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 3 },
          background: `linear-gradient(155deg, ${main.primary} 0%, ${DEEP_NAVY} 115%)`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: -60,
            left: -40,
            width: 180,
            height: 180,
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            opacity: 0.1,
            filter: "blur(70px)",
            animation: `${floatBlob} 7s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -80,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            backgroundColor: main.primary,
            opacity: 0.35,
            filter: "blur(80px)",
            animation: `${floatBlob} 8s ease-in-out infinite`,
            animationDelay: "1.2s",
          }}
        />

        <Box sx={{ position: "relative" }}>
          {/* sticker badge */}
          <Box
            sx={{
              display: "inline-flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 90,
              height: 90,
              mb: 2.5,
              borderRadius: "50%",
              backgroundColor: "#fff",
              border: `2px dashed ${main.primary}55`,
              boxShadow: "0 12px 24px -8px rgba(0,0,0,0.35)",
              animation: `${stickerWiggle} 5s ease-in-out infinite`,
            }}
          >
            <Flash24Filled
              style={{ fontSize: 20, color: main.primary, marginBottom: 2 }}
            />
            <Typography
              sx={{
                fontFamily: HEADING_FONT,
                fontSize: 15,
                fontWeight: 800,
                lineHeight: 1,
                color: main.primary,
                letterSpacing: "0.03em",
              }}
            >
              FIRST 10
            </Typography>
            <Typography
              sx={{
                fontFamily: HEADING_FONT,
                fontSize: 15,
                fontWeight: 800,
                lineHeight: 1,
                color: main.primary,
                letterSpacing: "0.03em",
              }}
            >
              FREE
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: HEADING_FONT,
              fontSize: { xs: 28, md: 22 },
              fontWeight: 800,
              textTransform: "capitalize",
              letterSpacing: "0.1rem",
              color: "#fff",
              lineHeight: 1.12,
              mb: 1.75,
            }}
          >
            Whichever side of the sale you're on —
            <br />
            we're ready when you are.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              // onClick={handleSeller}
              startIcon={<Rocket24Filled style={{ fontSize: 20 }} />}
              sx={{
                backgroundColor: "#fff",
                color: main.primary,
                borderRadius: radiusTokens.md,
                textTransform: "none",
                fontWeight: 700,
                px: spacingTokens.lg,
                boxShadow: "0 8px 20px -8px rgba(0,0,0,0.3)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  backgroundColor: "#fff",
                  transform: "translateY(-2px)",
                  boxShadow: "0 14px 28px -10px rgba(0,0,0,0.4)",
                },
              }}
            >
              Become a seller
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={handleMarketplace}
              startIcon={<CompassNorthwest24Regular style={{ fontSize: 20 }} />}
              sx={{
                borderColor: "rgba(255,255,255,0.5)",
                color: "#fff",
                borderRadius: radiusTokens.md,
                border: "1px solid #fff",
                textTransform: "none",
                fontWeight: 700,
                px: spacingTokens.lg,
                transition:
                  "background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.12)",
                  borderColor: "#fff",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Browse the marketplace
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
