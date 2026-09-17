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
import { useCreateCurrency, useUpdateCurrency } from "@/Hooks/currencies";

export default function CurrencyFormModal({ open, onClose, onSaved, editingCurrency }) {
    const { fg, border, main } = useColor();
    const { createCurrency, loading: creating } = useCreateCurrency();
    const { updateCurrency, loading: updating } = useUpdateCurrency();

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [status, setStatus] = useState(true);

    const isEditing = Boolean(editingCurrency);
    const loading = creating || updating;

    useEffect(() => {
        if (open) {
            setName(editingCurrency?.name || "");
            setCode(editingCurrency?.code || "");
            setStatus(editingCurrency?.status ?? true);
        }
    }, [open, editingCurrency]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = isEditing
            ? await updateCurrency(editingCurrency.id, { name, code, status })
            : await createCurrency({ name, code });

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
                        {isEditing ? "Edit Currency" : "New Currency"}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Dismiss24Regular style={{ fontSize: 18, color: fg.secondary }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Stack gap={1.8} sx={{ pt: 0.5 }}>
                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>Name</Typography>
                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Nigerian Naira"
                                    sx={{ fontSize: 15, color: fg.primary }}
                                />
                            </Box>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>Code</Typography>
                            <Box sx={fieldSx}>
                                <InputBase
                                    fullWidth
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                                    placeholder="e.g. NGN"
                                    inputProps={{ maxLength: 6 }}
                                    sx={{ fontSize: 15, color: fg.primary, textTransform: "uppercase" }}
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
                        disabled={loading || !name.trim() || !code.trim()}
                        sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4 }}
                    >
                        {loading ? "Saving..." : isEditing ? "Save changes" : "Create currency"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}