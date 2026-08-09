// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Chat24Regular, Open24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import {
  PageHeader,
  SectionCard,
  StatusChip,
  PillTabs,
  SearchField,
  EmptyState,
  Avatar,
  StatBlock,
  RowAction,
  SidePanel,
  PanelSectionTitle,
  DetailRow,
} from "../data";

const TICKETS = [
  {
    id: "t1",
    subject: "Can't verify my bank account for payouts",
    requester: "Tunde Alaba",
    email: "tunde@brightframe.co",
    type: "Payments",
    priority: "high",
    status: "pending",
    assigned: "Chinelo Umeh",
    time: "1h ago",
    messages: [
      {
        from: "Tunde Alaba",
        text: "I keep getting 'account mismatch' when trying to link my bank account for payouts.",
      },
      {
        from: "Chinelo Umeh",
        text: "Thanks for flagging — can you confirm the account name matches your registered business name exactly?",
      },
    ],
  },
  {
    id: "t2",
    subject: "How do I change my listing category?",
    requester: "Fatima Bello",
    email: "fatima@kadunakitchens.ng",
    type: "Account",
    priority: "low",
    status: "open",
    assigned: null,
    time: "3h ago",
    messages: [
      {
        from: "Fatima Bello",
        text: "I listed under 'Catering' but it should be under 'Home services'. How do I fix this myself?",
      },
    ],
  },
  {
    id: "t3",
    subject: "App keeps crashing when uploading photos",
    requester: "David Eze",
    email: "d.eze@outlook.com",
    type: "Technical",
    priority: "medium",
    status: "open",
    assigned: null,
    time: "5h ago",
    messages: [
      {
        from: "David Eze",
        text: "Every time I try to upload more than 3 photos to a listing the app closes completely.",
      },
    ],
  },
  {
    id: "t4",
    subject: "Refund never arrived after 5 business days",
    requester: "Grace Effiong",
    email: "grace@naijacleaners.ng",
    type: "Payments",
    priority: "high",
    status: "pending",
    assigned: "Ada Okafor",
    time: "1d ago",
    messages: [
      {
        from: "Grace Effiong",
        text: "My refund for TH-402760 was approved 5 days ago but I haven't received it yet.",
      },
      {
        from: "Ada Okafor",
        text: "Checking with our payments partner now, will update you within 24 hours.",
      },
    ],
  },
  {
    id: "t5",
    subject: "Question about the service fee percentage",
    requester: "Emeka Obi",
    email: "emeka.obi90@gmail.com",
    type: "General",
    priority: "low",
    status: "resolved",
    assigned: "Yusuf Danladi",
    time: "2d ago",
    messages: [
      {
        from: "Emeka Obi",
        text: "What percentage does TETYHUB take from each completed order?",
      },
      {
        from: "Yusuf Danladi",
        text: "Our current service fee is 1.5% of the order subtotal, deducted before payout.",
      },
    ],
  },
];

const PRIORITY_COLOR = { high: "#F85149", medium: "#F0B100", low: "#8B949E" };

const TABS = [
  { key: "open", label: "Open" },
  { key: "pending", label: "Pending" },
  { key: "resolved", label: "Resolved" },
];

