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
import { useCreateCategory, useUpdateCategory } from "@/Hooks/categories";
import ImageUploadField from "./ImageUploadField";

const TYPES = [
    { id: "product", label: "Product" },
    { id: "service", label: "Service" },
    { id: "both", label: "Both" },
];

/** Sliding segmented control for the fixed type enum — same pattern as the Scope picker on Admin Roles. */
function TypePicker({ value, onChange, border, fg, main, bg }) {
    const activeIndex = TYPES.findIndex((t) => t.id === value);

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                borderRadius: radiusTokens.md,
                border: `1px solid ${border.primary}`,
                backgroundColor: bg.primary,
                p: 0.4,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 4,
                    bottom: 4,
                    left: `calc(${(activeIndex * 100) / TYPES.length}% + 4px)`,
                    width: `calc(${100 / TYPES.length}% - 8px)`,
                    borderRadius: radiusTokens.sm ?? 6,
                    backgroundColor: main.primary,
                    transition: "left 0.25s ease",
                }}
            />
            {TYPES.map((t) => {
                const isActive = t.id === value;
                return (
                    <Box
                        key={t.id}
                        onClick={() => onChange(t.id)}
                        sx={{ position: "relative", zIndex: 1, flex: 1, textAlign: "center", py: 0.9, cursor: "pointer" }}
                    >
                        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: isActive ? "#fff" : fg.secondary }}>
                            {t.label}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
}

export default function CategoryFormModal({ open, onClose, onSaved, editingCategory }) {
    const { fg, bg, border, main } = useColor();
    const { createCategory, loading: creating } = useCreateCategory();
    const { updateCategory, loading: updating } = useUpdateCategory();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(true);
    const [type, setType] = useState("product");
    const [imageFile, setImageFile] = useState(null);

    const isEditing = Boolean(editingCategory);
    const loading = creating || updating;

    useEffect(() => {
        if (open) {
            setName(editingCategory?.name || "");
            setDescription(editingCategory?.description || "");
            setStatus(editingCategory?.status ?? true);
            setType(editingCategory?.type || "product");
            setImageFile(null);
        }
    }, [open, editingCategory]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = isEditing
            ? await updateCategory(editingCategory.id, { name, description, status, type, imageFile })
            : await createCategory({ name, description, type, imageFile });

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
                        {isEditing ? "Edit Category" : "New Category"}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Dismiss24Regular style={{ fontSize: 18, color: fg.secondary }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Stack gap={1.8} sx={{ pt: 0.5 }}>
                        <ImageUploadField
                            existingImageUrl={editingCategory?.image}
                            onChange={setImageFile}
                            border={border}
                            fg={fg}
                            main={main}
                        />

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>Name</Typography>
                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Electronics"
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
                                    placeholder="What belongs in this category?"
                                    sx={{ fontSize: 14, color: fg.primary }}
                                />
                            </Box>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>Type</Typography>
                            <TypePicker value={type} onChange={setType} border={border} fg={fg} main={main} bg={bg} />
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
                        disabled={loading || !name.trim() || (!isEditing && !imageFile)}
                        sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4 }}
                    >
                        {loading ? "Saving..." : isEditing ? "Save changes" : "Create category"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}