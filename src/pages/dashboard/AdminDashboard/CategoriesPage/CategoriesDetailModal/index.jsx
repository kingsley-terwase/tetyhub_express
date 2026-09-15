// @ts-nocheck
import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, Stack, Typography, IconButton } from "@mui/material";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { useCategoryDetail } from "@/Hooks/categories";

const GREEN = "#22C55E";
const GRAY = "#94A3B8";

function formatDate(iso) {
    if (!iso) return "—";
    try {
        return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
    } catch {
        return "—";
    }
}

function Row({ label, value, fg }) {
    return (
        <Stack direction="row" justifyContent="space-between" sx={{ py: 0.9, borderBottom: `1px solid ${fg.tertiary}22` }}>
            <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>{label}</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: fg.primary, textAlign: "right", maxWidth: "60%" }}>
                {value}
            </Typography>
        </Stack>
    );
}

export default function CategoryDetailModal({ open, onClose, categoryId }) {
    const { fg, main } = useColor();
    const { fetchCategory, loading } = useCategoryDetail();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        if (open && categoryId) {
            setCategory(null);
            fetchCategory(categoryId).then((r) => {
                if (r.success) setCategory(r.result);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, categoryId]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 16, fontWeight: 800, color: fg.primary }}>Category Details</Typography>
                <IconButton onClick={onClose} size="small">
                    <Dismiss24Regular style={{ fontSize: 18, color: fg.secondary }} />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pb: 3 }}>
                {loading || !category ? (
                    <Typography sx={{ fontSize: 13, color: fg.tertiary, textAlign: "center", py: 3 }}>Loading...</Typography>
                ) : (
                    <Stack gap={1.6}>
                        <Box
                            component="img"
                            src={category.image}
                            alt=""
                            sx={{ width: "100%", height: 160, borderRadius: 2, objectFit: "cover" }}
                        />
                        <Typography sx={{ fontSize: 17, fontWeight: 800, color: fg.primary }}>{category.name}</Typography>
                        {category.description && (
                            <Typography sx={{ fontSize: 13, color: fg.secondary }}>{category.description}</Typography>
                        )}

                        <Box>
                            <Row label="Type" value={{ products: "Products", services: "Services", both: "Both" }[category.type] || category.type || "—"} fg={fg} />
                            <Row label="Slug" value={category.slug} fg={fg} />
                            <Row
                                label="Status"
                                value={
                                    <Box component="span" sx={{ color: category.status ? GREEN : GRAY, fontWeight: 700 }}>
                                        {category.status ? "Active" : "Inactive"}
                                    </Box>
                                }
                                fg={fg}
                            />
                            <Row label="Created" value={formatDate(category.created_at)} fg={fg} />
                            <Row label="Last updated" value={formatDate(category.updated_at)} fg={fg} />
                        </Box>
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    );
}