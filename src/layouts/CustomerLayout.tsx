import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

const CustomerLayout = () => {
    const navigation = [
        { name: "Dashboard", href: "/customer" },
        { name: "Products", href: "/customer/products" },
        { name: "Cart", href: "/customer/cart" },
        { name: "Orders", href: "/customer/orders" },
        { name: "Profile", href: "/customer/profile" },
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

export default CustomerLayout;
