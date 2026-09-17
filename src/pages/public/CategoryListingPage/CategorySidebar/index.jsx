// @ts-nocheck
import { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Checkbox,
  Radio,
  InputBase,
  Slider,
  TextField,
  CircularProgress,
} from "@mui/material";
import {
  Search24Regular,
  Flash20Filled,
  Star16Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { usePublicCategories, usePublicSubcategories } from "@/Hooks/public_products";

// No real endpoint for brands, discount buckets, or seller score in the
// collection — these three sections stay local UI state only. If/when a
// brand-list or filter endpoint shows up, swap BRANDS for a fetched list
// the same way CATEGORY below was swapped.
const BRANDS = ["Adidas", "Samsung", "Nike", "Sony", "LG", "HP"];
const DISCOUNTS = [
  "50% or more",
  "40% or more",
  "30% or more",
  "20% or more",
  "10% or more",
];
const RATINGS = [4, 3, 2, 1];

function SectionLabel({ children, action, onAction }) {
  const { fg, main } = useColor();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1.2 }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.06em",
          color: fg.tertiary,
        }}
      >
        {children}
      </Typography>
      {action && (
        <Typography
          onClick={onAction}
          sx={{
            fontFamily: "Poppins",
            fontSize: 12,
            fontWeight: 700,
            color: main.primary,
            cursor: "pointer",
          }}
        >
          {action}
        </Typography>
      )}
    </Stack>
  );
}

function StarRow({ count }) {
  return (
    <Stack direction="row" gap={0.1}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star16Filled
          key={i}
          style={{ fontSize: 13, color: i < count ? "#f5a623" : "#d1d5db" }}
        />
      ))}
    </Stack>
  );
}

const DEFAULT_PRICE_RANGE = [0, 13088243];

/**
 * `activeCategory` — the currently selected category name (string), same
 * contract as before.
 * `activeSubcategory` — optional, the currently selected subcategory slug.
 * `onSelectCategory(name)` — fires when a category is clicked.
 * `onSelectSubcategory(slug)` — fires when a subcategory is clicked.
 * `onFilterChange(filters)` — optional. Fires with
 * { brands, priceRange, discount, rating } whenever a filter changes, so a
 * parent page can fold it into fetchProducts(params). Unconfirmed which of
 * these the backend's /products/search actually accepts as query params —
 * the collection has no saved example with filters applied. Test each one
 * (min_price/max_price, brand, discount, rating are the likely names) before
 * relying on server-side filtering; until confirmed this only reports the
 * selection upward, it doesn't guarantee the backend acts on it.
 */
