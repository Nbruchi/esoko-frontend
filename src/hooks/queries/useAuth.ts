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
        mutationFn: async (data: RegisterRequest) => {
            const response = await api.post<ApiResponse<{ redirect: string }>>(
                "/auth/register",
                data
            );
            if (!response.data) {
                throw new Error("No response data received");
            }
            return response.data;
        },
        onSuccess: (response) => {
            if (response?.success) {
                queryClient.invalidateQueries({ queryKey: ["auth"] });
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

    const verifyEmail = useMutation({
        mutationFn: async (data: { email: string; otp: string }) => {
            const response = await api.post<ApiResponse<null>>(
                "/auth/verify-email",
                data
            );
            if (!response.data) {
                throw new Error("No response data received");
            }
            return response.data;
        },
    });

    const resendOtp = useMutation({
        mutationFn: async (data: { email: string }) => {
            const response = await api.post<ApiResponse<null>>(
                "/auth/resend-verification",
                data
            );
            if (!response.data) {
                throw new Error("No response data received");
            }
            return response.data;
        },
    });

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        login: (data: LoginRequest & { rememberMe?: boolean }) =>
            login.mutate(data),
        register: (data: RegisterRequest) => register.mutateAsync(data),
        logout: () => logout.mutate(),
        verifyEmail: (data: { email: string; otp: string }) =>
            verifyEmail.mutateAsync(data),
        resendOtp: (data: { email: string }) => resendOtp.mutateAsync(data),
    };
};
