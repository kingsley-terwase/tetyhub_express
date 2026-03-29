import { useState, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Table, TableHead, TableBody } from "@/components/ui";
import { useColor } from "@/contexts/color";
import { spacingTokens, radius } from "@/lib/theme";
import { products, columns } from "./lib.jsx";
import { ProductRow } from "./ProductRow";
import { ProductsToolbar } from "./ProductToolbar";
import { usePagination } from "@/lib/pagination.js";
import TablePagination from "@/components/shared/TablePagination/index.jsx";

export default function ProductsPage() {
  const { bg, fg, border } = useColor();

  /** @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]} */
  // @ts-ignore
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /** @param {string} id */
  const toggleOne = (id) =>
    setSelected((p) =>
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
            onAdd={() => console.log("open add modal")}
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
                selected={selected.includes(row.id)}
                onSelect={() => toggleOne(row.id)}
                onEdit={(r) => console.log("edit", r)}
                onDelete={(id) => console.log("delete", id)}
              />
            ))}
          </TableBody>
        </Table>
        <TablePagination {...pg} total={filtered.length} />;
      </Box>
    </Stack>
  );
}
