import { MoneyRegular, StarRegular } from "@fluentui/react-icons";
import {
  OutlinedInput,
  FormControl,
  InputAdornment,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import SectionLabel from "../SectionLabel";
import FieldLabel from "../FieldLabel";
import { useProductStyles } from "@/contexts/products";

/**
 * @param {string} price
 * @param {string} comparePrice
 */
function calcDiscount(price, comparePrice) {
  if (!price || !comparePrice) return null;
  const p = parseFloat(price);
  const cp = parseFloat(comparePrice);
  if (cp <= p) return null;
  return Math.round(((cp - p) / cp) * 100);
}

// @ts-ignore
function CurrencyInput({ label, required, hint, value, onChange }) {
  const s = useProductStyles();
  return (
    <FormControl fullWidth>
      <FieldLabel required={required} hint={hint}>
        {label}
      </FieldLabel>
      <OutlinedInput
        type="number"
        placeholder="0.00"
        fullWidth
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start">
            <Typography sx={s.currencySymbol}>₦</Typography>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

/**
 * @param {{ price: any, setPrice: any, comparePrice: any, setComparePrice: any }} props
 */
export default function PricingSection({
  price,
  setPrice,
  comparePrice,
  setComparePrice,
}) {
  const s = useProductStyles();
  const discountPercent = calcDiscount(price, comparePrice);

  return (
    <Box sx={s.sectionWrapper}>
      <SectionLabel icon={MoneyRegular} label="Pricing" />
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CurrencyInput
            label="Selling Price"
            required
            value={price}
            onChange={(/** @type {{ target: { value: any; }; }} */ e) =>
              setPrice(e.target.value)
            }
            hint={undefined}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CurrencyInput
            label="Compare-at Price"
            hint="original price before discount"
            value={comparePrice}
            onChange={(/** @type {{ target: { value: any; }; }} */ e) =>
              setComparePrice(e.target.value)
            }
            required={undefined}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CurrencyInput
            label="Cost per Item"
            hint="not shown to customers"
            required={undefined}
            value={undefined}
            onChange={undefined}
          />
        </Grid>
      </Grid>

      {discountPercent && (
        <Box sx={s.discountBadge}>
          <StarRegular style={s.discountIcon} />
          <Typography variant="caption" fontWeight={700} sx={s.discountText}>
            {discountPercent}% discount will be shown to customers
          </Typography>
        </Box>
      )}
    </Box>
  );
}
