// @ts-nocheck
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { Box, Typography, InputBase, Stack } from "@mui/material";
import {
  Search24Regular,
  ShieldCheckmark24Regular,
  Flash24Filled,
  Star24Filled,
  ArrowRight24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { SERVICE_CATEGORIES, SERVICES } from "./data";
import ServiceCard from "./ServiceCard";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

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

export default function ServicesPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

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

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      {/* Banner */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pt: { xs: 6, md: 9 },
          pb: 5,
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            display: "inline-block",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: main.primary,
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.full ?? 999,
            px: spacingTokens.sm,
            py: 0.5,
            mb: spacingTokens.md,
          }}
        >
          Services
        </Typography>

        <Typography
          sx={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: { xs: 30, md: 44 },
            color: fg.primary,
            lineHeight: 1.12,
            mb: 1.5,
          }}
        >
          Hire real people, not just products
        </Typography>
        <Typography
          sx={{
            fontSize: 15,
            color: fg.secondary,
            maxWidth: 560,
            mx: "auto",
            mb: spacingTokens.lg,
          }}
        >
          From a photographer for your wedding to someone who'll finally fix
          that leaking tap — {SERVICES.length}+ verified providers are already
          taking bookings on TETYHUB.
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: spacingTokens.xs,
            maxWidth: 480,
            mx: "auto",
            backgroundColor: bg.secondary,
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.md,
            px: spacingTokens.md,
            py: 1,
          }}
        >
          <Search24Regular style={{ fontSize: 18, color: fg.secondary }} />
          <InputBase
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a service or provider..."
            sx={{ fontSize: 14, flexGrow: 1, color: fg.primary }}
          />
        </Box>
      </Box>

      {/* Category pills */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: spacingTokens.lg,
          display: "flex",
          gap: 1,
          overflowX: "auto",
          justifyContent: { xs: "flex-start", lg: "center" },
        }}
      >
        <Box
          onClick={() => setActiveCategory("all")}
          sx={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            px: 1.6,
            py: 0.9,
            borderRadius: radiusTokens.full ?? 999,
            border: `1px solid ${activeCategory === "all" ? main.primary : border.primary}`,
            backgroundColor:
              activeCategory === "all" ? main.primary : "transparent",
            color: activeCategory === "all" ? "#fff" : fg.primary,
            cursor: "pointer",
            whiteSpace: "nowrap",
            fontFamily: "Poppins",
            fontSize: 13,
            fontWeight: 600,
            transition: "all 0.15s ease",
          }}
        >
          All Services
        </Box>
        {SERVICE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <Box
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              sx={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                px: 1.6,
                py: 0.9,
                borderRadius: radiusTokens.full ?? 999,
                border: `1px solid ${isActive ? main.primary : border.primary}`,
                backgroundColor: isActive ? main.primary : "transparent",
                color: isActive ? "#fff" : fg.primary,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "Poppins",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.15s ease",
              }}
            >
              <Icon style={{ fontSize: 15 }} />
              {cat.label}
            </Box>
          );
        })}
      </Box>

      {/* Grid */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: { xs: 6, md: 8 },
        }}
      >
        {filtered.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 14,
              color: fg.secondary,
              py: 6,
            }}
          >
            No services match "{query}" in this category.
          </Typography>
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
            {filtered.map((service, i) => (
              <Box
                key={service.id}
                sx={{
                  animation: `${fadeUp} 0.5s ease-out both`,
                  animationDelay: `${Math.min(i, 8) * 0.05}s`,
                }}
              >
                <ServiceCard service={service} />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Why TETYHUB for services */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: { xs: 6, md: 8 },
          backgroundColor: bg.secondary,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: { xs: 22, md: 28 },
            color: fg.primary,
            textAlign: "center",
            mb: 4,
          }}
        >
          Booking a service shouldn't feel like a gamble
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: spacingTokens.md,
            maxWidth: 900,
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
                gap={1}
                sx={{ p: spacingTokens.md }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: `${main.primary}14`,
                    color: main.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon style={{ fontSize: 22 }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 15,
                    fontWeight: 700,
                    color: fg.primary,
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: 13,
                    color: fg.secondary,
                    lineHeight: 1.6,
                  }}
                >
                  {item.body}
                </Typography>
              </Stack>
            );
          })}
        </Box>
      </Box>

      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: { xs: 6, md: 8 },
          textAlign: "center",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: { xs: 22, md: 30 },
            color: fg.primary,
            mb: 1,
          }}
        >
          Offer a service yourself?
        </Typography>
        <Typography sx={{ fontSize: 14, color: fg.secondary, mb: 2.5 }}>
          List what you do and start taking bookings from buyers already on
          TETYHUB.
        </Typography>
        <Box
          onClick={() => navigate("/sell")}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.8,
            backgroundColor: main.primary,
            color: "#fff",
            borderRadius: radiusTokens.md,
            px: 3,
            py: 1.2,
            cursor: "pointer",
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          Become a provider
          <ArrowRight24Regular style={{ fontSize: 18 }} />
        </Box>
      </Box>
    </Box>
  );
}
