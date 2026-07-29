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
import { campaigns, columns } from "./lib";
import { SearchRegular, AddRegular } from "@fluentui/react-icons";
import { usePagination } from "@/lib/pagination";
import { CampaignRow } from "./CampaignRow";
import { TablePagination } from "@/components/shared";
import CreateCampaignModal from "./Modal/CreateCampaignModal";
import EditCampaignModal from "./Modal/EditCampaignModal";
import ConfirmDeleteModal from "@/components/feature/ConfirmDeleteModal";

export default function CampaignPage() {
  const { bg, fg, border, main } = useColor();
  const [selected, setSelected] = useState(/** @type {string[]} */ ([]));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(
    /** @type {typeof campaigns[number] | null} */ (null),
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
      campaigns.filter((c) => {
        const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" || c.status === filter;
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

  const handleCreate = (/** @type {any} */ draft) => {
    console.log("new campaign:", draft);
  };

  const handleEdit = (/** @type {any} */ draft) => {
    console.log("updated campaign:", draft);
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: bg.secondary,
      "& fieldset": { borderColor: border.primary },
    },
    "& input, & .MuiSelect-select": { color: fg.primary, fontSize: 14 },
  };

  return (
    <>
      <Stack gap={spacingTokens.md}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ color: fg.primary }}
            >
              Campaigns
            </Typography>
            <Typography variant="caption" sx={{ color: fg.tertiary }}>
              {filtered.length} campaigns
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
              placeholder="Search campaigns…"
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
              {["all", "active", "paused", "ended"].map((s) => (
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
              onClick={() => setCreateOpen(true)}
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
                New Campaign
              </span>
            </Stack>
          </Stack>

          <Table>
            <TableHead columns={[...columns, { label: "Actions" }]} />
            <TableBody
              loading={false}
              count={pg.paginated.length}
              span={columns.length + 1}
            >
              {pg.paginated.map((row) => (
                <CampaignRow
                  key={row.id}
                  row={row}
                  selected={selected.includes(row.id)}
                  onSelect={() => toggleOne(row.id)}
                  onEdit={() => setEditOpen(true)}
                  // @ts-ignore
                  onDelete={() => setDeleteItem(row) || setDeleteOpen(true)}
                />
              ))}
            </TableBody>
          </Table>

          <TablePagination {...pg} total={filtered.length} />
        </Box>
      </Stack>

      <CreateCampaignModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={handleCreate}
      />
      <EditCampaignModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSubmit={handleEdit}
      />
      <ConfirmDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={deleteItem?.name || "this product"}
        loading={deleteLoading}
      />
    </>
  );
}
