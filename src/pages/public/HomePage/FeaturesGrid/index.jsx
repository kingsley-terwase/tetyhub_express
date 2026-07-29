// @ts-nocheck
import { Box, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";
// @ts-ignore
import { useReveal } from "../Hooks";
import {
  ShieldCheckmark24Regular,
  LockClosed24Regular,
  Flash24Regular,
  Headset24Regular,
} from "@fluentui/react-icons";

// Each of these encodes something true about the platform's actual
// mechanics — not decoration. If a claim here isn't backed by a real
// feature (KYC checks, escrow, payout SLA, live chat), don't ship it.

const FEATURES = [
  {
    icon: ShieldCheckmark24Regular,
    title: "Verified sellers",
    body: "Every seller passes ID and business verification before their first listing goes live.",
  },
  {
    icon: LockClosed24Regular,
    title: "Buyer protection",
    body: "Funds are held until you confirm delivery — disputes are resolved before a seller gets paid.",
  },
  {
    icon: Flash24Regular,
    title: "Fast payouts",
    body: "Sellers get paid within 48 hours of a confirmed delivery, no manual chasing required.",
  },
  {
    icon: Headset24Regular,
    title: "Real support, real fast",
    body: "A human on our team responds to every ticket in under an hour, not a bot script.",
  },
];

// @ts-ignore
function FeatureCard({ feature, delay, bg, fg, border, main }) {
  const [ref, isVisible] = useReveal({ threshold: 0.2 });
  const Icon = feature.icon;

  return (
    <Box
      // @ts-ignore
      ref={ref}
      className={`reveal-el ${isVisible ? "is-visible" : ""}`}
      sx={{
        animationDelay: `${delay}ms`,
        border: `1px solid ${border.primary}`,
        // @ts-ignore
        borderRadius: radius.lg,
        backgroundColor: bg.secondary,
        p: spacingTokens.lg,
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          // @ts-ignore
          borderRadius: radius.md,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: bg.primary,
          color: main.primary,
          mb: spacingTokens.md,
        }}
      >
        <Icon fontSize="medium" />
      </Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 17,
          color: fg.primary,
          mb: spacingTokens.xs,
        }}
      >
        {feature.title}
      </Typography>
      <Typography sx={{ fontSize: 14, color: fg.secondary, lineHeight: 1.55 }}>
        {feature.body}
      </Typography>
    </Box>
  );
}

export default function FeatureGrid() {
  const { bg, fg, border, main } = useColor();

  return (
    <Box
      sx={{
        px: { xs: spacingTokens.md, md: spacingTokens.xl },
        py: spacingTokens.xl,
        backgroundColor: bg.primary,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: spacingTokens.md,
      }}
    >
      {FEATURES.map((feature, i) => (
        <FeatureCard
          key={feature.title}
          feature={feature}
          delay={i * 100}
          bg={bg}
          fg={fg}
          border={border}
          main={main}
        />
      ))}
    </Box>
  );
}
