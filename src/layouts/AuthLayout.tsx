import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import authImage from "@/assets/auth.png";
import loginImage from "@/assets/login.png";

const images = [authImage, loginImage];

const AuthLayout = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex">
            {/* Left side - Image Slider */}
            <div className="hidden lg:flex w-1/2 bg-primary relative overflow-hidden">
                <div
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                        opacity: 1,
                    }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentImageIndex
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        >
                            <img
                                src={image}
                                alt={`Auth slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-primary/10" />{" "}
                            {/* Overlay */}
                        </div>
                    ))}
                </div>
                {/* Welcome Text */}
                <div className="relative z-10 flex flex-col justify-center items-center text-white p-20 text-center h-full">
                    <div className="mt-40 ml-10">
                        <h1 className="text-5xl font-bold mb-6">
                            Welcome to Esoko
                        </h1>
                        <p className="text-2xl max-w-lg leading-relaxed">
                            Your one-stop marketplace for buying and selling
                            products
                        </p>
                    </div>
                </div>
            </div>

            {/* Right side - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
