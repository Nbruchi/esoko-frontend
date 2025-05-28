import { baseApi } from "./baseApi";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<CartItem[], void>({
            query: () => "/cart",
            providesTags: ["Cart"],
        }),
        addToCart: builder.mutation<CartItem, AddToCartRequest>({
            query: (data) => ({
                url: "/cart",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Cart"],
        }),
        updateCartItem: builder.mutation<
            CartItem,
            { id: string } & UpdateCartItemRequest
        >({
            query: ({ id, ...data }) => ({
                url: `/cart/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Cart"],
        }),
        removeFromCart: builder.mutation<void, string>({
            query: (id) => ({
                url: `/cart/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
        clearCart: builder.mutation<void, void>({
            query: () => ({
                url: "/cart",
                method: "DELETE",
            }),
            invalidatesTags: ["Cart"],
        }),
    }),
});

export const {
    useGetCartQuery,
    useAddToCartMutation,
    useUpdateCartItemMutation,
    useRemoveFromCartMutation,
    useClearCartMutation,
} = cartApi;
