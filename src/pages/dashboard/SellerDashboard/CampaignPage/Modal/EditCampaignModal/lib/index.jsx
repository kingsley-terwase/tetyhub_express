import { Box, Typography } from "@mui/material";

/**
 * @param {{ bg: any, fg: any, border: any }} colors
 * @returns {import("@mui/material").SxProps}
 */
export const makeInputSx = ({ bg, fg, border }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: bg.secondary,
    "& fieldset": { borderColor: border.primary },
    "&:hover fieldset": { borderColor: border.secondary },
  },
  "& input, & .MuiSelect-select, & textarea": {
    color: fg.primary,
    fontSize: 14,
  },
  "& .MuiFormHelperText-root": { fontSize: 11 },
});

/**
 * @param {{ fg: any }} colors
 * @returns {import("@mui/material").SxProps}
 */
export const makeLabelSx = ({ fg }) => ({
  fontSize: 12,
  fontWeight: 600,
  color: fg.secondary,
  mb: 0.5,
  display: "block",
});

/**
 * @param {{ label: string, children: import("react").ReactNode, labelSx: any }} props
 */
export function Field({ label, children, labelSx }) {
  return (
    <Box>
      <Typography component="span" sx={labelSx}>
        {label}
      </Typography>
      {children}
    </Box>
  );
}

export const CAMPAIGN_TYPES = ["email", "social", "search", "display", "video"];
export const CAMPAIGN_STATUSES = ["active", "paused", "ended"];

/** @typedef {"active"|"paused"|"ended"} CampaignStatus */

/**
 * @typedef {Object} CampaignDraft
 * @property {string} name
 * @property {CampaignStatus} status
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} budget
 * @property {string} type
 */
