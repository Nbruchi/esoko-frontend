import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api-client";
import { CustomInput } from "@/components/common/form/CustomInput";
import { Form } from "@/components/ui/form";
import {
    forgotPasswordSchema,
    type ForgotPasswordFormData,
} from "@/lib/validations/auth";

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        setIsLoading(true);
        try {
            await api.post("/auth/forgot-password", data);
            setIsSubmitted(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="mx-auto max-w-md space-y-6 p-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Check your email</h1>
                    <p className="text-gray-500">
                        We have sent you a password reset link. Please check
                        your email.
                    </p>
                </div>
                <div className="text-center">
                    <Link
                        to="/auth/login"
                        className="text-primary hover:underline"
                    >
                        Back to login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-md space-y-6 p-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Forgot password</h1>
                <p className="text-gray-500">
                    Enter your email address and we'll send you a link to reset
                    your password
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <CustomInput
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="m@example.com"
                        disabled={isLoading}
                    />
                    <Button className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending reset link...
                            </>
                        ) : (
                            "Send reset link"
                        )}
                    </Button>
                    <div className="text-center text-sm">
                        <Link
                            to="/auth/login"
                            className="text-primary hover:underline"
                        >
                            Back to login
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ForgotPassword;
