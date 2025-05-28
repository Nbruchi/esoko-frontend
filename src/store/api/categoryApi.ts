import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => "/categories",
            providesTags: ["Category"],
        }),
        getCategory: builder.query<Category, string>({
            query: (id) => `/categories/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Category", id }],
        }),
        createCategory: builder.mutation<Category, CreateCategoryRequest>({
            query: (data) => ({
                url: "/categories",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Category"],
        }),
        updateCategory: builder.mutation<
            Category,
            { id: string } & UpdateCategoryRequest
        >({
            query: ({ id, ...data }) => ({
                url: `/categories/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Category", id },
            ],
        }),
        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Category"],
        }),
        getCategoryProducts: builder.query<
            { products: Product[]; total: number },
            { id: string; filters?: Record<string, unknown> }
        >({
            query: ({ id, filters }) => ({
                url: `/categories/${id}/products`,
                params: filters,
            }),
            providesTags: (_result, _error, { id }) => [
                { type: "Category", id },
            ],
        }),
    }),
});

export const {
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoryProductsQuery,
} = categoryApi;
