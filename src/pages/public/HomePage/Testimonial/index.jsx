// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import {
  Star24Filled,
  ChevronLeft24Regular,
  ChevronRight24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../Hooks";

const REVIEWS = [
  {
    id: 1,
    name: "Amara Chukwu",
    role: "Buyer, Lagos",
    quote:
      "I was skeptical about buying electronics online from a seller I'd never heard of. The verified badge and reviews sold me — my earbuds arrived two days later, exactly as described.",
    rating: 5,
    avatar: "1580489944761-15a19d654956",
  },
  {
    id: 2,
    name: "Kwame Owusu",
    role: "Seller, AudioHub",
    quote:
      "Listed my first product in under ten minutes. Within a week I had my first three orders. TETYHUB made selling online feel less intimidating than I expected.",
    rating: 5,
    avatar: "1500648767791-00dcc994a43e",
  },
  {
    id: 3,
    name: "Fatima Bello",
    role: "Buyer, Abuja",
    quote:
      "The flash deals are actually good deals, not the fake-discount kind. I've bought from four different sellers now and never had a bad experience.",
    rating: 4,
    avatar: "1573496359142-b8d87734a5a2",
  },
  {
    id: 4,
    name: "Tunde Adeyemi",
    role: "Seller, UrbanThread",
    quote:
      "Customer support actually responds. When a delivery got delayed, I had a real person helping sort it out within the hour, not a bot looping the same message.",
    rating: 5,
    avatar: "1560250097-0b93528c311a",
  },
];

const AVG_RATING = (
  REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
).toFixed(1);
const AUTOPLAY_MS = 6000;

function Slide({ review, main, fg }) {
  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 620,
        mx: "auto",
        textAlign: "center",
        px: { xs: 2, md: 0 },
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: -36,
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: 120,
          fontWeight: 800,
          color: `${main.primary}14`,
          lineHeight: 1,
          userSelect: "none",
          zIndex: 0,
        }}
      >
        "
      </Typography>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction="row"
          justifyContent="center"
          gap={0.4}
          sx={{ mb: 2.5 }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star24Filled
              key={i}
              style={{
                fontSize: 18,
                color: i < review.rating ? "#f5a623" : "#d1d5db",
              }}
            />
          ))}
        </Stack>

        <Typography
          sx={{
            fontSize: { xs: 17, md: 20 },
            color: fg.primary,
            lineHeight: 1.6,
            fontWeight: 500,
            mb: 3.5,
            minHeight: { xs: 140, md: 100 },
          }}
        >
          {review.quote}
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={1.5}
        >
          <Box
            component="img"
            src={`https://images.unsplash.com/photo-${review.avatar}?auto=format&fit=crop&w=96&q=70`}
            alt={review.name}
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              objectFit: "cover",
              border: `2px solid ${main.primary}`,
              padding: "2px",
            }}
          />
          <Box sx={{ textAlign: "left" }}>
            <Typography
              sx={{ fontSize: 14, fontWeight: 700, color: fg.primary }}
            >
              {review.name}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>
              {review.role}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default function Testimonials() {
  const { fg, bg, border, main } = useColor();
  const header = useReveal();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % REVIEWS.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(id);
  }, [paused]);

  const goTo = (i) => setIndex((i + REVIEWS.length) % REVIEWS.length);

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

  return (
    <Box
      sx={{
        position: "relative",
        px: { xs: 3, md: 8 },
        py: 9,
        overflow: "hidden",
        backgroundColor: bg.secondary,
      }}
    >
      {/* faint dot-grid — same restrained texture used in CTABanner, ties sections together */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${border.primary} 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      />

      <Stack
        ref={header.ref}
        className={header.className}
        alignItems="center"
        textAlign="center"
        gap={1}
        sx={{ position: "relative", mb: 6 }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.6,
            px: 1.5,
            py: 0.5,
            mb: 1,
            borderRadius: radiusTokens.sm,
            border: `1px solid ${border.primary}`,
            backgroundColor: bg.primary,
          }}
        >
          <Star24Filled style={{ fontSize: 13, color: "#f5a623" }} />
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: fg.primary }}>
            {AVG_RATING} average · {REVIEWS.length * 340}+ reviews
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: { xs: 24, md: 42 },
            fontWeight: 800,
            color: fg.primary,
            fontFamily: "DM Sans",
          }}
        >
          What people are saying
        </Typography>
        <Typography sx={{ fontSize: 14, color: fg.secondary }}>
          Real buyers and sellers, real experiences.
        </Typography>
      </Stack>

      <Box
        sx={{ position: "relative" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Box sx={{ overflow: "hidden" }}>
          <Box
            sx={{
              display: "flex",
              transform: `translateX(-${index * 100}%)`,
              transition: "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            {REVIEWS.map((review) => (
              <Box key={review.id} sx={{ width: "100%", flexShrink: 0 }}>
                <Slide review={review} main={main} fg={fg} />
              </Box>
            ))}
          </Box>
        </Box>

        <IconButton
          onClick={() => goTo(index - 1)}
          aria-label="Previous testimonial"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            position: "absolute",
            top: "50%",
            left: { sm: -4, md: -20 },
            transform: "translateY(-50%)",
            backgroundColor: bg.primary,
            border: `1px solid ${border.primary}`,
            "&:hover": { backgroundColor: main.primary, color: "#fff" },
          }}
        >
          <ChevronLeft24Regular style={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          onClick={() => goTo(index + 1)}
          aria-label="Next testimonial"
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            position: "absolute",
            top: "50%",
            right: { sm: -4, md: -20 },
            transform: "translateY(-50%)",
            backgroundColor: bg.primary,
            border: `1px solid ${border.primary}`,
            "&:hover": { backgroundColor: main.primary, color: "#fff" },
          }}
        >
          <ChevronRight24Regular style={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      <Stack
        direction="row"
        justifyContent="center"
        gap={0.8}
        sx={{ mt: 4, position: "relative" }}
      >
        {REVIEWS.map((review, i) => (
          <Box
            key={review.id}
            component="button"
            onClick={() => goTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            sx={{
              width: i === index ? 26 : 8,
              height: 8,
              borderRadius: radiusTokens.sm,
              border: "none",
              cursor: "pointer",
              backgroundColor: i === index ? main.primary : border.primary,
              transition: "width 0.3s ease, background-color 0.3s ease",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
