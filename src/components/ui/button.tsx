import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
// Note: We don't have radix-slot installed, so I'll simplify to standard prop passing for now or install it.
// Actually, I'll stick to a simpler implementation for now to avoid extra deps if not needed, or standard prop types.

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-300",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border-2 border-slate-400 dark:border-slate-700 bg-background hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white text-slate-700 dark:text-slate-300 font-semibold shadow-sm hover:shadow-md transition-all",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
                neon: "bg-background dark:bg-transparent border-2 border-slate-400 dark:border-neon-blue text-slate-700 dark:text-neon-blue font-semibold shadow-sm dark:shadow-[inset_0_0_10px_rgba(77,215,250,0.2)] hover:bg-slate-100 dark:hover:bg-transparent hover:shadow-md dark:hover:shadow-[inset_0_0_20px_rgba(77,215,250,0.6),0_0_20px_rgba(77,215,250,0.4)] hover:border-slate-500 dark:hover:border-neon-blue backdrop-blur-sm transition-all",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
