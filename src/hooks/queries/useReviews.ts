import { api, API_ENDPOINTS } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useReviews(params?: {
    page?: number;
    limit?: number;
    productId?: string;
    userId?: string;
}) {
    return useQuery({
        queryKey: ["reviews", params],
        queryFn: () =>
            api.get<PaginatedResponse<Review>>(API_ENDPOINTS.REVIEWS.LIST, {
                params,
            }),
    });
}

export function useCreateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateReviewRequest) =>
            api.post<Review>(API_ENDPOINTS.REVIEWS.CREATE, data),
        onSuccess: (_, { productId }) => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            queryClient.invalidateQueries({
                queryKey: ["product", productId],
            });
        },
    });
}

export function useUpdateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateReviewRequest }) =>
            api.put<Review>(API_ENDPOINTS.REVIEWS.UPDATE(id), data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            queryClient.invalidateQueries({
                queryKey: ["product", response.data.productId],
            });
        },
    });
}

export function useDeleteReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            api.delete(API_ENDPOINTS.REVIEWS.DELETE(id)),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            queryClient.invalidateQueries({ queryKey: ["review", id] });
        },
    });
}
