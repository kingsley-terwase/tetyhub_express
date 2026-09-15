// @ts-nocheck
import { useEffect } from "react";
import {
    Box,
    Stack,
    Typography,
    InputBase,
    Switch,
    MenuItem,
    Select,
} from "@mui/material";
import { usePublicCategories } from "@/Hooks/categories";
import { usePublicSubcategories } from "@/Hooks/sub_categories";
import { usePublicCurrencies } from "@/Hooks/currencies";
import MultiImageUploadField from "../MultiImageUploadField";
import FormSection from "../FormSection";

export const STATUS_OPTIONS = [
    { id: "active", label: "Active" },
    { id: "inactive", label: "Inactive" },
    { id: "draft", label: "Draft" },
    { id: "archived", label: "Archived" },
];

function fieldSx(border) {
    return {
        border: `1px solid ${border.primary}`,
        borderRadius: 2,
        px: 1.4,
        py: 1,
        mt: 0.3,
    };
}

function Field({ label, fg, children }) {
    return (
        <Stack gap={0.6}>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>{label}</Typography>
            {children}
        </Stack>
    );
}

function ToggleRow({ label, checked, onChange, fg, main }) {
    return (
        <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}>{label}</Typography>
            <Switch
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": { color: main.primary },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: main.primary },
                }}
            />
        </Stack>
    );
}

/**
 * `value` / `onChange(patch)` hold the full product form state as one
 * object so the Add and Edit pages can share this body without duplicating
 * ~20 individual useState calls.
 *
 * Note on types: everything typed into a number input still arrives as a
 * string via e.target.value — this component keeps that raw string in
 * state (so the input doesn't fight the user while typing "12." or ""),
 * and the actual number coercion happens once, at submit time, in the
 * products hooks. Don't skip that step if you change how this is wired up.
 *
 * Layout: sections are arranged in two columns on wider screens (left/right)
 * and collapse to a single stacked column on small screens. Images is kept
 * full-width across both columns since the uploader needs the extra room.
 */
