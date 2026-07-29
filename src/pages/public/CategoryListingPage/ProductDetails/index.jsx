// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  InputBase,
  Select,
  MenuItem,
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
import ProductSummaryCard from "./ProductSummaryCard ";

const DEFAULT_PRODUCT = {
  id: 1,
  name: "GALUIN Men's Comfortable Running Shoes, Stylish Low-Top Casual Sports Shoes",
  seller: "GALUIN",
  official: true,
  price: 12240,
  originalPrice: 14400,
  rating: 4,
  ratingCount: 248,
  stockCount: 6,
  category: "Fashion",
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=75",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=75",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=700&q=75",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=700&q=75",
  ],
  sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
  descriptionSections: [
    {
      heading: "Breathable mesh upper for all-day comfort",
      body: "The engineered mesh upper flexes with your foot and lets air circulate with every step, so your feet stay cool through a full day of wear — whether that's a walk across town, a light gym session, or just standing at a market stall for hours.",
    },
    {
      heading: "Lightweight cushioned midsole",
      body: "A soft, responsive foam midsole absorbs impact on hard pavement without weighing the shoe down. You get the kind of step-in comfort that usually only shows up in shoes twice this price.",
    },
    {
      heading: "Durable rubber outsole with reinforced grip",
      body: "A textured rubber outsole grips wet tile, loose gravel, and painted concrete alike, with reinforced high-wear zones at the heel and forefoot so the tread doesn't flatten out after a few months of daily use.",
    },
    {
      heading: "Versatile enough for everyday wear",
      body: "The low-top silhouette and neutral colorway pair as easily with jeans and a t-shirt as they do with joggers, making this a genuine one-shoe-does-it-all option rather than a single-occasion sneaker.",
    },
    {
      heading: "True to size",
      body: "Runs true to standard EU sizing. If you're between two sizes or have a wider foot, we recommend sizing up half a size for a more comfortable fit.",
    },
    {
      heading: "Care instructions",
      body: "Wipe the mesh upper with a damp cloth and mild soap; avoid machine washing, which can loosen the bonded sole over time. Air dry away from direct heat or sunlight.",
    },
  ],
  specs: [
    ["Brand", "GALUIN"],
    ["Model", "GX-402 Low-Top"],
    ["Category", "Men's Running Shoes"],
    ["Upper Material", "Engineered mesh"],
    ["Sole Material", "Rubber"],
    ["Closure Type", "Lace-up"],
    ["Available Sizes", "EU 40 – EU 44"],
    ["Available Colors", "Black, Grey, Navy"],
    ["Weight (per shoe)", "≈ 280g (size EU 42)"],
    ["Gender", "Men's"],
    ["Country of Origin", "Vietnam"],
    ["Warranty", "6 months against manufacturing defects"],
    ["Package Contents", "1 × pair of shoes, 1 × spare lace set"],
  ],
  sellerInfo: {
    name: "GALUIN Official Store",
    rating: 4.6,
    responseRate: 96,
    followers: 12400,
  },
  ratingBreakdown: [
    { stars: 5, percent: 68 },
    { stars: 4, percent: 20 },
    { stars: 3, percent: 7 },
    { stars: 2, percent: 3 },
    { stars: 1, percent: 2 },
  ],
  reviews: [
    {
      name: "Chidinma A.",
      rating: 5,
      date: "18-07-2026",
      verified: true,
      comment:
        "Genuinely comfortable from the first wear, no breaking-in period needed. I've worn these to work three days a week for a month and the sole shows zero wear yet.",
    },
    {
      name: "Emeka O.",
      rating: 4,
      date: "12-07-2026",
      verified: true,
      comment:
        "Good shoe for the price. Sizing ran slightly small for me — I'd recommend going half a size up if you're in between sizes.",
    },
    {
      name: "Blessing N.",
      rating: 5,
      date: "05-07-2026",
      verified: true,
      comment:
        "Bought this for my husband and he won't stop wearing them. Breathable, lightweight, and the grey colorway matches everything.",
    },
    {
      name: "Tunde F.",
      rating: 3,
      date: "28-06-2026",
      verified: false,
      comment:
        "Decent shoe but the laces that came with it were shorter than expected. Had to buy a replacement pair separately.",
    },
    {
      name: "Ngozi K.",
      rating: 5,
      date: "20-06-2026",
      verified: true,
      comment:
        "Delivery was fast and the shoes matched the photos exactly. Very happy with this purchase, will buy another color.",
    },
  ],
};

