import { baseApi } from "./baseApi";

export const searchApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        searchProducts: builder.query<
            { products: Product[]; total: number },
            SearchParams
        >({
            query: (params) => ({
                url: "/search/products",
                params,
            }),
            providesTags: ["Search"],
        }),
        searchCategories: builder.query<Category[], string>({
            query: (query) => ({
                url: "/search/categories",
                params: { query },
            }),
            providesTags: ["Search"],
        }),
        getSearchSuggestions: builder.query<string[], string>({
            query: (query) => ({
                url: "/search/suggestions",
                params: { query },
            }),
            providesTags: ["Search"],
        }),
    }),
});

export const {
    useSearchProductsQuery,
    useSearchCategoriesQuery,
    useGetSearchSuggestionsQuery,
} = searchApi;
