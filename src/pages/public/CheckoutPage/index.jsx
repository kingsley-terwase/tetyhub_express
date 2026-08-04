// @ts-nocheck
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import {
  LockClosed24Regular,
  ShieldCheckmark24Regular,
  ArrowLeft24Regular,
  Tag24Regular,
  CheckmarkCircle24Filled,
  Person24Regular,
  Mail24Regular,
  Call24Regular,
  Location24Regular,
  Calendar24Regular,
  Clock24Regular,
  Info24Regular,
  Edit24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pop = keyframes`
  0% { transform: scale(0.9); opacity: 0.4; }
  100% { transform: scale(1); opacity: 1; }
`;

// ---- Mock data carried over from the cart — replace with real cart context ----
const CART_ITEMS = [
  {
    id: "c1",
    sellerName: "SparkleCo",
    title: "Deep home window cleaning (up to 3 rooms)",
    variant: "Standard package · 1 visit",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80",
    price: 12000,
    qty: 1,
  },
  {
    id: "c2",
    sellerName: "SparkleCo",
    title: "Add-on: Oven deep clean",
    variant: "One-time add-on",
    image:
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=200&q=80",
    price: 4500,
    qty: 1,
  },
  {
    id: "c3",
    sellerName: "Studio Nine",
    title: "Logo & brand identity design",
    variant: "3 concepts · unlimited revisions",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=200&q=80",
    price: 45000,
    qty: 1,
  },
];

const PAYMENT_METHODS = [
  {
    key: "card",
    label: "Debit / Credit Card",
    hint: "Visa, Mastercard, Verve",
  },
  {
    key: "transfer",
    label: "Bank Transfer",
    hint: "Instant, via your bank app",
  },
  { key: "ussd", label: "USSD", hint: "Dial code from any phone" },
  {
    key: "on_completion",
    label: "Pay on completion",
    hint: "Available for select providers",
  },
];

const money = (n) => `₦${n.toLocaleString("en-NG")}`;

export default function CheckoutPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();

  // ---- contact + address ----
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });
  const [contactSaved, setContactSaved] = useState(false);
  const [editingContact, setEditingContact] = useState(true);

  // ---- schedule ----
  const [schedule, setSchedule] = useState({ date: "", time: "", notes: "" });
  const [scheduleSaved, setScheduleSaved] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(false);

  // ---- payment ----
  const [payment, setPayment] = useState("card");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });

  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState({ code: "WELCOME10", rate: 0.1 });
  const [agreed, setAgreed] = useState(false);
  const [placing, setPlacing] = useState(false);

  const subtotal = useMemo(
    () => CART_ITEMS.reduce((sum, it) => sum + it.price * it.qty, 0),
    [],
  );
  const discount = promo ? Math.round(subtotal * promo.rate) : 0;
  const serviceFee = Math.round((subtotal - discount) * 0.015);
  const total = subtotal - discount + serviceFee;
  const itemCount = CART_ITEMS.reduce((n, it) => n + it.qty, 0);

  const contactComplete =
    contact.name.trim() && contact.phone.trim() && contact.address.trim();
  const scheduleComplete = schedule.date && schedule.time;

  const saveContact = () => {
    if (!contactComplete) return;
    setContactSaved(true);
    setEditingContact(false);
    if (!scheduleSaved) setEditingSchedule(true);
  };

  const saveSchedule = () => {
    if (!scheduleComplete) return;
    setScheduleSaved(true);
    setEditingSchedule(false);
  };

  const canPlaceOrder =
    contactComplete && scheduleComplete && agreed && !placing;

  const handlePlaceOrder = () => {
    if (!canPlaceOrder) return;
    setPlacing(true);
    // Wire this up to your real order/payment API.
    setTimeout(() => {
      navigate("/order-confirmed", {
        state: {
          orderId: `TH-${Math.floor(100000 + Math.random() * 900000)}`,
          total,
          items: CART_ITEMS,
          contact,
          schedule,
        },
      });
    }, 900);
  };

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "7.2fr 4.8fr",
          },
          gap: {
            xs: 2,
            sm: 3,
            md: 4,
          },
          px: {
            xs: 2,
            sm: 3,
            md: spacingTokens.xl,
          },
          pb: {
            xs: 4,
            md: 8,
          },
          maxWidth: 1200,
          mx: "auto",
          alignItems: "start",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: { xs: 24, md: 30 },
            color: fg.primary,
          }}
        >
          Checkout
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7.2fr 4.8fr" },
          gap: spacingTokens.xl,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: { xs: 6, md: 8 },
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* ---------------- LEFT: steps ---------------- */}
        <Stack gap={spacingTokens.md} sx={{ minWidth: 0 }}>
          {/* STEP 1 — contact + address */}
          <StepShell
            number={1}
            title="Contact & delivery address"
            complete={contactSaved}
            editing={editingContact}
            onChangeClick={() => setEditingContact(true)}
            border={border}
            fg={fg}
            main={main}
          >
            {!editingContact && contactSaved ? (
              <Stack gap={0.3} sx={{ pl: 4.4 }}>
                <Typography
                  sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
                >
                  {contact.name}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                  {contact.address}
                  {contact.city ? `, ${contact.city}` : ""}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                  {contact.phone}
                  {contact.email ? ` · ${contact.email}` : ""}
                </Typography>
              </Stack>
            ) : (
              <Box sx={{}}>
                <Stack direction={{ xs: "column", sm: "row" }} gap={1.4}>
                  <Field
                    label="Full name"
                    value={contact.name}
                    onChange={(v) => setContact({ ...contact, name: v })}
                    placeholder="Ada Okafor"
                    icon={Person24Regular}
                    {...{ border, fg }}
                  />
                </Stack>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  gap={1.4}
                  sx={{ mt: 1.4 }}
                >
                  <Field
                    label="Email address"
                    value={contact.email}
                    onChange={(v) => setContact({ ...contact, email: v })}
                    placeholder="ada@email.com"
                    icon={Mail24Regular}
                    {...{ border, fg }}
                  />
                  <Field
                    label="Phone number"
                    value={contact.phone}
                    onChange={(v) => setContact({ ...contact, phone: v })}
                    placeholder="080X XXX XXXX"
                    icon={Call24Regular}
                    {...{ border, fg }}
                  />
                </Stack>
                <Box sx={{ mt: 1.4 }}>
                  <Field
                    label="Address"
                    value={contact.address}
                    onChange={(v) => setContact({ ...contact, address: v })}
                    placeholder="12 Admiralty Way, Lekki Phase 1"
                    icon={Location24Regular}
                    full
                    {...{ border, fg }}
                  />
                </Box>
                <Box sx={{ mt: 1.4 }}>
                  <Field
                    label="City / area"
                    value={contact.city}
                    onChange={(v) => setContact({ ...contact, city: v })}
                    placeholder="Lagos, Yaba"
                    {...{ border, fg }}
                  />
                </Box>
                <Box
                  onClick={saveContact}
                  sx={{
                    display: "inline-block",
                    mt: 1.8,
                    backgroundColor: contactComplete
                      ? main.primary
                      : border.primary,
                    color: "#fff",
                    borderRadius: radiusTokens.sm ?? 8,
                    px: 2.4,
                    py: 1,
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    cursor: contactComplete ? "pointer" : "not-allowed",
                  }}
                >
                  Save & continue
                </Box>
              </Box>
            )}
          </StepShell>

          {/* STEP 2 — schedule */}
          <StepShell
            number={2}
            title="Booking schedule"
            complete={scheduleSaved}
            editing={editingSchedule}
            onChangeClick={() => setEditingSchedule(true)}
            disabled={!contactSaved}
            border={border}
            fg={fg}
            main={main}
          >
            {!editingSchedule && scheduleSaved ? (
              <Stack gap={0.3} sx={{ pl: 4.4 }}>
                <Typography
                  sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
                >
                  {schedule.date} · {schedule.time}
                </Typography>
                {schedule.notes && (
                  <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                    Note: {schedule.notes}
                  </Typography>
                )}
              </Stack>
            ) : contactSaved ? (
              <Box sx={{ pl: 4.4 }}>
                <Stack direction={{ xs: "column", sm: "row" }} gap={1.4}>
                  <Field
                    label="Preferred date"
                    value={schedule.date}
                    onChange={(v) => setSchedule({ ...schedule, date: v })}
                    placeholder="e.g. 4 Aug 2026"
                    icon={Calendar24Regular}
                    {...{ border, fg }}
                  />
                  <Field
                    label="Preferred time"
                    value={schedule.time}
                    onChange={(v) => setSchedule({ ...schedule, time: v })}
                    placeholder="e.g. 10:00 AM"
                    icon={Clock24Regular}
                    {...{ border, fg }}
                  />
                </Stack>
                <Box sx={{ mt: 1.4 }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: fg.secondary,
                      mb: 0.6,
                    }}
                  >
                    Notes for the provider (optional)
                  </Typography>
                  <Box
                    sx={{
                      border: `1px solid ${border.primary}`,
                      borderRadius: radiusTokens.sm ?? 8,
                      px: 1.4,
                      py: 1,
                    }}
                  >
                    <InputBase
                      value={schedule.notes}
                      onChange={(e) =>
                        setSchedule({ ...schedule, notes: e.target.value })
                      }
                      placeholder="Gate code, parking instructions, or anything they should know..."
                      multiline
                      minRows={2}
                      sx={{ fontSize: 13, width: "100%", color: fg.primary }}
                    />
                  </Box>
                </Box>
                <Box
                  onClick={saveSchedule}
                  sx={{
                    display: "inline-block",
                    mt: 1.8,
                    backgroundColor: scheduleComplete
                      ? main.primary
                      : border.primary,
                    color: "#fff",
                    borderRadius: radiusTokens.sm ?? 8,
                    px: 2.4,
                    py: 1,
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "Poppins",
                    cursor: scheduleComplete ? "pointer" : "not-allowed",
                  }}
                >
                  Save & continue
                </Box>
              </Box>
            ) : (
              <Typography sx={{ fontSize: 12.5, color: fg.tertiary, pl: 4.4 }}>
                Add your delivery address first.
              </Typography>
            )}
          </StepShell>

          {/* STEP 3 — payment */}
          <StepShell
            number={3}
            title="Payment method"
            complete={false}
            editing
            hideChange
            disabled={!scheduleSaved}
            border={border}
            fg={fg}
            main={main}
          >
            {scheduleSaved ? (
              <Box sx={{ pl: 4.4 }}>
                <Stack gap={1}>
                  {PAYMENT_METHODS.map((m) => (
                    <Box
                      key={m.key}
                      onClick={() => setPayment(m.key)}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.2,
                        border: `1px solid ${payment === m.key ? main.primary : border.primary}`,
                        backgroundColor:
                          payment === m.key
                            ? `${main.primary}0a`
                            : "transparent",
                        borderRadius: radiusTokens.sm ?? 8,
                        px: 1.6,
                        py: 1.2,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <Box
                        sx={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          border: `2px solid ${payment === m.key ? main.primary : border.primary}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {payment === m.key && (
                          <Box
                            sx={{
                              width: 9,
                              height: 9,
                              borderRadius: "50%",
                              backgroundColor: main.primary,
                            }}
                          />
                        )}
                      </Box>
                      <Stack sx={{ flexGrow: 1 }}>
                        <Typography
                          sx={{
                            fontSize: 13.5,
                            fontWeight: 700,
                            color: fg.primary,
                          }}
                        >
                          {m.label}
                        </Typography>
                        <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                          {m.hint}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>

                {payment === "card" && (
                  <Box
                    sx={{ mt: 1.6, animation: `${fadeUp} 0.3s ease-out both` }}
                  >
                    <Field
                      label="Card number"
                      value={card.number}
                      onChange={(v) => setCard({ ...card, number: v })}
                      placeholder="1234 5678 9012 3456"
                      full
                      {...{ border, fg }}
                    />
                    <Stack direction="row" gap={1.4} sx={{ mt: 1.4 }}>
                      <Field
                        label="Expiry"
                        value={card.expiry}
                        onChange={(v) => setCard({ ...card, expiry: v })}
                        placeholder="MM/YY"
                        {...{ border, fg }}
                      />
                      <Field
                        label="CVV"
                        value={card.cvv}
                        onChange={(v) => setCard({ ...card, cvv: v })}
                        placeholder="123"
                        {...{ border, fg }}
                      />
                    </Stack>
                  </Box>
                )}

                {payment === "transfer" && (
                  <InlineNote bg={bg} fg={fg}>
                    A one-time account number will be generated after you place
                    the order — transfer the exact total and your booking
                    confirms automatically.
                  </InlineNote>
                )}
                {payment === "ussd" && (
                  <InlineNote bg={bg} fg={fg}>
                    You'll get a USSD code to dial from your registered bank
                    phone number after placing the order.
                  </InlineNote>
                )}
                {payment === "on_completion" && (
                  <InlineNote bg={bg} fg={fg}>
                    Pay the provider directly once the job is done. Only
                    available for providers who've opted in.
                  </InlineNote>
                )}
              </Box>
            ) : (
              <Typography sx={{ fontSize: 12.5, color: fg.tertiary, pl: 4.4 }}>
                Finish the previous steps to choose a payment method.
              </Typography>
            )}
          </StepShell>
        </Stack>

        {/* ---------------- RIGHT: order summary ---------------- */}
        <Box
          sx={{
            order: {
              xs: 1,
              lg: 2,
            },
            position: {
              xs: "static",
              lg: "sticky",
            },
            top: spacingTokens.lg,
            alignSelf: "flex-start",
          }}
        >
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
              mb: spacingTokens.md,
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
                  fontSize: 15.5,
                  fontWeight: 800,
                  color: fg.primary,
                }}
              >
                Order summary
              </Typography>
              <Typography
                onClick={() => navigate("/cart")}
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: main.primary,
                  cursor: "pointer",
                }}
              >
                Edit cart
              </Typography>
            </Stack>

            <Stack gap={1.2} sx={{ mb: 2 }}>
              {CART_ITEMS.map((it) => (
                <Stack
                  key={it.id}
                  direction="row"
                  gap={1.2}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: radiusTokens.sm ?? 6,
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src={it.image}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: fg.primary,
                        lineHeight: 1.3,
                      }}
                      noWrap
                    >
                      {it.title}
                    </Typography>
                    <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
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

            {promo ? (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  backgroundColor: `${main.primary}0f`,
                  border: `1px solid ${main.primary}33`,
                  borderRadius: radiusTokens.sm ?? 8,
                  px: 1.4,
                  py: 0.9,
                  mb: 1.6,
                  animation: `${pop} 0.25s ease-out both`,
                }}
              >
                <Stack direction="row" alignItems="center" gap={0.6}>
                  <CheckmarkCircle24Filled
                    style={{ fontSize: 15, color: main.primary }}
                  />
                  <Typography
                    sx={{ fontSize: 12, color: fg.primary, fontWeight: 600 }}
                  >
                    "{promo.code}" applied
                  </Typography>
                </Stack>
                <Typography
                  onClick={() => setPromo(null)}
                  sx={{ fontSize: 11.5, color: fg.tertiary, cursor: "pointer" }}
                >
                  Remove
                </Typography>
              </Stack>
            ) : (
              <Stack
                direction="row"
                alignItems="center"
                gap={1}
                sx={{
                  border: `1px solid ${border.primary}`,
                  borderRadius: radiusTokens.sm ?? 8,
                  px: 1.4,
                  py: 0.9,
                  mb: 1.6,
                }}
              >
                <Tag24Regular style={{ fontSize: 16, color: fg.secondary }} />
                <InputBase
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="Promo code"
                  sx={{ fontSize: 12.5, flexGrow: 1, color: fg.primary }}
                />
                <Typography
                  onClick={() => {
                    if (promoInput.trim().toUpperCase() === "WELCOME10") {
                      setPromo({ code: "WELCOME10", rate: 0.1 });
                      setPromoInput("");
                    }
                  }}
                  sx={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: main.primary,
                    cursor: "pointer",
                  }}
                >
                  Apply
                </Typography>
              </Stack>
            )}

            <Stack gap={1.1} sx={{ mb: 1.6 }}>
              <Row
                label={`Subtotal (${itemCount} item${itemCount === 1 ? "" : "s"})`}
                value={money(subtotal)}
                fg={fg}
              />
              {discount > 0 && (
                <Row
                  label="Discount"
                  value={`− ${money(discount)}`}
                  fg={fg}
                  accent={main.primary}
                />
              )}
              <Row
                label={
                  <Stack direction="row" alignItems="center" gap={0.4}>
                    Service fee{" "}
                    <Info24Regular
                      style={{ fontSize: 13, color: fg.tertiary }}
                    />
                  </Stack>
                }
                value={money(serviceFee)}
                fg={fg}
              />
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ pt: 1.6, borderTop: `1px solid ${border.primary}`, mb: 2 }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 15,
                  fontWeight: 800,
                  color: fg.primary,
                }}
              >
                Total due
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 19,
                  fontWeight: 800,
                  color: fg.primary,
                }}
              >
                {money(total)}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              alignItems="flex-start"
              gap={1}
              onClick={() => setAgreed(!agreed)}
              sx={{ mb: 1.8, cursor: "pointer" }}
            >
              <Box
                sx={{
                  width: 17,
                  height: 17,
                  borderRadius: 4,
                  border: `1.5px solid ${agreed ? main.primary : border.primary}`,
                  backgroundColor: agreed ? main.primary : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  mt: "1px",
                }}
              >
                {agreed && (
                  <Typography
                    sx={{ fontSize: 11, color: "#fff", lineHeight: 1 }}
                  >
                    ✓
                  </Typography>
                )}
              </Box>
              <Typography
                sx={{ fontSize: 12, color: fg.secondary, lineHeight: 1.5 }}
              >
                I agree to TETYHUB's Terms of Service and cancellation policy
                for this booking.
              </Typography>
            </Stack>

            <Box
              onClick={handlePlaceOrder}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.9,
                backgroundColor: canPlaceOrder ? main.primary : border.primary,
                color: "#fff",
                borderRadius: radiusTokens.md,
                py: 1.4,
                cursor: canPlaceOrder ? "pointer" : "not-allowed",
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: 14.5,
                opacity: placing ? 0.75 : 1,
                transition: "transform 0.15s ease, opacity 0.15s ease",
                "&:hover": canPlaceOrder
                  ? { transform: "translateY(-1px)" }
                  : undefined,
              }}
            >
              <LockClosed24Regular style={{ fontSize: 17 }} />
              {placing ? "Placing order..." : `Confirm order · ${money(total)}`}
            </Box>

            <Typography
              sx={{
                fontSize: 11.5,
                color: fg.tertiary,
                textAlign: "center",
                mt: 1.4,
              }}
            >
              {canPlaceOrder
                ? "Free cancellation up to 48 hours before your booking."
                : "Complete the steps above to proceed."}
            </Typography>
          </Box>

          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
            }}
          >
            <Stack gap={1.1}>
              {[
                [ShieldCheckmark24Regular, "Buyer protection on every order"],
                [LockClosed24Regular, "Encrypted, PCI-compliant checkout"],
              ].map(([Icon, label]) => (
                <Stack key={label} direction="row" gap={1} alignItems="center">
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor: `${main.primary}16`,
                      color: main.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon style={{ fontSize: 14 }} />
                  </Box>
                  <Typography sx={{ fontSize: 12, color: fg.secondary }}>
                    {label}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Jumia-style numbered step: green check when complete, "Change" to re-open the form.
function StepShell({
  number,
  title,
  complete,
  editing,
  onChangeClick,
  hideChange,
  disabled,
  children,
  border,
  fg,
  main,
}) {
  return (
    <Box
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        p: spacingTokens.md,
        opacity: disabled ? 0.55 : 1,
        animation: `${fadeUp} 0.3s ease-out both`,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: editing || !complete ? 1.8 : 0.6 }}
      >
        <Stack direction="row" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              backgroundColor: complete ? main.primary : "transparent",
              color: complete ? "#fff" : fg.tertiary,
              border: `1.5px solid ${complete ? main.primary : border.primary}`,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {complete && !editing ? "✓" : number}
          </Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 14,
              fontWeight: 700,
              color: fg.primary,
            }}
          >
            {title.toUpperCase()}
          </Typography>
        </Stack>
        {complete && !editing && !hideChange && (
          <Stack
            direction="row"
            alignItems="center"
            gap={0.4}
            onClick={onChangeClick}
            sx={{ cursor: "pointer" }}
          >
            <Edit24Regular style={{ fontSize: 14, color: main.primary }} />
            <Typography
              sx={{ fontSize: 12.5, fontWeight: 700, color: main.primary }}
            >
              Change
            </Typography>
          </Stack>
        )}
      </Stack>
      {children}
    </Box>
  );
}

function InlineNote({ children, bg, fg }) {
  return (
    <Box
      sx={{
        mt: 1.6,
        backgroundColor: bg.secondary,
        borderRadius: radiusTokens.sm ?? 8,
        p: 1.6,
        animation: `${fadeUp} 0.3s ease-out both`,
      }}
    >
      <Typography sx={{ fontSize: 12.5, color: fg.secondary, lineHeight: 1.6 }}>
        {children}
      </Typography>
    </Box>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  full,
  border,
  fg,
}) {
  return (
    <Stack sx={{ flex: full ? "1 1 100%" : 1, minWidth: 0 }} gap={0.6}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: fg.secondary }}>
        {label}
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        gap={0.9}
        sx={{
          border: `1px solid ${border.primary}`,
          borderRadius: radiusTokens.sm ?? 8,
          px: 1.4,
          py: 1,
        }}
      >
        {Icon && (
          <Icon style={{ fontSize: 15, color: fg.tertiary, flexShrink: 0 }} />
        )}
        <InputBase
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          sx={{ fontSize: 13, flexGrow: 1, color: fg.primary }}
        />
      </Stack>
    </Stack>
  );
}

function Row({ label, value, fg, accent }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography sx={{ fontSize: 13, color: fg.secondary }}>
        {label}
      </Typography>
      <Typography
        sx={{ fontSize: 13, fontWeight: 700, color: accent ?? fg.primary }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
