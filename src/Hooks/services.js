// @ts-nocheck
import { useState } from "react";
import axiosInstance from "../Utils/AxiosInstance";
import { getErrorMessage } from "../Utils/Msg";
import { useNotification } from "@/contexts/notification";


export const useServices = () => {
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [total, setTotal] = useState(0);
    const { error: notifyError } = useNotification();

    const fetchServices = async ({ offset = 0, limit = 20 } = {}) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/vendor/services", { params: { offset, limit } });
            const { result, success, message } = response.data;

            if (!success || !result) {
                notifyError(message || "Could not load services");
                setLoading(false);
                return { success: false };
            }

            const list = result.data || result || [];
            setServices(list);
            setTotal(result.pagination?.total ?? list.length);
            setLoading(false);
            return { success: true, hasNextPage: Boolean(result.pagination?.has_next_page) };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load services"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchServices, services, total, loading };
};


export const useServiceDetail = () => {
  const [loading, setLoading] = useState(false);
  const { error: notifyError } = useNotification();
 
  const fetchService = async (id) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/vendor/service/view/${id}`);
      const { result, success, message } = response.data;
      if (!success) {
        notifyError(message || "Could not load service");
        setLoading(false);
        return { success: false };
      }
      setLoading(false);
      return { success: true, result };
    } catch (error) {
      notifyError(getErrorMessage(error, "Could not load service"));
      setLoading(false);
      return { success: false };
    }
  };
 
  return { fetchService, loading };
};


export const useCreateService = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const createService = async (payload) => {
        setLoading(true);
        try {
            if (!payload.name) {
                notifyError("Service name is required");
                setLoading(false);
                return { success: false };
            }
            if (!payload.base_price) {
                notifyError("Base price is required");
                setLoading(false);
                return { success: false };
            }
            if (!payload.category_id) {
                notifyError("Category is required");
                setLoading(false);
                return { success: false };
            }

            const response = await axiosInstance.post("/vendor/service/create", payload);

            const { message, success, result } = response.data;
            if (!success) {
                notifyError(message || "Could not create service");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Service added successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not create service"));
            setLoading(false);
            return { success: false };
        }
    };

    return { createService, loading };
};

/** PATCH /vendor/service/update/{id} — ASSUMED */
export const useUpdateService = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const updateService = async (id, payload) => {
        setLoading(true);
        try {
            const response = await axiosInstance.patch(`/vendor/service/update/${id}`, payload);

            const { message, success, result } = response.data;
            if (!success) {
                notifyError(message || "Could not update service");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Service updated successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not update service"));
            setLoading(false);
            return { success: false };
        }
    };

    return { updateService, loading };
};