// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Wallet24Regular,
  ArrowDownload24Regular,
  ArrowRepeatAll24Regular,
  ReceiptMoney24Regular,
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
  money,
} from "../data";

const TRANSACTIONS = [
  {
    id: "tx1",
    type: "Payment",
    order: "TH-402911",
    party: "Amaka Obi",
    amount: 16500,
    status: "completed",
    date: "6 Aug 2026",
  },
  {
    id: "tx2",
    type: "Platform fee",
    order: "TH-402911",
    party: "TETYHUB",
    amount: 248,
    status: "completed",
    date: "6 Aug 2026",
  },
  {
    id: "tx3",
    type: "Refund",
    order: "TH-402760",
    party: "Grace Effiong",
    amount: -18000,
    status: "completed",
    date: "5 Aug 2026",
  },
  {
    id: "tx4",
    type: "Payment",
    order: "TH-402909",
    party: "Chiamaka Nwosu",
    amount: 8000,
    status: "pending",
    date: "5 Aug 2026",
  },
  {
    id: "tx5",
    type: "Payout",
    order: "—",
    party: "Studio Nine",
    amount: -382000,
    status: "failed",
    date: "4 Aug 2026",
  },
];

const BATCHES = [
  {
    id: "pb1",
    date: "1 Aug 2026",
    sellers: 34,
    total: 1820000,
    status: "completed",
  },
  {
    id: "pb2",
    date: "25 Jul 2026",
    sellers: 29,
    total: 1544000,
    status: "completed",
  },
  {
    id: "pb3",
    date: "8 Aug 2026",
    sellers: 41,
    total: 2210000,
    status: "pending",
  },
  {
    id: "pb4",
    date: "18 Jul 2026",
    sellers: 3,
    total: 96000,
    status: "failed",
  },
];

const TABS = [
  { key: "transactions", label: "Transactions" },
  { key: "payouts", label: "Payout batches" },
];

export default function PaymentsPayoutsPage() {
  const { fg, border, main } = useColor();
  const [tab, setTab] = useState("transactions");
  const [query, setQuery] = useState("");

  const totalRevenue = TRANSACTIONS.filter(
    (t) => t.type === "Platform fee",
  ).reduce((s, t) => s + t.amount, 0);
  const pendingPayouts = BATCHES.filter((b) => b.status === "pending").reduce(
    (s, b) => s + b.total,
    0,
  );
  const failedCount =
    TRANSACTIONS.filter((t) => t.status === "failed").length +
    BATCHES.filter((b) => b.status === "failed").length;

  const filteredTx = TRANSACTIONS.filter(
    (t) =>
      t.order.toLowerCase().includes(query.toLowerCase()) ||
      t.party.toLowerCase().includes(query.toLowerCase()) ||
      t.type.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Box>
      <PageHeader
        title="Payments & Payouts"
        subtitle="The full money ledger — what came in, what went out."
        action={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={0.7}
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.sm ?? 8,
              px: 1.6,
              py: 1,
              cursor: "pointer",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <ArrowDownload24Regular
              style={{ fontSize: 15, color: fg.secondary }}
            />
            <Typography
              sx={{ fontSize: 12.5, fontWeight: 700, color: fg.secondary }}
            >
              Export ledger
            </Typography>
          </Stack>
        }
      />

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2.4 }}>
        <StatBlock
          label="Platform fees collected"
          value={money(totalRevenue)}
          accent="#22C55E"
        />
        <StatBlock
          label="Pending payouts"
          value={money(pendingPayouts)}
          accent="#F0B100"
        />
        <StatBlock
          label="Failed transfers"
          value={String(failedCount)}
          accent={failedCount > 0 ? "#F85149" : undefined}
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
        {tab === "transactions" && (
          <SearchField
            value={query}
            onChange={setQuery}
            placeholder="Search order, party, type"
          />
        )}
      </Stack>

      {tab === "transactions" ? (
        <SectionCard noPadding>
          {filteredTx.length === 0 ? (
            <EmptyState
              icon={ReceiptMoney24Regular}
              title="No transactions match"
              subtitle="Try a different search."
            />
          ) : (
            <Stack>
              {filteredTx.map((t) => (
                <Stack
                  key={t.id}
                  direction={{ xs: "column", md: "row" }}
                  alignItems={{ xs: "flex-start", md: "center" }}
                  gap={{ xs: 0.4, md: 0 }}
                  sx={{
                    px: { xs: 1.75, sm: 2.4 },
                    py: 1.4,
                    borderBottom: `1px solid ${border.primary}`,
                    "&:last-of-type": { borderBottom: "none" },
                  }}
                >
                  <Box sx={{ flex: { md: "0 0 16%" } }}>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                    >
                      {t.type}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: { md: "0 0 18%" } }}>
                    <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                      {t.order}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: { md: "1 1 auto" } }}>
                    <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                      {t.party}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: { md: "0 0 12%" } }}>
                    <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
                      {t.date}
                    </Typography>
                  </Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      flex: { xs: "1 1 auto", md: "0 0 22%" },
                      width: { xs: "100%", md: "auto" },
                      mt: { xs: 0.4, md: 0 },
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: t.amount < 0 ? "#F85149" : fg.primary,
                      }}
                    >
                      {t.amount < 0 ? "− " : ""}
                      {money(Math.abs(t.amount))}
                    </Typography>
                    <StatusChip status={t.status} size="sm" />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          )}
        </SectionCard>
      ) : (
        <Stack gap={1.4}>
          {BATCHES.map((b) => (
            <SectionCard key={b.id}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "stretch", sm: "center" }}
                gap={1.4}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: radiusTokens.sm ?? 8,
                    backgroundColor: `${main.primary}16`,
                    color: main.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Wallet24Regular style={{ fontSize: 19 }} />
                </Box>
                <Stack sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
                  >
                    Batch {b.id.toUpperCase()} · {b.date}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12, color: fg.tertiary, mt: 0.2 }}
                  >
                    {b.sellers} sellers paid
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={1.4}
                  sx={{ flexShrink: 0 }}
                >
                  <Typography
                    sx={{
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: "Syne",
                      color: fg.primary,
                    }}
                  >
                    {money(b.total)}
                  </Typography>
                  <StatusChip status={b.status} size="sm" />
                  {b.status === "failed" && (
                    <RowAction
                      icon={ArrowRepeatAll24Regular}
                      label="Retry"
                      tone="primary"
                      onClick={() => {}}
                    />
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
