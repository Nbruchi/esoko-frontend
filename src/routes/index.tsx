import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/hooks/queries/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import CustomerLayout from "@/layouts/CustomerLayout";
import SellerLayout from "@/layouts/SellerLayout";
import AdminLayout from "@/layouts/AdminLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { UserRole } from "@/types";

// Auth Pages
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import VerifyEmail from "@/pages/auth/VerifyEmail";

// Public Pages
import Home from "@/pages/Home";
import ProductList from "@/pages/ProductList";
import ProductDetails from "@/pages/ProductDetails";
import SearchResults from "@/pages/SearchResults";

// Customer Pages
import CustomerDashboard from "@/pages/customer/Dashboard";
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
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
    const { isLoading } = useAuth();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <Routes>
            {/* Auth Routes */}
            <Route path="/auth" element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/:id" element={<ProductDetails />} />
                <Route path="search" element={<SearchResults />} />
            </Route>

            {/* Email Verification Route */}
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Protected User Routes */}
            <Route
                path="/customer"
                element={
                    <ProtectedRoute allowedRoles={[UserRole.CUSTOMER]}>
                        <CustomerLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<CustomerDashboard />} />
                <Route path="cart" element={<CustomerCart />} />
                <Route path="orders" element={<CustomerOrders />} />
                <Route path="profile" element={<CustomerProfile />} />
            </Route>

            {/* Protected Seller Routes */}
            <Route
                path="/seller"
                element={
                    <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
                        <SellerLayout />
                    </ProtectedRoute>
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
                    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;
