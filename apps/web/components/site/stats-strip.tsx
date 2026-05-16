"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/count-up";

interface Stat {
  to: number;
  format: (v: number) => string;
  label: string;
  note?: string;
}

const stats: Stat[] = [
  {
    to: 50,
    format: (v) => `${Math.round(v)}K+`,
    label: "MEKAN",
    note: "F&B Türkiye",
  },
  {
    to: 5,
    format: (v) => `${Math.round(v)}M+`,
    label: "ÇALIŞAN",
    note: "Bahşiş nakit-only",
  },
  {
    to: 3,
    format: (v) => `~${v.toFixed(1).replace(".0", "")}%`,
    label: "KOMİSYON",
    note: "Iyzico/Param POS",
  },
  {
    to: 1,
    format: (v) => `<${Math.round(v)}sn`,
    label: "SETTLE",
    note: "Monad üzerinde",
  },
];

const ease = [0.4, 0, 0.2, 1] as const;

export function StatsStrip() {
  return (
    <section className="relative border-y border-black/[0.06] bg-white">
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-6 py-16 md:grid-cols-4 md:gap-y-0 md:py-24">
        {stats.map((s, idx) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.55, delay: idx * 0.08, ease }}
            className="space-y-3 md:border-r md:border-black/[0.05] md:pr-6 md:last:border-r-0"
          >
            <p className="font-mono text-[52px] font-bold leading-none tracking-tight tabular-nums text-ink md:text-[80px]">
              <CountUp to={s.to} format={s.format} />
            </p>
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-monad-purple">
                {s.label}
              </p>
              {s.note && (
                <p className="text-[13px] text-ink-link">{s.note}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
