import { baseApi } from "./baseApi";

export const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<
            { notifications: Notification[]; total: number },
            { page?: number; limit?: number; isRead?: boolean }
        >({
            query: (params) => ({
                url: "/notifications",
                params,
            }),
            providesTags: ["Notification"],
        }),
        markNotificationAsRead: builder.mutation<void, string>({
            query: (id) => ({
                url: `/notifications/${id}/read`,
                method: "PATCH",
            }),
            invalidatesTags: ["Notification"],
        }),
        markAllNotificationsAsRead: builder.mutation<void, void>({
            query: () => ({
                url: "/notifications/read-all",
                method: "PATCH",
            }),
            invalidatesTags: ["Notification"],
        }),
        getNotificationPreferences: builder.query<
            NotificationPreferences,
            void
        >({
            query: () => "/notifications/preferences",
            providesTags: ["Notification"],
        }),
        updateNotificationPreferences: builder.mutation<
            NotificationPreferences,
            Partial<NotificationPreferences>
        >({
            query: (preferences) => ({
                url: "/notifications/preferences",
                method: "PATCH",
                body: preferences,
            }),
            invalidatesTags: ["Notification"],
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
    useMarkAllNotificationsAsReadMutation,
    useGetNotificationPreferencesQuery,
    useUpdateNotificationPreferencesMutation,
} = notificationApi;
