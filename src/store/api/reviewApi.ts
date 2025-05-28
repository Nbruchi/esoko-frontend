import { baseApi } from "./baseApi";

export const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<
            { reviews: Review[]; total: number },
            Record<string, unknown>
        >({
            query: (filters) => ({
                url: "/reviews",
                params: filters,
            }),
            providesTags: ["Review"],
        }),
        getReview: builder.query<Review, string>({
            query: (id) => `/reviews/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Review", id }],
        }),
        createReview: builder.mutation<Review, CreateReviewRequest>({
            query: (data) => ({
                url: "/reviews",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Review", "Product"],
        }),
        updateReview: builder.mutation<
            Review,
            { id: string } & UpdateReviewRequest
        >({
            query: ({ id, ...data }) => ({
                url: `/reviews/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "Review", id },
                "Product",
            ],
        }),
        deleteReview: builder.mutation<void, string>({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Review", "Product"],
        }),
        getProductReviews: builder.query<
            { reviews: Review[]; total: number },
            { productId: string; filters?: Record<string, unknown> }
        >({
            query: ({ productId, filters }) => ({
                url: `/products/${productId}/reviews`,
                params: filters,
            }),
            providesTags: (_result, _error, { productId }) => [
                { type: "Review", id: productId },
            ],
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useGetReviewQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
    useGetProductReviewsQuery,
} = reviewApi;
