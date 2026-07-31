// @ts-nocheck
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import {
  ArrowLeft24Regular,
  Warning24Regular,
  CheckmarkCircle24Filled,
  Attach24Regular,
  Mail24Regular,
  Clock24Regular,
  ShieldCheckmark24Regular,
  CheckmarkCircleFilled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ringPop = keyframes`
  0% { transform: scale(0.6); opacity: 0; }
  60% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const CATEGORIES = [
  {
    key: "no_show",
    label: "Provider didn't show up",
    hint: "They missed the scheduled time",
  },
  {
    key: "not_as_described",
    label: "Job not as described",
    hint: "Work quality or scope issue",
  },
  {
    key: "damage",
    label: "Property damage",
    hint: "Something was broken or damaged",
  },
  {
    key: "billing",
    label: "Overcharged / billing issue",
    hint: "Wrong amount or extra charges",
  },
  {
    key: "safety",
    label: "Safety concern",
    hint: "Conduct or safety during the job",
  },
  {
    key: "other",
    label: "Something else",
    hint: "Doesn't fit the categories above",
  },
];

export default function ReportIssuePage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state || {};
  const orderId = state.orderId || "TH-482913";
  const providerName = state.providerName || "SparkleCo";

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ticketId = `TK-${Math.floor(100000 + Math.random() * 900000)}`;

  const canSubmit = category && description.trim().length > 8;

  const handleSubmit = () => {
    if (!canSubmit) return;
    // Wire this up to your real support-ticket API.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Box
        sx={{
          backgroundColor: bg.primary,
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: spacingTokens.md,
        }}
      >
        <Stack
          alignItems="center"
          textAlign="center"
          gap={1.6}
          sx={{ maxWidth: 420 }}
        >
          <Box
            sx={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              backgroundColor: `${main.primary}14`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: `${ringPop} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
            }}
          >
            <CheckmarkCircleFilled
              style={{ fontSize: 42, color: main.primary }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: "Syne",
              fontWeight: 700,
              fontSize: 22,
              color: fg.primary,
            }}
          >
            We've got your report
          </Typography>
          <Typography
            sx={{ fontSize: 14, color: fg.secondary, lineHeight: 1.6 }}
          >
            Ticket <b style={{ color: fg.primary }}>{ticketId}</b> has been
            opened for order {orderId}. Our team typically responds within 24
            hours.
          </Typography>
          <Stack direction="row" gap={1.4} sx={{ mt: 1 }}>
            <Box
              onClick={() => navigate("/support/chat", { state: { orderId } })}
              sx={{
                backgroundColor: main.primary,
                color: "#fff",
                borderRadius: radiusTokens.md,
                px: 2.6,
                py: 1.1,
                cursor: "pointer",
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: 13.5,
              }}
            >
              Chat with support now
            </Box>
            <Box
              onClick={() => navigate(-1)}
              sx={{
                border: `1px solid ${border.primary}`,
                color: fg.primary,
                borderRadius: radiusTokens.md,
                px: 2.6,
                py: 1.1,
                cursor: "pointer",
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: 13.5,
              }}
            >
              Back to order
            </Box>
          </Stack>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pt: { xs: 3, md: 4.5 },
          pb: 2,
          maxWidth: 640,
          mx: "auto",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: { xs: 22, md: 28 },
            color: fg.primary,
          }}
        >
          Report an issue
        </Typography>
        <Typography sx={{ fontSize: 13, color: fg.tertiary, mt: 0.4 }}>
          Order {orderId} · {providerName}
        </Typography>
      </Box>

      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: { xs: 6, md: 8 },
          maxWidth: 640,
          mx: "auto",
        }}
      >
        {/* category */}
        <Box
          sx={{
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.md,
            p: spacingTokens.md,
            mb: spacingTokens.md,
            animation: `${fadeUp} 0.3s ease-out both`,
          }}
        >
          <Typography
            sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary, mb: 1.6 }}
          >
            What went wrong?
          </Typography>
          <Stack gap={1}>
            {CATEGORIES.map((c) => {
              const active = category === c.key;
              return (
                <Stack
                  key={c.key}
                  direction="row"
                  alignItems="center"
                  gap={1.2}
                  onClick={() => setCategory(c.key)}
                  sx={{
                    border: `1px solid ${active ? main.primary : border.primary}`,
                    backgroundColor: active
                      ? `${main.primary}0a`
                      : "transparent",
                    borderRadius: radiusTokens.sm ?? 8,
                    px: 1.6,
                    py: 1.1,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  <Box
                    sx={{
                      width: 17,
                      height: 17,
                      borderRadius: "50%",
                      border: `2px solid ${active ? main.primary : border.primary}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {active && (
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          backgroundColor: main.primary,
                        }}
                      />
                    )}
                  </Box>
                  <Stack>
                    <Typography
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                    >
                      {c.label}
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                      {c.hint}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Box>

        {/* description */}
        <Box
          sx={{
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.md,
            p: spacingTokens.md,
            mb: spacingTokens.md,
            animation: `${fadeUp} 0.3s ease-out 0.05s both`,
          }}
        >
          <Typography
            sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary, mb: 1.2 }}
          >
            Tell us what happened
          </Typography>
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.sm ?? 8,
              px: 1.6,
              py: 1.2,
              mb: 1.2,
            }}
          >
            <InputBase
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give as much detail as you can — dates, times, and what you expected vs. what happened."
              multiline
              minRows={4}
              sx={{ fontSize: 13, width: "100%", color: fg.primary }}
            />
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            gap={0.8}
            sx={{
              border: `1px dashed ${border.primary}`,
              borderRadius: radiusTokens.sm ?? 8,
              px: 1.6,
              py: 1.1,
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            <Attach24Regular style={{ fontSize: 16, color: fg.secondary }} />
            <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
              Attach photos (optional)
            </Typography>
          </Stack>
        </Box>

        {/* contact preference */}
        <Box
          sx={{
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.md,
            p: spacingTokens.md,
            mb: spacingTokens.md,
            animation: `${fadeUp} 0.3s ease-out 0.1s both`,
          }}
        >
          <Typography
            sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary, mb: 1.2 }}
          >
            Where should we send updates?
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            gap={0.9}
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.sm ?? 8,
              px: 1.6,
              py: 1.1,
            }}
          >
            <Mail24Regular style={{ fontSize: 16, color: fg.tertiary }} />
            <InputBase
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              sx={{ fontSize: 13, flexGrow: 1, color: fg.primary }}
            />
          </Stack>
        </Box>

        <Box
          onClick={handleSubmit}
          sx={{
            textAlign: "center",
            backgroundColor: canSubmit ? main.primary : border.primary,
            color: "#fff",
            borderRadius: radiusTokens.md,
            py: 1.4,
            fontFamily: "Poppins",
            fontWeight: 700,
            fontSize: 14.5,
            cursor: canSubmit ? "pointer" : "not-allowed",
          }}
        >
          Submit report
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={0.8}
          sx={{ mt: 2.2 }}
        >
          <Clock24Regular style={{ fontSize: 14, color: fg.tertiary }} />
          <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
            Most reports get a first response within 24 hours
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={0.7}
          sx={{ mt: 0.6 }}
        >
          <ShieldCheckmark24Regular
            style={{ fontSize: 14, color: fg.tertiary }}
          />
          <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
            Your payment stays protected while we look into this
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
