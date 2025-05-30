import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { CustomInput } from "@/components/common/form/CustomInput";
import { PasswordInput } from "@/components/common/form/PasswordInput";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const methods = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            setError("");
            await login(data);
            const from =
                (location.state as { from?: { pathname: string } })?.from
                    ?.pathname || "/";
            navigate(from, { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <Link
                            to="/register"
                            className="font-medium text-primary hover:text-primary/80"
                        >
                            create a new account
                        </Link>
                    </p>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <FormProvider {...methods}>
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4 rounded-md shadow-sm">
                            <CustomInput
                                name="email"
                                label="Email address"
                                type="email"
                                autoComplete="email"
                                placeholder="Enter your email"
                            />

                            <PasswordInput
                                name="password"
                                label="Password"
                                autoComplete="current-password"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Checkbox
                                    id="rememberMe"
                                    {...methods.register("rememberMe")}
                                />
                                <label
                                    htmlFor="rememberMe"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link
                                    to="/forgot-password"
                                    className="font-medium text-primary hover:text-primary/80"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={
                                isLoading ||
                                Object.keys(methods.formState.errors).length > 0
                            }
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};
