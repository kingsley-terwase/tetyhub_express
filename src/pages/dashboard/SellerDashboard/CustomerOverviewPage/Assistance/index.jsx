import { radiusTokens, spacingTokens } from "@/lib/theme";
import {
  CircleSparkleRegular,
  DocumentOnePageSparkleRegular,
  FlowSparkleRegular,
  SettingsCogMultipleRegular,
} from "@fluentui/react-icons";
import { Box, Stack } from "@mui/material";
import Suggestion from "./Suggestion";
import { Typography } from "@/components/ui";
import MessageInput from "./MessageInput";
import useColor from "@/contexts/color/useColor";

const suggestions = [
  { label: "Text Assistance", icon: DocumentOnePageSparkleRegular, color: "#7DBBFF" },
  { label: "Process Automation", icon: SettingsCogMultipleRegular, color: "#F1592A" },
  { label: "Schedule Optimization", icon: CircleSparkleRegular, color: "#22C55E" },
  { label: "Smart Response", icon: FlowSparkleRegular, color: "#3B009D" },
];

export default function Assistance() {
  const { theme } = useColor();
  return (
    <Stack
      gap={spacingTokens.lg}
      sx={{
        backgroundColor: theme === "dark" ? "#031e3b" : "#81b5ec",
        borderRadius: radiusTokens["5xl"],
        px: spacingTokens.md,
        py: spacingTokens.lg,
      }}
    >
      <Stack alignItems="center" justifyContent="center" gap={spacingTokens.sm}>
        <Typography textAlign="center" fontWeight={400} lineHeight={1} color="secondary">
          Hi Jeho 🥳
        </Typography>
        <Typography textAlign="center" variant="h3" lineHeight={1} fontWeight={600}>
          Need Assistance?
        </Typography>
      </Stack>
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={spacingTokens.md}>
        {suggestions.map((item, index) => (
          <Suggestion key={index} {...item} />
        ))}
      </Box>
      <MessageInput></MessageInput>
    </Stack>
  );
}
