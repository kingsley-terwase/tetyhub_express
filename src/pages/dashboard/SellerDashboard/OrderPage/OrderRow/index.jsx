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
  PrintRegular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { RiskBadge } from "../RiskBadge/index.jsx";
import { StatusChip } from "@/components/shared/index.js";
import { useAuthStore } from "@/store/auth.js";
import { getRoleKey, getRoleBasePath } from "@/lib/roles.js";

/** @type {Record<string, string>} */
const channelColors = {
  Web: "#6366f1",
  Mobile: "#ec4899",
  POS: "#14b8a6",
  Marketplace: "#f59e0b",
};

/**
 * @param {{
 *   row:         import("../lib.js").Order,
 *   avatarColor: string,
 *   selected:    boolean,
 *   onSelect:    () => void,
 *   onPrint:     (id: string) => void,
 * }} props
 */

export function OrderRow({ row, avatarColor, selected, onSelect, onPrint }) {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();

  const { permission } = useAuthStore.getState();
  // @ts-ignore
  const role = getRoleKey(permission);
  const isSeller = role === "seller";

  // @ts-ignore
  const base = getRoleBasePath(permission);

  /** @param {React.MouseEvent} e */
  const goToDetail = (e) => {
    e.stopPropagation();
    navigate(row.id);
  };

  return (
    <TableRow
      selected={selected}
      onClick={() => navigate(`${base}/orders/${row.id}`)}
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
        <Box
          sx={{
            display: "inline-block",
            px: 1,
            py: 0.3,
            borderRadius: 1,
            backgroundColor: bg.tertiary,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontFamily: "monospace",
              fontWeight: 700,
              color: fg.secondary,
            }}
          >
            {row.id}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Stack direction="row" alignItems="center" gap={1.2}>
          <Box
            sx={{
              width: 30,
              height: 30,
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
              {row.customer}
            </Typography>
            <Typography variant="caption" sx={{ color: fg.tertiary }}>
              {row.email}
            </Typography>
          </Box>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="body2" sx={{ color: fg.secondary }}>
          {row.date}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography
          variant="body2"
          fontWeight={500}
          sx={{ color: fg.secondary }}
        >
          {row.items} item{row.items !== 1 ? "s" : ""}
        </Typography>
      </TableCell>

      <TableCell>
        <Typography variant="body2" fontWeight={700} sx={{ color: fg.primary }}>
          ${row.total.toFixed(2)}
        </Typography>
      </TableCell>

      <TableCell>
        <Box
          sx={{
            display: "inline-block",
            px: 1,
            py: 0.3,
            borderRadius: 1,
            backgroundColor: `${channelColors[row.channel] ?? "#6366f1"}22`,
          }}
        >
          <Typography
            variant="caption"
            fontWeight={600}
            sx={{ color: channelColors[row.channel] ?? "#6366f1" }}
          >
            {row.channel}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <RiskBadge risk={row.risk} />
      </TableCell>
      <TableCell>
        <StatusChip
          // @ts-ignore
          status={row.status}
        />
      </TableCell>

      <TableCell onClick={(e) => e.stopPropagation()}>
        <Stack direction="row" gap={0.5}>
          <IconButton size="small" onClick={goToDetail}>
            <EyeRegular fontSize={16} color={fg.secondary} />
          </IconButton>
          {isSeller && (
            <IconButton
              size="small"
              onClick={() => navigate(`${base}/edit-order`)}
            >
              <EditRegular fontSize={16} color={fg.secondary} />
            </IconButton>
          )}
          <IconButton size="small" onClick={() => onPrint(row.id)}>
            <PrintRegular fontSize={16} color={fg.secondary} />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
