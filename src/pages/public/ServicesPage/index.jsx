// @ts-nocheck
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { Box, Typography, InputBase, Stack, IconButton } from "@mui/material";
import {
  Search24Regular,
  ShieldCheckmark24Regular,
  Flash24Filled,
  Star24Filled,
  ArrowRight24Regular,
  ChevronLeft24Regular,
  ChevronRight24Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { SERVICE_CATEGORIES, SERVICES } from "./data";
import ServiceCard from "./ServiceCard";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const heroIn = keyframes`
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Editorial, work-in-progress photography — swap for your own asset library.
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=2000&q=80";

const WHY_TETYHUB = [
  {
    icon: ShieldCheckmark24Regular,
    title: "Verified providers",
    body: "Every provider is ID and background checked before their first booking.",
  },
  {
    icon: Flash24Filled,
    title: "Fast responses",
    body: "Most providers reply within a couple of hours — some within minutes.",
  },
  {
    icon: Star24Filled,
    title: "Real reviews",
    body: "Ratings come only from confirmed bookings, never paid placements.",
  },
];

const PAGE_SIZE = 8;

export default function ServicesPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);
  const railRef = useRef(null);

  const filtered = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesCategory =
        activeCategory === "all" || s.category === activeCategory;
      const matchesQuery =
        !query.trim() ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.providerName.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = useMemo(
    () => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filtered, page],
  );

  // Reset to page 1 whenever the result set changes underneath the user.
  useEffect(() => {
    setPage(1);
  }, [query, activeCategory]);

  const scrollRail = (dir) => {
    railRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  const pageNumbers = useMemo(() => {
    // Compact pagination: first, last, current neighborhood, with ellipses.
    const set = new Set([1, totalPages, page, page - 1, page + 1]);
    return [...set]
      .filter((n) => n >= 1 && n <= totalPages)
      .sort((a, b) => a - b);
  }, [page, totalPages]);

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      {/* ---------------- HERO ---------------- */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          minHeight: { xs: 460, md: 560 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* background photo */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
            transform: "scale(1.02)",
          }}
        />
        {/* black gradient overlay for legibility */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.58) 38%, rgba(0,0,0,0.82) 100%)",
          }}
        />
        {/* subtle vignette accent using brand color */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(60% 50% at 50% 0%, ${main.primary}33 0%, transparent 60%)`,
          }}
        />

        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            px: { xs: spacingTokens.md, md: spacingTokens.xl },
            py: { xs: 7, md: 10 },
            textAlign: "center",
            width: "100%",
            maxWidth: 780,
            mx: "auto",
            animation: `${heroIn} 0.6s ease-out both`,
          }}
        >
          <Typography
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.7,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.35)",
              backgroundColor: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(6px)",
              borderRadius: radiusTokens.full ?? 999,
              px: spacingTokens.md,
              py: 0.6,
              mb: spacingTokens.md,
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: main.primary,
              }}
            />
            Services on TETYHUB
          </Typography>

          <Typography
            sx={{
              fontFamily: "Syne",
              fontWeight: 700,
              fontSize: { xs: 32, md: 52 },
              color: "#fff",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
              mb: 1.75,
              textShadow: "0 2px 24px rgba(0,0,0,0.35)",
            }}
          >
            Hire real people,
            <br />
            not just products
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              color: "rgba(255,255,255,0.82)",
              maxWidth: 560,
              mx: "auto",
              mb: spacingTokens.lg,
              lineHeight: 1.6,
            }}
          >
            From a photographer for your wedding to someone who'll finally fix
            that leaking tap — {SERVICES.length}+ verified providers are already
            taking bookings on TETYHUB.
          </Typography>

          {/* search bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: spacingTokens.xs,
              maxWidth: 520,
              mx: "auto",
              backgroundColor: "rgba(255,255,255,0.97)",
              border: "1px solid rgba(255,255,255,0.6)",
              borderRadius: radiusTokens.md,
              px: spacingTokens.md,
              py: 1.1,
              boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
            }}
          >
            <Search24Regular style={{ fontSize: 18, color: fg.secondary }} />
            <InputBase
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a service or provider..."
              sx={{ fontSize: 14, flexGrow: 1, color: fg.primary }}
            />
            <Box
              sx={{
                backgroundColor: main.primary,
                color: "#fff",
                borderRadius: radiusTokens.sm ?? 8,
                px: 2,
                py: 0.7,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "Poppins",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Search
            </Box>
          </Box>

          {/* trust stat strip */}
          <Stack
            direction="row"
            spacing={{ xs: 2.5, md: 4 }}
            justifyContent="center"
            sx={{ mt: 3.5, flexWrap: "wrap", rowGap: 1.5 }}
          >
            {[
              ["10+", "Verified providers"],
              ["4.9★", "Avg. rating"],
              ["<2hrs", "Avg. reply time"],
            ].map(([stat, label]) => (
              <Box key={label} sx={{ textAlign: "center" }}>
                <Typography
                  sx={{
                    fontFamily: "DM Sans",
                    fontWeight: 800,
                    fontSize: 20,
                    color: "#fff",
                  }}
                >
                  {stat}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 11.5,
                    color: "rgba(255,255,255,0.7)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* ---------------- CATEGORY RAIL ---------------- */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          backgroundColor: bg.primary,
          borderBottom: `1px solid ${border.primary}`,
          py: spacingTokens.sm ?? 1.25,
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: 1100,
            mx: "auto",
            px: { xs: spacingTokens.md, md: spacingTokens.xl },
          }}
        >
          {/* left fade + scroll button */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              alignItems: "center",
              height: "100%",
              background: `linear-gradient(90deg, ${bg.primary} 40%, transparent)`,
              pl: 0.5,
              pr: 2,
            }}
          >
            <IconButton
              size="small"
              onClick={() => scrollRail(-1)}
              sx={{
                border: `1px solid ${border.primary}`,
                backgroundColor: bg.secondary,
                width: 30,
                height: 30,
              }}
            >
              <ChevronLeft20Regular style={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          <Box
            ref={railRef}
            sx={{
              display: "flex",
              gap: 1,
              overflowX: "auto",
              scrollBehavior: "smooth",
              px: { xs: 0, md: 5 },
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            <CategoryPill
              label="All Services"
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              main={main}
              border={border}
              fg={fg}
            />
            {SERVICE_CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.id}
                label={cat.label}
                Icon={cat.icon}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                main={main}
                border={border}
                fg={fg}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              alignItems: "center",
              height: "100%",
              background: `linear-gradient(270deg, ${bg.primary} 40%, transparent)`,
              pr: 0.5,
              pl: 2,
            }}
          >
            <IconButton
              size="small"
              onClick={() => scrollRail(1)}
              sx={{
                border: `1px solid ${border.primary}`,
                backgroundColor: bg.secondary,
                width: 30,
                height: 30,
              }}
            >
              <ChevronRight20Regular style={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* ---------------- RESULTS META ---------------- */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pt: { xs: 4, md: 5 },
          pb: 1.5,
          maxWidth: 1280,
          mx: "auto",
        }}
      >
        <Typography sx={{ fontSize: 13.5, color: fg.secondary }}>
          {filtered.length} provider{filtered.length === 1 ? "" : "s"} found
          {query ? (
            <>
              {" "}
              for "<b style={{ color: fg.primary }}>{query}</b>"
            </>
          ) : null}
        </Typography>
      </Box>

      {/* ---------------- GRID ---------------- */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: { xs: 5, md: 6 },
          maxWidth: 1280,
          mx: "auto",
        }}
      >
        {filtered.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              border: `1px dashed ${border.primary}`,
              borderRadius: radiusTokens.md,
            }}
          >
            <Typography
              sx={{ fontSize: 15, color: fg.primary, fontWeight: 700, mb: 0.5 }}
            >
              No matches yet
            </Typography>
            <Typography sx={{ fontSize: 13.5, color: fg.secondary }}>
              Try a different keyword or clear the category filter.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: spacingTokens.md,
            }}
          >
            {paged.map((service, i) => (
              <Box
                key={service.id}
                sx={{
                  animation: `${fadeUp} 0.45s ease-out both`,
                  animationDelay: `${Math.min(i, 8) * 0.04}s`,
                  transition: "transform 0.25s ease",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <ServiceCard service={service} />
              </Box>
            ))}
          </Box>
        )}

        {/* ---------------- PAGINATION ---------------- */}
        {filtered.length > 0 && totalPages > 1 && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={0.75}
            sx={{ mt: { xs: 5, md: 6 } }}
          >
            <IconButton
              size="small"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              sx={{
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.sm ?? 8,
                width: 34,
                height: 34,
                "&.Mui-disabled": { opacity: 0.35 },
              }}
            >
              <ChevronLeft24Regular style={{ fontSize: 16 }} />
            </IconButton>

            {pageNumbers.map((n, idx) => {
              const prev = pageNumbers[idx - 1];
              const showEllipsis = prev !== undefined && n - prev > 1;
              return (
                <Box
                  key={n}
                  sx={{ display: "flex", alignItems: "center", gap: 0.75 }}
                >
                  {showEllipsis && (
                    <Typography
                      sx={{ fontSize: 13, color: fg.secondary, px: 0.5 }}
                    >
                      …
                    </Typography>
                  )}
                  <Box
                    onClick={() => setPage(n)}
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: radiusTokens.sm ?? 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Poppins",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      color: n === page ? "#fff" : fg.primary,
                      backgroundColor:
                        n === page ? main.primary : "transparent",
                      border: `1px solid ${n === page ? main.primary : border.primary}`,
                      transition: "all 0.15s ease",
                    }}
                  >
                    {n}
                  </Box>
                </Box>
              );
            })}

            <IconButton
              size="small"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              sx={{
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.sm ?? 8,
                width: 34,
                height: 34,
                "&.Mui-disabled": { opacity: 0.35 },
              }}
            >
              <ChevronRight24Regular style={{ fontSize: 16 }} />
            </IconButton>
          </Stack>
        )}
      </Box>

      {/* ---------------- WHY TETYHUB ---------------- */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: { xs: 7, md: 9 },
          backgroundColor: bg.secondary,
        }}
      >
        <Typography
          sx={{
            display: "block",
            textAlign: "center",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: main.primary,
            mb: 1,
          }}
        >
          Why book here
        </Typography>
        <Typography
          sx={{
            fontFamily: "Bebas Neue",
            fontWeight: 800,
            fontSize: { xs: 24, md: 32 },
            color: fg.primary,
            textAlign: "center",
            mb: 5,
            maxWidth: 620,
            mx: "auto",
          }}
        >
          Booking a service shouldn't feel like a gamble
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: spacingTokens.md,
            maxWidth: 960,
            mx: "auto",
          }}
        >
          {WHY_TETYHUB.map((item) => {
            const Icon = item.icon;
            return (
              <Stack
                key={item.title}
                alignItems="center"
                textAlign="center"
                gap={1.25}
                sx={{
                  p: spacingTokens.lg,
                  backgroundColor: bg.primary,
                  border: `1px solid ${border.primary}`,
                  borderRadius: radiusTokens.md,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 16px 32px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${main.primary}22, ${main.primary}0a)`,
                    color: main.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon style={{ fontSize: 24 }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    fontWeight: 700,
                    color: fg.primary,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 13.5,
                    color: fg.secondary,
                    lineHeight: 1.65,
                  }}
                >
                  {item.body}
                </Typography>
              </Stack>
            );
          })}
        </Box>
      </Box>

      {/* ---------------- CTA ---------------- */}
      <Box
        sx={{
          mx: { xs: spacingTokens.md, md: spacingTokens.xl },
          my: { xs: 6, md: 8 },
          borderRadius: radiusTokens.lg ?? 20,
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          py: { xs: 6, md: 6 },
          px: 3,
          background: `linear-gradient(135deg, ${main.primary} 0%, ${main.primary}cc 100%)`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18) 0, transparent 45%), radial-gradient(circle at 85% 80%, rgba(255,255,255,0.15) 0, transparent 40%)",
          }}
        />
        <Box sx={{ position: "relative" }}>
          <Typography
            sx={{
              fontFamily: "Bebas Neue",
              fontWeight: 800,
              fontSize: { xs: 24, md: 32 },
              color: "#fff",
              mb: 1,
            }}
          >
            Offer a service yourself?
          </Typography>
          <Typography
            sx={{ fontSize: 14.5, color: "rgba(255,255,255,0.85)", mb: 3 }}
          >
            List what you do and start taking bookings from buyers already on
            TETYHUB.
          </Typography>
          <Box
            onClick={() => navigate("/sell")}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.8,
              backgroundColor: "#fff",
              color: main.primary,
              borderRadius: radiusTokens.md,
              px: 3.2,
              py: 1.3,
              cursor: "pointer",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 14,
              transition: "transform 0.15s ease",
              "&:hover": { transform: "translateY(-2px)" },
            }}
          >
            Become a provider
            <ArrowRight24Regular style={{ fontSize: 18 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function CategoryPill({ label, Icon, active, onClick, main, border, fg }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        gap: 0.6,
        px: 1.7,
        py: 0.85,
        borderRadius: radiusTokens.full ?? 999,
        border: `1px solid ${active ? main.primary : border.primary}`,
        backgroundColor: active ? main.primary : "transparent",
        color: active ? "#fff" : fg.primary,
        cursor: "pointer",
        whiteSpace: "nowrap",
        fontFamily: "Poppins",
        fontSize: 13,
        fontWeight: 600,
        transition: "all 0.15s ease",
        "&:hover": !active
          ? { borderColor: main.primary, color: main.primary }
          : undefined,
      }}
    >
      {Icon && <Icon style={{ fontSize: 15 }} />}
      {label}
    </Box>
  );
}
