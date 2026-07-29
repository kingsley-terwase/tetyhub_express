// @ts-nocheck
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
} from "@mui/material";
import {
  MailRegular,
  ChatRegular,
  AlertRegular,
  AppsRegular,
  SubtitlesRegular,
} from "@fluentui/react-icons";
import { channels } from "../UseFormMessage";

/** @type {Record<string, any>} */
const channelIcons = {
  Email: MailRegular,
  SMS: ChatRegular,
  "Push Notification": AlertRegular,
  "In-App": AppsRegular,
};

/**
 * @param {{ value:string, onChange:any, inputSx:object, fg:any }} props
 */
export function MessageChannelField({ value, onChange, inputSx, fg }) {
  return (
    <TextField
      select
      fullWidth
      size="small"
      label="Send via"
      value={value}
      onChange={onChange}
      sx={inputSx}
      SelectProps={{
        renderValue: (val) => {
          const Icon = channelIcons[val] ?? MailRegular;
          return (
            <Stack direction="row" alignItems="center" gap={0.8}>
              <Icon
                fontSize={15}
                color={fg.tertiary}
                style={{ display: "block", flexShrink: 0 }}
              />
              <Typography sx={{ fontSize: 13, color: fg.primary }}>
                {val}
              </Typography>
            </Stack>
          );
        },
      }}
    >
      {channels.map((c) => {
        const Icon = channelIcons[c];
        return (
          <MenuItem key={c} value={c} sx={{ fontSize: 13 }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Icon
                fontSize={15}
                color={fg.tertiary}
                style={{ display: "block" }}
              />
              {c}
            </Stack>
          </MenuItem>
        );
      })}
    </TextField>
  );
}

/**
 * @param {{ value:string, error:string, onChange:any, inputSx:object, fg:any }} props
 */
export function MessageSubjectField({ value, error, onChange, inputSx, fg }) {
  return (
    <TextField
      fullWidth
      size="small"
      label="Subject *"
      placeholder="e.g. Exclusive offer just for you"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      sx={inputSx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SubtitlesRegular
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

/**
 * @param {{ value:string, error:string, onChange:any, inputSx:object, fg:any, channel:string }} props
 */
export function MessageBodyField({
  value,
  error,
  onChange,
  inputSx,
  fg,
  channel,
}) {
  const maxChars = channel === "SMS" ? 160 : 2000;
  const remaining = maxChars - value.length;

  return (
    <Box>
      <TextField
        fullWidth
        size="small"
        multiline
        rows={5}
        label="Message *"
        placeholder={
          channel === "SMS"
            ? "Keep it short — 160 characters max for SMS…"
            : "Write your message here…"
        }
        value={value}
        onChange={onChange}
        error={!!error || remaining < 0}
        helperText={error}
        sx={inputSx}
        inputProps={{ maxLength: maxChars }}
      />
      <Stack direction="row" justifyContent="flex-end" mt={0.5}>
        <Typography
          variant="caption"
          sx={{
            color: remaining < 20 ? fg.primary : fg.tertiary,
            fontSize: 11,
          }}
        >
          {remaining} character{remaining !== 1 ? "s" : ""} remaining
        </Typography>
      </Stack>
    </Box>
  );
}
