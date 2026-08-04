// @ts-nocheck
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Box, Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheckmark24Filled,
  Globe24Filled,
  People24Filled,
  Sparkle24Filled,
  Rocket24Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal, useCountUp } from "../HomePage/Hooks";
import StatsBand from "../HomePage/StatsBand";

const VALUES = [
  {
    icon: ShieldCheckmark24Filled,
    color: "#3b82f6",
    title: "Trust first",
    body: "Every seller is verified and every transaction is protected — trust isn't a feature, it's the foundation.",
  },
  {
    icon: Globe24Filled,
    color: "#10b981",
    title: "Built for accessibility",
    body: "No huge fees, no complicated setup. Anyone with a product or skill can start selling in minutes.",
  },
  {
    icon: People24Filled,
    color: "#ec4899",
    title: "Community-driven",
    body: "We grow when our sellers grow. Every feature we build starts with a real problem a real seller had.",
  },
  {
    icon: Sparkle24Filled,
    color: "#f59e0b",
    title: "Always improving",
    body: "The marketplace you use today won't be the same next month — we ship fast and listen closely.",
  },
];

const STATS = [
  { value: 1840, suffix: "+", label: "Active sellers" },
  { value: 26000, suffix: "+", label: "Products & services listed" },
  { value: 2, suffix: "", label: "Countries served" },
  { value: 97, suffix: "%", label: "Customer satisfaction" },
];

function StatItem({ stat }) {
  const { fg, main } = useColor();
  const { ref, isVisible } = useReveal();
  const value = useCountUp(stat.value, { duration: 1400, start: isVisible });

  return (
    <Stack ref={ref} alignItems="center" sx={{ flex: "1 1 140px" }}>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: { xs: 26, md: 32 },
          fontWeight: 800,
          color: main.primary,
        }}
      >
        {value.toLocaleString()}
        {stat.suffix}
      </Typography>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 13,
          color: fg.secondary,
          mt: 0.3,
          textAlign: "center",
        }}
      >
        {stat.label}
      </Typography>
    </Stack>
  );
}

export default function AboutPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      {/* Hero */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pt: { xs: 8, md: 11 },
          pb: 6,
          textAlign: "center",
        }}
      >
        <Stack
          data-aos="fade-up"
          alignItems="center"
          gap={2}
          sx={{ maxWidth: 640, mx: "auto" }}
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
              ABOUT TETYHUB
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Syne",
              fontSize: { xs: 32, md: 46 },
              fontWeight: 700,
              color: fg.primary,
              lineHeight: 1.12,
            }}
          >
            Building a marketplace people actually{" "}
            <Box component="span" sx={{ color: main.primary }}>
              trust
            </Box>
          </Typography>
          <Typography
            sx={{
              fontFamily: "Syne",
              fontSize: 16,
              color: fg.secondary,
              lineHeight: 1.6,
            }}
          >
            TETYHUB connects buyers, sellers, and service professionals in one
            place — because finding what you need, or building a business around
            what you offer, shouldn't be complicated.
          </Typography>
        </Stack>
      </Box>

      {/* Story */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: { xs: 6, md: 8 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={5}
          alignItems="center"
        >
          <Box
            data-aos="fade-right"
            sx={{ flex: 1, borderRadius: radiusTokens.lg, overflow: "hidden" }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=700&q=70"
              alt=""
              sx={{
                width: "100%",
                height: 340,
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
          <Stack data-aos="fade-left" gap={2} sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: main.primary,
              }}
            >
              OUR STORY
            </Typography>
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: { xs: 24, md: 28 },
                fontWeight: 700,
                color: fg.primary,
              }}
            >
              Started with one simple frustration
            </Typography>
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: 14.5,
                color: fg.secondary,
                lineHeight: 1.75,
              }}
            >
              Too many small sellers were stuck choosing between platforms built
              for huge retailers, or none at all. TETYHUB started as a simple
              idea: give anyone with a product or a skill a real storefront,
              without the fees or complexity that keep people out.
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 14.5,
                color: fg.secondary,
                lineHeight: 1.75,
              }}
            >
              Today, that's grown into a marketplace where buyers can shop
              products and book services side by side — and where sellers keep
              more of what they earn.
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: { xs: 6, md: 8 },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={5}
          alignItems="center"
        >
          <Stack data-aos="fade-left" gap={2} sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: main.primary,
              }}
            >
              OUR STORY
            </Typography>
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: { xs: 24, md: 28 },
                fontWeight: 700,
                color: fg.primary,
              }}
            >
              Started with one simple frustration
            </Typography>
            <Typography
              sx={{
                fontFamily: "Syne",
                fontSize: 14.5,
                color: fg.secondary,
                lineHeight: 1.75,
              }}
            >
              Too many small sellers were stuck choosing between platforms built
              for huge retailers, or none at all. TETYHUB started as a simple
              idea: give anyone with a product or a skill a real storefront,
              without the fees or complexity that keep people out.
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 14.5,
                color: fg.secondary,
                lineHeight: 1.75,
              }}
            >
              Today, that's grown into a marketplace where buyers can shop
              products and book services side by side — and where sellers keep
              more of what they earn.
            </Typography>
          </Stack>
          <Box
            data-aos="fade-right"
            sx={{ flex: 1, borderRadius: radiusTokens.lg, overflow: "hidden" }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=700&q=70"
              alt=""
              sx={{
                width: "100%",
                height: 340,
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        </Stack>
      </Box>

      {/* Values */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: { xs: 6, md: 8 },
        }}
      >
        <Typography
          data-aos="fade-up"
          sx={{
            fontFamily: "Syne",
            fontSize: { xs: 24, md: 30 },
            fontWeight: 700,
            color: fg.primary,
            textAlign: "center",
            mb: 5,
          }}
        >
          What we stand for
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={2.5}>
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <Stack
                key={v.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                gap={1.2}
                sx={{
                  flex: "1 1 240px",
                  p: 3,
                  borderRadius: radiusTokens.lg,
                  border: `1px solid ${border.primary}`,
                  backgroundColor: bg.secondary,
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: `0 16px 30px -16px ${v.color}55`,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: `${v.color}1a`,
                  }}
                >
                  <Icon style={{ fontSize: 22, color: v.color }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    fontWeight: 700,
                    color: fg.primary,
                  }}
                >
                  {v.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 13.5,
                    color: fg.secondary,
                    lineHeight: 1.6,
                  }}
                >
                  {v.body}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>

      <StatsBand />

      <Box
        sx={{
          my: 6,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: 10,
        }}
      >
        <Stack
          data-aos="zoom-in"
          alignItems="center"
          gap={2}
          sx={{
            textAlign: "center",
            borderRadius: 4,
            py: { xs: 6, md: 4 },
            px: 3,
            background: `linear-gradient(135deg, ${main.primary} 0%, #1e1b4b 130%)`,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Syne",
              fontSize: { xs: 24, md: 32 },
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Join the marketplace built around you
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 15,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 440,
            }}
          >
            Whether you're here to buy, sell, or offer a service — there's a
            place for you.
          </Typography>
          <Button
            onClick={() => navigate("/register")}
            startIcon={<Rocket24Filled style={{ fontSize: 19 }} />}
            sx={{
              mt: 1,
              backgroundColor: "#fff",
              color: main.primary,
              textTransform: "none",
              fontFamily: "Poppins",
              fontWeight: 700,
              borderRadius: radiusTokens.md,
              px: 3.5,
              py: 1.3,
              "&:hover": { backgroundColor: "#fff", opacity: 0.9 },
            }}
          >
            Get Started
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
