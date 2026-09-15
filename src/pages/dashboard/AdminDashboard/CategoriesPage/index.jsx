// @ts-nocheck
import { useEffect, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { AddFilled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useCategories } from "@/Hooks/categories";
import CategoriesTable from "./CategoriesTable";
import CategoryFormModal from "./CategoryFormModal";
import CategoriesDetailModal from "./CategoriesDetailModal";

const PAGE_SIZE = 20;

export default function CategoriesPage() {
    const { fg, bg, border, main } = useColor();
    const { fetchCategories, categories, loading } = useCategories();

    const [offset, setOffset] = useState(0);
    const [mightHaveMore, setMightHaveMore] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [viewingId, setViewingId] = useState(null);

    const load = async () => {
        const result = await fetchCategories({ offset, limit: PAGE_SIZE });
        setMightHaveMore(Boolean(result.mightHaveMore));
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset]);

    const handleAdd = () => {
        setEditingCategory(null);
        setModalOpen(true);
    };

    const handleEdit = (cat) => {
        setEditingCategory(cat);
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
                    <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: fg.primary }}>Categories</Typography>
                    <Typography sx={{ fontSize: 13, color: fg.secondary, mt: 0.4 }}>
                        The top-level groupings buyers browse by.
                    </Typography>
                </Box>
                <Button
                    onClick={handleAdd}
                    variant="contained"
                    startIcon={<AddFilled />}
                    sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4, flexShrink: 0 }}
                >
                    New category
                </Button>
            </Stack>

            <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: radiusTokens.lg ?? 12, backgroundColor: bg.secondary, overflow: "hidden" }}>
                <CategoriesTable
                    categories={categories}
                    loading={loading}
                    fg={fg}
                    border={border}
                    main={main}
                    onView={setViewingId}
                    onEdit={handleEdit}
                />
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.6 }}>
                <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>Page {page}</Typography>
                <Stack direction="row" gap={1}>
                    <Button disabled={offset === 0} onClick={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))} sx={{ textTransform: "none", color: fg.secondary }}>
                        Previous
                    </Button>
                    <Button disabled={!mightHaveMore} onClick={() => setOffset((o) => o + PAGE_SIZE)} sx={{ textTransform: "none", color: fg.secondary }}>
                        Next
                    </Button>
                </Stack>
            </Stack>

            <CategoryFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSaved={load} editingCategory={editingCategory} />
            <CategoriesDetailModal open={Boolean(viewingId)} onClose={() => setViewingId(null)} categoryId={viewingId} />
        </Box>
    );
}