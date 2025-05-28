import { api, API_ENDPOINTS } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
}) {
    return useQuery({
        queryKey: ["products", params],
        queryFn: () =>
            api.get<PaginatedResponse<Product>>(API_ENDPOINTS.PRODUCTS.LIST, {
                params,
            }),
    });
}

export function useProduct(id: string) {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => api.get<Product>(API_ENDPOINTS.PRODUCTS.DETAIL(id)),
        enabled: !!id,
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProductRequest) =>
            api.post<Product>(API_ENDPOINTS.PRODUCTS.CREATE, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });
}

export function useUpdateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateProductRequest;
        }) => api.put<Product>(API_ENDPOINTS.PRODUCTS.UPDATE(id), data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product", id] });
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            api.delete(API_ENDPOINTS.PRODUCTS.DELETE(id)),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["products"] }),
    });
}
