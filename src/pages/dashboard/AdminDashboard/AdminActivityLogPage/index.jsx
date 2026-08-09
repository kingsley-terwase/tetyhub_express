// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  History24Regular,
  CheckmarkCircle24Filled,
  DismissCircle24Filled,
  ArrowUndo24Filled,
  PersonProhibited24Filled,
  Wallet24Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import {
  PageHeader,
  SectionCard,
  PillTabs,
  SearchField,
  EmptyState,
  Avatar,
  StatBlock,
} from "../data";

const LOG = [
  {
    id: "lg1",
    admin: "Ada Okafor",
    action: "Approved seller application",
    target: "Naija Cleaners",
    type: "approve",
    time: "12m ago",
  },
  {
    id: "lg2",
    admin: "Yusuf Danladi",
    action: "Rejected listing",
    target: "\u201cUsed generator, no receipt\u201d",
    type: "reject",
    time: "48m ago",
  },
  {
    id: "lg3",
    admin: "Ada Okafor",
    action: "Refunded order",
    target: "TH-402877 · ₦12,000",
    type: "refund",
    time: "1h ago",
  },
  {
    id: "lg4",
    admin: "Chinelo Umeh",
    action: "Banned buyer account",
    target: "Emeka Obi",
    type: "ban",
    time: "3h ago",
  },
  {
    id: "lg5",
    admin: "Ada Okafor",
    action: "Approved payout batch",
    target: "PB1 · ₦1.82M to 34 sellers",
    type: "payout",
    time: "5h ago",
  },
  {
    id: "lg6",
    admin: "Yusuf Danladi",
    action: "Verified KYC document",
    target: "Naija Cleaners · Business registration",
    type: "approve",
    time: "6h ago",
  },
  {
    id: "lg7",
    admin: "Ada Okafor",
    action: "Suspended seller",
    target: "TechDeals NG",
    type: "reject",
    time: "1d ago",
  },
  {
    id: "lg8",
    admin: "Chinelo Umeh",
    action: "Removed flagged review",
    target: "on TechDeals NG",
    type: "reject",
    time: "1d ago",
  },
];

const ICONS = {
  approve: { icon: CheckmarkCircle24Filled, color: "#22C55E" },
  reject: { icon: DismissCircle24Filled, color: "#F85149" },
  refund: { icon: ArrowUndo24Filled, color: "#F0B100" },
  ban: { icon: PersonProhibited24Filled, color: "#F85149" },
  payout: { icon: Wallet24Filled, color: "#58A6FF" },
};

const TABS = [
  { key: "all", label: "All actions" },
  { key: "approve", label: "Approvals" },
  { key: "reject", label: "Rejections" },
  { key: "refund", label: "Refunds" },
  { key: "ban", label: "Bans" },
];

export default function AdminActivityLogPage() {
  const { fg, border } = useColor();
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  const admins = useMemo(() => [...new Set(LOG.map((l) => l.admin))], []);

  const filtered = LOG.filter(
    (l) =>
      (tab === "all" || l.type === tab) &&
      (l.admin.toLowerCase().includes(query.toLowerCase()) ||
        l.action.toLowerCase().includes(query.toLowerCase()) ||
        l.target.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <Box>
      <PageHeader
        title="Activity Log"
        subtitle="An audit trail of every action taken by your admin team."
      />

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2.4 }}>
        <StatBlock
          label="Actions today"
          value={String(
            LOG.filter(
              (l) => l.time.includes("h ago") || l.time.includes("m ago"),
            ).length,
          )}
        />
        <StatBlock label="Active admins" value={String(admins.length)} />
        <StatBlock
          label="Refunds issued"
          value={String(LOG.filter((l) => l.type === "refund").length)}
          accent="#F0B100"
        />
      </Stack>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        gap={1.2}
        sx={{ mb: 2 }}
      >
        <PillTabs tabs={TABS} value={tab} onChange={setTab} />
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search admin, action, target"
        />
      </Stack>

      <SectionCard>
        {filtered.length === 0 ? (
          <EmptyState
            icon={History24Regular}
            title="No matching actions"
            subtitle="Try a different filter or search term."
          />
        ) : (
          <Stack>
            {filtered.map((l, i) => {
              const meta = ICONS[l.type];
              const Icon = meta.icon;
              return (
                <Stack
                  key={l.id}
                  direction="row"
                  gap={1.4}
                  alignItems="flex-start"
                >
                  <Stack alignItems="center" sx={{ pt: 0.2 }}>
                    <Box
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        backgroundColor: `${meta.color}18`,
                        color: meta.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon style={{ fontSize: 14 }} />
                    </Box>
                    {i < filtered.length - 1 && (
                      <Box
                        sx={{
                          width: "1px",
                          flexGrow: 1,
                          minHeight: 28,
                          backgroundColor: border.primary,
                          my: 0.4,
                        }}
                      />
                    )}
                  </Stack>
                  <Stack sx={{ pb: 2.2, minWidth: 0, flexGrow: 1 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={0.8}
                      flexWrap="wrap"
                    >
                      <Avatar name={l.admin} size={20} />
                      <Typography
                        sx={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: fg.primary,
                        }}
                      >
                        {l.admin}
                      </Typography>
                      <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                        {l.action}
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{ fontSize: 12, color: fg.tertiary, mt: 0.3 }}
                    >
                      {l.target}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 11, color: fg.tertiary, mt: 0.2 }}
                    >
                      {l.time}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        )}
      </SectionCard>
    </Box>
  );
}
