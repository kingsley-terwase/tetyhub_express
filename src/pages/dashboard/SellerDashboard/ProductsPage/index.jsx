import { useState, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Table, TableHead, TableBody } from "@/components/ui";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";
import { products, columns } from "./lib.jsx";
import { ProductRow } from "./ProductRow/index.jsx";
import { ProductsToolbar } from "./ProductToolbar/index.jsx";
import { usePagination } from "@/lib/pagination.js";
import TablePagination from "@/components/shared/TablePagination/index.jsx";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "@/components/feature/ConfirmDeleteModal/index.jsx";

export default function ProductsPage() {
  const { bg, fg, border } = useColor();

  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(
    /** @type {typeof products[number] | null} */ (null),
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
  const toggleOne = (/** @type {string} */ id) =>
    // @ts-ignore
    setSelected((p) =>
      // @ts-ignore
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === "all" || p.status === filter;
        return matchSearch && matchFilter;
      }),
    [search, filter],
  );

  const pg = usePagination({ data: filtered, defaultPerPage: 5 });

  const navigate = useNavigate();

  return (
    <Stack gap={spacingTokens.md}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="h5" fontWeight={700} sx={{ color: fg.primary }}>
            Products
          </Typography>
          <Typography variant="caption" sx={{ color: fg.tertiary }}>
            {filtered.length} product{filtered.length !== 1 ? "s" : ""}
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
        <Box
          sx={{
            p: spacingTokens.md,
            borderBottom: `1px solid ${border.primary}`,
          }}
        >
          <ProductsToolbar
            search={search}
            onSearch={setSearch}
            filter={filter}
            onFilter={setFilter}
            onAdd={() => navigate("/products/add")}
          />
        </Box>

        <Table>
          <TableHead columns={columns} />
          <TableBody
            loading={false}
            count={filtered.length}
            span={columns.length}
          >
            {filtered.map((row) => (
              <ProductRow
                key={row.id}
                row={row}
                // @ts-ignore
                selected={selected.includes(row.id)}
                onSelect={() => toggleOne(row.id)}
                onEdit={() => navigate(`/products/${row.id}/edit`)}
                onDelete={(row) => {
                  // @ts-ignore
                  setDeleteItem(row);
                  setDeleteOpen(true);
                }}
              />
            ))}
          </TableBody>
        </Table>

        <TablePagination {...pg} total={filtered.length} />
      </Box>
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
