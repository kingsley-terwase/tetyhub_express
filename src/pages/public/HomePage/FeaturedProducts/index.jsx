// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import {
  Heart24Regular,
  Heart24Filled,
  ShoppingBagAdd24Regular,
  Star24Filled,
  ArrowRight24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../Hooks";

const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    seller: "AudioHub",
    price: 180,
    original: 220,
    rating: 4.6,
    badge: "Bestseller",
    image: "1590658268037-6bf12165a8df",
  },
  {
    id: 2,
    name: "Leather Tote Bag",
    seller: "Deja Crafts",
    price: 340,
    rating: 4.8,
    badge: "New",
    image: "1584917865442-de89df76afd3",
  },
  {
    id: 3,
    name: "Ceramic Mug Set",
    seller: "KitchenEdge",
    price: 95,
    rating: 4.4,
    image: "1514228742587-6b1558fcca3d",
  },
  {
    id: 4,
    name: "Running Sneakers",
    seller: "StrideCo",
    price: 420,
    original: 480,
    rating: 4.7,
    badge: "Bestseller",
    image: "1542291026-7eec264c27ff",
  },
  {
    id: 5,
    name: "Desk Plant Pot",
    seller: "GreenNook",
    price: 60,
    rating: 4.3,
    image: "1485955900006-10f4d324d411",
  },
  {
    id: 6,
    name: "Sunglasses",
    seller: "Glare Studio",
    price: 150,
    rating: 4.5,
    badge: "New",
    image: "1572635196237-14b3f281503f",
  },
  {
    id: 7,
    name: "Denim Jacket",
    seller: "UrbanThread",
    price: 380,
    rating: 4.6,
    image: "1551028719-00167b16eac5",
  },
  {
    id: 8,
    name: "Smart Watch",
    seller: "PulseTech",
    price: 650,
    original: 720,
    rating: 4.8,
    badge: "Bestseller",
    image: "1523275335684-37898b6baf30",
  },
];

const BADGE_STYLE = {
  New: "linear-gradient(135deg, #0369a1, #38bdf8)",
  Bestseller: "linear-gradient(135deg, #b45309, #f59e0b)",
};

function StarRow({ rating }) {
  const filled = Math.round(rating);
  return (
    <Stack direction="row" gap={0.2}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star24Filled
          key={i}
          style={{ fontSize: 12, color: i < filled ? "#f5a623" : "#d1d5db" }}
        />
      ))}
    </Stack>
  );
}

function ProductCard({ product, delay }) {
  const { bg, fg, border, main } = useColor();
  const { ref, className } = useReveal();
  const [wishlisted, setWishlisted] = useState(false);

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
          transform: "translateY(-5px)",
          boxShadow: "0 18px 30px -16px rgba(0,0,0,0.35)",
        },
        "&:hover .prod-img": { transform: "scale(1.08)" },
        "&:hover .prod-quickadd": { opacity: 1, transform: "translateY(0)" },
      }}
    >
      {product.badge && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 2,
            px: 1,
            py: 0.3,
            borderRadius: radiusTokens.sm,
            background: BADGE_STYLE[product.badge],
          }}
        >
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: 0.3,
            }}
          >
            {product.badge.toUpperCase()}
          </Typography>
        </Box>
      )}

      <IconButton
        size="small"
        onClick={() => setWishlisted((w) => !w)}
        sx={{
          position: "absolute",
          top: 6,
          right: 6,
          zIndex: 2,
          backgroundColor: "rgba(255,255,255,0.85)",
          "&:hover": { backgroundColor: "#fff" },
        }}
      >
        {wishlisted ? (
          <Heart24Filled style={{ fontSize: 16, color: "#ef4444" }} />
        ) : (
          <Heart24Regular style={{ fontSize: 16, color: "#111" }} />
        )}
      </IconButton>

      <Box sx={{ height: 160, overflow: "hidden" }}>
        <Box
          component="img"
          className="prod-img"
          src={`https://images.unsplash.com/photo-${product.image}?auto=format&fit=crop&w=360&q=65`}
          alt={product.name}
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
          className="prod-quickadd"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            py: 1,
            opacity: 0,
            transform: "translateY(8px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
            background: "linear-gradient(0deg, rgba(0,0,0,0.55), transparent)",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={0.6}
            sx={{
              px: 1.5,
              py: 0.6,
              borderRadius: radiusTokens.sm,
              backgroundColor: main.primary,
              cursor: "pointer",
              "&:hover": { opacity: 0.9 },
            }}
          >
            <ShoppingBagAdd24Regular style={{ fontSize: 15, color: "#fff" }} />
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
              Quick add
            </Typography>
          </Stack>
        </Box>
      </Box>

      <Stack gap={0.5} sx={{ p: 1.5 }}>
        <Typography
          sx={{ fontSize: 13, fontWeight: 600, color: fg.primary }}
          noWrap
        >
          {product.name}
        </Typography>
        <Typography sx={{ fontSize: 11, color: fg.tertiary }} noWrap>
          {product.seller}
        </Typography>
        <StarRow rating={product.rating} />
        <Stack direction="row" alignItems="baseline" gap={0.8}>
          <Typography sx={{ fontSize: 15, fontWeight: 800, color: fg.primary }}>
            ${product.price}
          </Typography>
          {product.original && (
            <Typography
              sx={{
                fontSize: 12,
                color: fg.tertiary,
                textDecoration: "line-through",
              }}
            >
              ${product.original}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}

export default function FeaturedProducts() {
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
            Featured Products
          </Typography>
          <Typography sx={{ fontSize: 14, color: fg.secondary }}>
            Handpicked picks buyers keep coming back for.
          </Typography>
        </Box>
        <Stack
          direction="row"
          alignItems="center"
          gap={0.5}
          sx={{ cursor: "pointer" }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}>
            Browse all
          </Typography>
          <ArrowRight24Regular style={{ fontSize: 16, color: fg.primary }} />
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: spacingTokens.md,
        }}
      >
        {PRODUCTS.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            delay={`${i * 0.06}s`}
          />
        ))}
      </Box>
    </Box>
  );
}
