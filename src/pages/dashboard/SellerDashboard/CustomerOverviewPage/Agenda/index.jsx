import { radiusTokens, spacingTokens } from "@/lib/theme";
import { Stack } from "@mui/material";
import Checklist from "./Checklist";
import Reminders from "./Reminders";
import { useColor } from "@/contexts/color";

export default function Agenda() {
  const { theme } = useColor();
  return (
    <Stack
      gap={spacingTokens.lg}
      sx={{
        backgroundColor: theme === "dark" ? "#433108" : "#FFC64B",
        borderRadius: radiusTokens["5xl"],
        px: spacingTokens.md,
        py: spacingTokens.lg,
      }}
    >
      <Checklist></Checklist>
      <Reminders></Reminders>
    </Stack>
  );
}
