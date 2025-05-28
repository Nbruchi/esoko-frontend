import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor for auth token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;
