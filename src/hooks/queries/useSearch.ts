import { api, API_ENDPOINTS } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export function useProductSearch(params: SearchParams) {
    return useQuery({
        queryKey: ["product-search", params],
        queryFn: () =>
            api.get<PaginatedResponse<Product>>(API_ENDPOINTS.SEARCH.PRODUCTS, {
                params,
            }),
        enabled: !!params.query,
    });
}

export function useCategorySearch(params: SearchParams) {
    return useQuery({
        queryKey: ["category-search", params],
        queryFn: () =>
            api.get<PaginatedResponse<Category>>(
                API_ENDPOINTS.SEARCH.CATEGORIES,
                { params }
            ),
        enabled: !!params.query,
    });
}

export function useSearchSuggestions(query: string) {
    return useQuery({
        queryKey: ["search-suggestions", query],
        queryFn: () =>
            api.get<string[]>(API_ENDPOINTS.SEARCH.SUGGESTIONS, {
                params: { query },
            }),
        enabled: !!query,
    });
}
