import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <div className="flex-1">
                <AdminHeader />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
