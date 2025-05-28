import { api, API_ENDPOINTS } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCategories(params?: {
    page?: number;
    limit?: number;
    parentId?: string;
}) {
    return useQuery({
        queryKey: ["categories", params],
        queryFn: () =>
            api.get<PaginatedResponse<Category>>(
                API_ENDPOINTS.CATEGORIES.LIST,
                {
                    params,
                }
            ),
    });
}

export function useCategory(id: string) {
    return useQuery({
        queryKey: ["category", id],
        queryFn: () => api.get<Category>(API_ENDPOINTS.CATEGORIES.DETAIL(id)),
        enabled: !!id,
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateCategoryRequest) =>
            api.post<Category>(API_ENDPOINTS.CATEGORIES.CREATE, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateCategoryRequest;
        }) => api.put<Category>(API_ENDPOINTS.CATEGORIES.UPDATE(id), data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            queryClient.invalidateQueries({ queryKey: ["category", id] });
        },
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            api.delete(API_ENDPOINTS.CATEGORIES.DELETE(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });
}
 