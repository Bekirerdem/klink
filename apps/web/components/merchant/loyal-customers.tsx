"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import type { DemoMerchant } from "@/lib/demo-merchant";
import { Eyebrow } from "@/components/ui/eyebrow";

const ease = [0.4, 0, 0.2, 1] as const;

export function LoyalCustomers({ merchant }: { merchant: DemoMerchant }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, ease }}
      className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-monad-card md:p-7"
    >
      <header className="flex items-center justify-between">
        <div>
          <Eyebrow>/ SADIK MÜŞTERİLER</Eyebrow>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
            On-chain profil
          </h2>
          <p className="mt-1 text-[13px] text-ink-link">
            Müşteri data senin cüzdanına bağlı, banka değil.
          </p>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-full bg-monad-purple-light text-monad-purple">
          <Heart className="h-5 w-5" strokeWidth={2.2} />
        </span>
      </header>

      <ol className="mt-6 space-y-2">
        {merchant.loyalCustomers.map((c, idx) => (
          <motion.li
            key={c.walletShort}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + idx * 0.06, ease }}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl border border-black/[0.04] bg-bg-mute px-4 py-3"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white font-mono text-[11px] font-bold text-monad-purple">
              #{idx + 1}
            </span>
            <div className="min-w-0">
              <p className="truncate font-mono text-[13px] text-ink">
                {c.walletShort}
              </p>
              <p className="text-[11px] text-ink-link">
                {c.displayHint} · son {c.lastVisit}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[15px] font-bold tabular-nums text-ink">
                {c.visits}×
              </p>
              <p className="font-mono text-[11px] tabular-nums text-ink-link">
                {c.totalSpent}₺
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}
