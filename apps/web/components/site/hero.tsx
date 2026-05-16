"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Editorial hero — Monad app DNA: sol-hizalı büyük italic typography,
 * arkaplanda subtle checkered + dot grid + watermark K, ortalama bir grid
 * üzerine yerleşmiş floating mekan tile'ları. Minimum motion: sade entrance
 * + arkadaki tile'ların 4-6sn aralıklı hafif y-axis float. Continuous
 * SVG rotation YOK — scroll lag yaratmasın.
 */

interface BrandTile {
  name: string;
  emoji: string;
  col: number; // 0-6
  row: number; // 0-4
}

const BRANDS: BrandTile[] = [
  { name: "Kafe Boğaz", emoji: "☕", col: 0, row: 0 },
  { name: "Bar Asit", emoji: "🍸", col: 5, row: 0 },
  { name: "Demirhan", emoji: "🥃", col: 6, row: 1 },
  { name: "Bistro Mart", emoji: "🍽", col: 0, row: 2 },
  { name: "Marina Pub", emoji: "🌊", col: 6, row: 3 },
  { name: "Cafe 18.5", emoji: "☕", col: 5, row: 4 },
  { name: "Sahil Kahve", emoji: "🍵", col: 0, row: 4 },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Layer 1 — subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(0,0,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
        aria-hidden
      />

      {/* Layer 2 — soft radial purple wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(70vw 50vh at 50% 20%, rgba(110,84,255,0.12), transparent 65%)",
        }}
        aria-hidden
      />

      {/* Layer 3 — giant watermark K */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex select-none items-center justify-center"
        aria-hidden
      >
        <span className="font-display text-[42vw] font-black leading-none tracking-[-0.06em] text-monad-purple/[0.05] md:text-[28vw]">
          K
        </span>
      </div>

      {/* Layer 4 — floating brand tiles (positioned to NOT overlap text on left) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {BRANDS.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 + i * 0.07, ease }}
            style={{
              left: `${(b.col / 6) * 100}%`,
              top: `${15 + (b.row / 4) * 70}%`,
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4.5 + (i % 3) * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
              className="inline-flex h-11 select-none items-center gap-2 rounded-pill border border-black/[0.06] bg-white/90 px-4 font-display text-[13px] font-semibold tracking-tight text-ink-soft shadow-monad-card backdrop-blur-sm"
            >
              <span className="text-base leading-none">{b.emoji}</span>
              {b.name}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-3 py-1 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-monad-purple" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
            KLINK · FIRST WAVE · ÇANAKKALE
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-7 font-display text-[56px] font-bold leading-[0.92] tracking-[-0.035em] text-ink md:text-[120px]"
        >
          Built different.
          <br />
          <span className="italic text-monad-purple">Built on Klink.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="mt-7 max-w-md text-balance text-[15px] leading-relaxed text-ink-soft/85 md:text-base"
        >
          The first wave of F&B mainstream payments launching on Monad. Cüzdansız, komisyonsuz, anlık.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4, ease }}
          className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href="/pay/demo"
            className="inline-flex h-12 items-center justify-center rounded-pill bg-ink px-7 text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-monad-button transition-transform hover:scale-[1.04]"
          >
            GET STARTED
          </Link>
          <Link
            href="/m/kafe-bogaz"
            className="inline-flex h-12 items-center gap-1.5 px-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-link transition-colors hover:text-monad-purple"
          >
            Explore Mekanlar →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
