"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, QrCode, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PulseDot } from "@/components/ui/pulse-dot";

const ease = [0.4, 0, 0.2, 1] as const;

export function Hero() {
  return (
    <section id="hikaye" className="relative isolate overflow-hidden">
      {/* Watermark — büyük translucent "K" arka planda */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex select-none items-center justify-center">
        <span
          aria-hidden
          className="font-display text-[44vw] font-black leading-none tracking-[-0.05em] text-monad-purple/[0.04] md:text-[34vw]"
        >
          K
        </span>
      </div>

      {/* Radial purple glow */}
      <div className="pointer-events-none absolute inset-0 -z-20 radial-purple" />

      {/* Dot grid — alt kısımda fade out */}
      <div
        className="pointer-events-none absolute inset-x-0 top-24 -z-30 h-[80%] dot-grid opacity-60"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 95%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pb-28 pt-20 md:pb-36 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          className="flex items-center gap-2"
        >
          <PulseDot tone="purple" />
          <Eyebrow>/ MONAD BLITZ ÇANAKKALE · 2026</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease }}
          className="mt-7 font-display text-[44px] font-bold leading-[1.02] tracking-[-0.028em] text-ink md:text-[88px]"
        >
          Türk F&B'sinin
          <br />
          <span className="italic text-monad-purple">yeni POS'u.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22, ease }}
          className="mt-7 max-w-xl text-balance text-[17px] leading-relaxed text-ink-soft/90 md:text-xl"
        >
          Kafe, bar, restoran için <span className="text-ink">cüzdansız QR ödeme</span>.
          Bahşiş garson cüzdanına <span className="text-ink">anlık</span>. Sadakat NFT'si
          müşterinin elinde. Monad üzerinde <span className="text-ink">komisyonsuz</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.36, ease }}
          className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        >
          <Link href="/pay/demo" aria-label="Müşteri demo'sunu aç">
            <Button size="lg" className="gap-2.5">
              <QrCode className="h-5 w-5" />
              Müşteri Demo'su
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <Link href="/onboard">
            <Button variant="secondary" size="lg" className="gap-2.5">
              <Store className="h-5 w-5" />
              Mekanım için Klink İste
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-ink-link"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-ink-link" />
            On-chain ödeme
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-ink-link" />
            ~0₺ komisyon
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-ink-link" />
            Anlık settle
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-ink-link" />
            Müşteri data mekanın
          </span>
        </motion.div>
      </div>
    </section>
  );
}
