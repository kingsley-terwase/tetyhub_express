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

/** GET /currencies — public, used to populate currency pickers on vendor forms */
export const usePublicCurrencies = () => {
    const [loading, setLoading] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const { error: notifyError } = useNotification();

    const fetchCurrencies = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/currencies");
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load currencies");
                setLoading(false);
                return { success: false };
            }

            setCurrencies(result || []);
            setLoading(false);
            return { success: true };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load currencies"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchCurrencies, currencies, loading };
};

/** GET /admin/currencies — no offset/limit in the collection, so this returns the full list */
export const useCurrencies = () => {
    const [loading, setLoading] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const { error: notifyError } = useNotification();

    const fetchCurrencies = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/admin/currencies");
            const { result, success, message } = response.data;

            if (!success) {
                notifyError(message || "Could not load currencies");
                setLoading(false);
                return { success: false };
            }

            setCurrencies(result || []);
            setLoading(false);
            return { success: true };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load currencies"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchCurrencies, currencies, loading };
};

/** GET /admin/currency/view/{id} */
export const useCurrencyDetail = () => {
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchCurrency = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/admin/currency/view/${id}`);
            const { result, success, message } = response.data;
            if (!success) {
                notifyError(message || "Could not load currency");
                setLoading(false);
                return { success: false };
            }
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load currency"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchCurrency, loading };
};

/** POST /admin/currency/create */
export const useCreateCurrency = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const createCurrency = async ({ name, code }) => {
        setLoading(true);
        try {
            if (!name) {
                notifyError("Currency name is required");
                setLoading(false);
                return { success: false };
            }
            if (!code) {
                notifyError("Currency code is required");
                setLoading(false);
                return { success: false };
            }

            const response = await axiosInstance.post(
                "/admin/currency/create",
                toFormData({ name, code }),
                formHeaders
            );

            const { message, success, result } = response.data;
            if (!success) {
                notifyError(message || "Could not create currency");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Currency added successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not create currency"));
            setLoading(false);
            return { success: false };
        }
    };

    return { createCurrency, loading };
};

/** PATCH /admin/currency/update/{id} */
export const useUpdateCurrency = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const updateCurrency = async (id, { name, code, status }) => {
        setLoading(true);
        try {
            const response = await axiosInstance.patch(
                `/admin/currency/update/${id}`,
                toFormData({ name, code, status }),
                formHeaders
            );

            const { message, success, result } = response.data;
            if (!success) {
                notifyError(message || "Could not update currency");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Currency updated successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not update currency"));
            setLoading(false);
            return { success: false };
        }
    };

    return { updateCurrency, loading };
};