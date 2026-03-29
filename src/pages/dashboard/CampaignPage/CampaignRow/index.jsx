import {
  TableRow,
  TableCell,
  Typography,
  Stack,
  IconButton,
  Checkbox,
  Box,
} from "@mui/material";
import {
  CheckboxUncheckedRegular,
  CheckboxCheckedFilled,
  EditRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { StatusChip } from "@/components/shared/index.js";

/** @type {Record<string, string>} */
const typeColors = { Email: "#6366f1", SMS: "#ec4899", Push: "#14b8a6" };

/**
 * @param {{
 *   row:      import("../lib.jsx").Campaign,
 *   selected: boolean,
 *   onSelect: () => void,
 *   onEdit:   (row: import("../lib.jsx").Campaign) => void,
 *   onDelete: (id: string) => void,
 * }} props
 */
export function CampaignRow({ row, selected, onSelect, onEdit, onDelete }) {
  const { bg, fg, border, main } = useColor();
  const pct = row.budget > 0 ? Math.round((row.spent / row.budget) * 100) : 0;

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

      <TableCell>
        <Typography variant="body2" fontWeight={600} sx={{ color: fg.primary }}>
          {row.name}
        </Typography>
        <Typography variant="caption" sx={{ color: fg.tertiary }}>
          #{row.id}
        </Typography>
      </TableCell>

      <TableCell>
        <Box
          sx={{
            display: "inline-block",
            px: 1,
            py: 0.3,
            borderRadius: 1,
            backgroundColor: `${typeColors[row.type]}22`,
          }}
        >
          <Typography
            variant="caption"
            fontWeight={600}
            sx={{ color: typeColors[row.type] }}
          >
            {row.type}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2" sx={{ color: fg.secondary }}>
          {row.audience.toLocaleString()}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" fontWeight={600} sx={{ color: fg.primary }}>
          ${row.budget}
        </Typography>
      </TableCell>

      <TableCell>
        <Stack gap={0.4}>
          <Typography variant="body2" sx={{ color: fg.secondary }}>
            ${row.spent}
          </Typography>
          <Box
            sx={{
              height: 4,
              borderRadius: 99,
              backgroundColor: bg.tertiary,
              width: 80,
            }}
          >
            <Box
              sx={{
                height: "100%",
                borderRadius: 99,
                width: `${pct}%`,
                backgroundColor: main.primary,
              }}
            />
          </Box>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="body2" sx={{ color: fg.secondary }}>
          {row.startDate}
        </Typography>
      </TableCell>
      <TableCell>
        <StatusChip
          // @ts-ignore
          status={row.status}
        />
      </TableCell>

      <TableCell onClick={(e) => e.stopPropagation()}>
        <Stack direction="row" gap={0.5}>
          <IconButton size="small" onClick={() => onEdit(row)}>
            <EditRegular fontSize={16} color={fg.secondary} />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(row.id)}>
            <DeleteRegular fontSize={16} color={main.error} />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
