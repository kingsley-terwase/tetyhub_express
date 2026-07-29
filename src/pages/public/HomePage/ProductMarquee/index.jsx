// @ts-nocheck
import { Box, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
// @ts-ignore
import { spacingTokens, radiusTokens } from "@/lib/theme";

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    price: "₦42,000",
    sellerName: "AudioHub",
    status: "In stock",
    image: "1590658268037-6bf12165a8df",
  },
  {
    id: 2,
    name: "Hand-loomed Ankara Bag",
    price: "₦18,500",
    sellerName: "Deja Crafts",
    status: "New",
    image: "1584917865442-de89df76afd3",
  },
  {
    id: 3,
    name: "Home Cleaning Service",
    price: "₦15,000",
    sellerName: "SparkleCo",
    status: "In stock",
    image: "1581578731548-c64695cc6952",
  },
  {
    id: 4,
    name: "Cold-Press Juicer",
    price: "₦63,200",
    sellerName: "KitchenEdge",
    status: "Low stock",
    image: "1556909114-f6e7ad7d3136",
  },
  {
    id: 5,
    name: "Logo Design Package",
    price: "₦25,000",
    sellerName: "Studio Nine",
    status: "New",
    image: "1467232004584-a241de8bcf5d",
  },
  {
    id: 6,
    name: "Leather Office Chair",
    price: "₦89,900",
    sellerName: "FurnHaus",
    status: "In stock",
    image: "1519677100203-a0e668c92439",
  },
  {
    id: 7,
    name: "Photography Session",
    price: "₦30,000",
    sellerName: "Lens & Light",
    status: "In stock",
    image: "1516035069371-29a1b244cc32",
  },
  {
    id: 8,
    name: "Organic Skincare Set",
    price: "₦22,750",
    sellerName: "PureLeaf",
    status: "New",
    image: "1571781926291-c477ebfd024b",
  },
];

function statusColor(status, statusTokens) {
  if (status === "New") return "green";
  if (status === "Low stock") return "red";
  if (status === "In stock") return "orange";
  return statusTokens.success;
}

function ProductCard({ product, statusTokens, bg, fg, border }) {
  return (
    <Box
      className="float-card"
      sx={{
        flexShrink: 0,
        width: 240,
        minHeight: 280,
        borderRadius: radiusTokens.md,
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        p: spacingTokens.md,
        mr: spacingTokens.md,
        display: "flex",
        flexDirection: "column",
        transition: "all .3s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{
          height: 190,
          borderRadius: radiusTokens.md,
          backgroundColor: bg.primary,
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={`https://images.unsplash.com/photo-${product.image}?auto=format&fit=crop&w=500&q=80`}
          alt={product.name}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform .4s ease",
            "&:hover": {
              transform: "scale(1.08)",
            },
          }}
        />
      </Box>

      <Typography
        sx={{
          mt: spacingTokens.md,
          mb: 0.5,
          fontSize: 15,
          fontWeight: 700,
          color: fg.primary,
        }}
        noWrap
      >
        {product.name}
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          color: fg.secondary,
          mb: spacingTokens.md,
        }}
        noWrap
      >
        {product.sellerName}
      </Typography>

      <Box
        sx={{
          mt: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: fg.primary,
          }}
        >
          {product.price}
        </Typography>

        <Box
          sx={{
            px: 1,
            py: 0.1,
            borderRadius: radiusTokens.sm,
            border: `1px solid ${statusColor(product.status, statusTokens)}`,
            color: statusColor(product.status, statusTokens),
            fontSize: 11,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {product.status}
        </Box>
      </Box>
    </Box>
  );
}

export default function ProductMarquee({ products = MOCK_PRODUCTS }) {
  const { bg, fg, border, status } = useColor();

  const track = [...products, ...products];

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        height: 320,
        // py: 2,
        // maskImage:
        //   "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        // WebkitMaskImage:
        //   "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <Box
        className="marquee-track"
        sx={{
          display: "flex",
          alignItems: "stretch",
          width: "max-content",
          height: "100%",
        }}
      >
        {track.map((product, i) => (
          <ProductCard
            key={`${product.id}-${i}`}
            product={product}
            statusTokens={status}
            bg={bg}
            fg={fg}
            border={border}
          />
        ))}
      </Box>
    </Box>
  );
}
