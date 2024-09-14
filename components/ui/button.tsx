import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black border-slate-200 border-2 border-b-[4px] active:border-b-2 hover:bg-slate-100 text-slate-500",
        primary:
          "bg-info/80 text-primary-foreground hover:bg-info-light border-info border-b-4 active:border-b-0",
        primaryOutline: "bg-transparent text-info hover:bg-slate-100",

        secondary:
          "bg-leaf/80 text-primary-foreground hover:bg-leaf-light border-leaf border-b-4 active:border-b-0",
        secondaryOutline:
          "bg-transparent text-leaf hover:text-leaf-light hover:bg-slate-100",

        mars: "bg-fire/80 text-primary-foreground hover:bg-fire-light border-fire border-b-4 active:border-b-0",
        marsOutline: "bg-transparent text-fire hover:bg-slate-100",

        gem: "bg-gem/80 text-primary-foreground hover:bg-gem-light border-gem border-b-4 active:border-b-0",
        gemOutline: "bg-transparent text-gem hover:bg-slate-100",

        ghost:
          "bg-transparent text-slate-500 border-transparent border-0 hover:bg-slate-100",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
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

export { Button, buttonVariants };
