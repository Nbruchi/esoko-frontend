import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="mx-auto max-w-md space-y-6 p-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-500">
                    Enter your credentials to access your account
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
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <Button className="w-full">Login</Button>
                <div className="text-center text-sm">
                    <Link
                        to="/auth/forgot-password"
                        className="text-primary hover:underline"
                    >
                        Forgot password?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
