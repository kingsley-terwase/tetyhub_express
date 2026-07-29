// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import {
  Money24Filled,
  People24Filled,
  PhoneLaptop24Filled,
  ShieldCheckmark24Filled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../../HomePage/Hooks";

const BENEFITS = [
  {
    icon: People24Filled,
    color: "#3b82f6",
    title: "Reach real buyers",
    body: "Thousands of shoppers browse TETYHUB every day, actively looking to buy.",
  },
  {
    icon: Money24Filled,
    color: "#ec4899",
    title: "Get paid fast",
    body: "Payouts land in your account within 48 hours of a completed order.",
  },
  {
    icon: PhoneLaptop24Filled,
    color: "#10b981",
    title: "Run it from your phone",
    body: "List products, track orders, and chat with buyers — all from one app.",
  },
  {
    icon: ShieldCheckmark24Filled,
    color: "#f59e0b",
    title: "Sell with confidence",
    body: "Buyer protection and secure payments mean fewer disputes for you.",
  },
];

function BenefitCard({ benefit, delay }) {
  const { bg, fg, border } = useColor();
  const { ref, className } = useReveal();
  const Icon = benefit.icon;

  return (
    <Stack
      ref={ref}
      className={className}
      gap={1.2}
      sx={{
        flex: "1 1 240px",
        p: 3,
        borderRadius: radiusTokens.lg,
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        animationDelay: delay,
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0 16px 30px -16px ${benefit.color}55`,
        },
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `${benefit.color}1a`,
        }}
      >
        <Icon style={{ fontSize: 22, color: benefit.color }} />
      </Box>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: fg.primary,
        }}
      >
        {benefit.title}
      </Typography>
      <Typography
        sx={{
          fontSize: 13.5,
          color: fg.secondary,
          lineHeight: 1.6,
        }}
      >
        {benefit.body}
      </Typography>
    </Stack>
  );
}

export default function BenefitsGrid() {
  const { fg, main } = useColor();

  return (
    <Box sx={{ px: { xs: 3, md: 8 }, py: 8 }}>
      <Typography
        sx={{
          fontSize: { xs: 24, md: 30 },
          fontWeight: 900,
          color: fg.primary,
          textAlign: "center",
          mb: 5,
        }}
      >
        Why sellers love TETY <span style={{ color: main.primary }}>HUB</span>
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2.5}>
        {BENEFITS.map((b, i) => (
          <BenefitCard key={b.title} benefit={b} delay={`${i * 0.1}s`} />
        ))}
      </Stack>
    </Box>
  );
}
