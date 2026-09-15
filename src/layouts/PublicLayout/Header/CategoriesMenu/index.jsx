// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, ClickAwayListener, Stack } from "@mui/material";
import { GridRegular, ChevronRight20Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { usePublicCategories } from "@/Hooks/categories";
import { usePublicSubcategories } from "@/Hooks/sub_categories";

export default function CategoriesMenu() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();

  const { fetchCategories, categories, loading: loadingCategories } = usePublicCategories();
  const { fetchSubcategories, subcategories, loading: loadingSubcategories } = usePublicSubcategories();

  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    fetchCategories({ offset: 0, limit: 20 });
    fetchSubcategories({ offset: 0, limit: 100 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!activeId && categories.length > 0) setActiveId(categories[0].id);
  }, [categories, activeId]);

  const activeCategories = categories.filter((c) => c.status);
  const active = activeCategories.find((c) => c.id === activeId) ?? activeCategories[0];

  // No confirmed server-side filter param for this endpoint, so filtering
  // happens here once subcategories are loaded.
  const activeSubcategories = useMemo(
    () => subcategories.filter((s) => s.status && s.category_id === active?.id),
    [subcategories, active]
  );

  const loading = loadingCategories || loadingSubcategories;

  const handleCategoryClick = (categoryId) => {
    setOpen(false);
    navigate(`/category/${categoryId}`);
  };

  const handleSubcategoryClick = (subcategory) => {
    setOpen(false);
    navigate(`/category/${subcategory.category_id}?subcategory=${subcategory.slug}`);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{ position: "relative" }}>
        <Box
          role="button"
          tabIndex={0}
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: spacingTokens.xs,
            px: spacingTokens.md,
            py: spacingTokens.sm,
            borderRadius: radiusTokens.md,
            backgroundColor: open ? bg.secondary : "transparent",
            color: fg.primary,
            cursor: "pointer",
            userSelect: "none",
            "&:hover": { backgroundColor: bg.secondary },
          }}
        >
          <GridRegular style={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>Categories</Typography>
        </Box>

        {open && (
          <Box
            sx={{
              position: "absolute",
              top: "calc(100% + 10px)",
              left: 0,
              display: "flex",
              width: 560,
              maxWidth: "80vw",
              minHeight: 240,
              backgroundColor: bg.primary,
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.lg,
              boxShadow: "0 24px 48px -16px rgba(15, 23, 42, 0.22)",
              overflow: "hidden",
              zIndex: 20,
              animation: "fadeUp 0.18s ease-out",
            }}
          >
            {loading ? (
              <Stack alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
                <Typography sx={{ fontSize: 13, color: fg.tertiary }}>Loading categories...</Typography>
              </Stack>
            ) : activeCategories.length === 0 ? (
              <Stack alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
                <Typography sx={{ fontSize: 13, color: fg.tertiary }}>No categories available yet.</Typography>
              </Stack>
            ) : (
              <>
                {/* Left: categories */}
                <Box sx={{ width: "45%", borderRight: `1px solid ${border.primary}`, py: spacingTokens.sm }}>
                  {activeCategories.map((category) => (
                    <Box
                      key={category.id}
                      onMouseEnter={() => setActiveId(category.id)}
                      onClick={() => handleCategoryClick(category.id)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: spacingTokens.md,
                        py: spacingTokens.sm,
                        cursor: "pointer",
                        backgroundColor: category.id === active?.id ? bg.secondary : "transparent",
                        color: category.id === active?.id ? main.primary : fg.primary,
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: spacingTokens.sm }}>
                        <Box
                          component="img"
                          src={category.image}
                          alt=""
                          sx={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                        />
                        <Typography sx={{ fontSize: 14, fontWeight: 500 }}>{category.name}</Typography>
                      </Box>
                      <ChevronRight20Regular style={{ fontSize: 16 }} />
                    </Box>
                  ))}
                </Box>

                {/* Right: real subcategories of whichever category is active — no description, just the list */}
                <Box sx={{ width: "55%", p: spacingTokens.md }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: fg.secondary,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      mb: spacingTokens.sm,
                    }}
                  >
                    {active?.name}
                  </Typography>

                  {activeSubcategories.length === 0 ? (
                    <Typography sx={{ fontSize: 13, color: fg.tertiary }}>No subcategories yet.</Typography>
                  ) : (
                    <Box sx={{ display: "flex", flexDirection: "column", gap: spacingTokens.xs }}>
                      {activeSubcategories.map((sub) => (
                        <Typography
                          key={sub.id}
                          component="a"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubcategoryClick(sub);
                          }}
                          sx={{
                            fontSize: 14,
                            color: fg.primary,
                            textDecoration: "none",
                            py: 0.5,
                            cursor: "pointer",
                            "&:hover": { color: main.primary },
                          }}
                        >
                          {sub.name}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}