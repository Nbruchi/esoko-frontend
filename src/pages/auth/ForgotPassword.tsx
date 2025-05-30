import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { CustomInput } from "@/components/common/form/CustomInput";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
    const { forgotPassword } = useAuth();
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const methods = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            setIsLoading(true);
            setError("");
            await forgotPassword(data.email);
            setIsSubmitted(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to send reset email"
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 text-center">
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-green-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800">
                                    Reset email sent
                                </h3>
                                <div className="mt-2 text-sm text-green-700">
                                    <p>
                                        Please check your email for instructions
                                        to reset your password.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link
                        to="/login"
                        className="text-sm font-medium text-primary hover:text-primary/80"
                    >
                        Return to login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email address and we'll send you a link to
                        reset your password.
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
                        <CustomInput
                            name="email"
                            label="Email address"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                        />

                        <div className="flex flex-col space-y-4">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={
                                    isLoading ||
                                    Object.keys(methods.formState.errors)
                                        .length > 0
                                }
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending reset link...
                                    </>
                                ) : (
                                    "Send reset link"
                                )}
                            </Button>

                            <Link
                                to="/login"
                                className="text-center text-sm font-medium text-primary hover:text-primary/80"
                            >
                                Back to login
                            </Link>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
};
