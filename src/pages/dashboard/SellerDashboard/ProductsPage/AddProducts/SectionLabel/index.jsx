import { useProductStyles } from "@/contexts/products";
import { Stack, Typography } from "@mui/material";

/**
 * @param {{ icon: React.ElementType, label: string }} props
 */
export default function SectionLabel({ icon: Icon, label }) {
  const s = useProductStyles();
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.75}
      sx={s.sectionLabelRow}
    >
      <Icon style={s.sectionLabelIcon} />
      <Typography variant="caption" sx={s.sectionLabelText}>
        {label}
      </Typography>
    </Stack>
  );
}
