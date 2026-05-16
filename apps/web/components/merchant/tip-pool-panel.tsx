"use client";

import { motion } from "framer-motion";
import { Coins, Lock } from "lucide-react";
import type { DemoMerchant } from "@/lib/demo-merchant";
import { Eyebrow } from "@/components/ui/eyebrow";

const ease = [0.4, 0, 0.2, 1] as const;

export function TipPoolPanel({ merchant }: { merchant: DemoMerchant }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, ease }}
      className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-monad-card md:p-7"
    >
      <header className="flex items-start justify-between">
        <div>
          <Eyebrow>/ BAHŞİŞ HAVUZU</Eyebrow>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
            Bugün {merchant.todayTipPool}₺
          </h2>
          <p className="mt-1 text-[13px] text-ink-link">
            Dağıtım kuralı:{" "}
            <span className="font-mono text-monad-purple">
              {merchant.distributionRule === "EQUAL" ? "EŞİT" : "AĞIRLIKLI"}
            </span>{" "}
            · on-chain · değiştirilemiyor
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-success">
          <Lock className="h-3 w-3" /> On-chain
        </span>
      </header>

      <ol className="mt-6 divide-y divide-black/[0.05]">
        {merchant.staff.map((s, idx) => {
          const pct = (s.todayTip / merchant.todayTipPool) * 100;
          return (
            <motion.li
              key={s.name}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + idx * 0.05, ease }}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3.5"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-monad-purple-light font-display text-[15px] font-bold text-monad-purple">
                {s.name[0]}
              </span>
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                  {s.name}
                  <span className="text-[11px] font-normal uppercase tracking-wider text-ink-link">
                    {s.role}
                  </span>
                </p>
                <p className="mt-0.5 font-mono text-[11px] text-ink-link">
                  {s.walletShort}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-bg-mute">
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 + idx * 0.1, ease }}
                    className="block h-full bg-monad-purple"
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg font-bold tabular-nums text-ink">
                  +{s.todayTip}₺
                </p>
                <p className="text-[11px] text-ink-link">
                  hafta {s.weekTip}₺
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>

      <footer className="mt-4 flex items-center gap-1.5 border-t border-black/[0.05] pt-3 text-[11px] text-ink-link">
        <Coins className="h-3.5 w-3.5 text-monad-purple" />
        Her ödemeyle havuza damlar, dağıtım smart contract içinden — patron
        manipülasyon yok.
      </footer>
    </motion.section>
  );
}
