// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography, InputBase, CircularProgress } from "@mui/material";
import {
  Delete24Regular,
  Heart24Regular,
  LockClosed24Regular,
  ShieldCheckmark24Regular,
  ArrowRight24Regular,
  Tag24Regular,
  CheckmarkCircle24Filled,
  ShoppingBag24Regular,
  Info24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useCart } from "@/Hooks/cart";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pop = keyframes`
  0% { transform: scale(0.9); opacity: 0.4; }
  100% { transform: scale(1); opacity: 1; }
`;

// Client-side only — there's no promo-code endpoint in useCart, so this just
// discounts the locally-known subtotal. Wire this to a real endpoint if/when
// one exists.
const PROMO_CODES = {
  WELCOME10: 0.1,
  TETY5: 0.05,
};

const money = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

// ---------------------------------------------------------------------------
// Normalization layer
//
// The shape of `result` returned by /cart/preview-checkout (and by
// add/update/remove) isn't fixed in the hook, so this maps a handful of
// likely field names onto what the UI needs. Trim/extend the `??` chains
// below to match your actual API contract once you can see a real payload.
// ---------------------------------------------------------------------------
function normalizeItem(raw) {
  return {
    id: raw.id ?? raw.cart_item_id ?? raw._id,
    productId: raw.product_id ?? raw.productId,
    variantId: raw.variant_id ?? raw.variantId ?? null,
    sellerId: raw.seller_id ?? raw.seller?.id ?? raw.vendor?.id ?? raw.vendor_id ?? "unknown",
    sellerName: raw.seller_name ?? raw.seller?.name ?? raw.vendor?.name ?? "Seller",
    sellerVerified:
      raw.seller_verified ?? raw.seller?.verified ?? raw.vendor?.verified ?? false,
    title: raw.title ?? raw.name ?? raw.product_name ?? "Item",
    variant: raw.variant_label ?? raw.variant_name ?? raw.option_label ?? "",
    image: raw.image ?? raw.thumbnail ?? raw.photo ?? "",
    price: Number(raw.price ?? raw.unit_price ?? raw.sale_price ?? 0),
    originalPrice: raw.original_price ?? raw.compare_at_price ?? null,
    qty: Number(raw.quantity ?? raw.qty ?? 1),
    stock: Number(raw.stock ?? raw.available_stock ?? raw.max_quantity ?? 99),
  };
}

function normalizeCart(cart) {
  if (!cart) {
    return { items: [], subtotal: 0, discount: 0, serviceFee: 0, total: 0 };
  }
  const rawItems = cart.items ?? cart.cart_items ?? cart.products ?? [];
  const items = rawItems.map(normalizeItem);
  const subtotal = cart.subtotal ?? items.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = cart.discount ?? 0;
  const serviceFee =
    cart.service_fee ?? cart.serviceFee ?? Math.round((subtotal - discount) * 0.015);
  const total = cart.total ?? subtotal - discount + serviceFee;
  return { items, subtotal, discount, serviceFee, total };
}

