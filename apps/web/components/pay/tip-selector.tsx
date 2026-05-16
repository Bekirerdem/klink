"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

export type TipChoice = 0 | 10 | 15 | 20 | "custom";

interface TipSelectorProps {
  value: TipChoice;
  onChange: (v: TipChoice) => void;
  customAmount: string;
  onCustomChange: (v: string) => void;
  staffName: string;
}

const presets: { label: string; value: TipChoice; hint?: string }[] = [
  { label: "Yok", value: 0 },
  { label: "%10", value: 10 },
  { label: "%15", value: 15, hint: "popüler" },
  { label: "%20", value: 20 },
];

export function TipSelector({
  value,
  onChange,
  customAmount,
  onCustomChange,
  staffName,
}: TipSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <Eyebrow tone="muted">BAHŞİŞ</Eyebrow>
        <span className="text-[12px] text-ink-link">
          → <span className="text-monad-purple">{staffName}</span> cüzdanına anlık
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {presets.map((p) => {
          const active = value === p.value;
          return (
            <button
              key={p.label}
              type="button"
              onClick={() => onChange(p.value)}
              className={cn(
                "relative h-14 rounded-2xl border text-[15px] font-semibold transition-all duration-150 ease-monad",
                active
                  ? "border-monad-purple bg-monad-purple text-white shadow-monad-button"
                  : "border-black/[0.06] bg-white text-ink hover:border-monad-purple/40 hover:bg-monad-purple-light/30",
              )}
            >
              {p.label}
              {p.hint && !active && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-monad-purple px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white shadow-sm">
                  {p.hint}
                </span>
              )}
              {active && (
                <motion.span
                  layoutId="tip-active-glow"
                  className="absolute inset-0 -z-10 rounded-2xl bg-monad-purple"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onChange("custom")}
        className={cn(
          "flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left text-[14px] transition-all",
          value === "custom"
            ? "border-monad-purple bg-monad-purple-light/40"
            : "border-black/[0.06] bg-white hover:border-monad-purple/40",
        )}
      >
        <span className={value === "custom" ? "text-monad-purple font-semibold" : "text-ink-soft"}>
          Özel tutar gir
        </span>
        {value === "custom" && (
          <div className="flex items-center gap-1">
            <input
              autoFocus
              type="number"
              inputMode="numeric"
              min="0"
              value={customAmount}
              onChange={(e) => onCustomChange(e.target.value)}
              placeholder="0"
              className="w-20 bg-transparent text-right font-mono text-base font-bold tabular-nums text-ink focus:outline-none"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="font-mono text-base font-bold text-monad-purple">₺</span>
          </div>
        )}
      </button>
    </div>
  );
}
