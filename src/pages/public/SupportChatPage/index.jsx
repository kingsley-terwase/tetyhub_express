// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import {
  ArrowLeft24Regular,
  Send24Filled,
  ShieldCheckmark24Regular,
  Dismiss24Regular,
  HeadsetVr24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 1; }
`;

const QUICK_REPLIES = [
  "Where's my provider?",
  "I want a refund",
  "Help me reschedule",
  "Report an issue",
];

const CANNED_RESPONSES = {
  "where's my provider?":
    "Your provider is confirmed for the scheduled time. You can message or call them directly from the order tracking page — want me to pull that up?",
  "i want a refund":
    "I can help with that. Refunds are automatic if you cancel more than 48 hours before your booking. If the job already happened, I'll need a few details first — can you tell me what went wrong?",
  "help me reschedule":
    "No problem — you can reschedule directly from your order's tracking page under 'Booking details'. Want me to walk you through it?",
  "report an issue":
    "Sorry to hear that. You can file a detailed report from the order page, or tell me here what happened and I'll open a ticket for you.",
};

const defaultReply =
  "Thanks for the details — I've noted this down. A member of the team will follow up shortly, usually within a couple of hours.";

export default function SupportChatPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();
  const location = useLocation();
  const scrollRef = useRef(null);

  const state = location.state || {};
  const orderId = state.orderId;

  const [showContext, setShowContext] = useState(!!orderId);
  const [thread, setThread] = useState([
    {
      from: "agent",
      text: "Hi! I'm here to help. What can I do for you today?",
      time: "Just now",
    },
  ]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [thread, typing]);

  const respond = (userText) => {
    setTyping(true);
    const key = userText.trim().toLowerCase();
    const reply = CANNED_RESPONSES[key] || defaultReply;
    setTimeout(() => {
      setTyping(false);
      setThread((prev) => [
        ...prev,
        { from: "agent", text: reply, time: "Just now" },
      ]);
    }, 900);
  };

  const sendMessage = (text) => {
    const value = (text ?? draft).trim();
    if (!value) return;
    setThread((prev) => [
      ...prev,
      { from: "me", text: value, time: "Just now" },
    ]);
    setDraft("");
    respond(value);
  };

  return (
    <Box
      sx={{
        backgroundColor: bg.primary,
        display: "flex",
        flexDirection: "column",
        minHeight: "80vh",
      }}
    >
      {/* header */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pt: { xs: 3, md: 4 },
          pb: 1.5,
          maxWidth: 760,
          mx: "auto",
          width: "100%",
        }}
      >
        <Stack direction="row" alignItems="center" gap={1.2}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              backgroundColor: `${main.primary}14`,
              color: main.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <HeadsetVr24Regular style={{ fontSize: 20 }} />
          </Box>
          <Stack>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 15.5,
                fontWeight: 800,
                color: fg.primary,
              }}
            >
              TETYHUB Support
            </Typography>
            <Stack direction="row" alignItems="center" gap={0.6}>
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  backgroundColor: "#2ecc71",
                }}
              />
              <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
                Online · replies in minutes
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      {/* pinned order context */}
      {showContext && (
        <Box
          sx={{
            px: { xs: spacingTokens.md, md: spacingTokens.xl },
            maxWidth: 760,
            mx: "auto",
            width: "100%",
            mb: 1,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              backgroundColor: bg.secondary,
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.sm ?? 8,
              px: 1.6,
              py: 1,
              animation: `${fadeUp} 0.3s ease-out both`,
            }}
          >
            <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
              Viewing this chat in context of order{" "}
              <b style={{ color: fg.primary }}>{orderId}</b>
            </Typography>
            <Dismiss24Regular
              onClick={() => setShowContext(false)}
              style={{ fontSize: 15, color: fg.tertiary, cursor: "pointer" }}
            />
          </Stack>
        </Box>
      )}

      {/* chat thread */}
      <Box
        ref={scrollRef}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          maxWidth: 760,
          mx: "auto",
          width: "100%",
          py: 2,
        }}
      >
        <Stack gap={1.4}>
          {thread.map((m, i) => (
            <Box
              key={i}
              sx={{
                alignSelf: m.from === "me" ? "flex-end" : "flex-start",
                maxWidth: "78%",
                backgroundColor: m.from === "me" ? main.primary : bg.secondary,
                color: m.from === "me" ? "#fff" : fg.primary,
                borderRadius: radiusTokens.md,
                px: 1.8,
                py: 1.2,
                animation: `${fadeUp} 0.25s ease-out both`,
              }}
            >
              <Typography sx={{ fontSize: 13.5, lineHeight: 1.5 }}>
                {m.text}
              </Typography>
              <Typography sx={{ fontSize: 10, opacity: 0.65, mt: 0.5 }}>
                {m.time}
              </Typography>
            </Box>
          ))}

          {typing && (
            <Box
              sx={{
                alignSelf: "flex-start",
                backgroundColor: bg.secondary,
                borderRadius: radiusTokens.md,
                px: 1.8,
                py: 1.3,
              }}
            >
              <Stack direction="row" gap={0.5}>
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: fg.tertiary,
                      animation: `${bounce} 1.1s ${i * 0.15}s infinite ease-in-out`,
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
      </Box>

      {/* quick replies */}
      {thread.length <= 2 && (
        <Box
          sx={{
            px: { xs: spacingTokens.md, md: spacingTokens.xl },
            maxWidth: 760,
            mx: "auto",
            width: "100%",
            pb: 1,
          }}
        >
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {QUICK_REPLIES.map((q) => (
              <Box
                key={q}
                onClick={() => sendMessage(q)}
                sx={{
                  border: `1px solid ${border.primary}`,
                  borderRadius: radiusTokens.full ?? 999,
                  px: 1.6,
                  py: 0.7,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: main.primary,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: `${main.primary}0a` },
                }}
              >
                {q}
              </Box>
            ))}
          </Stack>
        </Box>
      )}

      {/* input */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: { xs: 3, md: 4 },
          maxWidth: 760,
          mx: "auto",
          width: "100%",
        }}
      >
        <Stack direction="row" gap={1} alignItems="center">
          <Box
            sx={{
              flexGrow: 1,
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              px: 1.8,
              py: 1.1,
            }}
          >
            <InputBase
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              sx={{ fontSize: 13.5, width: "100%", color: fg.primary }}
            />
          </Box>
          <Box
            onClick={() => sendMessage()}
            sx={{
              width: 44,
              height: 44,
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
            <Send24Filled style={{ fontSize: 17 }} />
          </Box>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={0.7}
          sx={{ mt: 1.6 }}
        >
          <ShieldCheckmark24Regular
            style={{ fontSize: 13, color: fg.tertiary }}
          />
          <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
            Conversations are private and reviewed only by TETYHUB support
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
