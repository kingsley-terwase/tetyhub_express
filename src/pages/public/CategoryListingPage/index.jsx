// @ts-nocheck
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography, CircularProgress } from "@mui/material";
import { ChevronDown16Regular, Flash20Filled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import CategorySidebar from "./CategorySidebar";
import ProductListingCard from "./ProductListingCard";
import Pagination from "./Pagination";
import { usePublicProducts } from "@/Hooks/public_products";
import { usePublicCategories } from "@/Hooks/categories";

const PER_PAGE = 12;

export default function CategoryListingPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();

  const { categories, fetchCategories } = usePublicCategories();
  // NOTE: usePublicProducts returns this array as `product` (singular) —
  // renamed to `products` on destructure so the rest of this file reads
  // correctly as "a list", without needing to touch the hook itself.
  const { products, pagination, loading, fetchProducts } =
    usePublicProducts();

  const [activeCategory, setActiveCategory] = useState(null); // { id, name }
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Load the category list once on mount.
  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once categories arrive, default to the first one — mirrors the old
  // hardcoded "Electronics" default without hardcoding an id.
  useEffect(() => {
    if (!activeCategory && categories.length > 0) {
      setActiveCategory({ id: categories[0].id, name: categories[0].name });
    }
  }, [categories, activeCategory]);

  // Re-fetch products whenever the active category or page changes.
  useEffect(() => {
    if (!activeCategory) return;
    fetchProducts({
      category_id: activeCategory.id,
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory, page]);

  const handleSelectCategory = (cat) => {
    // CategorySidebar currently passes a category name string — resolve it
    // back to the full { id, name } object. If you update CategorySidebar
    // to pass the whole category object instead, simplify this to
    // setActiveCategory(cat) directly.
    const match = categories.find((c) => c.name === cat);
    if (match) setActiveCategory({ id: match.id, name: match.name });
    setPage(1); // reset to page 1 whenever the category changes
  };

  const totalPages = pagination?.total_pages || 1;
  const totalCount = pagination?.total || 0;

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
          {categories.map((c) => (
            <Typography
              key={c.id}
              onClick={() => handleSelectCategory(c.name)}
              sx={{
                fontFamily: "Syne",
                fontSize: 13.5,
                fontWeight: 600,
                color:
                  activeCategory?.id === c.id ? main.primary : fg.secondary,
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "color 0.15s ease",
                "&:hover": { color: main.primary },
              }}
            >
              {c.name}
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
          activeCategory={activeCategory?.name}
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
                {activeCategory?.name || "Products"}
              </Typography>
              <Typography
                sx={{ fontFamily: "Poppins", fontSize: 13, color: fg.tertiary }}
              >
                ({totalCount.toLocaleString()} products found)
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

          {loading ? (
            <Stack alignItems="center" sx={{ py: 8 }}>
              <CircularProgress size={28} sx={{ color: main.primary }} />
            </Stack>
          ) : products.length === 0 ? (
            <Stack alignItems="center" gap={1} sx={{ py: 8 }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 16,
                  fontWeight: 700,
                  color: fg.primary,
                }}
              >
                No products in {activeCategory?.name || "this category"} yet
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
                {products.map((product) => (
                  <ProductListingCard key={product.id} product={product} />
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