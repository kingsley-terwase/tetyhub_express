import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";

// @ts-ignore
export default function InfoRow({ label, value }) {
  const { fg } = useColor();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      py={0.6}
    >
      <Typography variant="caption" sx={{ color: fg.tertiary }}>
        {label}
      </Typography>

      <Box>
        {typeof value === "string" ? (
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{ color: fg.primary }}
          >
            {value}
          </Typography>
        ) : (
          value
        )}
      </Box>
    </Stack>
  );
}
