import { cn } from "@/lib/utils";

interface PulseDotProps {
  className?: string;
  tone?: "success" | "purple" | "warning";
  size?: "sm" | "md";
}

const tones = {
  success: { core: "bg-success", halo: "bg-success/50" },
  purple: { core: "bg-monad-purple", halo: "bg-monad-purple/50" },
  warning: { core: "bg-warning", halo: "bg-warning/50" },
} as const;

const sizes = {
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
} as const;

export function PulseDot({ className, tone = "success", size = "md" }: PulseDotProps) {
  const palette = tones[tone];
  return (
    <span className={cn("relative inline-flex", sizes[size], className)} aria-hidden>
      <span className={cn("pulse-dot absolute inline-flex h-full w-full rounded-full", palette.halo)} />
      <span className={cn("relative inline-flex h-full w-full rounded-full", palette.core)} />
    </span>
  );
}
