import { spacingTokens } from "@/lib/theme";
import { Box } from "@mui/material";
import InsightCard from "./InsightCard";

export default function Insights() {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }}
      gap={spacingTokens.xl}
    >
      <InsightCard
        color="#7CE7AC"
        label="Sales"
        subLabel="Week comparison"
        value={5}
        total={21}
        trend="up"
      ></InsightCard>
      <InsightCard
        color="#5E81F4"
        label="Leads"
        subLabel="Week comparison"
        value={2}
        total={39}
        trend="down"
      ></InsightCard>
      <InsightCard
        color="#FF808B"
        label="Income"
        subLabel="Week comparison"
        value={89}
        total={218}
        trend="up"
      ></InsightCard>
    </Box>
  );
}
