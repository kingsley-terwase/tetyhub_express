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
  BotRegular,
  FlashRegular,
  BrainCircuitRegular,
  TextDescriptionRegular,
  CircleFilled,
} from "@fluentui/react-icons";
import { agentTypes, agentModels, agentStatuses } from "../UseAgentForm";

/** @type {Record<string, string>} */
const typeColors = {
  Recommendation: "#6366f1",
  Classification: "#ec4899",
  Prediction: "#f59e0b",
  NLP: "#14b8a6",
  Optimization: "#8b5cf6",
  Conversational: "#10b981",
  Generation: "#f97316",
};

// ── Name ─────────────────────────────────────────────────────────────────────
/**
 * @param {{ value:string, error:string, onChange:any, inputSx:object, fg:any }} props
 */
export function AgentNameField({ value, error, onChange, inputSx, fg }) {
  return (
    <TextField
      fullWidth
      size="small"
      label="Agent Name *"
      placeholder="e.g. Product Recommender"
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error}
      sx={inputSx}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <BotRegular
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

// ── Type + Model ──────────────────────────────────────────────────────────────
/**
 * @param {{ form:any, errors:any, set:any, inputSx:object, fg:any }} props
 */
export function AgentTypeModelFields({ form, errors, set, inputSx, fg }) {
  return (
    <Grid container spacing={1.5}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          select
          fullWidth
          size="small"
          label="Agent Type *"
          value={form.type}
          onChange={set("type")}
          error={!!errors.type}
          helperText={errors.type}
          sx={inputSx}
          SelectProps={{
            renderValue: (val) => (
              <Stack direction="row" alignItems="center" gap={0.8}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: typeColors[val] ?? fg.tertiary,
                    display: "inline-block",
                    flexShrink: 0,
                  }}
                />
                <Typography sx={{ fontSize: 13, color: fg.primary }}>
                  {val}
                </Typography>
              </Stack>
            ),
          }}
        >
          {agentTypes.map((t) => (
            <MenuItem key={t} value={t} sx={{ fontSize: 13 }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: typeColors[t],
                    display: "inline-block",
                  }}
                />
                {t}
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
          label="Model *"
          value={form.model}
          onChange={set("model")}
          error={!!errors.model}
          helperText={errors.model}
          sx={inputSx}
        >
          {agentModels.map((m) => (
            <MenuItem key={m} value={m} sx={{ fontSize: 13 }}>
              <Stack direction="row" alignItems="center" gap={1}>
                <FlashRegular
                  fontSize={14}
                  color={fg.tertiary}
                  style={{ display: "block" }}
                />
                {m}
              </Stack>
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}

/**
 * @param {{ value:string, onChange:any, inputSx:object, fg:any, statusDot:Record<string,string> }} props
 */
export function AgentStatusField({ value, onChange, inputSx, fg, statusDot }) {
  return (
    <TextField
      select
      fullWidth
      size="small"
      label="Initial Status"
      value={value}
      onChange={onChange}
      sx={inputSx}
      SelectProps={{
        renderValue: (val) => (
          <Stack direction="row" alignItems="center" gap={0.8}>
            <CircleFilled
              fontSize={10}
              color={statusDot[val] ?? fg.tertiary}
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
      {agentStatuses.map((st) => (
        <MenuItem key={st} value={st} sx={{ fontSize: 13 }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <CircleFilled
              fontSize={10}
              color={statusDot[st] ?? fg.tertiary}
              style={{ display: "block" }}
            />
            <span style={{ textTransform: "capitalize" }}>{st}</span>
          </Stack>
        </MenuItem>
      ))}
    </TextField>
  );
}

/**
 * @param {{ value:string, onChange:any, inputSx:object, fg:any }} props
 */
export function AgentDescriptionField({ value, onChange, inputSx, fg }) {
  return (
    <TextField
      fullWidth
      size="small"
      multiline
      rows={3}
      label="Description (optional)"
      placeholder="What does this agent do? What data does it use?"
      value={value}
      onChange={onChange}
      sx={inputSx}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            sx={{ alignSelf: "flex-start", mt: 1.2 }}
          >
            <TextDescriptionRegular
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
