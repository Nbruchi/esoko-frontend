import { baseApi } from "./baseApi";

export const emailApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendPasswordResetEmail: builder.mutation<void, { email: string }>({
            query: (data) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: data,
            }),
        }),
        sendOrderConfirmation: builder.mutation<void, { orderId: string }>({
            query: (data) => ({
                url: `/orders/${data.orderId}/send-confirmation`,
                method: "POST",
            }),
        }),
        sendShippingUpdate: builder.mutation<void, { orderId: string }>({
            query: (data) => ({
                url: `/orders/${data.orderId}/send-shipping-update`,
                method: "POST",
            }),
        }),
        sendDeliveryConfirmation: builder.mutation<void, { orderId: string }>({
            query: (data) => ({
                url: `/orders/${data.orderId}/send-delivery-confirmation`,
                method: "POST",
            }),
        }),
        sendReviewRequest: builder.mutation<void, { orderId: string }>({
            query: (data) => ({
                url: `/orders/${data.orderId}/send-review-request`,
                method: "POST",
            }),
        }),
        sendWelcomeEmail: builder.mutation<void, { userId: string }>({
            query: (data) => ({
                url: `/users/${data.userId}/send-welcome`,
                method: "POST",
            }),
        }),
        sendNewsletterSubscription: builder.mutation<void, { email: string }>({
            query: (data) => ({
                url: "/newsletter/subscribe",
                method: "POST",
                body: data,
            }),
        }),
        sendNewsletterUnsubscription: builder.mutation<void, { email: string }>(
            {
                query: (data) => ({
                    url: "/newsletter/unsubscribe",
                    method: "POST",
                    body: data,
                }),
            }
        ),
    }),
});

export const {
    useSendPasswordResetEmailMutation,
    useSendOrderConfirmationMutation,
    useSendShippingUpdateMutation,
    useSendDeliveryConfirmationMutation,
    useSendReviewRequestMutation,
    useSendWelcomeEmailMutation,
    useSendNewsletterSubscriptionMutation,
    useSendNewsletterUnsubscriptionMutation,
} = emailApi;
