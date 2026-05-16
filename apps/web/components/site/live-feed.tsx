"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PulseDot } from "@/components/ui/pulse-dot";

interface Tx {
  id: string;
  ts: string;
  masa: number;
  amount: number;
  tip: number;
  staff: string;
}

const seed: Omit<Tx, "id" | "ts">[] = [
  { masa: 4, amount: 161, tip: 21, staff: "Ali" },
  { masa: 7, amount: 85, tip: 8, staff: "Ayşe" },
  { masa: 2, amount: 240, tip: 36, staff: "Can" },
  { masa: 5, amount: 95, tip: 9, staff: "Ayşe" },
  { masa: 1, amount: 320, tip: 48, staff: "Ali" },
  { masa: 3, amount: 110, tip: 11, staff: "Can" },
  { masa: 6, amount: 175, tip: 18, staff: "Ayşe" },
];

function formatClock(d: Date) {
  return d.toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const ease = [0.4, 0, 0.2, 1] as const;

export function LiveFeed() {
  // SSR'da boş, mount sonrası doldur — hydration mismatch'i önlemek için
  // (Date.now() server vs client farkı yaratıyor).
  const [feed, setFeed] = useState<Tx[]>([]);

  useEffect(() => {
    setFeed(
      seed.slice(0, 4).map((tx, i) => ({
        ...tx,
        id: `seed-${i}`,
        ts: formatClock(new Date(Date.now() - (4 - i) * 17_000)),
      })),
    );

    let counter = 0;
    const interval = setInterval(() => {
      counter += 1;
      const next = seed[counter % seed.length];
      setFeed((prev) =>
        [
          { ...next, id: `live-${counter}`, ts: formatClock(new Date()) },
          ...prev,
        ].slice(0, 5),
      );
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="canli" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 md:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="md:col-span-5 md:pt-6"
        >
          <Eyebrow>/ MEKAN DASHBOARD</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl">
            Her ödeme. Her bahşiş.{" "}
            <span className="italic text-monad-purple">Canlı.</span>
          </h2>
          <p className="mt-6 max-w-md text-balance text-[17px] leading-relaxed text-ink-soft/85">
            Mekan kasada ekranı açar — her masa, her tip, her sadakat müşterisi
            saniye saniye akar. Bekleme, banka kabusu, gizli komisyon yok.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6">
            <Stat label="BU SAAT" value="1.450₺" sub="12 işlem" />
            <Stat label="BU GÜN" value="4.350₺" sub="24 işlem · +18 yeni" />
          </div>
        </motion.div>

        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-monad-card"
          >
            <header className="flex items-center justify-between border-b border-black/[0.05] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <PulseDot />
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-success">
                  CANLI · KAFE BOĞAZ
                </span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-ink-link">
                MONAD TESTNET
              </span>
            </header>

            <ul className="divide-y divide-black/[0.04]">
              <AnimatePresence initial={false}>
                {feed.map((tx) => (
                  <motion.li
                    key={tx.id}
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-6 py-4"
                  >
                    <span className="font-mono text-[12px] tabular-nums text-ink-link">
                      {tx.ts}
                    </span>
                    <div>
                      <p className="text-[14px] font-semibold text-ink">
                        Masa {tx.masa}
                      </p>
                      <p className="text-[12px] text-ink-link">
                        Bahşiş{" "}
                        <span className="text-monad-purple">{tx.staff}</span>{" "}
                        cüzdanına anlık
                      </p>
                    </div>
                    <span className="font-mono text-[14px] font-semibold tabular-nums text-ink">
                      +{tx.amount}₺
                    </span>
                    <span className="rounded-full bg-success/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-success">
                      +{tx.tip}₺ tip
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <footer className="border-t border-black/[0.05] px-6 py-3 text-[11px] uppercase tracking-wider text-ink-link">
              Settled in <span className="font-mono text-success">~0.4s</span>{" "}
              · Komisyon{" "}
              <span className="font-mono">~$0.001</span> / işlem
            </footer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-link">
        {label}
      </p>
      <p className="mt-2 font-mono text-3xl font-bold tabular-nums text-ink">
        {value}
      </p>
      <p className="mt-1 text-[12px] text-ink-link">{sub}</p>
    </div>
  );
}
