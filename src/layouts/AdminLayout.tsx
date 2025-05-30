import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

const AdminLayout = () => {
    const navigation = [
        { name: "Dashboard", href: "/admin" },
        { name: "Users", href: "/admin/users" },
        { name: "Products", href: "/admin/products" },
        { name: "Orders", href: "/admin/orders" },
        { name: "Settings", href: "/admin/settings" },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="flex">
                <Sidebar navigation={navigation} />
                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
