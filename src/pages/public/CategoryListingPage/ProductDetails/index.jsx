// @ts-nocheck
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import {
  Heart24Regular,
  Heart24Filled,
  Add16Regular,
  Subtract16Regular,
  ShieldCheckmark24Regular,
  ArrowRepeatAll24Regular,
  Flash20Filled,
  Share24Regular,
  Location24Regular,
  CheckmarkCircle24Filled,
  Box24Regular,
  Home24Regular,
  Link24Regular,
  Cart24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import ProductListingCard from "../ProductListingCard";

import StarRow from "../ProductDetails/Starrow";
import ProductInfoTabs from "../ProductDetails/ProductInfoTab";
import ProductInfoSidebarNav from "./ProductInfoSidebarnav";
import KeyHighlights from "./KeyHighlights";

import facebookIcon from "/Image/fb.png";
import twitterIcon from "/Image/x.png";
import whatsappIcon from "/Image/whatsapp.png";
import ProductSummaryCard from "./ProductSummaryCard";
import { usePublicProduct, useRelatedProducts } from "@/Hooks/public_products";
import { useCart } from "@/Hooks/cart";

const PAYMENT_METHODS = ["Card", "Pay on Delivery", "Bank Transfer"];

// No reviews/ratings-breakdown/seller endpoint exists anywhere in the
// collection. Rather than silently fake-wire these to something that
// doesn't exist, they stay as clearly-labelled placeholders until a real
// endpoint shows up. Swap MOCK_REVIEWS/MOCK_SELLER_INFO/MOCK_RATING_BREAKDOWN
// for real hook data the same way `product` below was swapped in.
const MOCK_SELLER_INFO = {
  name: "Marketplace Seller",
  rating: 4.5,
  responseRate: 90,
  followers: 1000,
};
const MOCK_RATING_BREAKDOWN = [
  { stars: 5, percent: 60 },
  { stars: 4, percent: 25 },
  { stars: 3, percent: 8 },
  { stars: 2, percent: 4 },
  { stars: 1, percent: 3 },
];
const MOCK_REVIEWS = [
  {
    name: "Adaeze O.",
    verified: true,
    rating: 5,
    date: "12-09-2026",
    comment:
      "Arrived faster than I expected and exactly as described in the listing photos. No complaints.",
  },
  {
    name: "Ibrahim S.",
    verified: true,
    rating: 4,
    date: "06-09-2026",
    comment:
      "Good value for the price. Would buy from this seller again without hesitation.",
  },
];

/**
 * Maps the real API product shape onto the fields this page's JSX expects.
 * Centralised here so the rest of the component can keep reading
 * PRODUCT.price / PRODUCT.images / etc. without caring about the API's
 * actual field names (price as a string, images as objects, etc).
 */
function mapApiProduct(p) {
  const price = Number(p.price) || 0;
  const originalPrice = p.compare_at_price ? Number(p.compare_at_price) : null;

  const images =
    p.images?.length > 0
      ? p.images
          .slice()
          .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
          .map((img) => img.url)
      : p.thumbnail
      ? [p.thumbnail]
      : [];

  // No dedicated "size" concept in the API — if this product has variants,
  // surface them as selectable options using whatever label is available
  // (variant.name, falling back to its SKU since name was null in the
  // sample response). If your variants actually carry proper size/color
  // data via option_values, swap this line to read from there instead.
  const sizes =
    p.has_variants && p.variants?.length > 0
      ? p.variants.map((v) => v.name || v.sku)
      : [];

  const specs = [
    ["Brand", p.brand],
    ["SKU", p.sku],
    ["Category", p.category_name],
    p.subcategory_name && ["Subcategory", p.subcategory_name],
    ["Weight", p.weight ? `${p.weight}kg` : null],
    p.length &&
      p.width &&
      p.height && [
        "Dimensions",
        `${p.length} × ${p.width} × ${p.height} cm`,
      ],
    ["Free shipping", p.free_shipping ? "Yes" : "No"],
    ["Condition", "New"],
  ].filter((row) => row && row[1]);

  return {
    id: p.id,
    name: p.name,
    price,
    originalPrice,
    rating: p.avg_rating ? Number(p.avg_rating) : 0,
    ratingCount: p.review_count || 0,
    stockCount: p.stock ?? 0,
    trackInventory: p.track_inventory,
    category: p.category_name || "Products",
    images: images.length > 0 ? images : ["/Image/placeholder-product.png"],
    sizes,
    hasVariants: p.has_variants,
    variants: p.variants || [],
    description: p.description,
    shortDescription: p.short_description,
    specs,
    isFeatured: p.is_featured,
    freeShipping: p.free_shipping,
    official: false, // no "official store" concept in the API yet
  };
}

function SellerCard({ info, border, fg, main, bg }) {
  const navigate = useNavigate();
  const handleStore = () => navigate("/store");

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap={{ xs: "wrap", sm: "nowrap" }}
      gap={1}
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.sm,
        p: 1.2,
        backgroundColor: bg.secondary,
      }}
    >
      <Stack direction="row" alignItems="center" gap={1} sx={{ minWidth: 0 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: main.primary,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {info.name.charAt(0)}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Stack direction="row" alignItems="center" gap={0.4}>
            <Typography
              noWrap
              sx={{
                fontFamily: "Poppins",
                fontSize: 12.5,
                fontWeight: 700,
                color: fg.primary,
                maxWidth: { xs: 140, sm: "none" },
              }}
            >
              {info.name}
            </Typography>
            <CheckmarkCircle24Filled
              style={{ fontSize: 13, color: main.primary, flexShrink: 0 }}
            />
          </Stack>
          <Typography
            noWrap
            sx={{ fontFamily: "Poppins", fontSize: 11, color: fg.tertiary }}
          >
            {info.rating}★ seller · {info.responseRate}% response rate
          </Typography>
        </Box>
      </Stack>
      <Button
        onClick={handleStore}
        size="small"
        variant="outlined"
        sx={{
          fontFamily: "Poppins",
          fontSize: 11.5,
          textTransform: "none",
          fontWeight: 700,
          borderColor: main.primary,
          color: main.primary,
          borderRadius: radiusTokens.sm,
          flexShrink: 0,
        }}
      >
        Visit Store
      </Button>
    </Stack>
  );
}

