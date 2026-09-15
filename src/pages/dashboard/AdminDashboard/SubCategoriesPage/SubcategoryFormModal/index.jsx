// @ts-nocheck
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Stack,
    Typography,
    InputBase,
    Switch,
    Button,
    IconButton,
} from "@mui/material";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useCreateSubcategory, useUpdateSubcategory } from "@/Hooks/sub_categories";
import CategorySelect from "../CategorySelect";
import ImageUploadField from "../../CategoriesPage/CategoryFormModal/ImageUploadField";


export default function SubcategoryFormModal({ open, onClose, onSaved, editingSubcategory }) {
    const { fg, border, main } = useColor();
    const { createSubcategory, loading: creating } = useCreateSubcategory();
    const { updateSubcategory, loading: updating } = useUpdateSubcategory();

    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(true);
    const [imageFile, setImageFile] = useState(null);

    const isEditing = Boolean(editingSubcategory);
    const loading = creating || updating;

    useEffect(() => {
        if (open) {
            setName(editingSubcategory?.name || "");
            setCategoryId(editingSubcategory?.category_id || "");
            setDescription(editingSubcategory?.description || "");
            setStatus(editingSubcategory?.status ?? true);
            setImageFile(null);
        }
    }, [open, editingSubcategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = isEditing
            ? await updateSubcategory(editingSubcategory.id, { name, category_id: categoryId, description, status, imageFile })
            : await createSubcategory({ name, category_id: categoryId, description, imageFile });

        if (result.success) {
            onSaved?.();
            onClose();
        }
    };

    const fieldSx = {
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.sm ?? 8,
        px: 1.4,
        py: 1,
        mt: 0.3,
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit}>
                <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 800, color: fg.primary }}>
                        {isEditing ? "Edit Subcategory" : "New Subcategory"}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Dismiss24Regular style={{ fontSize: 18, color: fg.secondary }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Stack gap={1.8} sx={{ pt: 0.5 }}>
                        <ImageUploadField
                            existingImageUrl={editingSubcategory?.image}
                            onChange={setImageFile}
                            border={border}
                            fg={fg}
                            main={main}
                        />

                        <CategorySelect value={categoryId} onChange={setCategoryId} border={border} fg={fg} main={main} />

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>Name</Typography>
                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Mobile Phones & Tablets"
                                    sx={{ fontSize: 15, color: fg.primary }}
                                />
                            </Box>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>Description</Typography>
                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    sx={{ fontSize: 14, color: fg.primary }}
                                />
                            </Box>
                        </Stack>

                        {isEditing && (
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Typography sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}>Active</Typography>
                                <Switch
                                    checked={status}
                                    onChange={(e) => setStatus(e.target.checked)}
                                    sx={{
                                        "& .MuiSwitch-switchBase.Mui-checked": { color: main.primary },
                                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: main.primary },
                                    }}
                                />
                            </Stack>
                        )}
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={onClose} sx={{ textTransform: "none", color: fg.secondary }}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !name.trim() || !categoryId || (!isEditing && !imageFile)}
                        sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4 }}
                    >
                        {loading ? "Saving..." : isEditing ? "Save changes" : "Create subcategory"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}