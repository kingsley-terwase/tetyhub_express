// @ts-nocheck
import { useEffect, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { AddFilled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useServices } from "@/Hooks/services";
import ServicesTable from "./ServiceTable";
import ServiceFormModal from "./ServiceFormModal";

const PAGE_SIZE = 20;

export default function DashboardServicePage() {
    const { fg, bg, border, main } = useColor();
    const { fetchServices, services, loading } = useServices();

    const [offset, setOffset] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);

    const load = async () => {
        const result = await fetchServices({ offset, limit: PAGE_SIZE });
        setHasNextPage(Boolean(result.hasNextPage));
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset]);

    const handleAdd = () => {
        setEditingService(null);
        setModalOpen(true);
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setModalOpen(true);
    };

     const handleView = (service) => {
        setEditingService(service);
        setModalOpen(true);
    };

    const page = Math.floor(offset / PAGE_SIZE) + 1;

    return (
        <Box>
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent={{ xs: "start", md: "space-between" }}
                alignItems={{ xs: "start", md: "center" }}
                gap={1.6}
                sx={{ mb: 2.4 }}
            >
                <Box>
                    <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: fg.primary }}>Services</Typography>
                    <Typography sx={{ fontSize: 13, color: fg.secondary, mt: 0.4 }}>
                        The bookable services you offer.
                    </Typography>
                </Box>
                <Button
                    onClick={handleAdd}
                    variant="contained"
                    startIcon={<AddFilled />}
                    sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4, flexShrink: 0 }}
                >
                    New service
                </Button>
            </Stack>

            <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: radiusTokens.lg ?? 12, backgroundColor: bg.secondary, overflow: "hidden" }}>
                <ServicesTable services={services} loading={loading} fg={fg} border={border} onEdit={handleEdit} onView={handleView} />
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.6 }}>
                <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>Page {page}</Typography>
                <Stack direction="row" gap={1}>
                    <Button disabled={offset === 0} onClick={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))} sx={{ textTransform: "none", color: fg.secondary }}>
                        Previous
                    </Button>
                    <Button disabled={!hasNextPage} onClick={() => setOffset((o) => o + PAGE_SIZE)} sx={{ textTransform: "none", color: fg.secondary }}>
                        Next
                    </Button>
                </Stack>
            </Stack>

            <ServiceFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSaved={load} editingService={editingService} />
        </Box>
    );
}