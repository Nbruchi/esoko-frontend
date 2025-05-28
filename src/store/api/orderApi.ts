import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<
            { orders: Order[]; total: number },
            Record<string, unknown>
        >({
            query: (filters) => ({
                url: "/orders",
                params: filters,
            }),
            providesTags: ["Order"],
        }),
        getOrder: builder.query<Order, string>({
            query: (id) => `/orders/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Order", id }],
        }),
        createOrder: builder.mutation<Order, CreateOrderRequest>({
            query: (data) => ({
                url: "/orders",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Order", "Cart"],
        }),
        cancelOrder: builder.mutation<void, string>({
            query: (id) => ({
                url: `/orders/${id}/cancel`,
                method: "POST",
            }),
            invalidatesTags: (_result, _error, id) => [{ type: "Order", id }],
        }),
        updateOrderStatus: builder.mutation<
            Order,
            { id: string; status: string }
        >({
            query: ({ id, status }) => ({
                url: `/orders/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Order", id },
            ],
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useCreateOrderMutation,
    useCancelOrderMutation,
    useUpdateOrderStatusMutation,
} = orderApi;
