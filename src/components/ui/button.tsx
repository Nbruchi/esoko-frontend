import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-bold transition-3d duration-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground [--shadow-color:var(--primary)] shadow-3d hover:shadow-3d-sm hover:translate-y-1 active:translate-y-2 active:shadow-none active:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground [--shadow-color:var(--destructive)] shadow-3d hover:shadow-3d-sm hover:translate-y-1 active:translate-y-2 active:shadow-none active:bg-destructive/90",
                outline:
                    "border-0 bg-background [--shadow-color:var(--accent)] shadow-3d hover:bg-accent hover:text-accent-foreground hover:shadow-3d-sm hover:translate-y-1 active:translate-y-2 active:shadow-none active:bg-accent/90",
                secondary:
                    "bg-secondary text-secondary-foreground [--shadow-color:var(--secondary)] shadow-3d hover:shadow-3d-sm hover:translate-y-1 active:translate-y-2 active:shadow-none active:bg-secondary/90",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-12 px-6 py-2 text-base",
                sm: "h-10 rounded-md px-4 text-sm",
                lg: "h-14 rounded-md px-8 text-lg",
                icon: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
