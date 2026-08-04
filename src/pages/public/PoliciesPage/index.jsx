// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import {
  ChevronUp24Filled,
  Print24Regular,
  DocumentText24Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";

const LAST_UPDATED = "August 1, 2026";

const DOCS = {
  terms: {
    label: "Terms of Service",
    sections: [
      {
        id: "intro",
        title: "1. Introduction",
        body: "These Terms govern your use of TETYHUB, a marketplace connecting buyers, sellers, and service professionals. By creating an account, you agree to these Terms in full.",
      },
      {
        id: "definitions",
        title: "2. Definitions",
        body: '"Buyer" refers to anyone purchasing products or booking services. "Seller" refers to anyone listing products or offering services. "Platform" refers to TETYHUB\'s website and applications.',
      },
      {
        id: "accounts",
        title: "3. Account Registration",
        body: "You must provide accurate information when creating an account and are responsible for keeping your login credentials secure. You must be at least 18 years old to register.",
      },
      {
        id: "buyer-responsibilities",
        title: "4. Buyer Responsibilities",
        body: "Buyers agree to provide accurate delivery information, pay for orders in full at checkout, and communicate respectfully with sellers regarding any issues.",
      },
      {
        id: "seller-responsibilities",
        title: "5. Seller Responsibilities",
        body: "Sellers agree to accurately describe products and services, fulfill orders within stated timeframes, and comply with all applicable consumer protection laws.",
      },
      {
        id: "fees",
        title: "6. Fees & Payments",
        body: "TETYHUB charges a commission on completed sales as outlined in your seller dashboard. Payouts are processed within 48 hours of order completion, subject to standard verification checks.",
      },
      {
        id: "prohibited",
        title: "7. Prohibited Conduct",
        body: "Users may not list counterfeit, illegal, or restricted items, misrepresent their identity, or attempt to circumvent TETYHUB's payment system for a transaction initiated on the platform.",
      },
      {
        id: "returns",
        title: "8. Returns & Refunds",
        body: "Return eligibility varies by seller and product category. See our Refund & Return Policy tab for full details on timeframes and conditions.",
      },
      {
        id: "liability",
        title: "9. Limitation of Liability",
        body: "TETYHUB facilitates transactions between buyers and sellers but is not a party to the underlying sale. Our liability for any claim is limited to the amount paid for the relevant order.",
      },
      {
        id: "disputes",
        title: "10. Dispute Resolution",
        body: "Most disputes are resolved through our in-app resolution center. Unresolved disputes may be escalated to binding arbitration in accordance with local consumer protection law.",
      },
      {
        id: "termination",
        title: "11. Termination",
        body: "TETYHUB may suspend or terminate accounts that violate these Terms. Users may close their account at any time, subject to completion of any pending orders.",
      },
      {
        id: "changes",
        title: "12. Changes to These Terms",
        body: "We may update these Terms from time to time. Continued use of the platform after changes take effect constitutes acceptance of the revised Terms.",
      },
      {
        id: "contact-terms",
        title: "13. Contact Us",
        body: "Questions about these Terms can be sent to support@tetyhub.com or through our Contact page.",
      },
    ],
  },
  privacy: {
    label: "Privacy Policy",
    sections: [
      {
        id: "collect",
        title: "1. Information We Collect",
        body: "We collect information you provide directly (name, email, payment details) and information generated through your use of the platform (browsing activity, order history, device information).",
      },
      {
        id: "use",
        title: "2. How We Use Your Information",
        body: "We use your information to process orders, personalize your experience, prevent fraud, and communicate important updates about your account or orders.",
      },
      {
        id: "cookies",
        title: "3. Cookies & Tracking",
        body: "We use cookies to keep you logged in, remember preferences, and understand how the platform is used. You can control cookie settings through your browser at any time.",
      },
      {
        id: "sharing",
        title: "4. How We Share Information",
        body: "We share order details with the relevant seller to fulfill your purchase, and with payment processors to complete transactions. We do not sell your personal data to third parties.",
      },
      {
        id: "security",
        title: "5. Data Security",
        body: "We use industry-standard encryption and access controls to protect your data. No system is completely secure, and we encourage strong, unique passwords for your account.",
      },
      {
        id: "rights",
        title: "6. Your Rights",
        body: "You may request a copy of your data, ask us to correct inaccuracies, or request account deletion at any time by contacting support@tetyhub.com.",
      },
      {
        id: "children",
        title: "7. Children's Privacy",
        body: "TETYHUB is not intended for users under 18. We do not knowingly collect personal information from children.",
      },
      {
        id: "changes-privacy",
        title: "8. Changes to This Policy",
        body: "We'll notify you of material changes to this policy via email or an in-app notice before they take effect.",
      },
      {
        id: "contact-privacy",
        title: "9. Contact Us",
        body: "For privacy-related questions, reach us at privacy@tetyhub.com.",
      },
    ],
  },
  refunds: {
    label: "Refund & Return Policy",
    sections: [
      {
        id: "eligibility",
        title: "1. Return Eligibility",
        body: "Most physical products can be returned within 7 days of delivery if unused and in original packaging. Perishable goods, custom orders, and digital services are generally non-returnable unless defective.",
      },
      {
        id: "process",
        title: "2. How to Request a Return",
        body: "Start a return from your Orders page. Select the item, choose a reason, and follow the prompts. The seller has 48 hours to respond to your request.",
      },
      {
        id: "refund-timing",
        title: "3. Refund Timing",
        body: "Once a return is approved and the item is received back, refunds are processed within 5–7 business days to your original payment method.",
      },
      {
        id: "services-refunds",
        title: "4. Service Bookings",
        body: "Service bookings can be cancelled free of charge up to 24 hours before the scheduled time. Cancellations within 24 hours may be subject to the professional's cancellation policy.",
      },
      {
        id: "disputes-refunds",
        title: "5. Disputes",
        body: "If a seller doesn't respond to a return request within 48 hours, it's automatically escalated to TETYHUB support for resolution.",
      },
      {
        id: "contact-refunds",
        title: "6. Contact Us",
        body: "Questions about a specific order can be directed to support@tetyhub.com with your order number.",
      },
    ],
  },
};

