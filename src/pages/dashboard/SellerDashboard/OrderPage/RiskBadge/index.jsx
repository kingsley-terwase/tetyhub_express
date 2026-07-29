import { Stack, Typography } from "@mui/material";
import {
  ShieldCheckmarkRegular,
  ShieldRegular,
  ShieldErrorRegular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";

/** @type {Record<string, { icon: any, label: string, kind: string }>} */
const config = {
  low: {
    icon: ShieldCheckmarkRegular,
    label: "Low",
    kind: "",
  },
  medium: {
    icon: ShieldRegular,
    label: "Medium",
    kind: "",
  },
  high: {
    icon: ShieldErrorRegular,
    label: "High",
    kind: "",
  },
};

/**
 * @param {{ risk: "low" | "medium" | "high" }} props
 */
export function RiskBadge({ risk = "low" }) {
  const { main, status: s } = useColor();

  const colorMap = {
    low: {
      color: s?.success?.primary ?? main.success,
      bg: s?.success?.secondary,
    },
    medium: {
      color: s?.warning?.primary ?? main.warning,
      bg: s?.warning?.secondary,
    },
    high: { color: s?.error?.primary ?? main.error, bg: s?.error?.secondary },
  };

  const { color, bg } = colorMap[risk] ?? colorMap.low;
  const { icon: Icon, label } = config[risk] ?? config.low;

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.5}
      sx={{
        display: "inline-flex",
        px: 1,
        py: 0.3,
        borderRadius: "999px",
        backgroundColor: bg,
        width: "fit-content",
      }}
    >
      <Icon
        fontSize={13}
        color={color}
        style={{ display: "block", flexShrink: 0 }}
      />
      <Typography
        variant="caption"
        fontWeight={600}
        sx={{ color, lineHeight: 1 }}
      >
        {label}
      </Typography>
    </Stack>
  );
}
