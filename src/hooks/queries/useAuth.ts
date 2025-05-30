import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import { useState } from "react";

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    role?: "CUSTOMER" | "SELLER" | "ADMIN";
}

interface AuthResponse {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const { data } = await apiClient.post<AuthResponse>(
                "/auth/login",
                credentials
            );
            return data;
        },
        onSuccess: (data) => {
            localStorage.setItem("token", data.tokens.accessToken);
            localStorage.setItem("refreshToken", data.tokens.refreshToken);
            queryClient.setQueryData(["user"], data.user);
            toast.success("Login successful!");
            navigate("/");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Login failed");
        },
    });
}

export function useRegister() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (userData: RegisterData) => {
        try {
            setIsLoading(true);
            setError(null);
            const { data } = await apiClient.post<AuthResponse>(
                "/auth/register",
                userData
            );
            localStorage.setItem("token", data.tokens.accessToken);
            localStorage.setItem("refreshToken", data.tokens.refreshToken);
            toast.success("Registration successful! Please verify your email.");
            navigate("/login");
            return data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const message =
                error.response?.data?.message || "Registration failed";
            setError(message);
            toast.error(message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { register, isLoading, error };
}

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await apiClient.post("/auth/logout");
        },
        onSuccess: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            queryClient.clear();
            toast.success("Logged out successfully");
            navigate("/login");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Logout failed");
        },
    });
}

export function useVerifyEmail() {
    return useMutation({
        mutationFn: async (token: string) => {
            const { data } = await apiClient.post("/auth/verify-email", {
                token,
            });
            return data;
        },
        onSuccess: () => {
            toast.success("Email verified successfully!");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(
                error.response?.data?.message || "Email verification failed"
            );
        },
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: async (email: string) => {
            const { data } = await apiClient.post("/auth/forgot-password", {
                email,
            });
            return data;
        },
        onSuccess: () => {
            toast.success("Password reset instructions sent to your email");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(
                error.response?.data?.message ||
                    "Failed to send reset instructions"
            );
        },
    });
}

export function useResetPassword() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({
            token,
            password,
        }: {
            token: string;
            password: string;
        }) => {
            const { data } = await apiClient.post("/auth/reset-password", {
                token,
                password,
            });
            return data;
        },
        onSuccess: () => {
            toast.success("Password reset successful!");
            navigate("/login");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(
                error.response?.data?.message || "Password reset failed"
            );
        },
    });
}

export function useCurrentUser() {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const { data } = await apiClient.get("/auth/me");
            return data;
        },
        retry: false,
    });
}
