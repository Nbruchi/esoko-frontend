import { api, API_ENDPOINTS } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useWishlist() {
    return useQuery({
        queryKey: ["wishlist"],
        queryFn: () => api.get<WishlistItem[]>(API_ENDPOINTS.WISHLIST.LIST),
    });
}

export function useAddToWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) =>
            api.post<WishlistItem>(API_ENDPOINTS.WISHLIST.ADD, { productId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });
}

export function useRemoveFromWishlist() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) =>
            api.delete(API_ENDPOINTS.WISHLIST.REMOVE(productId)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
        },
    });
}
