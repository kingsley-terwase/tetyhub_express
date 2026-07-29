import { Stack, TextField, MenuItem, InputAdornment } from "@mui/material";
import { SearchRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";

export default function CustomerToolbar({
  // @ts-ignore
  search,
  // @ts-ignore
  setSearch,
  // @ts-ignore
  status,
  // @ts-ignore
  setStatus,
  // @ts-ignore
  resetPage,
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
      sx={{
        p: spacingTokens.md,
        borderBottom: `1px solid ${border.primary}`,
      }}
    >
      <TextField
        size="small"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          resetPage();
        }}
        sx={{ ...inputSx, width: 250 }}
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
          resetPage();
        }}
        sx={{ ...inputSx, width: 100 }}
      >
        {["all", "active", "suspended", "blocked"].map((s) => (
          <MenuItem key={s} value={s}>
            {s}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}
