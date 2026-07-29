import { useProductStyles } from "@/contexts/products";
import { Box, FormLabel } from "@mui/material";

/**
 * @param {{ children: React.ReactNode, required?: boolean, hint?: string }} props
 */
export default function FieldLabel({ children, required, hint }) {
  const s = useProductStyles();
  return (
    <FormLabel sx={s.fieldLabel}>
      {children}
      {required && (
        <Box component="span" sx={s.fieldLabelRequired}>
          {" "}
          *
        </Box>
      )}
      {hint && (
        <Box component="span" sx={s.fieldLabelHint}>
          · {hint}
        </Box>
      )}
    </FormLabel>
  );
}
