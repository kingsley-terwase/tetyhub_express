import { Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import {
  CheckmarkCircleFilled,
  EditRegular,
  ArchiveRegular,
} from "@fluentui/react-icons";

/** @type {Record<import("../lib.jsx").ProductStatus, { icon: any, label: string }>} */
const config = {
  active: { icon: CheckmarkCircleFilled, label: "Active" },
  draft: { icon: EditRegular, label: "Draft" },
  archived: { icon: ArchiveRegular, label: "Archived" },
};

/**
 * @param {{ status: import("../lib.jsx").ProductStatus }} props
 */
export function ProductStatusChip({ status }) {
  const { main, status: s } = useColor();

  const map = {
    active: {
      color: s?.success?.primary ?? main.success,
      bg: s?.success?.secondary,
    },
    draft: {
      color: s?.warning?.primary ?? main.warning,
      bg: s?.warning?.secondary,
    },
    archived: {
      color: s?.error?.primary ?? main.error,
      bg: s?.error?.secondary,
    },
  };

  const { color, bg } = map[status] ?? map.draft;
  const { icon: Icon, label } = config[status] ?? config.draft;

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.6}
      sx={{
        display: "inline-flex",
        px: 1.2,
        py: 0.4,
        borderRadius: "999px",
        backgroundColor: bg,
        width: "fit-content",
      }}
    >
      <Icon
        fontSize={14}
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
