import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:translate-y-[2px] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.2)] active:translate-y-[4px] active:shadow-[0_2px_0_0_rgba(0,0,0,0.2)] dark:shadow-[0_4px_0_0_rgba(255,255,255,0.1)] dark:hover:shadow-[0_6px_0_0_rgba(255,255,255,0.1)]",
                destructive:
                    "bg-destructive text-destructive-foreground shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:translate-y-[2px] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.2)] active:translate-y-[4px] active:shadow-[0_2px_0_0_rgba(0,0,0,0.2)] dark:shadow-[0_4px_0_0_rgba(255,255,255,0.1)] dark:hover:shadow-[0_6px_0_0_rgba(255,255,255,0.1)]",
                outline:
                    "border-2 border-input bg-background shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:translate-y-[2px] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.2)] active:translate-y-[4px] active:shadow-[0_2px_0_0_rgba(0,0,0,0.2)] dark:shadow-[0_4px_0_0_rgba(255,255,255,0.1)] dark:hover:shadow-[0_6px_0_0_rgba(255,255,255,0.1)]",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:translate-y-[2px] hover:shadow-[0_6px_0_0_rgba(0,0,0,0.2)] active:translate-y-[4px] active:shadow-[0_2px_0_0_rgba(0,0,0,0.2)] dark:shadow-[0_4px_0_0_rgba(255,255,255,0.1)] dark:hover:shadow-[0_6px_0_0_rgba(255,255,255,0.1)]",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/20",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-12 px-6 py-3",
                sm: "h-9 px-4 py-2",
                lg: "h-14 px-8 py-4 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
