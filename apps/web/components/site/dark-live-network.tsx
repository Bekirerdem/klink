"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PulseDot } from "@/components/ui/pulse-dot";

interface DarkTx {
  id: string;
  ts: string;
  masa: string;
  amount: number;
  tip: number;
}

const seed: Omit<DarkTx, "id" | "ts">[] = [
  { masa: "Masa 4 · Kafe Boğaz", amount: 161, tip: 21 },
  { masa: "Masa 7 · Bar Asit", amount: 380, tip: 56 },
  { masa: "Masa 2 · Kafe Boğaz", amount: 240, tip: 36 },
  { masa: "Masa 5 · Pub Salt", amount: 95, tip: 12 },
  { masa: "Masa 1 · Demirhan", amount: 480, tip: 72 },
];

const ease = [0.16, 1, 0.3, 1] as const;

function clockNow() {
  return new Date().toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function DarkLiveNetwork() {
  const [feed, setFeed] = useState<DarkTx[]>([]);
  const [tps, setTps] = useState(407);
  const [blockMs, setBlockMs] = useState(4);

  useEffect(() => {
    setFeed(
      seed.slice(0, 4).map((tx, i) => ({
        ...tx,
        id: `seed-${i}`,
        ts: clockNow(),
      })),
    );

    let counter = 0;
    const tickFeed = setInterval(() => {
      counter += 1;
      const next = seed[counter % seed.length];
      setFeed((prev) =>
        [
          { ...next, id: `live-${counter}`, ts: clockNow() },
          ...prev,
        ].slice(0, 5),
      );
    }, 3200);

    const tickStats = setInterval(() => {
      setTps(380 + Math.floor(Math.random() * 50));
      setBlockMs(3 + Math.floor(Math.random() * 3));
    }, 1500);

    return () => {
      clearInterval(tickFeed);
      clearInterval(tickStats);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* Top stat strip */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-6 py-5 md:grid-cols-5 md:gap-y-0">
          <Stat label="BLOCK TIME" value={`${blockMs}`} unit="ms" sparkline />
          <Stat label="TPS" value={`${tps}`} sparkline />
          <Stat label="MERCHANTS" value="17" />
          <Stat label="VALIDATORS" value="200" />
          <div className="flex items-center justify-end">
            <a
              href="https://testnet.monadexplorer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white"
            >
              VIEW FULL NETWORK <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid items-end gap-12 md:grid-cols-12">
          {/* Left — message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, ease }}
            className="md:col-span-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-3 py-1 backdrop-blur">
              <PulseDot tone="success" size="sm" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-success">
                LIVE NETWORK
              </span>
            </div>

            <h2 className="mt-6 font-display text-[40px] font-bold leading-[0.95] tracking-[-0.025em] text-white md:text-[72px]">
              Watch Klink
              <br />
              execute, <span className="italic text-monad-purple-pale">live.</span>
            </h2>

            <p className="mt-6 max-w-md text-balance text-[15px] leading-relaxed text-white/70">
              Every payment. Every tip. Every loyalty stamp. Monad testnet'te
              ~0.4 saniyede settle, $0.001 gas, paralel EVM execution.
            </p>

            <a
              href="https://testnet.monadexplorer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex h-12 items-center gap-2 rounded-pill bg-monad-purple px-7 text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-monad-button transition-transform hover:scale-[1.04]"
            >
              OPEN VISUALIZER <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>

          {/* Right — node viz card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            className="md:col-span-6"
          >
            <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl">
              <header className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
                  klink.monad.xyz
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-success">
                  <PulseDot tone="success" size="sm" />
                  {blockMs}ms
                </span>
              </header>

              {/* Block execution mini-viz */}
              <div className="relative h-32 overflow-hidden border-b border-white/[0.06] px-5 py-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  PARALLEL EVM EXECUTION
                </span>
                <BlockViz />
              </div>

              {/* Live tx list */}
              <ul className="divide-y divide-white/[0.04]">
                <AnimatePresence initial={false}>
                  {feed.map((tx) => (
                    <motion.li
                      key={tx.id}
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3"
                    >
                      <span className="font-mono text-[10px] tabular-nums text-white/50">
                        {tx.ts}
                      </span>
                      <span className="truncate text-[12.5px] font-semibold text-white">
                        {tx.masa}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[12px] font-semibold tabular-nums text-monad-purple-pale">
                          +{tx.amount}₺
                        </span>
                        <span className="rounded-full bg-success/15 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-success">
                          +{tx.tip}₺ tip
                        </span>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              <footer className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3 text-[9px] uppercase tracking-[0.14em] text-white/40">
                <span>OPTIMAL · ~$0.001 / tx</span>
                <span className="font-mono">10,000 TPS · 100% EVM</span>
              </footer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  unit,
  sparkline,
}: {
  label: string;
  value: string;
  unit?: string;
  sparkline?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">
        {label}
      </p>
      <p className="font-mono text-2xl font-bold leading-none tabular-nums text-white">
        {value}
        {unit && <span className="ml-1 text-[12px] font-medium text-white/60">{unit}</span>}
      </p>
      {sparkline && (
        <svg viewBox="0 0 100 14" className="h-3 w-24" aria-hidden>
          <polyline
            points="0,10 10,7 20,9 30,5 40,8 50,6 60,9 70,4 80,7 90,9 100,6"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}

/**
 * Mini parallel EVM execution viz — animated horizontal bars filling
 * left-to-right with staggered delays. Pure CSS animation.
 */
function BlockViz() {
  return (
    <div className="mt-3 space-y-1.5">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: 2.4,
            delay: i * 0.2,
            repeat: Infinity,
            ease: [0.16, 1, 0.3, 1],
            times: [0, 0.4, 0.7, 1],
          }}
          style={{ originX: 0 }}
          className="h-1.5 rounded-full bg-gradient-to-r from-monad-purple via-monad-purple-soft to-transparent"
        />
      ))}
    </div>
  );
}
