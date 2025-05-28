import { API_ENDPOINTS } from "./endpoints";
import axios from "axios";
import type { ApiError } from "./types";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const apiError: ApiError = {
            message: error.response?.data?.message || "An error occured",
            code: error.response?.data?.code || "UNKNOWN_ERROR",
            status: error.response?.status || 500,
        };
        return Promise.reject(apiError);
    }
);

export { api, API_ENDPOINTS };