export default function ProductFormFields({ value, onChange, existingImageUrls, fg, border, main }) {
    const { fetchCategories, categories } = usePublicCategories();
    const { fetchSubcategories, subcategories } = usePublicSubcategories();
    const { fetchCurrencies, currencies } = usePublicCurrencies();

    // Fire once on mount. fetchX isn't in the dep array on purpose — these
    // hooks return a new function identity every render (same as the rest
    // of your Hooks/*.js files), so including them would refetch on every
    // keystroke elsewhere in the form.
    useEffect(() => {
        fetchCategories();
        fetchSubcategories({ limit: 100 });
        fetchCurrencies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const set = (key) => (e) => onChange({ [key]: e.target?.value ?? e });
    const box = fieldSx(border);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 1.6,
                alignItems: "start",
            }}
        >
            <Box sx={{ gridColumn: { xs: "1", md: "1 / -1" } }}>
                <FormSection title="Images" fg={fg} border={border}>
                    <MultiImageUploadField
                        existingImageUrls={existingImageUrls}
                        onChange={(files) => onChange({ imageFiles: files })}
                        border={border}
                        fg={fg}
                        main={main}
                    />
                </FormSection>
            </Box>

            {/* Left column */}
            <Stack gap={1.6}>
                <FormSection title="Basic info" fg={fg} border={border}>
                    <Field label="Name" fg={fg}>
                        <Box sx={box}>
                            <InputBase fullWidth value={value.name} onChange={set("name")} placeholder="e.g. Wireless Mouse" sx={{ fontSize: 15, color: fg.primary }} />
                        </Box>
                    </Field>

                    <Field label="Short description" fg={fg}>
                        <Box sx={box}>
                            <InputBase fullWidth value={value.short_description} onChange={set("short_description")} placeholder="One-line summary shown in listings" sx={{ fontSize: 14, color: fg.primary }} />
                        </Box>
                    </Field>

                    <Field label="Description" fg={fg}>
                        <Box sx={box}>
                            <InputBase fullWidth multiline minRows={3} value={value.description} onChange={set("description")} placeholder="Full product details" sx={{ fontSize: 14, color: fg.primary }} />
                        </Box>
                    </Field>
                </FormSection>

                <FormSection title="Organization" description="Where this product lives in your catalog" fg={fg} border={border}>
                    <Stack direction="row" gap={1.2}>
                        <Box sx={{ flex: 1 }}>
                            <Field label="SKU" fg={fg}>
                                <Box sx={box}>
                                    <InputBase fullWidth value={value.sku} onChange={set("sku")} placeholder="e.g. WM-001" sx={{ fontSize: 14, color: fg.primary }} />
                                </Box>
                            </Field>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Field label="Barcode" fg={fg}>
                                <Box sx={box}>
                                    <InputBase fullWidth value={value.barcode} onChange={set("barcode")} placeholder="Optional" sx={{ fontSize: 14, color: fg.primary }} />
                                </Box>
                            </Field>
                        </Box>
                    </Stack>

                    <Field label="Category" fg={fg}>
                        <Box sx={box}>
                            <Select
                                fullWidth
                                variant="standard"
                                disableUnderline
                                displayEmpty
                                value={value.category_id || ""}
                                onChange={set("category_id")}
                                sx={{ fontSize: 14, color: fg.primary }}
                            >
                                <MenuItem value="" disabled>Select a category</MenuItem>
                                {categories.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Field>

                    <Field label="Subcategory" fg={fg}>
                        <Box sx={box}>
                            <Select
                                fullWidth
                                variant="standard"
                                disableUnderline
                                displayEmpty
                                value={value.subcategory_id || ""}
                                onChange={set("subcategory_id")}
                                sx={{ fontSize: 14, color: fg.primary }}
                            >
                                <MenuItem value="">None</MenuItem>
                                {subcategories
                                    .filter((s) => !value.category_id || s.category_id === value.category_id)
                                    .map((s) => (
                                        <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                                    ))}
                            </Select>
                        </Box>
                    </Field>

                    <Field label="Brand" fg={fg}>
                        <Box sx={box}>
                            <InputBase fullWidth value={value.brand} onChange={set("brand")} placeholder="Optional" sx={{ fontSize: 14, color: fg.primary }} />
                        </Box>
                    </Field>
                </FormSection>

                <FormSection title="Tags & SEO" defaultOpen={false} fg={fg} border={border}>
                    <Field label="Tags" fg={fg}>
                        <Box sx={box}>
                            <InputBase
                                fullWidth
                                value={value.tagsInput}
                                onChange={set("tagsInput")}
                                placeholder="Comma-separated, e.g. wireless, ergonomic"
                                sx={{ fontSize: 14, color: fg.primary }}
                            />
                        </Box>
                    </Field>

                    <Field label="Meta title" fg={fg}>
                        <Box sx={box}>
                            <InputBase fullWidth value={value.meta_title} onChange={set("meta_title")} placeholder="Optional, for SEO" sx={{ fontSize: 14, color: fg.primary }} />
                        </Box>
                    </Field>

                    <Field label="Meta description" fg={fg}>
                        <Box sx={box}>
                            <InputBase fullWidth multiline minRows={2} value={value.meta_description} onChange={set("meta_description")} placeholder="Optional, for SEO" sx={{ fontSize: 14, color: fg.primary }} />
                        </Box>
                    </Field>
                </FormSection>
            </Stack>

            {/* Right column */}
            <Stack gap={1.6}>
                <FormSection title="Pricing" fg={fg} border={border}>
                    <Stack direction="row" gap={1.2}>
                        <Box sx={{ flex: 1 }}>
                            <Field label="Currency" fg={fg}>
                                <Box sx={box}>
                                    <Select
                                        fullWidth
                                        variant="standard"
                                        disableUnderline
                                        displayEmpty
                                        value={value.currency_id || ""}
                                        onChange={set("currency_id")}
                                        sx={{ fontSize: 14, color: fg.primary }}
                                    >
                                        <MenuItem value="" disabled>Select</MenuItem>
                                        {currencies.map((c) => (
                                            <MenuItem key={c.id} value={c.id}>{c.code}</MenuItem>
                                        ))}
                                    </Select>
                                </Box>
                            </Field>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Field label="Price" fg={fg}>
                                <Box sx={box}>
                                    <InputBase fullWidth type="number" value={value.price} onChange={set("price")} placeholder="0.00" sx={{ fontSize: 14, color: fg.primary }} />
                                </Box>
                            </Field>
                        </Box>
                    </Stack>

                    <Stack direction="row" gap={1.2}>
                        <Box sx={{ flex: 1 }}>
                            <Field label="Compare-at price" fg={fg}>
                                <Box sx={box}>
                                    <InputBase fullWidth type="number" value={value.compare_at_price} onChange={set("compare_at_price")} placeholder="Optional" sx={{ fontSize: 14, color: fg.primary }} />
                                </Box>
                            </Field>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Field label="Cost price" fg={fg}>
                                <Box sx={box}>
                                    <InputBase fullWidth type="number" value={value.cost_price} onChange={set("cost_price")} placeholder="Optional" sx={{ fontSize: 14, color: fg.primary }} />
                                </Box>
                            </Field>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Field label="Discount %" fg={fg}>
                                <Box sx={box}>
                                    <InputBase fullWidth type="number" value={value.discount} onChange={set("discount")} placeholder="0" sx={{ fontSize: 14, color: fg.primary }} />
                                </Box>
                            </Field>
                        </Box>
                    </Stack>
                </FormSection>

                <FormSection title="Inventory & shipping" fg={fg} border={border}>
                    <ToggleRow label="Track inventory" checked={Boolean(value.track_inventory)} onChange={(v) => onChange({ track_inventory: v })} fg={fg} main={main} />

                    {value.track_inventory && (
                        <Stack direction="row" gap={1.2}>
                            <Box sx={{ flex: 1 }}>
                                <Field label="Stock" fg={fg}>
                                    <Box sx={box}>
                                        <InputBase fullWidth type="number" value={value.stock} onChange={set("stock")} placeholder="0" sx={{ fontSize: 14, color: fg.primary }} />
                                    </Box>
                                </Field>
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Field label="Low stock threshold" fg={fg}>
                                    <Box sx={box}>
                                        <InputBase fullWidth type="number" value={value.low_stock_threshold} onChange={set("low_stock_threshold")} placeholder="0" sx={{ fontSize: 14, color: fg.primary }} />
                                    </Box>
                                </Field>
                            </Box>
                        </Stack>
                    )}

                    <Stack direction="row" gap={1.2}>
                        <Box sx={{ flex: 1 }}>
                            <Field label="Weight (kg)" fg={fg}>
                                <Box sx={box}>
                                    <InputBase fullWidth type="number" value={value.weight} onChange={set("weight")} placeholder="Optional" sx={{ fontSize: 14, color: fg.primary }} />
                                </Box>
                            </Field>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Field label="L × W × H (cm)" fg={fg}>
                                <Stack direction="row" gap={0.8}>
                                    <Box sx={{ ...box, flex: 1 }}>
                                        <InputBase fullWidth type="number" value={value.length} onChange={set("length")} placeholder="L" sx={{ fontSize: 14, color: fg.primary }} />
                                    </Box>
                                    <Box sx={{ ...box, flex: 1 }}>
                                        <InputBase fullWidth type="number" value={value.width} onChange={set("width")} placeholder="W" sx={{ fontSize: 14, color: fg.primary }} />
                                    </Box>
                                    <Box sx={{ ...box, flex: 1 }}>
                                        <InputBase fullWidth type="number" value={value.height} onChange={set("height")} placeholder="H" sx={{ fontSize: 14, color: fg.primary }} />
                                    </Box>
                                </Stack>
                            </Field>
                        </Box>
                    </Stack>

                    <ToggleRow label="Free shipping" checked={Boolean(value.free_shipping)} onChange={(v) => onChange({ free_shipping: v })} fg={fg} main={main} />
                </FormSection>

                <FormSection title="Visibility" fg={fg} border={border}>
                    <Field label="Status" fg={fg}>
                        <Box sx={box}>
                            <Select
                                fullWidth
                                variant="standard"
                                disableUnderline
                                value={value.status}
                                onChange={set("status")}
                                sx={{ fontSize: 14, color: fg.primary }}
                            >
                                {STATUS_OPTIONS.map((s) => (
                                    <MenuItem key={s.id} value={s.id}>{s.label}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </Field>

                    <ToggleRow label="Featured" checked={Boolean(value.is_featured)} onChange={(v) => onChange({ is_featured: v })} fg={fg} main={main} />
                    <ToggleRow label="Digital product" checked={Boolean(value.is_digital)} onChange={(v) => onChange({ is_digital: v })} fg={fg} main={main} />
                </FormSection>
            </Stack>
        </Box>
    );
}