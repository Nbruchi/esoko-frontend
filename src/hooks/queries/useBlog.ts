import { api, API_ENDPOINTS } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBlogPosts(params?: {
    page?: number;
    limit?: number;
    author?: string;
}) {
    return useQuery({
        queryKey: ["blog-posts", params],
        queryFn: () =>
            api.get<PaginatedResponse<BlogPost>>(API_ENDPOINTS.BLOG.LIST, {
                params,
            }),
    });
}

export function useBlogPost(id: string) {
    return useQuery({
        queryKey: ["blog-post", id],
        queryFn: () => api.get<BlogPost>(API_ENDPOINTS.BLOG.DETAIL(id)),
        enabled: !!id,
    });
}

export function useCreateBlogPost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBlogPostRequest) =>
            api.post<BlogPost>(API_ENDPOINTS.BLOG.CREATE, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
        },
    });
}

export function useUpdateBlogPost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: UpdateBlogPostRequest;
        }) => api.put<BlogPost>(API_ENDPOINTS.BLOG.UPDATE(id), data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
            queryClient.invalidateQueries({ queryKey: ["blog-post", id] });
        },
    });
}

export function useDeleteBlogPost() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => api.delete(API_ENDPOINTS.BLOG.DELETE(id)),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
            queryClient.invalidateQueries({ queryKey: ["blog-post", id] });
        },
    });
}
