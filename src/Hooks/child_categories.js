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



export const useChildCategories = () => {
    const [loading, setLoading] = useState(false);
    const [childCategories, setChildCategories] = useState([]);
    const { error: notifyError } = useNotification();

    const fetchChildCategories = async ({ offset = 0, limit = 20 } = {}) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/admin/childcategories", { params: { offset, limit } });
            const { result, success, message } = response.data;
            console.log("fetchChildCategories", result, success, message);
            if (!success) {
                notifyError(message || "Could not load child categories");
                setLoading(false);
                return { success: false };
            }
            setChildCategories(result || []);
            setLoading(false);
            return { success: true, mightHaveMore: (result || []).length === limit };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load child categories"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchChildCategories, childCategories, loading };
};



export const usePublicChildCategories = () => {
    const [loading, setLoading] = useState(false);
    const [childCategories, setChildCategories] = useState([]);
    const { error: notifyError } = useNotification();

    const fetchChildCategories = async ({ offset = 0, limit = 20 } = {}) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/child-subcategories", { params: { offset, limit } });
            const { result, success, message } = response.data;
            if (!success) {
                notifyError(message || "Could not load child categories");
                setLoading(false);
                return { success: false };
            }
            setChildCategories(result || []);
            setLoading(false);
            return { success: true, mightHaveMore: (result || []).length === limit };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load child categories"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchChildCategories, childCategories, loading };
};



export const useChildCategoryDetail = () => {
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchChildCategory = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/admin/childcategory/view/${id}`);
            const { result, success, message } = response.data;
            if (!success) {
                notifyError(message || "Could not load child category");
                setLoading(false);
                return { success: false };
            }
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load child category"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchChildCategory, loading };
};


export const useCreateChildCategory = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const createChildCategory = async ({ name, subcategory_id, description, imageFile }) => {
        setLoading(true);
        try {
            if (!name || !subcategory_id) {
                notifyError("Name and parent subcategory are required");
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
                "/admin/childcategory/create",
                toFormData({ name, subcategory_id, description, image }),
                formHeaders
            );

            const { message, success, result } = response.data;
            if (!success) {
                notifyError(message || "Could not create child category");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Child category added successfully");
            setLoading(false);
            // Create wraps the record in an array, same as subcategory create.
            return { success: true, result: Array.isArray(result) ? result[0] : result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not create child category"));
            setLoading(false);
            return { success: false };
        }
    };

    return { createChildCategory, loading };
};



export const useUpdateChildCategory = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const updateChildCategory = async (id, { name, subcategory_id, description, status, imageFile }) => {
        setLoading(true);
        try {
            const payload = { name, subcategory_id, description, status };
            if (imageFile) {
                payload.image = await fileToBase64(imageFile);
            }

            const response = await axiosInstance.patch(
                `/admin/childcategory/update/${id}`,
                toFormData(payload),
                formHeaders
            );

            const { message, success, result } = response.data;
            if (!success) {
                notifyError(message || "Could not update child category");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Child category updated successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not update child category"));
            setLoading(false);
            return { success: false };
        }
    };

    return { updateChildCategory, loading };
};