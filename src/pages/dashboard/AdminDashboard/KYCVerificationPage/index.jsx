// @ts-nocheck
import { useMemo, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  DocumentText24Regular,
  CheckmarkCircle24Filled,
  DismissCircle24Filled,
  Clock24Regular,
  CheckmarkCircle24Regular,
  DismissCircle24Regular,
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
  Avatar,
  StatBlock,
  ProgressBar,
  RowAction,
} from "../data";

const APPLICANTS = [
  {
    id: "k1",
    name: "Kaduna Kitchens",
    owner: "Fatima Bello",
    docs: [
      { type: "Government ID", status: "verified" },
      { type: "Proof of address", status: "verified" },
      { type: "Business registration", status: "pending" },
    ],
    status: "pending",
  },
  {
    id: "k2",
    name: "Bright Frame Studio",
    owner: "Tunde Alaba",
    docs: [
      { type: "Government ID", status: "verified" },
      { type: "Proof of address", status: "pending" },
      { type: "Business registration", status: "pending" },
      { type: "Bank verification", status: "pending" },
    ],
    status: "pending",
  },
  {
    id: "k3",
    name: "Naija Cleaners",
    owner: "Grace Effiong",
    docs: [
      { type: "Government ID", status: "verified" },
      { type: "Proof of address", status: "verified" },
      { type: "Business registration", status: "verified" },
    ],
    status: "verified",
  },
  {
    id: "k4",
    name: "QuickFix Autos",
    owner: "Ibrahim Sule",
    docs: [
      { type: "Government ID", status: "rejected" },
      { type: "Proof of address", status: "verified" },
    ],
    status: "rejected",
  },
];

const TABS = [
  { key: "pending", label: "Pending" },
  { key: "verified", label: "Verified" },
  { key: "rejected", label: "Rejected" },
];

export default function KYCVerificationPage() {
  const { fg, border, main } = useColor();
  const [tab, setTab] = useState("pending");
  const [query, setQuery] = useState("");
  const [applicants, setApplicants] = useState(APPLICANTS);

  const counts = useMemo(
    () => ({
      pending: applicants.filter((a) => a.status === "pending").length,
      verified: applicants.filter((a) => a.status === "verified").length,
      rejected: applicants.filter((a) => a.status === "rejected").length,
    }),
    [applicants],
  );

  const filtered = applicants.filter(
    (a) =>
      a.status === tab &&
      (a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.owner.toLowerCase().includes(query.toLowerCase())),
  );

  const setDocStatus = (appId, docType, status) =>
    setApplicants((prev) =>
      prev.map((a) =>
        a.id === appId
          ? {
              ...a,
              docs: a.docs.map((d) =>
                d.type === docType ? { ...d, status } : d,
              ),
            }
          : a,
      ),
    );

  return (
    <Box>
      <PageHeader
        title="KYC & Verification"
        subtitle="Identity and business documents behind every seller."
      />

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2.4 }}>
        <StatBlock
          label="Pending review"
          value={String(counts.pending)}
          accent="#F0B100"
        />
        <StatBlock
          label="Fully verified"
          value={String(counts.verified)}
          accent="#22C55E"
        />
        <StatBlock
          label="Rejected"
          value={String(counts.rejected)}
          accent={counts.rejected > 0 ? "#F85149" : undefined}
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
          placeholder="Search business or owner"
        />
      </Stack>

      {filtered.length === 0 ? (
        <SectionCard>
          <EmptyState
            icon={DocumentText24Regular}
            title={`No ${tab} applicants`}
            subtitle="Nothing waiting in this view."
          />
        </SectionCard>
      ) : (
        <Stack gap={1.4}>
          {filtered.map((a) => {
            const verifiedCount = a.docs.filter(
              (d) => d.status === "verified",
            ).length;
            return (
              <SectionCard key={a.id}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  gap={1.8}
                  alignItems={{ xs: "stretch", md: "flex-start" }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap={1.2}
                    sx={{ flex: { md: "0 0 220px" }, minWidth: 0 }}
                  >
                    <Avatar name={a.name} />
                    <Stack sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: 13.5,
                          fontWeight: 700,
                          color: fg.primary,
                        }}
                        noWrap
                      >
                        {a.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 11.5, color: fg.tertiary }}
                        noWrap
                      >
                        {a.owner}
                      </Typography>
                      <Box sx={{ mt: 0.6, width: 120 }}>
                        <ProgressBar
                          value={verifiedCount}
                          max={a.docs.length}
                          accent={
                            a.status === "rejected" ? "#F85149" : undefined
                          }
                        />
                      </Box>
                      <Typography
                        sx={{ fontSize: 10.5, color: fg.tertiary, mt: 0.3 }}
                      >
                        {verifiedCount}/{a.docs.length} documents verified
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack sx={{ flexGrow: 1 }} gap={0.9}>
                    {a.docs.map((d) => (
                      <Stack
                        key={d.type}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                        sx={{
                          border: `1px solid ${border.primary}`,
                          borderRadius: radiusTokens.sm ?? 8,
                          px: 1.4,
                          py: 0.9,
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap={0.9}
                          sx={{ minWidth: 0 }}
                        >
                          {d.status === "verified" ? (
                            <CheckmarkCircle24Filled
                              style={{
                                fontSize: 16,
                                color: "#22C55E",
                                flexShrink: 0,
                              }}
                            />
                          ) : d.status === "rejected" ? (
                            <DismissCircle24Filled
                              style={{
                                fontSize: 16,
                                color: "#F85149",
                                flexShrink: 0,
                              }}
                            />
                          ) : (
                            <Clock24Regular
                              style={{
                                fontSize: 16,
                                color: "#F0B100",
                                flexShrink: 0,
                              }}
                            />
                          )}
                          <Typography
                            sx={{ fontSize: 12.5, color: fg.primary }}
                            noWrap
                          >
                            {d.type}
                          </Typography>
                        </Stack>
                        {d.status === "pending" && (
                          <Stack
                            direction="row"
                            gap={0.6}
                            sx={{ flexShrink: 0 }}
                          >
                            <RowAction
                              icon={DismissCircle24Regular}
                              label="Reject"
                              tone="danger"
                              onClick={() =>
                                setDocStatus(a.id, d.type, "rejected")
                              }
                            />
                            <RowAction
                              icon={CheckmarkCircle24Regular}
                              label="Verify"
                              tone="primary"
                              onClick={() =>
                                setDocStatus(a.id, d.type, "verified")
                              }
                            />
                          </Stack>
                        )}
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </SectionCard>
            );
          })}
        </Stack>
      )}
    </Box>
  );
}
