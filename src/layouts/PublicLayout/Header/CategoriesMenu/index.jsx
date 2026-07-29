import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, ClickAwayListener } from "@mui/material";
import { GridRegular, ChevronRight20Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { CATEGORIES } from "../data";
import StickerBadge from "../Sticker";

export default function CategoriesMenu() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];

  const handleCategoryClick = () => {
    setOpen(false);
    navigate("/categories");
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
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            Categories
          </Typography>
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
              backgroundColor: bg.primary,
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.lg,
              boxShadow: "0 24px 48px -16px rgba(15, 23, 42, 0.22)",
              overflow: "hidden",
              zIndex: 20,
              animation: "fadeUp 0.18s ease-out",
            }}
          >
            {/* Left: category list, each row gets a small sticker icon */}
            <Box
              sx={{
                width: "45%",
                borderRight: `1px solid ${border.primary}`,
                py: spacingTokens.sm,
              }}
            >
              {CATEGORIES.map((category) => (
                <Box
                  key={category.id}
                  onMouseEnter={() => setActiveId(category.id)}
                  onClick={handleCategoryClick}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: spacingTokens.md,
                    py: spacingTokens.sm,
                    cursor: "pointer",
                    backgroundColor:
                      category.id === activeId ? bg.secondary : "transparent",
                    color: category.id === activeId ? main.primary : fg.primary,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: spacingTokens.sm,
                    }}
                  >
                    <StickerBadge
                      icon={category.icon}
                      size={30}
                      iconSize={14}
                      animate={false}
                    />
                    <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                      {category.label}
                    </Typography>
                  </Box>
                  <ChevronRight20Regular style={{ fontSize: 16 }} />
                </Box>
              ))}
            </Box>

            {/* Right: subcategories of whichever category is active */}
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
                {active.label}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: spacingTokens.xs,
                }}
              >
                {active.subcategories.map((sub) => (
                  <Typography
                    key={sub}
                    component="a"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick();
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
                    {sub}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
