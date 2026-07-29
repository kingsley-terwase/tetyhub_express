import { spacingTokens } from "@/lib/theme";
import { Box, Stack } from "@mui/material";
import Hero from "./Hero";
import Shortcuts from "./Shortcuts";
import Insights from "./Insights";
import Projects from "./Projects";
import Tasks from "./Tasks";
import Agenda from "./Agenda";
import ClockWidget from "./ClockWidget";
import Assistance from "./Assistance";

export default function CustomerOverviewPage() {
  return (
    <Stack gap={spacingTokens.xl}>
      <Hero></Hero>
      <Shortcuts></Shortcuts>
      <Insights></Insights>
      <Projects></Projects>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }}
        gap={spacingTokens.xl}
        alignItems="start"
      >
        <Tasks></Tasks>
        <Stack gap={spacingTokens.xl}>
          <Agenda></Agenda>
          <ClockWidget></ClockWidget>
        </Stack>
        <Assistance></Assistance>
      </Box>
    </Stack>
  );
}
