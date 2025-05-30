import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    description?: string;
}

export function CustomInput({
    name,
    label,
    description,
    className,
    placeholder,
    ...props
}: CustomInputProps) {
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
                        <Input
                            id={name}
                            type={props.type}
                            autoComplete={props.autoComplete}
                            placeholder={placeholder || label}
                            className={`${className} text-gray-900`}
                            {...field}
                        />
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
