import { Stack, TextField, InputAdornment } from "@mui/material";
import { MoneyRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";
import { Field, makeInputSx, makeLabelSx } from "../lib";
import { CampaignTypeStatus } from "../CampaignTypeStatus";
import { CampaignDateRange } from "../CampaignDateRange";

/**
 * @param {{ form: any, errors: any, onChange: (f: string, v: string) => void }} props
 */
export function CampaignFormBody({ form, errors, onChange }) {
  const { bg, fg, border } = useColor();
  const inputSx = makeInputSx({ bg, fg, border });
  const labelSx = makeLabelSx({ fg });

  return (
    <Stack gap={spacingTokens.md}>
      <Field label="Campaign Name *" labelSx={labelSx}>
        <TextField
          fullWidth
          size="small"
          placeholder="e.g. Summer Sale 2025"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          sx={inputSx}
        />
      </Field>

      <CampaignTypeStatus form={form} errors={errors} onChange={onChange} />

      <CampaignDateRange form={form} errors={errors} onChange={onChange} />

      <Field label="Budget" labelSx={labelSx}>
        <TextField
          fullWidth
          size="small"
          placeholder="0.00"
          value={form.budget}
          onChange={(e) => onChange("budget", e.target.value)}
          error={!!errors.budget}
          helperText={errors.budget}
          sx={inputSx}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MoneyRegular fontSize={15} color={fg.tertiary} />
              </InputAdornment>
            ),
          }}
        />
      </Field>
    </Stack>
  );
}
