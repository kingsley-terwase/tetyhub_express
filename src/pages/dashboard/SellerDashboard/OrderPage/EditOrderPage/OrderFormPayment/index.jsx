import { Grid, TextField, MenuItem, Box, Typography } from "@mui/material";
import { payments, shippings } from "../UseOrderForm";

/**
 * @param {{
 *   form:    import("../UseOrderForm").OrderForm,
 *   set:     (key: any) => (e: any) => void,
 *   inputSx: object,
 *   fg:      any,
 * }} props
 */
export function OrderFormPayment({ form, set, inputSx, fg }) {
  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight={700}
        sx={{ color: fg.primary, mb: 1.5 }}
      >
        Payment & Delivery
      </Typography>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Payment Method"
            value={form.payment}
            onChange={set("payment")}
            sx={inputSx}
          >
            {payments.map((p) => (
              <MenuItem key={p} value={p} sx={{ fontSize: 13 }}>
                {p}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Shipping Method"
            value={form.shipping}
            onChange={set("shipping")}
            sx={inputSx}
          >
            {shippings.map((s) => (
              <MenuItem key={s} value={s} sx={{ fontSize: 13 }}>
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={2}
            label="Order Notes (optional)"
            placeholder="e.g. Gift wrap required, leave at door…"
            value={form.notes}
            onChange={set("notes")}
            sx={inputSx}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
