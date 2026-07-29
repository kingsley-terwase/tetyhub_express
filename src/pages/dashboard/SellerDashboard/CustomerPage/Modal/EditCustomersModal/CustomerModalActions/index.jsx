import { Stack, Typography } from "@mui/material";
import { DismissRegular, PersonAddRegular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";

/**
 * @param {{ onCancel:()=>void, onSave:()=>void, loading:boolean }} props
 */
export function CustomerModalActions({ onCancel, onSave, loading }) {
  const { fg, bg, border, main } = useColor();

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        gap={0.6}
        onClick={onCancel}
        sx={{
          px: 1.8,
          py: 0.85,
          borderRadius: 1.5,
          cursor: "pointer",
          border: `1px solid ${border.primary}`,
          backgroundColor: bg.secondary,
          "&:hover": { backgroundColor: bg.tertiary },
          transition: "background .15s",
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: fg.secondary }}>
          <DismissRegular /> Cancel
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        gap={0.6}
        onClick={loading ? undefined : onSave}
        sx={{
          px: 1.8,
          py: 0.85,
          borderRadius: 1.5,
          cursor: loading ? "not-allowed" : "pointer",
          backgroundColor: main.primary,
          opacity: loading ? 0.65 : 1,
          "&:hover": { opacity: loading ? 0.65 : 0.88 },
          transition: "opacity .15s",
        }}
      >
        <PersonAddRegular
          fontSize={15}
          color="#fff"
          style={{ display: "block" }}
        />
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
          {loading ? "Saving…" : "Update Customer"}
        </Typography>
      </Stack>
    </>
  );
}
