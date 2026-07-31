// @ts-nocheck
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  PersonAdd24Regular,
  Search24Regular,
  ShoppingBag24Regular,
  CalendarLtr24Regular,
  ArrowTrendingLines24Regular,
  Rocket24Filled,
  PersonAddRegular,
  SearchRegular,
  ShoppingBagRegular,
  CalendarLtrRegular,
  ArrowTrendingLinesRegular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../HomePage/Hooks";

const floatBlob = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(14px, -12px) scale(1.08); }
`;

const STEPS = [
  {
    icon: PersonAddRegular,
    color: "#3b82f6",
    title: "Create Your Account",
    body: "Sign up as a buyer or seller in under a minute — no paperwork, no waiting period. Just your name, email, and you're in.",
  },
  {
    icon: SearchRegular,
    color: "#f59e0b",
    title: "Browse Products & Services",
    body: "Shop from verified sellers or explore professionals offering photography, cleaning, design, repairs, and more — all in one place.",
  },
  {
    icon: ShoppingBagRegular,
    color: "#10b981",
    title: "Buy It Now",
    body: "Add to cart, checkout securely, and track your order from confirmation to delivery.",
  },
  {
    icon: CalendarLtrRegular,
    color: "#8b5cf6",
    title: "Or Book a Professional",
    body: "Compare quotes, pick a time that works, and pay securely — funds release only once the job is done.",
  },
  {
    icon: ArrowTrendingLinesRegular,
    color: "#ec4899",
    title: "Buy, Sell, Grow",
    body: "List your own products or offer your services. Get paid fast, with real support whenever you need it.",
  },
];

function Connector({ color, isVisible, isFirst }) {
  const { main } = useColor();
  if (isFirst) return null;

  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        width: 3,
        height: 156,
        mx: "auto",
        borderRadius: 999,
        backgroundColor: isVisible ? color : main.primary,
        transformOrigin: "top",
        transform: isVisible ? "scaleY(1)" : "scaleY(0.3)",
        transition: "background-color 0.6s ease, transform 0.6s ease",
      }}
    />
  );
}

function StepIcon({ Icon, color, isVisible }) {
  return (
    <Box sx={{ position: "relative", width: 96, height: 96 }}>
      <Box
        sx={{
          position: "absolute",
          inset: -14,
          borderRadius: "50%",
          backgroundColor: color,
          opacity: isVisible ? 0.35 : 0,
          filter: "blur(22px)",
          transition: "opacity 0.6s ease",
        }}
      />
      <Box
        sx={{
          position: "relative",
          width: 136,
          height: 136,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `2px solid ${isVisible ? color : "rgba(10, 9, 9, 0.3)"}`,
          backgroundColor: isVisible ? `${color}14` : "transparent",
          transform: isVisible ? "scale(1)" : "scale(0.7)",
          transition:
            "border-color 0.6s ease, background-color 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <Icon
          style={{
            fontSize: 80,
            color: isVisible ? color : "rgba(16, 13, 13, 0.6)",
            transition: "color 0.6s ease",
          }}
        />
      </Box>
    </Box>
  );
}

function StepRow({ step, index }) {
  const { fg } = useColor();
  const { ref, isVisible } = useReveal({ threshold: 0.4 });
  const iconFirst = index % 2 === 0;

  const IconBlock = (
    <Stack alignItems="center" sx={{ flex: "0 0 auto" }}>
      <StepIcon Icon={step.icon} color={step.color} isVisible={isVisible} />
    </Stack>
  );

  const TextBlock = (
    <Stack gap={1} sx={{ flex: 1, maxWidth: 380 }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          backgroundColor: step.color,
          color: "#fff",
          fontFamily: "Poppins",
          fontSize: 14,
          fontWeight: 800,
          boxShadow: isVisible ? `0 6px 16px -4px ${step.color}aa` : "none",
          transition: "box-shadow 0.6s ease",
        }}
      >
        {index + 1}
      </Stack>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 18,
          fontWeight: 700,
          color: fg.primary,
        }}
      >
        {step.title}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 14,
          color: fg.secondary,
          lineHeight: 1.7,
        }}
      >
        {step.body}
      </Typography>
    </Stack>
  );

  return (
    <Box>
      <Connector
        color={step.color}
        isVisible={isVisible}
        isFirst={index === 0}
      />
      <Box
        ref={ref}
        data-aos={iconFirst ? "fade-right" : "fade-left"}
        data-aos-duration="700"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: { xs: 3, md: 8 },
          flexDirection: {
            xs: "column",
            md: iconFirst ? "row" : "row-reverse",
          },
          py: { xs: 3, md: 4 },
          textAlign: { xs: "center", md: iconFirst ? "left" : "right" },
        }}
      >
        {IconBlock}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: iconFirst ? "flex-start" : "flex-end",
          }}
        >
          {TextBlock}
        </Box>
      </Box>
    </Box>
  );
}

export default function HowItWorksPage() {
  const { bg, fg, main } = useColor();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: bg.primary,
        px: { xs: spacingTokens.md, md: spacingTokens.xl },
        py: { xs: 8, md: 10 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -80,
          left: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          backgroundColor: main.primary,
          opacity: 0.08,
          filter: "blur(90px)",
          animation: `${floatBlob} 9s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          right: -60,
          width: 300,
          height: 300,
          borderRadius: "50%",
          backgroundColor: "#ec4899",
          opacity: 0.07,
          filter: "blur(100px)",
          animation: `${floatBlob} 10s ease-in-out infinite`,
          animationDelay: "1.2s",
        }}
      />

      <Stack
        data-aos="fade-up"
        alignItems="center"
        textAlign="center"
        gap={1.5}
        sx={{ position: "relative", maxWidth: 600, mx: "auto", mb: 8 }}
      >
        <Box
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: radiusTokens.full ?? 999,
            border: `1px solid ${main.primary}55`,
            backgroundColor: `${main.primary}0d`,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Syne",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: main.primary,
            }}
          >
            ● HOW IT WORKS
          </Typography>
        </Box>
        <Typography
          sx={{
            fontFamily: "Syne",
            fontSize: { xs: 30, md: 42 },
            fontWeight: 700,
            color: fg.primary,
            lineHeight: 1.1,
          }}
        >
          How it all{" "}
          <Box component="span" sx={{ color: main.primary }}>
            works
          </Box>
        </Typography>
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: 15, color: fg.secondary }}
        >
          Five steps cover it all — whether you're buying a product, booking a
          professional, or building your own store.
        </Typography>
      </Stack>

      <Box sx={{ position: "relative", maxWidth: 900, mx: "auto" }}>
        {STEPS.map((step, i) => (
          <StepRow key={step.title} step={step} index={i} />
        ))}
      </Box>

      <Stack
        data-aos="zoom-in"
        alignItems="center"
        gap={2}
        sx={{ position: "relative", mt: 10 }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 18,
            fontWeight: 700,
            color: fg.primary,
          }}
        >
          Ready to see it for yourself?
        </Typography>
        <Button
          onClick={() => navigate("/register")}
          startIcon={<Rocket24Filled style={{ fontSize: 19 }} />}
          sx={{
            position: "relative",
            overflow: "hidden",
            backgroundColor: main.primary,
            color: "#fff",
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: 700,
            borderRadius: radiusTokens.md,
            px: 3.5,
            py: 1.3,
            boxShadow: `0 10px 24px -8px ${main.primary}66`,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: `0 16px 32px -8px ${main.primary}88`,
            },
            "&:hover::after": { left: "130%" },
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
          }}
        >
          Get Started
        </Button>
      </Stack>
    </Box>
  );
}
