import axios from "axios";
import type { ApiResponse, AuthTokens } from "@/types";

const BASE_URL =
    import.meta.env.VITE_BACKEND_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use((config) => {
    const authState =
        sessionStorage.getItem("auth_state") ||
        localStorage.getItem("auth_state");
    if (authState) {
        try {
            const { tokens } = JSON.parse(authState);
            if (tokens?.accessToken) {
                config.headers.Authorization = `Bearer ${tokens.accessToken}`;
            }
        } catch (error) {
            console.error("Error parsing auth state:", error);
        }
    }
    return config;
});

// Response interceptor for handling token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh the token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Get refresh token from storage
                const authState =
                    sessionStorage.getItem("auth_state") ||
                    localStorage.getItem("auth_state");
                if (!authState) {
                    throw new Error("No auth state found");
                }

                const { tokens } = JSON.parse(authState);
                if (!tokens?.refreshToken) {
                    throw new Error("No refresh token found");
                }

                // Call refresh token endpoint
                const response = await axios.post<ApiResponse<AuthTokens>>(
                    `${BASE_URL}/auth/refresh`,
                    { refreshToken: tokens.refreshToken }
                );

                if (response.data.success && response.data.data) {
                    const newTokens = response.data.data;

                    // Update storage with new tokens
                    const newAuthState = {
                        ...JSON.parse(authState),
                        tokens: newTokens,
                    };

                    // Use the same storage as the original auth state
                    const storage = sessionStorage.getItem("auth_state")
                        ? sessionStorage
                        : localStorage;
                    storage.setItem("auth_state", JSON.stringify(newAuthState));

                    // Update the failed request's auth header
                    originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;

                    // Retry the original request
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                // Clear auth state and redirect to login
                sessionStorage.removeItem("auth_state");
                localStorage.removeItem("auth_state");
                window.location.href = "/auth/login";
            }
        }

        return Promise.reject(error);
    }
);

export const api = {
    get: async <T>(url: string, params?: Record<string, unknown>) => {
        const { data } = await apiClient.get<ApiResponse<T>>(url, { params });
        return data;
    },
    post: async <T>(url: string, body?: unknown) => {
        const { data } = await apiClient.post<ApiResponse<T>>(url, body);
        return data;
    },
    put: async <T>(url: string, body?: unknown) => {
        const { data } = await apiClient.put<ApiResponse<T>>(url, body);
        return data;
    },
    delete: async <T>(url: string) => {
        const { data } = await apiClient.delete<ApiResponse<T>>(url);
        return data;
    },
};
