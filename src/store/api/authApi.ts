import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
            invalidatesTags: ["Auth"],
        }),
        register: builder.mutation<User, RegisterRequest>({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: ["Auth"],
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Auth"],
        }),
        verifyEmail: builder.mutation<void, string>({
            query: (token) => ({
                url: `/auth/verify-email/${token}`,
                method: "POST",
            }),
            invalidatesTags: ["Auth"],
        }),
        forgotPassword: builder.mutation<void, string>({
            query: (email) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: { email },
            }),
        }),
        resetPassword: builder.mutation<
            void,
            { token: string; password: string }
        >({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useVerifyEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
