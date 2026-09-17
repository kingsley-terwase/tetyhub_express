// @ts-nocheck
import { useState, useCallback } from "react";
import axiosInstance from "../Utils/AxiosInstance";
import { getErrorMessage } from "../Utils/Msg";
import { useNotification } from "@/contexts/notification";

function toFormData(payload) {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, value);
    });
    return params;
}
const formHeaders = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

export const useCart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const addToCart = useCallback(async (productId, quantity = 1, variantId) => {
        setLoading(true);
        try {
            const payload = { product_id: productId, quantity };
            if (variantId) payload.variant_id = variantId;

            const response = await axiosInstance.post(
                "/cart/items/add",
                toFormData(payload),
                formHeaders
            );
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not add item to cart");
                setLoading(false);
                return { success: false, message };
            }

            setCart(result);
            notifySuccess(message || "Item added to cart");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Could not add item to cart");
            notifyError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    }, [notifySuccess, notifyError]);

    const updateCartItem = useCallback(async (productId, quantity, variantId) => {
        setLoading(true);
        try {
            const payload = { product_id: productId, quantity };
            if (variantId) payload.variant_id = variantId;

            const response = await axiosInstance.patch(
                "/cart/items/update",
                toFormData(payload),
                formHeaders
            );
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not update cart");
                setLoading(false);
                return { success: false, message };
            }

            setCart(result);
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Could not update cart");
            notifyError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    }, [notifyError]);

    const removeFromCart = useCallback(async (cartItemId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`/cart/items/remove/${cartItemId}`);
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not remove item from cart");
                setLoading(false);
                return { success: false, message };
            }

            setCart(result);
            notifySuccess(message || "Item removed from cart");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Could not remove item from cart");
            notifyError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    }, [notifySuccess, notifyError]);

    const fetchCheckoutPreview = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/cart/preview-checkout");
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load checkout preview");
                setLoading(false);
                return { success: false, message };
            }

            setCart(result);
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Could not load checkout preview");
            notifyError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    }, [notifyError]);

    const checkout = useCallback(async (orderDetails) => {
        // orderDetails: { firstname, lastname, phone_one, phone_two?, address, city,
        //   state, country, zip_code, note?, email, gateway, expected_currency, expected_total }
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "/cart/checkout",
                toFormData(orderDetails),
                formHeaders
            );
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Checkout failed");
                setLoading(false);
                return { success: false, message };
            }

            notifySuccess(message || "Order placed successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Checkout failed");
            notifyError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    }, [notifySuccess, notifyError]);

    return {
        cart,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        fetchCheckoutPreview,
        checkout,
    };
};