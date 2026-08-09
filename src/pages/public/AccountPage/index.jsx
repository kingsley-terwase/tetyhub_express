// @ts-nocheck
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Typography,
  InputBase,
  Switch,
  IconButton,
} from "@mui/material";
import {
  Person24Regular,
  Box24Regular,
  Mail24Regular,
  Star24Regular,
  Star24Filled,
  Tag24Regular,
  Heart24Regular,
  PeopleCommunity24Regular,
  History24Regular,
  Settings24Regular,
  Wallet24Regular,
  Location24Regular,
  Megaphone24Regular,
  LockClosed24Regular,
  SignOut24Regular,
  Edit24Regular,
  Delete24Regular,
  Add24Regular,
  CheckmarkCircle24Filled,
  ShieldCheckmark24Regular,
  ChevronRight24Regular,
  ChevronLeft20Regular,
  ChevronRight20Regular,
  Copy24Regular,
  Warning24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import ProductListingCard from "../CategoryListingPage/ProductListingCard";

const USER = {
  name: "Kingsley Terwase",
  email: "kingsley.terwase@email.com",
  phone: "+234 704 265 6559",
};

const DEFAULT_ADDRESS = {
  label: "Home",
  name: "Kingsley Terwase",
  line: "One Man Village, Nasarawa",
  area: "Masaka, Nasarawa State",
  phone: "+234 704 265 6559",
};

const NAV_SECTIONS = [
  {
    group: "Account",
    items: [
      { key: "overview", label: "My Account", icon: Person24Regular },
      { key: "orders", label: "Orders", icon: Box24Regular },
      { key: "inbox", label: "Inbox", icon: Mail24Regular },
      { key: "reviews", label: "Pending Reviews", icon: Star24Regular },
      { key: "vouchers", label: "Vouchers", icon: Tag24Regular },
      { key: "wishlist", label: "Wishlist", icon: Heart24Regular },
      {
        key: "sellers",
        label: "Followed Sellers",
        icon: PeopleCommunity24Regular,
      },
      { key: "recent", label: "Recently Viewed", icon: History24Regular },
    ],
  },
  {
    group: "Settings",
    items: [
      { key: "profile", label: "Account Management", icon: Settings24Regular },
      { key: "payment", label: "Payment Settings", icon: Wallet24Regular },
      { key: "addresses", label: "Address Book", icon: Location24Regular },
      {
        key: "newsletter",
        label: "Newsletter Preferences",
        icon: Megaphone24Regular,
      },
      {
        key: "cookies",
        label: "Cookie Preferences",
        icon: LockClosed24Regular,
      },
      {
        key: "close",
        label: "Close Account",
        icon: Delete24Regular,
        danger: true,
      },
    ],
  },
];

const ORDERS = [
  {
    id: "TH-482913",
    date: "31 Jul 2026",
    item: "GALUIN Running Shoes",
    qty: 1,
    total: 12240,
    status: "Confirmed",
  },
  {
    id: "TH-471820",
    date: "18 Jul 2026",
    item: "Deep Home Cleaning",
    qty: 1,
    total: 12000,
    status: "Completed",
  },
  {
    id: "TH-465310",
    date: "02 Jul 2026",
    item: "Logo & Brand Identity",
    qty: 1,
    total: 45000,
    status: "Cancelled",
  },
];

const MESSAGES = [
  {
    from: "SparkleCo",
    preview: "Just confirming your window cleaning for the 4th — see you then!",
    time: "2h ago",
    unread: true,
  },
  {
    from: "TETYHUB Support",
    preview:
      "Your ticket TK-582013 has been resolved. Let us know if you need anything else.",
    time: "1d ago",
    unread: false,
  },
  {
    from: "GALUIN Official Store",
    preview: "Thanks for your order! Your item has been dispatched.",
    time: "3d ago",
    unread: false,
  },
];

const PENDING_REVIEWS = [
  {
    id: "TH-471820",
    provider: "SparkleCo",
    item: "Deep Home Cleaning",
    date: "18 Jul 2026",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "TH-465310",
    provider: "Studio Nine",
    item: "Logo & Brand Identity",
    date: "02 Jul 2026",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=200&q=80",
  },
];

const VOUCHERS = [
  {
    code: "WELCOME10",
    desc: "10% off your next order",
    expiry: "Expires 31 Aug 2026",
    used: false,
  },
  {
    code: "FREESHIP",
    desc: "Free delivery on orders over ₦20,000",
    expiry: "Expires 15 Aug 2026",
    used: false,
  },
  {
    code: "TETY5",
    desc: "5% off, one-time use",
    expiry: "Used on 12 Jul 2026",
    used: true,
  },
];

const SELLERS = [
  { name: "GALUIN Official Store", rating: 4.6, category: "Fashion" },
  { name: "SparkleCo", rating: 4.9, category: "Home Cleaning" },
  { name: "Studio Nine", rating: 4.8, category: "Design" },
];

const SAMPLE_PRODUCTS = [
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

const money = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

export default function AccountPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("overview");
  const railRef = useRef(null);

  const scrollRail = (dir) =>
    railRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });

  const allItems = useMemo(() => NAV_SECTIONS.flatMap((g) => g.items), []);
  const activeLabel =
    allItems.find((i) => i.key === activeSection)?.label ?? "My Account";

  const handleLogout = () => {
    // Wire this up to your real auth/session logout.
    navigate("/");
  };

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pt: { xs: 3, md: 4 },
          pb: 1,
        }}
      >
        <Typography
          sx={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: { xs: 22, md: 26 },
            color: fg.primary,
          }}
        >
          My Account
        </Typography>
      </Box>

      {/* mobile: scrollable pill nav */}
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "sticky",
          top: 0,
          zIndex: 5,
          backgroundColor: bg.primary,
          borderBottom: `1px solid ${border.primary}`,
          py: 1,
        }}
      >
        <Box sx={{ position: "relative", px: spacingTokens.md }}>
          <Box
            ref={railRef}
            sx={{
              display: "flex",
              gap: 1,
              overflowX: "auto",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {allItems.map((item) => {
              const active = activeSection === item.key;
              const Icon = item.icon;
              return (
                <Stack
                  key={item.key}
                  direction="row"
                  alignItems="center"
                  gap={0.6}
                  onClick={() =>
                    item.key === "close"
                      ? setActiveSection(item.key)
                      : setActiveSection(item.key)
                  }
                  sx={{
                    flexShrink: 0,
                    px: 1.6,
                    py: 0.8,
                    borderRadius: radiusTokens.full ?? 999,
                    border: `1px solid ${active ? main.primary : border.primary}`,
                    backgroundColor: active ? main.primary : "transparent",
                    color: active
                      ? "#fff"
                      : item.danger
                        ? "#c0392b"
                        : fg.primary,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Icon style={{ fontSize: 15 }} />
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: 12.5,
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Stack>
              );
            })}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2.6fr 9.4fr" },
          gap: spacingTokens.xl,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          py: { xs: 2, md: 3 },
        }}
      >
        {/* desktop sidebar */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Box sx={{ position: "sticky", top: spacingTokens.lg }}>
            <Stack
              direction="row"
              alignItems="center"
              gap={1.2}
              sx={{
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.md,
                p: 1.6,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: main.primary,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Poppins",
                  fontWeight: 700,
                  fontSize: 17,
                  flexShrink: 0,
                }}
              >
                {USER.name.charAt(0)}
              </Box>
              <Stack sx={{ minWidth: 0 }}>
                <Typography
                  noWrap
                  sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
                >
                  {USER.name}
                </Typography>
                <Typography noWrap sx={{ fontSize: 11.5, color: fg.tertiary }}>
                  {USER.email}
                </Typography>
              </Stack>
            </Stack>

            {NAV_SECTIONS.map((group) => (
              <Box key={group.group} sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: fg.tertiary,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    px: 1,
                    mb: 0.6,
                  }}
                >
                  {group.group}
                </Typography>
                <Stack gap={0.2}>
                  {group.items.map((item) => {
                    const active = activeSection === item.key;
                    const Icon = item.icon;
                    return (
                      <Stack
                        key={item.key}
                        direction="row"
                        alignItems="center"
                        gap={1}
                        onClick={() => setActiveSection(item.key)}
                        sx={{
                          px: 1.2,
                          py: 1,
                          borderRadius: radiusTokens.sm ?? 8,
                          cursor: "pointer",
                          backgroundColor: active
                            ? `${main.primary}12`
                            : "transparent",
                          "&:hover": {
                            backgroundColor: active
                              ? `${main.primary}12`
                              : bg.secondary,
                          },
                        }}
                      >
                        <Icon
                          style={{
                            fontSize: 17,
                            color: item.danger
                              ? "#c0392b"
                              : active
                                ? main.primary
                                : fg.secondary,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: 13,
                            fontWeight: active ? 700 : 500,
                            color: item.danger
                              ? "#c0392b"
                              : active
                                ? main.primary
                                : fg.primary,
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
            ))}

            <Stack
              direction="row"
              alignItems="center"
              gap={1}
              onClick={handleLogout}
              sx={{
                px: 1.2,
                py: 1,
                mt: 1,
                borderTop: `1px solid ${border.primary}`,
                pt: 1.6,
                cursor: "pointer",
              }}
            >
              <SignOut24Regular style={{ fontSize: 17, color: fg.secondary }} />
              <Typography
                sx={{ fontSize: 13, fontWeight: 600, color: fg.secondary }}
              >
                Logout
              </Typography>
            </Stack>
          </Box>
        </Box>

        {/* content */}
        <Box sx={{ minWidth: 0 }}>
          {activeSection === "overview" && (
            <OverviewSection
              navigate={navigate}
              setActiveSection={setActiveSection}
              bg={bg}
              fg={fg}
              border={border}
              main={main}
            />
          )}
          {activeSection === "orders" && (
            <OrdersSection
              navigate={navigate}
              bg={bg}
              fg={fg}
              border={border}
              main={main}
            />
          )}
          {activeSection === "inbox" && (
            <InboxSection bg={bg} fg={fg} border={border} main={main} />
          )}
          {activeSection === "reviews" && (
            <ReviewsSection
              navigate={navigate}
              bg={bg}
              fg={fg}
              border={border}
              main={main}
            />
          )}
          {activeSection === "vouchers" && (
            <VouchersSection bg={bg} fg={fg} border={border} main={main} />
          )}
          {activeSection === "wishlist" && (
            <WishlistSection bg={bg} fg={fg} border={border} main={main} />
          )}
          {activeSection === "sellers" && (
            <SellersSection bg={bg} fg={fg} border={border} main={main} />
          )}
          {activeSection === "recent" && (
            <RecentSection bg={bg} fg={fg} border={border} main={main} />
          )}
          {activeSection === "profile" && (
            <ProfileSection bg={bg} fg={fg} border={border} main={main} />
          )}
          {activeSection === "payment" && (
            <PaymentSection bg={bg} fg={fg} border={border} main={main} />
          )}
          {activeSection === "addresses" && (
            <AddressesSection bg={bg} fg={fg} border={border} main={main} />
          )}
          {activeSection === "newsletter" && (
            <NewsletterSection bg={bg} fg={fg} border={border} main={main} />
          )}
          {activeSection === "cookies" && (
            <CookiesSection bg={bg} fg={fg} border={border} main={main} />
          )}
          {activeSection === "close" && (
            <CloseAccountSection bg={bg} fg={fg} border={border} main={main} />
          )}
        </Box>
      </Box>
    </Box>
  );
}

/* ---------------------------- shared bits ---------------------------- */

function SectionHeader({ title, subtitle, fg }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        sx={{
          fontFamily: "Syne",
          fontWeight: 700,
          fontSize: { xs: 19, md: 22 },
          color: fg.primary,
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ fontSize: 13, color: fg.secondary, mt: 0.4 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

function SectionCard({ children, border, bg }) {
  return (
    <Box
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        backgroundColor: bg.primary,
        p: { xs: 1.6, sm: spacingTokens.md },
      }}
    >
      {children}
    </Box>
  );
}

function EmptyState({ icon: Icon, title, body, ctaLabel, onCta, fg, main }) {
  return (
    <Stack alignItems="center" textAlign="center" gap={1} sx={{ py: 6 }}>
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: `${main.primary}14`,
          color: main.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 0.5,
        }}
      >
        <Icon style={{ fontSize: 26 }} />
      </Box>
      <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: fg.primary }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: 13, color: fg.secondary, maxWidth: 340 }}>
        {body}
      </Typography>
      {ctaLabel && (
        <Box
          onClick={onCta}
          sx={{
            mt: 1,
            backgroundColor: main.primary,
            color: "#fff",
            borderRadius: radiusTokens.sm ?? 8,
            px: 2.2,
            py: 1,
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {ctaLabel}
        </Box>
      )}
    </Stack>
  );
}

function StatChip({ label, value, onClick, border, fg, main }) {
  return (
    <Stack
      onClick={onClick}
      alignItems="center"
      justifyContent="center"
      sx={{
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.md,
        py: 1.4,
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.15s ease",
        "&:hover": onClick ? { borderColor: main.primary } : undefined,
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 19,
          fontWeight: 800,
          color: fg.primary,
        }}
      >
        {value}
      </Typography>
      <Typography sx={{ fontSize: 11, color: fg.tertiary, mt: 0.2 }}>
        {label}
      </Typography>
    </Stack>
  );
}

const STATUS_STYLES = {
  Confirmed: { bg: "#eaf1ff", color: "#2954E5" },
  Completed: { bg: "#e8f8ee", color: "#1a9850" },
  Cancelled: { bg: "#fbe9e9", color: "#c0392b" },
};

function StatusPill({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.Confirmed;
  return (
    <Box
      sx={{
        fontSize: 11,
        fontWeight: 700,
        color: s.color,
        backgroundColor: s.bg,
        borderRadius: radiusTokens.full ?? 999,
        px: 1.2,
        py: 0.35,
      }}
    >
      {status}
    </Box>
  );
}

/* ------------------------------ sections ------------------------------ */

function OverviewSection({ navigate, setActiveSection, bg, fg, border, main }) {
  return (
    <Box>
      <SectionHeader
        title={`Hi, ${USER.name.split(" ")[0]} 👋`}
        subtitle="Here's what's happening with your account."
        fg={fg}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
          gap: 1.2,
          mb: 3,
        }}
      >
        <StatChip
          label="Orders"
          value={ORDERS.length}
          onClick={() => setActiveSection("orders")}
          border={border}
          fg={fg}
          main={main}
        />
        <StatChip
          label="Wishlist"
          value={SAMPLE_PRODUCTS.length}
          onClick={() => setActiveSection("wishlist")}
          border={border}
          fg={fg}
          main={main}
        />
        <StatChip
          label="Vouchers"
          value={VOUCHERS.filter((v) => !v.used).length}
          onClick={() => setActiveSection("vouchers")}
          border={border}
          fg={fg}
          main={main}
        />
        <StatChip
          label="Followed"
          value={SELLERS.length}
          onClick={() => setActiveSection("sellers")}
          border={border}
          fg={fg}
          main={main}
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 1.4,
          mb: 3,
        }}
      >
        <SectionCard border={border} bg={bg}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1.2 }}
          >
            <Typography
              sx={{
                fontSize: 11.5,
                fontWeight: 700,
                color: fg.tertiary,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Account Details
            </Typography>
            <Edit24Regular
              onClick={() => setActiveSection("profile")}
              style={{ fontSize: 15, color: main.primary, cursor: "pointer" }}
            />
          </Stack>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: fg.primary }}>
            {USER.name}
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: fg.secondary, mt: 0.3 }}>
            {USER.email}
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
            {USER.phone}
          </Typography>
        </SectionCard>

        <SectionCard border={border} bg={bg}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1.2 }}
          >
            <Typography
              sx={{
                fontSize: 11.5,
                fontWeight: 700,
                color: fg.tertiary,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Default Address
            </Typography>
            <Edit24Regular
              onClick={() => setActiveSection("addresses")}
              style={{ fontSize: 15, color: main.primary, cursor: "pointer" }}
            />
          </Stack>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: fg.primary }}>
            {DEFAULT_ADDRESS.name}
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: fg.secondary, mt: 0.3 }}>
            {DEFAULT_ADDRESS.line}
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
            {DEFAULT_ADDRESS.area}
          </Typography>
        </SectionCard>

        <SectionCard border={border} bg={bg}>
          <Typography
            sx={{
              fontSize: 11.5,
              fontWeight: 700,
              color: fg.tertiary,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              mb: 1.2,
            }}
          >
            TETYHUB Wallet
          </Typography>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: 22,
              fontWeight: 800,
              color: fg.primary,
            }}
          >
            ₦0.00
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: main.primary,
              fontWeight: 700,
              mt: 0.6,
              cursor: "pointer",
            }}
          >
            View transaction history
          </Typography>
        </SectionCard>

        <SectionCard border={border} bg={bg}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1.2 }}
          >
            <Typography
              sx={{
                fontSize: 11.5,
                fontWeight: 700,
                color: fg.tertiary,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Newsletter
            </Typography>
            <Edit24Regular
              onClick={() => setActiveSection("newsletter")}
              style={{ fontSize: 15, color: main.primary, cursor: "pointer" }}
            />
          </Stack>
          <Stack direction="row" alignItems="center" gap={0.6}>
            <CheckmarkCircle24Filled
              style={{ fontSize: 15, color: main.primary }}
            />
            <Typography
              sx={{ fontSize: 13, color: fg.primary, fontWeight: 600 }}
            >
              Subscribed to order updates & offers
            </Typography>
          </Stack>
        </SectionCard>
      </Box>

      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: 15,
          fontWeight: 800,
          color: fg.primary,
          mb: 1.6,
        }}
      >
        Recommended for you
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
        {SAMPLE_PRODUCTS.map((p) => (
          <ProductListingCard key={p.id} product={p} />
        ))}
      </Box>
    </Box>
  );
}

