import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import { ForgotPassword } from "@/pages/auth/ForgotPassword";
import { ResetPassword } from "@/pages/auth/ResetPassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthProvider>
                <ProtectedRoute>
                    <div>Home Page</div>
                </ProtectedRoute>
            </AuthProvider>
        ),
    },
    {
        path: "/login",
        element: (
            <AuthProvider>
                <Login />
            </AuthProvider>
        ),
    },
    {
        path: "/register",
        element: (
            <AuthProvider>
                <Register />
            </AuthProvider>
        ),
    },
    {
        path: "/verify-email",
        element: (
            <AuthProvider>
                <VerifyEmail />
            </AuthProvider>
        ),
    },
    {
        path: "/forgot-password",
        element: (
            <AuthProvider>
                <ForgotPassword />
            </AuthProvider>
        ),
    },
    {
        path: "/reset-password",
        element: (
            <AuthProvider>
                <ResetPassword />
            </AuthProvider>
        ),
    },
]);

export default router;
