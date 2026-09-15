// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { AddFilled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useSubcategories } from "@/Hooks/sub_categories";
import { useCategories } from "@/Hooks/categories";
import SubcategoriesTable from "./SubcategoriesTable";
import SubcategoryFormModal from "./SubcategoryFormModal";
import SubcategoryDetailModal from "./SubcategoryDetailModal";

export default function SubcategoriesPage() {
    const { fg, bg, border, main } = useColor();
    const { fetchSubcategories, subcategories, loading } = useSubcategories();
    const { fetchCategories, categories } = useCategories();

    const [modalOpen, setModalOpen] = useState(false);
    const [editingSubcategory, setEditingSubcategory] = useState(null);
    const [viewingId, setViewingId] = useState(null);

    useEffect(() => {
        fetchSubcategories();
        fetchCategories({ offset: 0, limit: 100 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const categoryMap = useMemo(() => {
        return Object.fromEntries(categories.map((c) => [c.id, c.name]));
    }, [categories]);

    const handleAdd = () => {
        setEditingSubcategory(null);
        setModalOpen(true);
    };

    const handleEdit = (sub) => {
        setEditingSubcategory(sub);
        setModalOpen(true);
    };

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
                    <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: fg.primary }}>Subcategories</Typography>
                    <Typography sx={{ fontSize: 13, color: fg.secondary, mt: 0.4 }}>
                        Finer groupings nested under each category.
                    </Typography>
                </Box>
                <Button
                    onClick={handleAdd}
                    variant="contained"
                    startIcon={<AddFilled />}
                    sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4, flexShrink: 0 }}
                >
                    New subcategory
                </Button>
            </Stack>

            <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: radiusTokens.lg ?? 12, backgroundColor: bg.secondary, overflow: "hidden" }}>
                <SubcategoriesTable
                    subcategories={subcategories}
                    loading={loading}
                    categoryMap={categoryMap}
                    fg={fg}
                    border={border}
                    main={main}
                    onView={setViewingId}
                    onEdit={handleEdit}
                />
            </Box>

            <SubcategoryFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSaved={fetchSubcategories}
                editingSubcategory={editingSubcategory}
            />
            <SubcategoryDetailModal
                open={Boolean(viewingId)}
                onClose={() => setViewingId(null)}
                subcategoryId={viewingId}
                categoryMap={categoryMap}
            />
        </Box>
    );
}