function OrdersSection({ navigate, bg, fg, border, main }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Confirmed", "Completed", "Cancelled"];
  const filtered =
    filter === "All" ? ORDERS : ORDERS.filter((o) => o.status === filter);

  return (
    <Box>
      <SectionHeader
        title="Orders"
        subtitle="Track, manage, and review your past orders."
        fg={fg}
      />
      <Stack direction="row" gap={1} flexWrap="wrap" sx={{ mb: 2 }}>
        {filters.map((f) => (
          <Box
            key={f}
            onClick={() => setFilter(f)}
            sx={{
              border: `1px solid ${filter === f ? main.primary : border.primary}`,
              backgroundColor: filter === f ? main.primary : "transparent",
              color: filter === f ? "#fff" : fg.primary,
              borderRadius: radiusTokens.full ?? 999,
              px: 1.6,
              py: 0.7,
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {f}
          </Box>
        ))}
      </Stack>

      {filtered.length === 0 ? (
        <SectionCard border={border} bg={bg}>
          <EmptyState
            icon={Box24Regular}
            title="No orders here"
            body="Orders matching this filter will show up here."
            fg={fg}
            main={main}
          />
        </SectionCard>
      ) : (
        <Stack gap={1.2}>
          {filtered.map((o) => (
            <SectionCard key={o.id} border={border} bg={bg}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
                gap={1}
              >
                <Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: fg.primary,
                      }}
                    >
                      {o.id}
                    </Typography>
                    <StatusPill status={o.status} />
                  </Stack>
                  <Typography
                    sx={{ fontSize: 12.5, color: fg.secondary, mt: 0.4 }}
                  >
                    {o.item} · Qty {o.qty} · {o.date}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1.6}>
                  <Typography
                    sx={{ fontSize: 14, fontWeight: 800, color: fg.primary }}
                  >
                    {money(o.total)}
                  </Typography>
                  <Box
                    onClick={() =>
                      navigate("/track-order", { state: { orderId: o.id } })
                    }
                    sx={{
                      border: `1px solid ${border.primary}`,
                      borderRadius: radiusTokens.sm ?? 8,
                      px: 1.6,
                      py: 0.7,
                      fontSize: 12,
                      fontWeight: 700,
                      color: fg.primary,
                      cursor: "pointer",
                    }}
                  >
                    View details
                  </Box>
                </Stack>
              </Stack>
            </SectionCard>
          ))}
        </Stack>
      )}
    </Box>
  );
}

