// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { AddFilled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useChildCategories } from "@/Hooks/child_categories";
import { useSubcategories } from "@/Hooks/sub_categories";
import ChildCategoriesTable from "./ChildCategoriesTable";
import ChildCategoryFormModal from "./ChildCategoryFormModal";
import ChildCategoryDetailModal from "./ChildCategoryDetailModal";

const PAGE_SIZE = 20;

export default function ChildCategoriesPage() {
    const { fg, bg, border, main } = useColor();
    const { fetchChildCategories, childCategories, loading } = useChildCategories();
    const { fetchSubcategories, subcategories } = useSubcategories();

    const [offset, setOffset] = useState(0);
    const [mightHaveMore, setMightHaveMore] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingChildCategory, setEditingChildCategory] = useState(null);
    const [viewingId, setViewingId] = useState(null);

    const load = async () => {
        const result = await fetchChildCategories({ offset, limit: PAGE_SIZE });
        setMightHaveMore(Boolean(result.mightHaveMore));
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset]);

    useEffect(() => {
        fetchSubcategories(); // for resolving subcategory_id → name in the table/detail view
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const subcategoryMap = useMemo(
        () => Object.fromEntries(subcategories.map((s) => [s.id, s.name])),
        [subcategories]
    );

    const handleAdd = () => {
        setEditingChildCategory(null);
        setModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingChildCategory(item);
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
                    <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: fg.primary }}>Child Categories</Typography>
                    <Typography sx={{ fontSize: 13, color: fg.secondary, mt: 0.4 }}>
                        The most specific level, nested under each subcategory.
                    </Typography>
                </Box>
                <Button
                    onClick={handleAdd}
                    variant="contained"
                    startIcon={<AddFilled />}
                    sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4, flexShrink: 0 }}
                >
                    New child category
                </Button>
            </Stack>

            <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: radiusTokens.lg ?? 12, backgroundColor: bg.secondary, overflow: "hidden" }}>
                <ChildCategoriesTable
                    childCategories={childCategories}
                    loading={loading}
                    subcategoryMap={subcategoryMap}
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

            <ChildCategoryFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSaved={load}
                editingChildCategory={editingChildCategory}
            />
            <ChildCategoryDetailModal
                open={Boolean(viewingId)}
                onClose={() => setViewingId(null)}
                childCategoryId={viewingId}
                subcategoryMap={subcategoryMap}
            />
        </Box>
    );
}