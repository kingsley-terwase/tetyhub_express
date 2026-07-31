// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import {
  ShieldCheckmark24Regular,
  LockClosed24Regular,
  ThumbLike24Regular,
  Mail24Regular,
  Send24Filled,
  Share24Regular,
  Link24Regular,
  Chat24Regular,
} from "@fluentui/react-icons";
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

// Falls back gracefully if a given service doesn't define social handles yet.
const SOCIAL_LINKS = [
  { key: "instagram", label: "Instagram", handle: "@brightpath.tutors" },
  { key: "twitter", label: "X (Twitter)", handle: "@brightpathng" },
  { key: "website", label: "Website", handle: "brightpathtutors.com" },
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
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setActiveTab("about");
    setMessage("");
    setSent(false);
  }, [SERVICE.id]);

  const related = SERVICES.filter(
    (s) => s.category === SERVICE.category && s.id !== SERVICE.id,
  ).slice(0, 4);

  const handleSend = () => {
    if (!message.trim()) return;
    // Wire this up to your messaging/API layer.
    setSent(true);
    setMessage("");
  };

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

        {/* right — booking card + trust, social, and quick-contact panels */}
        <Box
          sx={{
            position: { xs: "static", md: "sticky" },
            top: spacingTokens.lg,
            alignSelf: "flex-start",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: spacingTokens.md,
          }}
        >
          <ProviderCard
            service={SERVICE}
            fg={fg}
            border={border}
            main={main}
            bg={bg}
          />

          {/* trust & safety strip */}
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              backgroundColor: bg.secondary,
              p: spacingTokens.md,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 12.5,
                fontWeight: 700,
                color: fg.primary,
                mb: 1.4,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Booking protection
            </Typography>
            <Stack gap={1.1}>
              {[
                [
                  ShieldCheckmark24Regular,
                  "ID and background verified provider",
                ],
                [
                  LockClosed24Regular,
                  "Payments held securely until job is done",
                ],
                [ThumbLike24Regular, "302+ jobs completed with 4.9★ average"],
              ].map(([Icon, label]) => (
                <Stack key={label} direction="row" gap={1} alignItems="center">
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      flexShrink: 0,
                      backgroundColor: `${main.primary}16`,
                      color: main.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon style={{ fontSize: 15 }} />
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      color: fg.secondary,
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          {/* social handles */}
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 12.5,
                fontWeight: 700,
                color: fg.primary,
                mb: 1.4,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Find {SERVICE.providerName} online
            </Typography>
            <Stack gap={1}>
              {SOCIAL_LINKS.map((s) => (
                <Stack
                  key={s.key}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    px: 1.2,
                    py: 0.9,
                    borderRadius: radiusTokens.sm ?? 8,
                    border: `1px solid ${border.primary}`,
                    cursor: "pointer",
                    transition: "border-color 0.15s ease",
                    "&:hover": { borderColor: main.primary },
                  }}
                >
                  <Stack direction="row" gap={1} alignItems="center">
                    <Link24Regular
                      style={{ fontSize: 15, color: fg.secondary }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: fg.primary,
                      }}
                    >
                      {s.label}
                    </Typography>
                  </Stack>
                  <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
                    {s.handle}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Stack direction="row" gap={1} sx={{ mt: 1.4 }}>
              <Box
                sx={{
                  flex: 1,
                  textAlign: "center",
                  py: 0.9,
                  borderRadius: radiusTokens.sm ?? 8,
                  border: `1px solid ${border.primary}`,
                  fontSize: 12,
                  fontWeight: 600,
                  color: fg.primary,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.6,
                }}
              >
                <Share24Regular style={{ fontSize: 15 }} />
                Share listing
              </Box>
            </Stack>
          </Box>

          {/* quick contact form */}
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              gap={0.8}
              sx={{ mb: 1.4 }}
            >
              <Chat24Regular style={{ fontSize: 17, color: main.primary }} />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: fg.primary,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Ask a quick question
              </Typography>
            </Stack>
            <Typography
              sx={{
                fontSize: 12.5,
                color: fg.secondary,
                mb: 1.4,
                lineHeight: 1.5,
              }}
            >
              Send {SERVICE.providerName} a message before you book — most
              providers reply within a couple of hours.
            </Typography>
            <Box
              sx={{
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.sm ?? 8,
                px: 1.4,
                py: 1,
                mb: 1,
              }}
            >
              <InputBase
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Hi ${SERVICE.providerName}, is this available on...`}
                multiline
                minRows={2}
                sx={{ fontSize: 12.5, width: "100%", color: fg.primary }}
              />
            </Box>
            <Box
              onClick={handleSend}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.7,
                backgroundColor: main.primary,
                color: "#fff",
                borderRadius: radiusTokens.sm ?? 8,
                py: 1,
                fontFamily: "Poppins",
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              <Send24Filled style={{ fontSize: 15 }} />
              Send message
            </Box>
            {sent && (
              <Stack
                direction="row"
                alignItems="center"
                gap={0.6}
                sx={{ mt: 1 }}
              >
                <Mail24Regular style={{ fontSize: 13, color: main.primary }} />
                <Typography
                  sx={{ fontSize: 11.5, color: main.primary, fontWeight: 600 }}
                >
                  Sent — {SERVICE.providerName} usually replies within an hour.
                </Typography>
              </Stack>
            )}
          </Box>
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
                xs: "repeat(1, 1fr)",
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
