import { useMutation } from "@tanstack/react-query";
import { api } from "../../services/api";
import { API_ENDPOINTS } from "../../services/endpoints";

export const useSendVerificationEmail = () => {
    return useMutation({
        mutationFn: () => api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL),
    });
};

export const useSendPasswordResetEmail = () => {
    return useMutation({
        mutationFn: (email: string) =>
            api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),
    });
};

export const useSendOrderConfirmation = () => {
    return useMutation({
        mutationFn: (orderId: string) =>
            api.post(
                `${API_ENDPOINTS.ORDERS.BASE}/${orderId}/send-confirmation`
            ),
    });
};

export const useSendShippingUpdate = () => {
    return useMutation({
        mutationFn: (orderId: string) =>
            api.post(
                `${API_ENDPOINTS.ORDERS.BASE}/${orderId}/send-shipping-update`
            ),
    });
};

export const useSendDeliveryConfirmation = () => {
    return useMutation({
        mutationFn: (orderId: string) =>
            api.post(
                `${API_ENDPOINTS.ORDERS.BASE}/${orderId}/send-delivery-confirmation`
            ),
    });
};

export const useSendReviewRequest = () => {
    return useMutation({
        mutationFn: (orderId: string) =>
            api.post(
                `${API_ENDPOINTS.ORDERS.BASE}/${orderId}/send-review-request`
            ),
    });
};

export const useSendWelcomeEmail = () => {
    return useMutation({
        mutationFn: (userId: string) =>
            api.post(`${API_ENDPOINTS.USERS.BASE}/${userId}/send-welcome`),
    });
};

export const useNewsletterSubscription = () => {
    return useMutation({
        mutationFn: (email: string) =>
            api.post(API_ENDPOINTS.NEWSLETTER.SUBSCRIBE, { email }),
    });
};

export const useNewsletterUnsubscription = () => {
    return useMutation({
        mutationFn: (email: string) =>
            api.post(API_ENDPOINTS.NEWSLETTER.UNSUBSCRIBE, { email }),
    });
};
