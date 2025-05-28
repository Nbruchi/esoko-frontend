import { baseApi } from "./baseApi";

export const fileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadFile: builder.mutation<FileUploadResponse, FormData>({
            query: (formData) => ({
                url: "/files/upload",
                method: "POST",
                body: formData,
                formData: true,
            }),
            invalidatesTags: ["File"],
        }),

        uploadMultipleFiles: builder.mutation<FileUploadResponse[], FormData>({
            query: (formData) => ({
                url: "/files/upload-multiple",
                method: "POST",
                body: formData,
                formData: true,
            }),
            invalidatesTags: ["File"],
        }),

        deleteFile: builder.mutation<void, string>({
            query: (fileId) => ({
                url: `/files/${fileId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["File"],
        }),

        getFileUrl: builder.query<{ url: string }, string>({
            query: (fileId) => `/files/${fileId}/url`,
            providesTags: ["File"],
        }),

        getFileMetadata: builder.query<FileMetadata, string>({
            query: (fileId) => `/files/${fileId}/metadata`,
            providesTags: ["File"],
        }),
    }),
});

export const {
    useUploadFileMutation,
    useUploadMultipleFilesMutation,
    useDeleteFileMutation,
    useGetFileUrlQuery,
    useGetFileMetadataQuery,
} = fileApi;
