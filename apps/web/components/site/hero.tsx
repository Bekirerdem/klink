"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/**
 * Editorial hero — Monad app DNA: sol-hizalı büyük italic typography,
 * arkaplanda subtle grid + watermark K + güvenli aralıkta floating mekan
 * tile'ları (8-92% inset, asla viewport kenarına yapışmaz). Minimum motion:
 * mount entrance + tile y-axis float (4-6sn). Continuous rotation YOK.
 */

interface BrandTile {
  name: string;
  emoji: string;
  x: number; // % — 8-92 arası güvenli
  y: number; // % — 18-88 arası güvenli
}

const BRANDS: BrandTile[] = [
  { name: "Kafe Boğaz", emoji: "☕", x: 78, y: 18 },
  { name: "Bar Asit", emoji: "🍸", x: 88, y: 42 },
  { name: "Demirhan", emoji: "🥃", x: 72, y: 70 },
  { name: "Marina Pub", emoji: "🌊", x: 90, y: 88 },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Grid pattern */}
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

      {/* Radial purple wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          backgroundImage:
            "radial-gradient(70vw 50vh at 50% 20%, rgba(110,84,255,0.12), transparent 65%)",
        }}
        aria-hidden
      />

      {/* Watermark K */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 flex select-none items-center justify-center"
        aria-hidden
      >
        <span className="font-display text-[42vw] font-black leading-none tracking-[-0.06em] text-monad-purple/[0.05] md:text-[28vw]">
          K
        </span>
      </div>

      {/* Floating brand tiles — sağ kolonda, viewport kenarına yapışmıyor */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {BRANDS.map((b, i) => (
          <motion.div
            key={b.name}
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 + i * 0.08, ease }}
            style={{
              left: `${b.x}%`,
              top: `${b.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 5 + (i % 3) * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
              className="inline-flex h-11 select-none items-center gap-2 rounded-pill border border-black/[0.06] bg-white/95 px-4 font-display text-[13px] font-semibold tracking-tight text-ink-soft shadow-monad-card backdrop-blur-sm"
            >
              <span className="text-base leading-none">{b.emoji}</span>
              {b.name}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-3 py-1 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-monad-purple" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
            KLINK · İLK DALGA · ÇANAKKALE
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="mt-7 font-display text-[52px] font-bold leading-[0.94] tracking-[-0.035em] text-ink md:text-[112px]"
        >
          Bambaşka.
          <br />
          <span className="italic text-monad-purple">Klink üstüne.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="mt-7 max-w-md text-balance text-[15px] leading-relaxed text-ink-soft/85 md:text-base"
        >
          Türk F&B sektörünün Monad'a ilk dalgası. Cüzdansız ödeme, anlık bahşiş,
          on-chain sadakat — komisyonsuz.
        </motion.p>

        {/* CTAs */}
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
            BAŞLA
          </Link>
          <Link
            href="/m/kafe-bogaz"
            className="inline-flex h-12 items-center gap-1.5 px-2 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-link transition-colors hover:text-monad-purple"
          >
            Mekanları Keşfet →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
