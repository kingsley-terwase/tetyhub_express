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
  EyeRegular,
  EditRegular,
  MailRegular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { TierBadge, SegmentBadge } from "../CustomerBadge";
import { StatusChip } from "@/components/shared";

/**
 * @param {{
 *   row:         import("../lib.jsx").Customer,
 *   avatarColor: string,
 *   selected:    boolean,
 *   onSelect:    () => void,
 *   onView:      (row: import("../lib.jsx").Customer) => void,
 *   onEdit:      (row: import("../lib.jsx").Customer) => void,
 *   onMail:      (row: import("../lib.jsx").Customer) => void,
 * }} props
 */
export function CustomerRow({
  row,
  avatarColor,
  selected,
  onSelect,
  onView,
  onEdit,
  onMail,
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
        <Stack direction="row" alignItems="center" gap={1.2}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: avatarColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {row.avatar}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body2"
              fontWeight={600}
              sx={{ color: fg.primary }}
            >
              {row.name}
            </Typography>
            <Typography variant="caption" sx={{ color: fg.tertiary }}>
              {row.email}
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="body2" sx={{ color: fg.secondary }}>
          {row.country}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2" fontWeight={600} sx={{ color: fg.primary }}>
          {row.orders}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2" fontWeight={700} sx={{ color: fg.primary }}>
          ${row.spent.toLocaleString()}
        </Typography>
      </TableCell>

      <TableCell>
        <TierBadge tier={row.tier} />
      </TableCell>
      <TableCell>
        <SegmentBadge segment={row.segment} />
      </TableCell>
      <TableCell>
        <StatusChip
          // @ts-ignore
          status={row.status}
        />
      </TableCell>

      <TableCell onClick={(e) => e.stopPropagation()}>
        <Stack direction="row" gap={0.5}>
          <IconButton size="small" onClick={() => onView(row)}>
            <EyeRegular fontSize={16} color={fg.secondary} />
          </IconButton>
          <IconButton size="small" onClick={() => onEdit(row)}>
            <EditRegular fontSize={16} color={fg.secondary} />
          </IconButton>
          <IconButton size="small" onClick={() => onMail(row)}>
            <MailRegular fontSize={16} color={fg.secondary} />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
