import {
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Typography,
  Box,
} from "@mui/material";
import {
  PersonRegular,
  MailRegular,
  CallRegular,
  LocationRegular,
} from "@fluentui/react-icons";
import { channels } from "../UseOrderForm";

/**
 * @param {{
 *   form:    import("../UseOrderForm").OrderForm,
 *   errors:  Partial<Record<string, string>>,
 *   set:     (key: any) => (e: any) => void,
 *   inputSx: object,
 *   fg:      any,
 * }} props
 */
export function OrderFormBasic({ form, errors, set, inputSx, fg }) {
  return (
    <Box>
      <Typography
        variant="body2"
        fontWeight={700}
        sx={{ color: fg.primary, mb: 1.5 }}
      >
        Customer Information
      </Typography>

      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Customer Name *"
            placeholder="e.g. Sarah Johnson"
            value={form.customer}
            onChange={set("customer")}
            error={!!errors.customer}
            helperText={errors.customer}
            sx={inputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonRegular
                    fontSize={16}
                    color={fg.tertiary}
                    style={{ display: "block" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Email *"
            placeholder="e.g. sarah@email.com"
            value={form.email}
            onChange={set("email")}
            error={!!errors.email}
            helperText={errors.email}
            sx={inputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailRegular
                    fontSize={16}
                    color={fg.tertiary}
                    style={{ display: "block" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            size="small"
            label="Phone"
            placeholder="e.g. +233 24 000 1234"
            value={form.phone}
            onChange={set("phone")}
            sx={inputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CallRegular
                    fontSize={16}
                    color={fg.tertiary}
                    style={{ display: "block" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            select
            fullWidth
            size="small"
            label="Channel"
            value={form.channel}
            onChange={set("channel")}
            sx={inputSx}
          >
            {channels.map((c) => (
              <MenuItem key={c} value={c} sx={{ fontSize: 13 }}>
                {c}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            size="small"
            label="Shipping Address *"
            placeholder="e.g. 45 Accra Road, Kumasi, Ghana"
            value={form.address}
            onChange={set("address")}
            error={!!errors.address}
            helperText={errors.address}
            sx={inputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationRegular
                    fontSize={16}
                    color={fg.tertiary}
                    style={{ display: "block" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
