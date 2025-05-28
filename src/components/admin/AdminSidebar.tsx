import {
    LayoutDashboard,
    Users,
    Store,
    Package,
    ShoppingCart,
    Settings,
    BarChart,
    Tag,
    FileText,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";

const navigationItems = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        title: "Sellers",
        href: "/admin/sellers",
        icon: Store,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "Categories",
        href: "/admin/categories",
        icon: Tag,
    },
    {
        title: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        title: "Reports",
        href: "/admin/reports",
        icon: BarChart,
    },
    {
        title: "Documents",
        href: "/admin/documents",
        icon: FileText,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export function AdminSidebar() {
    const location = useLocation();

    return (
        <SidebarProvider defaultOpen>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2 px-2">
                        <SidebarTrigger />
                        <span className="text-lg font-semibold">
                            Admin Panel
                        </span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {navigationItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={location.pathname === item.href}
                                    tooltip={item.title}
                                >
                                    <a href={item.href}>
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
            </Sidebar>
        </SidebarProvider>
    );
}