function InboxSection({ bg, fg, border, main }) {
  return (
    <Box>
      <SectionHeader
        title="Inbox"
        subtitle="Messages from providers, sellers, and TETYHUB support."
        fg={fg}
      />
      <Stack gap={0}>
        {MESSAGES.map((m, i) => (
          <Stack
            key={i}
            direction="row"
            alignItems="center"
            gap={1.4}
            sx={{
              py: 1.6,
              borderBottom:
                i < MESSAGES.length - 1
                  ? `1px solid ${border.primary}`
                  : "none",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: main.primary,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 15,
                flexShrink: 0,
              }}
            >
              {m.from.charAt(0)}
            </Box>
            <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  sx={{
                    fontSize: 13.5,
                    fontWeight: m.unread ? 800 : 600,
                    color: fg.primary,
                  }}
                >
                  {m.from}
                </Typography>
                <Typography
                  sx={{ fontSize: 11, color: fg.tertiary, flexShrink: 0 }}
                >
                  {m.time}
                </Typography>
              </Stack>
              <Typography noWrap sx={{ fontSize: 12.5, color: fg.secondary }}>
                {m.preview}
              </Typography>
            </Stack>
            {m.unread && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: main.primary,
                  flexShrink: 0,
                }}
              />
            )}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

function ReviewsSection({ navigate, bg, fg, border, main }) {
  return (
    <Box>
      <SectionHeader
        title="Pending Reviews"
        subtitle="Share feedback on your completed orders."
        fg={fg}
      />
      {PENDING_REVIEWS.length === 0 ? (
        <SectionCard border={border} bg={bg}>
          <EmptyState
            icon={Star24Regular}
            title="Nothing to review"
            body="Completed orders awaiting your feedback will appear here."
            fg={fg}
            main={main}
          />
        </SectionCard>
      ) : (
        <Stack gap={1.2}>
          {PENDING_REVIEWS.map((r) => (
            <SectionCard key={r.id} border={border} bg={bg}>
              <Stack direction="row" alignItems="center" gap={1.4}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: radiusTokens.sm ?? 8,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    component="img"
                    src={r.image}
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Box>
                <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Typography
                    sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
                  >
                    {r.item}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
                    {r.provider} · {r.date}
                  </Typography>
                </Stack>
                <Box
                  onClick={() =>
                    navigate("/review", {
                      state: {
                        orderId: r.id,
                        provider: { name: r.provider },
                        items: [{ title: r.item }],
                      },
                    })
                  }
                  sx={{
                    backgroundColor: main.primary,
                    color: "#fff",
                    borderRadius: radiusTokens.sm ?? 8,
                    px: 1.8,
                    py: 0.9,
                    fontSize: 12.5,
                    fontWeight: 700,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Leave a review
                </Box>
              </Stack>
            </SectionCard>
          ))}
        </Stack>
      )}
    </Box>
  );
}

function VouchersSection({ bg, fg, border, main }) {
  const [copiedCode, setCopiedCode] = useState("");
  const copy = (code) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 1500);
  };

  return (
    <Box>
      <SectionHeader
        title="Vouchers"
        subtitle="Codes and credits available on your account."
        fg={fg}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          gap: 1.2,
        }}
      >
        {VOUCHERS.map((v) => (
          <Box
            key={v.code}
            sx={{
              border: `1px dashed ${v.used ? border.primary : main.primary}`,
              borderRadius: radiusTokens.md,
              p: 1.6,
              opacity: v.used ? 0.55 : 1,
              backgroundColor: v.used ? "transparent" : `${main.primary}06`,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 15,
                  fontWeight: 800,
                  color: fg.primary,
                  letterSpacing: "0.03em",
                }}
              >
                {v.code}
              </Typography>
              {!v.used && (
                <Copy24Regular
                  onClick={() => copy(v.code)}
                  style={{
                    fontSize: 16,
                    color: main.primary,
                    cursor: "pointer",
                  }}
                />
              )}
            </Stack>
            <Typography sx={{ fontSize: 12.5, color: fg.secondary, mt: 0.5 }}>
              {v.desc}
            </Typography>
            <Typography sx={{ fontSize: 11, color: fg.tertiary, mt: 0.6 }}>
              {copiedCode === v.code ? "Copied!" : v.expiry}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function WishlistSection({ bg, fg, border, main }) {
  return (
    <Box>
      <SectionHeader
        title="Wishlist"
        subtitle="Items you've saved for later."
        fg={fg}
      />
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
        {SAMPLE_PRODUCTS.map((p) => (
          <ProductListingCard key={p.id} product={p} />
        ))}
      </Box>
    </Box>
  );
}

function SellersSection({ bg, fg, border, main }) {
  return (
    <Box>
      <SectionHeader
        title="Followed Sellers"
        subtitle="Stores and providers you're keeping an eye on."
        fg={fg}
      />
      <Stack gap={1.2}>
        {SELLERS.map((s) => (
          <SectionCard key={s.name} border={border} bg={bg}>
            <Stack direction="row" alignItems="center" gap={1.4}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  backgroundColor: main.primary,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {s.name.charAt(0)}
              </Box>
              <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <Typography
                    sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
                  >
                    {s.name}
                  </Typography>
                  <CheckmarkCircle24Filled
                    style={{ fontSize: 14, color: main.primary }}
                  />
                </Stack>
                <Stack direction="row" alignItems="center" gap={0.4}>
                  <Star24Filled style={{ fontSize: 12, color: "#f5a623" }} />
                  <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
                    {s.rating} · {s.category}
                  </Typography>
                </Stack>
              </Stack>
              <Box
                sx={{
                  border: `1px solid ${border.primary}`,
                  borderRadius: radiusTokens.sm ?? 8,
                  px: 1.6,
                  py: 0.7,
                  fontSize: 12,
                  fontWeight: 700,
                  color: fg.primary,
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                Unfollow
              </Box>
            </Stack>
          </SectionCard>
        ))}
      </Stack>
    </Box>
  );
}

function RecentSection({ bg, fg, border, main }) {
  return (
    <Box>
      <SectionHeader
        title="Recently Viewed"
        subtitle="Pick up where you left off."
        fg={fg}
      />
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
        {SAMPLE_PRODUCTS.map((p) => (
          <ProductListingCard key={p.id} product={p} />
        ))}
      </Box>
    </Box>
  );
}

function FormField({ label, value, onChange, type = "text", border, fg }) {
  return (
    <Stack sx={{ flex: 1, minWidth: 0 }} gap={0.5}>
      <Typography sx={{ fontSize: 12, fontWeight: 600, color: fg.secondary }}>
        {label}
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
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          sx={{ fontSize: 13, width: "100%", color: fg.primary }}
        />
      </Box>
    </Stack>
  );
}

function ProfileSection({ bg, fg, border, main }) {
  const [name, setName] = useState(USER.name);
  const [email, setEmail] = useState(USER.email);
  const [phone, setPhone] = useState(USER.phone);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <Box>
      <SectionHeader
        title="Account Management"
        subtitle="Update your personal details and password."
        fg={fg}
      />
      <SectionCard border={border} bg={bg}>
        <Typography
          sx={{ fontSize: 13, fontWeight: 700, color: fg.primary, mb: 1.6 }}
        >
          Personal details
        </Typography>
        <Stack gap={1.4}>
          <FormField
            label="Full name"
            value={name}
            onChange={setName}
            border={border}
            fg={fg}
          />
          <Stack direction={{ xs: "column", sm: "row" }} gap={1.4}>
            <FormField
              label="Email address"
              value={email}
              onChange={setEmail}
              border={border}
              fg={fg}
            />
            <FormField
              label="Phone number"
              value={phone}
              onChange={setPhone}
              border={border}
              fg={fg}
            />
          </Stack>
        </Stack>

        <Box sx={{ borderTop: `1px solid ${border.primary}`, my: 2.4 }} />

        <Typography
          sx={{ fontSize: 13, fontWeight: 700, color: fg.primary, mb: 1.6 }}
        >
          Change password
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} gap={1.4}>
          <FormField
            label="Current password"
            value={currentPw}
            onChange={setCurrentPw}
            type="password"
            border={border}
            fg={fg}
          />
          <FormField
            label="New password"
            value={newPw}
            onChange={setNewPw}
            type="password"
            border={border}
            fg={fg}
          />
        </Stack>

        <Stack direction="row" alignItems="center" gap={1.4} sx={{ mt: 2.4 }}>
          <Box
            onClick={() => setSaved(true)}
            sx={{
              backgroundColor: main.primary,
              color: "#fff",
              borderRadius: radiusTokens.sm ?? 8,
              px: 2.4,
              py: 1.1,
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Save changes
          </Box>
          {saved && (
            <Stack direction="row" alignItems="center" gap={0.5}>
              <CheckmarkCircle24Filled
                style={{ fontSize: 15, color: main.primary }}
              />
              <Typography
                sx={{ fontSize: 12, color: main.primary, fontWeight: 600 }}
              >
                Saved
              </Typography>
            </Stack>
          )}
        </Stack>
      </SectionCard>
    </Box>
  );
}

function PaymentSection({ bg, fg, border, main }) {
  const [cards] = useState([
    { last4: "4242", brand: "Visa", expiry: "09/28", isDefault: true },
    { last4: "9981", brand: "Mastercard", expiry: "02/27", isDefault: false },
  ]);

  return (
    <Box>
      <SectionHeader
        title="Payment Settings"
        subtitle="Manage saved cards and default payment method."
        fg={fg}
      />
      <Stack gap={1.2} sx={{ mb: 1.6 }}>
        {cards.map((c) => (
          <SectionCard key={c.last4} border={border} bg={bg}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" gap={1.4}>
                <Box
                  sx={{
                    width: 42,
                    height: 30,
                    borderRadius: radiusTokens.sm ?? 6,
                    border: `1px solid ${border.primary}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    color: fg.secondary,
                    flexShrink: 0,
                  }}
                >
                  {c.brand}
                </Box>
                <Stack>
                  <Typography
                    sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
                  >
                    •••• {c.last4}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                    Expires {c.expiry}
                  </Typography>
                </Stack>
                {c.isDefault && (
                  <Box
                    sx={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: main.primary,
                      backgroundColor: `${main.primary}14`,
                      borderRadius: radiusTokens.full ?? 999,
                      px: 1,
                      py: 0.3,
                    }}
                  >
                    Default
                  </Box>
                )}
              </Stack>
              <Delete24Regular
                style={{ fontSize: 17, color: fg.tertiary, cursor: "pointer" }}
              />
            </Stack>
          </SectionCard>
        ))}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        gap={0.6}
        sx={{ cursor: "pointer", width: "fit-content" }}
      >
        <Add24Regular style={{ fontSize: 16, color: main.primary }} />
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: main.primary }}>
          Add new card
        </Typography>
      </Stack>
    </Box>
  );
}

function AddressesSection({ bg, fg, border, main }) {
  const addresses = [DEFAULT_ADDRESS];

  return (
    <Box>
      <SectionHeader
        title="Address Book"
        subtitle="Manage your saved delivery addresses."
        fg={fg}
      />
      <Stack gap={1.2} sx={{ mb: 1.6 }}>
        {addresses.map((a) => (
          <SectionCard key={a.label} border={border} bg={bg}>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              gap={1}
            >
              <Stack>
                <Stack direction="row" alignItems="center" gap={0.8}>
                  <Typography
                    sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}
                  >
                    {a.label}
                  </Typography>
                  <Box
                    sx={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: main.primary,
                      backgroundColor: `${main.primary}14`,
                      borderRadius: radiusTokens.full ?? 999,
                      px: 1,
                      py: 0.3,
                    }}
                  >
                    Default
                  </Box>
                </Stack>
                <Typography
                  sx={{ fontSize: 12.5, color: fg.secondary, mt: 0.5 }}
                >
                  {a.name}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                  {a.line}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                  {a.area}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                  {a.phone}
                </Typography>
              </Stack>
              <Stack direction="row" gap={1} sx={{ flexShrink: 0 }}>
                <Edit24Regular
                  style={{
                    fontSize: 16,
                    color: main.primary,
                    cursor: "pointer",
                  }}
                />
                <Delete24Regular
                  style={{
                    fontSize: 16,
                    color: fg.tertiary,
                    cursor: "pointer",
                  }}
                />
              </Stack>
            </Stack>
          </SectionCard>
        ))}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        gap={0.6}
        sx={{ cursor: "pointer", width: "fit-content" }}
      >
        <Add24Regular style={{ fontSize: 16, color: main.primary }} />
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: main.primary }}>
          Add new address
        </Typography>
      </Stack>
    </Box>
  );
}

function TogglePreference({
  label,
  description,
  checked,
  onChange,
  border,
  fg,
  main,
  disabled,
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      sx={{ py: 1.4, borderBottom: `1px solid ${border.primary}` }}
    >
      <Stack sx={{ minWidth: 0 }}>
        <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: 12, color: fg.tertiary, mt: 0.2 }}>
          {description}
        </Typography>
      </Stack>
      <Switch
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        sx={{
          "& .MuiSwitch-switchBase.Mui-checked": { color: main.primary },
          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
            backgroundColor: main.primary,
          },
        }}
      />
    </Stack>
  );
}

function NewsletterSection({ bg, fg, border, main }) {
  const [prefs, setPrefs] = useState({
    orders: true,
    promos: true,
    recs: false,
    priceDrops: true,
  });

  return (
    <Box>
      <SectionHeader
        title="Newsletter Preferences"
        subtitle="Choose what TETYHUB emails you about."
        fg={fg}
      />
      <SectionCard border={border} bg={bg}>
        <TogglePreference
          label="Order updates"
          description="Confirmations, delivery status, and receipts."
          checked={prefs.orders}
          onChange={(v) => setPrefs({ ...prefs, orders: v })}
          border={border}
          fg={fg}
          main={main}
        />
        <TogglePreference
          label="Promotions & offers"
          description="Sales, discount codes, and seasonal campaigns."
          checked={prefs.promos}
          onChange={(v) => setPrefs({ ...prefs, promos: v })}
          border={border}
          fg={fg}
          main={main}
        />
        <TogglePreference
          label="Product recommendations"
          description="Picks based on your browsing and order history."
          checked={prefs.recs}
          onChange={(v) => setPrefs({ ...prefs, recs: v })}
          border={border}
          fg={fg}
          main={main}
        />
        <Box sx={{ borderBottom: "none !important" }}>
          <TogglePreference
            label="Price drop alerts"
            description="When wishlist items go on sale."
            checked={prefs.priceDrops}
            onChange={(v) => setPrefs({ ...prefs, priceDrops: v })}
            border={{ primary: "transparent" }}
            fg={fg}
            main={main}
          />
        </Box>
      </SectionCard>
    </Box>
  );
}

function CookiesSection({ bg, fg, border, main }) {
  const [prefs, setPrefs] = useState({
    analytics: true,
    marketing: false,
    personalization: true,
  });

  return (
    <Box>
      <SectionHeader
        title="Cookie Preferences"
        subtitle="Control how TETYHUB uses cookies on this device."
        fg={fg}
      />
      <SectionCard border={border} bg={bg}>
        <TogglePreference
          label="Essential"
          description="Required for login, cart, and checkout to work."
          checked
          disabled
          border={border}
          fg={fg}
          main={main}
          onChange={() => {}}
        />
        <TogglePreference
          label="Analytics"
          description="Helps us understand how the platform is used."
          checked={prefs.analytics}
          onChange={(v) => setPrefs({ ...prefs, analytics: v })}
          border={border}
          fg={fg}
          main={main}
        />
        <TogglePreference
          label="Marketing"
          description="Used to personalize ads on other sites."
          checked={prefs.marketing}
          onChange={(v) => setPrefs({ ...prefs, marketing: v })}
          border={border}
          fg={fg}
          main={main}
        />
        <Box sx={{ "& > div": { borderBottom: "none" } }}>
          <TogglePreference
            label="Personalization"
            description="Tailors recommendations to your activity."
            checked={prefs.personalization}
            onChange={(v) => setPrefs({ ...prefs, personalization: v })}
            border={border}
            fg={fg}
            main={main}
          />
        </Box>
      </SectionCard>
      <Box
        sx={{
          mt: 1.6,
          backgroundColor: main.primary,
          color: "#fff",
          borderRadius: radiusTokens.sm ?? 8,
          px: 2.2,
          py: 1,
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        Save preferences
      </Box>
    </Box>
  );
}

function CloseAccountSection({ bg, fg, border, main }) {
  const [confirmed, setConfirmed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <Box>
      <SectionHeader
        title="Close Account"
        subtitle="Permanently delete your TETYHUB account."
        fg={fg}
      />
      <Box
        sx={{
          border: "1px solid #f2c6c6",
          backgroundColor: "#fbe9e9",
          borderRadius: radiusTokens.md,
          p: spacingTokens.md,
          mb: 2,
        }}
      >
        <Stack direction="row" gap={1.2}>
          <Warning24Regular
            style={{ fontSize: 20, color: "#c0392b", flexShrink: 0 }}
          />
          <Stack gap={0.6}>
            <Typography
              sx={{ fontSize: 13.5, fontWeight: 700, color: "#c0392b" }}
            >
              This can't be undone
            </Typography>
            <Typography
              sx={{ fontSize: 12.5, color: "#8f2f2f", lineHeight: 1.6 }}
            >
              Closing your account permanently removes your profile, order
              history, saved addresses, and wishlist. Any active bookings must
              be completed or cancelled first. You'll lose access immediately.
            </Typography>
          </Stack>
        </Stack>
      </Box>

      <Stack
        direction="row"
        alignItems="flex-start"
        gap={1}
        onClick={() => setConfirmed(!confirmed)}
        sx={{ cursor: "pointer", mb: 2 }}
      >
        <Box
          sx={{
            width: 17,
            height: 17,
            borderRadius: 4,
            border: `1.5px solid ${confirmed ? "#c0392b" : border.primary}`,
            backgroundColor: confirmed ? "#c0392b" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            mt: "1px",
          }}
        >
          {confirmed && (
            <Typography sx={{ fontSize: 11, color: "#fff", lineHeight: 1 }}>
              ✓
            </Typography>
          )}
        </Box>
        <Typography
          sx={{ fontSize: 12.5, color: fg.secondary, lineHeight: 1.5 }}
        >
          I understand this action is permanent and I want to close my TETYHUB
          account.
        </Typography>
      </Stack>

      <Box
        onClick={() => confirmed && setShowModal(true)}
        sx={{
          display: "inline-block",
          backgroundColor: confirmed ? "#c0392b" : border.primary,
          color: "#fff",
          borderRadius: radiusTokens.sm ?? 8,
          px: 2.4,
          py: 1.1,
          fontSize: 13,
          fontWeight: 700,
          cursor: confirmed ? "pointer" : "not-allowed",
        }}
      >
        Close my account
      </Box>

      {showModal && (
        <Box
          onClick={() => setShowModal(false)}
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
              maxWidth: 380,
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 16,
                fontWeight: 800,
                color: fg.primary,
                mb: 1,
              }}
            >
              Are you absolutely sure?
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                color: fg.secondary,
                lineHeight: 1.6,
                mb: 2.5,
              }}
            >
              This will immediately and permanently close your account. This
              cannot be reversed.
            </Typography>
            <Stack direction="row" gap={1}>
              <Box
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
                Yes, close it
              </Box>
              <Box
                onClick={() => setShowModal(false)}
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
                Cancel
              </Box>
            </Stack>
          </Box>
        </Box>
      )}
    </Box>
  );
}
