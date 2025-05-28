// frontend/src/components/common/inputs/password-input.tsx
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = () => {
    const form = useFormContext();
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => setShowPassword((prev) => !prev);

    return (
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <div className="relative">
                            <Input
                                placeholder="Enter your password"
                                type={showPassword ? "text" : "password"}
                                {...field}
                                className="pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PasswordInput;
