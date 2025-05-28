import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/queries/useAuth";

export function ProtectedRoute() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
