import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/queries/useAuth";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu, Heart } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import logoFull from "@/assets/logo-full.png";

export const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <header className="border-b sticky top-0 bg-background z-50">
            {/* Top bar for announcements */}
            <div className="bg-primary text-primary-foreground py-1 text-center text-sm">
                Free shipping on orders over $50
            </div>

            <div className="container mx-auto px-4">
                {/* Main header content */}
                <div className="h-16 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logoFull} alt="Esoko" className="h-8" />
                    </Link>

                    {/* Search bar - hidden on mobile */}
                    <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search products..."
                                className="pl-9 w-full"
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                        Categories
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                                            <div className="space-y-3">
                                                <h4 className="font-medium">
                                                    Electronics
                                                </h4>
                                                <ul className="space-y-2">
                                                    <li>
                                                        <Link to="/category/phones">
                                                            Phones
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/category/laptops">
                                                            Laptops
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/category/accessories">
                                                            Accessories
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="space-y-3">
                                                <h4 className="font-medium">
                                                    Fashion
                                                </h4>
                                                <ul className="space-y-2">
                                                    <li>
                                                        <Link to="/category/men">
                                                            Men
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/category/women">
                                                            Women
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/category/kids">
                                                            Kids
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        {/* Cart */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"
                            asChild
                        >
                            <Link to="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    0
                                </span>
                            </Link>
                        </Button>

                        {/* Wishlist */}
                        <Button variant="ghost" size="icon" asChild>
                            <Link to="/wishlist">
                                <Heart className="h-5 w-5" />
                            </Link>
                        </Button>

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Language Toggle */}
                        <LanguageToggle />

                        {/* User menu */}
                        {isAuthenticated ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-8 w-8 rounded-full"
                                    >
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage
                                                src={user?.profilePhoto}
                                                alt={user?.firstName}
                                            />
                                            <AvatarFallback>
                                                {user?.firstName
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link to={`/${user?.role}/profile`}>
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link to={`/${user?.role}/orders`}>
                                            Orders
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logout}>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" asChild>
                                    <Link to="/auth/login">Login</Link>
                                </Button>
                                <Button asChild>
                                    <Link to="/auth/register">Register</Link>
                                </Button>
                            </div>
                        )}
                    </nav>

                    {/* Mobile menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="mt-4 space-y-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium">Categories</h4>
                                    <ul className="space-y-2">
                                        <li>
                                            <Link to="/category/electronics">
                                                Electronics
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/category/fashion">
                                                Fashion
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/category/home">
                                                Home & Living
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ThemeToggle />
                                    <LanguageToggle />
                                </div>
                                {!isAuthenticated && (
                                    <div className="space-y-2">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link to="/auth/login">Login</Link>
                                        </Button>
                                        <Button className="w-full" asChild>
                                            <Link to="/auth/register">
                                                Register
                                            </Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};
