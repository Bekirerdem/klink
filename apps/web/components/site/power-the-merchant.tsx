"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CARDS = [
  {
    title: "Komisyonsuz Tahsilat",
    desc: "Iyzico/Param %2.5-3 yerine gas-only ücret. Anlık settle, müşteri data senin elinde.",
    accent: "purple",
    cta: "MEKAN OL",
    href: "/onboard",
    badge: "%3 → ~$0.001",
  },
  {
    title: "Sadakat Pasaportu",
    desc: "Müşteri her ödemede cüzdanına NFT mührü alır. Şehir koalisyonu, network etkisi.",
    accent: "ink",
    cta: "PANELE GİT",
    href: "/m/kafe-bogaz",
    badge: "Şehir Koalisyonu",
  },
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

export function PowerTheMerchant() {
  return (
    <section className="relative bg-bg-mute py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left — text + illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, ease }}
            className="md:col-span-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-monad-purple" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                MEKAN
              </span>
            </div>

            <h2 className="mt-6 font-display text-[40px] font-bold leading-[0.95] tracking-[-0.025em] text-ink md:text-[72px]">
              Mekanı<br />
              <span className="italic text-monad-purple">güçlendir.</span>
            </h2>

            <p className="mt-6 max-w-md text-balance text-[15px] leading-relaxed text-ink-soft/85">
              Sadık müşteri profili, komisyonsuz tahsilat, anlık bahşiş havuzu.
              Tek altyapı, F&B'deki üç tarafın sürtünmesini de keser.
            </p>

            <div className="mt-14 hidden md:block">
              <MerchantIllustration />
            </div>
          </motion.div>

          {/* Right — 2 cards */}
          <div className="grid gap-5 md:col-span-7 sm:grid-cols-2">
            {CARDS.map((card, i) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
                className={`group relative flex flex-col rounded-3xl border bg-white p-7 shadow-monad-card transition-shadow hover:shadow-monad-glow ${
                  card.accent === "purple"
                    ? "border-monad-purple/15"
                    : "border-black/[0.06]"
                }`}
              >
                {/* Top emblem */}
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${
                      card.accent === "purple"
                        ? "bg-monad-purple text-white shadow-monad-button"
                        : "bg-ink text-white"
                    }`}
                  >
                    <CardGlyph variant={i} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-link">
                    {card.badge}
                  </span>
                </div>

                <h3 className="mt-10 font-display text-[22px] font-bold leading-tight tracking-tight text-ink">
                  {card.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-ink-soft/85">
                  {card.desc}
                </p>

                <Link
                  href={card.href}
                  className={`mt-8 inline-flex h-11 items-center justify-center gap-1.5 rounded-pill text-[11px] font-bold uppercase tracking-[0.16em] transition-transform hover:scale-[1.02] ${
                    card.accent === "purple"
                      ? "bg-monad-purple text-white shadow-monad-button"
                      : "bg-ink text-white"
                  }`}
                >
                  {card.cta} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CardGlyph({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
        <path
          d="M4 8h16M4 14h10M4 18h7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M12 3 L14.5 9 L21 9 L16 13 L18 19 L12 15.5 L6 19 L8 13 L3 9 L9.5 9 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Monad-style abstract geometric: three concentric purple arcs + connecting
 * dashed lines + central node. Static SVG, zero JS animation.
 */
function MerchantIllustration() {
  return (
    <svg
      viewBox="0 0 400 180"
      className="h-auto w-full max-w-[420px]"
      aria-hidden
    >
      <defs>
        <linearGradient id="merch-grad-1" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#6e54ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6e54ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="merch-grad-2" x1="100%" y1="50%" x2="0%" y2="50%">
          <stop offset="0%" stopColor="#836ef9" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#836ef9" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 30 90 a 60 60 0 1 1 0.1 0"
        fill="url(#merch-grad-1)"
        opacity="0.7"
      />
      <path
        d="M 200 90 a 50 50 0 1 0 0.1 0"
        fill="url(#merch-grad-2)"
        opacity="0.6"
      />
      <path
        d="M 370 90 a 45 45 0 1 1 0.1 0"
        fill="url(#merch-grad-1)"
        opacity="0.55"
      />
      <line
        x1="90"
        y1="90"
        x2="150"
        y2="90"
        stroke="rgba(110,84,255,0.4)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <line
        x1="250"
        y1="90"
        x2="325"
        y2="90"
        stroke="rgba(110,84,255,0.4)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <circle cx="200" cy="90" r="6" fill="#6e54ff" />
      <text
        x="200"
        y="90"
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize="6"
        fontFamily="Inter, system-ui"
        fontWeight="700"
      >
        K
      </text>
    </svg>
  );
}
