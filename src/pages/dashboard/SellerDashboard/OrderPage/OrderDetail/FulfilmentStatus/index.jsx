import { Box, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";
import { OrderTimeline } from "../../OrderTimeLine";

// @ts-ignore
export default function FulfillmentStatus({ status }) {
  const { bg, fg, border } = useColor();

  return (
    <Box
      sx={{
        borderRadius: radius[8],
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        p: spacingTokens.md,
      }}
    >
      <Typography
        variant="body2"
        fontWeight={600}
        sx={{ color: fg.primary, mb: 1.5 }}
      >
        Fulfillment Status
      </Typography>

      <OrderTimeline status={status} />
    </Box>
  );
}
