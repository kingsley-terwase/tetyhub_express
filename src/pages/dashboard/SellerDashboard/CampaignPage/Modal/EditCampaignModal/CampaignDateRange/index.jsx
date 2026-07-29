import { Box, Stack, TextField, InputAdornment } from "@mui/material";
import { CalendarRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";
import { Field, makeInputSx, makeLabelSx } from "../lib";

/**
 * @param {{ form: any, errors: any, onChange: (f: string, v: string) => void }} props
 */
export function CampaignDateRange({ form, errors, onChange }) {
  const { bg, fg, border } = useColor();
  const inputSx = makeInputSx({ bg, fg, border });
  const labelSx = makeLabelSx({ fg });

  // @ts-ignore
  const DateField = ({ label, field, required }) => (
    <Box flex={1}>
      <Field label={label} labelSx={labelSx}>
        <TextField
          fullWidth
          size="small"
          type="date"
          value={form[field]}
          onChange={(e) => onChange(field, e.target.value)}
          error={!!errors[field]}
          helperText={errors[field]}
          sx={inputSx}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarRegular fontSize={15} color={fg.tertiary} />
              </InputAdornment>
            ),
          }}
        />
      </Field>
    </Box>
  );

  return (
    <Stack direction="row" gap={spacingTokens.sm}>
      <DateField label="Start Date *" field="startDate" required />
      <DateField label="End Date" field="endDate" required={undefined} />
    </Stack>
  );
}
