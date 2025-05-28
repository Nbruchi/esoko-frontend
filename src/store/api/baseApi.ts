import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: [
        "Auth",
        "User",
        "Blog",
        "Cart",
        "Category",
        "Notification",
        "Email",
        "Payment",
        "Product",
        "Order",
        "Review",
        "Search",
        "Wishlist",
    ],
    endpoints: () => ({}),
});
