// @ts-nocheck
import { Box, Typography } from "@mui/material";
import {
  Laptop24Regular,
  Sparkle24Regular,
  Home24Regular,
  Heart24Regular,
  WrenchSettingsRegular,
  Tag24Regular,
  Games24Regular,
  Gift24Regular,
  ArrowRight24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../Hooks";

// TODO: replace with the real import once confirmed,
// e.g. import { CATEGORIES } from "@/layouts/PublicLayout/Header/data";
const FALLBACK_CATEGORIES = [
  { id: "electronics", label: "Electronics" },
  { id: "fashion", label: "Fashion" },
  { id: "home", label: "Home & Living" },
  { id: "beauty", label: "Beauty & Personal Care" },
  { id: "services", label: "Services" },
  { id: "groceries", label: "Groceries" },
  { id: "gaming", label: "Gaming" },
  { id: "baby-kids", label: "Baby & Kids" },
];

const CATEGORY_STYLE = {
  electronics: {
    icon: Laptop24Regular,
    image: "1518770660439-4636190af475",
    glow: "#60a5fa",
    tagline: "Tech that keeps up with you",
  },
  fashion: {
    icon: Sparkle24Regular,
    image: "1445205170230-053b83016050",
    glow: "#f472b6",
    tagline: "Styles worth talking about",
  },
  home: {
    icon: Home24Regular,
    image: "1449247709967-d4461a6a6103",
    glow: "#34d399",
    tagline: "Make it feel like home",
  },
  beauty: {
    icon: Heart24Regular,
    image: "1522337360788-8b13dee7a37e",
    glow: "#fda4af",
    tagline: "Glow, your way",
  },
  services: {
    icon: WrenchSettingsRegular,
    image: "1454165804606-c3d57bc86b40",
    glow: "#fbbf24",
    tagline: "Help, right when you need it",
  },
  groceries: {
    icon: Tag24Regular,
    image: "1542838132-92c53300491e",
    glow: "#a3e635",
    tagline: "Fresh picks, fast delivery",
  },
  gaming: {
    icon: Games24Regular,
    image: "1580327344181-c1163234e5a0",
    glow: "#a78bfa",
    tagline: "Level up your setup",
  },
  "baby-kids": {
    icon: Gift24Regular,
    image: "1519689680058-324335c77eba",
    glow: "#7dd3fc",
    tagline: "Little things, big joy",
  },
};

function CategoryTile({ category, delay, featured }) {
  const { ref, className } = useReveal();
  const style = CATEGORY_STYLE[category.id] ?? CATEGORY_STYLE.electronics;
  const Icon = style.icon;

  return (
    <Box
      ref={ref}
      className={className}
      component="a"
      href={`/categories`}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        textDecoration: "none",
        borderRadius: radiusTokens.md,
        p: spacingTokens.md,
        minHeight: featured ? 220 : 150,
        gridColumn: featured ? { md: "span 2" } : "span 1",
        backgroundColor: "#111827",
        overflow: "hidden",
        animationDelay: delay,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        boxShadow: `0 10px 24px -12px ${style.glow}99`,
        "&:hover": {
          transform: "translateY(-6px) scale(1.01)",
          boxShadow: `0 20px 36px -12px ${style.glow}cc`,
        },
        "&:hover .cat-glow": { transform: "scale(1.3)", opacity: 0.9 },
        "&:hover .cat-icon": { transform: "scale(1.1) rotate(-6deg)" },
        "&:hover .cat-cta": { opacity: 1, transform: "translateX(0)" },
        "&:hover .cat-img": { transform: "scale(1.08)" },
        "&:hover::before": { left: "130%" },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-60%",
          width: "40%",
          height: "100%",
          background:
            "linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent)",
          transform: "skewX(-20deg)",
          zIndex: 3,
          transition: "left 0.7s ease",
        },
      }}
    >
      {/* background photo */}
      <Box
        component="img"
        className="cat-img"
        src={`https://images.unsplash.com/photo-${style.image}?auto=format&fit=crop&w=500&q=65`}
        alt=""
        loading="lazy"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.5s ease",
        }}
      />

      {/* dark scrim so white text stays readable over the photo */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.68) 100%)",
        }}
      />

      {/* soft glow blob behind the icon, for depth */}
      <Box
        className="cat-glow"
        sx={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: style.glow,
          opacity: 0.5,
          filter: "blur(28px)",
          transition: "transform 0.4s ease, opacity 0.4s ease",
        }}
      />

      <Box
        className="cat-icon"
        sx={{
          position: "relative",
          width: 46,
          height: 46,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.16)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.35)",
          mb: 1.5,
          transition: "transform 0.3s ease",
        }}
      >
        <Icon style={{ fontSize: 21, color: "#fff" }} />
      </Box>

      <Typography
        sx={{
          position: "relative",
          fontSize: featured ? 20 : 15,
          fontWeight: 800,
          color: "#fff",
        }}
      >
        {category.label}
      </Typography>
      <Typography
        sx={{
          position: "relative",
          fontSize: 12.5,
          color: "rgba(255,255,255,0.85)",
          mt: 0.3,
        }}
      >
        {style.tagline}
      </Typography>

      <Box
        className="cat-cta"
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          mt: 1.5,
          opacity: 0,
          transform: "translateX(-6px)",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>
          Explore
        </Typography>
        <ArrowRight24Regular style={{ fontSize: 15, color: "#fff" }} />
      </Box>
    </Box>
  );
}

export default function CategoryShowcase({ categories = FALLBACK_CATEGORIES }) {
  const { fg } = useColor();

  return (
    <Box sx={{ px: { xs: 3, md: 4 }, py: 4 }}>
      <Typography
        sx={{
          fontSize: { xs: 24, md: 30 },
          fontWeight: 800,
          color: fg.primary,
          mb: 0.5,
        }}
      >
        Shop by Category
      </Typography>
      <Typography sx={{ fontSize: 14, color: fg.secondary, mb: 4 }}>
        Curated corners of the market, picked for you.
      </Typography>

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
        {categories.map((category, i) => (
          <CategoryTile
            key={category.id}
            category={category}
            delay={`${i * 0.06}s`}
            featured={i === 0}
          />
        ))}
      </Box>
    </Box>
  );
}
