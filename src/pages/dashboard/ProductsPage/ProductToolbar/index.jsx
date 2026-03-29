import { Stack, TextField, MenuItem, InputAdornment } from "@mui/material";
import { SearchRegular, AddRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";

/**
 * @param {{
 *   search:      string,
 *   onSearch:    (v: string) => void,
 *   filter:      string,
 *   onFilter:    (v: string) => void,
 *   onAdd:       () => void,
 * }} props
 */
export function ProductsToolbar({ search, onSearch, filter, onFilter, onAdd }) {
  const { fg, bg, border, main } = useColor();

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: bg.secondary,
      "& fieldset": { borderColor: border.primary },
      "&:hover fieldset": { borderColor: fg.tertiary },
    },
    "& input, & .MuiSelect-select": { color: fg.primary, fontSize: 14 },
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={spacingTokens.sm}
      flexWrap="wrap"
    >
      <TextField
        size="small"
        placeholder="Search products…"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        sx={{ ...inputSx, width: 240 }}
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
        value={filter}
        onChange={(e) => onFilter(e.target.value)}
        sx={{ ...inputSx, width: 140 }}
      >
        {["all", "active", "draft", "archived"].map((s) => (
          <MenuItem
            key={s}
            value={s}
            sx={{ fontSize: 14, textTransform: "capitalize" }}
          >
            {s === "all" ? "All Status" : s}
          </MenuItem>
        ))}
      </TextField>

      <Stack
        direction="row"
        alignItems="center"
        gap={0.6}
        onClick={onAdd}
        sx={{
          ml: "auto",
          px: 1.5,
          py: 0.8,
          borderRadius: 1.5,
          cursor: "pointer",
          backgroundColor: main.primary,
          "&:hover": { opacity: 0.9 },
        }}
      >
        <AddRegular fontSize={16} color="#fff" />
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
          Add Product
        </span>
      </Stack>
    </Stack>
  );
}
