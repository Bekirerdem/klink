"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";

/* ─────────────────────────────────────────────────────────
 * PROTOCOL CLOUD STORYBOARD
 *
 * Monad'ın "Smart Contracts / Wallets / Security / EVM Addresses"
 * floating word cluster imzasının Klink versiyonu.
 *
 *  scroll-in → eyebrow + payoff başlık
 *  whileInView → her chip 50ms gecikmeli spring scale entrance
 *  ambient → her chip 4-7sn loop y-axis float (±6px)
 *  hover → scale 1.08, color shift, sibling'ler dim
 * ───────────────────────────────────────────────────────── */

interface Chip {
  text: string;
  weight: "lg" | "md" | "sm";
  tone: "purple" | "ink" | "soft";
  delay: number;
  floatDur: number;
}

const CHIPS: Chip[] = [
  { text: "Komisyonsuz", weight: "lg", tone: "purple", delay: 0, floatDur: 5.2 },
  { text: "Bahşiş", weight: "lg", tone: "ink", delay: 0.08, floatDur: 4.6 },
  { text: "Cüzdansız", weight: "md", tone: "soft", delay: 0.15, floatDur: 6.1 },
  { text: "Anlık", weight: "lg", tone: "purple", delay: 0.22, floatDur: 4.8 },
  { text: "Adil", weight: "md", tone: "ink", delay: 0.3, floatDur: 5.5 },
  { text: "Sadakat", weight: "lg", tone: "purple", delay: 0.38, floatDur: 5.9 },
  { text: "On-chain", weight: "md", tone: "soft", delay: 0.45, floatDur: 4.4 },
  { text: "QR", weight: "sm", tone: "purple", delay: 0.5, floatDur: 5.0 },
  { text: "Şeffaf", weight: "md", tone: "ink", delay: 0.58, floatDur: 5.7 },
  { text: "₺ → cüzdan", weight: "sm", tone: "soft", delay: 0.65, floatDur: 6.3 },
  { text: "Email Auth", weight: "md", tone: "purple", delay: 0.72, floatDur: 4.9 },
  { text: "POS Replacement", weight: "lg", tone: "ink", delay: 0.8, floatDur: 5.3 },
  { text: "Live Settle", weight: "md", tone: "soft", delay: 0.86, floatDur: 4.7 },
  { text: "Koalisyon NFT", weight: "md", tone: "purple", delay: 0.92, floatDur: 5.4 },
];

const weightClass = {
  lg: "text-2xl md:text-4xl font-bold tracking-[-0.02em] px-5 py-2.5",
  md: "text-lg md:text-2xl font-semibold tracking-[-0.015em] px-4 py-2",
  sm: "text-sm md:text-base font-medium tracking-tight px-3 py-1.5",
} as const;

const toneClass = {
  purple: "bg-monad-purple text-white shadow-monad-button border-monad-purple",
  ink: "bg-ink text-white border-ink",
  soft: "bg-white text-ink border-black/[0.06] shadow-monad-card",
} as const;

const SPRING_BOUNCY = { type: "spring" as const, stiffness: 280, damping: 26 };

export function ProtocolCloud() {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden border-y border-black/[0.05] bg-bg-mute py-24 md:py-32">
      {/* Background dot grid + soft radial */}
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(50vw 35vw at 50% 50%, rgba(110,84,255,0.08), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow>/ KLINK PROTOKOL</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
            Tek altyapı,{" "}
            <span className="italic text-monad-purple">üç tarafa değer</span>.
          </h2>
          <p className="mt-6 text-balance text-[17px] leading-relaxed text-ink-soft/85 md:text-lg">
            Mekan, müşteri ve çalışan aynı transaction'da kazanıyor. Iyzico'nun
            tek-yönlü pipe'ı değil; çok-yönlü, açık, on-chain.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
          className="mx-auto mt-16 flex max-w-5xl flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {CHIPS.map((chip, idx) => (
            <motion.div
              key={chip.text}
              variants={{
                hidden: { opacity: 0, scale: 0.6, y: 18 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ ...SPRING_BOUNCY, delay: chip.delay }}
              whileHover={prefersReduced ? undefined : { scale: 1.08, y: -4 }}
              className="group"
            >
              <motion.span
                animate={
                  prefersReduced
                    ? undefined
                    : { y: [0, -6, 0] }
                }
                transition={{
                  duration: chip.floatDur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.2,
                }}
                className={`inline-flex select-none cursor-default rounded-pill border font-display transition-all duration-200 group-hover:shadow-monad-glow ${weightClass[chip.weight]} ${toneClass[chip.tone]}`}
              >
                {chip.text}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center text-[13px] font-mono uppercase tracking-[0.16em] text-ink-link"
        >
          Built on <span className="text-monad-purple">Monad</span> · 10,000 TPS · 0.4s block · 100% EVM
        </motion.p>
      </div>
    </section>
  );
}
