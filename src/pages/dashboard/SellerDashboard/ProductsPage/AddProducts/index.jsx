// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, Button, IconButton } from "@mui/material";
import { ArrowLeft24Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useCreateProduct } from "@/Hooks/products";
import ProductFormFields from "../ProductFormFields";

const DEFAULT_FORM = {
    name: "",
    short_description: "",
    description: "",
    sku: "",
    barcode: "",
    category_id: "",
    subcategory_id: "",
    brand: "",
    currency_id: "",
    price:0,
    compare_at_price: 0,
    cost_price: 0,
    discount: 0,
    track_inventory: true,
    stock: "",
    low_stock_threshold: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    tagsInput: "",
    meta_title: "",
    meta_description: "",
    free_shipping: false,
    is_featured: false,
    is_digital: false,
    status: "active",
    imageFiles: [],
};

export default function AddProductsPage() {
    const { fg, bg, border, main } = useColor();
    const navigate = useNavigate();
    const { createProduct, loading } = useCreateProduct();

    const [form, setForm] = useState(DEFAULT_FORM);
    const patch = (p) => setForm((f) => ({ ...f, ...p }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { tagsInput, ...rest } = form;
        const tags = tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        const result = await createProduct({ ...rest, tags });
        if (result.success) {
            navigate("/dashboard/seller/products");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", py: 3  }}>
            <Stack direction="row" alignItems="center" gap={1.2} sx={{ mb: 2.4 }}>
                <IconButton onClick={() => navigate("/dashboard/seller/products")} size="small">
                    <ArrowLeft24Regular style={{ fontSize: 18, color: fg.secondary }} />
                </IconButton>
                <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: fg.primary }}>New product</Typography>
            </Stack>

            <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: radiusTokens.lg ?? 12, backgroundColor: bg.secondary, p: 3 }}>
                <ProductFormFields value={form} onChange={patch} fg={fg} border={border} main={main} />
            </Box>

            <Stack direction="row" justifyContent="flex-end" gap={1.2} sx={{ mt: 2.4 }}>
                <Button onClick={() => navigate("/dashboard/seller/products")} sx={{ textTransform: "none", color: fg.secondary }}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4 }}
                >
                    {loading ? "Creating..." : "Create product"}
                </Button>
            </Stack>
        </Box>
    );
}