export default function CartPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();

  const {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    fetchCheckoutPreview,
  } = useCart();

  // "Saved for later" has no backing endpoint in useCart, so it's kept as
  // client-only state: saving an item removes it from the *server* cart
  // (via removeFromCart) and holds it in memory here; moving it back calls
  // addToCart again. It won't survive a refresh — swap in a real
  // save-for-later endpoint if one gets added later.
  const [saved, setSaved] = useState([]);
  const [pendingId, setPendingId] = useState(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState(null); // { code, rate }
  const [promoError, setPromoError] = useState("");

  useEffect(() => {
    (async () => {
      await fetchCheckoutPreview();
      setHasLoaded(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { items, subtotal, discount: serverDiscount, serviceFee, total: serverTotal } =
    useMemo(() => normalizeCart(cart), [cart]);

  const setQty = async (item, delta) => {
    const newQty = Math.max(1, Math.min(item.stock, item.qty + delta));
    if (newQty === item.qty) return;
    setPendingId(item.id);
    await updateCartItem(item.productId, newQty, item.variantId);
    setPendingId(null);
  };

  const removeItem = async (item) => {
    setPendingId(item.id);
    await removeFromCart(item.id);
    setPendingId(null);
  };

  const moveToSaved = async (item) => {
    setPendingId(item.id);
    const res = await removeFromCart(item.id);
    if (res.success) {
      setSaved((prev) => [...prev, item]);
    }
    setPendingId(null);
  };

  const moveToCart = async (item) => {
    setPendingId(item.id);
    const res = await addToCart(item.productId, 1, item.variantId);
    if (res.success) {
      setSaved((prev) => prev.filter((x) => x.id !== item.id));
    }
    setPendingId(null);
  };

  const removeSaved = (id) => setSaved((prev) => prev.filter((x) => x.id !== id));

  const grouped = useMemo(() => {
    const map = new Map();
    items.forEach((it) => {
      if (!map.has(it.sellerId)) {
        map.set(it.sellerId, {
          sellerId: it.sellerId,
          sellerName: it.sellerName,
          sellerVerified: it.sellerVerified,
          rows: [],
        });
      }
      map.get(it.sellerId).rows.push(it);
    });
    return [...map.values()];
  }, [items]);

  const savingsTotal = useMemo(
    () =>
      items.reduce(
        (sum, it) => sum + (it.originalPrice ? (it.originalPrice - it.price) * it.qty : 0),
        0,
      ),
    [items],
  );

  // Prefer server-computed totals; layer the local promo discount on top
  // since there's no backend promo endpoint yet.
  const promoDiscount = promo ? Math.round(subtotal * promo.rate) : 0;
  const discount = serverDiscount + promoDiscount;
  const total = Math.max(0, serverTotal - promoDiscount);
  const itemCount = items.reduce((n, it) => n + it.qty, 0);

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    if (PROMO_CODES[code]) {
      setPromo({ code, rate: PROMO_CODES[code] });
      setPromoError("");
      setPromoInput("");
    } else {
      setPromo(null);
      setPromoError("That code isn't valid or has expired.");
    }
  };

  const goToCheckout = async () => {
    // Refresh totals right before handing off to the checkout page.
    await fetchCheckoutPreview();
    navigate("/checkout");
  };

  // ---------------- INITIAL LOAD ----------------
  if (loading && !hasLoaded) {
    return (
      <Box
        sx={{
          backgroundColor: bg.primary,
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ color: main.primary }} />
      </Box>
    );
  }

  // ---------------- EMPTY STATE ----------------
  if (items.length === 0) {
    return (
      <Box
        sx={{
          backgroundColor: bg.primary,
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: spacingTokens.md,
        }}
      >
        <Stack alignItems="center" textAlign="center" gap={1.5} sx={{ maxWidth: 380 }}>
          <Box
            sx={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              backgroundColor: `${main.primary}14`,
              color: main.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 1,
            }}
          >
            <ShoppingBag24Regular style={{ fontSize: 36 }} />
          </Box>
          <Typography
            sx={{ fontFamily: "Syne", fontWeight: 700, fontSize: 22, color: fg.primary }}
          >
            Your cart is empty
          </Typography>
          <Typography sx={{ fontSize: 14, color: fg.secondary, lineHeight: 1.6 }}>
            Nothing here yet. Browse verified providers and add a service or
            product to get started.
          </Typography>
          <Box
            onClick={() => navigate("/services")}
            sx={{
              mt: 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 0.8,
              backgroundColor: main.primary,
              color: "#fff",
              borderRadius: radiusTokens.md,
              px: 3,
              py: 1.2,
              cursor: "pointer",
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Browse services
            <ArrowRight24Regular style={{ fontSize: 18 }} />
          </Box>
        </Stack>
      </Box>
    );
  }

  // ---------------- MAIN CART ----------------
  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pt: { xs: 3, md: 4.5 },
          pb: 1,
          maxWidth: 1240,
          mx: "auto",
        }}
      >
        <Stack direction="row" alignItems="baseline" gap={1.2} flexWrap="wrap">
          <Typography
            sx={{
              fontFamily: "Syne",
              fontWeight: 700,
              fontSize: { xs: 24, md: 30 },
              color: fg.primary,
            }}
          >
            cart
          </Typography>
          <Typography sx={{ fontSize: 14, color: fg.secondary }}>
            {itemCount} item{itemCount === 1 ? "" : "s"}
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7.2fr 4.8fr" },
          gap: spacingTokens.xl,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: { xs: 2, md: 3 },
          maxWidth: 1240,
          mx: "auto",
        }}
      >
        {/* ---------------- LEFT: cart items ---------------- */}
        <Box sx={{ minWidth: 0 }}>
          {savingsTotal > 0 && (
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{
                backgroundColor: `${main.primary}0f`,
                border: `1px solid ${main.primary}33`,
                borderRadius: radiusTokens.md,
                px: 2,
                py: 1.2,
                mb: 2.5,
              }}
            >
              <CheckmarkCircle24Filled style={{ fontSize: 18, color: main.primary }} />
              <Typography sx={{ fontSize: 13, color: fg.primary }}>
                You're saving <b>{money(savingsTotal)}</b> on this order.
              </Typography>
            </Stack>
          )}

          {grouped.map((group) => (
            <Box
              key={group.sellerId}
              sx={{
                mb: 3,
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.md,
                overflow: "hidden",
                animation: `${fadeUp} 0.4s ease-out both`,
              }}
            >
              {/* seller header */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  px: 2,
                  py: 1.4,
                  backgroundColor: bg.secondary,
                  borderBottom: `1px solid ${border.primary}`,
                }}
              >
                <Stack direction="row" alignItems="center" gap={0.8}>
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      backgroundColor: main.primary,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      fontFamily: "Poppins",
                    }}
                  >
                    {group.sellerName.charAt(0)}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: fg.primary,
                    }}
                  >
                    {group.sellerName}
                  </Typography>
                  {group.sellerVerified && (
                    <ShieldCheckmark24Regular style={{ fontSize: 15, color: main.primary }} />
                  )}
                </Stack>
                <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
                  {group.rows.length} item{group.rows.length === 1 ? "" : "s"}
                </Typography>
              </Stack>

              {/* item rows */}
              {group.rows.map((it, idx) => {
                const isPending = pendingId === it.id;
                return (
                  <Stack
                    key={it.id}
                    direction={{ xs: "column", sm: "row" }}
                    gap={1.5}
                    sx={{
                      px: 2,
                      py: 2,
                      opacity: isPending ? 0.6 : 1,
                      pointerEvents: isPending ? "none" : "auto",
                      transition: "opacity 0.15s ease",
                      borderBottom:
                        idx < group.rows.length - 1 ? `1px solid ${border.primary}` : "none",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: "100%", sm: 88 },
                        height: { xs: 140, sm: 88 },
                        borderRadius: radiusTokens.sm ?? 8,
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <Box
                        component="img"
                        src={it.image}
                        alt={it.title}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>

                    <Stack sx={{ flexGrow: 1, minWidth: 0 }} gap={0.4}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontSize: 14,
                          fontWeight: 700,
                          color: fg.primary,
                          lineHeight: 1.35,
                        }}
                      >
                        {it.title}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
                        {it.variant}
                      </Typography>

                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        gap={1}
                        sx={{ mt: 1 }}
                      >
                        {/* qty stepper */}
                        <Stack
                          direction="row"
                          alignItems="center"
                          sx={{
                            border: `1px solid ${border.primary}`,
                            borderRadius: radiusTokens.sm ?? 8,
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            onClick={() => setQty(it, -1)}
                            sx={{
                              width: 28,
                              height: 28,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontSize: 16,
                              color: fg.secondary,
                              userSelect: "none",
                            }}
                          >
                            −
                          </Box>
                          <Typography
                            sx={{
                              width: 30,
                              textAlign: "center",
                              fontSize: 13,
                              fontWeight: 700,
                              color: fg.primary,
                            }}
                          >
                            {it.qty}
                          </Typography>
                          <Box
                            onClick={() => setQty(it, 1)}
                            sx={{
                              width: 28,
                              height: 28,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontSize: 16,
                              color: fg.secondary,
                              userSelect: "none",
                            }}
                          >
                            +
                          </Box>
                        </Stack>

                        {/* actions */}
                        <Stack direction="row" alignItems="center" gap={1.5}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            gap={0.4}
                            onClick={() => moveToSaved(it)}
                            sx={{ cursor: "pointer" }}
                          >
                            <Heart24Regular style={{ fontSize: 15, color: fg.tertiary }} />
                            <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
                              Save for later
                            </Typography>
                          </Stack>
                          <Delete24Regular
                            onClick={() => removeItem(it)}
                            style={{ fontSize: 17, color: fg.tertiary, cursor: "pointer" }}
                          />
                        </Stack>

                        {/* price */}
                        <Stack alignItems="flex-end" sx={{ ml: "auto" }}>
                          {it.originalPrice && (
                            <Typography
                              sx={{
                                fontSize: 11.5,
                                color: fg.tertiary,
                                textDecoration: "line-through",
                              }}
                            >
                              {money(it.originalPrice * it.qty)}
                            </Typography>
                          )}
                          <Typography
                            sx={{
                              fontFamily: "Poppins",
                              fontSize: 14.5,
                              fontWeight: 800,
                              color: fg.primary,
                            }}
                          >
                            {money(it.price * it.qty)}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                );
              })}
            </Box>
          ))}

          {/* saved for later */}
          {saved.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 15,
                  fontWeight: 700,
                  color: fg.primary,
                  mb: 1.5,
                }}
              >
                Saved for later ({saved.length})
              </Typography>
              <Stack gap={1.2}>
                {saved.map((it) => {
                  const isPending = pendingId === it.id;
                  return (
                    <Stack
                      key={it.id}
                      direction="row"
                      gap={1.5}
                      alignItems="center"
                      sx={{
                        border: `1px solid ${border.primary}`,
                        borderRadius: radiusTokens.md,
                        p: 1.4,
                        opacity: isPending ? 0.6 : 1,
                        pointerEvents: isPending ? "none" : "auto",
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: radiusTokens.sm ?? 8,
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
                            fontSize: 13,
                            fontWeight: 600,
                            color: fg.primary,
                            lineHeight: 1.3,
                          }}
                        >
                          {it.title}
                        </Typography>
                        <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>
                          {money(it.price)}
                        </Typography>
                      </Stack>
                      <Stack direction="row" gap={1.2} alignItems="center" sx={{ flexShrink: 0 }}>
                        <Typography
                          onClick={() => moveToCart(it)}
                          sx={{
                            fontSize: 12.5,
                            fontWeight: 700,
                            color: main.primary,
                            cursor: "pointer",
                          }}
                        >
                          Move to cart
                        </Typography>
                        <Delete24Regular
                          onClick={() => removeSaved(it.id)}
                          style={{ fontSize: 16, color: fg.tertiary, cursor: "pointer" }}
                        />
                      </Stack>
                    </Stack>
                  );
                })}
              </Stack>
            </Box>
          )}
        </Box>

        {/* ---------------- RIGHT: order summary ---------------- */}
        <Box
          sx={{
            position: { xs: "static", md: "sticky" },
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
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 15.5,
                fontWeight: 800,
                color: fg.primary,
                mb: 2,
              }}
            >
              Order summary
            </Typography>

            {/* promo code */}
            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              sx={{
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.sm ?? 8,
                px: 1.4,
                py: 0.9,
                mb: promoError ? 0.6 : 1.6,
              }}
            >
              <Tag24Regular style={{ fontSize: 16, color: fg.secondary }} />
              <InputBase
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code"
                sx={{ fontSize: 12.5, flexGrow: 1, color: fg.primary }}
                onKeyDown={(e) => e.key === "Enter" && applyPromo()}
              />
              <Typography
                onClick={applyPromo}
                sx={{
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: main.primary,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Apply
              </Typography>
            </Stack>
            {promoError && (
              <Typography sx={{ fontSize: 11.5, color: "#d64545", mb: 1.6 }}>
                {promoError}
              </Typography>
            )}
            {promo && (
              <Stack
                direction="row"
                alignItems="center"
                gap={0.6}
                sx={{ mb: 1.6, animation: `${pop} 0.25s ease-out both` }}
              >
                <CheckmarkCircle24Filled style={{ fontSize: 15, color: main.primary }} />
                <Typography sx={{ fontSize: 12, color: main.primary, fontWeight: 600 }}>
                  "{promo.code}" applied — {Math.round(promo.rate * 100)}% off
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
                    Service fee <Info24Regular style={{ fontSize: 13, color: fg.tertiary }} />
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
                sx={{ fontFamily: "Poppins", fontSize: 15, fontWeight: 800, color: fg.primary }}
              >
                Total
              </Typography>
              <Typography
                sx={{ fontFamily: "Poppins", fontSize: 19, fontWeight: 800, color: fg.primary }}
              >
                {money(total)}
              </Typography>
            </Stack>

            <Box
              onClick={goToCheckout}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 0.9,
                backgroundColor: main.primary,
                color: "#fff",
                borderRadius: radiusTokens.md,
                py: 1.4,
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.7 : 1,
                fontFamily: "Poppins",
                fontWeight: 700,
                fontSize: 14.5,
                transition: "transform 0.15s ease",
                "&:hover": loading ? {} : { transform: "translateY(-1px)" },
              }}
            >
              {loading ? (
                <CircularProgress size={16} sx={{ color: "#fff" }} />
              ) : (
                <LockClosed24Regular style={{ fontSize: 17 }} />
              )}
              Proceed to checkout
              {!loading && <ArrowRight24Regular style={{ fontSize: 17 }} />}
            </Box>

            <Typography sx={{ fontSize: 11.5, color: fg.tertiary, textAlign: "center", mt: 1.4 }}>
              Payments are held securely until your booking is confirmed complete.
            </Typography>
          </Box>

          {/* trust strip */}
          <Box
            sx={{
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.md,
              p: spacingTokens.md,
              mb: spacingTokens.md,
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
                  <Typography sx={{ fontSize: 12, color: fg.secondary }}>{label}</Typography>
                </Stack>
              ))}
            </Stack>
            <Stack direction="row" gap={0.8} sx={{ mt: 1.6, flexWrap: "wrap" }}>
              {["Card", "Bank Transfer", "Verve", "USSD"].map((method) => (
                <Box
                  key={method}
                  sx={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: fg.secondary,
                    border: `1px solid ${border.primary}`,
                    borderRadius: radiusTokens.sm ?? 6,
                    px: 1,
                    py: 0.4,
                  }}
                >
                  {method}
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Row({ label, value, fg, accent }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography sx={{ fontSize: 13, color: fg.secondary }}>{label}</Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 700, color: accent ?? fg.primary }}>
        {value}
      </Typography>
    </Stack>
  );
}