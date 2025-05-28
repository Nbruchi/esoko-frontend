import { api, API_ENDPOINTS } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function usePaymentMethods() {
    return useQuery({
        queryKey: ["payment-methods"],
        queryFn: () => api.get<PaymentMethod[]>(API_ENDPOINTS.PAYMENTS.METHODS),
    });
}

export function useAddPaymentMethod() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreatePaymentMethodRequest) =>
            api.post<PaymentMethod>(API_ENDPOINTS.PAYMENTS.ADD_METHOD, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
        },
    });
}

export function useDeletePaymentMethod() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            api.delete(API_ENDPOINTS.PAYMENTS.DELETE_METHOD(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payment-methods"] });
        },
    });
}

export function useCreatePaymentIntent() {
    return useMutation({
        mutationFn: (data: PaymentIntentRequest) =>
            api.post<{ clientSecret: string }>(
                API_ENDPOINTS.PAYMENTS.INTENT,
                data
            ),
    });
}
