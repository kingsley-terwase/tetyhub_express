import { BarChart, InsightTag } from "@/components/shared";
import { Card } from "@/components/ui";
import { spacingTokens } from "@/lib/theme";
import { MoreHorizontalFilled } from "@fluentui/react-icons";
import { Box, CardContent, Stack, Typography } from "@mui/material";

export default function Transactions() {
  return (
    <Card>
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
          <Typography variant="h3" color="#63658F" fontWeight={700}>
            Transactions
          </Typography>
          <MoreHorizontalFilled
            fontSize={26}
            color="#A2A5D6"
          ></MoreHorizontalFilled>
        </Stack>
        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }}
          gap={spacingTokens.lg}
          alignItems="center"
        >
          <Stack gap={spacingTokens.md}>
            <InsightTag
              color="success"
              label="Successful"
              value="65,000"
            ></InsightTag>
            <InsightTag
              color="error"
              label="Unsuccessful"
              value="1500"
            ></InsightTag>
          </Stack>

          <Stack alignItems="end" justifyContent="end">
            <BarChart
              data={[
                { value: 25, color: "#FF0000" },
                { value: 75, color: "#008000" },
              ]}
              total={100}
              align="end"
            />
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}
