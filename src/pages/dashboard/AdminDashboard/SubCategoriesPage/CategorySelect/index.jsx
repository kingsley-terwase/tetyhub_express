// @ts-nocheck
import { useEffect } from "react";
import { Select, MenuItem, Stack, Typography } from "@mui/material";
import { radiusTokens } from "@/lib/theme";
import { useCategories } from "@/Hooks/categories";


export default function CategorySelect({ value, onChange, border, fg, main }) {
    const { fetchCategories, categories, loading } = useCategories();

    useEffect(() => {
        fetchCategories({ offset: 0, limit: 100 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Stack gap={0.6}>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>Parent category</Typography>
            <Select
                fullWidth
                size="small"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                displayEmpty
                disabled={loading}
                sx={{
                    borderRadius: radiusTokens.sm ?? 8,
                    fontSize: 14,
                    color: fg.primary,
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: border.primary },
                }}
            >
                <MenuItem value="" disabled>
                    {loading ? "Loading categories..." : "Select a category"}
                </MenuItem>
                {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                    </MenuItem>
                ))}
            </Select>
        </Stack>
    );
}