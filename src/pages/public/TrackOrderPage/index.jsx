// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import {
  ArrowLeft24Regular,
  ArrowRight24Regular,
  CheckmarkCircle24Filled,
  ShieldCheckmark24Regular,
  Chat24Regular,
  Call24Regular,
  Receipt24Regular,
  Location24Regular,
  Calendar24Regular,
  Clock24Regular,
  Star24Filled,
  Warning24Regular,
  Dismiss24Regular,
  Edit24Regular,
  QuestionCircle24Regular,
  Send24Filled,
  Copy24Regular,
  ChatBubblesQuestion24Regular,
  DocumentQuestionMark24Regular,
  Person24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0,0,0,0.18); }
  100% { box-shadow: 0 0 0 10px rgba(0,0,0,0); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translate(-50%, 12px); }
  to { opacity: 1; transform: translate(-50%, 0); }
`;

const money = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

const STAGES = [
  { key: "placed", label: "Placed", stamp: "31 Jul, 2:41 PM" },
  { key: "confirmed", label: "Confirmed", stamp: "31 Jul, 3:05 PM" },
  { key: "in_progress", label: "In progress", stamp: null },
  { key: "completed", label: "Completed", stamp: null },
];

const PROVIDER = {
  name: "SparkleCo",
  phone: "+234 803 000 1122",
};

const INITIAL_THREAD = [
  {
    from: "provider",
    text: "Hi! Just confirming your window cleaning for the 4th — see you then 😊",
    time: "3:06 PM",
  },
];

export default function TrackOrderPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();
  const location = useLocation();

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
      id: "c2",
      title: "Add-on: Oven deep clean",
      sellerName: "SparkleCo",
      qty: 1,
      price: 4500,
    },
  ];
  const schedule = state.schedule || { date: "4 Aug 2026", time: "10:00 AM" };
  const address = state.address || "12 Admiralty Way, Lekki Phase 1, Lagos";

  // Mock current stage — wire this to your real order status.
  const [stageIndex] = useState(1);
  const [showCancel, setShowCancel] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [newDate, setNewDate] = useState(schedule.date);
  const [newTime, setNewTime] = useState(schedule.time);
  const [cancelled, setCancelled] = useState(false);
  const [rescheduled, setRescheduled] = useState(false);
  const [thread, setThread] = useState(INITIAL_THREAD);
  const [draft, setDraft] = useState("");
  const [toast, setToast] = useState("");
  const [copied, setCopied] = useState(false);

  const itemCount = useMemo(
    () => items.reduce((n, it) => n + (it.qty || 1), 0),
    [items],
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const confirmCancel = () => {
    setCancelled(true);
    setShowCancel(false);
    setToast("Booking cancelled — refund is on its way.");
  };

  const confirmReschedule = () => {
    setRescheduled(true);
    setShowReschedule(false);
    setToast("Booking rescheduled.");
  };

  const sendMessage = () => {
    if (!draft.trim()) return;
    setThread((prev) => [
      ...prev,
      { from: "me", text: draft.trim(), time: "Just now" },
    ]);
    setDraft("");
  };

  const copyNumber = () => {
    navigator.clipboard?.writeText(PROVIDER.phone).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadReceipt = () => {
    setToast(`Receipt for ${orderId} downloaded.`);
  };

  return (
    <Box sx={{ backgroundColor: bg.primary, position: "relative" }}>
      {/* header */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pt: { xs: 3, md: 4.5 },
          pb: 2,
          maxWidth: 1140,
          mx: "auto",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={1.5}
        >
          <Stack
            direction="row"
            alignItems="baseline"
            gap={1.2}
            flexWrap="wrap"
          >
            <Typography
              sx={{
                fontFamily: "Syne",
                fontWeight: 700,
                fontSize: { xs: 22, md: 28 },
                color: fg.primary,
              }}
            >
              Order {orderId}
            </Typography>
            <StatusPill
              label={cancelled ? "Cancelled" : STAGES[stageIndex].label}
              tone={cancelled ? "error" : "active"}
              main={main}
              fg={fg}
            />
          </Stack>
          <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>
            Placed on {STAGES[0].stamp}
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7.2fr 4.8fr" },
          gap: spacingTokens.xl,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: { xs: 6, md: 8 },
          maxWidth: 1140,
          mx: "auto",
        }}
      >
        {/* ---------------- LEFT ---------------- */}
        <Stack gap={spacingTokens.md} sx={{ minWidth: 0 }}>
          {/* status timeline */}
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
              animation: `${fadeUp} 0.35s ease-out both`,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 15,
                fontWeight: 800,
                color: fg.primary,
                mb: 3,
              }}
            >
              Order status
            </Typography>

            {cancelled ? (
              <Stack direction="row" gap={1.4} alignItems="flex-start">
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: "#fbe9e9",
                    color: "#c0392b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Dismiss24Regular style={{ fontSize: 16 }} />
                </Box>
                <Stack>
                  <Typography
                    sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
                  >
                    This booking was cancelled
                  </Typography>
                  <Typography
                    sx={{ fontSize: 12.5, color: fg.secondary, mt: 0.4 }}
                  >
                    Refunds to your original payment method take 3–5 business
                    days. Contact support if you don't see it by then.
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Stack direction="row" alignItems="flex-start">
                {STAGES.map((stage, i) => {
                  const done = i < stageIndex;
                  const current = i === stageIndex;
                  return (
                    <Box
                      key={stage.key}
                      sx={{
                        flex: 1,
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {i > 0 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 15,
                            left: "-50%",
                            width: "100%",
                            height: 2,
                            backgroundColor:
                              i <= stageIndex ? main.primary : border.primary,
                            zIndex: 0,
                          }}
                        />
                      )}
                      <Box
                        sx={{
                          position: "relative",
                          zIndex: 1,
                          width: 30,
                          height: 30,
                          mx: "auto",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor:
                            done || current ? main.primary : bg.primary,
                          color: done || current ? "#fff" : fg.tertiary,
                          border: `2px solid ${done || current ? main.primary : border.primary}`,
                          animation: current
                            ? `${pulse} 1.6s ease-out infinite`
                            : "none",
                        }}
                      >
                        {done ? "✓" : i + 1}
                      </Box>
                      <Typography
                        sx={{
                          fontSize: 12,
                          fontWeight: current ? 700 : 600,
                          color: done || current ? fg.primary : fg.tertiary,
                          mt: 1,
                        }}
                      >
                        {stage.label}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 10.5, color: fg.tertiary, mt: 0.2 }}
                      >
                        {stage.stamp || (current ? "In progress" : "—")}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>
            )}

            {!cancelled && (
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                  mt: 3,
                  p: 1.6,
                  backgroundColor: bg.secondary,
                  borderRadius: radiusTokens.sm ?? 8,
                }}
              >
                <Clock24Regular
                  style={{ fontSize: 17, color: main.primary, flexShrink: 0 }}
                />
                <Typography sx={{ fontSize: 12.5, color: fg.primary }}>
                  {rescheduled ? (
                    <>
                      Rescheduled to <b>{newDate}</b> at <b>{newTime}</b>
                    </>
                  ) : (
                    <>
                      {PROVIDER.name} confirmed your booking — arriving{" "}
                      <b>{schedule.date}</b> at <b>{schedule.time}</b>
                    </>
                  )}
                </Typography>
              </Stack>
            )}
          </Box>

          {/* provider card */}
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
              animation: `${fadeUp} 0.35s ease-out 0.05s both`,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 15,
                fontWeight: 800,
                color: fg.primary,
                mb: 2,
              }}
            >
              Your provider
            </Typography>
            <Stack direction="row" alignItems="center" gap={1.4}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: main.primary,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {PROVIDER.name.charAt(0)}
              </Box>
              <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
                <Stack direction="row" alignItems="center" gap={0.6}>
                  <Typography
                    sx={{ fontSize: 14.5, fontWeight: 700, color: fg.primary }}
                  >
                    {PROVIDER.name}
                  </Typography>
                  <ShieldCheckmark24Regular
                    style={{ fontSize: 15, color: main.primary }}
                  />
                </Stack>
                <Stack direction="row" alignItems="center" gap={0.4}>
                  {[...Array(5)].map((_, i) => (
                    <Star24Filled
                      key={i}
                      style={{ fontSize: 12, color: "#f5a623" }}
                    />
                  ))}
                  <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                    (167)
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" gap={1}>
                <IconCircle
                  icon={Chat24Regular}
                  onClick={() => setShowMessage(true)}
                  main={main}
                  border={border}
                />
                <IconCircle
                  icon={Call24Regular}
                  onClick={() => setShowCall(true)}
                  main={main}
                  border={border}
                />
              </Stack>
            </Stack>
          </Box>

          {/* booking details */}
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
              animation: `${fadeUp} 0.35s ease-out 0.1s both`,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 1.8 }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 15,
                  fontWeight: 800,
                  color: fg.primary,
                }}
              >
                Booking details
              </Typography>
              {!cancelled && (
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={0.4}
                  onClick={() => setShowReschedule(!showReschedule)}
                  sx={{ cursor: "pointer" }}
                >
                  <Edit24Regular
                    style={{ fontSize: 14, color: main.primary }}
                  />
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: main.primary,
                    }}
                  >
                    Reschedule
                  </Typography>
                </Stack>
              )}
            </Stack>

            <Stack gap={1.2}>
              <DetailRow
                icon={Location24Regular}
                label="Address"
                value={address}
                fg={fg}
              />
              <DetailRow
                icon={Calendar24Regular}
                label="Date"
                value={rescheduled ? newDate : schedule.date}
                fg={fg}
              />
              <DetailRow
                icon={Clock24Regular}
                label="Time"
                value={rescheduled ? newTime : schedule.time}
                fg={fg}
              />
            </Stack>

            {showReschedule && (
              <Box
                sx={{
                  mt: 2,
                  p: 1.6,
                  backgroundColor: bg.secondary,
                  borderRadius: radiusTokens.sm ?? 8,
                  animation: `${fadeUp} 0.25s ease-out both`,
                }}
              >
                <Stack direction={{ xs: "column", sm: "row" }} gap={1.2}>
                  <Field
                    label="New date"
                    value={newDate}
                    onChange={setNewDate}
                    border={border}
                    fg={fg}
                  />
                  <Field
                    label="New time"
                    value={newTime}
                    onChange={setNewTime}
                    border={border}
                    fg={fg}
                  />
                </Stack>
                <Stack direction="row" gap={1} sx={{ mt: 1.4 }}>
                  <Box
                    onClick={confirmReschedule}
                    sx={{
                      backgroundColor: main.primary,
                      color: "#fff",
                      borderRadius: radiusTokens.sm ?? 8,
                      px: 2.2,
                      py: 0.9,
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Confirm new time
                  </Box>
                  <Box
                    onClick={() => setShowReschedule(false)}
                    sx={{
                      border: `1px solid ${border.primary}`,
                      color: fg.secondary,
                      borderRadius: radiusTokens.sm ?? 8,
                      px: 2.2,
                      py: 0.9,
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </Box>
                </Stack>
              </Box>
            )}
          </Box>

          {/* help */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            onClick={() => setShowHelp(true)}
            sx={{
              border: `1px dashed ${main.primary}`,
              borderRadius: radiusTokens.md,
              px: 2,
              py: 1.6,
              cursor: "pointer",
              animation: `${fadeUp} 0.35s ease-out 0.15s both`,
            }}
          >
            <Stack direction="row" alignItems="center" gap={1.1}>
              <Warning24Regular style={{ fontSize: 18, color: fg.secondary }} />
              <Typography sx={{ fontSize: 13, color: fg.secondary }}>
                Problem with this order?
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={0.4}>
              <QuestionCircle24Regular
                style={{ fontSize: 15, color: main.primary }}
              />
              <Typography
                sx={{ fontSize: 12.5, fontWeight: 700, color: main.primary }}
              >
                Get help
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* ---------------- RIGHT ---------------- */}
        <Stack gap={spacingTokens.md}>
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
              animation: `${fadeUp} 0.35s ease-out 0.05s both`,
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
              Order summary
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
              sx={{
                pt: 1.6,
                borderTop: `1px solid ${border.primary}`,
                mb: 1.8,
              }}
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

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              onClick={downloadReceipt}
              sx={{
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.sm ?? 8,
                px: 1.6,
                py: 1.1,
                cursor: "pointer",
                "&:hover": { borderColor: main.primary },
              }}
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <Receipt24Regular
                  style={{ fontSize: 17, color: main.primary }}
                />
                <Typography
                  sx={{ fontSize: 13, fontWeight: 600, color: fg.primary }}
                >
                  Download receipt
                </Typography>
              </Stack>
              <ArrowRight24Regular
                style={{ fontSize: 15, color: fg.tertiary }}
              />
            </Stack>
          </Box>

          {!cancelled && stageIndex < 3 && (
            <Box
              onClick={() => setShowCancel(true)}
              sx={{
                textAlign: "center",
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.md,
                py: 1.3,
                fontSize: 13,
                fontWeight: 700,
                color: "#c0392b",
                cursor: "pointer",
              }}
            >
              Cancel this booking
            </Box>
          )}

          {stageIndex >= 1 && !cancelled && (
            <Box
              onClick={() =>
                navigate("/review", {
                  state: { orderId, provider: PROVIDER, items },
                })
              }
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
              }}
            >
              <CheckmarkCircle24Filled style={{ fontSize: 17 }} />
              Mark as complete
            </Box>
          )}

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
              Payment held securely until the job is marked complete
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {/* ---------------- MODAL: cancel ---------------- */}
      {showCancel && (
        <Overlay onClose={() => setShowCancel(false)}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 16,
              fontWeight: 800,
              color: fg.primary,
              mb: 1,
            }}
          >
            Cancel this booking?
          </Typography>
          <Typography
            sx={{ fontSize: 13, color: fg.secondary, lineHeight: 1.6, mb: 2.5 }}
          >
            You're within the free-cancellation window, so you'll get a full
            refund to your original payment method within 3–5 business days.
          </Typography>
          <Stack direction="row" gap={1}>
            <Box
              onClick={confirmCancel}
              sx={{
                flex: 1,
                textAlign: "center",
                backgroundColor: "#c0392b",
                color: "#fff",
                borderRadius: radiusTokens.sm ?? 8,
                py: 1.1,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Yes, cancel
            </Box>
            <Box
              onClick={() => setShowCancel(false)}
              sx={{
                flex: 1,
                textAlign: "center",
                border: `1px solid ${border.primary}`,
                color: fg.primary,
                borderRadius: radiusTokens.sm ?? 8,
                py: 1.1,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Keep booking
            </Box>
          </Stack>
        </Overlay>
      )}

      {/* ---------------- MODAL: message provider ---------------- */}
      {showMessage && (
        <Overlay onClose={() => setShowMessage(false)} wide>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Stack direction="row" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundColor: main.primary,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                {PROVIDER.name.charAt(0)}
              </Box>
              <Stack>
                <Typography
                  sx={{ fontSize: 14, fontWeight: 700, color: fg.primary }}
                >
                  {PROVIDER.name}
                </Typography>
                <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
                  Usually replies within an hour
                </Typography>
              </Stack>
            </Stack>
            <Dismiss24Regular
              onClick={() => setShowMessage(false)}
              style={{ fontSize: 18, color: fg.tertiary, cursor: "pointer" }}
            />
          </Stack>

          <Stack
            gap={1.2}
            sx={{ maxHeight: 260, overflowY: "auto", mb: 1.8, pr: 0.5 }}
          >
            {thread.map((m, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: m.from === "me" ? "flex-end" : "flex-start",
                  maxWidth: "78%",
                  backgroundColor:
                    m.from === "me" ? main.primary : bg.secondary,
                  color: m.from === "me" ? "#fff" : fg.primary,
                  borderRadius: radiusTokens.sm ?? 10,
                  px: 1.4,
                  py: 1,
                  ml: m.from === "me" ? "auto" : 0,
                }}
              >
                <Typography sx={{ fontSize: 13, lineHeight: 1.4 }}>
                  {m.text}
                </Typography>
                <Typography sx={{ fontSize: 10, opacity: 0.7, mt: 0.4 }}>
                  {m.time}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Stack direction="row" gap={1} alignItems="center">
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
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                sx={{ fontSize: 13, width: "100%", color: fg.primary }}
              />
            </Box>
            <Box
              onClick={sendMessage}
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
              <Send24Filled style={{ fontSize: 16 }} />
            </Box>
          </Stack>
        </Overlay>
      )}

      {/* ---------------- MODAL: call provider ---------------- */}
      {showCall && (
        <Overlay onClose={() => setShowCall(false)}>
          <Stack alignItems="center" textAlign="center" gap={1.2}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                backgroundColor: `${main.primary}14`,
                color: main.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Call24Regular style={{ fontSize: 26 }} />
            </Box>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 15.5,
                fontWeight: 800,
                color: fg.primary,
              }}
            >
              Call {PROVIDER.name}
            </Typography>
            <Typography sx={{ fontSize: 13, color: fg.secondary }}>
              {PROVIDER.phone}
            </Typography>

            <Stack direction="row" gap={1} sx={{ mt: 1.4, width: "100%" }}>
              <Box
                component="a"
                href={`tel:${PROVIDER.phone.replace(/\s/g, "")}`}
                sx={{
                  flex: 1,
                  textAlign: "center",
                  backgroundColor: main.primary,
                  color: "#fff",
                  borderRadius: radiusTokens.sm ?? 8,
                  py: 1.1,
                  fontSize: 13,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Call now
              </Box>
              <Box
                onClick={copyNumber}
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.6,
                  border: `1px solid ${border.primary}`,
                  color: fg.primary,
                  borderRadius: radiusTokens.sm ?? 8,
                  py: 1.1,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                <Copy24Regular style={{ fontSize: 15 }} />
                {copied ? "Copied!" : "Copy number"}
              </Box>
            </Stack>
          </Stack>
        </Overlay>
      )}

      {/* ---------------- MODAL: get help ---------------- */}
      {showHelp && (
        <Overlay onClose={() => setShowHelp(false)}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 16,
              fontWeight: 800,
              color: fg.primary,
              mb: 1.8,
            }}
          >
            How can we help?
          </Typography>
          <Stack gap={1}>
            <HelpOption
              icon={Warning24Regular}
              label="Report an issue with this order"
              onClick={() => {
                setShowHelp(false);
                navigate("/support/report", { state: { orderId } });
              }}
              border={border}
              fg={fg}
              main={main}
            />
            <HelpOption
              icon={ChatBubblesQuestion24Regular}
              label="Chat with TETYHUB support"
              onClick={() => {
                setShowHelp(false);
                navigate("/support/chat", { state: { orderId } });
              }}
              border={border}
              fg={fg}
              main={main}
            />
            <HelpOption
              icon={DocumentQuestionMark24Regular}
              label="Browse FAQs"
              onClick={() => {
                setShowHelp(false);
                navigate("/faq");
              }}
              border={border}
              fg={fg}
              main={main}
            />
          </Stack>
        </Overlay>
      )}

      {/* ---------------- TOAST ---------------- */}
      {toast && (
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            zIndex: 60,
            backgroundColor: fg.primary,
            color: bg.primary,
            borderRadius: radiusTokens.sm ?? 8,
            px: 2.2,
            py: 1.2,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
            animation: `${slideUp} 0.25s ease-out both`,
          }}
        >
          {toast}
        </Box>
      )}
    </Box>
  );
}

function Overlay({ children, onClose, wide }) {
  return (
    <Box
      onClick={onClose}
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        px: spacingTokens.md,
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{
          backgroundColor: "#fff",
          borderRadius: radiusTokens.md,
          p: spacingTokens.lg,
          maxWidth: wide ? 440 : 380,
          width: "100%",
          animation: `${fadeUp} 0.25s ease-out both`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function HelpOption({ icon: Icon, label, onClick, border, fg, main }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      onClick={onClick}
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.sm ?? 8,
        px: 1.6,
        py: 1.2,
        cursor: "pointer",
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

function StatusPill({ label, tone, main, fg }) {
  const isError = tone === "error";
  return (
    <Box
      sx={{
        fontSize: 11.5,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        color: isError ? "#c0392b" : main.primary,
        backgroundColor: isError ? "#fbe9e9" : `${main.primary}14`,
        border: `1px solid ${isError ? "#f2c6c6" : `${main.primary}33`}`,
        borderRadius: radiusTokens.full ?? 999,
        px: 1.3,
        py: 0.4,
      }}
    >
      {label}
    </Box>
  );
}

function IconCircle({ icon: Icon, onClick, main, border }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        border: `1px solid ${border.primary}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "border-color 0.15s ease",
        "&:hover": { borderColor: main.primary },
      }}
    >
      <Icon style={{ fontSize: 16, color: main.primary }} />
    </Box>
  );
}

function DetailRow({ icon: Icon, label, value, fg }) {
  return (
    <Stack direction="row" alignItems="flex-start" gap={1.1}>
      <Icon
        style={{
          fontSize: 16,
          color: fg.tertiary,
          marginTop: 1,
          flexShrink: 0,
        }}
      />
      <Stack>
        <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: fg.primary }}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );
}

function Field({ label, value, onChange, border, fg }) {
  return (
    <Stack sx={{ flex: 1, minWidth: 0 }} gap={0.5}>
      <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: fg.secondary }}>
        {label}
      </Typography>
      <Box
        sx={{
          border: `1px solid ${border.primary}`,
          borderRadius: radiusTokens.sm ?? 8,
          px: 1.3,
          py: 0.9,
          backgroundColor: "#fff",
        }}
      >
        <InputBase
          value={value}
          onChange={(e) => onChange(e.target.value)}
          sx={{ fontSize: 12.5, width: "100%", color: fg.primary }}
        />
      </Box>
    </Stack>
  );
}
