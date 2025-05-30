import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return (
        <div className="mx-auto max-w-md space-y-6 p-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Forgot Password</h1>
                <p className="text-gray-500">
                    Enter your email to reset your password
                </p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <Button className="w-full">Reset Password</Button>
                <div className="text-center text-sm">
                    <Link
                        to="/auth/login"
                        className="text-primary hover:underline"
                    >
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