// Placeholder logistics data — no delivery-zones API exists in the collection.
const STATES = ["Lagos", "Abuja", "Rivers", "Oyo"];
const AREAS_BY_STATE = {
  Lagos: ["Lekki-Ajah (Sangotedo)", "Ikeja", "Surulere", "Yaba"],
  Abuja: ["Garki", "Wuse", "Gwarinpa"],
  Rivers: ["Port Harcourt GRA", "Trans-Amadi"],
  Oyo: ["Bodija", "Ring Road"],
};

function useDispatchCountdown(cutoffHour = 18) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(cutoffHour, 0, 0, 0);
      const diffMs = cutoff - now;
      if (diffMs <= 0) {
        setLabel("tomorrow's dispatch window");
        return;
      }
      const hrs = Math.floor(diffMs / 3_600_000);
      const mins = Math.floor((diffMs % 3_600_000) / 60_000);
      setLabel(`the next ${hrs}hrs ${mins}mins`);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [cutoffHour]);

  return label;
}

function formatDateRange(daysFromNow, spanDays) {
  const start = new Date();
  start.setDate(start.getDate() + daysFromNow);
  const end = new Date(start);
  end.setDate(end.getDate() + spanDays);
  const opts = { day: "numeric", month: "long" };
  return `${start.toLocaleDateString("en-GB", opts)} and ${end.toLocaleDateString("en-GB", opts)}`;
}

