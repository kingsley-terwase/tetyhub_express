// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Add24Regular,
  Eye24Regular,
  Edit24Regular,
  Delete24Regular,
  Box24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import {
  PageHeader,
  SectionCard,
  FilterChips,
  Toolbar,
  Pill,
  EmptyState,
  PrimaryButton,
  money,
} from "../SellerUi";
import ListingFormModal from "../Modal/ListingFormModal";
import ConfirmDialog from "../Modal/ConfirmDialog";

const LISTINGS = [
  {
    id: "l1",
    title: "Deep home window cleaning",
    type: "Service",
    category: "Home services",
    price: 12000,
    status: "Live",
    orders: 34,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "l2",
    title: "Oven deep clean add-on",
    type: "Service",
    category: "Home services",
    price: 4500,
    status: "Live",
    orders: 12,
    image:
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "l3",
    title: "Logo & brand identity design",
    type: "Service",
    category: "Design services",
    price: 45000,
    status: "Live",
    orders: 9,
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "l4",
    title: "Wireless noise-cancelling headphones",
    type: "Product",
    category: "Electronics",
    price: 38000,
    status: "Out of stock",
    orders: 21,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "l5",
    title: "Handyman repair visit (2 hrs)",
    type: "Service",
    category: "Handyman & repairs",
    price: 8000,
    status: "Draft",
    orders: 0,
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=100&q=80",
  },
];

const STATUS_TONE = {
  Live: "success",
  "Out of stock": "danger",
  Draft: "neutral",
};

