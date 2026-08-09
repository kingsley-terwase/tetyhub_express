// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, Switch } from "@mui/material";
import {
  Star24Filled,
  Image24Regular,
  ArrowUp24Regular,
  ArrowDown24Regular,
  Add24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { PageHeader, SectionCard, PillTabs } from "../data";

const FEATURED = [
  {
    id: "f1",
    title: "Deep home window cleaning",
    seller: "SparkleCo",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "f2",
    title: "Logo & brand identity design",
    seller: "Studio Nine",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "f3",
    title: "3-bedroom shortlet, Lekki",
    seller: "UrbanStay",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=200&q=80",
  },
];

const BANNERS = [
  {
    id: "bn1",
    title: "August discount week",
    cta: "Shop now → /promo/august",
    active: true,
  },
  {
    id: "bn2",
    title: "Become a TETYHUB seller",
    cta: "Apply → /sell",
    active: true,
  },
  {
    id: "bn3",
    title: "Holiday payout schedule",
    cta: "Learn more → /help/payouts",
    active: false,
  },
];

const CATEGORY_ORDER = [
  "Home services",
  "Electronics",
  "Design services",
  "Vehicles",
  "Fashion",
  "Short-let apartments",
];

const TABS = [
  { key: "featured", label: "Featured listings" },
  { key: "banners", label: "Promo banners" },
  { key: "categories", label: "Category order" },
];

export default function ContentManagementPage() {
  const { fg, border, main } = useColor();
  const [tab, setTab] = useState("featured");
  const [banners, setBanners] = useState(BANNERS);
  const [categories, setCategories] = useState(CATEGORY_ORDER);

  const toggleBanner = (id) =>
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b)),
    );

  const move = (index, dir) => {
    setCategories((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  return (
    <Box>
      <PageHeader
        title="Content Management"
        subtitle="What buyers see on the storefront homepage."
      />

      <Box sx={{ mb: 2.4 }}>
        <PillTabs tabs={TABS} value={tab} onChange={setTab} />
      </Box>

      {tab === "featured" && (
        <SectionCard noPadding>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: { xs: 1.75, sm: 2.4 }, py: 1.8 }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 800,
                fontSize: 14,
                color: fg.primary,
              }}
            >
              Homepage feature slots ({FEATURED.length}/6)
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              gap={0.6}
              sx={{
                backgroundColor: main.primary,
                color: "#fff",
                borderRadius: radiusTokens.sm ?? 8,
                px: 1.4,
                py: 0.8,
                cursor: "pointer",
              }}
            >
              <Add24Regular style={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                Add listing
              </Typography>
            </Stack>
          </Stack>
          <Stack>
            {FEATURED.map((f) => (
              <Stack
                key={f.id}
                direction="row"
                alignItems="center"
                gap={1.4}
                sx={{
                  px: { xs: 1.75, sm: 2.4 },
                  py: 1.3,
                  borderTop: `1px solid ${border.primary}`,
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: radiusTokens.sm ?? 8,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={f.image}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
                <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                    noWrap
                  >
                    {f.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 11.5, color: fg.tertiary }}
                    noWrap
                  >
                    {f.seller}
                  </Typography>
                </Stack>
                <Star24Filled
                  style={{ fontSize: 16, color: "#F0B100", flexShrink: 0 }}
                />
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      )}

      {tab === "banners" && (
        <SectionCard noPadding>
          <Stack>
            {banners.map((b, i) => (
              <Stack
                key={b.id}
                direction="row"
                alignItems="center"
                gap={1.4}
                sx={{
                  px: { xs: 1.75, sm: 2.4 },
                  py: 1.5,
                  borderTop: i === 0 ? "none" : `1px solid ${border.primary}`,
                }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: radiusTokens.sm ?? 8,
                    backgroundColor: `${main.primary}16`,
                    color: main.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Image24Regular style={{ fontSize: 17 }} />
                </Box>
                <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                  >
                    {b.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 11.5, color: fg.tertiary }}
                    noWrap
                  >
                    {b.cta}
                  </Typography>
                </Stack>
                <Switch
                  checked={b.active}
                  onChange={() => toggleBanner(b.id)}
                  sx={{
                    flexShrink: 0,
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: main.primary,
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: main.primary,
                    },
                  }}
                />
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      )}

      {tab === "categories" && (
        <SectionCard noPadding>
          <Box sx={{ px: { xs: 1.75, sm: 2.4 }, py: 1.8 }}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontWeight: 800,
                fontSize: 14,
                color: fg.primary,
              }}
            >
              Category display order
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: fg.tertiary, mt: 0.3 }}>
              Controls the order categories appear in on browse and homepage
              navigation.
            </Typography>
          </Box>
          <Stack>
            {categories.map((c, i) => (
              <Stack
                key={c}
                direction="row"
                alignItems="center"
                gap={1.4}
                sx={{
                  px: { xs: 1.75, sm: 2.4 },
                  py: 1.3,
                  borderTop: `1px solid ${border.primary}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: fg.tertiary,
                    width: 20,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: fg.primary,
                    flexGrow: 1,
                  }}
                >
                  {c}
                </Typography>
                <Stack direction="row" gap={0.4} sx={{ flexShrink: 0 }}>
                  <Box
                    onClick={() => move(i, -1)}
                    sx={{
                      p: 0.6,
                      borderRadius: radiusTokens.sm ?? 8,
                      border: `1px solid ${border.primary}`,
                      cursor: i === 0 ? "not-allowed" : "pointer",
                      opacity: i === 0 ? 0.4 : 1,
                      display: "flex",
                    }}
                  >
                    <ArrowUp24Regular
                      style={{ fontSize: 14, color: fg.secondary }}
                    />
                  </Box>
                  <Box
                    onClick={() => move(i, 1)}
                    sx={{
                      p: 0.6,
                      borderRadius: radiusTokens.sm ?? 8,
                      border: `1px solid ${border.primary}`,
                      cursor:
                        i === categories.length - 1 ? "not-allowed" : "pointer",
                      opacity: i === categories.length - 1 ? 0.4 : 1,
                      display: "flex",
                    }}
                  >
                    <ArrowDown24Regular
                      style={{ fontSize: 14, color: fg.secondary }}
                    />
                  </Box>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      )}
    </Box>
  );
}
