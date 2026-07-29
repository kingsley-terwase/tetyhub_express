// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { DEFAULT_SERVICE, buildServiceDetail } from "../data";
import { SERVICES } from "../data";
import ServiceInfoTabs from "../ServiceInfoTabs";
import ProviderCard from "../ProviderCard";
import ServiceCard from "../ServiceCard";

const TABS = [
  { key: "about", label: "About this service" },
  { key: "packages", label: "Packages" },
  { key: "reviews", label: "Reviews" },
];

export default function ServiceDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { bg, fg, border, main } = useColor();

  // Real clicked service (passed via ServiceCard's navigate(path, { state }))
  // takes priority; falls back to the placeholder for direct URL visits.
  const cardService = location.state?.service;
  const SERVICE = useMemo(
    () => buildServiceDetail(cardService ?? DEFAULT_SERVICE),
    [cardService],
  );

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    setActiveImage(0);
    setActiveTab("about");
  }, [SERVICE.id]);

  const related = SERVICES.filter(
    (s) => s.category === SERVICE.category && s.id !== SERVICE.id,
  ).slice(0, 4);

  return (
    <Box sx={{ backgroundColor: bg.primary, overflowX: "hidden" }}>
      {/* breadcrumb */}
      <Stack
        direction="row"
        alignItems="center"
        gap={0.6}
        flexWrap="wrap"
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: 1.5,
          borderBottom: `1px solid ${border.primary}`,
        }}
      >
        {["Home", "Services", SERVICE.title].map((crumb, i, arr) => (
          <Stack key={crumb} direction="row" alignItems="center" gap={0.6}>
            <Typography
              onClick={() => {
                if (i === 0) navigate("/");
                if (i === 1) navigate("/services");
              }}
              sx={{
                fontFamily: "Poppins",
                fontSize: 12.5,
                color: i === arr.length - 1 ? fg.primary : fg.tertiary,
                fontWeight: i === arr.length - 1 ? 600 : 400,
                cursor: i < arr.length - 1 ? "pointer" : "default",
                maxWidth:
                  i === arr.length - 1 ? { xs: 180, sm: 260, md: 320 } : "none",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {crumb}
            </Typography>
            {i < arr.length - 1 && (
              <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
                ›
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "8fr 4fr" },
          gap: spacingTokens.xl,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: spacingTokens.lg,
        }}
      >
        {/* left — gallery, header, tabs, content */}
        <Box sx={{ minWidth: 0 }}>
          {/* gallery */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              gap: 1.5,
              mb: spacingTokens.md,
            }}
          >
            <Stack
              direction={{ xs: "row", md: "column" }}
              gap={1}
              sx={{ overflowX: { xs: "auto", md: "visible" } }}
            >
              {SERVICE.gallery.map((img, i) => (
                <Box
                  key={i}
                  onClick={() => setActiveImage(i)}
                  sx={{
                    width: 68,
                    height: 68,
                    borderRadius: radiusTokens.sm,
                    overflow: "hidden",
                    cursor: "pointer",
                    border: `2px solid ${i === activeImage ? main.primary : border.primary}`,
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
              ))}
            </Stack>
            <Box
              sx={{
                flexGrow: 1,
                minWidth: 0,
                borderRadius: radiusTokens.md,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={SERVICE.gallery[activeImage]}
                alt={SERVICE.title}
                sx={{
                  width: "100%",
                  height: { xs: 260, sm: 340, md: 420 },
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Box>

          {/* header */}
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={1}
            sx={{ mb: 0.6 }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 11.5,
                fontWeight: 700,
                color: main.primary,
                textTransform: "uppercase",
                letterSpacing: "0.03em",
              }}
            >
              {SERVICE.providerName}
            </Typography>
          </Stack>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: { xs: 22, md: 28 },
              fontWeight: 800,
              color: fg.primary,
              lineHeight: 1.25,
              mb: spacingTokens.md,
              overflowWrap: "break-word",
            }}
          >
            {SERVICE.title}
          </Typography>

          {/* tabs — plain horizontal bar, deliberately not folded into the sticky sidebar */}
          <Stack
            direction="row"
            gap={3}
            flexWrap="wrap"
            sx={{ borderBottom: `1px solid ${border.primary}` }}
          >
            {TABS.map((tab) => (
              <Typography
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: activeTab === tab.key ? main.primary : fg.tertiary,
                  cursor: "pointer",
                  pb: 1.2,
                  borderBottom: `2px solid ${activeTab === tab.key ? main.primary : "transparent"}`,
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </Typography>
            ))}
          </Stack>

          <ServiceInfoTabs
            service={SERVICE}
            activeTab={activeTab}
            border={border}
            fg={fg}
            main={main}
            bg={bg}
          />
        </Box>

        {/* right — lean sticky provider/booking card only */}
        <Box
          sx={{
            position: { xs: "static", md: "sticky" },
            top: spacingTokens.lg,
            alignSelf: "flex-start",
            minWidth: 0,
          }}
        >
          <ProviderCard
            service={SERVICE}
            fg={fg}
            border={border}
            main={main}
            bg={bg}
          />
        </Box>
      </Box>

      {/* related services */}
      {related.length > 0 && (
        <Box
          sx={{ px: { xs: spacingTokens.md, md: spacingTokens.xl }, pb: 10 }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 18,
              fontWeight: 800,
              color: fg.primary,
              mb: 2,
            }}
          >
            More {SERVICE.category} providers
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: spacingTokens.md,
            }}
          >
            {related.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