export default function CategorySidebar({
  activeCategory,
  activeSubcategory,
  onSelectCategory,
  onSelectSubcategory,
  onFilterChange,
}) {
  const { bg, fg, border, main } = useColor();

  const { categories, loading: categoriesLoading, fetchCategories } =
    usePublicCategories();
  const {
    subcategories,
    loading: subcategoriesLoading,
    fetchSubcategories,
  } = usePublicSubcategories();

  const [brandSearch, setBrandSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [discount, setDiscount] = useState(null);
  const [rating, setRating] = useState(null);
  const [sellerScore, setSellerScore] = useState("80");

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeCategoryObj = categories.find((c) => c.name === activeCategory);
  const relevantSubcategories = activeCategoryObj
    ? subcategories.filter((s) => s.category_id === activeCategoryObj.id)
    : [];

  const toggleBrand = (b) =>
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
    );

  const visibleBrands = BRANDS.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase()),
  );

  const emitFilterChange = (overrides = {}) => {
    onFilterChange?.({
      brands: selectedBrands,
      priceRange,
      discount,
      rating,
      ...overrides,
    });
  };

  const handleApplyPrice = () => emitFilterChange({ priceRange });

  const handleToggleBrand = (b) => {
    toggleBrand(b);
    const next = selectedBrands.includes(b)
      ? selectedBrands.filter((x) => x !== b)
      : [...selectedBrands, b];
    emitFilterChange({ brands: next });
  };

  const handleSelectDiscount = (d) => {
    setDiscount(d);
    emitFilterChange({ discount: d });
  };

  const handleSelectRating = (r) => {
    setRating(r);
    emitFilterChange({ rating: r });
  };

  const radioSx = {
    p: 0,
    color: border.primary,
    "&.Mui-checked": { color: main.primary },
    "& .MuiSvgIcon-root": { fontSize: 18 },
  };

  return (
    <Stack
      gap={3}
      sx={{ width: 240, flexShrink: 0, display: { xs: "none", md: "flex" } }}
    >
      <Box>
        <SectionLabel>CATEGORY</SectionLabel>
        {categoriesLoading ? (
          <CircularProgress size={18} sx={{ color: main.primary }} />
        ) : (
          <Stack gap={0.3}>
            {categories.map((cat) => {
              const isActive = cat.name === activeCategory;
              return (
                <Box
                  key={cat.id}
                  onClick={() => onSelectCategory?.(cat.name)}
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 13.5,
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? main.primary : fg.secondary,
                    cursor: "pointer",
                    py: 0.7,
                    px: 1,
                    borderRadius: radiusTokens.sm,
                    backgroundColor: isActive
                      ? `${main.primary}12`
                      : "transparent",
                    transition: "background-color 0.15s ease, color 0.15s ease",
                    "&:hover": { backgroundColor: bg.secondary },
                  }}
                >
                  {cat.name}
                </Box>
              );
            })}
          </Stack>
        )}
      </Box>

      {activeCategoryObj && relevantSubcategories.length > 0 && (
        <Box sx={{ borderTop: `1px solid ${border.primary}`, pt: 2.5 }}>
          <SectionLabel>SUBCATEGORY</SectionLabel>
          {subcategoriesLoading ? (
            <CircularProgress size={18} sx={{ color: main.primary }} />
          ) : (
            <Stack gap={0.3}>
              {relevantSubcategories.map((sub) => {
                const isActive = sub.slug === activeSubcategory;
                return (
                  <Box
                    key={sub.id}
                    onClick={() => onSelectSubcategory?.(sub.slug)}
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: 13,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? main.primary : fg.secondary,
                      cursor: "pointer",
                      py: 0.6,
                      px: 1,
                      borderRadius: radiusTokens.sm,
                      backgroundColor: isActive
                        ? `${main.primary}12`
                        : "transparent",
                      "&:hover": { backgroundColor: bg.secondary },
                    }}
                  >
                    {sub.name}
                  </Box>
                );
              })}
            </Stack>
          )}
        </Box>
      )}

      <Box sx={{ borderTop: `1px solid ${border.primary}`, pt: 2.5 }}>
        <SectionLabel>TETYHUB EXPRESS</SectionLabel>
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{ cursor: "pointer" }}
        >
          <Checkbox
            size="small"
            sx={{
              p: 0,
              color: border.primary,
              "&.Mui-checked": { color: main.primary },
            }}
          />
          <Flash20Filled style={{ fontSize: 15, color: main.primary }} />
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 13,
              fontWeight: 700,
              color: fg.primary,
            }}
          >
            EXPRESS
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ borderTop: `1px solid ${border.primary}`, pt: 2.5 }}>
        <SectionLabel>BRAND</SectionLabel>
        <Stack
          direction="row"
          alignItems="center"
          gap={0.8}
          sx={{
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.sm,
            px: 1.2,
            py: 0.6,
            mb: 1.2,
          }}
        >
          <Search24Regular style={{ fontSize: 15, color: fg.tertiary }} />
          <InputBase
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            placeholder="Search brands"
            sx={{
              fontFamily: "Poppins",
              fontSize: 13,
              flexGrow: 1,
              color: fg.primary,
            }}
          />
        </Stack>
        <Stack gap={0.6}>
          {visibleBrands.map((b) => (
            <Stack
              key={b}
              direction="row"
              alignItems="center"
              gap={1}
              onClick={() => handleToggleBrand(b)}
              sx={{ cursor: "pointer" }}
            >
              <Checkbox
                size="small"
                checked={selectedBrands.includes(b)}
                sx={{
                  p: 0,
                  color: border.primary,
                  "&.Mui-checked": { color: main.primary },
                }}
              />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 13,
                  color: fg.secondary,
                }}
              >
                {b}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Box sx={{ borderTop: `1px solid ${border.primary}`, pt: 2.5 }}>
        <SectionLabel action="Apply" onAction={handleApplyPrice}>
          PRICE (₦)
        </SectionLabel>
        <Slider
          value={priceRange}
          onChange={(_, v) => setPriceRange(v)}
          min={0}
          max={13088243}
          sx={{
            color: main.primary,
            height: 4,
            "& .MuiSlider-thumb": {
              width: 16,
              height: 16,
              backgroundColor: main.primary,
              boxShadow: "none",
            },
            "& .MuiSlider-rail": { opacity: 0.25 },
          }}
        />
        <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 1 }}>
          <TextField
            size="small"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value) || 0, priceRange[1]])
            }
            sx={{
              "& .MuiOutlinedInput-input": {
                fontFamily: "Poppins",
                fontSize: 12.5,
                py: 0.7,
              },
            }}
          />
          <Typography sx={{ color: fg.tertiary, fontSize: 13 }}>-</Typography>
          <TextField
            size="small"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value) || 0])
            }
            sx={{
              "& .MuiOutlinedInput-input": {
                fontFamily: "Poppins",
                fontSize: 12.5,
                py: 0.7,
              },
            }}
          />
        </Stack>
      </Box>

      <Box sx={{ borderTop: `1px solid ${border.primary}`, pt: 2.5 }}>
        <SectionLabel>DISCOUNT PERCENTAGE</SectionLabel>
        <Stack gap={0.8}>
          {DISCOUNTS.map((d) => (
            <Stack
              key={d}
              direction="row"
              alignItems="center"
              gap={0.8}
              onClick={() => handleSelectDiscount(d)}
              sx={{ cursor: "pointer" }}
            >
              <Radio size="small" checked={discount === d} sx={radioSx} />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 13,
                  color: fg.secondary,
                }}
              >
                {d}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Box sx={{ borderTop: `1px solid ${border.primary}`, pt: 2.5 }}>
        <SectionLabel>PRODUCT RATING</SectionLabel>
        <Stack gap={0.8}>
          {RATINGS.map((r) => (
            <Stack
              key={r}
              direction="row"
              alignItems="center"
              gap={0.8}
              onClick={() => handleSelectRating(r)}
              sx={{ cursor: "pointer" }}
            >
              <Radio size="small" checked={rating === r} sx={radioSx} />
              <StarRow count={r} />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 12.5,
                  color: fg.secondary,
                }}
              >
                & above
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>

      <Box sx={{ borderTop: `1px solid ${border.primary}`, pt: 2.5 }}>
        <SectionLabel action="Reset" onAction={() => setSellerScore("80")}>
          SELLER SCORE
        </SectionLabel>
        <Stack
          direction="row"
          alignItems="center"
          gap={0.8}
          onClick={() => setSellerScore("80")}
          sx={{ cursor: "pointer" }}
        >
          <Radio size="small" checked={sellerScore === "80"} sx={radioSx} />
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 13, color: fg.secondary }}
          >
            80% or more
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}