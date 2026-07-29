import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { ArrowDownloadRegular, PersonAddRegular } from "@fluentui/react-icons";

// @ts-ignore
export default function CustomerHeader({ count, onAdd }) {
  const { fg, border, bg, main } = useColor();

  return (
    <Stack direction="row" justifyContent="space-between" flexWrap="wrap">
      <Box>
        <Typography variant="h5" fontWeight={700} sx={{ color: fg.primary }}>
          Customers
        </Typography>
        <Typography variant="caption" sx={{ color: fg.tertiary }}>
          {count} customers found
        </Typography>
      </Box>

      <Stack direction="row" gap={1}>
        <Stack
          direction="row"
          alignItems="center"
          gap={0.6}
          sx={{
            px: 1.5,
            py: 0.8,
            borderRadius: 1.5,
            cursor: "pointer",
            border: `1px solid ${border.primary}`,
            backgroundColor: bg.secondary,
          }}
        >
          <ArrowDownloadRegular fontSize={16} />
          <Typography fontSize={13}>Export</Typography>
        </Stack>

        <Stack
          role="button"
          onClick={() => onAdd?.()}
          direction="row"
          alignItems="center"
          gap={0.6}
          sx={{
            px: 1.5,
            py: 0.8,
            borderRadius: 1.5,
            cursor: "pointer",
            backgroundColor: main.primary,
            userSelect: "none",
          }}
        >
          <PersonAddRegular fontSize={16} color="#fff" />
          <Typography fontSize={13} color="#fff">
            Add Customer
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
