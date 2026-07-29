// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import {
  ChevronLeft24Regular,
  ChevronRight24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";

const SELLERS = [
  {
    name: "Kwame Owusu",
    location: "Accra, Ghana",
    quote:
      "Listed my first product in under ten minutes. Within a week I had my first three orders — I still can't believe how simple it was.",
    avatar: "1500648767791-00dcc994a43e",
  },
  {
    name: "Amara Chukwu",
    location: "Lagos, Nigeria",
    quote:
      "Payouts actually hit my account when they say they will. No chasing, no stress, just steady sales every week.",
    avatar: "1580489944761-15a19d654956",
  },
  {
    name: "Tunde Adeyemi",
    location: "Ibadan, Nigeria",
    quote:
      "I run my whole store from my phone during lunch breaks. It's genuinely that simple, and support actually responds.",
    avatar: "1560250097-0b93528c311a",
  },
  {
    name: "Arlene McCoy",
    location: "Kumasi, Ghana",
    quote:
      "TETYHUB gave my small business real reach. I went from selling to friends to shipping across three regions in two months.",
    avatar: "1573496359142-b8d87734a5a2",
  },
  {
    name: "Segun Bello",
    location: "Abuja, Nigeria",
    quote:
      "The seller dashboard makes it easy to see what's actually working. I doubled my listings once I saw which products sold fastest.",
    avatar: "1519085360753-af0119f7cbe7",
  },
  {
    name: "Yaw Mensah",
    location: "Takoradi, Ghana",
    quote:
      "Customer support helped me sort a delivery issue within the hour. That kind of responsiveness is rare.",
    avatar: "1531891437562-4301cf35b7e5",
  },
  {
    name: "Ngozi Eze",
    location: "Enugu, Nigeria",
    quote:
      "Setting up my store took less time than making breakfast. Orders started coming in the same week.",
    avatar: "1607346256330-dee7af15f7c5",
  },
];

function AvatarArc({ active, setActive }) {
  const { main, bg } = useColor();
  const mid = Math.floor(SELLERS.length / 2);

  return (
    <Stack
      direction="row"
      alignItems="flex-end"
      justifyContent="center"
      gap={{ xs: 1, md: 2.2 }}
      sx={{ mb: 4 }}
    >
      {SELLERS.map((s, i) => {
        const isActive = i === active;
        const distance = Math.abs(i - mid);
        const lift = isActive ? 0 : Math.min(distance * 11, 36);
        const size = isActive ? 64 : 46;

        return (
          <Box
            key={s.name}
            onClick={() => setActive(i)}
            sx={{
              width: size,
              height: size,
              borderRadius: "50%",
              overflow: "hidden",
              cursor: "pointer",
              flexShrink: 0,
              transform: `translateY(-${lift}px)`,
              transition:
                "transform 0.35s ease, width 0.35s ease, height 0.35s ease, box-shadow 0.3s ease",
              border: isActive
                ? `3px solid ${main.primary}`
                : `2px solid ${bg.secondary}`,
              boxShadow: isActive
                ? `0 8px 20px -6px ${main.primary}77`
                : "none",
            }}
          >
            <Box
              component="img"
              src={`https://images.unsplash.com/photo-${s.avatar}?auto=format&fit=crop&w=160&q=75`}
              alt={s.name}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>
        );
      })}
    </Stack>
  );
}

export default function SellerTestimonials() {
  const { bg, fg, border, main } = useColor();
  const [active, setActive] = useState(3);
  const current = SELLERS[active];

  const go = (dir) =>
    setActive((a) => (a + dir + SELLERS.length) % SELLERS.length);

  return (
    <Box
      sx={{
        position: "relative",
        px: { xs: 3, md: 8 },
        py: 8,
        overflow: "hidden",
      }}
    >
      {/* decorative scalloped divider, echoing the reference */}
      <Box
        sx={{
          position: "absolute",
          top: -1,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: bg.secondary,
          borderRadius: "0 0 50% 50% / 0 0 100% 100%",
          opacity: 0.5,
        }}
      />

      <Stack
        alignItems="center"
        textAlign="center"
        gap={1}
        sx={{ position: "relative", mb: 5 }}
      >
        <Typography
          sx={{
            fontSize: { xs: 24, md: 30 },
            fontWeight: 900,
            color: fg.primary,
          }}
        >
          What Our Sellers Say
        </Typography>
        <Typography
          sx={{
            // fontFamily: "Poppins",
            fontSize: 14,
            color: fg.secondary,
            maxWidth: 460,
          }}
        >
          Real stores, real growth — hear it directly from the people building
          their business on TETYHUB.
        </Typography>
      </Stack>

      <AvatarArc active={active} setActive={setActive} />

      <Box sx={{ position: "relative", maxWidth: 640, mx: "auto" }}>
        <IconButton
          onClick={() => go(-1)}
          sx={{
            position: "absolute",
            left: { xs: -8, md: -56 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: main.primary,
            color: "#fff",
            "&:hover": { backgroundColor: main.primary, opacity: 0.9 },
          }}
        >
          <ChevronLeft24Regular style={{ fontSize: 18 }} />
        </IconButton>

        <Stack
          alignItems="center"
          textAlign="center"
          gap={1.2}
          sx={{
            borderRadius: radiusTokens.lg,
            border: `1px solid ${border.primary}`,
            backgroundColor: bg.secondary,
            px: { xs: 3, md: 6 },
            py: { xs: 4, md: 5 },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 18,
              fontWeight: 800,
              color: main.primary,
            }}
          >
            {current.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: fg.tertiary,
              textTransform: "uppercase",
            }}
          >
            {current.location}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 14.5,
              color: fg.secondary,
              lineHeight: 1.75,
              mt: 1,
            }}
          >
            {current.quote}
          </Typography>
        </Stack>

        <IconButton
          onClick={() => go(1)}
          sx={{
            position: "absolute",
            right: { xs: -8, md: -56 },
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: main.primary,
            color: "#fff",
            "&:hover": { backgroundColor: main.primary, opacity: 0.9 },
          }}
        >
          <ChevronRight24Regular style={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );
}
