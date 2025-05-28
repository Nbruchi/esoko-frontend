import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryProvider } from "@/providers/query-provider";
import { AuthLayout } from "@/layouts/AuthLayout";
import {
    ForgotPassword,
    Login,
    Register,
    ResetPassword,
    VerifyEmail,
} from "@/pages/auth";
import { MainLayout } from "./layouts/MainLayout";
import {
    Checkout,
    Home,
    OrderDetails,
    Orders,
    ProductDetails,
    Products,
    Profile,
    Cart,
    Wishlist,
} from "./pages/user";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { RoleGuard } from "./components/auth/RoleGuard";
import { AdminLayout } from "./layouts/AdminLayout";
import {
    AdminCategories,
    AdminDashboard,
    AdminDocuments,
    AdminOrders,
    AdminProducts,
    AdminReports,
    AdminSellers,
    AdminSettings,
    AdminUsers,
} from "./pages/admin";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";

const App = () => {
    return (
        <QueryProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public routes */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="/reset-password"
                            element={<ResetPassword />}
                        />
                        <Route path="/verify-email" element={<VerifyEmail />} />
                    </Route>
                    {/* Main layout routes */}
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/products" element={<Products />} />
                        <Route
                            path="/products/:id"
                            element={<ProductDetails />}
                        />
                        {/* Protected user routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route
                                path="/orders/:id"
                                element={<OrderDetails />}
                            />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/wishlist" element={<Wishlist />} />
                        </Route>
                    </Route>
                    {/* Admin Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<RoleGuard allowedRoles={["admin"]} />}>
                            <Route element={<AdminLayout />}>
                                <Route
                                    path="/admin"
                                    element={<AdminDashboard />}
                                />
                                <Route
                                    path="/admin/users"
                                    element={<AdminUsers />}
                                />
                                <Route
                                    path="/admin/sellers"
                                    element={<AdminSellers />}
                                />
                                <Route
                                    path="/admin/products"
                                    element={<AdminProducts />}
                                />
                                <Route
                                    path="/admin/categories"
                                    element={<AdminCategories />}
                                />
                                <Route
                                    path="/admin/orders"
                                    element={<AdminOrders />}
                                />
                                <Route
                                    path="/admin/reports"
                                    element={<AdminReports />}
                                />
                                <Route
                                    path="/admin/documents"
                                    element={<AdminDocuments />}
                                />
                                <Route
                                    path="/admin/settings"
                                    element={<AdminSettings />}
                                />
                            </Route>
                        </Route>
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </QueryProvider>
    );
};

export default App;
