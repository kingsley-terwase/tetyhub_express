// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography, Button, IconButton } from "@mui/material";
import {
  Rocket24Filled,
  People24Filled,
  Timer24Regular,
  Flash24Filled,
  Phone24Regular,
  ChevronLeft24Regular,
  ChevronRight24Regular,
  CheckmarkCircle24Filled,
  ArrowTrending24Filled,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

const floatY = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const floatBlob = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(16px, -14px) scale(1.08); }
`;

const slideFadeIn = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AUTOPLAY_MS = 6000;

// Each slide carries its own background, headline, and social-proof badge —
// the original static checklist ("no listing fees" / "48hr payout" /
// "manage from your phone") became slides 2–4 instead of bullet lines.
const SLIDES = [
  {
    eyebrow: "SELL ON TETYHUB",
    headline: "Turn what you make into",
    highlight: "what you earn",
    body: "Open your store in minutes, reach thousands of buyers, and get paid fast. No huge fees, no complicated setup — just you and your products.",
    icon: People24Filled,
    badge: "1,840+ sellers already earning",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=70",
    stats: [
      { label: "Active sellers", value: "1,840+" },
      { label: "Categories", value: "30+" },
      { label: "Avg. rating", value: "4.7★" },
    ],
    chartBars: [40, 65, 50, 80, 60, 90],
  },
  {
    eyebrow: "LIST IN MINUTES",
    headline: "Your first listing takes",
    highlight: "under 5 minutes",
    body: "Snap a few photos, set your price, and you're live. No approval queue standing between you and your first sale.",
    icon: Timer24Regular,
    badge: "Average listing time: 4 minutes",
    image:
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=1600&q=70",
    stats: [
      { label: "Setup time", value: "4 min" },
      { label: "Photos needed", value: "3" },
      { label: "Approval", value: "Instant" },
    ],
    chartBars: [20, 35, 55, 70, 85, 95],
  },
  {
    eyebrow: "GET PAID FAST",
    headline: "Funds land in your account",
    highlight: "within 48 hours",
    body: "No manual chasing, no waiting weeks for a payout. Once a delivery's confirmed, your money is on its way.",
    icon: Flash24Filled,
    badge: "₦2.3M+ paid out to sellers this month",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=70",
    stats: [
      { label: "Payout speed", value: "48 hrs" },
      { label: "Listing fees", value: "0% × 10" },
      { label: "Paid out", value: "₦2.3M+" },
    ],
    chartBars: [50, 45, 65, 60, 80, 100],
  },
  {
    eyebrow: "RUN IT FROM ANYWHERE",
    headline: "Manage your whole store",
    highlight: "from your phone",
    body: "New orders, messages, and payouts — all in one dashboard that works as well on mobile as it does on a laptop you may not even own.",
    icon: Phone24Regular,
    badge: "No laptop required",
    image:
      "https://images.unsplash.com/photo-1512418490979-92798cec1380?auto=format&fit=crop&w=1600&q=70",
    stats: [
      { label: "Devices", value: "Any" },
      { label: "Support", value: "24/7" },
      { label: "Dashboards", value: "1 app" },
    ],
    chartBars: [60, 55, 70, 65, 75, 85],
  },
];

export default function SellHero() {
  const { main } = useColor();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [paused]);

  const goTo = (i) => setIndex((i + SLIDES.length) % SLIDES.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) goTo(index - 1);
    else if (delta < -50) goTo(index + 1);
    touchStartX.current = null;
  };

  const slide = SLIDES[index];
  const Icon = slide.icon;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: { xs: 560, md: 620 },
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cross-fading backgrounds — all slides render simultaneously, stacked,
          only the active one visible, so switching slides fades rather than cuts.
          The slow scale-up on the active one is the "Ken Burns" zoom. */}
      {SLIDES.map((s, i) => (
        <Box
          key={s.image}
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === index ? 1 : 0,
            transform: i === index ? "scale(1.08)" : "scale(1)",
            transition: "opacity 1.2s ease, transform 8s ease-out",
          }}
        />
      ))}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(160deg, #000 0%, rgba(10,10,20,0.9) 100%)`,
        }}
      />

      {/* floating glow blobs — decorative, constant across slides */}
      <Box
        sx={{
          position: "absolute",
          top: -60,
          left: -40,
          width: 220,
          height: 220,
          borderRadius: "50%",
          backgroundColor: "#fbbf24",
          opacity: 0.2,
          filter: "blur(70px)",
          animation: `${floatBlob} 8s ease-in-out infinite`,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          right: -30,
          width: 260,
          height: 260,
          borderRadius: "50%",
          backgroundColor: "#ec4899",
          opacity: 0.18,
          filter: "blur(80px)",
          animation: `${floatBlob} 9s ease-in-out infinite`,
          animationDelay: "1s",
        }}
      />

      {/* content — two columns on desktop: copy on the left, a visual on the
          right instead of leaving that whole side empty behind the badge */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        justifyContent="space-between"
        gap={{ xs: 5, md: 4 }}
        sx={{
          position: "relative",
          zIndex: 2,
          minHeight: { xs: 560, md: 620 },
          px: { xs: 3, md: 8 },
          py: 8,
        }}
      >
        <Box sx={{ flex: { md: "0 1 560px" }, width: "100%" }}>
          <Stack
            key={index}
            gap={2.2}
            sx={{ animation: `${slideFadeIn} 0.6s ease-out` }}
          >
            <Box
              sx={{
                display: "inline-flex",
                px: 1.5,
                py: 0.5,
                width: "fit-content",
                borderRadius: radiusTokens.full ?? 999,
                border: "1px solid rgba(255,255,255,0.35)",
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "#fbbf24",
                }}
              >
                {slide.eyebrow}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: { xs: 32, md: 50 },
                fontWeight: 800,
                lineHeight: 1.1,
                color: "#fff",
              }}
            >
              {slide.headline}{" "}
              <Box component="span" sx={{ color: "#fbbf24" }}>
                {slide.highlight}
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: 16,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.6,
              }}
            >
              {slide.body}
            </Typography>
          </Stack>

          {/* CTA sits outside the keyed block — stays put, doesn't re-animate every slide */}
          <Button
            onClick={() => navigate("/register")}
            startIcon={<Rocket24Filled style={{ fontSize: 19 }} />}
            sx={{
              width: "fit-content",
              backgroundColor: "#fff",
              color: main.primary,
              textTransform: "none",
              fontFamily: "Poppins",
              fontWeight: 700,
              borderRadius: radiusTokens.md,
              px: 3.5,
              py: 1.3,
              mt: 3,
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 10px 24px -8px rgba(0,0,0,0.4)",
              "&:hover": {
                backgroundColor: "#fff",
                transform: "translateY(-3px)",
                boxShadow: "0 16px 32px -8px rgba(0,0,0,0.5)",
              },
            }}
          >
            Start Selling Today
          </Button>
        </Box>

        {/* dashboard preview — desktop only, this is what used to be empty space */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* floating notification toast, overlapping the card's top-left corner */}
          <Box
            key={`badge-${index}`}
            sx={{
              position: "absolute",
              top: -22,
              left: -22,
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              px: 1.75,
              py: 1,
              borderRadius: radiusTokens.lg,
              backgroundColor: "rgba(255,255,255,0.14)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.28)",
              animation: `${slideFadeIn} 0.6s ease-out, ${floatY} 4s ease-in-out 0.6s infinite`,
              whiteSpace: "nowrap",
            }}
          >
            <Icon style={{ fontSize: 17, color: "#fbbf24" }} />
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
              {slide.badge}
            </Typography>
          </Box>

          <Box>
            <Box
              component="img"
              src="/Image/db.png"
              alt="Dashboard Preview"
              sx={{
                width: "100%",
                maxWidth: 720,
                height: "auto",
                objectFit: "contain",
                borderRadius: 4,
                animation: `${floatY} 6s ease-in-out infinite`,
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,.45))",
              }}
            />
          </Box>
        </Box>

        {/* nav arrows */}
        <IconButton
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            position: "absolute",
            top: "50%",
            left: { sm: 12, md: 24 },
            transform: "translateY(-50%)",
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.12)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.22)" },
          }}
        >
          <ChevronLeft24Regular style={{ fontSize: 22 }} />
        </IconButton>
        <IconButton
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            position: "absolute",
            top: "50%",
            right: { sm: 12, md: 24 },
            transform: "translateY(-50%)",
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.12)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.22)" },
          }}
        >
          <ChevronRight24Regular style={{ fontSize: 22 }} />
        </IconButton>

        {/* dot indicators */}
        <Stack
          direction="row"
          gap={0.8}
          sx={{ position: "absolute", bottom: 24, left: { xs: 24, md: 64 } }}
        >
          {SLIDES.map((s, i) => (
            <Box
              key={s.image}
              component="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              sx={{
                width: i === index ? 26 : 8,
                height: 8,
                borderRadius: radiusTokens.sm,
                border: "1px solid rgba(255,255,255,0.5)",
                cursor: "pointer",
                backgroundColor:
                  i === index ? "#fbbf24" : "rgba(255,255,255,0.3)",
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
