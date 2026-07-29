import {
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import {
  BriefcaseRegular,
  MoneyRegular,
  ClockRegular,
  PersonRegular,
  TagRegular,
} from "@fluentui/react-icons";
import { categories, statuses, durations } from "../UseServiceForm";

/**
 * @param {{ inputSx: object, statusDot: Record<string,string> }} ctx
 * Shared context passed from parent — avoids re-calling useColor in every sub-component
 */

/**
 * @param {{ value: string, error: string, onChange: any, inputSx: object, fg: any }} props
 */
export function NameField({ value, error, onChange, inputSx, fg }) {
  return (
    <TextField
      fullWidth
      size="small"
      label="Service Name *"
      placeholder="e.g. Logo Design"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      sx={inputSx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BriefcaseRegular
              fontSize={16}
              color={fg.tertiary}
              style={{ display: "block" }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}

// ── Category + Status ─────────────────────────────────────────────────────────
/**
 * @param {{ form: any, errors: any, set: any, inputSx: object, fg: any, statusDot: Record<string,string> }} props
 */
export function CategoryStatusFields({
  form,
  errors,
  set,
  inputSx,
  fg,
  statusDot,
}) {
  return (
    <Grid container spacing={1.5}>
      <Grid size={{ xs: 12, sm: 7 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Category *"
          value={form.category}
          onChange={set("category")}
          error={!!errors.category}
          helperText={errors.category}
          sx={inputSx}
        >
          {categories.map(
            (
              /** @type {boolean | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | null | undefined> | import("react").Key | null | undefined} */ c,
            ) => (
              <MenuItem
                // @ts-ignore
                key={c}
                value={c}
                sx={{ fontSize: 13 }}
              >
                {c}
              </MenuItem>
            ),
          )}
        </TextField>
      </Grid>

      <Grid size={{ xs: 12, sm: 5 }}>
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
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    // @ts-ignore
                    backgroundColor: statusDot[val] ?? fg.tertiary,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 13,
                    color: fg.primary,
                    textTransform: "capitalize",
                  }}
                >
                  {String(val)}
                </Typography>
              </Stack>
            ),
          }}
        >
          {statuses.map(
            (
              /** @type {boolean | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | null | undefined> | import("react").Key | null | undefined} */ st,
            ) => (
              <MenuItem
                // @ts-ignore
                key={st}
                value={st}
                sx={{ fontSize: 13 }}
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      // @ts-ignore
                      backgroundColor: statusDot[st],
                      display: "inline-block",
                    }}
                  />
                  <span style={{ textTransform: "capitalize" }}>{st}</span>
                </Stack>
              </MenuItem>
            ),
          )}
        </TextField>
      </Grid>
    </Grid>
  );
}

// ── Price + Duration ──────────────────────────────────────────────────────────
/**
 * @param {{ form: any, errors: any, set: any, inputSx: object, fg: any }} props
 */
export function PriceDurationFields({ form, errors, set, inputSx, fg }) {
  return (
    <Grid container spacing={1.5}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          fullWidth
          size="small"
          label="Price *"
          placeholder="e.g. 150"
          value={form.price}
          onChange={set("price")}
          error={!!errors.price}
          helperText={errors.price}
          sx={inputSx}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MoneyRegular
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
          label="Duration *"
          value={form.duration}
          onChange={set("duration")}
          error={!!errors.duration}
          helperText={errors.duration}
          sx={inputSx}
        >
          {durations.map(
            (
              /** @type {boolean | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<import("react").ReactNode> | null | undefined> | import("react").Key | null | undefined} */ d,
            ) => (
              <MenuItem
                // @ts-ignore
                key={d}
                value={d}
                sx={{ fontSize: 13 }}
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  <ClockRegular
                    fontSize={14}
                    color={fg.tertiary}
                    style={{ display: "block" }}
                  />
                  {d}
                </Stack>
              </MenuItem>
            ),
          )}
        </TextField>
      </Grid>
    </Grid>
  );
}

// ── Provider + Tags ───────────────────────────────────────────────────────────
/**
 * @param {{ form: any, errors: any, set: any, inputSx: object, fg: any }} props
 */
export function ProviderTagsFields({ form, errors, set, inputSx, fg }) {
  return (
    <>
      <TextField
        fullWidth
        size="small"
        label="Provider *"
        placeholder="e.g. Peter Pan"
        value={form.provider}
        onChange={set("provider")}
        error={!!errors.provider}
        helperText={errors.provider}
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
      <TextField
        fullWidth
        size="small"
        label="Tags (optional)"
        placeholder="e.g. branding, logo, identity"
        value={form.tags}
        onChange={set("tags")}
        helperText="Separate tags with commas"
        sx={inputSx}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TagRegular
                fontSize={16}
                color={fg.tertiary}
                style={{ display: "block" }}
              />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