const RELATED = [
  {
    id: 2,
    category: "Fashion",
    name: "Classic Canvas Sneakers, All White",
    price: 9800,
    originalPrice: 13500,
    rating: 4,
    ratingCount: 3210,
    official: true,
    express: true,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: 3,
    category: "Fashion",
    name: "High-Top Basketball Shoes, Grip Sole",
    price: 24000,
    originalPrice: 29900,
    rating: 5,
    ratingCount: 1540,
    official: true,
    express: true,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: 4,
    category: "Fashion",
    name: "Slip-On Loafers, Everyday Comfort",
    price: 11200,
    originalPrice: null,
    rating: 4,
    ratingCount: 890,
    official: false,
    express: true,
    image:
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=400&q=70",
  },
  {
    id: 5,
    category: "Fashion",
    name: "Trail Running Shoes, Water Resistant",
    price: 27500,
    originalPrice: 33000,
    rating: 4,
    ratingCount: 2670,
    official: true,
    express: false,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=400&q=70",
  },
];

const PAYMENT_METHODS = ["Card", "Pay on Delivery", "Bank Transfer"];

// A ProductListingCard only carries card-shaped fields (name, price, rating,
// one image, category). This fills in everything the detail page additionally
// needs — gallery array, sizes, description, seller card, rating breakdown —
// with reasonable generic defaults rather than leaving them undefined.
// Generic review templates cycled per listing — not tied to any specific
// product, so they read reasonably for any category rather than being
// fashion-shoe-specific like DEFAULT_PRODUCT's hand-written ones.
const GENERIC_REVIEWERS = [
  { name: "Adaeze O.", verified: true },
  { name: "Ibrahim S.", verified: true },
  { name: "Chiamaka U.", verified: false },
  { name: "Segun A.", verified: true },
];
const GENERIC_COMMENTS = [
  "Arrived faster than I expected and exactly as described in the listing photos. No complaints.",
  "Good value for the price. Would buy from this seller again without hesitation.",
  "Does the job well. Packaging could be a bit sturdier, but the product itself is solid.",
  "Really happy with this — matches the description, and customer support responded quickly when I had a question before ordering.",
];

function buildDetailFromListing(listing) {
  const sellerLabel = listing.official
    ? "Official Store"
    : "Marketplace Seller";

  return {
    id: listing.id,
    name: listing.name,
    seller: sellerLabel,
    official: listing.official,
    price: listing.price,
    originalPrice: listing.originalPrice,
    rating: listing.rating,
    ratingCount: listing.ratingCount,
    stockCount: 8,
    category: listing.category,
    images: [listing.image, listing.image, listing.image],
    sizes:
      listing.category === "Fashion"
        ? ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44"]
        : [],
    descriptionSections: [
      {
        heading: `What makes this ${listing.category.toLowerCase()} pick worth it`,
        body: `${listing.name} is fulfilled by a ${sellerLabel.toLowerCase()} on TETYHUB, meaning it's passed our seller verification before ever reaching the marketplace. Every order is backed by buyer protection — your payment is only released to the seller once you've confirmed delivery.`,
      },
      {
        heading: "Built for everyday use",
        body: `Whether you're buying this for daily use or as a one-off pickup, it's selected to hold up under regular, real-world conditions — not just look good in a listing photo.`,
      },
      {
        heading: listing.express
          ? "Fast, trackable delivery"
          : "Delivery you can plan around",
        body: listing.express
          ? "This item qualifies for TETYHUB Express — expect faster dispatch and a live tracking link the moment your order is confirmed."
          : "Standard delivery timelines apply to this item — you'll get an estimated delivery window at checkout based on your location.",
      },
      {
        heading: "What's in the box",
        body: "The product ships exactly as shown in the listing photos, along with any standard accessories included by the manufacturer. Check the Specifications tab for exact package contents where available.",
      },
    ],
    specs: [
      ["Category", listing.category],
      ["Fulfilled by", sellerLabel],
      ["Express delivery", listing.express ? "Available" : "Not available"],
      ["Condition", "New"],
      [
        "Warranty",
        listing.official
          ? "6 months, seller-backed"
          : "Standard TETYHUB buyer protection",
      ],
      ["Return window", "7 days from delivery"],
      ["Country of Origin", "Varies by seller — see product listing"],
      ["Package Contents", "1 × item as shown in listing photos"],
    ],
    sellerInfo: {
      name: listing.official
        ? `${listing.category} Official Store`
        : `${listing.category} Seller`,
      rating: 4.5,
      responseRate: 90,
      followers: 1000,
    },
    ratingBreakdown: [
      { stars: 5, percent: 60 },
      { stars: 4, percent: 25 },
      { stars: 3, percent: 8 },
      { stars: 2, percent: 4 },
      { stars: 1, percent: 3 },
    ],
    reviews: GENERIC_REVIEWERS.map((reviewer, i) => ({
      name: reviewer.name,
      verified: reviewer.verified,
      rating: Math.max(3, Math.min(5, listing.rating - (i % 2))),
      date: new Date(Date.now() - (i + 1) * 6 * 86_400_000).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        },
      ),
      comment: GENERIC_COMMENTS[i % GENERIC_COMMENTS.length],
    })),
  };
}

