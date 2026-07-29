import { Box } from "@mui/material";

/** @param {{ bg: any, fg: any, border: any }} c */
export const makeInputSx = ({ bg, fg, border }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: bg.secondary,
    "& fieldset": { borderColor: border.primary },
    "&:hover fieldset": { borderColor: border.secondary },
  },
  "& input, & .MuiSelect-select, & textarea": {
    color: fg.primary,
    fontSize: 13,
  },
  "& .MuiFormHelperText-root": { fontSize: 11 },
});

/** @param {{ fg: any }} c */
export const makeLabelSx = ({ fg }) => ({
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: fg.tertiary,
  mb: 0.5,
  display: "block",
});

const STATUS_MAP = {
  active: { bg: "#d1fae5", fg: "#065f46", dot: "#10b981" },
  suspended: { bg: "#fef9c3", fg: "#854d0e", dot: "#eab308" },
  blocked: { bg: "#fee2e2", fg: "#991b1b", dot: "#ef4444" },
};

/**
 * @param {{ status: string }} props
 */
export function StatusBadge({ status }) {
  // @ts-ignore
  const s = STATUS_MAP[status] ?? STATUS_MAP.suspended;
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        px: 1.2,
        py: 0.35,
        borderRadius: "999px",
        backgroundColor: s.bg,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: s.dot,
        }}
      />
      <Box
        component="span"
        sx={{
          fontSize: 11,
          fontWeight: 700,
          color: s.fg,
          textTransform: "capitalize",
        }}
      >
        {status}
      </Box>
    </Box>
  );
}
