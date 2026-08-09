// @ts-nocheck
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import {
  Send24Regular,
  ArrowLeft24Regular,
  Search24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { PageHeader, Avatar } from "../SellerUi";

const THREADS = [
  {
    id: "t1",
    name: "Sarah Johnson",
    preview: "Is the 4pm slot on Friday still open?",
    time: "9:41 AM",
    unread: 2,
    messages: [
      {
        from: "them",
        text: "Hi! Is the 4pm slot on Friday still open?",
        time: "9:32 AM",
      },
      {
        from: "them",
        text: "Also — do you handle the balcony windows too?",
        time: "9:41 AM",
      },
    ],
  },
  {
    id: "t2",
    name: "Ahmed Hassan",
    preview: "Thanks, looking forward to the concepts",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        from: "them",
        text: "Just paid the deposit, excited to see the concepts!",
        time: "Yesterday",
      },
      {
        from: "me",
        text: "Thank you Ahmed! You'll have the first 3 concepts by Thursday.",
        time: "Yesterday",
      },
      {
        from: "them",
        text: "Thanks, looking forward to the concepts",
        time: "Yesterday",
      },
    ],
  },
  {
    id: "t3",
    name: "Maria Garcia",
    preview: "Perfect, that works for me",
    time: "Mon",
    unread: 0,
    messages: [
      {
        from: "me",
        text: "I can reschedule to Monday 10am if that's better?",
        time: "Mon",
      },
      { from: "them", text: "Perfect, that works for me", time: "Mon" },
    ],
  },
];

export default function MessagesPage() {
  const { fg, bg, border, main } = useColor();
  const location = useLocation();
  const preselected = location.state?.customer;
  const [activeId, setActiveId] = useState(THREADS[0]?.id);
  const [draft, setDraft] = useState("");
  const [threads, setThreads] = useState(THREADS);

  const active = threads.find((t) => t.id === activeId);

  const send = () => {
    if (!draft.trim() || !active) return;
    setThreads((ts) =>
      ts.map((t) =>
        t.id === active.id
          ? {
              ...t,
              messages: [
                ...t.messages,
                { from: "me", text: draft, time: "Now" },
              ],
              preview: draft,
            }
          : t,
      ),
    );
    setDraft("");
  };

  return (
    <Box>
      <PageHeader
        title="Messages"
        subtitle={
          preselected
            ? `Jumped in from ${preselected.name}'s profile`
            : "Conversations with your buyers."
        }
        fg={fg}
      />

      <Box
        sx={{
          border: `1px solid ${border.primary}`,
          borderRadius: radiusTokens.md,
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "280px 1fr" },
          height: { xs: "auto", md: 460 },
          overflow: "hidden",
        }}
      >
        {/* Thread list */}
        <Stack
          sx={{
            borderRight: { md: `1px solid ${border.primary}` },
            display: { xs: activeId ? "none" : "flex", md: "flex" },
            minHeight: 0,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ p: 1.6, borderBottom: `1px solid ${border.primary}` }}
          >
            <Search24Regular style={{ fontSize: 15, color: fg.tertiary }} />
            <InputBase
              placeholder="Search conversations..."
              sx={{ fontSize: 13, color: fg.primary, flexGrow: 1 }}
            />
          </Stack>
          <Stack sx={{ overflowY: "auto" }}>
            {threads.map((t) => (
              <Stack
                key={t.id}
                direction="row"
                gap={1.1}
                onClick={() => setActiveId(t.id)}
                sx={{
                  p: 1.6,
                  cursor: "pointer",
                  borderBottom: `1px solid ${border.primary}`,
                  backgroundColor:
                    t.id === activeId ? `${main.primary}0d` : "transparent",
                  minWidth: 0,
                }}
              >
                <Avatar name={t.name} size={38} />
                <Stack sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography
                      noWrap
                      sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}
                    >
                      {t.name}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 10.5, color: fg.tertiary, flexShrink: 0 }}
                    >
                      {t.time}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      noWrap
                      sx={{
                        fontSize: 12,
                        color: fg.tertiary,
                        flexGrow: 1,
                        minWidth: 0,
                      }}
                    >
                      {t.preview}
                    </Typography>
                    {t.unread > 0 && (
                      <Box
                        sx={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          backgroundColor: main.primary,
                          color: "#fff",
                          fontSize: 10.5,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {t.unread}
                      </Box>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>

        {/* Conversation */}
        <Stack
          sx={{
            display: { xs: activeId ? "flex" : "none", md: "flex" },
            minWidth: 0,
            minHeight: 0,
          }}
        >
          {active ? (
            <>
              <Stack
                direction="row"
                alignItems="center"
                gap={1.1}
                sx={{ p: 1.6, borderBottom: `1px solid ${border.primary}` }}
              >
                <Box
                  onClick={() => setActiveId(null)}
                  sx={{
                    display: { xs: "flex", md: "none" },
                    color: fg.secondary,
                    cursor: "pointer",
                  }}
                >
                  <ArrowLeft24Regular style={{ fontSize: 18 }} />
                </Box>
                <Avatar name={active.name} size={32} />
                <Typography
                  sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
                >
                  {active.name}
                </Typography>
              </Stack>

              <Stack gap={1.2} sx={{ p: 2, flexGrow: 1, overflowY: "auto" }}>
                {active.messages.map((m, i) => (
                  <Stack
                    key={i}
                    alignItems={m.from === "me" ? "flex-end" : "flex-start"}
                  >
                    <Box
                      sx={{
                        maxWidth: "78%",
                        backgroundColor:
                          m.from === "me" ? main.primary : `${fg.secondary}14`,
                        color: m.from === "me" ? "#fff" : fg.primary,
                        borderRadius: radiusTokens.md,
                        px: 1.6,
                        py: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: 13, lineHeight: 1.5 }}>
                        {m.text}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{ fontSize: 10.5, color: fg.tertiary, mt: 0.4 }}
                    >
                      {m.time}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Stack
                direction="row"
                gap={1}
                alignItems="center"
                sx={{ p: 1.6, borderTop: `1px solid ${border.primary}` }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                    border: `1px solid ${border.primary}`,
                    borderRadius: radiusTokens.sm ?? 8,
                    px: 1.4,
                    py: 0.9,
                  }}
                >
                  <InputBase
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && send()}
                    placeholder="Write a message..."
                    sx={{ fontSize: 13.5, width: "100%", color: fg.primary }}
                  />
                </Box>
                <Box
                  onClick={send}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: main.primary,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <Send24Regular style={{ fontSize: 16 }} />
                </Box>
              </Stack>
            </>
          ) : (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100%", p: 3 }}
            >
              <Typography sx={{ fontSize: 13, color: fg.tertiary }}>
                Select a conversation
              </Typography>
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
}
