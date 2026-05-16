"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";

const facets = [
  {
    role: "MEKAN",
    win: "Komisyonsuz",
    detail:
      "Iyzico %3 yerine ~$0.001 gas. Anlık settle. Müşteri data senin elinde.",
    x: 50,
    y: 16,
  },
  {
    role: "MÜŞTERİ",
    win: "Cüzdansız",
    detail:
      "Email ile bağlan. Split, bahşiş, sadakat tek tap. Cüzdan korkutmuyor.",
    x: 14,
    y: 78,
  },
  {
    role: "ÇALIŞAN",
    win: "Anlık & Adil",
    detail:
      "On-chain havuz. Patron manipüle edemez. Bahşiş cüzdanına saniyede.",
    x: 86,
    y: 78,
  },
];

const ease = [0.4, 0, 0.2, 1] as const;

export function Trilemma() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease }}
          >
            <Eyebrow>/ KLINK TRILEMMA</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
              Mevcut POS bir tarafı yıkmadan diğerini kazandıramaz.
            </h2>
            <p className="mt-6 max-w-md text-balance text-[17px] leading-relaxed text-ink-soft/85">
              Iyzico/Param mekan-müşteri arasında. Garson dışarıda. Sadakat
              fiziksel kart. Klink üç tarafı aynı transaction'a oturtur.
            </p>
          </motion.div>

          <div className="relative">
            <svg
              viewBox="0 0 100 100"
              className="h-[440px] w-full"
              aria-hidden
            >
              <defs>
                <radialGradient id="trilemma-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6e54ff" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#6e54ff" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="42" fill="url(#trilemma-glow)" />

              {facets.map((f, i) => (
                <motion.circle
                  key={f.role}
                  cx={f.x}
                  cy={f.y}
                  r={26}
                  fill="none"
                  stroke="#6e54ff"
                  strokeWidth={0.4}
                  strokeOpacity={0.5}
                  strokeDasharray="1 1.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: 0.1 + i * 0.15,
                    ease,
                  }}
                />
              ))}

              <motion.circle
                cx={50}
                cy={50}
                r={7}
                fill="#6e54ff"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7, ease }}
              />
              <motion.text
                x={50}
                y={50}
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontFamily="Inter, system-ui"
                fontWeight={700}
                fontSize={6}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.95 }}
              >
                K
              </motion.text>
            </svg>

            <div className="absolute inset-0">
              {facets.map((f, i) => (
                <motion.div
                  key={f.role}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease }}
                  className="absolute w-44 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${f.x}%`, top: `${f.y}%` }}
                >
                  <div className="rounded-2xl border border-black/[0.06] bg-white px-4 py-3 shadow-monad-card">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-monad-purple">
                      {f.role}
                    </p>
                    <p className="mt-1 font-display text-[17px] font-bold leading-tight tracking-tight text-ink">
                      {f.win}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-ink-link">
                      {f.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
