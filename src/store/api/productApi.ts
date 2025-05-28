import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<
            { products: Product[]; total: number },
            Record<string, unknown>
        >({
            query: (filters) => ({
                url: "/products",
                params: filters,
            }),
            providesTags: ["Product"],
        }),
        getProduct: builder.query<Product, string>({
            query: (id) => `/products/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Product", id }],
        }),
        createProduct: builder.mutation<Product, CreateProductRequest>({
            query: (data) => ({
                url: "/products",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Product"],
        }),
        updateProduct: builder.mutation<
            Product,
            { id: string } & UpdateProductRequest
        >({
            query: ({ id, ...data }) => ({
                url: `/products/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Product", id },
            ],
        }),
        deleteProduct: builder.mutation<void, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Product"],
        }),
        getFeaturedProducts: builder.query<Product[], void>({
            query: () => "/products/featured",
            providesTags: ["Product"],
        }),
        getNewArrivals: builder.query<Product[], void>({
            query: () => "/products/new-arrivals",
            providesTags: ["Product"],
        }),
        getBestSellers: builder.query<Product[], void>({
            query: () => "/products/best-sellers",
            providesTags: ["Product"],
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useGetFeaturedProductsQuery,
    useGetNewArrivalsQuery,
    useGetBestSellersQuery,
} = productApi;
