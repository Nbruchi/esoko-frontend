import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva("btn-3d", {
    variants: {
        variant: {
            default: "btn-3d-default",
            destructive:
                "btn-3d-default bg-destructive text-destructive-foreground",
            outline:
                "border-2 border-input bg-background shadow-[0_4px_0_0_rgba(0,0,0,0.2)] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_rgba(0,0,0,0.2)] active:translate-y-[4px] active:shadow-none dark:border-border dark:shadow-[0_4px_0_0_rgba(255,255,255,0.1)] dark:hover:shadow-[0_2px_0_0_rgba(255,255,255,0.1)]",
            secondary: "btn-3d-default bg-secondary text-secondary-foreground",
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
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
