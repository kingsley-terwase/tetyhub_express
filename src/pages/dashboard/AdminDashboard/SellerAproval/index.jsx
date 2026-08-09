// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  StoreMicrosoft24Regular,
  DocumentText24Regular,
  Mail24Regular,
  Location24Regular,
  Calendar24Regular,
  CheckmarkCircle24Regular,
  DismissCircle24Regular,
  Eye24Regular,
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
} from "../data";

// ---- Mock applications — replace with a real query ----
const APPLICATIONS = [
  {
    id: "app1",
    business: "Kaduna Kitchens",
    owner: "Fatima Bello",
    category: "Home services · Catering",
    email: "fatima@kadunakitchens.ng",
    city: "Kaduna",
    applied: "2 days ago",
    docs: 3,
    status: "pending",
  },
  {
    id: "app2",
    business: "Bright Frame Studio",
    owner: "Tunde Alaba",
    category: "Photography & video",
    email: "tunde@brightframe.co",
    city: "Lagos",
    applied: "6 hours ago",
    docs: 4,
    status: "pending",
  },
  {
    id: "app3",
    business: "Ilé Repairs Co.",
    owner: "Emeka Obi",
    category: "Handyman & repairs",
    email: "emeka@ilerepairs.ng",
    city: "Enugu",
    applied: "1 day ago",
    docs: 2,
    status: "pending",
  },
  {
    id: "app4",
    business: "Naija Cleaners",
    owner: "Grace Effiong",
    category: "Home cleaning",
    email: "grace@naijacleaners.ng",
    city: "Abuja",
    applied: "5 days ago",
    docs: 3,
    status: "approved",
  },
  {
    id: "app5",
    business: "QuickFix Autos",
    owner: "Ibrahim Sule",
    category: "Auto repair",
    email: "ibrahim@quickfixautos.ng",
    city: "Kano",
    applied: "1 week ago",
    docs: 1,
    status: "rejected",
  },
];

const TABS = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

export default function SellerApprovalsPage() {
  const { fg, border, main, bg } = useColor();
  const [tab, setTab] = useState("pending");
  const [query, setQuery] = useState("");
  const [apps, setApps] = useState(APPLICATIONS);

  const counts = useMemo(
    () => ({
      pending: apps.filter((a) => a.status === "pending").length,
      approved: apps.filter((a) => a.status === "approved").length,
      rejected: apps.filter((a) => a.status === "rejected").length,
    }),
    [apps],
  );

  const filtered = apps.filter(
    (a) =>
      a.status === tab &&
      (a.business.toLowerCase().includes(query.toLowerCase()) ||
        a.owner.toLowerCase().includes(query.toLowerCase())),
  );

  const setStatus = (id, status) =>
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));

  return (
    <Box>
      <PageHeader
        title="Seller Approvals"
        subtitle="Review new sellers before they can list on TETYHUB."
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
          placeholder="Search business or owner"
        />
      </Stack>

      {filtered.length === 0 ? (
        <SectionCard>
          <EmptyState
            icon={Storefront24Regular}
            title={`No ${tab} applications`}
            subtitle={
              tab === "pending"
                ? "New seller applications will show up here for review."
                : "Nothing to show in this view yet."
            }
          />
        </SectionCard>
      ) : (
        <Stack gap={1.4}>
          {filtered.map((a) => (
            <SectionCard key={a.id}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                gap={{ xs: 1.6, md: 2 }}
                alignItems={{ xs: "stretch", md: "center" }}
              >
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: radiusTokens.sm ?? 8,
                    backgroundColor: `${main.primary}16`,
                    color: main.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <StoreMicrosoft24Regular style={{ fontSize: 20 }} />
                </Box>

                <Stack sx={{ flexGrow: 1, minWidth: 0 }} gap={0.5}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    flexWrap="wrap"
                  >
                    <Typography
                      sx={{
                        fontSize: 14.5,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                    >
                      {a.business}
                    </Typography>
                    <StatusChip status={a.status} size="sm" />
                  </Stack>
                  <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                    {a.owner} · {a.category}
                  </Typography>
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={{ xs: 1.2, sm: 2 }}
                    sx={{ mt: 0.4 }}
                  >
                    <MetaItem icon={Mail24Regular} text={a.email} fg={fg} />
                    <MetaItem icon={Location24Regular} text={a.city} fg={fg} />
                    <MetaItem
                      icon={Calendar24Regular}
                      text={`Applied ${a.applied}`}
                      fg={fg}
                    />
                    <MetaItem
                      icon={DocumentText24Regular}
                      text={`${a.docs} documents`}
                      fg={fg}
                    />
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  gap={0.8}
                  sx={{ flexShrink: 0, width: { xs: "100%", md: "auto" } }}
                >
                  <ActionButton
                    icon={Eye24Regular}
                    label="View"
                    variant="ghost"
                    border={border}
                    fg={fg}
                  />
                  {a.status === "pending" && (
                    <>
                      <ActionButton
                        icon={DismissCircle24Regular}
                        label="Reject"
                        variant="danger"
                        onClick={() => setStatus(a.id, "rejected")}
                        border={border}
                        fg={fg}
                      />
                      <ActionButton
                        icon={CheckmarkCircle24Regular}
                        label="Approve"
                        variant="primary"
                        onClick={() => setStatus(a.id, "approved")}
                        main={main}
                      />
                    </>
                  )}
                </Stack>
              </Stack>
            </SectionCard>
          ))}
        </Stack>
      )}
    </Box>
  );
}

function MetaItem({ icon: Icon, text, fg }) {
  return (
    <Stack direction="row" alignItems="center" gap={0.5} sx={{ minWidth: 0 }}>
      <Icon style={{ fontSize: 13.5, color: fg.tertiary, flexShrink: 0 }} />
      <Typography sx={{ fontSize: 11.5, color: fg.tertiary }} noWrap>
        {text}
      </Typography>
    </Stack>
  );
}

function ActionButton({
  icon: Icon,
  label,
  variant,
  onClick,
  border,
  fg,
  main,
}) {
  const styles =
    variant === "primary"
      ? {
          backgroundColor: main?.primary,
          color: "#fff",
          border: "1px solid transparent",
        }
      : variant === "danger"
        ? {
            backgroundColor: "transparent",
            color: "#F85149",
            border: "1px solid rgba(248,81,73,0.4)",
          }
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
      gap={0.6}
      onClick={onClick}
      sx={{
        ...styles,
        borderRadius: radiusTokens.sm ?? 8,
        px: 1.4,
        py: 0.9,
        cursor: "pointer",
        flex: { xs: 1, md: "0 0 auto" },
        transition: "opacity 0.15s ease",
        "&:hover": { opacity: 0.85 },
      }}
    >
      <Icon style={{ fontSize: 15 }} />
      <Typography
        sx={{ fontSize: 12.5, fontWeight: 700, fontFamily: "Poppins" }}
      >
        {label}
      </Typography>
    </Stack>
  );
}
