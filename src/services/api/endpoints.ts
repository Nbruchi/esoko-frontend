// services/api/endpoints.ts
export const API_ENDPOINTS = {
    // Auth
    AUTH: {
        LOGIN: "/auth/login",
        REGISTER: "/auth/register",
        LOGOUT: "/auth/logout",
        VERIFY_EMAIL: "/auth/verify-email",
        FORGOT_PASSWORD: "/auth/forgot-password",
        RESET_PASSWORD: "/auth/reset-password",
    },
    // Products
    PRODUCTS: {
        LIST: "/products",
        DETAIL: (id: string) => `/products/${id}`,
        CREATE: "/products",
        UPDATE: (id: string) => `/products/${id}`,
        DELETE: (id: string) => `/products/${id}`,
        REVIEW: (id: string) => `/products/${id}/reviews`,
        SEARCH: "/products/search",
    },
    // Categories
    CATEGORIES: {
        LIST: "/categories",
        DETAIL: (id: string) => `/categories/${id}`,
        CREATE: "/categories",
        UPDATE: (id: string) => `/categories/${id}`,
        DELETE: (id: string) => `/categories/${id}`,
    },
    // Orders
    ORDERS: {
        LIST: "/orders",
        DETAIL: (id: string) => `/orders/${id}`,
        CREATE: "/orders",
        UPDATE: (id: string) => `/orders/${id}`,
        TRACKING: (id: string) => `/orders/${id}/tracking`,
        CANCEL: (id: string) => `/orders/${id}/cancel`,
    },
    // Cart
    CART: {
        LIST: "/cart",
        ADD: "/cart",
        UPDATE: (id: string) => `/cart/${id}`,
        REMOVE: (id: string) => `/cart/${id}`,
        CLEAR: "/cart/clear",
    },
    // User
    USER: {
        PROFILE: "/user/profile",
        UPDATE_PROFILE: "/user/profile",
        ADDRESSES: "/user/addresses",
        ADD_ADDRESS: "/user/addresses",
        UPDATE_ADDRESS: (id: string) => `/user/addresses/${id}`,
        DELETE_ADDRESS: (id: string) => `/user/addresses/${id}`,
        PAYMENT_METHODS: "/user/payment-methods",
        ADD_PAYMENT_METHOD: "/user/payment-methods",
        DELETE_PAYMENT_METHOD: (id: string) => `/user/payment-methods/${id}`,
    },
    // Reviews
    REVIEWS: {
        LIST: "/reviews",
        CREATE: "/reviews",
        UPDATE: (id: string) => `/reviews/${id}`,
        DELETE: (id: string) => `/reviews/${id}`,
    },
    // Wishlist
    WISHLIST: {
        LIST: "/wishlist",
        ADD: "/wishlist",
        REMOVE: (id: string) => `/wishlist/${id}`,
    },
    // Notifications
    NOTIFICATIONS: {
        LIST: "/notifications",
        MARK_READ: (id: string) => `/notifications/${id}/read`,
        MARK_ALL_READ: "/notifications/read-all",
        PREFERENCES: "/notifications/preferences",
        UPDATE_PREFERENCES: "/notifications/preferences",
    },
    // Search
    SEARCH: {
        PRODUCTS: "/search/products",
        CATEGORIES: "/search/categories",
        SUGGESTIONS: "/search/suggestions",
    },
    // Payments
    PAYMENTS: {
        METHODS: "/payments/methods",
        ADD_METHOD: "/payments/methods",
        DELETE_METHOD: (id: string) => `/payments/methods/${id}`,
        INTENT: "/payments/intent",
    },
    // Blog
    BLOG: {
        LIST: "/blog",
        DETAIL: (id: string) => `/blog/${id}`,
        CREATE: "/blog",
        UPDATE: (id: string) => `/blog/${id}`,
        DELETE: (id: string) => `/blog/${id}`,
    },
} as const;
