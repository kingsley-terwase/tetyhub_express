import { Box } from "@mui/material";
import Hero from "./Hero";
import CategoryShowCase from "./CategoryShowCase";
import StatsBand from "./StatsBand";
import CTABanner from "./CtaBanner";
import FlashDeals from "./FlashDeals";
import TopSellers from "./TopSellers";
import FeaturedProducts from "./FeaturedProducts";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonial";

export default function HomePage() {
  return (
    <Box sx={{ overflowX: "hidden" }}>
      <Hero />
      <CategoryShowCase />
      <FlashDeals />
      <FeaturedProducts />
      <TopSellers />
      <HowItWorks />
      <StatsBand />
      <Testimonials />
      <CTABanner />
    </Box>
  );
}