function DeliveryMethodRow({
  icon: Icon,
  title,
  fee,
  dateRange,
  countdownLabel,
  fg,
  main,
  border,
}) {
  return (
    <Stack
      direction="row"
      gap={1.2}
      sx={{ py: 1.2, borderBottom: `1px solid ${border.primary}` }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: radiusTokens.sm,
          border: `1px solid ${border.primary}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon style={{ fontSize: 17, color: fg.secondary }} />
      </Box>
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 12.5,
              fontWeight: 700,
              color: fg.primary,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 11.5,
              color: main.primary,
              fontWeight: 600,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Details
          </Typography>
        </Stack>
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: 11.5, color: fg.tertiary }}
        >
          Delivery Fees ₦{fee.toLocaleString()}
        </Typography>
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 11,
            color: fg.tertiary,
            mt: 0.3,
          }}
        >
          Ready for delivery between <b>{dateRange}</b> if you place your order
          within {countdownLabel}
        </Typography>
      </Box>
    </Stack>
  );
}

function DeliveryReturns({ border, fg, main, bg }) {
  const [state, setState] = useState(STATES[0]);
  const [area, setArea] = useState(AREAS_BY_STATE[STATES[0]][0]);
  const countdownLabel = useDispatchCountdown();

  const handleStateChange = (newState) => {
    setState(newState);
    setArea(AREAS_BY_STATE[newState][0]);
  };

  return (
    <Box
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.sm,
        p: 1.4,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 12.5,
          fontWeight: 700,
          color: fg.primary,
          mb: 1,
        }}
      >
        Delivery & Returns
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        gap={0.6}
        flexWrap="wrap"
        sx={{ mb: 1.2 }}
      >
        <Flash20Filled style={{ fontSize: 13, color: main.primary }} />
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 10,
            fontWeight: 700,
            color: main.primary,
          }}
        >
          TETYHUB EXPRESS
        </Typography>
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: 11, color: fg.tertiary }}
        >
          — delivered faster, pay on delivery, cash or bank transfer.
        </Typography>
      </Stack>

      <Stack direction="row" alignItems="center" gap={0.6} sx={{ mb: 0.8 }}>
        <Location24Regular style={{ fontSize: 15, color: fg.secondary }} />
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 11.5,
            fontWeight: 700,
            color: fg.secondary,
          }}
        >
          Choose your location
        </Typography>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} gap={1} sx={{ mb: 1.4 }}>
        <Select
          size="small"
          value={state}
          onChange={(e) => handleStateChange(e.target.value)}
          sx={{ flex: 1, fontSize: 12.5, fontFamily: "Poppins" }}
        >
          {STATES.map((s) => (
            <MenuItem
              key={s}
              value={s}
              sx={{ fontSize: 12.5, fontFamily: "Poppins" }}
            >
              {s}
            </MenuItem>
          ))}
        </Select>
        <Select
          size="small"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          sx={{
            flex: { xs: 1, sm: 1.4 },
            fontSize: 12.5,
            fontFamily: "Poppins",
          }}
        >
          {AREAS_BY_STATE[state].map((a) => (
            <MenuItem
              key={a}
              value={a}
              sx={{ fontSize: 12.5, fontFamily: "Poppins" }}
            >
              {a}
            </MenuItem>
          ))}
        </Select>
      </Stack>

      <DeliveryMethodRow
        icon={Box24Regular}
        title="Pickup Station"
        fee={1000}
        dateRange={formatDateRange(5, 1)}
        countdownLabel={countdownLabel}
        fg={fg}
        main={main}
        border={border}
      />
      <DeliveryMethodRow
        icon={Home24Regular}
        title="Door Delivery"
        fee={1600}
        dateRange={formatDateRange(5, 1)}
        countdownLabel={countdownLabel}
        fg={fg}
        main={main}
        border={border}
      />

      <Stack direction="row" gap={1.2} sx={{ pt: 1.2 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: radiusTokens.sm,
            border: `1px solid ${border.primary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ArrowRepeatAll24Regular
            style={{ fontSize: 17, color: fg.secondary }}
          />
        </Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 12.5,
                fontWeight: 700,
                color: fg.primary,
              }}
            >
              Return Policy
            </Typography>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 11.5,
                color: main.primary,
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Details
            </Typography>
          </Stack>
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 11.5, color: fg.tertiary }}
          >
            Free return within 7 days for ALL eligible items
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

