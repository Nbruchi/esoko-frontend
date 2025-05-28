// frontend/src/layouts/AuthLayout.tsx
import { Outlet } from "react-router-dom";
import authBg from "@/assets/auth.png";

export function AuthLayout() {
    return (
        <div className="min-h-screen relative">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={authBg}
                    alt="Authentication"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Form Container */}
            <div className="relative min-h-screen flex items-center justify-center p-6">
                <div className="w-[50%] max-w-4xl bg-background/95 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
