// @ts-nocheck
import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Checkbox,
  Radio,
  InputBase,
  Slider,
  TextField,
} from "@mui/material";
import {
  Search24Regular,
  Flash20Filled,
  Star16Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";

const CATEGORIES = [
  "Computing",
  "Electronics",
  "Garden & Outdoors",
  "Phones & Tablets",
  "Fashion",
  "Home & Office",
  "Grocery",
  "Health & Beauty",
  "Baby Products",
];

const BRANDS = ["Adidas", "Samsung", "Nike", "Sony", "LG", "HP"];
const DISCOUNTS = [
  "50% or more",
  "40% or more",
  "30% or more",
  "20% or more",
  "10% or more",
];
const RATINGS = [4, 3, 2, 1];

function SectionLabel({ children, action }) {
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

export default function CategorySidebar({ activeCategory, onSelectCategory }) {
  const { bg, fg, border, main } = useColor();
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([205, 13088243]);
  const [discount, setDiscount] = useState(null);
  const [rating, setRating] = useState(null);
  const [sellerScore, setSellerScore] = useState("80");

  const toggleBrand = (b) =>
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
    );

  const visibleBrands = BRANDS.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase()),
  );

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
        <Stack gap={0.3}>
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <Box
                key={cat}
                onClick={() => onSelectCategory?.(cat)}
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
                {cat}
              </Box>
            );
          })}
        </Stack>
      </Box>

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
              onClick={() => toggleBrand(b)}
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
        <SectionLabel action="Apply">PRICE (₦)</SectionLabel>
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
              onClick={() => setDiscount(d)}
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
              onClick={() => setRating(r)}
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
        <SectionLabel action="Reset">SELLER SCORE</SectionLabel>
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
