import { api, API_ENDPOINTS } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useNotifications(params?: {
    page?: number;
    limit?: number;
    isRead?: boolean;
}) {
    return useQuery({
        queryKey: ["notifications", params],
        queryFn: () =>
            api.get<PaginatedResponse<Notification>>(
                API_ENDPOINTS.NOTIFICATIONS.LIST,
                { params }
            ),
    });
}

export function useMarkNotificationAsRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            api.post(API_ENDPOINTS.NOTIFICATIONS.MARK_READ(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
}

export function useMarkAllNotificationsAsRead() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => api.post(API_ENDPOINTS.NOTIFICATIONS.MARK_ALL_READ),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
}

export function useNotificationPreferences() {
    return useQuery({
        queryKey: ["notification-preferences"],
        queryFn: () =>
            api.get<NotificationPreferences>(
                API_ENDPOINTS.NOTIFICATIONS.PREFERENCES
            ),
    });
}

export function useUpdateNotificationPreferences() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<NotificationPreferences>) =>
            api.put(API_ENDPOINTS.NOTIFICATIONS.UPDATE_PREFERENCES, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notification-preferences"],
            });
        },
    });
}
