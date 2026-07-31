// @ts-nocheck
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography, InputBase } from "@mui/material";
import {
  ArrowLeft24Regular,
  Search24Regular,
  ChevronDown24Regular,
  Chat24Regular,
  ArrowRight24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FAQ_CATEGORIES = [
  {
    key: "bookings",
    label: "Bookings & payments",
    items: [
      {
        q: "How do I book a service?",
        a: "Find a provider on the Services page, choose a package, add it to your cart, and complete checkout with your contact details, address, and preferred date and time.",
      },
      {
        q: "When am I charged?",
        a: "Your payment is taken at checkout but held securely — it's only released to the provider once you mark the job as complete.",
      },
      {
        q: "What payment methods are accepted?",
        a: "Debit/credit cards, bank transfer, USSD, and for select providers, pay-on-completion.",
      },
    ],
  },
  {
    key: "cancellations",
    label: "Cancellations & refunds",
    items: [
      {
        q: "Can I cancel a booking?",
        a: "Yes — cancel for free up to 48 hours before your scheduled time from the order's tracking page. Later cancellations may be subject to a partial charge.",
      },
      {
        q: "How long do refunds take?",
        a: "Refunds return to your original payment method within 3–5 business days of approval.",
      },
      {
        q: "Can I reschedule instead of cancelling?",
        a: "Yes — open the order's tracking page and use 'Reschedule' under booking details to pick a new date and time.",
      },
    ],
  },
  {
    key: "providers",
    label: "Providers & trust",
    items: [
      {
        q: "Are providers verified?",
        a: "Every provider completes ID and background verification before they can accept their first booking.",
      },
      {
        q: "What if my provider doesn't show up?",
        a: "Report it immediately from the order page — you'll be eligible for a full refund and we'll follow up with the provider.",
      },
      {
        q: "How are ratings calculated?",
        a: "Ratings only come from buyers with a confirmed, completed booking — never paid placements or unverified reviews.",
      },
    ],
  },
  {
    key: "account",
    label: "Account & security",
    items: [
      {
        q: "Is my payment information secure?",
        a: "Yes — checkout is encrypted and PCI-compliant, and TETYHUB never stores your full card details.",
      },
      {
        q: "How do I update my contact details?",
        a: "Go to your account settings to update your name, email, phone number, and saved addresses.",
      },
      {
        q: "How do I delete my account?",
        a: "Contact support through live chat and our team will guide you through account deletion and data removal.",
      },
    ],
  },
];

export default function FAQPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].key);
  const [openIndex, setOpenIndex] = useState(0);

  const filtered = useMemo(() => {
    if (!query.trim()) {
      return FAQ_CATEGORIES.find((c) => c.key === activeCategory)?.items || [];
    }
    const q = query.toLowerCase();
    return FAQ_CATEGORIES.flatMap((c) => c.items).filter(
      (item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q),
    );
  }, [query, activeCategory]);

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      {/* header */}
      <Box
        sx={{
          textAlign: "center",
          px: spacingTokens.md,
          pt: { xs: 5, md: 7 },
          pb: { xs: 4, md: 5 },
        }}
      >
        <Typography
          sx={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: { xs: 26, md: 34 },
            color: fg.primary,
            mb: 1,
          }}
        >
          How can we help?
        </Typography>
        <Typography
          sx={{
            fontSize: 14,
            color: fg.secondary,
            maxWidth: 460,
            mx: "auto",
            mb: 3,
          }}
        >
          Answers to the most common questions about bookings, payments, and
          providers.
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          sx={{
            maxWidth: 480,
            mx: "auto",
            backgroundColor: bg.secondary,
            border: `1px solid ${border.primary}`,
            borderRadius: radiusTokens.md,
            px: 2,
            py: 1.1,
          }}
        >
          <Search24Regular style={{ fontSize: 18, color: fg.secondary }} />
          <InputBase
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a topic..."
            sx={{ fontSize: 14, flexGrow: 1, color: fg.primary }}
          />
        </Stack>
      </Box>

      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: { xs: 6, md: 8 },
          maxWidth: 720,
          mx: "auto",
        }}
      >
        {/* category tabs */}
        {!query.trim() && (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            justifyContent="center"
            sx={{ mb: 3.5 }}
          >
            {FAQ_CATEGORIES.map((cat) => {
              const active = activeCategory === cat.key;
              return (
                <Box
                  key={cat.key}
                  onClick={() => {
                    setActiveCategory(cat.key);
                    setOpenIndex(0);
                  }}
                  sx={{
                    border: `1px solid ${active ? main.primary : border.primary}`,
                    backgroundColor: active ? main.primary : "transparent",
                    color: active ? "#fff" : fg.primary,
                    borderRadius: radiusTokens.full ?? 999,
                    px: 1.8,
                    py: 0.8,
                    fontSize: 12.5,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {cat.label}
                </Box>
              );
            })}
          </Stack>
        )}

        {/* results */}
        {filtered.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              fontSize: 13.5,
              color: fg.tertiary,
              py: 4,
            }}
          >
            No answers matched "{query}" — try a different search or chat with
            support below.
          </Typography>
        ) : (
          <Stack gap={1} sx={{ mb: 4 }}>
            {filtered.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <Box
                  key={item.q}
                  sx={{
                    border: `1px solid ${border.primary}`,
                    borderRadius: radiusTokens.md,
                    overflow: "hidden",
                    animation: `${fadeUp} 0.25s ease-out both`,
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    sx={{ px: 2, py: 1.6, cursor: "pointer" }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: fg.primary,
                        pr: 1.5,
                      }}
                    >
                      {item.q}
                    </Typography>
                    <ChevronDown24Regular
                      style={{
                        fontSize: 16,
                        color: fg.tertiary,
                        flexShrink: 0,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </Stack>
                  {isOpen && (
                    <Box
                      sx={{
                        px: 2,
                        pb: 1.8,
                        animation: `${fadeUp} 0.2s ease-out both`,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: fg.secondary,
                          lineHeight: 1.65,
                        }}
                      >
                        {item.a}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Stack>
        )}

        {/* support cta */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          onClick={() => navigate("/support/chat")}
          sx={{
            border: `1px solid ${border.primary}`,
            backgroundColor: bg.secondary,
            borderRadius: radiusTokens.md,
            px: 2.2,
            py: 1.8,
            cursor: "pointer",
            "&:hover": { borderColor: main.primary },
          }}
        >
          <Stack direction="row" alignItems="center" gap={1.4}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: `${main.primary}14`,
                color: main.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Chat24Regular style={{ fontSize: 19 }} />
            </Box>
            <Stack>
              <Typography
                sx={{ fontSize: 14, fontWeight: 700, color: fg.primary }}
              >
                Still need help?
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                Chat with TETYHUB support — usually replies in minutes.
              </Typography>
            </Stack>
          </Stack>
          <ArrowRight24Regular
            style={{ fontSize: 17, color: main.primary, flexShrink: 0 }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
