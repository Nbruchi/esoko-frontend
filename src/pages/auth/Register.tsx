import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { CustomInput } from "@/components/common/form/CustomInput";
import { PasswordInput } from "@/components/common/form/PasswordInput";
import { toast } from "sonner";

const registerSchema = z
    .object({
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ),
        confirmPassword: z.string(),
        firstName: z
            .string()
            .min(2, "First name must be at least 2 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters"),
        phoneNumber: z
            .string()
            .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
            .optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register = () => {
    const navigate = useNavigate();
    const { register: registerUser } = useAuth();

    const methods = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data);
            navigate("/auth/verify-email");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Registration failed");
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-primary hover:text-primary/80"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                {methods.formState.errors.root && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            {methods.formState.errors.root.message}
                        </AlertDescription>
                    </Alert>
                )}

                <FormProvider {...methods}>
                    <form
                        className="mt-8 space-y-6"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4 rounded-md shadow-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <CustomInput
                                    name="firstName"
                                    label="First name"
                                    type="text"
                                    autoComplete="given-name"
                                    placeholder="Enter your first name"
                                />

                                <CustomInput
                                    name="lastName"
                                    label="Last name"
                                    type="text"
                                    autoComplete="family-name"
                                    placeholder="Enter your last name"
                                />
                            </div>

                            <CustomInput
                                name="email"
                                label="Email address"
                                type="email"
                                autoComplete="email"
                                placeholder="Enter your email"
                            />

                            <CustomInput
                                name="phoneNumber"
                                label="Phone number (optional)"
                                type="tel"
                                autoComplete="tel"
                                placeholder="Enter your phone number"
                            />

                            <PasswordInput
                                name="password"
                                label="Password"
                                autoComplete="new-password"
                                placeholder="Create a password"
                            />

                            <PasswordInput
                                name="confirmPassword"
                                label="Confirm password"
                                autoComplete="new-password"
                                placeholder="Confirm your password"
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={methods.formState.isSubmitting}
                        >
                            {methods.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Create account"
                            )}
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};
