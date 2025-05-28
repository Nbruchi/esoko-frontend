import { api } from "../../services/api";
import { API_ENDPOINTS } from "../../services/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LoginRequest) =>
            api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, data),
        onSuccess: (response) => {
            const { token, user } = response.data;
            sessionStorage.setItem("token", token);
            queryClient.setQueryData(["user"], user);
        },
    });
}

export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterRequest) =>
            api.post<{ message: string }>(API_ENDPOINTS.AUTH.REGISTER, data),
    });
}

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),
        onSuccess: () => {
            sessionStorage.removeItem("token");
            queryClient.clear();
        },
    });
}

export function useForgotPassword() {
    return useMutation({
        mutationFn: (data: ForgotPasswordRequest) =>
            api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data),
    });
}

export function useResetPassword() {
    return useMutation({
        mutationFn: (data: ResetPasswordRequest) =>
            api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data),
    });
}

export function useVerifyEmail(token: string) {
    return useMutation({
        mutationFn: () => api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token }),
    });
}
