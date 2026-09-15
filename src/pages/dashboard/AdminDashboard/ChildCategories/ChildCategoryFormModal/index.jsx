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
import { useCreateChildCategory, useUpdateChildCategory } from "@/Hooks/child_categories";
import SubcategorySelect from "../SubCategoriesSelect";
import ImageUploadField from "../../CategoriesPage/CategoryFormModal/ImageUploadField";

export default function ChildCategoryFormModal({ open, onClose, onSaved, editingChildCategory }) {
    const { fg, border, main } = useColor();
    const { createChildCategory, loading: creating } = useCreateChildCategory();
    const { updateChildCategory, loading: updating } = useUpdateChildCategory();

    const [name, setName] = useState("");
    const [subcategoryId, setSubcategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(true);
    const [imageFile, setImageFile] = useState(null);

    const isEditing = Boolean(editingChildCategory);
    const loading = creating || updating;

    useEffect(() => {
        if (open) {
            setName(editingChildCategory?.name || "");
            setSubcategoryId(editingChildCategory?.subcategory_id || "");
            setDescription(editingChildCategory?.description || "");
            setStatus(editingChildCategory?.status ?? true);
            setImageFile(null);
        }
    }, [open, editingChildCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = isEditing
            ? await updateChildCategory(editingChildCategory.id, {
                name,
                subcategory_id: subcategoryId,
                description,
                status,
                imageFile,
            })
            : await createChildCategory({ name, subcategory_id: subcategoryId, description, imageFile });

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
                        {isEditing ? "Edit Child Category" : "New Child Category"}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Dismiss24Regular style={{ fontSize: 18, color: fg.secondary }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Stack gap={1.8} sx={{ pt: 0.5 }}>
                        <ImageUploadField
                            existingImageUrl={editingChildCategory?.image}
                            onChange={setImageFile}
                            border={border}
                            fg={fg}
                            main={main}
                        />

                        <SubcategorySelect value={subcategoryId} onChange={setSubcategoryId} border={border} fg={fg} />

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>Name</Typography>
                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Android"
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
                        disabled={loading || !name.trim() || !subcategoryId || (!isEditing && !imageFile)}
                        sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4 }}
                    >
                        {loading ? "Saving..." : isEditing ? "Save changes" : "Create child category"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}