function useScrollSpy(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}

export default function PoliciesPage() {
  const { bg, fg, border, main } = useColor();
  const [docKey, setDocKey] = useState("terms");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const doc = DOCS[docKey];
  const sectionIds = doc.sections.map((s) => s.id);
  const active = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box sx={{ backgroundColor: bg.primary }}>
      {/* hero */}
      <Box
        sx={{
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pt: { xs: 7, md: 9 },
          pb: 5,
          textAlign: "center",
        }}
      >
        <Stack alignItems="center" gap={1.5} sx={{ maxWidth: 560, mx: "auto" }}>
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: radiusTokens.full ?? 999,
              border: `1px solid ${main.primary}55`,
              backgroundColor: `${main.primary}0d`,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: main.primary,
              }}
            >
              LEGAL & POLICIES
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "Syne",
              fontSize: { xs: 28, md: 40 },
              fontWeight: 700,
              color: fg.primary,
              lineHeight: 1.15,
            }}
          >
            Clear terms, no surprises
          </Typography>
          <Typography
            sx={{ fontFamily: "Poppins", fontSize: 14, color: fg.tertiary }}
          >
            Last updated {LAST_UPDATED}
          </Typography>
        </Stack>
      </Box>

      {/* document switcher */}
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap={1}
        sx={{ px: 3, mb: 5 }}
      >
        {Object.entries(DOCS).map(([key, d]) => (
          <Box
            key={key}
            onClick={() => setDocKey(key)}
            sx={{
              px: 2,
              py: 0.9,
              borderRadius: radiusTokens.full ?? 999,
              cursor: "pointer",
              fontFamily: "Poppins",
              fontSize: 13.5,
              fontWeight: 700,
              color: docKey === key ? "#fff" : fg.secondary,
              backgroundColor: docKey === key ? main.primary : bg.secondary,
              border: `1px solid ${docKey === key ? main.primary : border.primary}`,
              transition: "all 0.2s ease",
            }}
          >
            {d.label}
          </Box>
        ))}
      </Stack>

      <Box
        sx={{
          display: "flex",
          gap: spacingTokens.xl,
          px: { xs: spacingTokens.md, md: spacingTokens.xl },
          pb: 10,
        }}
      >
        {/* sticky sidebar TOC */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: 240,
            flexShrink: 0,
          }}
        >
          <Box sx={{ position: "sticky", top: 100 }}>
            <Stack direction="row" alignItems="center" gap={0.8} sx={{ mb: 2 }}>
              <DocumentText24Filled
                style={{ fontSize: 16, color: main.primary }}
              />
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  color: fg.tertiary,
                }}
              >
                ON THIS PAGE
              </Typography>
            </Stack>
            <Stack gap={0.3}>
              {doc.sections.map((s) => (
                <Box
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  sx={{
                    px: 1.4,
                    py: 0.7,
                    borderRadius: radiusTokens.sm,
                    cursor: "pointer",
                    fontFamily: "Poppins",
                    fontSize: 13,
                    fontWeight: active === s.id ? 700 : 500,
                    color: active === s.id ? main.primary : fg.secondary,
                    backgroundColor:
                      active === s.id ? `${main.primary}12` : "transparent",
                    borderLeft: `2px solid ${active === s.id ? main.primary : "transparent"}`,
                    transition: "all 0.2s ease",
                    "&:hover": { backgroundColor: bg.secondary },
                  }}
                >
                  {s.title}
                </Box>
              ))}
            </Stack>
            <Button
              onClick={() => window.print()}
              startIcon={<Print24Regular style={{ fontSize: 15 }} />}
              sx={{
                mt: 3,
                textTransform: "none",
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: 12.5,
                color: fg.secondary,
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.sm,
              }}
            >
              Print this page
            </Button>
          </Box>
        </Box>

        {/* content */}
        <Box sx={{ flex: 1, minWidth: 0, maxWidth: 720 }}>
          {doc.sections.map((s) => (
            <Box
              key={s.id}
              id={s.id}
              sx={{
                mb: 4,
                pb: 4,
                borderBottom: `1px solid ${border.primary}`,
                "&:last-of-type": { borderBottom: "none" },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 19,
                  fontWeight: 700,
                  color: fg.primary,
                  mb: 1.2,
                }}
              >
                {s.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: 14.5,
                  color: fg.secondary,
                  lineHeight: 1.8,
                }}
              >
                {s.body}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* back to top */}
      {showBackToTop && (
        <Box
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          sx={{
            position: "fixed",
            bottom: 28,
            right: 28,
            width: 44,
            height: 44,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: main.primary,
            cursor: "pointer",
            boxShadow: "0 8px 20px -6px rgba(0,0,0,0.35)",
            zIndex: 10,
          }}
        >
          <ChevronUp24Filled style={{ fontSize: 20, color: "#fff" }} />
        </Box>
      )}
    </Box>
  );
}
