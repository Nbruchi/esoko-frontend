import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type {
    User,
    LoginRequest,
    RegisterRequest,
    ApiResponse,
    AuthResponse,
} from "@/types";
import { useAuth as useAuthContext } from "@/context/AuthContext";
import { AxiosError } from "axios";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const { login: contextLogin, logout: contextLogout } = useAuthContext();

    const { data: user, isLoading } = useQuery({
        queryKey: ["auth", "user"],
        queryFn: async () => {
            const response = await api.get<ApiResponse<User>>("/auth/me");
            return response.data?.data;
        },
        enabled: false, // We'll manually trigger this when needed
    });

    const login = useMutation({
        mutationFn: async (data: LoginRequest & { rememberMe?: boolean }) => {
            const response = await api.post<ApiResponse<AuthResponse>>(
                "/auth/login",
                data
            );
            if (!response.data) {
                throw new Error("No response data received");
            }
            return response.data;
        },
        onSuccess: (response) => {
            if (response?.success && response?.data) {
                const { user, tokens, rememberMe } = response.data;
                contextLogin(user, tokens, rememberMe);
                queryClient.setQueryData(["auth", "user"], user);
            }
        },
    });

    const register = useMutation({
        mutationFn: async (userData: RegisterRequest) => {
            try {
                const response = await api.post<ApiResponse<AuthResponse>>(
                    "/auth/register",
                    userData
                );
                if (!response.data) {
                    throw new Error("No response data received");
                }
                return response.data;
            } catch (error) {
                if (error instanceof AxiosError && error.response?.data) {
                    throw error;
                }
                throw new Error("Registration failed");
            }
        },
        onSuccess: (response) => {
            if (response?.success && response?.data) {
                const { user, tokens } = response.data;
                contextLogin(user, tokens);
                queryClient.setQueryData(["auth", "user"], user);
            }
        },
    });

    const logout = useMutation({
        mutationFn: async () => {
            await api.post("/auth/logout");
        },
        onSuccess: () => {
            contextLogout();
            queryClient.clear();
        },
    });

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        login: (data: LoginRequest & { rememberMe?: boolean }) =>
            login.mutate(data),
        register: (data: RegisterRequest) => register.mutate(data),
        logout: () => logout.mutate(),
    };
};