export default function SupportTicketsPage() {
  const { fg, border, main } = useColor();
  const [tab, setTab] = useState("open");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [tickets, setTickets] = useState(TICKETS);

  const counts = useMemo(
    () => ({
      open: tickets.filter((t) => t.status === "open").length,
      pending: tickets.filter((t) => t.status === "pending").length,
      resolved: tickets.filter((t) => t.status === "resolved").length,
    }),
    [tickets],
  );

  const filtered = tickets.filter(
    (t) =>
      t.status === tab &&
      (t.subject.toLowerCase().includes(query.toLowerCase()) ||
        t.requester.toLowerCase().includes(query.toLowerCase())),
  );

  const claim = (id) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "pending", assigned: "You" } : t,
      ),
    );
    setSelected((prev) =>
      prev && prev.id === id
        ? { ...prev, status: "pending", assigned: "You" }
        : prev,
    );
  };
  const resolve = (id) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "resolved" } : t)),
    );
    setSelected((prev) =>
      prev && prev.id === id ? { ...prev, status: "resolved" } : prev,
    );
  };

  const statusChipKey = (s) =>
    s === "open" ? "pending" : s === "pending" ? "in_review" : "approved";

  return (
    <Box>
      <PageHeader
        title="Support Tickets"
        subtitle="Buyer and seller help requests outside of order disputes."
      />

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2.4 }}>
        <StatBlock
          label="Open tickets"
          value={String(counts.open)}
          accent="#F85149"
        />
        <StatBlock
          label="Being worked"
          value={String(counts.pending)}
          accent="#F0B100"
        />
        <StatBlock
          label="Resolved this week"
          value={String(counts.resolved)}
          accent="#22C55E"
        />
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
          placeholder="Search subject or requester"
        />
      </Stack>

      {filtered.length === 0 ? (
        <SectionCard>
          <EmptyState
            icon={Chat24Regular}
            title={`No ${tab} tickets`}
            subtitle="Nothing needs attention in this view."
          />
        </SectionCard>
      ) : (
        <Stack gap={1.2}>
          {filtered.map((t) => (
            <SectionCard key={t.id}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "stretch", md: "center" }}
                gap={1.4}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1.2}
                  sx={{ flex: "1 1 40%", minWidth: 0 }}
                >
                  <Avatar name={t.requester} />
                  <Stack sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                      noWrap
                    >
                      {t.subject}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 11.5, color: fg.tertiary }}
                      noWrap
                    >
                      {t.requester} · {t.type} · {t.time}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1.2}
                  sx={{ flex: "1 1 24%" }}
                >
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: PRIORITY_COLOR[t.priority],
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: fg.secondary,
                      textTransform: "capitalize",
                    }}
                  >
                    {t.priority} priority
                  </Typography>
                </Stack>

                <Stack sx={{ flex: "1 1 20%" }}>
                  <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                    {t.assigned ? `Assigned to ${t.assigned}` : "Unassigned"}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={1}
                  sx={{ flex: "1 1 26%" }}
                >
                  <StatusChip status={statusChipKey(t.status)} size="sm" />
                  <Stack direction="row" gap={0.6}>
                    <RowAction
                      icon={Open24Regular}
                      label="Open"
                      onClick={() => setSelected(t)}
                    />
                    {t.status === "open" && (
                      <RowAction
                        label="Claim"
                        tone="primary"
                        onClick={() => claim(t.id)}
                      />
                    )}
                    {t.status === "pending" && (
                      <RowAction
                        label="Resolve"
                        tone="primary"
                        onClick={() => resolve(t.id)}
                      />
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </SectionCard>
          ))}
        </Stack>
      )}

      <SidePanel
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.subject}
        subtitle={selected?.requester}
        avatar={selected && <Avatar name={selected.requester} size={40} />}
        footer={
          selected && (
            <Stack direction="row" gap={0.8}>
              {selected.status === "open" && (
                <RowAction
                  label="Claim ticket"
                  tone="primary"
                  onClick={() => claim(selected.id)}
                />
              )}
              {selected.status === "pending" && (
                <RowAction
                  label="Mark resolved"
                  tone="primary"
                  onClick={() => resolve(selected.id)}
                />
              )}
              {selected.status === "resolved" && (
                <Box
                  sx={{
                    backgroundColor: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.25)",
                    borderRadius: radiusTokens.sm ?? 8,
                    px: 1.4,
                    py: 1,
                    flexGrow: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 12.5, color: "#22C55E" }}>
                    Resolved
                  </Typography>
                </Box>
              )}
            </Stack>
          )
        }
      >
        {selected && (
          <Stack gap={2.4}>
            <Box>
              <PanelSectionTitle>Ticket details</PanelSectionTitle>
              <DetailRow
                label="Status"
                value={
                  <StatusChip
                    status={statusChipKey(selected.status)}
                    size="sm"
                  />
                }
              />
              <DetailRow label="Type" value={selected.type} />
              <DetailRow
                label="Priority"
                value={
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.6}
                    justifyContent="flex-end"
                  >
                    <Box
                      sx={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        backgroundColor: PRIORITY_COLOR[selected.priority],
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: fg.primary,
                        textTransform: "capitalize",
                      }}
                    >
                      {selected.priority}
                    </Typography>
                  </Stack>
                }
              />
              <DetailRow label="Requester email" value={selected.email} />
              <DetailRow
                label="Assigned to"
                value={selected.assigned ?? "Unassigned"}
              />
              <DetailRow label="Opened" value={selected.time} />
            </Box>

            <Box>
              <PanelSectionTitle>Conversation</PanelSectionTitle>
              <Stack gap={1.1}>
                {selected.messages.map((m, i) => (
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
                        color:
                          m.from === selected.requester
                            ? fg.tertiary
                            : main.primary,
                        border: `1px solid ${border.primary}`,
                        borderRadius: 999,
                        px: 1,
                        py: 0.3,
                        flexShrink: 0,
                        mt: 0.1,
                        whiteSpace: "nowrap",
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
