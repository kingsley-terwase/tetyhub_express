// @ts-nocheck
import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, Stack, Typography, IconButton } from "@mui/material";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { useServiceDetail } from "@/Hooks/services";

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
                {value ?? "—"}
            </Typography>
        </Stack>
    );
}

const LOCATION_LABELS = {
    vendor_location: "At vendor's location",
    customer_location: "At customer's location",
    remote: "Remote / online",
};

export default function ServiceDetailModal({ open, onClose, serviceId }) {
    const { fg } = useColor();
    const { fetchService, loading } = useServiceDetail();
    const [service, setService] = useState(null);

    useEffect(() => {
        if (open && serviceId) {
            setService(null);
            fetchService(serviceId).then((r) => {
                if (r.success) setService(r.result);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, serviceId]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: 16, fontWeight: 800, color: fg.primary }}>Service Details</Typography>
                <IconButton onClick={onClose} size="small">
                    <Dismiss24Regular style={{ fontSize: 18, color: fg.secondary }} />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pb: 3, maxHeight: "75vh" }}>
                {loading || !service ? (
                    <Typography sx={{ fontSize: 13, color: fg.tertiary, textAlign: "center", py: 3 }}>Loading...</Typography>
                ) : (
                    <Stack gap={1.6}>
                        {/* Note: service images are plain URL strings, not objects like
                products' images — this modal reflects that directly. */}
                        <Stack direction="row" gap={1} sx={{ overflowX: "auto" }}>
                            <Box component="img" src={service.thumbnail} alt="" sx={{ width: 96, height: 96, borderRadius: 2, objectFit: "cover", flexShrink: 0 }} />
                            {(service.images || []).map((url, i) => (
                                <Box key={i} component="img" src={url} alt="" sx={{ width: 96, height: 96, borderRadius: 2, objectFit: "cover", flexShrink: 0 }} />
                            ))}
                        </Stack>

                        <Typography sx={{ fontSize: 17, fontWeight: 800, color: fg.primary }}>{service.name}</Typography>
                        {service.short_description && (
                            <Typography sx={{ fontSize: 13, color: fg.secondary }}>{service.short_description}</Typography>
                        )}

                        <Box>
                            <Row label="Price" value={`₦${Number(service.base_price || 0).toLocaleString()}`} fg={fg} />
                            {service.compare_at_price && (
                                <Row label="Compare-at price" value={`₦${Number(service.compare_at_price).toLocaleString()}`} fg={fg} />
                            )}
                            <Row
                                label="Status"
                                value={
                                    <Box component="span" sx={{ color: service.status === "active" ? GREEN : GRAY, fontWeight: 700, textTransform: "capitalize" }}>
                                        {service.status}
                                    </Box>
                                }
                                fg={fg}
                            />
                            <Row label="Category" value={`${service.category_name || "—"} / ${service.subcategory_name || "—"}`} fg={fg} />
                            <Row label="Duration" value={service.duration_mins ? `${service.duration_mins} mins` : "—"} fg={fg} />
                            <Row label="Buffer between bookings" value={service.buffer_mins ? `${service.buffer_mins} mins` : "—"} fg={fg} />
                            <Row label="Max bookings per slot" value={service.max_bookings_per_slot} fg={fg} />
                            <Row label="Location" value={service.is_remote ? "Remote" : LOCATION_LABELS[service.location_type] || service.location_type} fg={fg} />
                            <Row
                                label="Cancellation policy"
                                value={
                                    service.cancellation_window_hours
                                        ? `${service.cancellation_window_hours}h notice, ${service.cancellation_fee_percent ?? 0}% fee`
                                        : "—"
                                }
                                fg={fg}
                            />
                            <Row label="Created" value={formatDate(service.created_at)} fg={fg} />
                            <Row label="Last updated" value={formatDate(service.updated_at)} fg={fg} />
                        </Box>
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    );
}