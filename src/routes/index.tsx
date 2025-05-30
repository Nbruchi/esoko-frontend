import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/queries/useAuth";
import MainLayout from "@/layouts/MainLayout";
import CustomerLayout from "@/layouts/CustomerLayout";
import SellerLayout from "@/layouts/SellerLayout";
import AdminLayout from "@/layouts/AdminLayout";

// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";

// Customer Pages
import CustomerDashboard from "@/pages/customer/Dashboard";
import CustomerProducts from "@/pages/customer/Products";
import CustomerCart from "@/pages/customer/Cart";
import CustomerOrders from "@/pages/customer/Orders";
import CustomerProfile from "@/pages/customer/Profile";

// Seller Pages
import SellerDashboard from "@/pages/seller/Dashboard";
import SellerProducts from "@/pages/seller/Products";
import SellerOrders from "@/pages/seller/Orders";
import SellerProfile from "@/pages/seller/Profile";
import SellerAnalytics from "@/pages/seller/Analytics";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminProducts from "@/pages/admin/Products";
import AdminOrders from "@/pages/admin/Orders";
import AdminSettings from "@/pages/admin/Settings";
import { UserRole } from "@/types";

const AppRoutes = () => {
    const { user, isAuthenticated } = useAuth();

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Navigate to="/auth/login" replace />} />
                <Route path="auth">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route
                        path="forgot-password"
                        element={<ForgotPassword />}
                    />
                </Route>
            </Route>

            {/* Protected Customer Routes */}
            <Route
                path="/customer"
                element={
                    isAuthenticated && user?.role === UserRole.CUSTOMER ? (
                        <CustomerLayout />
                    ) : (
                        <Navigate to="/auth/login" replace />
                    )
                }
            >
                <Route index element={<CustomerDashboard />} />
                <Route path="products" element={<CustomerProducts />} />
                <Route path="cart" element={<CustomerCart />} />
                <Route path="orders" element={<CustomerOrders />} />
                <Route path="profile" element={<CustomerProfile />} />
            </Route>

            {/* Protected Seller Routes */}
            <Route
                path="/seller"
                element={
                    isAuthenticated && user?.role === UserRole.SELLER ? (
                        <SellerLayout />
                    ) : (
                        <Navigate to="/auth/login" replace />
                    )
                }
            >
                <Route index element={<SellerDashboard />} />
                <Route path="products" element={<SellerProducts />} />
                <Route path="orders" element={<SellerOrders />} />
                <Route path="profile" element={<SellerProfile />} />
                <Route path="analytics" element={<SellerAnalytics />} />
            </Route>

            {/* Protected Admin Routes */}
            <Route
                path="/admin"
                element={
                    isAuthenticated && user?.role === UserRole.ADMIN ? (
                        <AdminLayout />
                    ) : (
                        <Navigate to="/auth/login" replace />
                    )
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
