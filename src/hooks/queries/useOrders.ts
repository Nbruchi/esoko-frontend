import { api, API_ENDPOINTS } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useOrders(params?: {
    page?: number;
    limit?: number;
    status?: string;
}) {
    return useQuery({
        queryKey: ["orders", params],
        queryFn: () =>
            api.get<PaginatedResponse<Order>>(API_ENDPOINTS.ORDERS.LIST, {
                params,
            }),
    });
}

export function useOrder(id: string) {
    return useQuery({
        queryKey: ["order", id],
        queryFn: () => api.get<Order>(API_ENDPOINTS.ORDERS.DETAIL(id)),
        enabled: !!id,
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateOrderRequest) =>
            api.post<Order>(API_ENDPOINTS.ORDERS.CREATE, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export function useUpdateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateOrderRequest }) =>
            api.put<Order>(API_ENDPOINTS.ORDERS.UPDATE(id), data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["order", id] });
        },
    });
}

export function useCancelOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            api.post<Order>(API_ENDPOINTS.ORDERS.CANCEL(id)),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["order", id] });
        },
    });
}

export function useTrackOrder(id: string) {
    return useQuery({
        queryKey: ["order-tracking", id],
        queryFn: () =>
            api.get<OrderTracking>(API_ENDPOINTS.ORDERS.TRACKING(id)),
        enabled: !!id,
    });
}
