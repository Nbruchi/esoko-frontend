import { api, API_ENDPOINTS } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => api.get(API_ENDPOINTS.USER.PROFILE),
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateProfileRequest) =>
            api.put(API_ENDPOINTS.USER.UPDATE_PROFILE, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
}

export function useAddresses() {
    return useQuery({
        queryKey: ["addresses"],
        queryFn: () => api.get<Address[]>(API_ENDPOINTS.USER.ADDRESSES),
    });
}

export function useAddAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<Address, "id">) =>
            api.post<Address>(API_ENDPOINTS.USER.ADD_ADDRESS, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    });
}

export function useUpdateAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: Partial<Omit<Address, "id">>;
        }) => api.put<Address>(API_ENDPOINTS.USER.UPDATE_ADDRESS(id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    });
}

export function useDeleteAddress() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) =>
            api.delete(API_ENDPOINTS.USER.DELETE_ADDRESS(id)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["addresses"] });
        },
    });
}
