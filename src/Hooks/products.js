// @ts-nocheck
import { useState } from "react";
import axiosInstance from "../Utils/AxiosInstance";
import { getErrorMessage } from "../Utils/Msg";
import { useNotification } from "@/contexts/notification";

export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/** GET /vendor/products?offset=&limit= */
export const useProducts = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const { error: notifyError } = useNotification();

    const fetchProducts = async ({ offset = 0, limit = 20 } = {}) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/vendor/products", { params: { offset, limit } });
            const { result, success, message } = response.data;

            if (!success || !result) {
                notifyError(message || "Could not load products");
                setLoading(false);
                return { success: false };
            }

            setProducts(result.data || []);
            setTotal(result.pagination?.total || 0);
            setLoading(false);
            return { success: true, hasNextPage: Boolean(result.pagination?.has_next_page) };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load products"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchProducts, products, total, loading };
};

/** GET /vendor/product/{id} */
export const useProductDetail = () => {
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchProduct = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/vendor/product/${id}`);
            const { result, success, message } = response.data;

            if (!success || !result) {
                notifyError(message || "Could not load product");
                setLoading(false);
                return { success: false };
            }

            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load product"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchProduct, loading };
};

/**
 * POST /vendor/product/create
 * ⚠️ Unlike categories/admins, this endpoint takes a raw JSON body, not
 * urlencoded form data — confirmed from the Postman collection example.
 * Images are sent as an array of base64 data URLs (same encoding as the
 * single-image category upload, just multiple of them).
 */
export const useCreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const createProduct = async ({ imageFiles = [], ...payload }) => {
        setLoading(true);
        try {
            if (!payload.name) {
                notifyError("Product name is required");
                setLoading(false);
                return { success: false };
            }
            if (!payload.price) {
                notifyError("Price is required");
                setLoading(false);
                return { success: false };
            }
            if (!payload.category_id) {
                notifyError("Category is required");
                setLoading(false);
                return { success: false };
            }
            if (!imageFiles.length) {
                notifyError("At least one image is required");
                setLoading(false);
                return { success: false };
            }

            const images = await Promise.all(imageFiles.map(fileToBase64));

            const response = await axiosInstance.post("/vendor/product/create", {
                ...payload,
                images,
            });

            const { message, success, result } = response.data;
            if (!success) {
                notifyError(message || "Could not create product");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Product added successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not create product"));
            setLoading(false);
            return { success: false };
        }
    };

    return { createProduct, loading };
};

/**
 * PATCH /vendor/product/update/{id}
 * ⚠️ Assumption: the Postman entry for this request was saved without a
 * URL, so the path is inferred from the same `/vendor/product/...` naming
 * as create/read/id. Confirm against your backend route once wired up.
 * Also assumes — same as categories — that omitting `imageFiles` leaves
 * existing images untouched rather than clearing them.
 */
export const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const updateProduct = async (id, { imageFiles, ...payload }) => {
        setLoading(true);
        try {
            const body = { ...payload };

            if (imageFiles && imageFiles.length) {
                body.images = await Promise.all(imageFiles.map(fileToBase64));
            }

            const response = await axiosInstance.patch(`/vendor/product/update/${id}`, body);

            const { message, success, result } = response.data;
            if (!success) {
                notifyError(message || "Could not update product");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Product updated successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not update product"));
            setLoading(false);
            return { success: false };
        }
    };

    return { updateProduct, loading };
};