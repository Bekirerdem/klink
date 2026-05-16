"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DemoMerchant, RecentTx } from "@/lib/demo-merchant";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PulseDot } from "@/components/ui/pulse-dot";

const ease = [0.4, 0, 0.2, 1] as const;

function clockNow() {
  return new Date().toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function RecentTxPanel({ merchant }: { merchant: DemoMerchant }) {
  // SSR'da sabit seed verisi, mount sonrası interval ile büyüt.
  // Math.random() / Date.now() initializer'da olunca hydration patlıyor.
  const [feed, setFeed] = useState<RecentTx[]>(merchant.recentTx);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      counter += 1;
      const sample = merchant.recentTx[counter % merchant.recentTx.length];
      setFeed((prev) =>
        [
          {
            ...sample,
            id: `live-${counter}-${Math.random().toString(36).slice(2, 7)}`,
            ts: clockNow(),
          },
          ...prev,
        ].slice(0, 6),
      );
    }, 4200);
    return () => clearInterval(interval);
  }, [merchant.recentTx]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, ease }}
      className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-monad-card"
    >
      <header className="flex items-center justify-between border-b border-black/[0.05] px-6 py-4">
        <div className="flex items-center gap-3">
          <PulseDot />
          <div>
            <Eyebrow>/ CANLI AKIŞ</Eyebrow>
            <p className="mt-0.5 text-[13px] text-ink-link">
              Her ödeme, on-chain settle anında burada.
            </p>
          </div>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-link">
          MONAD · CHAIN 10143
        </span>
      </header>

      <ul className="divide-y divide-black/[0.04]">
        <AnimatePresence initial={false}>
          {feed.map((tx) => (
            <motion.li
              key={tx.id}
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease }}
              className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-6 py-3.5"
            >
              <span className="font-mono text-[12px] tabular-nums text-ink-link">
                {tx.ts}
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-ink">{tx.masa}</p>
                <p className="truncate font-mono text-[11px] text-ink-link">
                  müşteri {tx.customer} → {tx.staff}
                </p>
              </div>
              <span className="font-mono text-[14px] font-semibold tabular-nums text-ink">
                +{tx.bill}₺
              </span>
              <span className="rounded-full bg-success/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-success">
                +{tx.tip}₺ tip
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <footer className="border-t border-black/[0.05] px-6 py-3 text-[11px] uppercase tracking-wider text-ink-link">
        Settled in <span className="font-mono text-success">~0.4s</span> ·
        Komisyon <span className="font-mono">~$0.001</span> · Gas{" "}
        <span className="font-mono">MON</span>
      </footer>
    </motion.section>
  );
}
