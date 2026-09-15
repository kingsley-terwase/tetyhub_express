// @ts-nocheck
import { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, IconButton } from "@mui/material";
import { ArrowLeft24Regular } from "@fluentui/react-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useProductDetail, useUpdateProduct } from "@/Hooks/products";
import ProductFormFields from "../ProductFormFields";

function toFormState(product) {
    return {
        name: product.name || "",
        short_description: product.short_description || "",
        description: product.description || "",
        sku: product.sku || "",
        barcode: product.barcode || "",
        category_id: product.category_id || "",
        subcategory_id: product.subcategory_id || "",
        brand: product.brand || "",
        currency_id: product.currency_id || "",
        price: product.price ?? "",
        compare_at_price: product.compare_at_price ?? "",
        cost_price: product.cost_price ?? "",
        discount: product.discount ?? "",
        track_inventory: Boolean(product.track_inventory),
        stock: product.stock ?? "",
        low_stock_threshold: product.low_stock_threshold ?? "",
        weight: product.weight ?? "",
        length: product.length ?? "",
        width: product.width ?? "",
        height: product.height ?? "",
        tagsInput: (product.tags || []).join(", "),
        meta_title: product.meta_title || "",
        meta_description: product.meta_description || "",
        free_shipping: Boolean(product.free_shipping),
        is_featured: Boolean(product.is_featured),
        is_digital: Boolean(product.is_digital),
        status: "active",
        imageFiles: [],
    };
}

// Mirrors the normalization ProductsTable needed: `images` from the API
// isn't guaranteed to be an array of plain URL strings — it can be objects
// like { url } / { image_url } / { path }. Without this, MultiImageUploadField
// ends up handing a non-string value to <img src>, which renders as broken.
function normalizeImageUrls(images) {
    if (!Array.isArray(images)) return [];
    return images
        .map((img) => (typeof img === "string" ? img : img?.url || img?.image_url || img?.path))
        .filter(Boolean);
}

export default function EditProductsPage() {
    const { fg, bg, border, main } = useColor();
    const navigate = useNavigate();
    const { id } = useParams();
    const { fetchProduct, loading: fetching } = useProductDetail();
    const { updateProduct, loading: saving } = useUpdateProduct();

    const [form, setForm] = useState(null);
    const [existingImageUrls, setExistingImageUrls] = useState([]);
    const patch = (p) => setForm((f) => ({ ...f, ...p }));

    useEffect(() => {
        fetchProduct(id).then((r) => {
            if (r.success) {
                setForm(toFormState(r.result));
                setExistingImageUrls(normalizeImageUrls(r.result.images));
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form) return;

        const { tagsInput, ...rest } = form;
        const tags = tagsInput
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        const result = await updateProduct(id, { ...rest, tags });
        if (result.success) {
            navigate("/dashboard/seller/products");
        }
    };

    if (fetching || !form) {
        return (
            <Typography sx={{ fontSize: 13, color: fg.tertiary, textAlign: "center", py: 6 }}>Loading...</Typography>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', py: 3 }}>
            <Stack direction="row" alignItems="center" gap={1.2} sx={{ mb: 2.4 }}>
                <IconButton onClick={() => navigate("/dashboard/seller/products")} size="small">
                    <ArrowLeft24Regular style={{ fontSize: 18, color: fg.secondary }} />
                </IconButton>
                <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: fg.primary }}>Edit product</Typography>
            </Stack>

            <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: radiusTokens.lg ?? 12, backgroundColor: bg.secondary, p: 3 }}>
                <ProductFormFields
                    value={form}
                    onChange={patch}
                    existingImageUrls={existingImageUrls}
                    fg={fg}
                    border={border}
                    main={main}
                />
            </Box>

            <Stack direction="row" justifyContent="flex-end" gap={1.2} sx={{ mt: 2.4 }}>
                <Button onClick={() => navigate("/dashboard/seller/products")} sx={{ textTransform: "none", color: fg.secondary }}>
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={saving}
                    sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4 }}
                >
                    {saving ? "Saving..." : "Save changes"}
                </Button>
            </Stack>
        </Box>
    );
}