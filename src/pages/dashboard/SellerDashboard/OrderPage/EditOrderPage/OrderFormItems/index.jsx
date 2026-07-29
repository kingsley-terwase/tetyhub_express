import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  AddRegular,
  DeleteRegular,
  BoxRegular,
  SearchRegular,
} from "@fluentui/react-icons";

/** @type {import("../UseOrderForm").OrderItem[]} */
const catalog = [
  {
    id: "P001",
    name: "Wireless Headphones",
    sku: "WH-BLK",
    qty: 1,
    price: 120.0,
  },
  { id: "P002", name: "Smart Watch", sku: "SW-SLV", qty: 1, price: 299.0 },
  { id: "P003", name: "Leather Wallet", sku: "LW-BRN", qty: 1, price: 45.0 },
  { id: "P004", name: "Running Sneakers", sku: "RS-WHT", qty: 1, price: 89.0 },
  { id: "P005", name: "Coffee Maker", sku: "CM-BLK", qty: 1, price: 199.0 },
];

/**
 * @param {{
 *   items:      import("../UseOrderForm").OrderItem[],
 *   error:      string | undefined,
 *   onAdd:      (item: import("../UseOrderForm").OrderItem) => void,
 *   onRemove:   (id: string) => void,
 *   onQtyChange:(id: string, qty: number) => void,
 *   fg:         any,
 *   bg:         any,
 *   border:     any,
 *   main:       any,
 * }} props
 */
export function OrderFormItems({
  items,
  error,
  onAdd,
  onRemove,
  onQtyChange,
  fg,
  bg,
  border,
  main,
}) {
  const [search, setSearch] = useState("");

  const results = catalog.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()),
  );

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: bg.secondary,
      "& fieldset": { borderColor: border.primary },
    },
    "& input": { color: fg.primary, fontSize: 13 },
  };

  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={1.5}
      >
        <Typography variant="body2" fontWeight={700} sx={{ color: fg.primary }}>
          Products
        </Typography>
        {error && (
          <Typography variant="caption" sx={{ color: main.error }}>
            {error}
          </Typography>
        )}
      </Stack>

      <TextField
        fullWidth
        size="small"
        placeholder="Search products to add…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ ...inputSx, mb: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRegular
                fontSize={15}
                color={fg.tertiary}
                style={{ display: "block" }}
              />
            </InputAdornment>
          ),
        }}
      />

      {search && (
        <Box
          sx={{
            borderRadius: 1.5,
            border: `1px solid ${border.primary}`,
            mb: 1.5,
            overflow: "hidden",
          }}
        >
          {results.length === 0 ? (
            <Typography
              variant="caption"
              sx={{ color: fg.tertiary, p: 1.5, display: "block" }}
            >
              No products found
            </Typography>
          ) : (
            results.map((p, i) => (
              <Stack
                key={p.id}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  px: 1.5,
                  py: 1,
                  borderBottom:
                    i < results.length - 1
                      ? `1px solid ${border.primary}`
                      : "none",
                  "&:hover": { backgroundColor: bg.tertiary },
                  cursor: "pointer",
                }}
                onClick={() => {
                  onAdd({ ...p, qty: 1 });
                  setSearch("");
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ color: fg.primary }}
                  >
                    {p.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: fg.tertiary }}>
                    {p.sku}
                  </Typography>
                </Box>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{ color: fg.primary }}
                  >
                    ${p.price}
                  </Typography>
                  <AddRegular
                    fontSize={16}
                    color={main.primary}
                    style={{ display: "block" }}
                  />
                </Stack>
              </Stack>
            ))
          )}
        </Box>
      )}

      {items.length === 0 ? (
        <Stack
          alignItems="center"
          gap={0.5}
          py={3}
          sx={{ borderRadius: 1.5, border: `1px dashed ${border.primary}` }}
        >
          <BoxRegular
            fontSize={28}
            color={fg.tertiary}
            style={{ display: "block" }}
          />
          <Typography variant="caption" sx={{ color: fg.tertiary }}>
            No products added yet
          </Typography>
        </Stack>
      ) : (
        <Box
          sx={{
            borderRadius: 1.5,
            border: `1px solid ${border.primary}`,
            overflow: "hidden",
          }}
        >
          {items.map((item, i) => (
            <Box key={item.id}>
              <Stack
                direction="row"
                alignItems="center"
                gap={1.5}
                px={1.5}
                py={1.2}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ color: fg.primary }}
                    noWrap
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: fg.tertiary }}>
                    {item.sku} · ${item.price}
                  </Typography>
                </Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={0.5}
                  sx={{
                    border: `1px solid ${border.primary}`,
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <IconButton
                    size="small"
                    sx={{ borderRadius: 0, px: 0.8 }}
                    onClick={() =>
                      item.qty > 1
                        ? onQtyChange(item.id, item.qty - 1)
                        : onRemove(item.id)
                    }
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        lineHeight: 1,
                        color: fg.secondary,
                        fontWeight: 700,
                      }}
                    >
                      −
                    </Typography>
                  </IconButton>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: fg.primary,
                      minWidth: 24,
                      textAlign: "center",
                    }}
                  >
                    {item.qty}
                  </Typography>
                  <IconButton
                    size="small"
                    sx={{ borderRadius: 0, px: 0.8 }}
                    onClick={() => onQtyChange(item.id, item.qty + 1)}
                  >
                    <Typography
                      sx={{
                        fontSize: 16,
                        lineHeight: 1,
                        color: fg.secondary,
                        fontWeight: 700,
                      }}
                    >
                      +
                    </Typography>
                  </IconButton>
                </Stack>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ color: fg.primary, minWidth: 56, textAlign: "right" }}
                >
                  ${(item.price * item.qty).toFixed(2)}
                </Typography>
                <IconButton size="small" onClick={() => onRemove(item.id)}>
                  <DeleteRegular
                    fontSize={15}
                    color={main.error}
                    style={{ display: "block" }}
                  />
                </IconButton>
              </Stack>
              {i < items.length - 1 && (
                <Divider sx={{ borderColor: border.primary }} />
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
