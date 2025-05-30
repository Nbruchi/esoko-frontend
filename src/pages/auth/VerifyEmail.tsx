import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/queries/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { CustomInput } from "@/components/common/form/CustomInput";

export default function VerifyEmail() {
    const [otp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const navigate = useNavigate();
    const { verifyEmail, resendOtp } = useAuth();

    useEffect(() => {
        if (!email) {
            toast.error("No email provided for verification");
            navigate("/auth/login");
        }
    }, [email, navigate]);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        try {
            setIsLoading(true);
            const response = await verifyEmail({ email, otp });
            if (response?.success) {
                toast.success("Email verified successfully!");
                navigate("/auth/login");
            }
        } catch (error) {
            console.error("Verification error:", error);
            toast.error("Verification failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (!email) return;

        try {
            setIsResending(true);
            const response = await resendOtp({ email });
            if (response?.success) {
                toast.success("New verification code sent to your email!");
            }
        } catch (error) {
            console.error("Resend error:", error);
            toast.error(
                "Failed to resend verification code. Please try again."
            );
        } finally {
            setIsResending(false);
        }
    };

    if (!email) {
        return null;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Verify your email
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        We sent a verification code to {email}
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleVerify}>
                    <div className="space-y-4 rounded-md shadow-sm">
                        <CustomInput
                            name="verificationCode"
                            label="Verification code"
                            type="text"
                            autoComplete="one-time-code"
                            placeholder="Enter the verification code"
                        />
                    </div>

                    <div className="space-y-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                "Verify Email"
                            )}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleResendOtp}
                            disabled={isResending}
                        >
                            {isResending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Resending...
                                </>
                            ) : (
                                "Resend Code"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
