// @ts-nocheck
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/AxiosInstance";
import { getErrorMessage } from "../Utils/Msg";
import { useAuthStore } from "../store/auth";
import { getRoleBasePath, ROLES } from "../lib/roles";
import { useNotification } from "@/contexts/notification";

/**
 * Converts a plain object into application/x-www-form-urlencoded — required by every /auth/* endpoint
 * @param {{ [s: string]: any; } | ArrayLike<any>} payload
 */
function toFormData(payload) {
    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) params.append(key, value);
    });
    return params;
}
const formHeaders = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };

/** POST /auth/signin */
export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const setAuth = useAuthStore((s) => s.setAuth);
    const navigate = useNavigate();
    const { success: notifySuccess, error: notifyError } = useNotification();

    const login = async ({ email, password }) => {
        setLoading(true);

        try {
            if (!email || !password) {
                const message = "Email and password are required";
                notifyError(message);
                setLoading(false);
                return { success: false, message };
            }

            const response = await axiosInstance.post(
                "/auth/signin",
                toFormData({ email, password }),
                formHeaders
            );

            console.log(response);

            const { result, message, success } = response.data;

            if (!success || !result) {
                notifyError(message || "Login failed");
                setLoading(false);
                return { success: false, message };
            }

            const { password: _omit, role, csrfToken, ...user } = result;
            const permission = { role };
            if (!Object.values(ROLES).includes(role)) {
                const msg = `Unrecognized role "${role}" returned by the server`;
                notifyError(msg);
                setLoading(false);
                return { success: false, message: msg };
            }

            setAuth({ user, permission, csrfToken });
            notifySuccess(message || "Login successful");
            setLoading(false);
            navigate(getRoleBasePath(permission));
            return { success: true, user, permission };
        } catch (error) {
            console.log("Login error response:", error.response?.data);
            const errorMessage = getErrorMessage(error, "Login failed. Please try again.");
            notifyError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    };

    return { login, loading };
};

/** POST /auth/signup */
export const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const signup = async ({ firstname, lastname, email, password, role }) => {
        setLoading(true);

        try {
            if (!firstname || !lastname || !email || !password) {
                const message = "All fields are required";
                notifyError(message);
                setLoading(false);
                return { success: false, message };
            }

            const response = await axiosInstance.post(
                "/auth/signup",
                toFormData({ firstname, lastname, email, password, role }),
                formHeaders
            );

            const { message, success, result } = response.data;

            if (!success) {
                notifyError(message || "Signup failed");
                setLoading(false);
                return { success: false, message };
            }

            notifySuccess(message || "Verification email sent, please check your email.");
            setLoading(false);
            return { success: true, result };
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Signup failed. Please try again.");
            notifyError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    };

    return { signup, loading };
};



export const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const { success: notifySuccess, error: notifyError } = useNotification();

  const verifyEmail = async ({ email, token }) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/auth/verify-email?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
      );

      const { message, success } = response.data;

      if (!success) {
        notifyError(message || "Verification failed or link expired");
        setLoading(false);
        return { success: false, message };
      }

      notifySuccess(message || "Email verified successfully");
      setLoading(false);
      return { success: true };
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Verification failed or link expired");
      notifyError(errorMessage);
      setLoading(false);
      return { success: false, message: errorMessage };
    }
  };

  return { verifyEmail, loading };
};

/** POST /auth/signout */
export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const clearAuth = useAuthStore((s) => s.clearAuth);
    const navigate = useNavigate(); // add this
    const { success: notifySuccess, error: notifyError } = useNotification();

    const logout = async () => {
        setLoading(true);
        try {
            await axiosInstance.post("/auth/signout");
            clearAuth();
            notifySuccess("Signed out successfully");
            setLoading(false);
            navigate("/login"); // add this — send them somewhere that actually exists
            return { success: true };
        } catch (error) {
            clearAuth();
            const errorMessage = getErrorMessage(error, "Sign out failed");
            notifyError(errorMessage);
            setLoading(false);
            navigate("/login"); // add this too — still logged out locally even if the API call failed
            return { success: false, message: errorMessage };
        }
    };

    return { logout, loading };
};

/** POST /auth/password-reset/request */
export const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const forgotPassword = async (email) => {
        setLoading(true);
        try {
            if (!email) {
                notifyError("Email is required");
                setLoading(false);
                return { success: false };
            }

            const response = await axiosInstance.post(
                "/auth/password-reset/request",
                toFormData({ email }),
                formHeaders
            );

            notifySuccess(response.data.message || "Check your email for a reset link");
            setLoading(false);
            return { success: true };
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Could not send reset email");
            notifyError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    };

    return { forgotPassword, loading };
};

/**
 * Confirm a password reset. `email` and `token` come from the reset link's query string;
 * `newPassword` comes from the user's form.
 * NOTE: the API doc lists this endpoint as GET, which is unusual for something carrying a body.
 * Implemented as POST here — flag with your backend dev if it 404s/405s.
 */
export const useResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const resetPassword = async ({ email, token, newPassword }) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                `/auth/password-reset/confirm?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`,
                toFormData({ new_password: newPassword }),
                formHeaders
            );

            notifySuccess(response.data.message || "Password reset successful");
            setLoading(false);
            return { success: true };
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Could not reset password");
            notifyError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    };

    return { resetPassword, loading };
};

/** POST /auth/resend-verification */
export const useResendVerification = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const resendVerification = async (email) => {
        setLoading(true);
        try {
            const response = await axiosInstance.post(
                "/auth/resend-verification",
                toFormData({ email }),
                formHeaders
            );
            notifySuccess(response.data.message || "Verification email sent");
            setLoading(false);
            return { success: true };
        } catch (error) {
            const errorMessage = getErrorMessage(error, "Could not resend verification email");
            notifyError(errorMessage);
            setLoading(false);
            return { success: false, message: errorMessage };
        }
    };

    return { resendVerification, loading };
};

/** GET /auth/sessions — list active sessions for the current user */
export const useSessions = () => {
    const [loading, setLoading] = useState(false);
    const [sessions, setSessions] = useState([]);
    const { error: notifyError } = useNotification();

    const fetchSessions = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get("/auth/sessions");
            console.log("Fetched sessions:", response.data.result);
            setSessions(response.data.result || []);

            setLoading(false);
            return { success: true };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not load sessions"));
            setLoading(false);
            return { success: false };
        }
    };

    return { fetchSessions, sessions, loading };
};

/** POST /auth/sessions/revoke/{sessionId} */
export const useTerminateSession = () => {
    const [loading, setLoading] = useState(false);
    const { success: notifySuccess, error: notifyError } = useNotification();

    const terminateSession = async (sessionId) => {
        setLoading(true);
        try {
            await axiosInstance.post(`/auth/sessions/revoke/${sessionId}`);
            notifySuccess("Session terminated");
            setLoading(false);
            return { success: true };
        } catch (error) {
            notifyError(getErrorMessage(error, "Could not terminate session"));
            setLoading(false);
            return { success: false };
        }
    };

    return { terminateSession, loading };
};