import { api } from "@/lib/api-client";
import type { LoginRequest, RegisterRequest, User } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
    return useMutation({
        mutationFn: (credentials: LoginRequest) =>
            api.post<{ user: User; token: string }>(`/auth/login`, credentials),
        onSuccess: (response) => {
            if (response.success && response.data?.token) {
                sessionStorage.setItem(`token`, response.data.token);
            }
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: (credentials: RegisterRequest) =>
            api.post<{ user: User; token: string }>(
                `/auth/register`,
                credentials
            ),
        onSuccess: (response) => {
            if (response.success && response.data?.token) {
                sessionStorage.setItem(`token`, response.data.token);
            }
        },
    });
};

export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => api.get<User>(`/users/profile`),
        enabled: !!sessionStorage.getItem(`token`),
    });
};
