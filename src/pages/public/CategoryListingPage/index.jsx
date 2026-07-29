// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { ChevronDown16Regular, Flash20Filled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import CategorySidebar from "./CategorySidebar";
import ProductListingCard from "./ProductListingCard";
import Pagination from "./Pagination";

const TOP_PILLS = [
  "Men's Fashion",
  "Women's Fashion",
  "Kid's Fashion",
  "Watches",
  "Health & Beauty",
  "Baby Products",
];

// --- Placeholder data generator -------------------------------------------
// Real catalogs have one image per product; this one doesn't yet, so each
// category's small seed pool (the images/names you already had) gets cycled
// with a variant suffix and jittered price/rating to reach 20 entries.
// Swap this whole block for a real product fetch once the API exists —
// nothing downstream (click-through, cards, pagination) needs to change.
const VARIANT_LABELS = ["", "Pro", "Lite", "2024 Edition", "Bundle Pack"];

function generateCategoryProducts(category, seeds, count = 20) {
  const products = [];
  for (let i = 0; i < count; i++) {
    const seed = seeds[i % seeds.length];
    const pass = Math.floor(i / seeds.length);
    const suffix = VARIANT_LABELS[pass % VARIANT_LABELS.length];
    products.push({
      id: `${category.toLowerCase().replace(/[^a-z]+/g, "-")}-${i + 1}`,
      category,
      name: suffix ? `${seed.name} — ${suffix}` : seed.name,
      price: seed.price + ((i * 137) % 2000),
      originalPrice: seed.originalPrice
        ? seed.originalPrice + ((i * 97) % 1500)
        : null,
      rating: 3 + (i % 3),
      ratingCount: seed.ratingCountBase + i * 47,
      official: i % 3 !== 0,
      express: i % 4 !== 3,
      image: seed.image,
    });
  }
  return products;
}

const SEEDS = {
  Electronics: [
    {
      name: "Ace Elec 20000 MAH Ultra Slim Portable Power Bank",
      price: 7650,
      originalPrice: 12000,
      ratingCountBase: 155769,
      image:
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "Wireless Earbuds Pro with Charging Case",
      price: 18900,
      originalPrice: 24500,
      ratingCountBase: 6420,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "Smart Watch Series X Fitness Tracker",
      price: 32500,
      originalPrice: 39900,
      ratingCountBase: 4210,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=70",
    },
  ],
  "Home & Office": [
    {
      name: "SILVER CREST 2L Industrial 8500W Food Crusher Blender",
      price: 22999,
      originalPrice: 26386,
      ratingCountBase: 18271,
      image:
        "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "Syinix 2.2L Electric Kettle - Silver",
      price: 6299,
      originalPrice: 7229,
      ratingCountBase: 13201,
      image:
        "https://images.unsplash.com/photo-1594213047049-e206b6ea9cc8?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "HANSEN Electric Iron Pressing Clothes 1000W",
      price: 5999,
      originalPrice: 7117,
      ratingCountBase: 8685,
      image:
        "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "Ceramic Mug Set of 4, Modern Design",
      price: 4750,
      originalPrice: null,
      ratingCountBase: 2130,
      image:
        "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=400&q=70",
    },
  ],
  Fashion: [
    {
      name: "Running Sneakers Lightweight Breathable",
      price: 21000,
      originalPrice: 27500,
      ratingCountBase: 9840,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "Classic Canvas Sneakers, All White",
      price: 9800,
      originalPrice: 13500,
      ratingCountBase: 3210,
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "High-Top Basketball Shoes, Grip Sole",
      price: 24000,
      originalPrice: 29900,
      ratingCountBase: 1540,
      image:
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "Slip-On Loafers, Everyday Comfort",
      price: 11200,
      originalPrice: null,
      ratingCountBase: 890,
      image:
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=400&q=70",
    },
    {
      name: "Trail Running Shoes, Water Resistant",
      price: 27500,
      originalPrice: 33000,
      ratingCountBase: 2670,
      image:
        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=70",
    },
  ],
  "Phones & Tablets": [
    {
      name: "10-inch Android Tablet 128GB Storage",
      price: 68500,
      originalPrice: 82000,
      ratingCountBase: 3110,
      image:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=70",
    },
  ],
  Computing: [
    {
      name: "Wireless Mechanical Keyboard RGB Backlit",
      price: 15400,
      originalPrice: 19900,
      ratingCountBase: 1870,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=70",
    },
  ],
  "Health & Beauty": [
    {
      name: "Organic Skincare Gift Set, 5 Pieces",
      price: 12300,
      originalPrice: 15000,
      ratingCountBase: 2640,
      image:
        "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=70",
    },
  ],
  "Baby Products": [
    {
      name: "Baby Stroller Foldable Lightweight",
      price: 45000,
      originalPrice: 54000,
      ratingCountBase: 980,
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=70",
    },
  ],
};

