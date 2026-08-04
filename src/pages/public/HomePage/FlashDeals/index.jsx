// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import {
  Flash24Filled,
  ArrowRight24Regular,
  FlashFilled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal, useCountdown } from "../Hooks";
import { useNavigate } from "react-router-dom";

const DEALS = [
  {
    id: 1,
    name: "Running Sneakers",
    seller: "StrideCo",
    original: 420,
    sale: 259,
    claimed: 78,
    image: "1542291026-7eec264c27ff",
  },
  {
    id: 2,
    name: "Smart Watch",
    seller: "PulseTech",
    original: 650,
    sale: 449,
    claimed: 54,
    image: "1523275335684-37898b6baf30",
  },
  {
    id: 3,
    name: "Denim Jacket",
    seller: "UrbanThread",
    original: 380,
    sale: 229,
    claimed: 91,
    image: "1551028719-00167b16eac5",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    seller: "AudioHub",
    original: 180,
    sale: 109,
    claimed: 63,
    image: "1590658268037-6bf12165a8df",
  },
  {
    id: 5,
    name: "Sunglasses",
    seller: "Glare Studio",
    original: 150,
    sale: 89,
    claimed: 40,
    image: "1572635196237-14b3f281503f",
  },
];

function CountdownUnit({ value, label, fg }) {
  return (
    <Stack alignItems="center" sx={{ minWidth: 40 }}>
      <Box
        sx={{
          px: 1,
          py: 0.4,
          borderRadius: radiusTokens.sm,
          backgroundColor: "#1a1a1a",
        }}
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 800,
            color: "#fff",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {value}
        </Typography>
      </Box>
      <Typography
        sx={{ fontSize: 9, color: fg.tertiary, mt: 0.3, letterSpacing: 0.5 }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

function DealCard({ deal, delay }) {
  const { bg, fg, border } = useColor();
  const { ref, className } = useReveal();
  const discount = Math.round(100 - (deal.sale / deal.original) * 100);
  const navigate = useNavigate();
  const handleAllDeals = () => {
    navigate("/categories");
  };

  return (
    <Box
      ref={ref}
      className={className}
      onClick={handleAllDeals}
      sx={{
        position: "relative",
        flex: "0 0 220px",
        cursor: "pointer",
        borderRadius: radiusTokens.md,
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        overflow: "hidden",
        animationDelay: delay,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 16px 28px -14px rgba(0,0,0,0.35)",
        },
        "&:hover .deal-img": { transform: "scale(1.08)" },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 2,
          px: 1,
          py: 0.4,
          borderRadius: radiusTokens.sm,
          background: "linear-gradient(135deg, #ef4444, #f97316)",
          boxShadow: "0 4px 10px -4px rgba(239,68,68,0.7)",
        }}
      >
        <Typography sx={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>
          -{discount}%
        </Typography>
      </Box>

      <Box sx={{ height: 130, overflow: "hidden" }}>
        <Box
          component="img"
          className="deal-img"
          src={`https://images.unsplash.com/photo-${deal.image}?auto=format&fit=crop&w=320&q=60`}
          alt={deal.name}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
          }}
        />
      </Box>

      <Stack gap={0.5} sx={{ p: 1.5 }}>
        <Typography
          sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
          noWrap
        >
          {deal.name}
        </Typography>
        <Typography sx={{ fontSize: 11, color: fg.tertiary }} noWrap>
          {deal.seller}
        </Typography>

        <Stack direction="row" alignItems="baseline" gap={0.8}>
          <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#ef4444" }}>
            ${deal.sale}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: fg.tertiary,
              textDecoration: "line-through",
            }}
          >
            ${deal.original}
          </Typography>
        </Stack>

        <Box sx={{ mt: 0.5 }}>
          <Box
            sx={{
              height: 5,
              borderRadius: 999,
              backgroundColor: border.primary,
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                height: "100%",
                width: `${deal.claimed}%`,
                background: "linear-gradient(90deg, #ef4444, #f97316)",
              }}
            />
          </Box>
          <Typography sx={{ fontSize: 10, color: fg.tertiary, mt: 0.4 }}>
            {deal.claimed}% claimed — almost gone
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default function FlashDeals() {
  const { bg, fg, border } = useColor();
  const { h, m, s } = useCountdown(6);
  const header = useReveal();

  const navigate = useNavigate();
  const handleAllDeals = () => {
    navigate("/categories");
  };

  return (
    <Box sx={{ px: { xs: 3, md: 8 }, py: 8, backgroundColor: bg.secondary }}>
      <Stack
        ref={header.ref}
        className={header.className}
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        gap={2}
        sx={{ mb: 4 }}
      >
        <Stack direction="row" alignItems="center" gap={1.2}>
          <Box
            className="pulse-badge"
            sx={{
              width: { xs: 60, md: 36 },
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #ef4444, #f97316)",
            }}
          >
            <FlashFilled style={{ fontSize: 18, color: "#fff" }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: 20, md: 26 },
                fontWeight: 800,
                color: fg.primary,
              }}
            >
              Flash Deals
            </Typography>
            <Typography sx={{ fontSize: 13, color: fg.secondary }}>
              Prices this good don't last. Grab them before the timer runs out.
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" gap={1}>
          <Stack direction="row" gap={0.7}>
            <CountdownUnit value={h} label="HRS" fg={fg} />
            <Typography
              sx={{ fontSize: 18, fontWeight: 800, color: fg.tertiary }}
            >
              :
            </Typography>
            <CountdownUnit value={m} label="MIN" fg={fg} />
            <Typography
              sx={{ fontSize: 18, fontWeight: 800, color: fg.tertiary }}
            >
              :
            </Typography>
            <CountdownUnit value={s} label="SEC" fg={fg} />
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        gap={spacingTokens.md}
        sx={{ overflowX: "auto", pb: 1 }}
      >
        {DEALS.map((deal, i) => (
          <DealCard
            // onClick={handleAllDeals}
            key={deal.id}
            deal={deal}
            delay={`${i * 0.08}s`}
          />
        ))}
      </Stack>

      <Stack
        onClick={handleAllDeals}
        direction="row"
        alignItems="center"
        gap={0.5}
        sx={{ mt: 3, cursor: "pointer", width: "fit-content" }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}>
          See all deals
        </Typography>
        <ArrowRight24Regular style={{ fontSize: 16, color: fg.primary }} />
      </Stack>
    </Box>
  );
}
