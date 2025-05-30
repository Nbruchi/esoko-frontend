import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
