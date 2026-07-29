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
  PlayRegular,
  PauseRegular,
  DeleteRegular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { StatusChip } from "@/components/shared/index.js";

/** @type {Record<string, string>} */
const typeColors = {
  Recommendation: "#6366f1",
  Classification: "#ec4899",
  Prediction: "#f59e0b",
  NLP: "#14b8a6",
  Optimization: "#8b5cf6",
  Conversational: "#10b981",
  Generation: "#f97316",
};

/**
 * @param {{
 *   row:      import("../lib.jsx").AiAgent,
 *   selected: boolean,
 *   onSelect: () => void,
 *   onToggle: (id: string) => void,
 *   onDelete: (id: string) => void,
 * }} props
 */
export function AiRow({ row, selected, onSelect, onToggle, onDelete }) {
  const { bg, fg, border, main } = useColor();
  const color = typeColors[row.type] ?? "#6366f1";

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
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "inline-block",
            px: 1,
            py: 0.3,
            borderRadius: 1,
            backgroundColor: `${color}22`,
          }}
        >
          <Typography variant="caption" fontWeight={600} sx={{ color }}>
            {row.type}
          </Typography>
        </Box>
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
            variant="caption"
            fontWeight={600}
            sx={{ color: fg.secondary }}
          >
            {row.model}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2" sx={{ color: fg.secondary }}>
          {row.requests.toLocaleString()}
        </Typography>
      </TableCell>

      <TableCell>
        <Stack gap={0.4}>
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{ color: row.accuracy >= 90 ? main.success : main.warning }}
          >
            {row.accuracy}%
          </Typography>
          <Box
            sx={{
              height: 4,
              borderRadius: 99,
              backgroundColor: bg.tertiary,
              width: 70,
            }}
          >
            <Box
              sx={{
                height: "100%",
                borderRadius: 99,
                width: `${row.accuracy}%`,
                backgroundColor:
                  row.accuracy >= 90 ? main.success : main.warning,
              }}
            />
          </Box>
        </Stack>
      </TableCell>

      <TableCell>
        <Typography variant="body2" sx={{ color: fg.secondary }}>
          {row.lastRun}
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
          <IconButton size="small" onClick={() => onToggle(row.id)}>
            {row.status === "running" ? (
              <PauseRegular fontSize={16} color={fg.secondary} />
            ) : (
              <PlayRegular fontSize={16} color={main.success} />
            )}
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(row.id)}>
            <DeleteRegular fontSize={16} color={main.error} />
          </IconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
