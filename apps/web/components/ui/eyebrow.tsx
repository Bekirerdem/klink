import { cn } from "@/lib/utils";

interface EyebrowProps {
  className?: string;
  children: React.ReactNode;
  tone?: "purple" | "muted";
}

export function Eyebrow({ className, children, tone = "purple" }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-block text-[11px] font-semibold uppercase tracking-[0.14em]",
        tone === "purple" ? "text-monad-purple" : "text-ink-link",
        className,
      )}
    >
      {children}
    </span>
  );
}
