import { InsightTag, DonutChart } from "@/components/shared";
import { Card } from "@/components/ui";
import { spacingTokens } from "@/lib/theme";
import { MoreHorizontalFilled } from "@fluentui/react-icons";
import { Box, CardContent, Stack, Typography } from "@mui/material";

export default function OrderInsight() {
  return (
    <Card sx={{ height: "100vh" }}>
      <Stack
        component={CardContent}
        gap={spacingTokens.md}
        padding={spacingTokens.lg}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h3" color="#63658F" fontWeight={700}>
              Orders Insight
            </Typography>
            <Typography variant="h1" color="#d9d4d4" fontWeight={900}>
              45,564.00
            </Typography>
          </Box>
          <MoreHorizontalFilled
            fontSize={26}
            color="#A2A5D6"
          ></MoreHorizontalFilled>
        </Stack>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "repeat(2, 1fr)", md: "repeat(2, 1fr)" }}
          gap={spacingTokens.lg}
          alignItems="center"
        >
          <Stack gap={spacingTokens.md}>
            <InsightTag
              color="success"
              label="Completed"
              value="65,000"
            ></InsightTag>
            <InsightTag
              color="warning"
              label="Pending"
              value="Pending"
            ></InsightTag>
            <InsightTag
              color="error"
              label="Cancelled"
              value="1500"
            ></InsightTag>
          </Stack>
          <DonutChart
            size={150}
            thickness={30}
            gap={4}
            data={[
              { percent: 60, color: "#05970F" },
              { percent: 20, color: "#FFC107" },
              { percent: 8, color: "#c80505" },
            ]}
          />
        </Box>
      </Stack>
    </Card>
  );
}
