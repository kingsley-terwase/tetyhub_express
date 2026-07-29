import { Box, Stack, TextField, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { radius } from "@/lib/theme";
import { makeInputSx } from "../lib";

/**
 * @param {{ notes: string, onChange: (v: string) => void,
 *           onSave: () => void, saved: boolean }} props
 */
export function CustomerNotes({ notes, onChange, onSave, saved }) {
  const { bg, fg, border, main } = useColor();
  const inputSx = makeInputSx({ bg, fg, border });

  return (
    <Stack gap={1.5} pt={2}>
      <Typography sx={{ fontSize: 12, color: fg.tertiary, lineHeight: 1.5 }}>
        Internal notes — visible only to your team.
      </Typography>

      <TextField
        multiline
        minRows={5}
        fullWidth
        placeholder="Add a note about this customer…"
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          ...inputSx,
          "& .MuiOutlinedInput-root": {
            ...inputSx["& .MuiOutlinedInput-root"],
            alignItems: "flex-start",
          },
        }}
      />

      <Stack direction="row" justifyContent="flex-end">
        <Box
          onClick={onSave}
          sx={{
            px: 2,
            py: 0.9,
            borderRadius: radius[6],
            cursor: "pointer",
            backgroundColor: saved ? "#10b981" : main.primary,
            transition: "background-color 0.25s ease",
            "&:hover": { opacity: 0.9 },
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
            {saved ? "Saved ✓" : "Save Notes"}
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
}
