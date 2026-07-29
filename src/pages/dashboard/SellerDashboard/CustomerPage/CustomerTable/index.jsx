import { Box } from "@mui/material";
import { Table, TableHead, TableBody } from "@/components/ui";
import { columns, avatarColors } from "../lib";
import { CustomerRow } from "../CustomerRow";
// @ts-ignore
import TablePagination from "@/components/shared/TablePagination";
import CustomerToolbar from "../CustomerToolbar";
import { radius } from "@/lib/theme";
import useColor from "@/contexts/color/useColor";

export default function CustomerTable({
  // @ts-ignore
  data,
  // @ts-ignore
  total,
  // @ts-ignore
  selected,
  // @ts-ignore
  toggleOne,
  // @ts-ignore
  search,
  // @ts-ignore
  setSearch,
  // @ts-ignore
  status,
  // @ts-ignore
  setStatus,
  // @ts-ignore
  pg,
  // @ts-ignore
  onView,
  // @ts-ignore
  onEdit,
  // @ts-ignore
  onMail,
}) {
  const { bg, border } = useColor();

  return (
    <Box
      sx={{
        borderRadius: radius[8],
        border: `1px solid ${border.primary}`,
        backgroundColor: bg.secondary,
        overflow: "hidden",
      }}
    >
      <CustomerToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        resetPage={() => pg.setPage(1)}
      />

      <Table>
        <TableHead columns={columns} />
        <TableBody count={data.length} span={columns.length}>
          {data.map(
            (
              // @ts-ignore
              row,
              // @ts-ignore
              i,
            ) => (
              <CustomerRow
                key={row.id}
                // @ts-ignore
                row={row}
                avatarColor={avatarColors[i % avatarColors.length]}
                selected={selected.includes(row.id)}
                onSelect={() => toggleOne(row.id)}
                onView={() => onView(row)}
                onEdit={() => onEdit(row)}
                onMail={() => onMail(row)}
              />
            ),
          )}
        </TableBody>
      </Table>
      <TablePagination {...pg} total={total} />
    </Box>
  );
}
