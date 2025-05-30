import axios from "axios";
import type { ApiResponse } from "@/types";

const BASE_URL = import.meta.env.BACKEND_API_URL;

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = sessionStorage.getItem(`token`);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            sessionStorage.removeItem(`token`);
            window.location.href = `/login`;
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
