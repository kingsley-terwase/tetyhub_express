import { useState, useMemo } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { Table, TableHead, TableBody } from "@/components/ui";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";
import { services, columns } from "./lib";
import { ServiceRow } from "./ServiceRow";
import { SearchRegular, AddRegular } from "@fluentui/react-icons";
import { usePagination } from "@/lib/pagination.js";
import { TablePagination } from "@/components/shared/index.js";

const avatarColors = [
  "#6366f1",
  "#ec4899",
  "#14b8a6",
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
  "#f97316",
  "#06b6d4",
];

export default function ServicePage() {
  const { bg, fg, border, main } = useColor();
  const [selected, setSelected] = useState(/** @type {string[]} */ ([]));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () =>
      services.filter((s) => {
        const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" || s.status === filter;
        return matchSearch && matchFilter;
      }),
    [search, filter],
  );

  const pg = usePagination({ data: filtered, defaultPerPage: 5 });

  /** @param {string} id */
  const toggleOne = (id) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: bg.secondary,
      "& fieldset": { borderColor: border.primary },
    },
    "& input, & .MuiSelect-select": { color: fg.primary, fontSize: 14 },
  };

  return (
    <Stack gap={spacingTokens.md}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ color: fg.primary }}>
            Services
          </Typography>
          <Typography variant="caption" sx={{ color: fg.tertiary }}>
            {filtered.length} services
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          borderRadius: radius[8],
          border: `1px solid ${border.primary}`,
          backgroundColor: bg.secondary,
          overflow: "hidden",
        }}
      >
        <Stack
          direction="row"
          gap={1}
          flexWrap="wrap"
          alignItems="center"
          sx={{
            p: spacingTokens.md,
            borderBottom: `1px solid ${border.primary}`,
          }}
        >
          <TextField
            size="small"
            placeholder="Search services…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              pg.setPage(1);
            }}
            sx={{ ...inputSx, width: 240 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRegular fontSize={16} color={fg.tertiary} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            size="small"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              pg.setPage(1);
            }}
            sx={{ ...inputSx, width: 160 }}
          >
            {["all", "available", "unavailable", "maintenance"].map((s) => (
              <MenuItem
                key={s}
                value={s}
                sx={{ fontSize: 13, textTransform: "capitalize" }}
              >
                {s === "all" ? "All Status" : s}
              </MenuItem>
            ))}
          </TextField>
          <Stack
            direction="row"
            alignItems="center"
            gap={0.6}
            onClick={() => console.log("add")}
            sx={{
              ml: "auto",
              px: 1.5,
              py: 0.8,
              borderRadius: 1.5,
              cursor: "pointer",
              backgroundColor: main.primary,
              "&:hover": { opacity: 0.9 },
            }}
          >
            <AddRegular fontSize={16} color="#fff" />
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
              Add Service
            </span>
          </Stack>
        </Stack>

        <Table>
          <TableHead columns={columns} />
          <TableBody
            loading={false}
            count={pg.paginated.length}
            span={columns.length}
          >
            {pg.paginated.map((row, i) => (
              <ServiceRow
                key={row.id}
                row={row}
                avatarColor={avatarColors[i % avatarColors.length]}
                selected={selected.includes(row.id)}
                onSelect={() => toggleOne(row.id)}
                onEdit={(r) => console.log("edit", r)}
                onDelete={(id) => console.log("delete", id)}
              />
            ))}
          </TableBody>
        </Table>

        <TablePagination {...pg} total={filtered.length} />
      </Box>
    </Stack>
  );
}
