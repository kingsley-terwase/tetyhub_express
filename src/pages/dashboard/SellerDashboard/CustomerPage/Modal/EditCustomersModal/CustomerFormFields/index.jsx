// @ts-nocheck
import {
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import {
  PersonRegular,
  MailRegular,
  CallRegular,
  GlobeRegular,
  CircleFilled,
} from "@fluentui/react-icons";
import { segments, statuses, countries } from "../UseForm";

/** @type {Record<string, string>} */
const segmentColors = {
  new: "#3b82f6",
  returning: "#10b981",
  vip: "#8b5cf6",
  "at-risk": "#f59e0b",
  lapsed: "#ef4444",
};

/** @type {Record<string, string>} */
const statusColors = {
  active: "#10b981",
  suspended: "#f59e0b",
  blocked: "#ef4444",
};

/**
 * @param {{ form:any, errors:any, set:any, inputSx:object, fg:any }} props
 */
export function CustomerIdentityFields({ form, errors, set, inputSx, fg }) {
  return (
    <Grid container spacing={1.5}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          size="small"
          label="Full Name *"
          placeholder="e.g. Sarah Johnson"
          value={form.name}
          onChange={set("name")}
          error={!!errors.name}
          helperText={errors.name}
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
    </Grid>
  );
}

/**
 * @param {{ form:any, errors:any, set:any, inputSx:object, fg:any }} props
 */
export function CustomerContactFields({ form, errors, set, inputSx, fg }) {
  return (
    <Grid container spacing={1.5}>
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
          label="Country *"
          value={form.country}
          onChange={set("country")}
          error={!!errors.country}
          helperText={errors.country}
          sx={inputSx}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GlobeRegular
                  fontSize={16}
                  color={fg.tertiary}
                  style={{ display: "block" }}
                />
              </InputAdornment>
            ),
          }}
        >
          {countries.map((c) => (
            <MenuItem key={c} value={c} sx={{ fontSize: 13 }}>
              {c}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}

/**
 * @param {{ form:any, set:any, inputSx:object, fg:any }} props
 */
export function CustomerClassifyFields({ form, set, inputSx, fg }) {
  return (
    <Grid container spacing={1.5}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Segment"
          value={form.segment}
          onChange={set("segment")}
          sx={inputSx}
          SelectProps={{
            renderValue: (val) => (
              <Stack direction="row" alignItems="center" gap={0.8}>
                <CircleFilled
                  fontSize={10}
                  // @ts-ignore
                  color={segmentColors[val] ?? fg.tertiary}
                  style={{ display: "block", flexShrink: 0 }}
                />
                <Typography
                  sx={{
                    fontSize: 13,
                    color: fg.primary,
                    textTransform: "capitalize",
                  }}
                >
                  {val}
                </Typography>
              </Stack>
            ),
          }}
        >
          {segments.map((s) => (
            <MenuItem key={s} value={s} sx={{ fontSize: 13 }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <CircleFilled
                  fontSize={10}
                  color={segmentColors[s]}
                  style={{ display: "block" }}
                />
                <span style={{ textTransform: "capitalize" }}>{s}</span>
              </Stack>
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Status"
          value={form.status}
          onChange={set("status")}
          sx={inputSx}
          SelectProps={{
            renderValue: (val) => (
              <Stack direction="row" alignItems="center" gap={0.8}>
                <CircleFilled
                  fontSize={10}
                  // @ts-ignore
                  color={statusColors[val] ?? fg.tertiary}
                  style={{ display: "block", flexShrink: 0 }}
                />
                <Typography
                  sx={{
                    fontSize: 13,
                    color: fg.primary,
                    textTransform: "capitalize",
                  }}
                >
                  {val}
                </Typography>
              </Stack>
            ),
          }}
        >
          {statuses.map((s) => (
            <MenuItem key={s} value={s} sx={{ fontSize: 13 }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <CircleFilled
                  fontSize={10}
                  color={statusColors[s]}
                  style={{ display: "block" }}
                />
                <span style={{ textTransform: "capitalize" }}>{s}</span>
              </Stack>
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}
