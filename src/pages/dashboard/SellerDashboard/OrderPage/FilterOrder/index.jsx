import {
  Box,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { SearchRegular } from "@fluentui/react-icons";

import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";

/**
 * @param {Object} props
 * @param {string} props.status
 * @param {(v:string)=>void} props.setStatus
 * @param {string} props.risk
 * @param {(v:string)=>void} props.setRisk
 * @param {string[]} props.selected
 */
export default function FilterOrder({
  status,
  setStatus,
  risk,
  setRisk,
  selected,
  // @ts-ignore
  search,
  // @ts-ignore
  setSearch,
  // @ts-ignore
  onResetPage,
}) {
  const { bg, fg, border } = useColor();

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: bg.secondary,
      "& fieldset": { borderColor: border.primary },
    },
    "& input, & .MuiSelect-select": {
      color: fg.primary,
      fontSize: 14,
    },
  };

  return (
    <Stack
      direction="row"
      gap={1}
      flexWrap="wrap"
      alignItems="center"
      sx={{
        p: spacingTokens.md,
        borderBottom: `1px solid ${border.primary}`,
      }}
    >
      <TextField
        size="small"
        placeholder="Search by order ID or customer…"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onResetPage();
        }}
        sx={{ ...inputSx, width: 280 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRegular fontSize={16} color={fg.tertiary} />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        select
        size="small"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          onResetPage();
        }}
        sx={{ ...inputSx, width: 150 }}
      >
        {[
          "all",
          "pending",
          "processing",
          "shipped",
          "completed",
          "cancelled",
          "refunded",
        ].map((s) => (
          <MenuItem
            key={s}
            value={s}
            sx={{ fontSize: 13, textTransform: "capitalize" }}
          >
            {s === "all" ? "All Status" : s}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        size="small"
        value={risk}
        onChange={(e) => {
          setRisk(e.target.value);
          onResetPage();
        }}
        sx={{ ...inputSx, width: 130 }}
      >
        {["all", "low", "medium", "high"].map((r) => (
          <MenuItem
            key={r}
            value={r}
            sx={{ fontSize: 13, textTransform: "capitalize" }}
          >
            {r === "all" ? "All Risk" : r}
          </MenuItem>
        ))}
      </TextField>

      {selected.length > 0 && (
        <Box
          sx={{
            ml: "auto",
            px: 1.5,
            py: 0.7,
            borderRadius: 1.5,
            backgroundColor: bg.tertiary,
            border: `1px solid ${border.primary}`,
          }}
        >
          <Typography
            variant="caption"
            fontWeight={600}
            sx={{ color: fg.secondary }}
          >
            {selected.length} selected
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
