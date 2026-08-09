// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Warning24Regular,
  ArrowUndo24Regular,
  Handshake24Regular,
  DocumentText24Regular,
  Open24Regular,
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
  StatBlock,
  RowAction,
  SidePanel,
  PanelSectionTitle,
  DetailRow,
  money,
} from "../data";

const DISPUTES = [
  {
    id: "d1",
    order: "TH-402909",
    buyer: "Chiamaka Nwosu",
    seller: "FixIt Pros",
    amount: 8000,
    reason: "Job not completed as described",
    status: "open",
    opened: "2h ago",
    thread: [
      {
        from: "Buyer",
        text: "The plumber left without fixing the leak, only diagnosed it.",
      },
      {
        from: "Seller",
        text: "We sent a follow-up technician same day, buyer wasn't available.",
      },
    ],
  },
  {
    id: "d2",
    order: "TH-402881",
    buyer: "Tunde Alaba",
    seller: "TechDeals NG",
    amount: 62000,
    reason: "Item not as described",
    status: "investigating",
    opened: "1d ago",
    thread: [
      {
        from: "Buyer",
        text: "Received a used phone, listing said brand new sealed.",
      },
      {
        from: "Admin",
        text: "Requested photos from both sides for comparison.",
      },
    ],
  },
  {
    id: "d3",
    order: "TH-402760",
    buyer: "Grace Effiong",
    seller: "Naija Cleaners",
    amount: 18000,
    reason: "Booking no-show",
    status: "resolved",
    opened: "5d ago",
    resolution: "Full refund issued to buyer",
    thread: [
      { from: "Buyer", text: "Cleaner never arrived for the scheduled slot." },
      {
        from: "Admin",
        text: "Confirmed with seller — refunded buyer in full.",
      },
    ],
  },
];

const TABS = [
  { key: "open", label: "Open" },
  { key: "investigating", label: "Investigating" },
  { key: "resolved", label: "Resolved" },
];