function SellerCard({ info, border, fg, main, bg }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.sm,
        p: 1.2,
        backgroundColor: bg.secondary,
      }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
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
        <Box>
          <Stack direction="row" alignItems="center" gap={0.4}>
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 12.5,
                fontWeight: 700,
                color: fg.primary,
              }}
            >
              {info.name}
            </Typography>
            <CheckmarkCircle24Filled
              style={{ fontSize: 13, color: main.primary }}
            />
          </Stack>
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 11, color: fg.tertiary }}
          >
            {info.rating}★ seller · {info.responseRate}% response rate
          </Typography>
        </Box>
      </Stack>
      <Button
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

// Placeholder logistics data until a real delivery-zones API exists.
const STATES = ["Lagos", "Abuja", "Rivers", "Oyo"];
const AREAS_BY_STATE = {
  Lagos: ["Lekki-Ajah (Sangotedo)", "Ikeja", "Surulere", "Yaba"],
  Abuja: ["Garki", "Wuse", "Gwarinpa"],
  Rivers: ["Port Harcourt GRA", "Trans-Amadi"],
  Oyo: ["Bodija", "Ring Road"],
};

// Formats "how many hours/minutes until this evening's dispatch cutoff" —
// recalculates every minute so it doesn't go stale like a hardcoded countdown would.
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
      <Box sx={{ flexGrow: 1 }}>
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
    setArea(AREAS_BY_STATE[newState][0]); // reset area whenever state changes
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

      <Stack direction="row" alignItems="center" gap={0.6} sx={{ mb: 1.2 }}>
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

      <Stack direction="row" gap={1} sx={{ mb: 1.4 }}>
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
          sx={{ flex: 1.4, fontSize: 12.5, fontFamily: "Poppins" }}
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
        <Box sx={{ flexGrow: 1 }}>
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
    <Stack direction="row" alignItems="center" gap={1}>
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
  const location = useLocation();
  const { bg, fg, border, main } = useColor();

  // Real clicked product (passed via navigate(path, { state })) takes
  // priority; falls back to the placeholder for direct URL visits/refreshes,
  // where route state doesn't survive.
  const listingProduct = location.state?.product;
  const PRODUCT = useMemo(
    () =>
      listingProduct ? buildDetailFromListing(listingProduct) : DEFAULT_PRODUCT,
    [listingProduct],
  );

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(PRODUCT.sizes?.[0] ?? null);
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  // This component may not remount when navigating between two products on
  // the same route (e.g. clicking a "You may also like" card) — reset
  // per-product UI state explicitly whenever the underlying product changes.
  useEffect(() => {
    setActiveImage(0);
    setQty(1);
    setWishlisted(false);
    setSelectedSize(PRODUCT.sizes?.[0] ?? null);
    setActiveTab("description");
  }, [PRODUCT.id]);

  const discount = PRODUCT.originalPrice
    ? Math.round(100 - (PRODUCT.price / PRODUCT.originalPrice) * 100)
    : null;

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      {/* breadcrumb */}
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
          <Stack key={crumb} direction="row" alignItems="center" gap={0.6}>
            <Typography
              onClick={() => i === 0 && navigate("/")}
              sx={{
                fontFamily: "Poppins",
                fontSize: 12.5,
                color: i === arr.length - 1 ? fg.primary : fg.tertiary,
                fontWeight: i === arr.length - 1 ? 600 : 400,
                cursor: i < arr.length - 1 ? "pointer" : "default",
                maxWidth: i === arr.length - 1 ? 320 : "none",
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

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "8fr 4fr" },
          gap: spacingTokens.xl,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: spacingTokens.lg,
        }}
      >
        {/* gallery — 8 of 12 columns, vertical thumbnail rail on desktop like Jumia's PDP */}
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              gap: 1.5,
            }}
          >
            <Stack direction={{ xs: "row", md: "column" }} gap={1}>
              {PRODUCT.images.map((img, i) => (
                <Box
                  key={img}
                  onClick={() => setActiveImage(i)}
                  sx={{
                    width: 68,
                    height: 68,
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
                  height: { xs: 340, md: 480 },
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Box>
          </Box>

          {/* Sits directly under the gallery now, not as a separate full-width
              section below the whole grid — that gap was the unwanted space. */}
          {/* Fills the gap between the gallery and the tab content — the
              sticky sidebar's nav sits near the bottom of a tall stack, so
              without this, the content here would start well above it. */}
          <KeyHighlights
            product={PRODUCT}
            fg={fg}
            border={border}
            main={main}
            bg={bg}
          />

          <ProductInfoTabs
            product={PRODUCT}
            activeTab={activeTab}
            border={border}
            fg={fg}
            main={main}
            bg={bg}
          />
        </Box>

        {/* buy box — 4 of 12 columns, sticky so it stays visible while the
            (now taller) left column scrolls, instead of ending early and
            leaving blank space beneath it */}
        <Stack
          gap={1.2}
          sx={{
            position: "sticky",
            top: spacingTokens.lg,
            alignSelf: "flex-start",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            {PRODUCT.official && (
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
                  Official Store
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
                  <Heart24Regular
                    style={{ fontSize: 20, color: fg.tertiary }}
                  />
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
            info={PRODUCT.sellerInfo}
            border={border}
            fg={fg}
            main={main}
            bg={bg}
          />

          <Stack direction="row" alignItems="baseline" gap={1}>
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
              TETYHUB EXPRESS
            </Typography>
          </Stack>

          {PRODUCT.stockCount <= 10 && (
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 12,
                fontWeight: 700,
                color: "#ef4444",
              }}
            >
              Only {PRODUCT.stockCount} left in stock — order soon
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
                SIZE — {selectedSize}
              </Typography>
              <Stack direction="row" gap={0.8} flexWrap="wrap">
                {PRODUCT.sizes.map((s) => (
                  <Box
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    sx={{
                      px: 1.4,
                      py: 0.7,
                      borderRadius: radiusTokens.sm,
                      border: `1.5px solid ${s === selectedSize ? main.primary : border.primary}`,
                      backgroundColor:
                        s === selectedSize
                          ? `${main.primary}10`
                          : "transparent",
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
                  setQty((q) => Math.min(PRODUCT.stockCount, q + 1))
                }
              >
                <Add16Regular style={{ fontSize: 14 }} />
              </IconButton>
            </Stack>
          </Stack>

          <Stack direction="row" gap={1.2} sx={{ mt: 0.5 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Cart24Regular />}
              sx={{
                borderColor: main.primary,
                color: main.primary,
                textTransform: "none",
                fontFamily: "Poppins",
                fontWeight: 700,
                borderRadius: radiusTokens.md,
                py: 2,
              }}
            >
              Add to Cart
            </Button>
          </Stack>

          <DeliveryReturns border={border} fg={fg} main={main} bg={bg} />

          <ShareRow
            productName={PRODUCT.name}
            fg={fg}
            border={border}
            bg={bg}
          />

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

          <Stack direction="row" gap={2.5} sx={{ mt: 0.5 }}>
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

          {/* Single sticky sidebar continues here — same column as everything
              above, not a second competing sticky element elsewhere on the page. */}
          <Box
            sx={{ borderTop: `1px solid ${border.primary}`, mt: 1, pt: 1.5 }}
          >
            <ProductInfoSidebarNav
              activeTab={activeTab}
              onSelect={setActiveTab}
              fg={fg}
              border={border}
              main={main}
              bg={bg}
            />
          </Box>

          <ProductSummaryCard
            product={PRODUCT}
            fg={fg}
            border={border}
            main={main}
            bg={bg}
          />
        </Stack>
      </Box>

      {/* related products */}
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
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: spacingTokens.md,
          }}
        >
          {RELATED.map((p) => (
            <ProductListingCard key={p.id} product={p} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
