// @ts-nocheck
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Tag24Regular, ArrowRight24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { usePublicCategories } from "@/Hooks/categories";
import { useReveal } from "../Hooks";


const GLOW_PALETTE = ["#60a5fa", "#f472b6", "#34d399", "#fda4af", "#fbbf24", "#a3e635", "#a78bfa", "#7dd3fc"];

function CategoryTile({ category, delay, featured, glow }) {
  const { ref, className } = useReveal();

  return (
    <Box
      ref={ref}
      className={className}
      component="a"
      href={`/category/${category.id}`}
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
        boxShadow: `0 10px 24px -12px ${glow}99`,
        "&:hover": {
          transform: "translateY(-6px) scale(1.01)",
          boxShadow: `0 20px 36px -12px ${glow}cc`,
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
          background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent)",
          transform: "skewX(-20deg)",
          zIndex: 3,
          transition: "left 0.7s ease",
        },
      }}
    >
      {/* Real admin-uploaded image, not a stock photo */}
      <Box
        component="img"
        className="cat-img"
        src={category.image}
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

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.68) 100%)",
        }}
      />

      <Box
        className="cat-glow"
        sx={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 120,
          height: 120,
          borderRadius: "50%",
          backgroundColor: glow,
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
        {/* Generic icon — the API doesn't return a per-category icon */}
        <Tag24Regular style={{ fontSize: 21, color: "#fff" }} />
      </Box>

      <Typography sx={{ position: "relative", fontSize: featured ? 20 : 15, fontWeight: 800, color: "#fff" }}>
        {category.name}
      </Typography>
      {category.description && (
        <Typography sx={{ position: "relative", fontSize: 12.5, color: "rgba(255,255,255,0.85)", mt: 0.3 }}>
          {category.description}
        </Typography>
      )}

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
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Explore</Typography>
        <ArrowRight24Regular style={{ fontSize: 15, color: "#fff" }} />
      </Box>
    </Box>
  );
}

export default function CategoryShowcase() {
  const { fg } = useColor();
  const { fetchCategories, categories, loading } = usePublicCategories();

  useEffect(() => {
    fetchCategories({ offset: 0, limit: 8 }); // enough to fill the grid without over-fetching
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ px: { xs: 3, md: 4 }, py: 4 }}>
      <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, color: fg.primary, mb: 0.5 }}>
        Shop by Category
      </Typography>
      <Typography sx={{ fontSize: 14, color: fg.secondary, mb: 4 }}>
        Curated corners of the market, picked for you.
      </Typography>

      {loading ? (
        <Typography sx={{ fontSize: 13, color: fg.tertiary }}>Loading categories...</Typography>
      ) : categories.length === 0 ? (
        <Typography sx={{ fontSize: 13, color: fg.tertiary }}>No categories available yet.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" },
            gap: spacingTokens.md,
          }}
        >
          {categories
            .filter((c) => c.status) // don't show categories an admin has deactivated
            .map((category, i) => (
              <CategoryTile
                key={category.id}
                category={category}
                delay={`${i * 0.06}s`}
                featured={i === 0}
                glow={GLOW_PALETTE[i % GLOW_PALETTE.length]}
              />
            ))}
        </Box>
      )}
    </Box>
  );
}