import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

const SellerLayout = () => {
    const navigation = [
        { name: "Dashboard", href: "/seller" },
        { name: "Products", href: "/seller/products" },
        { name: "Orders", href: "/seller/orders" },
        { name: "Analytics", href: "/seller/analytics" },
        { name: "Profile", href: "/seller/profile" },
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

export default SellerLayout;
