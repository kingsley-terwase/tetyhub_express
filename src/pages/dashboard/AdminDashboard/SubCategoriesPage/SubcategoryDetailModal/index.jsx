// @ts-nocheck
import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, Stack, Typography, IconButton } from "@mui/material";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { useSubcategoryDetail } from "@/Hooks/sub_categories";

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

export default function SubcategoryDetailModal({ open, onClose, subcategoryId, categoryMap }) {
    const { fg } = useColor();
    const { fetchSubcategory, loading } = useSubcategoryDetail();
    const [subcategory, setSubcategory] = useState(null);

    useEffect(() => {
        if (open && subcategoryId) {
            setSubcategory(null);
            fetchSubcategory(subcategoryId).then((r) => {
                if (r.success) {
                    // Backend sometimes returns `result` as an array with a single
                    // item instead of a plain object. Unwrap it so we always end
                    // up with a single subcategory object here.
                    const data = Array.isArray(r.result) ? r.result[0] : r.result;
                    setSubcategory(data || null);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, subcategoryId]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 16, fontWeight: 800, color: fg.primary }}>Subcategory Details</Typography>
                <IconButton onClick={onClose} size="small">
                    <Dismiss24Regular style={{ fontSize: 18, color: fg.secondary }} />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pb: 3 }}>
                {loading || !subcategory ? (
                    <Typography sx={{ fontSize: 13, color: fg.tertiary, textAlign: "center", py: 3 }}>Loading...</Typography>
                ) : (
                    <Stack gap={1.6}>
                        <Box
                            component="img"
                            src={subcategory.image}
                            alt=""
                            sx={{ width: "100%", height: 160, borderRadius: 2, objectFit: "cover" }}
                        />
                        <Typography sx={{ fontSize: 17, fontWeight: 800, color: fg.primary }}>{subcategory.name}</Typography>
                        {subcategory.description && (
                            <Typography sx={{ fontSize: 13, color: fg.secondary }}>{subcategory.description}</Typography>
                        )}

                        <Box>
                            <Row label="Parent category" value={categoryMap?.[subcategory.category_id] || `#${subcategory.category_id}`} fg={fg} />
                            <Row label="Slug" value={subcategory.slug} fg={fg} />
                            <Row
                                label="Status"
                                value={
                                    <Box component="span" sx={{ color: subcategory.status ? GREEN : GRAY, fontWeight: 700 }}>
                                        {subcategory.status ? "Active" : "Inactive"}
                                    </Box>
                                }
                                fg={fg}
                            />
                            <Row label="Created" value={formatDate(subcategory.created_at)} fg={fg} />
                            <Row label="Last updated" value={formatDate(subcategory.updated_at)} fg={fg} />
                        </Box>
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    );
}