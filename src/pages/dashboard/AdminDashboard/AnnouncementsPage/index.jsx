// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import { Megaphone24Regular, Send24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { PageHeader, SectionCard, StatusChip, EmptyState } from "../data";

const AUDIENCES = [
  { key: "all", label: "Everyone" },
  { key: "sellers", label: "Sellers only" },
  { key: "buyers", label: "Buyers only" },
];

const SENT = [
  {
    id: "an1",
    title: "Holiday payout schedule change",
    audience: "Sellers only",
    date: "3 Aug 2026",
    status: "completed",
    reach: "312 sellers",
  },
  {
    id: "an2",
    title: "New buyer protection policy",
    audience: "Everyone",
    date: "28 Jul 2026",
    status: "completed",
    reach: "8,240 users",
  },
  {
    id: "an3",
    title: "Scheduled maintenance, Aug 10",
    audience: "Everyone",
    date: "8 Aug 2026",
    status: "pending",
    reach: "8,310 users",
  },
];

export default function AnnouncementsPage() {
  const { fg, border, main } = useColor();
  const [audience, setAudience] = useState("all");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Box>
      <PageHeader
        title="Announcements"
        subtitle="Send a notice to sellers, buyers, or everyone at once."
      />

      <SectionCard sx={{ mb: 2.4 }}>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontWeight: 800,
            fontSize: 14,
            color: fg.primary,
            mb: 1.8,
          }}
        >
          Compose a new announcement
        </Typography>

        <Typography
          sx={{ fontSize: 12, fontWeight: 600, color: fg.secondary, mb: 0.8 }}
        >
          Send to
        </Typography>
        <Stack direction="row" gap={0.8} sx={{ mb: 1.8 }} flexWrap="wrap">
          {AUDIENCES.map((a) => {
            const active = a.key === audience;
            return (
              <Box
                key={a.key}
                onClick={() => setAudience(a.key)}
                sx={{
                  px: 1.6,
                  py: 0.8,
                  borderRadius: 999,
                  fontSize: 12.5,
                  fontWeight: 700,
                  cursor: "pointer",
                  border: `1px solid ${active ? main.primary : border.primary}`,
                  backgroundColor: active ? `${main.primary}14` : "transparent",
                  color: active ? main.primary : fg.secondary,
                }}
              >
                {a.label}
              </Box>
            );
          })}
        </Stack>

        <Stack gap={1.4}>
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.sm ?? 8,
              px: 1.4,
              py: 1,
            }}
          >
            <InputBase
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement title"
              sx={{
                fontSize: 16,
                width: "100%",
                color: fg.primary,
                "& input": { fontSize: 16 },
              }}
            />
          </Box>
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.sm ?? 8,
              px: 1.4,
              py: 1.2,
            }}
          >
            <InputBase
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write the announcement message..."
              multiline
              minRows={3}
              sx={{ fontSize: 13, width: "100%", color: fg.primary }}
            />
          </Box>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="flex-end"
          gap={1}
          sx={{ mt: 1.8 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={0.7}
            sx={{
              backgroundColor: main.primary,
              color: "#fff",
              borderRadius: radiusTokens.sm ?? 8,
              px: 2,
              py: 1.1,
              cursor: "pointer",
            }}
          >
            <Send24Regular style={{ fontSize: 15 }} />
            <Typography
              sx={{ fontSize: 12.5, fontWeight: 700, fontFamily: "Poppins" }}
            >
              Send announcement
            </Typography>
          </Stack>
        </Stack>
      </SectionCard>

      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: 800,
          fontSize: 14,
          color: fg.primary,
          mb: 1.4,
        }}
      >
        Sent history
      </Typography>

      {SENT.length === 0 ? (
        <SectionCard>
          <EmptyState
            icon={Megaphone24Regular}
            title="No announcements yet"
            subtitle="Anything you send will show up here."
          />
        </SectionCard>
      ) : (
        <SectionCard noPadding>
          <Stack>
            {SENT.map((a, i) => (
              <Stack
                key={a.id}
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                gap={{ xs: 0.5, sm: 1.4 }}
                sx={{
                  px: { xs: 1.75, sm: 2.4 },
                  py: 1.4,
                  borderTop: i === 0 ? "none" : `1px solid ${border.primary}`,
                }}
              >
                <Stack sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                  >
                    {a.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 11.5, color: fg.tertiary, mt: 0.2 }}
                  >
                    {a.audience} · {a.reach} · {a.date}
                  </Typography>
                </Stack>
                <StatusChip status={a.status} size="sm" />
              </Stack>
            ))}
          </Stack>
        </SectionCard>
      )}
    </Box>
  );
}
