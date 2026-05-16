"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, QrCode, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PulseDot } from "@/components/ui/pulse-dot";

/* ─────────────────────────────────────────────────────────
 * HERO STORYBOARD
 *
 *    0ms   layout reserved, K mark spinning skeleton
 *  120ms   eyebrow chip slides down
 *  280ms   title line 1 (stiff spring slide-up)
 *  420ms   title line 2 (italic, gradient text)
 *  600ms   subtitle fade
 *  780ms   dual CTA stagger (relaxed)
 *  950ms   trust signal row + floating brand words activate
 * ───────────────────────────────────────────────────────── */
const TIMING = {
  eyebrow: 120,
  titleA: 280,
  titleB: 420,
  subtitle: 600,
  ctas: 780,
  trust: 950,
} as const;

const SPRING_STIFF = { type: "spring" as const, stiffness: 350, damping: 28 };
const SPRING_BOUNCY = { type: "spring" as const, stiffness: 280, damping: 26 };
const SPRING_SMOOTH = { type: "spring" as const, stiffness: 300, damping: 30 };

const BRAND_WORDS = [
  { text: "kafe", left: "8%", top: "22%", delay: 0 },
  { text: "bar", left: "84%", top: "16%", delay: 0.4 },
  { text: "restoran", left: "76%", top: "68%", delay: 0.8 },
  { text: "bahşiş", left: "12%", top: "72%", delay: 1.2 },
  { text: "sadakat", left: "62%", top: "82%", delay: 1.6 },
  { text: "ödeme", left: "22%", top: "44%", delay: 2.0 },
  { text: "QR", left: "88%", top: "44%", delay: 2.4 },
] as const;

