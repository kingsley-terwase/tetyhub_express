import { useState, useMemo } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import { Table, TableHead, TableBody, Button } from "@/components/ui";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";
import { agents, columns } from "./lib";
import { AiRow } from "./AiRow";
import { CreateAgentModal } from "./Modal/CreateModalPage";
import { SearchRegular, AddRegular } from "@fluentui/react-icons";
import { usePagination } from "@/lib/pagination.js";
import { TablePagination } from "@/components/shared/index.js";
import { ConfirmDeleteModal } from "@/components/feature";

export default function AiPage() {
  const { bg, fg, border, main } = useColor();

  const [selected, setSelected] = useState(/** @type {string[]} */ ([]));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState(agents);
  const [modalOpen, setModalOpen] = useState(false);
  const [savingAgent, setSavingAgent] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(
    /** @type {typeof agents[number] | null} */ (null),
  );
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleConfirmDelete = () => {
    if (!deleteItem) return;

    setDeleteLoading(true);

    setTimeout(() => {
      console.log("deleted:", deleteItem.id);
      setDeleteLoading(false);
      setDeleteOpen(false);
      setDeleteItem(null);
    }, 800);
  };

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
          : { ...a, status: a.status === "running" ? "idle" : "running" },
      ),
    );

  /** @param {import("./Modal/CreateModalPage/UseAgentForm").AgentForm} form */
  const handleSave = async (form) => {
    setSavingAgent(true);

    await new Promise((r) => setTimeout(r, 800));
    console.log("new agent", form);
    setSavingAgent(false);
    setModalOpen(false);
  };

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

          <Button
            startContent={<AddRegular fontSize={16} />}
            onClick={() => setModalOpen(true)}
            sx={{
              ml: "auto",
              px: 1.5,
              py: 0.8,
              backgroundColor: main.primary,
              color: "#fff",
              "&:hover": { opacity: 0.9 },
            }}
          >
            New Agent
          </Button>
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
                onDelete={() => {
                  setDeleteItem(row);
                  setDeleteOpen(true);
                }}
              />
            ))}
          </TableBody>
        </Table>

        <TablePagination {...pg} total={filtered.length} />
      </Box>

      <CreateAgentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        loading={savingAgent}
      />

      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={deleteItem?.name || "this product"}
        loading={deleteLoading}
      />
    </Stack>
  );
}
