// @ts-nocheck
import { Box, Stack, Typography, Button } from "@mui/material";
import {
  Star24Filled,
  ShieldCheckmarkRegular,
  ArrowRight24Regular,
  Laptop24Regular,
  Sparkle24Regular,
  Home24Regular,
  WrenchSettingsRegular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../Hooks";

const RANK_STYLE = [
  { gradient: "linear-gradient(135deg, #d4af37, #f5d67f)", ring: "#f5d67f" },
  { gradient: "linear-gradient(135deg, #94a3b8, #e2e8f0)", ring: "#cbd5e1" },
  { gradient: "linear-gradient(135deg, #b45309, #f0b070)", ring: "#f0b070" },
];

const CATEGORY_ICON = {
  Electronics: Laptop24Regular,
  Fashion: Sparkle24Regular,
  "Home & Living": Home24Regular,
  Services: WrenchSettingsRegular,
};

const SELLERS = [
  {
    id: 1,
    name: "AudioHub",
    category: "Electronics",
    rating: 4.8,
    products: 214,
    orders: "3.4k",
    banner: "1518770660439-4636190af475",
    avatar: "1560250097-0b93528c311a",
  },
  {
    id: 2,
    name: "Deja Crafts",
    category: "Fashion",
    rating: 4.6,
    products: 132,
    orders: "2.1k",
    banner: "1445205170230-053b83016050",
    avatar: "1573496359142-b8d87734a5a2",
  },
  {
    id: 3,
    name: "SparkleCo",
    category: "Services",
    rating: 4.9,
    products: 58,
    orders: "1.8k",
    banner: "1581578731548-c64695cc6952",
    avatar: "1580489944761-15a19d654956",
  },
  {
    id: 4,
    name: "KitchenEdge",
    category: "Home & Living",
    rating: 4.7,
    products: 176,
    orders: "2.9k",
    banner: "1449247709967-d4461a6a6103",
    avatar: "1500648767791-00dcc994a43e",
  },
];

function StarRow({ rating }) {
  const filled = Math.round(rating);
  return (
    <Stack direction="row" gap={0.15}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star24Filled
          key={i}
          style={{ fontSize: 12, color: i < filled ? "#f5a623" : "#d1d5db" }}
        />
      ))}
    </Stack>
  );
}

function SellerCard({ seller, rank, delay }) {
  const { bg, fg, border, main } = useColor();
  const { ref, className } = useReveal();
  const Icon = CATEGORY_ICON[seller.category] ?? Laptop24Regular;
  const rankStyle = RANK_STYLE[rank];

  return (
    <Box
      ref={ref}
      className={className}
      sx={{
        position: "relative",
        borderRadius: radiusTokens.md,
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        overflow: "hidden",
        animationDelay: delay,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: `0 18px 32px -16px ${rankStyle?.ring ?? "#00000055"}`,
        },
        "&:hover .seller-banner-img": { transform: "scale(1.1)" },
      }}
    >
      <Box sx={{ position: "relative", height: 92, overflow: "hidden" }}>
        <Box
          component="img"
          className="seller-banner-img"
          src={`https://images.unsplash.com/photo-${seller.banner}?auto=format&fit=crop&w=400&q=60`}
          alt=""
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.4s ease",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.5))",
          }}
        />

        {rankStyle && (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: rankStyle.gradient,
              boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
            }}
          >
            <Typography
              sx={{ fontSize: 12, fontWeight: 800, color: "#1a1a1a" }}
            >
              #{rank + 1}
            </Typography>
          </Stack>
        )}
      </Box>

      <Box sx={{ px: 2, pb: 2 }}>
        <Box
          component="img"
          src={`https://images.unsplash.com/photo-${seller.avatar}?auto=format&fit=crop&w=100&q=70`}
          alt={seller.name}
          sx={{
            width: 58,
            height: 58,
            borderRadius: "50%",
            objectFit: "cover",
            border: `3px solid ${rankStyle?.ring ?? bg.secondary}`,
            mt: "-29px",
            mb: 1,
            display: "block",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        />

        <Stack direction="row" alignItems="center" gap={0.5}>
          <Typography sx={{ fontSize: 15, fontWeight: 700, color: fg.primary }}>
            {seller.name}
          </Typography>
          <ShieldCheckmarkRegular style={{ fontSize: 25, color: "#16a34a" }} />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          gap={0.5}
          sx={{
            display: "inline-flex",
            mt: 0.6,
            mb: 1,
            px: 1,
            py: 0.3,
            borderRadius: radiusTokens.sm,
            backgroundColor: `${main.primary}1a`,
          }}
        >
          <Icon style={{ fontSize: 13, color: main.primary }} />
          <Typography
            sx={{ fontSize: 11, fontWeight: 600, color: main.primary }}
          >
            {seller.category}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" gap={0.6} sx={{ mb: 0.4 }}>
          <StarRow rating={seller.rating} />
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: fg.primary }}>
            {seller.rating}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 11.5, color: fg.tertiary, mb: 1.4 }}>
          {seller.products} products · {seller.orders} orders fulfilled
        </Typography>

        <Button
          fullWidth
          size="small"
          endIcon={<ArrowRight24Regular style={{ fontSize: 15 }} />}
          sx={{
            position: "relative",
            overflow: "hidden",
            textTransform: "none",
            fontWeight: 700,
            fontSize: 13,
            borderRadius: radiusTokens.md,
            border: `1px solid ${border.primary}`,
            color: fg.primary,
            transition: "background-color 0.2s ease, color 0.2s ease",
            "&:hover": {
              backgroundColor: main.primary,
              color: "#fff",
              borderColor: main.primary,
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
                "linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent)",
              transform: "skewX(-20deg)",
              transition: "left 0.6s ease",
            },
          }}
        >
          Visit store
        </Button>
      </Box>
    </Box>
  );
}

export default function TopSellers() {
  const { fg } = useColor();
  const header = useReveal();

  return (
    <Box sx={{ px: { xs: 3, md: 8 }, py: 8 }}>
      <Stack
        ref={header.ref}
        className={header.className}
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        gap={1}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 24, md: 30 },
              fontWeight: 800,
              color: fg.primary,
              mb: 0.5,
            }}
          >
            Top Sellers
          </Typography>
          <Typography sx={{ fontSize: 14, color: fg.secondary }}>
            Ranked by rating and orders fulfilled — verified shops buyers trust.
          </Typography>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={0.5}
          sx={{ cursor: "pointer" }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}>
            View all sellers
          </Typography>
          <ArrowRight24Regular style={{ fontSize: 16, color: fg.primary }} />
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: spacingTokens.md,
        }}
      >
        {SELLERS.map((seller, i) => (
          <SellerCard
            key={seller.id}
            seller={seller}
            rank={i}
            delay={`${i * 0.08}s`}
          />
        ))}
      </Box>
    </Box>
  );
}
