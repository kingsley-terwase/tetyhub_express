// @ts-nocheck
import { Box, Typography, Button, Stack } from "@mui/material";
import {
  Rocket24Filled,
  CompassNorthwest24Regular,
  Flash24Regular,
  PersonAdd24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius, radiusTokens } from "@/lib/theme";
import { useReveal } from "../Hooks";
import ProductMarquee from "../ProductMarquee";
import TrustBadge from "./TrustBadge";
import LiveBadge from "./LiveBadge";
import { useNavigate } from "react-router-dom";

// Recommend adding this to your MUI theme's typography.fontFamily instead
// of repeating it per-component — kept local here only so this file is
// self-contained until that theme change lands.
const HEADING_FONT = "Syne";

// @ts-ignore
function RevealBlock({ delay = 0, children, sx }) {
  const [ref, isVisible] = useReveal({ threshold: 0.1 });
  return (
    <Box
      ref={ref}
      className={`reveal-el ${isVisible ? "is-visible" : ""}`}
      sx={{ animationDelay: `${delay}ms`, ...sx }}
    >
      {children}
    </Box>
  );
}

function FloatingBadge({
  icon: Icon,
  label,
  value,
  delta,
  position,
  bg,
  fg,
  border,
  main,
}) {
  return (
    <Box
      className="float-card"
      sx={{
        position: "absolute",
        ...position,
        display: "flex",
        alignItems: "center",
        gap: spacingTokens.sm,
        backgroundColor: bg.primary,
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.lg,
        boxShadow: "0 12px 32px -12px rgba(15, 23, 42, 0.18)",
        px: spacingTokens.md,
        py: spacingTokens.sm,
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: radiusTokens.md,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `${main.primary}1a`,
          color: main.primary,
          flexShrink: 0,
        }}
      >
        <Icon style={{ fontSize: 18 }} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 11, color: fg.secondary, lineHeight: 1.2 }}>
          {label}
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 700,
            color: fg.primary,
            lineHeight: 1.3,
          }}
        >
          {value}{" "}
          <Box
            component="span"
            sx={{ fontSize: 11, fontWeight: 600, color: "#16A34A" }}
          >
            {delta}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}

export default function Hero() {
  const { bg, fg, main, border } = useColor();

  const navigate = useNavigate();

  const handleSell = () => {
    navigate("/login");
  };

  const handleMarketPlace = () => {
    navigate("/categories");
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
        alignItems: "center",
        gap: spacingTokens.xl,
        px: { xs: spacingTokens.md, md: spacingTokens.xl },
        pt: { xs: spacingTokens.xl, md: 4 },
        pb: spacingTokens.xl,
        backgroundColor: bg.primary,
        fontFamily: HEADING_FONT,
      }}
    >
      <Box>
        <RevealBlock delay={0} children={undefined} sx={undefined}>
          <LiveBadge />
        </RevealBlock>

        <RevealBlock delay={120} children={undefined} sx={undefined}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: HEADING_FONT,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              fontSize: { xs: 38, sm: 52, md: 60 },
              color: fg.primary,
              mb: spacingTokens.md,
            }}
          >
            From first sale to
            <br />
            running your own store.
          </Typography>
        </RevealBlock>

        <RevealBlock delay={240} children={undefined} sx={undefined}>
          <Typography
            sx={{
              fontFamily: HEADING_FONT,
              fontSize: { xs: 16, md: 18 },
              color: fg.secondary,
              maxWidth: 480,
              lineHeight: 1.6,
              mb: spacingTokens.lg,
            }}
          >
            TETYHUB puts verified sellers and real buyers on one platform — list
            a product in minutes, or shop from a seller who's already been
            checked out for you.
          </Typography>
        </RevealBlock>

        <RevealBlock delay={360} children={undefined} sx={undefined}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={spacingTokens.sm}
          >
            <Button
              onClick={handleSell}
              variant="contained"
              size="large"
              startIcon={<Rocket24Filled style={{ fontSize: 20 }} />}
              sx={{
                fontFamily: HEADING_FONT,
                position: "relative",
                overflow: "hidden",
                backgroundColor: main.primary,
                borderRadius: radiusTokens.md,
                textTransform: "none",
                fontWeight: 700,
                px: spacingTokens.lg,
                letterSpacing: "0.1rem",
                boxShadow: `0 8px 20px -6px ${main.primary}66`,
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "& .MuiButton-startIcon svg": {
                  transition: "transform 0.3s ease",
                },
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: `0 14px 28px -8px ${main.primary}88`,
                },
                "&:hover .MuiButton-startIcon svg": {
                  transform: "rotate(-8deg) translateX(2px)",
                },
                "&:active": { transform: "translateY(-1px)" },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-60%",
                  width: "40%",
                  height: "100%",
                  background:
                    "linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)",
                  transform: "skewX(-20deg)",
                  transition: "left 0.6s ease",
                },
                "&:hover::after": { left: "130%" },
              }}
            >
              Start selling
            </Button>

            <Button
              onClick={handleMarketPlace}
              variant="outlined"
              size="large"
              startIcon={<CompassNorthwest24Regular style={{ fontSize: 20 }} />}
              sx={{
                fontFamily: HEADING_FONT,
                border: `2px solid ${fg.primary}`,
                color: fg.primary,
                borderRadius: radiusTokens.md,
                textTransform: "none",
                fontWeight: 700,
                px: spacingTokens.lg,
                transition:
                  "background-color 0.25s ease, color 0.25s ease, transform 0.25s ease",
                "& .MuiButton-startIcon svg": {
                  transition: "transform 0.5s ease",
                },
                "&:hover": {
                  backgroundColor: fg.primary,
                  color: bg.primary,
                  transform: "translateY(-3px)",
                },
                "&:hover .MuiButton-startIcon svg": {
                  transform: "rotate(360deg)",
                },
                "&:active": { transform: "translateY(-1px)" },
              }}
            >
              Explore the marketplace
            </Button>
          </Stack>
        </RevealBlock>
        <RevealBlock delay={360} children={undefined} sx={undefined}>
          <Box sx={{ mt: spacingTokens.md }}>
            <TrustBadge />
          </Box>
        </RevealBlock>
      </Box>

      <RevealBlock
        delay={300}
        sx={{ minWidth: 0, position: "relative", pt: 9, pb: 9 }}
      >
        <Box
          sx={{
            borderRadius: radiusTokens.lg,
            background: `linear-gradient(160deg, ${main.primary}14, ${bg.secondary})`,
            border: `1px solid ${border.primary}`,
            p: spacingTokens.xl,
          }}
        >
          <ProductMarquee />
        </Box>

        <FloatingBadge
          icon={Flash24Regular}
          label="Orders today"
          value="1,284"
          delta="+18%"
          position={{ top: -8, left: -8 }}
          bg={bg}
          fg={fg}
          border={border}
          main={main}
        />
        <FloatingBadge
          icon={PersonAdd24Regular}
          label="New sellers this week"
          value="247"
          delta="+9%"
          position={{ bottom: -8, right: -8 }}
          bg={bg}
          fg={fg}
          border={border}
          main={main}
        />
      </RevealBlock>
    </Box>
  );
}
