export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        LOGOUT: "/auth/logout",
        VERIFY_EMAIL: "/auth/verify-email",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: "/auth/reset-password",
    },
    ORDERS: {
        BASE: "/orders",
    },
    USERS: {
        BASE: "/users",
    },
    NEWSLETTER: {
        SUBSCRIBE: "/newsletter/subscribe",
        UNSUBSCRIBE: "/newsletter/unsubscribe",
    },
} as const;
