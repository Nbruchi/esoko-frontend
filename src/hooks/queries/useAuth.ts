import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { User } from "@/types";

export const useAuth = () => {
    const queryClient = useQueryClient();

    const { data: user, isLoading } = useQuery({
        queryKey: ["auth", "user"],
        queryFn: async () => {
            const { data } = await api.get<User>("/auth/me");
            return data;
        },
    });

    const logout = useMutation({
        mutationFn: async () => {
            await api.post("/auth/logout");
        },
        onSuccess: () => {
            queryClient.clear();
        },
    });

    return {
        user,
        isAuthenticated: !!user,
        isLoading,
        logout: () => logout.mutate(),
    };
};
