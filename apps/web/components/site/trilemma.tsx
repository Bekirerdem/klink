"use client";

import { useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";
import { useRef } from "react";

interface Facet {
  id: "mekan" | "musteri" | "calisan";
  role: string;
  win: string;
  detail: string;
  cx: number;
  cy: number;
  startAngle: number;
}

const FACETS: Facet[] = [
  {
    id: "mekan",
    role: "MEKAN",
    win: "Komisyonsuz",
    detail:
      "Iyzico %2.5-3 yerine ~$0.001 gas. Anlık settle. Müşteri data senin elinde.",
    cx: 50,
    cy: 24,
    startAngle: -90,
  },
  {
    id: "musteri",
    role: "MÜŞTERİ",
    win: "Cüzdansız",
    detail:
      "Email ile bağlan. Split, bahşiş, sadakat tek tap. Cüzdan kurmak korkutmuyor.",
    cx: 22,
    cy: 76,
    startAngle: 150,
  },
  {
    id: "calisan",
    role: "ÇALIŞAN",
    win: "Anlık & Adil",
    detail:
      "On-chain havuz. Patron manipüle edemez. Bahşiş cüzdanına saniyede.",
    cx: 78,
    cy: 76,
    startAngle: 30,
  },
];

const ease = [0.4, 0, 0.2, 1] as const;
const SPRING_BOUNCY = { type: "spring" as const, stiffness: 280, damping: 26 };

export function Trilemma() {
  const [active, setActive] = useState<Facet["id"] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const rotateBackground = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section className="relative scroll-mt-24 overflow-hidden py-24 md:py-32" ref={containerRef}>
      {/* Background SVG grid that rotates with scroll */}
      <motion.div
        style={{ rotate: prefersReduced ? 0 : rotateBackground }}
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30"
        aria-hidden
      >
        <svg viewBox="0 0 800 800" className="h-[140%] w-[140%]">
          <defs>
            <pattern id="trigrid" width="48" height="48" patternUnits="userSpaceOnUse">
              <circle cx="24" cy="24" r="1" fill="rgba(110,84,255,0.18)" />
            </pattern>
            <radialGradient id="tribg" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6e54ff" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#6e54ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="800" height="800" fill="url(#trigrid)" />
          <circle cx="400" cy="400" r="320" fill="url(#tribg)" />
        </svg>
      </motion.div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease }}
          >
            <Eyebrow>/ KLINK TRILEMMA</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
              Mevcut POS bir tarafı yıkmadan diğerini kazandıramaz.
            </h2>
            <p className="mt-6 max-w-md text-balance text-[17px] leading-relaxed text-ink-soft/85">
              Iyzico/Param mekan-müşteri arasında, garson dışarıda, sadakat
              fiziksel kart. Klink üç tarafı aynı transaction'a oturtur — biri
              kazanırken diğeri kaybetmez.
            </p>

            <div className="mt-10 flex items-center gap-3 rounded-2xl border border-monad-purple/15 bg-monad-purple-light/40 px-4 py-3 text-[13px] text-ink-soft">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-monad-purple text-[11px] font-bold text-white">
                i
              </span>
              <span>
                Üzerine gelmek için daireleri{" "}
                <span className="font-semibold text-ink">hover'la</span>.
              </span>
            </div>
          </motion.div>

          <div className="relative aspect-square w-full">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <radialGradient id="trilemma-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6e54ff" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#6e54ff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="conn-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6e54ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#6e54ff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Central glow */}
              <circle cx="50" cy="50" r="42" fill="url(#trilemma-glow)" />

              {/* Connecting lines (facet → center) */}
              {FACETS.map((f) => {
                const isActive = active === f.id;
                const isDimmed = active && active !== f.id;
                return (
                  <motion.line
                    key={`line-${f.id}`}
                    x1={f.cx}
                    y1={f.cy}
                    x2={50}
                    y2={50}
                    stroke="url(#conn-grad)"
                    strokeWidth={isActive ? 0.6 : 0.3}
                    strokeOpacity={isDimmed ? 0.12 : isActive ? 0.9 : 0.4}
                    strokeDasharray="1 1.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2, ease }}
                  />
                );
              })}

              {/* Facet circles */}
              {FACETS.map((f, i) => {
                const isActive = active === f.id;
                const isDimmed = active && active !== f.id;
                return (
                  <g key={`circle-${f.id}`}>
                    <motion.circle
                      cx={f.cx}
                      cy={f.cy}
                      r={26}
                      fill="none"
                      stroke="#6e54ff"
                      strokeWidth={isActive ? 0.8 : 0.4}
                      strokeOpacity={isDimmed ? 0.15 : isActive ? 1 : 0.5}
                      strokeDasharray={isActive ? undefined : "1 1.5"}
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      animate={
                        isActive
                          ? {
                              strokeWidth: [0.6, 1.1, 0.6],
                              strokeOpacity: [0.8, 1, 0.8],
                            }
                          : { pathLength: 1, opacity: 1 }
                      }
                      transition={
                        isActive
                          ? {
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                          : {
                              duration: 1.2,
                              delay: 0.1 + i * 0.15,
                              ease,
                            }
                      }
                    />
                    {/* Halo on active */}
                    {isActive && (
                      <motion.circle
                        cx={f.cx}
                        cy={f.cy}
                        r={26}
                        fill="rgba(110,84,255,0.12)"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={SPRING_BOUNCY}
                      />
                    )}
                  </g>
                );
              })}

              {/* Central K logomark */}
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

            {/* Facet cards (overlay) */}
            <div className="absolute inset-0">
              {FACETS.map((f, i) => {
                const isActive = active === f.id;
                const isDimmed = active && active !== f.id;
                return (
                  <motion.button
                    key={f.id}
                    type="button"
                    onMouseEnter={() => setActive(f.id)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(f.id)}
                    onBlur={() => setActive(null)}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease }}
                    animate={{
                      scale: isActive ? 1.06 : 1,
                      opacity: isDimmed ? 0.55 : 1,
                    }}
                    style={{ left: `${f.cx}%`, top: `${f.cy}%` }}
                    className="absolute w-44 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl border bg-white px-4 py-3 text-left shadow-monad-card transition-shadow hover:shadow-monad-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-monad-purple focus-visible:ring-offset-2"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-monad-purple">
                      {f.role}
                    </p>
                    <p className="mt-1 font-display text-[17px] font-bold leading-tight tracking-tight text-ink">
                      {f.win}
                    </p>
                    <motion.p
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                        height: isActive ? "auto" : "auto",
                      }}
                      className="mt-1 text-[11px] leading-snug text-ink-link"
                    >
                      {f.detail}
                    </motion.p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
