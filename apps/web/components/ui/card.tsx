import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "outline" | "muted";
}

const variantStyles = {
  elevated: "bg-white shadow-monad-card border-black/[0.06]",
  outline: "bg-white border-black/[0.08]",
  muted: "bg-bg-mute border-black/[0.04]",
} as const;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant = "elevated", ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
});
