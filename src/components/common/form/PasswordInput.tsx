import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    description?: string;
}

export function PasswordInput({
    name,
    label,
    description,
    className,
    placeholder,
    ...props
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = React.useState(false);
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && (
                        <FormLabel className="text-gray-900">{label}</FormLabel>
                    )}
                    <FormControl>
                        <div className="relative">
                            <Input
                                id={name}
                                type={showPassword ? "text" : "password"}
                                autoComplete={props.autoComplete}
                                placeholder={placeholder || label}
                                className={`${className} text-gray-900`}
                                {...field}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <Eye className="h-4 w-4" />
                                ) : (
                                    <EyeOff className="h-4 w-4" />
                                )}
                                <span className="sr-only">
                                    {showPassword
                                        ? "Hide password"
                                        : "Show password"}
                                </span>
                            </Button>
                        </div>
                    </FormControl>
                    {description && (
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
