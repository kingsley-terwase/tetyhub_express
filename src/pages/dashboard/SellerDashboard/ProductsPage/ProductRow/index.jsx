import {
  TableRow,
  TableCell,
  Box,
  Typography,
  Stack,
  IconButton,
  Checkbox,
} from "@mui/material";
import { EditRegular, DeleteRegular } from "@fluentui/react-icons";
import {
  CheckboxUncheckedRegular,
  CheckboxCheckedFilled,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { ProductStatusChip } from "../ProductStatusChip";

/**
 * @param {{
 *   row:        import("../lib.jsx").Product,
 *   selected:   boolean,
 *   onSelect:   () => void,
 *   onEdit:     (row: import("../lib.jsx").Product) => void,
 *   onDelete:   (id: string) => void,
 * }} props
 */
export function ProductRow({ row, selected, onSelect, onEdit, onDelete }) {
  const { bg, fg, border, main } = useColor();

  const stockColor =
    row.stock === 0 ? main.error : row.stock < 15 ? main.warning : fg.primary;

  return (
    <TableRow
      selected={selected}
      onClick={onSelect}
      sx={{
        cursor: "pointer",
        transition: "background .15s",
        borderBottom: `1px solid ${border.primary}`,
        "&:hover": { backgroundColor: bg.secondary },
        "&.Mui-selected": { backgroundColor: bg.secondary },
      }}
    >
      {/* Checkbox */}
      <TableCell padding="checkbox">
        <Checkbox
          size="small"
          checked={selected}
          onChange={onSelect}
          onClick={(e) => e.stopPropagation()}
          icon={<CheckboxUncheckedRegular fontSize={18} color={fg.tertiary} />}
          checkedIcon={
            <CheckboxCheckedFilled fontSize={18} color={main.primary} />
          }
        />
      </TableCell>

      {/* Product */}
      <TableCell>
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Box
            component="img"
            src={row.image}
            alt={row.name}
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1,
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: fg.primary }}
            >
              {row.name}
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      {/* Category */}
      <TableCell>
        <Typography variant="body2" sx={{ color: fg.secondary }}>
          {row.category}
        </Typography>
      </TableCell>

      {/* Price */}
      <TableCell>
        <Typography variant="body2" fontWeight={700} sx={{ color: fg.primary }}>
          ${row.price.toFixed(2)}
        </Typography>
      </TableCell>

      {/* Stock */}
      <TableCell>
        <Typography variant="body2" fontWeight={600} sx={{ color: stockColor }}>
          {row.stock === 0 ? "Out of stock" : row.stock}
        </Typography>
      </TableCell>

      {/* Status */}
      <TableCell>
        <ProductStatusChip status={row.status} />
      </TableCell>

      {/* Actions */}
      <TableCell onClick={(e) => e.stopPropagation()}>
        <Stack direction="row" gap={0.5}>
          <IconButton size="small" onClick={() => onEdit(row)}>
            <EditRegular fontSize={16} color={fg.secondary} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() =>
              onDelete(
                // @ts-ignore
                row,
              )
            }
          >
            <DeleteRegular fontSize={16} color={main.error} />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
