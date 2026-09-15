// @ts-nocheck
import { useState } from "react";
import axiosInstance from "../Utils/AxiosInstance";
import { getErrorMessage } from "../Utils/Msg";
import { useNotification } from "@/contexts/notification";
import { fileToBase64 } from "./categories";

function toFormData(payload) {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, String(value));
    });
    return params;
}
const formHeaders = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };


export const usePublicSubcategories = () => {
    const [loading, setLoading] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
    const { error: notifyError } = useNotification();

    const fetchSubcategories = async ({ offset = 0, limit = 100 } = {}) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/subcategories", { params: { offset, limit } });
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load subcategories");
                setLoading(false);
                return { success: false };
            }

            setSubcategories(result || []);
            setLoading(false);
            return { success: true };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load subcategories"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchSubcategories, subcategories, loading };
};


export const useSubcategories = () => {
    const [loading, setLoading] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
    const { error: notifyError } = useNotification();

    const fetchSubcategories = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/admin/subcategories");
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load subcategories");
                setLoading(false);
                return { success: false };
            }

            setSubcategories(result || []);
            setLoading(false);
            return { success: true };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load subcategories"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchSubcategories, subcategories, loading };
};


export const useSubcategoryDetail = () => {
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchSubcategory = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/admin/subcategory/view/${id}`);
            const { result, success, message } = response.data;
            if (!success) {
                notifyError(message || "Could not load subcategory");
                setLoading(false);
                return { success: false };
            }
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load subcategory"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchSubcategory, loading };
};


export const useCreateSubcategory = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const createSubcategory = async ({ name, category_id, description, imageFile }) => {
        setLoading(true);
        try {
            if (!name || !category_id) {
                notifyError("Name and parent category are required");
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
                "/admin/subcategory/create",
                toFormData({ name, category_id, description, image }),
                formHeaders
            );

            const { message, success, result } = response.data;
            if (!success) {
                notifyError(message || "Could not create subcategory");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Subcategory added successfully");
            setLoading(false);
            // Response wraps the new record in an array — normalize to a single object.
            return { success: true, result: Array.isArray(result) ? result[0] : result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not create subcategory"));
            setLoading(false);
            return { success: false };
        }
    };

    return { createSubcategory, loading };
};


export const useUpdateSubcategory = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const updateSubcategory = async (id, { name, category_id, description, status, imageFile }) => {
        setLoading(true);
        try {
            const payload = { name, category_id, description, status };
            if (imageFile) {
                payload.image = await fileToBase64(imageFile);
            }

            const response = await axiosInstance.patch(
                `/admin/subcategory/update/${id}`,
                toFormData(payload),
                formHeaders
            );

            const { message, success, result } = response.data;
            if (!success) {
                notifyError(message || "Could not update subcategory");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Subcategory updated successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not update subcategory"));
            setLoading(false);
            return { success: false };
        }
    };

    return { updateSubcategory, loading };
};