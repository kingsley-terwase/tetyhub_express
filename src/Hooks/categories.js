// @ts-nocheck
import { useState } from "react";
import axiosInstance from "../Utils/AxiosInstance";
import { getErrorMessage } from "../Utils/Msg";
import { useNotification } from "@/contexts/notification";

function toFormData(payload) {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, String(value));
    });
    return params;
}
const formHeaders = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };


export function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export const usePublicCategories = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const { error: notifyError } = useNotification();

    const fetchCategories = async ({ offset = 0, limit = 20 } = {}) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/categories", { params: { offset, limit } });
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load categories");
                setLoading(false);
                return { success: false };
            }

            setCategories(result || []);
            setLoading(false);
            return { success: true, mightHaveMore: (result || []).length === limit };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load categories"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchCategories, categories, loading };
};


export const useCategories = () => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const { error: notifyError } = useNotification();

    const fetchCategories = async ({ offset = 0, limit = 20 } = {}) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/admin/categories", { params: { offset, limit } });
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load categories");
                setLoading(false);
                return { success: false };
            }

            setCategories(result || []);
            setLoading(false);
            // No total count in this endpoint's response — a full page suggests
            // there may be more, used as a heuristic for enabling "Next".
            return { success: true, mightHaveMore: (result || []).length === limit };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load categories"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchCategories, categories, loading };
};


export const useCategoryDetail = () => {
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchCategory = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/admin/category/view/${id}`);
            const { result, success, message } = response.data;
            if (!success) {
                notifyError(message || "Could not load category");
                setLoading(false);
                return { success: false };
            }
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load category"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchCategory, loading };
};


export const useCreateCategory = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const createCategory = async ({ name, description, type, imageFile }) => {
        setLoading(true);
        try {
            if (!name) {
                notifyError("Category name is required");
                setLoading(false);
                return { success: false };
            }
            if (!type) {
                notifyError("Category type is required");
                setLoading(false);
                return { success: false };
            }
            if (!imageFile) {
                notifyError("An image is required");
                setLoading(false);
                return { success: false };
            }

            const image = await fileToBase64(imageFile);

            const response = await axiosInstance.post(
                "/admin/category/create",
                toFormData({ name, description, type, image }),
                formHeaders
            );
            console.log(response)

            const { message, success, result } = response.data;
            if (!success) {
                notifyError(message || "Could not create category");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Category added successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not create category"));
            setLoading(false);
            return { success: false };
        }
    };

    return { createCategory, loading };
};

/**
 * PATCH /admin/category/update/{id}
 * ⚠️ Assumption: `imageFile` is optional here — if the user didn't pick a
 * new image, we omit the `image` field entirely rather than resending the
 * old one, trusting the backend to leave it unchanged. Confirm this holds;
 * if the backend instead clears the image when the field is absent, this
 * needs to resend the existing image URL instead.
 */
export const useUpdateCategory = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const updateCategory = async (id, { name, type, description, status, imageFile }) => {
        setLoading(true);
        try {
            const payload = { name, type, description, status };
            if (imageFile) {
                payload.image = await fileToBase64(imageFile);
            }

            const response = await axiosInstance.patch(
                `/admin/category/update/${id}`,
                toFormData(payload),
                formHeaders
            );
            console.log(response)

            const { message, success, result } = response.data;
            console.log("updateCategory response:", response.data);
            if (!success) {
                notifyError(message || "Could not update category");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Category updated successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not update category"));
            setLoading(false);
            return { success: false };
        }
    };

    return { updateCategory, loading };
};