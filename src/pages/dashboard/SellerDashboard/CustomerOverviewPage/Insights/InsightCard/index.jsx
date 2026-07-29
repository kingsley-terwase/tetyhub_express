import { HorizontalBar } from "@/components/shared";
import { Card, Typography } from "@/components/ui";
import { spacingTokens } from "@/lib/theme";
import { ArrowTrendingDownRegular, ArrowTrendingRegular } from "@fluentui/react-icons";
import { CardContent, Stack } from "@mui/material";

/**
 * @param {Object} props
 * @param {"up" | "down"} props.trend
 * @param {string} props.label
 * @param {string} props.subLabel
 * @param {number} props.total
 * @param {number} props.value
 * @param {string} props.color
 */
export default function InsightCard({ label, subLabel, value, total, trend, color }) {
  let Icon =
    trend === "up" ? ArrowTrendingRegular : trend === "down" ? ArrowTrendingDownRegular : undefined;

  const iconColor = {
    up: "#05970F",
    down: "#FF0004",
  };

  return (
    <Card round={7}>
      <CardContent>
        <Stack gap={spacingTokens.md}>
          <Stack direction="row" alignItems="start" justifyContent="space-between">
            <Stack gap={spacingTokens.sm}>
              <Typography fontWeight={500} lineHeight={1}>
                {label}
              </Typography>
              <Typography color="secondary" lineHeight={1}>
                {subLabel}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="start" gap={spacingTokens.xs}>
              <Typography variant="h3" fontWeight={400} lineHeight={1}>
                {((value / total) * 100).toFixed(2)}
              </Typography>
              {Icon && <Icon fontSize={18} color={iconColor[trend]}></Icon>}
            </Stack>
          </Stack>
          <HorizontalBar strokeWidth={6} color={color} value={value} total={total}></HorizontalBar>
        </Stack>
      </CardContent>
    </Card>
  );
}
