// @ts-nocheck
import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import {
  CheckmarkCircle24Filled,
  Copy24Regular,
  Chat24Regular,
  Receipt24Regular,
  ArrowRight24Regular,
  Calendar24Regular,
  ShieldCheckmark24Regular,
  Box24Regular,
  Home24Regular,
  CheckmarkCircle32Filled,
  CheckmarkCircleFilled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

const ringPop = keyframes`
  0% { transform: scale(0.6); opacity: 0; }
  60% { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

const checkDraw = keyframes`
  from { stroke-dashoffset: 40; }
  to { stroke-dashoffset: 0; }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const money = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

const TIMELINE = [
  {
    key: "placed",
    label: "Order placed",
    detail: "We've received your booking and payment.",
  },
  {
    key: "confirmed",
    label: "Provider confirms",
    detail: "They'll reach out within a couple of hours to confirm details.",
  },
  {
    key: "day",
    label: "Service day",
    detail: "Your provider arrives at the scheduled date and time.",
  },
  {
    key: "done",
    label: "Mark as complete",
    detail:
      "Confirm the job's done so payment is released and you can leave a review.",
  },
];

export default function OrderConfirmedPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();
  const location = useLocation();

  // Falls back to a placeholder so this page still renders on a direct visit.
  const state = location.state || {};
  const orderId = state.orderId || "TH-482913";
  const total = state.total ?? 61500;
  const items = state.items || [
    {
      id: "c1",
      title: "Deep home window cleaning (up to 3 rooms)",
      sellerName: "SparkleCo",
      qty: 1,
      price: 12000,
    },
    {
      id: "c3",
      title: "Logo & brand identity design",
      sellerName: "Studio Nine",
      qty: 1,
      price: 45000,
    },
  ];
  const schedule = state.schedule || { date: "4 Aug 2026", time: "10:00 AM" };
  const contact = state.contact || { email: "you@email.com" };

  const itemCount = useMemo(
    () => items.reduce((n, it) => n + (it.qty || 1), 0),
    [items],
  );

  return (
    <Box sx={{ backgroundColor: bg.primary, minHeight: "80vh" }}>
      {/* success header */}
      <Box
        sx={{
          textAlign: "center",
          px: spacingTokens.md,
          pt: { xs: 6, md: 8 },
          pb: { xs: 4, md: 5 },
        }}
      >
        <Box
          sx={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            backgroundColor: `${main.primary}14`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2.5,
            animation: `${ringPop} 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
          }}
        >
          <CheckmarkCircleFilled style={{ fontSize: 46, color: "green" }} />
        </Box>
        <Typography
          sx={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: { xs: 24, md: 42 },
            color: fg.primary,
            mb: 1,
          }}
        >
          Order confirmed
        </Typography>
        <Typography
          sx={{
            fontSize: 14.5,
            color: fg.secondary,
            maxWidth: 460,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Thanks — your booking is in. A confirmation has been sent to{" "}
          <b style={{ color: fg.primary }}>{contact.email}</b>.
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap={0.8}
          sx={{
            mt: 2.5,
            display: "inline-flex",
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.full ?? 999,
            px: 2,
            py: 0.8,
          }}
        >
          <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
            Order
          </Typography>
          <Typography
            sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}
          >
            {orderId}
          </Typography>
          <Copy24Regular
            style={{ fontSize: 14, color: fg.tertiary, cursor: "pointer" }}
          />
        </Stack>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
          gap: spacingTokens.xl,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: { xs: 6, md: 8 },
          maxWidth: 1100,
          mx: "auto",
        }}
      >
        {/* ---------------- LEFT: timeline ---------------- */}
        <Box
          sx={{
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.md,
            p: spacingTokens.md,
            animation: `${fadeUp} 0.4s ease-out both`,
          }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 15,
              fontWeight: 800,
              color: fg.primary,
              mb: 2.5,
            }}
          >
            What happens next
          </Typography>
          <Stack gap={0}>
            {TIMELINE.map((step, i) => (
              <Stack key={step.key} direction="row" gap={1.6}>
                <Stack alignItems="center" sx={{ flexShrink: 0 }}>
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      backgroundColor: i === 0 ? main.primary : "transparent",
                      color: i === 0 ? "#fff" : fg.tertiary,
                      border: `1.5px solid ${i === 0 ? main.primary : border.primary}`,
                    }}
                  >
                    {i === 0 ? "✓" : i + 1}
                  </Box>
                  {i < TIMELINE.length - 1 && (
                    <Box
                      sx={{
                        width: 1.5,
                        flexGrow: 1,
                        minHeight: 34,
                        backgroundColor: border.primary,
                        my: 0.4,
                      }}
                    />
                  )}
                </Stack>
                <Stack sx={{ pb: i < TIMELINE.length - 1 ? 2.4 : 0 }}>
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: fg.primary,
                      mb: 0.3,
                    }}
                  >
                    {step.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      color: fg.secondary,
                      lineHeight: 1.5,
                    }}
                  >
                    {step.detail}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{
              mt: 1,
              p: 1.6,
              backgroundColor: bg.secondary,
              borderRadius: radiusTokens.sm ?? 8,
            }}
          >
            <Calendar24Regular
              style={{ fontSize: 17, color: main.primary, flexShrink: 0 }}
            />
            <Typography sx={{ fontSize: 12.5, color: fg.primary }}>
              Scheduled for <b>{schedule.date}</b> at <b>{schedule.time}</b>
            </Typography>
          </Stack>
        </Box>

        {/* ---------------- RIGHT: order recap + actions ---------------- */}
        <Stack gap={spacingTokens.md}>
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
              animation: `${fadeUp} 0.4s ease-out 0.05s both`,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 15,
                fontWeight: 800,
                color: fg.primary,
                mb: 1.8,
              }}
            >
              Order recap
            </Typography>
            <Stack gap={1.2} sx={{ mb: 1.8 }}>
              {items.map((it) => (
                <Stack
                  key={it.id}
                  direction="row"
                  justifyContent="space-between"
                  gap={1}
                >
                  <Stack sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: fg.primary,
                        lineHeight: 1.35,
                      }}
                    >
                      {it.title}
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                      {it.sellerName} · Qty {it.qty}
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: fg.primary,
                      flexShrink: 0,
                    }}
                  >
                    {money(it.price * it.qty)}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ pt: 1.6, borderTop: `1px solid ${border.primary}` }}
            >
              <Typography
                sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
              >
                Total paid ({itemCount} item{itemCount === 1 ? "" : "s"})
              </Typography>
              <Typography
                sx={{ fontSize: 17, fontWeight: 800, color: fg.primary }}
              >
                {money(total)}
              </Typography>
            </Stack>
          </Box>

          <Stack
            gap={1}
            sx={{ animation: `${fadeUp} 0.4s ease-out 0.1s both` }}
          >
            <ActionRow
              icon={Receipt24Regular}
              label="Download receipt"
              onClick={() => {}}
              border={border}
              fg={fg}
              main={main}
            />
            <ActionRow
              icon={Chat24Regular}
              label="Message your provider"
              onClick={() => {}}
              border={border}
              fg={fg}
              main={main}
            />
            <ActionRow
              icon={Box24Regular}
              label="Track this order"
              onClick={() => navigate("/track-order")}
              border={border}
              fg={fg}
              main={main}
            />
          </Stack>

          <Box
            onClick={() => navigate("/categories")}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.9,
              backgroundColor: main.primary,
              color: "#fff",
              borderRadius: radiusTokens.md,
              py: 1.3,
              cursor: "pointer",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 14,
              transition: "transform 0.15s ease",
              "&:hover": { transform: "translateY(-1px)" },
            }}
          >
            <Home24Regular style={{ fontSize: 17 }} />
            Continue browsing
            <ArrowRight24Regular style={{ fontSize: 17 }} />
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={0.7}
          >
            <ShieldCheckmark24Regular
              style={{ fontSize: 14, color: fg.tertiary }}
            />
            <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
              Covered by TETYHUB buyer protection
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

function ActionRow({ icon: Icon, label, onClick, border, fg, main }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      onClick={onClick}
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        px: 1.8,
        py: 1.3,
        cursor: "pointer",
        transition: "border-color 0.15s ease",
        "&:hover": { borderColor: main.primary },
      }}
    >
      <Stack direction="row" alignItems="center" gap={1.1}>
        <Icon style={{ fontSize: 18, color: main.primary }} />
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: fg.primary }}>
          {label}
        </Typography>
      </Stack>
      <ArrowRight24Regular style={{ fontSize: 15, color: fg.tertiary }} />
    </Stack>
  );
}
