// @ts-nocheck
import { Box, Stack } from "@mui/material";
import { useColor } from "@/contexts/color";
import SellHero from "./SellHero";
import BenefitsGrid from "./BenefitsGrid";
import StepsSection from "./StepsSection";
import SellerTestimonials from "./SellerTestimonials";
import SellCTA from "./SellCTA";
import StatsBand from "../HomePage/StatsBand";

export default function SellPage() {
  const { bg } = useColor();

  return (
    <Stack sx={{ backgroundColor: bg.primary, minHeight: "100vh" }}>
      <SellHero />
      <BenefitsGrid />
      <Box sx={{ pb: 5 }}>
        {" "}
        <StepsSection />
      </Box>
      <Box sx={{ py: 5 }}>
        <StatsBand />
      </Box>
      <SellerTestimonials />
      <SellCTA />
    </Stack>
  );
}
