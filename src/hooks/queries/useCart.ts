import { api, API_ENDPOINTS } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCart() {
    return useQuery({
        queryKey: ["cart"],
        queryFn: () => api.get<CartItem[]>(API_ENDPOINTS.CART.GET),
    });
}

export function useAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: AddToCartRequest) =>
            api.post<CartItem>(API_ENDPOINTS.CART.ADD_ITEM, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export function useUpdateCartItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateCartItemRequest;
        }) => api.put<CartItem>(API_ENDPOINTS.CART.UPDATE_ITEM(id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export function useRemoveFromCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            api.delete(API_ENDPOINTS.CART.REMOVE_ITEM(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export function useClearCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => api.delete(API_ENDPOINTS.CART.CLEAR),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}
