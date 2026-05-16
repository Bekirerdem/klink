import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "dark" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-monad-purple text-white shadow-monad-button hover:scale-[1.02] active:scale-[0.98] hover:shadow-monad-glow",
  secondary:
    "bg-bg-mute text-ink border border-black/[0.07] hover:bg-monad-purple-light/40 hover:border-monad-purple/30 active:scale-[0.98]",
  dark:
    "bg-ink text-white hover:bg-ink-soft active:scale-[0.98]",
  ghost:
    "bg-transparent text-ink hover:bg-bg-mute",
};

const sizeStyles: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px] gap-1.5",
  md: "h-11 px-7 text-[15px] gap-2",
  lg: "h-14 px-9 text-base gap-2",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant = "primary", size = "md", ...props }, ref) {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-pill font-semibold",
          "transition-all duration-150 ease-monad",
          "disabled:opacity-50 disabled:pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-monad-purple focus-visible:ring-offset-2",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);