const PRODUCTS = Object.entries(SEEDS).flatMap(([category, seeds]) =>
  generateCategoryProducts(category, seeds),
);
// --- end generator ---------------------------------------------------------

export default function CategoryListingPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Electronics");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filtered = PRODUCTS.filter((p) => p.category === activeCategory);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat);
    setPage(1); // reset to page 1 whenever the category changes
  };

  // Carries the full clicked product through route state so ProductDetailPage
  // can render its real name/price/rating/image without a backend yet.
  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      {/* Top category pill strip */}
      <Box
        sx={{
          borderBottom: `1px solid ${border.primary}`,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: 1.5,
        }}
      >
        <Stack direction="row" gap={3} sx={{ overflowX: "auto" }}>
          {TOP_PILLS.map((p) => (
            <Typography
              key={p}
              sx={{
                fontFamily: "Syne",
                fontSize: 13.5,
                fontWeight: 600,
                color: fg.secondary,
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "color 0.15s ease",
                "&:hover": { color: main.primary },
              }}
            >
              {p}
            </Typography>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: spacingTokens.lg,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: spacingTokens.lg,
        }}
      >
        <CategorySidebar
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            gap={1}
            sx={{ mb: 2 }}
          >
            <Stack direction="row" alignItems="baseline" gap={1}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: 15, md: 22 },
                  fontWeight: 800,
                  color: fg.primary,
                }}
              >
                {activeCategory}
              </Typography>
              <Typography
                sx={{ fontFamily: "Poppins", fontSize: 13, color: fg.tertiary }}
              >
                ({filtered.length.toLocaleString()} products found)
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              gap={0.5}
              onClick={() => setSortOpen((s) => !s)}
              sx={{ cursor: "pointer" }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 13,
                  fontWeight: 600,
                  color: fg.primary,
                }}
              >
                Sort by: Popularity
              </Typography>
              <ChevronDown16Regular
                style={{ fontSize: 13, color: fg.secondary }}
              />
            </Stack>
          </Stack>

          <Stack direction="row" gap={1} sx={{ mb: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              gap={0.4}
              sx={{
                px: 1.1,
                py: 0.35,
                borderRadius: radiusTokens.full ?? 999,
                border: `1px solid ${main.primary}`,
                cursor: "pointer",
              }}
            >
              <Flash20Filled style={{ fontSize: 12, color: main.primary }} />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: { xs: 7, md: 11.5 },
                  fontWeight: 700,
                  color: main.primary,
                }}
              >
                TETYHUB EXPRESS
              </Typography>
            </Stack>
            {["Brand", "Price"].map((f) => (
              <Stack
                key={f}
                direction="row"
                alignItems="center"
                gap={0.3}
                sx={{
                  px: 1.1,
                  py: 0.35,
                  borderRadius: radiusTokens.full ?? 999,
                  border: `1px solid ${border.primary}`,
                  cursor: "pointer",
                  "&:hover": { borderColor: main.primary },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: fg.secondary,
                  }}
                >
                  {f}
                </Typography>
                <ChevronDown16Regular
                  style={{ fontSize: 12, color: fg.tertiary }}
                />
              </Stack>
            ))}
          </Stack>

          {filtered.length === 0 ? (
            <Stack alignItems="center" gap={1} sx={{ py: 8 }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 16,
                  fontWeight: 700,
                  color: fg.primary,
                }}
              >
                No products in {activeCategory} yet
              </Typography>
              <Typography
                sx={{ fontFamily: "Poppins", fontSize: 13, color: fg.tertiary }}
              >
                Try another category from the sidebar.
              </Typography>
            </Stack>
          ) : (
            <>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: spacingTokens.md,
                }}
              >
                {paged.map((product) => (
                  <Box
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    sx={{ cursor: "pointer" }}
                  >
                    <ProductListingCard product={product} />
                  </Box>
                ))}
              </Box>

              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={setPage}
              />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