export default function DisputesResolutionPage() {
  const { fg, border, main } = useColor();
  const [tab, setTab] = useState("open");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [disputes, setDisputes] = useState(DISPUTES);

  const counts = useMemo(
    () => ({
      open: disputes.filter((d) => d.status === "open").length,
      investigating: disputes.filter((d) => d.status === "investigating")
        .length,
      resolved: disputes.filter((d) => d.status === "resolved").length,
    }),
    [disputes],
  );

  const atRisk = disputes
    .filter((d) => d.status !== "resolved")
    .reduce((s, d) => s + d.amount, 0);

  const filtered = disputes.filter(
    (d) =>
      d.status === tab &&
      (d.order.toLowerCase().includes(query.toLowerCase()) ||
        d.buyer.toLowerCase().includes(query.toLowerCase()) ||
        d.seller.toLowerCase().includes(query.toLowerCase())),
  );

  const resolve = (id, note) => {
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "resolved", resolution: note } : d,
      ),
    );
    setSelected((prev) =>
      prev && prev.id === id
        ? { ...prev, status: "resolved", resolution: note }
        : prev,
    );
  };

  const statusChipKey = (s) =>
    s === "open" ? "flagged" : s === "investigating" ? "in_review" : "approved";

  return (
    <Box>
      <PageHeader
        title="Disputes & Resolutions"
        subtitle="Investigate and settle order conflicts between buyers and sellers."
      />

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2.4 }}>
        <StatBlock
          label="Open disputes"
          value={String(counts.open)}
          accent={counts.open > 0 ? "#F85149" : undefined}
        />
        <StatBlock
          label="Under investigation"
          value={String(counts.investigating)}
          accent="#58A6FF"
        />
        <StatBlock label="Value at risk" value={money(atRisk)} />
      </Stack>

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
          placeholder="Search order, buyer, seller"
        />
      </Stack>

      {filtered.length === 0 ? (
        <SectionCard>
          <EmptyState
            icon={Warning24Regular}
            title={`No ${tab} disputes`}
            subtitle="Nothing needs your attention in this view."
          />
        </SectionCard>
      ) : (
        <SectionCard noPadding>
          <Stack>
            {filtered.map((d, i) => (
              <Stack
                key={d.id}
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "stretch", md: "center" }}
                gap={1.4}
                sx={{
                  px: { xs: 1.75, sm: 2.4 },
                  py: 1.6,
                  borderTop: i === 0 ? "none" : `1px solid ${border.primary}`,
                }}
              >
                <Stack sx={{ flex: "1 1 26%", minWidth: 0 }}>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                    >
                      {d.order}
                    </Typography>
                    <StatusChip status={statusChipKey(d.status)} size="sm" />
                  </Stack>
                  <Typography
                    sx={{ fontSize: 12, color: fg.tertiary, mt: 0.3 }}
                  >
                    {d.buyer} vs {d.seller}
                  </Typography>
                </Stack>

                <Typography
                  sx={{ fontSize: 12.5, color: fg.secondary, flex: "1 1 30%" }}
                >
                  {d.reason}
                </Typography>

                <Stack sx={{ flex: "1 1 16%" }}>
                  <Typography
                    sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
                  >
                    {money(d.amount)}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
                    {d.opened}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent={{ xs: "flex-start", md: "flex-end" }}
                  sx={{ flex: "1 1 auto" }}
                >
                  <RowAction
                    icon={Open24Regular}
                    label="View & resolve"
                    onClick={() => setSelected(d)}
                  />
                </Stack>
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      )}

      <SidePanel
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.order}
        subtitle={selected && `${selected.buyer} vs ${selected.seller}`}
        footer={
          selected &&
          (selected.status === "resolved" ? (
            <Box
              sx={{
                backgroundColor: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.25)",
                borderRadius: radiusTokens.sm ?? 8,
                px: 1.4,
                py: 1,
              }}
            >
              <Typography sx={{ fontSize: 12.5, color: "#22C55E" }}>
                Resolution: {selected.resolution}
              </Typography>
            </Box>
          ) : (
            <Stack gap={0.8}>
              <RowAction
                icon={DocumentText24Regular}
                label="Request more evidence"
                onClick={() => {}}
              />
              <Stack direction="row" gap={0.8}>
                <RowAction
                  icon={ArrowUndo24Regular}
                  label="Refund buyer"
                  tone="danger"
                  onClick={() =>
                    resolve(selected.id, "Full refund issued to buyer")
                  }
                />
                <RowAction
                  icon={Handshake24Regular}
                  label="Release to seller"
                  tone="primary"
                  onClick={() =>
                    resolve(selected.id, "Funds released to seller")
                  }
                />
              </Stack>
            </Stack>
          ))
        }
      >
        {selected && (
          <Stack gap={2.4}>
            <Stack direction="row" gap={1.4}>
              <StatBlock
                label="Amount in dispute"
                value={money(selected.amount)}
              />
              <StatBlock
                label="Status"
                value={
                  selected.status === "open"
                    ? "Open"
                    : selected.status === "investigating"
                      ? "Investigating"
                      : "Resolved"
                }
                accent={
                  selected.status === "open"
                    ? "#F85149"
                    : selected.status === "investigating"
                      ? "#58A6FF"
                      : "#22C55E"
                }
              />
            </Stack>

            <Box>
              <PanelSectionTitle>Case details</PanelSectionTitle>
              <DetailRow label="Order" value={selected.order} />
              <DetailRow label="Buyer" value={selected.buyer} />
              <DetailRow label="Seller" value={selected.seller} />
              <DetailRow label="Reason" value={selected.reason} />
              <DetailRow label="Opened" value={selected.opened} />
            </Box>

            <Box>
              <PanelSectionTitle>Conversation</PanelSectionTitle>
              <Stack gap={1.1}>
                {selected.thread.map((m, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    gap={1}
                    alignItems="flex-start"
                  >
                    <Box
                      sx={{
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: m.from === "Admin" ? main.primary : fg.tertiary,
                        border: `1px solid ${border.primary}`,
                        borderRadius: 999,
                        px: 1,
                        py: 0.3,
                        flexShrink: 0,
                        mt: 0.1,
                      }}
                    >
                      {m.from}
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        color: fg.secondary,
                        lineHeight: 1.5,
                      }}
                    >
                      {m.text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        )}
      </SidePanel>
    </Box>
  );
}
