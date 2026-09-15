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


export const useAcceptInvitation = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const acceptInvitation = async ({ token, password, password_confirmation }) => {
        setLoading(true);
        try {
            if (!token) {
                notifyError("This invitation link is missing its token");
                setLoading(false);
                return { success: false };
            }

            const response = await axiosInstance.post(
                "/auth/admin-invitations/accept",
                toFormData({ token, password, password_confirmation }),
                formHeaders
            );

            const { message, success, result } = response.data;

            if (!success) {
                notifyError(message || "Could not accept invitation");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Invitation accepted");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not accept invitation"));
            setLoading(false);
            return { success: false };
        }
    };

    return { acceptInvitation, loading };
};


/** GET /admin/admins?offset=&limit=&search=&status= */
export const useAdmins = () => {
    const [loading, setLoading] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [total, setTotal] = useState(0);
    const { error: notifyError } = useNotification();

    const fetchAdmins = async ({ offset = 0, limit = 10, search = "", status = "" } = {}) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/admin/admins", {
                params: { offset, limit, search: search || undefined, status: status || undefined },
            });
            const { result, success, message } = response.data;

            if (!success || !result) {
                notifyError(message || "Could not load admins");
                setLoading(false);
                return { success: false };
            }

            setAdmins(result.rows || []);
            setTotal(result.total || 0);
            setLoading(false);
            return { success: true };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load admins"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchAdmins, admins, total, loading };
};

/** GET /admin/admin/view/{adminId} */
export const useAdminDetail = () => {
    const [loading, setLoading] = useState(false);
    const { error: notifyError } = useNotification();

    const fetchAdmin = async (adminId) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/admin/admin/view/${adminId}`);
            const { result, success, message } = response.data;

            if (!success || !result) {
                notifyError(message || "Could not load admin");
                setLoading(false);
                return { success: false };
            }

            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load admin"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchAdmin, loading };
};

/**
 * POST /admin/admin/create — this only creates the underlying user account
 * and sends an invitation. The actual admin_id/scope/status record doesn't
 * exist until the invited person accepts it (a separate flow they complete
 * themselves via the invitation email — not something this form controls).
 */
export const useCreateAdmin = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const createAdmin = async ({ firstname, lastname, email, phone }) => {
        setLoading(true);
        try {
            if (!firstname || !lastname || !email) {
                notifyError("First name, last name, and email are required");
                setLoading(false);
                return { success: false };
            }

            const response = await axiosInstance.post(
                "/admin/admin/create",
                toFormData({ firstname, lastname, email, phone }),
                formHeaders
            );

            const { message, success, result } = response.data;

            if (!success) {
                notifyError(message || "Could not invite admin");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Admin invited successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not invite admin"));
            setLoading(false);
            return { success: false };
        }
    };

    return { createAdmin, loading };
};

/** PATCH /admin/admin/update/{adminId} */
export const useUpdateAdmin = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const updateAdmin = async (adminId, { firstname, lastname, phone }) => {
        setLoading(true);
        try {
            const response = await axiosInstance.patch(
                `/admin/admin/update/${adminId}`,
                toFormData({ firstname, lastname, phone }),
                formHeaders
            );

            const { message, success, result } = response.data;

            if (!success) {
                notifyError(message || "Could not update admin");
                setLoading(false);
                return { success: false };
            }

            notifySuccess(message || "Admin updated successfully");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not update admin"));
            setLoading(false);
            return { success: false };
        }
    };

    return { updateAdmin, loading };
};