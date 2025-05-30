import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { AxiosError } from "axios";

interface VerifyEmailResponse {
    success: boolean;
    message: string;
}

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isVerifying, setIsVerifying] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const token = searchParams.get("token");

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                toast.error("Invalid verification link");
                navigate("/auth/login");
                return;
            }

            try {
                const response = await api.post<VerifyEmailResponse>(
                    "/auth/verify-email",
                    { token }
                );
                if (response.data?.success) {
                    setIsVerified(true);
                    toast.success("Email verified successfully");
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    toast.error(
                        error.response?.data?.message ||
                            "Failed to verify email"
                    );
                } else {
                    toast.error("Failed to verify email");
                }
            } finally {
                setIsVerifying(false);
            }
        };

        verifyEmail();
    }, [token, navigate]);

    if (isVerifying) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Email Verification</CardTitle>
                    <CardDescription>
                        {isVerified
                            ? "Your email has been verified successfully"
                            : "We couldn't verify your email"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isVerified ? (
                        <Button
                            className="w-full"
                            onClick={() => navigate("/auth/login")}
                        >
                            Continue to Login
                        </Button>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                The verification link may have expired or is
                                invalid. Please try logging in to request a new
                                verification email.
                            </p>
                            <Button
                                className="w-full"
                                onClick={() => navigate("/auth/login")}
                            >
                                Go to Login
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default VerifyEmail;
