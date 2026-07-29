import { Box, Stack, Typography } from "@mui/material";

/** @type {Record<string, import("@mui/material").ChipProps["color"]>} */
export const statusColor = {
  pending: "warning",
  processing: "info",
  completed: "success",
  cancelled: "error",
};

/**
 * @param {{ name: string, color: string }} props
 */
export function UserCell({ name, color }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          backgroundColor: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1 }}
        >
          {initials}
        </Typography>
      </Box>
      <Typography variant="body2" fontWeight={500}>
        {name}
      </Typography>
    </Stack>
  );
}

/**
 * @param {{ date: string, main: Record<string, string> }} props
 */
export function DueDateCell({ date, main }) {
  const isToday = date === "Today";
  return (
    <Typography
      variant="body2"
      fontWeight={isToday ? 600 : 400}
      sx={{ color: isToday ? main.warning : "inherit" }}
    >
      {date}
    </Typography>
  );
}

/**
 * @param {{ id: string, bg: string, fg: string }} props
 */
export function IdCell({ id, bg, fg }) {
  return (
    <Box
      sx={{
        display: "inline-block",
        px: 1,
        py: 0.3,
        borderRadius: 1,
        backgroundColor: bg,
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontFamily: "monospace",
          fontWeight: 700,
          color: fg,
        }}
      >
        #{id}
      </Typography>
    </Box>
  );
}
