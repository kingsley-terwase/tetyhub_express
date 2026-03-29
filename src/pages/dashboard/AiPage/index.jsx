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
import { agents, columns } from "./lib";
import { AiRow } from "./AiRow";
import { SearchRegular, AddRegular } from "@fluentui/react-icons";
import { usePagination } from "@/lib/pagination.js";
import { TablePagination } from "@/components/shared/index.js";

export default function AiPage() {
  const { bg, fg, border, main } = useColor();
  const [selected, setSelected] = useState(/** @type {string[]} */ ([]));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(agents);

  const filtered = useMemo(
    () =>
      data.filter((a) => {
        const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" || a.status === filter;
        return matchSearch && matchFilter;
      }),
    [data, search, filter],
  );

  const pg = usePagination({ data: filtered, defaultPerPage: 5 });

  /** @param {string} id */
  const toggleOne = (id) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  /** @param {string} id */
  const toggleAgent = (id) =>
    setData((prev) =>
      prev.map((a) =>
        a.id !== id
          ? a
          : {
              ...a,
              status: a.status === "running" ? "idle" : "running",
            },
      ),
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
            AI Agents
          </Typography>
          <Typography variant="caption" sx={{ color: fg.tertiary }}>
            {filtered.length} agents
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
            placeholder="Search agents…"
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
            sx={{ ...inputSx, width: 140 }}
          >
            {["all", "running", "idle", "failed"].map((s) => (
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
              New Agent
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
            {pg.paginated.map((row) => (
              <AiRow
                key={row.id}
                row={row}
                selected={selected.includes(row.id)}
                onSelect={() => toggleOne(row.id)}
                onToggle={toggleAgent}
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
