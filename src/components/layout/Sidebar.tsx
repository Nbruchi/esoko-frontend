import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationItem {
    name: string;
    href: string;
}

interface SidebarProps {
    navigation: NavigationItem[];
}

export const Sidebar = ({ navigation }: SidebarProps) => {
    return (
        <div className="w-64 min-h-screen border-r bg-card">
            <nav className="space-y-1 p-4">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted"
                            )
                        }
                    >
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};