const SHARE_ICONS = [
  {
    key: "whatsapp",
    label: "WhatsApp",
    icon: whatsappIcon,
    urlTemplate: (url, text) => `https://wa.me/?text=${text}%20${url}`,
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: facebookIcon,
    urlTemplate: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
  {
    key: "twitter",
    label: "X",
    icon: twitterIcon,
    urlTemplate: (url, text) =>
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
  },
];

function ShareRow({ productName, fg, border, bg }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API can fail on non-HTTPS/local contexts — fail silently rather than throw
    }
  };

  return (
    <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 11.5,
          fontWeight: 700,
          color: fg.secondary,
        }}
      >
        Share:
      </Typography>
      {SHARE_ICONS.map((social) => {
        const url = encodeURIComponent(
          typeof window !== "undefined" ? window.location.href : "",
        );
        const text = encodeURIComponent(productName);
        return (
          <IconButton
            key={social.key}
            component="a"
            href={social.urlTemplate(url, text)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${social.label}`}
            size="small"
            sx={{
              border: `1px solid ${border.primary}`,
              width: 30,
              height: 30,
            }}
          >
            <Box
              component="img"
              src={social.icon}
              alt={social.label}
              sx={{ width: 15, height: 15 }}
            />
          </IconButton>
        );
      })}
      <IconButton
        onClick={handleCopyLink}
        aria-label="Copy link"
        size="small"
        sx={{ border: `1px solid ${border.primary}`, width: 30, height: 30 }}
      >
        <Link24Regular style={{ fontSize: 15, color: fg.secondary }} />
      </IconButton>
      {copied && (
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 11,
            color: "#16A34A",
            fontWeight: 600,
          }}
        >
          Link copied
        </Typography>
      )}
    </Stack>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bg, fg, border, main } = useColor();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const { product: rawProduct, loading, notFound, fetchProduct } = usePublicProduct();
  const { products: relatedRaw, fetchRelated } = useRelatedProducts();
  const { addToCart, loading: addingToCart } = useCart();

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id, fetchProduct]);

  useEffect(() => {
    if (id) fetchRelated(id);
  }, [id, fetchRelated]);

  const PRODUCT = rawProduct ? mapApiProduct(rawProduct) : null;

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // Reset per-product UI state whenever we land on a different product.
  useEffect(() => {
    if (!PRODUCT) return;
    setActiveImage(0);
    setQty(1);
    setWishlisted(false);
    setActiveTab("description");
    if (PRODUCT.hasVariants && PRODUCT.variants.length > 0) {
      setSelectedSize(PRODUCT.sizes[0]);
      setSelectedVariantId(PRODUCT.variants[0].id);
    } else {
      setSelectedSize(null);
      setSelectedVariantId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [PRODUCT?.id]);

  const handleSelectSize = (size, index) => {
    setSelectedSize(size);
    setSelectedVariantId(PRODUCT.variants[index]?.id ?? null);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleAddToCart = () => {
    if (!PRODUCT) return;
    addToCart(PRODUCT.id, qty, selectedVariantId);
  };

  if (loading && !PRODUCT) {
    return (
      <Stack alignItems="center" sx={{ py: 12 }}>
        <CircularProgress sx={{ color: main.primary }} />
      </Stack>
    );
  }

  if (notFound || !PRODUCT) {
    return (
      <Stack alignItems="center" gap={1} sx={{ py: 12 }}>
        <Typography
          sx={{ fontFamily: "Poppins", fontSize: 16, fontWeight: 700, color: fg.primary }}
        >
          Product not found
        </Typography>
        <Typography
          onClick={() => navigate("/")}
          sx={{ fontFamily: "Poppins", fontSize: 13, color: main.primary, cursor: "pointer" }}
        >
          Back to home
        </Typography>
      </Stack>
    );
  }

  const discount = PRODUCT.originalPrice
    ? Math.round(100 - (PRODUCT.price / PRODUCT.originalPrice) * 100)
    : null;

  const galleryBlock = (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        gap: 1.5,
      }}
    >
      <Stack
        direction={{ xs: "row", md: "column" }}
        gap={1}
        sx={{
          overflowX: { xs: "auto", md: "visible" },
          flexWrap: "nowrap",
          pb: { xs: 0.5, md: 0 },
        }}
      >
        {PRODUCT.images.map((img, i) => (
          <Box
            key={img + i}
            onClick={() => setActiveImage(i)}
            sx={{
              width: { xs: 36, md: 68 },
              height: { xs: 36, md: 68 },
              borderRadius: radiusTokens.sm,
              overflow: "hidden",
              cursor: "pointer",
              border: `2px solid ${i === activeImage ? main.primary : border.primary}`,
              backgroundColor: "#fff",
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={img}
              sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          flexGrow: 1,
          borderRadius: radiusTokens.md,
          border: `1px solid ${border.primary}`,
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
      >
        <Box
          component="img"
          src={PRODUCT.images[activeImage]}
          alt={PRODUCT.name}
          sx={{
            width: "100%",
            height: { xs: 280, sm: 340, md: 480 },
            objectFit: "contain",
            display: "block",
          }}
        />
      </Box>
    </Box>
  );

  const keyHighlightsBlock = (
    <KeyHighlights
      product={PRODUCT}
      fg={fg}
      border={border}
      main={main}
      bg={bg}
    />
  );

  const navAndTabsBlock = (
    <Box sx={{ mt: spacingTokens.md }}>
      <ProductInfoSidebarNav
        activeTab={activeTab}
        onSelect={setActiveTab}
        fg={fg}
        border={border}
        main={main}
        bg={bg}
      />
      <ProductInfoTabs
        product={{
          ...PRODUCT,
          // ProductInfoTabs likely expects `descriptionSections` /
          // `reviews` / `ratingBreakdown` — real API only gives a flat
          // description string and no reviews at all. Pass through what's
          // real and the mocks for what isn't, until those endpoints exist.
          descriptionSections: [
            {
              heading: PRODUCT.name,
              body: PRODUCT.description || PRODUCT.shortDescription || "",
            },
          ],
          reviews: MOCK_REVIEWS,
          ratingBreakdown: MOCK_RATING_BREAKDOWN,
        }}
        activeTab={activeTab}
        border={border}
        fg={fg}
        main={main}
        bg={bg}
      />
    </Box>
  );

  const buyEssentialsBlock = (
    <Stack gap={1.2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {PRODUCT.isFeatured && (
          <Box
            sx={{
              px: 1,
              py: 0.3,
              borderRadius: radiusTokens.sm,
              backgroundColor: main.primary,
              width: "fit-content",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 10.5,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Featured
            </Typography>
          </Box>
        )}
        <Stack direction="row" gap={0.5}>
          <IconButton size="small" aria-label="Share">
            <Share24Regular style={{ fontSize: 18, color: fg.tertiary }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => setWishlisted((w) => !w)}
            aria-label="Wishlist"
          >
            {wishlisted ? (
              <Heart24Filled style={{ fontSize: 20, color: "#ef4444" }} />
            ) : (
              <Heart24Regular style={{ fontSize: 20, color: fg.tertiary }} />
            )}
          </IconButton>
        </Stack>
      </Stack>

      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: { xs: 16, md: 18 },
          fontWeight: 700,
          color: fg.primary,
          lineHeight: 1.35,
        }}
      >
        {PRODUCT.name}
      </Typography>

      <SellerCard
        info={MOCK_SELLER_INFO}
        border={border}
        fg={fg}
        main={main}
        bg={bg}
      />

      <Stack direction="row" alignItems="baseline" gap={1} flexWrap="wrap">
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 23,
            fontWeight: 800,
            color: fg.primary,
          }}
        >
          ₦{PRODUCT.price.toLocaleString()}
        </Typography>
        {PRODUCT.originalPrice && (
          <>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 13,
                color: fg.tertiary,
                textDecoration: "line-through",
              }}
            >
              ₦{PRODUCT.originalPrice.toLocaleString()}
            </Typography>
            <Box
              sx={{
                px: 0.8,
                py: 0.2,
                borderRadius: radiusTokens.sm,
                background: "linear-gradient(135deg, #ef4444, #f97316)",
              }}
            >
              <Typography
                sx={{ fontSize: 10.5, fontWeight: 800, color: "#fff" }}
              >
                -{discount}%
              </Typography>
            </Box>
          </>
        )}
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <StarRow rating={PRODUCT.rating} size={14} />
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 12,
            color: main.primary,
            fontWeight: 600,
          }}
        >
          ({PRODUCT.ratingCount.toLocaleString()})
        </Typography>
      </Stack>

      {PRODUCT.freeShipping && (
        <Stack direction="row" alignItems="center" gap={0.6}>
          <Flash20Filled style={{ fontSize: 14, color: main.primary }} />
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 12,
              fontWeight: 700,
              color: main.primary,
            }}
          >
            FREE SHIPPING
          </Typography>
        </Stack>
      )}

      {PRODUCT.trackInventory && PRODUCT.stockCount <= 10 && (
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: 12,
            fontWeight: 700,
            color: "#ef4444",
          }}
        >
          {PRODUCT.stockCount > 0
            ? `Only ${PRODUCT.stockCount} left in stock — order soon`
            : "Out of stock"}
        </Typography>
      )}

      <Box sx={{ borderTop: `1px solid ${border.primary}`, my: 0.5 }} />

      {PRODUCT.sizes?.length > 0 && (
        <>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 12,
              fontWeight: 700,
              color: fg.secondary,
              mb: 0.4,
            }}
          >
            OPTION — {selectedSize}
          </Typography>
          <Stack direction="row" gap={0.8} flexWrap="wrap">
            {PRODUCT.sizes.map((s, i) => (
              <Box
                key={s + i}
                onClick={() => handleSelectSize(s, i)}
                sx={{
                  px: 1.4,
                  py: 0.7,
                  borderRadius: radiusTokens.sm,
                  border: `1.5px solid ${s === selectedSize ? main.primary : border.primary}`,
                  backgroundColor:
                    s === selectedSize ? `${main.primary}10` : "transparent",
                  cursor: "pointer",
                  fontFamily: "Poppins",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: s === selectedSize ? main.primary : fg.secondary,
                  transition: "all 0.15s ease",
                }}
              >
                {s}
              </Box>
            ))}
          </Stack>
        </>
      )}

      <Stack direction="row" alignItems="center" gap={2} sx={{ mt: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.sm,
          }}
        >
          <IconButton
            size="small"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            <Subtract16Regular style={{ fontSize: 14 }} />
          </IconButton>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 13,
              fontWeight: 600,
              width: 26,
              textAlign: "center",
            }}
          >
            {qty}
          </Typography>
          <IconButton
            size="small"
            onClick={() =>
              setQty((q) =>
                PRODUCT.trackInventory
                  ? Math.min(PRODUCT.stockCount, q + 1)
                  : q + 1,
              )
            }
          >
            <Add16Regular style={{ fontSize: 14 }} />
          </IconButton>
        </Stack>
      </Stack>

      <Stack direction="row" gap={1.2} sx={{ mt: 0.5 }}>
        <Button
          onClick={handleAddToCart}
          disabled={
            addingToCart || (PRODUCT.trackInventory && PRODUCT.stockCount <= 0)
          }
          fullWidth
          variant="contained"
          startIcon={
            addingToCart ? (
              <CircularProgress size={16} sx={{ color: "#fff" }} />
            ) : (
              <Cart24Regular />
            )
          }
          sx={{
            backgroundColor: main.primary,
            color: "#fff",
            textTransform: "none",
            fontFamily: "Poppins",
            fontWeight: 700,
            borderRadius: radiusTokens.md,
            py: { xs: 1.4, md: 2 },
          }}
        >
          {PRODUCT.trackInventory && PRODUCT.stockCount <= 0
            ? "Out of Stock"
            : "Add to Cart"}
        </Button>
      </Stack>

      <Button
        onClick={handleCart}
        fullWidth
        variant="outlined"
        sx={{
          borderColor: main.primary,
          color: main.primary,
          textTransform: "none",
          fontFamily: "Poppins",
          fontWeight: 700,
          borderRadius: radiusTokens.md,
          py: { xs: 1, md: 1.3 },
        }}
      >
        View Cart
      </Button>
    </Stack>
  );

  const buyExtraBlock = (
    <Stack gap={1.2}>
      <DeliveryReturns border={border} fg={fg} main={main} bg={bg} />

      <ShareRow productName={PRODUCT.name} fg={fg} border={border} bg={bg} />

      <Stack direction="row" gap={0.8} flexWrap="wrap">
        {PAYMENT_METHODS.map((method) => (
          <Box
            key={method}
            sx={{
              fontFamily: "Poppins",
              fontSize: 10.5,
              fontWeight: 600,
              color: fg.tertiary,
              border: `1px solid ${border.primary}`,
              borderRadius: radiusTokens.sm,
              px: 0.9,
              py: 0.3,
            }}
          >
            {method}
          </Box>
        ))}
      </Stack>

      <Stack direction="row" gap={2.5} flexWrap="wrap" sx={{ mt: 0.5 }}>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <ShieldCheckmark24Regular
            style={{ fontSize: 15, color: fg.tertiary }}
          />
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 11, color: fg.tertiary }}
          >
            Secure payment
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={0.5}>
          <ArrowRepeatAll24Regular
            style={{ fontSize: 15, color: fg.tertiary }}
          />
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 11, color: fg.tertiary }}
          >
            7-day returns
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ borderTop: `1px solid ${border.primary}`, mt: 0.5, pt: 1.5 }}>
        <ProductSummaryCard
          product={rawProduct}
          fg={fg}
          border={border}
          main={main}
          bg={bg}
        />
      </Box>
    </Stack>
  );

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      <Stack
        direction="row"
        alignItems="center"
        gap={0.6}
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: 1.5,
          borderBottom: `1px solid ${border.primary}`,
          flexWrap: "wrap",
        }}
      >
        {["Home", PRODUCT.category, PRODUCT.name].map((crumb, i, arr) => (
          <Stack key={crumb + i} direction="row" alignItems="center" gap={0.6}>
            <Typography
              onClick={() => i === 0 && navigate("/")}
              sx={{
                fontFamily: "Poppins",
                fontSize: 12.5,
                color: i === arr.length - 1 ? fg.primary : fg.tertiary,
                fontWeight: i === arr.length - 1 ? 600 : 400,
                cursor: i < arr.length - 1 ? "pointer" : "default",
                maxWidth:
                  i === arr.length - 1 ? { xs: 160, sm: 240, md: 320 } : "none",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {crumb}
            </Typography>
            {i < arr.length - 1 && (
              <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
                ›
              </Typography>
            )}
          </Stack>
        ))}
      </Stack>

      {isDesktop ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "8fr 4fr",
            gap: spacingTokens.xl,
            px: { md: spacingTokens.xl },
            py: spacingTokens.lg,
          }}
        >
          <Box>
            {galleryBlock}
            {keyHighlightsBlock}
            {navAndTabsBlock}
          </Box>

          <Stack
            gap={1.2}
            sx={{
              position: "sticky",
              top: spacingTokens.lg,
              alignSelf: "flex-start",
            }}
          >
            {buyEssentialsBlock}
            {buyExtraBlock}
          </Stack>
        </Box>
      ) : (
        <Stack
          gap={spacingTokens.lg}
          sx={{ px: spacingTokens.md, py: spacingTokens.lg }}
        >
          {galleryBlock}
          {buyEssentialsBlock}
          {keyHighlightsBlock}
          {navAndTabsBlock}
          {buyExtraBlock}
        </Stack>
      )}

      {relatedRaw.length > 0 && (
        <Box sx={{ px: { xs: spacingTokens.md, md: spacingTokens.xl }, pb: 10 }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 18,
              fontWeight: 800,
              color: fg.primary,
              mb: 2,
            }}
          >
            You may also like
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: spacingTokens.md,
            }}
          >
            {relatedRaw.map((p) => (
              <ProductListingCard key={p.id} product={p} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}