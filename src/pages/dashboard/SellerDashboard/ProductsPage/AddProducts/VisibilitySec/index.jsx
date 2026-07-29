import { GlobeRegular } from "@fluentui/react-icons";
import {
  Stack,
  OutlinedInput,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import SectionLabel from "../SectionLabel";
import FieldLabel from "../FieldLabel";
import { spacingTokens } from "@/lib/theme";
import { useProductStyles } from "@/contexts/products";

const FEATURED_OPTIONS = [
  { value: "yes", label: "⭐ Featured" },
  { value: "no", label: "No" },
];

/**
 * @param {{ isFeatured: boolean, setIsFeatured: Function }} props
 */
export default function VisibilitySection({ isFeatured, setIsFeatured }) {
  const s = useProductStyles();

  return (
    <Box sx={s.sectionWrapper}>
      <SectionLabel icon={GlobeRegular} label="Visibility & SEO" />
      <Stack gap={spacingTokens.md}>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FieldLabel>Sales Channels</FieldLabel>
              <Select variant="outlined" defaultValue="all">
                <MenuItem value="all">All Channels</MenuItem>
                <MenuItem value="online_store">Online Store only</MenuItem>
                <MenuItem value="pos">POS only</MenuItem>
                <MenuItem value="both">Online Store + POS</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <FieldLabel>Featured Product</FieldLabel>
              <ToggleButtonGroup
                value={isFeatured ? "yes" : "no"}
                exclusive
                fullWidth
                size="small"
                onChange={(_, v) => v && setIsFeatured(v === "yes")}
              >
                {FEATURED_OPTIONS.map(({ value, label }) => (
                  <ToggleButton
                    key={value}
                    value={value}
                    sx={s.featuredToggleBtn(value)}
                  >
                    {label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </FormControl>
          </Grid>
        </Grid>

        <FormControl fullWidth>
          <FieldLabel hint="Defaults to product name if empty">
            SEO Title
          </FieldLabel>
          <OutlinedInput
            placeholder="Search engine title (50–60 chars ideal)"
            fullWidth
            inputProps={{ maxLength: 70 }}
          />
        </FormControl>

        <FormControl fullWidth>
          <FieldLabel>Meta Description</FieldLabel>
          <OutlinedInput
            multiline
            rows={2}
            placeholder="Brief summary for search engines (120–160 chars ideal)"
            fullWidth
            inputProps={{ maxLength: 200 }}
          />
        </FormControl>
      </Stack>
    </Box>
  );
}
