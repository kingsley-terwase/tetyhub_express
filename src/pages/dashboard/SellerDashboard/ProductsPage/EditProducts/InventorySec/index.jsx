import { BoxRegular } from "@fluentui/react-icons";
import {
  Stack,
  OutlinedInput,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  Typography,
  Grid,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import SectionLabel from "../SectionLabel";
import FieldLabel from "../FieldLabel";
import { spacingTokens } from "@/lib/theme";
import { useProductStyles } from "@/contexts/products";

const AVAILABILITY = [
  { value: "in_stock", label: "In Stock" },
  { value: "out_of_stock", label: "Out of Stock" },
  { value: "pre_order", label: "Pre-order" },
  { value: "back_order", label: "Back-order" },
];

// @ts-ignore
const DimInput = ({ label }) => (
  <FormControl fullWidth>
    <FieldLabel>{label}</FieldLabel>
    <OutlinedInput type="number" placeholder="0" fullWidth />
  </FormControl>
);

/** @param {{ sku: any, setSku: any, stock: any, setStock: any, weight: any, setWeight: any, availability: any, setAvailability: any }} props */
export default function InventorySection({
  sku,
  setSku,
  stock,
  setStock,
  weight,
  setWeight,
  availability,
  setAvailability,
}) {
  const s = useProductStyles();
  return (
    <Box sx={s.sectionWrapper}>
      <SectionLabel icon={BoxRegular} label="Inventory & Shipping" />
      <Stack gap={spacingTokens.md}>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <FieldLabel required>SKU</FieldLabel>
              <OutlinedInput
                placeholder="e.g. PRD-00123"
                fullWidth
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <FieldLabel>Barcode / UPC</FieldLabel>
              <OutlinedInput placeholder="e.g. 012345678905" fullWidth />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <FieldLabel required>Stock Quantity</FieldLabel>
              <OutlinedInput
                type="number"
                placeholder="0"
                fullWidth
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <Typography variant="caption" sx={s.unitLabel}>
                      units
                    </Typography>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
        <FormControl>
          <FieldLabel>Availability</FieldLabel>
          <ToggleButtonGroup
            value={availability}
            exclusive
            size="small"
            onChange={(_, v) => v && setAvailability(v)}
            sx={{ flexWrap: "wrap", gap: 0.5 }}
          >
            {AVAILABILITY.map(({ value, label }) => (
              <ToggleButton
                key={value}
                value={value}
                sx={s.availabilityToggleBtn}
              >
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </FormControl>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <FieldLabel>Weight</FieldLabel>
              <OutlinedInput
                type="number"
                placeholder="0.00"
                fullWidth
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <Select
                      variant="standard"
                      defaultValue="kg"
                      disableUnderline
                      sx={s.weightUnitSelect}
                    >
                      {["kg", "g", "lb", "oz"].map((u) => (
                        <MenuItem key={u} value={u}>
                          {u}
                        </MenuItem>
                      ))}
                    </Select>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <DimInput label="Length (cm)" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <DimInput label="Width (cm)" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <DimInput label="Height (cm)" />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
