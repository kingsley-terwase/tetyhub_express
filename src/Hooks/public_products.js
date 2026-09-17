// @ts-nocheck
import { useState, useCallback } from "react";
import axiosInstance from "../Utils/AxiosInstance";
import { getErrorMessage } from "../Utils/Msg";
import { useNotification } from "@/contexts/notification";


function extractProductList(result) {
    if (Array.isArray(result)) return result;
    if (Array.isArray(result?.products)) return result.products;
    if (Array.isArray(result?.data)) return result.data;
    if (Array.isArray(result?.items)) return result.items;
    console.warn("useProducts: couldn't find a products array in response", result);
    return [];
}
// all product data
export const usePublicProducts = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchProducts = useCallback(async (params = {}) => {
        setLoading(true);
        try {
            const hasFilters = Object.keys(params).length > 0;
            const url = hasFilters ? "/products/search" : "/products";
            const response = await axiosInstance.get(url, { params });
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load products");
                setLoading(false);
                return { success: false, message };
            }

            setProducts(extractProductList(result));
            setPagination(result?.pagination || null);
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Could not load products");
            notifyError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    }, [notifyError]);

    return { products, pagination, loading, fetchProducts };
};

export const usePublicProduct = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchProduct = useCallback(async (id) => {
        if (!id) return { success: false };
        setLoading(true);
        setNotFound(false);
        try {
            // Only /products (list) is confirmed to exist. There is no
            // confirmed single-product public endpoint. A previous version
            // of this hook tried GET /products/:id, then fell back to
            // /products/search?id=... — but that search endpoint's
            // validation schema explicitly rejects an "id" filter
            // ("id" is not allowed), so that fallback was guaranteed to
            // fail every time Attempt 1 also failed.
            // ⚠️ Not scalable for a large catalogue — ask backend for a
            // real GET /products/:id (or similar) once available, then
            // swap this back to a direct single-resource fetch.
            const listResponse = await axiosInstance.get("/products", {
                params: { limit: 100 },
            });
            const list = extractProductList(listResponse.data?.result);
            const found = list.find((p) => String(p.id) === String(id));

            if (found) {
                setProduct(found);
                setLoading(false);
                return { success: true, result: found };
            }

            setNotFound(true);
            setLoading(false);
            return { success: false };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load this product"));
            setLoading(false);
            return { success: false };
        }
    }, [notifyError]);

    return { product, loading, notFound, fetchProduct };
};

/** GET /products/featured */
export const useFeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchFeatured = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/products/featured");
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load featured products");
                setLoading(false);
                return { success: false };
            }

            setProducts(extractProductList(result));
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load featured products"));
            setLoading(false);
            return { success: false };
        }
    }, [notifyError]);

    return { products, loading, fetchFeatured };
};

/** GET /products/related/:id */
export const useRelatedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchRelated = useCallback(async (productId) => {
        if (!productId) return { success: false, message: "productId is required" };
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/products/related/${productId}`);
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load related products");
                setLoading(false);
                return { success: false };
            }

            setProducts(extractProductList(result));
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load related products"));
            setLoading(false);
            return { success: false };
        }
    }, [notifyError]);

    return { products, loading, fetchRelated };
};

/** GET /categories */
export const usePublicCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/categories", {
                params: { offset: 0, limit: 100 },
            });
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load categories");
                setLoading(false);
                return { success: false };
            }

            setCategories(result || []);
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load categories"));
            setLoading(false);
            return { success: false };
        }
    }, [notifyError]);

    return { categories, loading, fetchCategories };
};

/** GET /subcategories — flat list, filter client-side by category_id */
export const usePublicSubcategories = () => {
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchSubcategories = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/subcategories");
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load subcategories");
                setLoading(false);
                return { success: false };
            }

            setSubcategories(result || []);
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load subcategories"));
            setLoading(false);
            return { success: false };
        }
    }, [notifyError]);

    return { subcategories, loading, fetchSubcategories };
};