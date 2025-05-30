import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/queries/useAuth";
import { UserRole } from "@/types";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({
    children,
    allowedRoles,
}: ProtectedRouteProps) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // If roles are specified, check if user has required role
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on user role
        const roleRoutes = {
            [UserRole.CUSTOMER]: "/customer",
            [UserRole.SELLER]: "/seller",
            [UserRole.ADMIN]: "/admin",
        };
        return <Navigate to={roleRoutes[user.role]} replace />;
    }

    return <>{children}</>;
};
