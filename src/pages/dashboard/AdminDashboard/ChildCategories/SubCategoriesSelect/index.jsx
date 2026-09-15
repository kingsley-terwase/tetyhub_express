// @ts-nocheck
import { useEffect } from "react";
import { Select, MenuItem, Stack, Typography } from "@mui/material";
import { radiusTokens } from "@/lib/theme";
import { useSubcategories } from "@/Hooks/sub_categories";

export default function SubcategorySelect({ value, onChange, border, fg }) {
    const { fetchSubcategories, subcategories, loading } = useSubcategories();

    useEffect(() => {
        fetchSubcategories();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Stack gap={0.6}>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>Parent subcategory</Typography>
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
                    {loading ? "Loading subcategories..." : "Select a subcategory"}
                </MenuItem>
                {subcategories.map((sub) => (
                    <MenuItem key={sub.id} value={sub.id}>
                        {sub.name}
                    </MenuItem>
                ))}
            </Select>
        </Stack>
    );
}