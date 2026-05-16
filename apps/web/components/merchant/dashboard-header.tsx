"use client";

import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { PulseDot } from "@/components/ui/pulse-dot";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { DemoMerchant } from "@/lib/demo-merchant";

const ease = [0.4, 0, 0.2, 1] as const;

export function DashboardHeader({ merchant }: { merchant: DemoMerchant }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="border-b border-black/[0.06] bg-white/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-monad-purple text-white shadow-monad-button">
              <span className="font-display text-[15px] font-bold">
                {merchant.name[0]}
              </span>
            </span>
            <div>
              <Eyebrow tone="muted">MEKAN DASHBOARD</Eyebrow>
              <h1 className="mt-0.5 font-display text-2xl font-bold tracking-tight text-ink">
                {merchant.name}
              </h1>
              <p className="text-[13px] text-ink-link">
                {merchant.district} · {merchant.cuisineKind}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1.5">
            <PulseDot size="sm" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-success">
              CANLI
            </span>
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3 py-1.5 font-mono text-[12px] text-ink-soft">
            {merchant.walletShort}
            <ExternalLink className="h-3 w-3 text-ink-link" />
          </span>

          <Link
            href="/"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-bg-mute px-3 text-[12px] font-medium text-ink-link transition-colors hover:bg-monad-purple-light/40 hover:text-monad-purple"
          >
            <LogOut className="h-3.5 w-3.5" />
            Çıkış
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
