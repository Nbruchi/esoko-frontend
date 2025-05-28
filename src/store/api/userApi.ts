import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<User, void>({
            query: () => "/users/profile",
            providesTags: ["User"],
        }),
        updateProfile: builder.mutation<User, UpdateProfileRequest>({
            query: (data) => ({
                url: "/users/profile",
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["User"],
        }),
        getAddresses: builder.query<Address[], void>({
            query: () => "/users/addresses",
            providesTags: ["User"],
        }),
        addAddress: builder.mutation<Address, Omit<Address, "id">>({
            query: (address) => ({
                url: "/users/addresses",
                method: "POST",
                body: address,
            }),
            invalidatesTags: ["User"],
        }),
        updateAddress: builder.mutation<Address, Address>({
            query: (address) => ({
                url: `/users/addresses/${address.id}`,
                method: "PUT",
                body: address,
            }),
            invalidatesTags: ["User"],
        }),
        deleteAddress: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/addresses/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
        getPaymentMethods: builder.query<PaymentMethod[], void>({
            query: () => "/users/payment-methods",
            providesTags: ["Payment"],
        }),
        addPaymentMethod: builder.mutation<
            PaymentMethod,
            Omit<PaymentMethod, "id">
        >({
            query: (paymentMethod) => ({
                url: "/users/payment-methods",
                method: "POST",
                body: paymentMethod,
            }),
            invalidatesTags: ["Payment"],
        }),
        deletePaymentMethod: builder.mutation<void, string>({
            query: (id) => ({
                url: `/users/payment-methods/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Payment"],
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useGetAddressesQuery,
    useAddAddressMutation,
    useUpdateAddressMutation,
    useDeleteAddressMutation,
    useGetPaymentMethodsQuery,
    useAddPaymentMethodMutation,
    useDeletePaymentMethodMutation,
} = userApi;
