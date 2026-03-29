import { Stack, Typography, Select, MenuItem, IconButton } from "@mui/material";
import { ChevronLeftRegular, ChevronRightRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";

/**
 * @param {{
 *   page:       number,
 *   perPage:    number,
 *   totalPages: number,
 *   total:      number,
 *   setPage:    (p: number) => void,
 *   setPerPage: (n: number) => void,
 * }} props
 */
export default function TablePagination({
  page,
  perPage,
  totalPages,
  total,
  setPage,
  setPerPage,
}) {
  const { fg, bg, border } = useColor();

  const from = Math.min((page - 1) * perPage + 1, total);
  const to = Math.min(page * perPage, total);

  const selectSx = {
    fontSize: 13,
    color: fg.primary,
    height: 32,
    "& .MuiOutlinedInput-notchedOutline": { borderColor: border.primary },
    "& .MuiSelect-icon": { color: fg.tertiary },
  };

  const btnSx = (/** @type {boolean} */ disabled) => ({
    width: 30,
    height: 30,
    borderRadius: 1,
    border: `1px solid ${border.primary}`,
    color: disabled ? fg.tertiary : fg.primary,
    "&:hover": { backgroundColor: bg.tertiary },
  });

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={1}
      sx={{
        px: spacingTokens.md,
        py: spacingTokens.sm,
        borderTop: `1px solid ${border.primary}`,
      }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant="caption" sx={{ color: fg.tertiary }}>
          Rows per page:
        </Typography>
        <Select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          sx={selectSx}
          size="small"
        >
          {[5, 10, 20, 50].map((n) => (
            <MenuItem key={n} value={n} sx={{ fontSize: 13 }}>
              {n}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography variant="caption" sx={{ color: fg.tertiary }}>
          {from}–{to} of {total}
        </Typography>
        <IconButton
          size="small"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          sx={btnSx(page === 1)}
        >
          <ChevronLeftRegular fontSize={16} />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          sx={btnSx(page === totalPages)}
        >
          <ChevronRightRegular fontSize={16} />
        </IconButton>
      </Stack>
    </Stack>
  );
}
