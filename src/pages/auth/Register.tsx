import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/queries/useAuth";
import { CustomInput } from "@/components/common/form/CustomInput";
import { PasswordInput } from "@/components/common/form/PasswordInput";
import { Form } from "@/components/ui/form";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { toast } from "sonner";

export default function Register() {
    const [isLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            role: "CUSTOMER",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await register(data);
            if (response?.data?.redirect) {
                toast.success(
                    "Registration successful! Please check your email for the verification code."
                );
                navigate(response.data.redirect);
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details below to create your account
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                            name="firstName"
                            label="First Name"
                            placeholder="John"
                            disabled={isLoading}
                        />
                        <CustomInput
                            name="lastName"
                            label="Last Name"
                            placeholder="Doe"
                            disabled={isLoading}
                        />
                    </div>

                    <CustomInput
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="john@example.com"
                        disabled={isLoading}
                    />

                    <CustomInput
                        name="phoneNumber"
                        label="Phone Number"
                        type="tel"
                        placeholder="+250 7XX XXX XXX"
                        disabled={isLoading}
                    />

                    <PasswordInput
                        name="password"
                        label="Password"
                        placeholder="••••••••"
                        disabled={isLoading}
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            "Create account"
                        )}
                    </Button>
                </form>
            </Form>

            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/auth/login" className="text-primary hover:underline">
                    Login
                </Link>
            </div>
        </div>
    );
}
