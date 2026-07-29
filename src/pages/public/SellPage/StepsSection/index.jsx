// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { spacingTokens, radiusTokens } from "@/lib/theme";
import { useReveal } from "../../HomePage/Hooks";

const STEPS = [
  {
    sticker: "📝",
    title: "Create your store",
    body: "Sign up, verify your details, and set up your storefront in minutes.",
  },
  {
    sticker: "📦",
    title: "List your products",
    body: "Add photos, prices, and descriptions — publish as many as you like.",
  },
  {
    sticker: "💰",
    title: "Start earning",
    body: "Buyers find you, orders come in, and payouts land in your account.",
  },
];

function StepCard({ step, index, delay }) {
  const { bg, fg, border, main } = useColor();
  const { ref, className } = useReveal();

  return (
    <Stack
      ref={ref}
      className={className}
      alignItems="center"
      textAlign="center"
      gap={1.2}
      sx={{ flex: "1 1 200px", position: "relative", animationDelay: delay }}
    >
      <Box
        sx={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 30,
          backgroundColor: bg.secondary,
          border: `2px solid ${border.primary}`,
        }}
      >
        {step.sticker}
      </Box>
      <Box
        sx={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: main.primary,
          fontSize: 11,
          fontWeight: 800,
          color: "#fff",
          // fontFamily: "Poppins",
        }}
      >
        {index + 1}
      </Box>
      <Typography
        sx={{
          // fontFamily: "Poppins",
          fontSize: 16,
          fontWeight: 700,
          color: fg.primary,
        }}
      >
        {step.title}
      </Typography>
      <Typography
        sx={{
          // fontFamily: "Poppins",
          fontSize: 13.5,
          color: fg.secondary,
          maxWidth: 220,
        }}
      >
        {step.body}
      </Typography>
    </Stack>
  );
}

export default function StepsSection() {
  const { fg, border } = useColor();

  return (
    <Box sx={{ px: { xs: 3, md: 8 }, py: 8 }}>
      <Typography
        sx={{
          // fontFamily: "Poppins",
          fontSize: { xs: 24, md: 30 },
          fontWeight: 900,
          color: fg.primary,
          textAlign: "center",
          mb: 6,
        }}
      >
        Three steps to your first sale
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        gap={{ xs: 5, md: 3 }}
        sx={{ position: "relative" }}
      >
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            top: 36,
            left: "16%",
            right: "16%",
            height: "1px",
            backgroundColor: border.primary,
            zIndex: 0,
          }}
        />
        {STEPS.map((step, i) => (
          <StepCard
            key={step.title}
            step={step}
            index={i}
            delay={`${i * 0.15}s`}
          />
        ))}
      </Stack>
    </Box>
  );
}