export function Hero() {
  const [stage, setStage] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Mouse parallax — background layers track cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useSpring(useTransform(mouseX, [-1, 1], [-22, 22]), {
    stiffness: 80,
    damping: 24,
  });
  const bgY = useSpring(useTransform(mouseY, [-1, 1], [-18, 18]), {
    stiffness: 80,
    damping: 24,
  });
  const markX = useSpring(useTransform(mouseX, [-1, 1], [-12, 12]), {
    stiffness: 100,
    damping: 22,
  });
  const markY = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), {
    stiffness: 100,
    damping: 22,
  });

  useEffect(() => {
    if (prefersReduced) {
      setStage(6);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setStage(1), TIMING.eyebrow));
    timers.push(setTimeout(() => setStage(2), TIMING.titleA));
    timers.push(setTimeout(() => setStage(3), TIMING.titleB));
    timers.push(setTimeout(() => setStage(4), TIMING.subtitle));
    timers.push(setTimeout(() => setStage(5), TIMING.ctas));
    timers.push(setTimeout(() => setStage(6), TIMING.trust));
    return () => timers.forEach(clearTimeout);
  }, [prefersReduced]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return (
    <section
      id="hikaye"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative isolate overflow-hidden"
    >
      {/* Layer 1 — radial purple glow (parallax) */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="pointer-events-none absolute inset-0 -z-30"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60vw 50vw at 50% 18%, rgba(110,84,255,0.16), transparent 65%), radial-gradient(40vw 30vw at 18% 78%, rgba(131,110,249,0.10), transparent 60%), radial-gradient(35vw 28vw at 86% 80%, rgba(110,84,255,0.10), transparent 60%)",
          }}
        />
      </motion.div>

      {/* Layer 2 — dot grid with mask (parallax half-speed) */}
      <motion.div
        style={{ x: useTransform(bgX, (v) => v * 0.5), y: useTransform(bgY, (v) => v * 0.5) }}
        className="pointer-events-none absolute inset-0 -z-20"
      >
        <div
          className="absolute inset-0 dot-grid opacity-60"
          style={{
            maskImage:
              "radial-gradient(circle at 50% 35%, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 35%, black 30%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* Layer 3 — floating brand words (consumer flavor) */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        {BRAND_WORDS.map((w) => (
          <motion.span
            key={w.text}
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={
              stage >= 6 && !prefersReduced
                ? {
                    opacity: [0, 0.32, 0.32, 0],
                    scale: [0.85, 1, 1, 0.92],
                    y: [12, 0, 0, -6],
                  }
                : { opacity: 0, scale: 0.85 }
            }
            transition={{
              delay: w.delay,
              duration: 5.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 4,
            }}
            style={{ left: w.left, top: w.top }}
            className="absolute font-display text-[42px] font-black italic tracking-[-0.03em] text-monad-purple/[0.14] md:text-[64px]"
          >
            {w.text}
          </motion.span>
        ))}
      </div>

      {/* Layer 4 — giant watermark "K" (parallax 0.6x) */}
      <motion.div
        aria-hidden
        style={{ x: useTransform(bgX, (v) => v * 0.3), y: useTransform(bgY, (v) => v * 0.3) }}
        className="pointer-events-none absolute inset-0 -z-10 flex select-none items-center justify-center"
      >
        <span className="font-display text-[44vw] font-black leading-none tracking-[-0.05em] text-monad-purple/[0.035] md:text-[34vw]">
          K
        </span>
      </motion.div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-28 pt-20 md:grid-cols-[1.4fr_1fr] md:gap-16 md:pb-36 md:pt-32">
        {/* Left column — text */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: stage >= 1 ? 1 : 0,
              y: stage >= 1 ? 0 : -10,
            }}
            transition={SPRING_STIFF}
            className="flex items-center gap-2"
          >
            <PulseDot tone="purple" />
            <Eyebrow>/ MONAD BLITZ ÇANAKKALE · 16 MAYIS 2026</Eyebrow>
          </motion.div>

          <h1 className="mt-7 font-display text-[44px] font-bold leading-[1.02] tracking-[-0.028em] text-ink md:text-[88px]">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: stage >= 2 ? 1 : 0,
                y: stage >= 2 ? 0 : 24,
              }}
              transition={SPRING_STIFF}
              className="block"
            >
              Türk F&B'sinin
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 28 }}
              animate={{
                opacity: stage >= 3 ? 1 : 0,
                y: stage >= 3 ? 0 : 28,
              }}
              transition={SPRING_BOUNCY}
              className="block italic"
              style={{
                backgroundImage:
                  "linear-gradient(96deg, #6e54ff 0%, #836ef9 35%, #4f47eb 70%, #6e54ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% 100%",
              }}
            >
              <motion.span
                animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                style={{
                  backgroundImage: "inherit",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  backgroundSize: "inherit",
                }}
              >
                yeni POS'u.
              </motion.span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: stage >= 4 ? 1 : 0,
              y: stage >= 4 ? 0 : 16,
            }}
            transition={SPRING_SMOOTH}
            className="mt-7 max-w-xl text-balance text-[17px] leading-relaxed text-ink-soft/90 md:text-xl"
          >
            Kafe, bar, restoran için <span className="text-ink font-semibold">cüzdansız QR ödeme</span>.
            Bahşiş garson cüzdanına{" "}
            <span className="text-ink font-semibold">anlık</span>. Sadakat NFT'si
            müşterinin elinde. Monad üzerinde{" "}
            <span className="text-ink font-semibold">komisyonsuz</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: stage >= 5 ? 1 : 0,
              y: stage >= 5 ? 0 : 14,
            }}
            transition={SPRING_STIFF}
            className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <MagneticCTA href="/pay/demo" intensity={0.25}>
              <Button size="lg" className="gap-2.5">
                <QrCode className="h-5 w-5" />
                Müşteri Demo'su
                <ArrowRight className="h-4 w-4" />
              </Button>
            </MagneticCTA>

            <MagneticCTA href="/onboard" intensity={0.18}>
              <Button variant="secondary" size="lg" className="gap-2.5">
                <Store className="h-5 w-5" />
                Mekanım için Klink İste
              </Button>
            </MagneticCTA>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 6 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-ink-link"
          >
            {[
              "On-chain ödeme",
              "~0₺ komisyon",
              "Anlık settle",
              "Müşteri data mekanın",
            ].map((label) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-monad-purple/60" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right column — rotating K mark */}
        <motion.div
          style={{ x: markX, y: markY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING_BOUNCY, delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          <RotatingMark prefersReduced={!!prefersReduced} />
        </motion.div>
      </div>

      {/* Bottom gradient fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" aria-hidden />
    </section>
  );
}

function MagneticCTA({
  href,
  children,
  intensity = 0.25,
}: {
  href: string;
  children: React.ReactNode;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      style={prefersReduced ? undefined : { x: sx, y: sy }}
      onMouseMove={(e) => {
        if (prefersReduced) return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = e.clientX - rect.left - rect.width / 2;
        const dy = e.clientY - rect.top - rect.height / 2;
        x.set(dx * intensity);
        y.set(dy * intensity);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <Link href={href}>{children}</Link>
    </motion.div>
  );
}

function RotatingMark({ prefersReduced }: { prefersReduced: boolean }) {
  return (
    <div className="relative aspect-square w-full max-w-[420px]">
      {/* Outer glow */}
      <motion.div
        animate={
          prefersReduced
            ? undefined
            : { scale: [1, 1.04, 1], opacity: [0.4, 0.6, 0.4] }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(110,84,255,0.18), transparent 65%)",
        }}
        aria-hidden
      />

      {/* Outer ring rotating CCW */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={prefersReduced ? undefined : { rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6e54ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#6e54ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#836ef9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="0.6"
          strokeDasharray="2 3"
        />
        <circle
          cx="100"
          cy="100"
          r="82"
          fill="none"
          stroke="rgba(110,84,255,0.10)"
          strokeWidth="0.4"
        />
      </motion.svg>

      {/* Inner ring rotating CW (faster) */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={prefersReduced ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <circle
          cx="100"
          cy="100"
          r="64"
          fill="none"
          stroke="rgba(110,84,255,0.25)"
          strokeWidth="0.8"
          strokeDasharray="6 4"
        />
      </motion.svg>

      {/* Central K logomark — slow self-rotation */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={prefersReduced ? undefined : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="k-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6e54ff" />
            <stop offset="55%" stopColor="#836ef9" />
            <stop offset="100%" stopColor="#4f47eb" />
          </linearGradient>
        </defs>
        <g transform="translate(100 100)">
          {/* Geometric K — three strokes inscribed in a circle */}
          <g transform="translate(-44 -44)">
            <motion.path
              d="M14 4 L14 84"
              stroke="url(#k-grad)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.34, 1.3, 0.64, 1] }}
            />
            <motion.path
              d="M14 44 L78 4"
              stroke="url(#k-grad)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.34, 1.3, 0.64, 1] }}
            />
            <motion.path
              d="M14 44 L78 84"
              stroke="url(#k-grad)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.34, 1.3, 0.64, 1] }}
            />
          </g>
        </g>
      </motion.svg>

      {/* Orbiting micro tokens */}
      {!prefersReduced && (
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          aria-hidden
        >
          {[0, 120, 240].map((angle) => (
            <div
              key={angle}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `rotate(${angle}deg) translate(0, -46%)`,
              }}
            >
              <div className="grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-white shadow-monad-card">
                <span className="font-mono text-[11px] font-bold text-monad-purple">
                  {angle === 0 ? "₺" : angle === 120 ? "%" : "✓"}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
