// @ts-nocheck
import { Table, TableBody, TableCell, TableHead, TableRow, Chip, IconButton, Typography } from "@mui/material";
import { Edit16Regular } from "@fluentui/react-icons";

const GREEN = "#22C55E";
const GRAY = "#94A3B8";

export default function CurrenciesTable({ currencies, loading, fg, border, onEdit }) {
    if (loading) {
        return <Typography sx={{ fontSize: 13, color: fg.tertiary, textAlign: "center", py: 4 }}>Loading...</Typography>;
    }

    if (!currencies.length) {
        return <Typography sx={{ fontSize: 13, color: fg.tertiary, textAlign: "center", py: 4 }}>No currencies yet.</Typography>;
    }

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontSize: 12, fontWeight: 700, color: fg.tertiary, borderColor: border.primary }}>Code</TableCell>
                    <TableCell sx={{ fontSize: 12, fontWeight: 700, color: fg.tertiary, borderColor: border.primary }}>Name</TableCell>
                    <TableCell sx={{ fontSize: 12, fontWeight: 700, color: fg.tertiary, borderColor: border.primary }}>Status</TableCell>
                    <TableCell sx={{ fontSize: 12, fontWeight: 700, color: fg.tertiary, borderColor: border.primary }} align="right">
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {currencies.map((c) => (
                    <TableRow key={c.id} hover>
                        <TableCell sx={{ fontSize: 13, fontWeight: 700, color: fg.primary, borderColor: border.primary }}>
                            {c.code}
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: fg.primary, borderColor: border.primary }}>{c.name}</TableCell>
                        <TableCell sx={{ borderColor: border.primary }}>
                            <Chip
                                label={c.status ? "Active" : "Inactive"}
                                size="small"
                                sx={{
                                    backgroundColor: `${c.status ? GREEN : GRAY}1A !important`,
                                    fontWeight: 700,
                                    fontSize: 11.5,
                                    "& .MuiChip-label": {
                                        color: `${c.status ? GREEN : GRAY} !important`,
                                    },
                                }}
                            />
                        </TableCell>
                        <TableCell align="right" sx={{ borderColor: border.primary }}>
                            <IconButton size="small" onClick={() => onEdit(c)}>
                                <Edit16Regular style={{ fontSize: 16, color: fg.secondary }} />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}