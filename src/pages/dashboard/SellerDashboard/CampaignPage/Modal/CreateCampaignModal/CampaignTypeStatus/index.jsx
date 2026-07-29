import { Box, Stack, TextField, MenuItem, InputAdornment } from "@mui/material";
import { TagRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";
import {
  Field,
  CAMPAIGN_TYPES,
  CAMPAIGN_STATUSES,
  makeInputSx,
  makeLabelSx,
} from "../lib";

/**
 * @param {{ form: any, errors: any, onChange: (f: string, v: string) => void }} props
 */
export function CampaignTypeStatus({ form, errors, onChange }) {
  const { bg, fg, border } = useColor();
  const inputSx = makeInputSx({ bg, fg, border });
  const labelSx = makeLabelSx({ fg });

  return (
    <Stack direction="row" gap={spacingTokens.sm}>
      <Box flex={1}>
        <Field label="Campaign Type *" labelSx={labelSx}>
          <TextField
            select
            fullWidth
            size="small"
            value={form.type}
            onChange={(e) => onChange("type", e.target.value)}
            error={!!errors.type}
            helperText={errors.type}
            sx={inputSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TagRegular fontSize={15} color={fg.tertiary} />
                </InputAdornment>
              ),
            }}
          >
            {CAMPAIGN_TYPES.map((t) => (
              <MenuItem
                key={t}
                value={t}
                sx={{ fontSize: 13, textTransform: "capitalize" }}
              >
                {t}
              </MenuItem>
            ))}
          </TextField>
        </Field>
      </Box>

      <Box flex={1}>
        <Field label="Status" labelSx={labelSx}>
          <TextField
            select
            fullWidth
            size="small"
            value={form.status}
            onChange={(e) => onChange("status", e.target.value)}
            sx={inputSx}
          >
            {CAMPAIGN_STATUSES.map((s) => (
              <MenuItem
                key={s}
                value={s}
                sx={{ fontSize: 13, textTransform: "capitalize" }}
              >
                {s}
              </MenuItem>
            ))}
          </TextField>
        </Field>
      </Box>
    </Stack>
  );
}
