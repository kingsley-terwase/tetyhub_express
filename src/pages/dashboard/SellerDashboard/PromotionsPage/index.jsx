// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Megaphone24Regular,
  ArrowUpRight24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import {
  PageHeader,
  SectionCard,
  Pill,
  PrimaryButton,
  GhostButton,
  money,
} from "../SellerUi";
import BoostListingModal from "../Modal/BoostListingModal";

const LISTINGS = [
  {
    id: "l1",
    title: "Deep home window cleaning",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=140&q=80",
    boosted: true,
    endsIn: "4 days left",
    views: 812,
    clicks: 96,
  },
  {
    id: "l3",
    title: "Logo & brand identity design",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=140&q=80",
    boosted: false,
    views: 340,
    clicks: 22,
  },
  {
    id: "l4",
    title: "Wireless noise-cancelling headphones",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=140&q=80",
    boosted: false,
    views: 210,
    clicks: 11,
  },
];

export default function PromotionsPage() {
  const { fg, bg, border, main } = useColor();
  const [listings, setListings] = useState(LISTINGS);
  const [boosting, setBoosting] = useState(null);

  const confirmBoost = (listing, plan) => {
    setListings((ls) =>
      ls.map((l) =>
        l.id === listing.id
          ? { ...l, boosted: true, endsIn: `${plan.label} left` }
          : l,
      ),
    );
  };

  const activeBoosts = listings.filter((l) => l.boosted).length;

  return (
    <Box>
      <PageHeader
        title="Promotions"
        subtitle="Boost a listing so more buyers see it first."
        fg={fg}
      />

      <Stack
        direction="row"
        alignItems="center"
        gap={1.4}
        sx={{
          border: `1px solid ${border.primary}`,
          borderRadius: radiusTokens.md,
          p: { xs: 2, sm: 2.4 },
          mb: { xs: 2.4, md: 3 },
          background: `linear-gradient(135deg, ${main.primary}12, transparent)`,
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            backgroundColor: `${main.primary}1c`,
            color: main.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Megaphone24Regular style={{ fontSize: 20 }} />
        </Box>
        <Stack sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 800, color: fg.primary }}>
            {activeBoosts} listing{activeBoosts === 1 ? "" : "s"} currently
            boosted
          </Typography>
          <Typography sx={{ fontSize: 12, color: fg.secondary }}>
            Boosted listings show up higher in search and category pages.
          </Typography>
        </Stack>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" },
          gap: { xs: 1.6, sm: 2 },
        }}
      >
        {listings.map((l) => (
          <SectionCard
            key={l.id}
            border={border}
            sx={{ p: 0, overflow: "hidden" }}
          >
            <Box sx={{ height: 120, overflow: "hidden" }}>
              <Box
                component="img"
                src={l.image}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Stack sx={{ p: 1.8 }} gap={1}>
              <Typography
                noWrap
                sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
              >
                {l.title}
              </Typography>
              <Stack direction="row" gap={1.4}>
                <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                  {l.views} views
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                  {l.clicks} clicks
                </Typography>
              </Stack>
              {l.boosted ? (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Pill
                    label="Boosted"
                    tone="brand"
                    icon={ArrowUpRight24Regular}
                  />
                  <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                    {l.endsIn}
                  </Typography>
                </Stack>
              ) : (
                <GhostButton
                  fg={fg}
                  border={border}
                  main={main}
                  onClick={() => setBoosting(l)}
                >
                  Boost this listing
                </GhostButton>
              )}
            </Stack>
          </SectionCard>
        ))}
      </Box>

      <BoostListingModal
        open={Boolean(boosting)}
        onClose={() => setBoosting(null)}
        listing={boosting}
        onConfirm={confirmBoost}
        fg={fg}
        bg={bg}
        border={border}
        main={main}
      />
    </Box>
  );
}