export default function ListingsPage() {
  const { fg, bg, border, main } = useColor();
  const [listings, setListings] = useState(LISTINGS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const tabs = useMemo(
    () => [
      { key: "all", label: "All", count: listings.length },
      {
        key: "Live",
        label: "Live",
        count: listings.filter((l) => l.status === "Live").length,
      },
      {
        key: "Draft",
        label: "Draft",
        count: listings.filter((l) => l.status === "Draft").length,
      },
      {
        key: "Out of stock",
        label: "Out of stock",
        count: listings.filter((l) => l.status === "Out of stock").length,
      },
    ],
    [listings],
  );

  const filtered = listings.filter(
    (l) =>
      (filter === "all" || l.status === filter) &&
      l.title.toLowerCase().includes(search.toLowerCase()),
  );

  const saveListing = (form) => {
    if (editing) {
      setListings((ls) =>
        ls.map((l) => (l.id === editing.id ? { ...l, ...form } : l)),
      );
    } else {
      setListings((ls) => [
        {
          id: `l${Date.now()}`,
          status: "Live",
          orders: 0,
          image: LISTINGS[0].image,
          ...form,
        },
        ...ls,
      ]);
    }
    setEditing(null);
  };

  return (
    <Box>
      <PageHeader
        title="Listings"
        subtitle={`${listings.length} listings · products & services in one place`}
        fg={fg}
        action={
          <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
            <PrimaryButton
              icon={Add24Regular}
              main={main}
              onClick={() => {
                setEditing(null);
                setFormOpen(true);
              }}
            >
              Add listing
            </PrimaryButton>
          </Box>
        }
      />

      <Stack gap={1.6} sx={{ mb: 2 }}>
        <FilterChips
          tabs={tabs}
          active={filter}
          onChange={setFilter}
          fg={fg}
          border={border}
          main={main}
        />
        <Toolbar
          search={search}
          onSearch={setSearch}
          placeholder="Search listings..."
          border={border}
          fg={fg}
        />
      </Stack>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Box24Regular}
          title="No listings match that filter"
          subtitle="Try a different filter or add your first listing to get started."
          fg={fg}
          border={border}
        />
      ) : (
        <SectionCard noPadding border={border}>
          {/* Desktop table */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0,2.2fr) minmax(0,1fr) minmax(0,0.9fr) minmax(0,0.9fr) minmax(0,0.9fr) 100px",
                px: 2.4,
                py: 1.4,
                gap: 1,
              }}
            >
              {[
                "Listing",
                "Category",
                "Type",
                "Price",
                "Status",
                "Actions",
              ].map((h) => (
                <Typography
                  key={h}
                  sx={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: fg.tertiary,
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </Typography>
              ))}
            </Box>
            {filtered.map((l) => (
              <Box
                key={l.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(0,2.2fr) minmax(0,1fr) minmax(0,0.9fr) minmax(0,0.9fr) minmax(0,0.9fr) 100px",
                  alignItems: "center",
                  px: 2.4,
                  py: 1.3,
                  gap: 1,
                  borderTop: `1px solid ${border.primary}`,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1.2}
                  sx={{ minWidth: 0 }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: radiusTokens.sm ?? 8,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src={l.image}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Typography
                    noWrap
                    sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                  >
                    {l.title}
                  </Typography>
                </Stack>
                <Typography noWrap sx={{ fontSize: 12.5, color: fg.secondary }}>
                  {l.category}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                  {l.type}
                </Typography>
                <Typography
                  sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}
                >
                  {money(l.price)}
                </Typography>
                <Box>
                  <Pill label={l.status} tone={STATUS_TONE[l.status]} />
                </Box>
                <Stack direction="row" gap={0.6}>
                  <RowIcon
                    icon={Edit24Regular}
                    fg={fg}
                    onClick={() => {
                      setEditing(l);
                      setFormOpen(true);
                    }}
                  />
                  <RowIcon
                    icon={Delete24Regular}
                    fg={fg}
                    danger
                    onClick={() => setDeleting(l)}
                  />
                </Stack>
              </Box>
            ))}
          </Box>

          {/* Mobile cards */}
          <Stack sx={{ display: { xs: "flex", md: "none" } }}>
            {filtered.map((l) => (
              <Stack
                key={l.id}
                gap={1}
                sx={{ p: 1.75, borderTop: `1px solid ${border.primary}` }}
              >
                <Stack direction="row" gap={1.2} sx={{ minWidth: 0 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: radiusTokens.sm ?? 8,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src={l.image}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
                    <Typography
                      noWrap
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                    >
                      {l.title}
                    </Typography>
                    <Typography
                      noWrap
                      sx={{ fontSize: 11.5, color: fg.tertiary }}
                    >
                      {l.category} · {l.type}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: fg.primary,
                      flexShrink: 0,
                    }}
                  >
                    {money(l.price)}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Pill label={l.status} tone={STATUS_TONE[l.status]} />
                  <Stack direction="row" gap={0.6}>
                    <RowIcon
                      icon={Edit24Regular}
                      fg={fg}
                      onClick={() => {
                        setEditing(l);
                        setFormOpen(true);
                      }}
                    />
                    <RowIcon
                      icon={Delete24Regular}
                      fg={fg}
                      danger
                      onClick={() => setDeleting(l)}
                    />
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      )}

      <ListingFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initial={editing}
        onSave={saveListing}
        fg={fg}
        bg={bg}
        border={border}
        main={main}
      />
      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={() =>
          setListings((ls) => ls.filter((l) => l.id !== deleting.id))
        }
        title="Delete this listing?"
        message={`"${deleting?.title}" will be removed and no longer visible to buyers. This can't be undone.`}
        confirmLabel="Delete listing"
        danger
        fg={fg}
        bg={bg}
        border={border}
        main={main}
      />
    </Box>
  );
}

function RowIcon({ icon: Icon, onClick, fg, danger }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 22,
        height: 22,
        borderRadius: radiusTokens.sm ?? 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: danger ? "#F04F4F" : fg.secondary,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: danger ? "#F04F4F1a" : `${fg.secondary}14`,
        },
      }}
    >
      <Icon style={{ fontSize: 16 }} />
    </Box>
  );
}
