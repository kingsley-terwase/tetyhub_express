// @ts-nocheck
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Sparkle24Filled,
  Sparkle24Filled as SparkleBadgeIcon,
  CheckmarkCircle24Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { useCountUp, useReveal } from "../../HomePage/Hooks";
import { useNavigate } from "react-router-dom";

const FONT = "Poppins";

const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const STATS = [
  { value: 1840, suffix: "+", label: "ACTIVE SELLERS" },
  { value: 26, suffix: "K+", label: "PRODUCTS LISTED" },
  { value: 97, suffix: "%", label: "BUYER SATISFACTION" },
];

function Stat({ stat }) {
  const [ref, isVisible] = useReveal();

  const value = useCountUp(stat.value, {
    duration: 1400,
    start: isVisible,
  });

  return (
    <Stack ref={ref} sx={{ minWidth: 90 }}>
      <Typography
        sx={{
          fontSize: { xs: 22, md: 28 },
          fontWeight: 800,
          color: "#fff",
        }}
      >
        {value.toLocaleString()}
        {stat.suffix}
      </Typography>

      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: "rgba(255,255,255,0.7)",
        }}
      >
        {stat.label}
      </Typography>
    </Stack>
  );
}
export default function AuthLeftPanel() {
  const { main } = useColor();
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        minHeight: "100vh",
        width: "45%",
        p: 2,
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=900&q=70"
        alt=""
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.9) 100%)",
        }}
      />

      <Stack
        alignItems="center"
        justifyContent="center"
        gap={0.3}
        sx={{
          position: "absolute",
          top: 28,
          right: 28,
          zIndex: 1,
          width: 64,
          height: 64,
          borderRadius: 2,
          backgroundColor: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.25)",
          backdropFilter: "blur(4px)",
          animation: `${floatY} 3.5s ease-in-out infinite`,
        }}
      >
        <SparkleBadgeIcon style={{ fontSize: 16, color: main.primary }} />
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: 8,
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "#fff",
          }}
        >
          FEATURED
        </Typography>
      </Stack>

      <Typography
        onClick={handleHome}
        sx={{
          position: "relative",
          zIndex: 1,
          fontFamily: FONT,
          fontSize: 28,
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.01em",
          cursor: "pointer",
          mb: 5,
        }}
      >
        TETY
        <Box component="span" sx={{ color: main.primary }}>
          HUB
        </Box>
      </Typography>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Stack direction="row" alignItems="center" gap={0.6} sx={{ mb: 2 }}>
          <Sparkle24Filled style={{ fontSize: 14, color: "#fbbf24" }} />
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#fbbf24",
            }}
          >
            THE MARKETPLACE FOR EVERYONE
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: { md: 40, lg: 48 },
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#fff",
            mb: 0.5,
          }}
        >
          WHERE
        </Typography>
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: { md: 40, lg: 48 },
            fontWeight: 800,
            lineHeight: 1.25,
            color: "transparent",
            WebkitTextStroke: "1.5px #fbbf24",
            mb: 0.5,
          }}
        >
          BUYERS & SELLERS
        </Typography>
        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: { md: 40, lg: 48 },
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#fff",
            mb: 3,
          }}
        >
          MEET
        </Typography>

        <Typography
          sx={{
            fontFamily: FONT,
            fontSize: 15,
            color: "rgba(255,255,255,0.85)",
            maxWidth: 380,
            mb: 3,
          }}
        >
          Connect with verified sellers, discover real products, and build a
          store of your own — all in one place.
        </Typography>

        <Stack gap={1.4} sx={{ mb: 4 }}>
          {[
            "Verified sellers across every category",
            "Real-time order tracking",
            "Secure payments, every time",
            "24/7 buyer & seller support",
          ].map((item) => (
            <Stack key={item} direction="row" alignItems="center" gap={1.2}>
              <CheckmarkCircle24Filled
                style={{
                  fontSize: 18,
                  backgroundColor: "#fff",
                  borderRadius: 50,
                  color: main.primary,
                  flexShrink: 0,
                }}
              />
              <Typography
                sx={{
                  fontFamily: FONT,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.92)",
                }}
              >
                {item}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Box
          sx={{
            height: "1px",
            backgroundColor: "rgba(255,255,255,0.2)",
            mb: 3,
          }}
        />

        <Stack direction="row" gap={4} sx={{ mb: 2 }}>
          {STATS.map((s) => (
            <Stat key={s.label} stat={s} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
