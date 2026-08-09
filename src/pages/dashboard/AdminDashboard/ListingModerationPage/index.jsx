// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  ImageMultiple24Regular,
  Warning24Filled,
  CheckmarkCircle24Regular,
  DismissCircle24Regular,
  ChatMultiple24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import {
  PageHeader,
  SectionCard,
  StatusChip,
  PillTabs,
  SearchField,
  EmptyState,
  money,
} from "../data";

// ---- Mock listings — replace with a real moderation queue query ----
const LISTINGS = [
  {
    id: "lst1",
    title: "iPhone 13 Pro — brand new, sealed box",
    seller: "TechDeals NG",
    category: "Electronics",
    price: 620000,
    image:
      "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=300&q=80",
    status: "flagged",
    reason: "Suspected counterfeit claim",
    submitted: "3h ago",
  },
  {
    id: "lst2",
    title: "3-bedroom fully furnished shortlet, Lekki Phase 1",
    seller: "UrbanStay",
    category: "Short-let apartments",
    price: 95000,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80",
    status: "flagged",
    reason: "Possible duplicate of listing #4471",
    submitted: "6h ago",
  },
  {
    id: "lst3",
    title: "Deep home window cleaning (up to 3 rooms)",
    seller: "SparkleCo",
    category: "Home services",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
    status: "pending",
    reason: null,
    submitted: "1d ago",
  },
  {
    id: "lst4",
    title: "Logo & brand identity design — 3 concepts",
    seller: "Studio Nine",
    category: "Design services",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=300&q=80",
    status: "pending",
    reason: null,
    submitted: "2d ago",
  },
  {
    id: "lst5",
    title: "Toyota Corolla 2015, tokunbo, clean title",
    seller: "AutoHub Lagos",
    category: "Vehicles",
    price: 8500000,
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=300&q=80",
    status: "approved",
    reason: null,
    submitted: "5d ago",
  },
  {
    id: "lst6",
    title: "Handmade ankara tote bags, wholesale",
    seller: "Adire & Co",
    category: "Fashion",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=300&q=80",
    status: "rejected",
    reason: "Images did not match description",
    submitted: "1w ago",
  },
];

const TABS = [
  { key: "pending", label: "Pending" },
  { key: "flagged", label: "Flagged" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

export default function ListingModerationPage() {
  const { fg, border, main } = useColor();
  const [tab, setTab] = useState("flagged");
  const [query, setQuery] = useState("");
  const [listings, setListings] = useState(LISTINGS);

  const counts = useMemo(
    () => ({
      pending: listings.filter((l) => l.status === "pending").length,
      flagged: listings.filter((l) => l.status === "flagged").length,
      approved: listings.filter((l) => l.status === "approved").length,
      rejected: listings.filter((l) => l.status === "rejected").length,
    }),
    [listings],
  );

  const filtered = listings.filter(
    (l) =>
      l.status === tab &&
      (l.title.toLowerCase().includes(query.toLowerCase()) ||
        l.seller.toLowerCase().includes(query.toLowerCase())),
  );

  const setStatus = (id, status) =>
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l)),
    );

  return (
    <Box>
      <PageHeader
        title="Listing Moderation"
        subtitle="Catch problem listings before buyers ever see them."
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        gap={1.2}
        sx={{ mb: 2 }}
      >
        <PillTabs tabs={TABS} value={tab} onChange={setTab} counts={counts} />
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search listing or seller"
        />
      </Stack>

      {filtered.length === 0 ? (
        <SectionCard>
          <EmptyState
            icon={ImageMultiple24Regular}
            title={`No ${tab} listings`}
            subtitle="Nothing to review in this view right now."
          />
        </SectionCard>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 1.6,
          }}
        >
          {filtered.map((l) => (
            <SectionCard key={l.id} noPadding sx={{ overflow: "hidden" }}>
              <Box
                sx={{
                  position: "relative",
                  height: 150,
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
              >
                <Box
                  component="img"
                  src={l.image}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {l.status === "flagged" && (
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      backgroundColor: "rgba(20,10,10,0.85)",
                      borderRadius: 999,
                      px: 1,
                      py: 0.4,
                    }}
                  >
                    <Warning24Filled
                      style={{ fontSize: 13, color: "#F85149" }}
                    />
                    <Typography
                      sx={{ fontSize: 10.5, fontWeight: 700, color: "#F85149" }}
                    >
                      Flagged
                    </Typography>
                  </Stack>
                )}
                <Box sx={{ position: "absolute", top: 10, right: 10 }}>
                  <StatusChip status={l.status} size="sm" />
                </Box>
              </Box>

              <Stack sx={{ p: 1.8 }} gap={0.8}>
                <Typography
                  sx={{
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: fg.primary,
                    lineHeight: 1.35,
                  }}
                >
                  {l.title}
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                  {l.seller} · {l.category}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13.5,
                    fontWeight: 800,
                    color: fg.primary,
                    fontFamily: "Poppins",
                  }}
                >
                  {money(l.price)}
                </Typography>

                {l.reason && (
                  <Box
                    sx={{
                      backgroundColor: "rgba(248,81,73,0.08)",
                      border: "1px solid rgba(248,81,73,0.25)",
                      borderRadius: radiusTokens.sm ?? 8,
                      px: 1.2,
                      py: 0.8,
                      mt: 0.4,
                    }}
                  >
                    <Typography sx={{ fontSize: 11.5, color: "#F85149" }}>
                      {l.reason}
                    </Typography>
                  </Box>
                )}

                <Typography
                  sx={{ fontSize: 10.5, color: fg.tertiary, mt: 0.2 }}
                >
                  Submitted {l.submitted}
                </Typography>

                {(l.status === "pending" || l.status === "flagged") && (
                  <Stack direction="row" gap={0.7} sx={{ mt: 1 }}>
                    <MiniAction
                      icon={ChatMultiple24Regular}
                      label="Changes"
                      border={border}
                      fg={fg}
                    />
                    <MiniAction
                      icon={DismissCircle24Regular}
                      label="Reject"
                      tone="danger"
                      onClick={() => setStatus(l.id, "rejected")}
                    />
                    <MiniAction
                      icon={CheckmarkCircle24Regular}
                      label="Approve"
                      tone="primary"
                      main={main}
                      onClick={() => setStatus(l.id, "approved")}
                    />
                  </Stack>
                )}
              </Stack>
            </SectionCard>
          ))}
        </Box>
      )}
    </Box>
  );
}

function MiniAction({ icon: Icon, label, tone, onClick, border, fg, main }) {
  const styles =
    tone === "primary"
      ? { backgroundColor: main?.primary, color: "#fff" }
      : tone === "danger"
        ? { backgroundColor: "rgba(248,81,73,0.1)", color: "#F85149" }
        : {
            backgroundColor: "transparent",
            color: fg?.secondary,
            border: `1px solid ${border?.primary}`,
          };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={0.4}
      onClick={onClick}
      sx={{
        ...styles,
        flex: 1,
        borderRadius: radiusTokens.sm ?? 8,
        py: 0.8,
        cursor: "pointer",
        transition: "opacity 0.15s ease",
        "&:hover": { opacity: 0.85 },
      }}
    >
      <Icon style={{ fontSize: 13 }} />
      <Typography sx={{ fontSize: 11, fontWeight: 700, fontFamily: "Poppins" }}>
        {label}
      </Typography>
    </Stack>
  );
}
