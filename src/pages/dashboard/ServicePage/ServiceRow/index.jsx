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
import { UserCell } from "../../AdminOverviewPage/Orders/lib.jsx";

/** @type {Record<string, string>} */
const catColors = {
  Design: "#6366f1",
  Marketing: "#ec4899",
  Tech: "#14b8a6",
  Content: "#f59e0b",
};

/**
 * @param {{
 *   row:      import("../lib.jsx").Service,
 *   selected: boolean,
 *   onSelect: () => void,
 *   onEdit:   (row: import("../lib.jsx").Service) => void,
 *   onDelete: (id: string) => void,
 *   avatarColor: string,
 * }} props
 */
export function ServiceRow({
  row,
  selected,
  onSelect,
  onEdit,
  onDelete,
  avatarColor,
}) {
  const { bg, fg, border, main } = useColor();

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
            backgroundColor: `${catColors[row.category] ?? "#6366f1"}22`,
          }}
        >
          <Typography
            variant="caption"
            fontWeight={600}
            sx={{ color: catColors[row.category] ?? "#6366f1" }}
          >
            {row.category}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2" fontWeight={700} sx={{ color: fg.primary }}>
          ${row.price}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ color: fg.secondary }}>
          {row.duration}
        </Typography>
      </TableCell>
      <TableCell>
        <UserCell name={row.provider} color={avatarColor} />
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
