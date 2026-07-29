import { DocumentRegular } from "@fluentui/react-icons";
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
} from "@mui/material";
import SectionLabel from "../SectionLabel";
import FieldLabel from "../FieldLabel";
import { spacingTokens } from "@/lib/theme";
import { useProductStyles } from "@/contexts/products";

const STATUS_OPTIONS = [
  { value: "active", color: "#28A745", label: "Active" },
  { value: "draft", color: "#F7941D", label: "Draft" },
  { value: "archived", color: "#9FA2B5", label: "Archived" },
];
const CATEGORIES = [
  "electronics",
  "fashion_apparel",
  "home_garden",
  "health_beauty",
  "sports_outdoors",
  "books_media",
  "toys_games",
  "food_grocery",
  "automotive",
  "office_supplies",
  "other",
];
const toLabel = (/** @type {string} */ v) =>
  v
    .replace(/_/g, " ")
    .replace(/\b\w/g, (/** @type {string} */ c) => c.toUpperCase());

/** @param {{ productName: any, setProductName: any, category: any, setCategory: any, status: any, setStatus: any, description: any, setDescription: any }} props */
export default function BasicInfoSection({
  productName,
  setProductName,
  category,
  setCategory,
  status,
  setStatus,
  description,
  setDescription,
}) {
  const s = useProductStyles();
  return (
    <Box sx={s.sectionWrapper}>
      <SectionLabel icon={DocumentRegular} label="Basic Information" />
      <Stack gap={spacingTokens.md}>
        <FormControl fullWidth>
          <FieldLabel required>Product Name</FieldLabel>
          <OutlinedInput
            placeholder="e.g. Premium Wireless Headphones"
            fullWidth
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            inputProps={{ maxLength: 120 }}
            endAdornment={
              <InputAdornment position="end">
                <Typography variant="caption" sx={s.charCounter}>
                  {productName.length}/120
                </Typography>
              </InputAdornment>
            }
          />
        </FormControl>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 8 }}>
            <FormControl fullWidth>
              <FieldLabel required>Category</FieldLabel>
              <Select
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                displayEmpty
                renderValue={(v) => (v ? toLabel(v) : "Select a category")}
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {CATEGORIES.map((c) => (
                  <MenuItem key={c} value={c}>
                    {toLabel(c)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth>
              <FieldLabel>Status</FieldLabel>
              <Select
                variant="outlined"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {STATUS_OPTIONS.map(({ value, color, label }) => (
                  <MenuItem key={value} value={value}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Box sx={s.statusDot(color)} />
                      {label}
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <FormControl fullWidth>
          <FieldLabel required>Description</FieldLabel>
          <OutlinedInput
            multiline
            rows={3}
            fullWidth
            placeholder="Describe the product — features, benefits, use cases..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            inputProps={{ maxLength: 1000 }}
          />
          <Typography variant="caption" sx={s.descCharCounter}>
            {description.length}/1000
          </Typography>
        </FormControl>
      </Stack>
    </Box>
  );
}
