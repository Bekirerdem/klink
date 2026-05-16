"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/count-up";

interface StatCardProps {
  label: string;
  value: number;
  format?: (v: number) => string;
  sub?: string;
  accent?: "purple" | "neutral";
  delay?: number;
}

const ease = [0.4, 0, 0.2, 1] as const;

export function StatCard({
  label,
  value,
  format = (v) => Math.round(v).toLocaleString("tr-TR"),
  sub,
  accent = "neutral",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay, ease }}
      className={
        accent === "purple"
          ? "relative isolate overflow-hidden rounded-3xl border border-monad-purple/15 bg-monad-purple-light/40 p-6"
          : "rounded-3xl border border-black/[0.06] bg-white p-6 shadow-monad-card"
      }
    >
      {accent === "purple" && (
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-monad-purple/30 opacity-50 blur-3xl"
          aria-hidden
        />
      )}
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-monad-purple">
        {label}
      </p>
      <p className="mt-3 font-mono text-4xl font-bold leading-none tabular-nums text-ink md:text-5xl">
        <CountUp to={value} format={format} />
      </p>
      {sub && <p className="mt-2 text-[13px] text-ink-link">{sub}</p>}
    </motion.div>
  );
}
