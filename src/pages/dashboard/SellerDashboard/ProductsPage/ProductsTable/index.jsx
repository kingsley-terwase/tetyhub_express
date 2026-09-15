// @ts-nocheck
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Chip, IconButton, Typography, Box, Stack } from "@mui/material";
import { Edit16Regular, Image16Regular } from "@fluentui/react-icons";

const GREEN = "#22C55E";
const GRAY = "#94A3B8";
const RED = "#EF4444";

function formatPrice(price, currencyCode) {
    if (price === undefined || price === null) return "—";
    const amount = Number(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return currencyCode ? `${currencyCode} ${amount}` : amount;
}

// The images array coming back from the API isn't guaranteed to be a plain
// array of URL strings — depending on the endpoint it can be objects like
// { url } / { image_url } / { path }, or the product may have no images at
// all. This normalizes all of those into a single usable URL (or null),
// so the table never hands an empty/undefined src to <img>.
function getThumbnailUrl(p) {
    const first = Array.isArray(p.images) ? p.images[0] : undefined;
    const candidate =
        (typeof first === "string" ? first : first?.url || first?.image_url || first?.path) ||
        p.thumbnail ||
        p.thumbnail_url;
    return candidate || null;
}

function ProductThumbnail({ p, border, fg }) {
    const [failed, setFailed] = useState(false);
    const src = getThumbnailUrl(p);

    if (!src || failed) {
        return (
            <Box
                sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    border: `1px solid ${border.primary}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: `${border.primary}33`,
                    flexShrink: 0,
                }}
            >
                <Image16Regular style={{ fontSize: 16, color: fg.tertiary }} />
            </Box>
        );
    }

    return (
        <Box
            component="img"
            src={src}
            alt=""
            sx={{ width: 36, height: 36, borderRadius: 1.5, objectFit: "cover", border: `1px solid ${border.primary}`, flexShrink: 0 }}
            // If the URL resolves but the file 404s / CORS-fails, fall back to
            // the placeholder rather than leaving the browser's broken-image icon.
            onError={() => setFailed(true)}
        />
    );
}

export default function ProductsTable({ products, loading, fg, border, onEdit }) {
    if (loading) {
        return <Typography sx={{ fontSize: 13, color: fg.tertiary, textAlign: "center", py: 4 }}>Loading...</Typography>;
    }

    if (!products.length) {
        return <Typography sx={{ fontSize: 13, color: fg.tertiary, textAlign: "center", py: 4 }}>No products yet.</Typography>;
    }

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontSize: 12, fontWeight: 700, color: fg.tertiary, borderColor: border.primary }}>Product</TableCell>
                    <TableCell sx={{ fontSize: 12, fontWeight: 700, color: fg.tertiary, borderColor: border.primary }}>Price</TableCell>
                    <TableCell sx={{ fontSize: 12, fontWeight: 700, color: fg.tertiary, borderColor: border.primary }}>Stock</TableCell>
                    <TableCell sx={{ fontSize: 12, fontWeight: 700, color: fg.tertiary, borderColor: border.primary }}>Status</TableCell>
                    <TableCell sx={{ fontSize: 12, fontWeight: 700, color: fg.tertiary, borderColor: border.primary }} align="right">
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {products.map((p) => (
                    <TableRow key={p.id} hover>
                        <TableCell sx={{ borderColor: border.primary }}>
                            <Stack direction="row" alignItems="center" gap={1.2}>
                                <ProductThumbnail p={p} border={border} fg={fg} />
                                <Box>
                                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}>{p.name}</Typography>
                                    {p.sku && (
                                        <Typography sx={{ fontSize: 11, color: fg.tertiary }}>SKU: {p.sku}</Typography>
                                    )}
                                </Box>
                            </Stack>
                        </TableCell>
                        <TableCell sx={{ fontSize: 13, color: fg.primary, borderColor: border.primary }}>
                            {formatPrice(p.price, p.currency?.code)}
                        </TableCell>
                        <TableCell sx={{ borderColor: border.primary }}>
                            <Typography sx={{ fontSize: 13, color: p.stock > 0 ? fg.primary : RED, fontWeight: p.stock > 0 ? 400 : 700 }}>
                                {p.track_inventory ? p.stock ?? 0 : "—"}
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ borderColor: border.primary }}>
                            <Chip
                                label={p.status ? "Active" : "Inactive"}
                                size="small"
                                // The theme forces MuiChip's default color to "primary" and
                                // styles `.MuiChip-colorPrimary` (root+color, 2 classes) plus a
                                // `"& *"` rule that hardcodes the label text white. Both beat a
                                // plain sx class on specificity, so this needs `!important` and
                                // an explicit label override to actually take effect.
                                sx={{
                                    backgroundColor: `${p.status ? GREEN : GRAY}1A !important`,
                                    fontWeight: 700,
                                    fontSize: 11.5,
                                    "& .MuiChip-label": {
                                        color: `${p.status ? GREEN : GRAY} !important`,
                                    },
                                }}
                            />
                        </TableCell>
                        <TableCell align="right" sx={{ borderColor: border.primary }}>
                            <IconButton size="small" onClick={() => onEdit(p)}>
                                <Edit16Regular style={{ fontSize: 16, color: fg.secondary }} />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}