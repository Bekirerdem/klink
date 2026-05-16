"use client";

import { motion } from "framer-motion";
import { HandCoins, Store, Users } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

const ease = [0.4, 0, 0.2, 1] as const;

const actors = [
  {
    icon: Store,
    role: "MEKAN",
    headline: "Komisyonsuz tahsil et.",
    pain: "Iyzico/Param %3, settle 24-72 saat, müşteri data bankada kilitli.",
    win: "Gas-only ücret. Anlık settle. Sadık müşteri profili senin cüzdanında.",
    accent: "from-monad-purple/[0.12]",
  },
  {
    icon: Users,
    role: "MÜŞTERİ",
    headline: "Tek tap, sade.",
    pain: "Split hesap kabusu, sadakat kartı taşıma, cüzdan kurmak korkutucu.",
    win: "Email'le bağlan. Split + bahşiş tek tap. Sadakat NFT'si cüzdanda.",
    accent: "from-monad-purple-soft/[0.10]",
  },
  {
    icon: HandCoins,
    role: "ÇALIŞAN",
    headline: "Bahşişi sen kazan.",
    pain: "Patron havuzu manipüle eder, ay sonu maaş, vergi belirsiz.",
    win: "On-chain havuz. Anlık cüzdan. BtcTurk'e tek tıkla TL.",
    accent: "from-monad-purple/[0.16]",
  },
];

export function SolutionCards() {
  return (
    <section id="cozum" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="max-w-2xl"
        >
          <Eyebrow>/ ÜÇ KAZANAN</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
            Mekan kazansın. Garson kazansın. Sen kazan.
          </h2>
          <p className="mt-6 max-w-xl text-balance text-[17px] leading-relaxed text-ink-soft/85 md:text-lg">
            Klink tek altyapıyla üç tarafa değer üretir. Aynı transaction'da
            mekan ödenir, çalışan bahşişini alır, müşteri sadakat mührünü
            cüzdanına koyar.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {actors.map((a, idx) => (
            <motion.article
              key={a.role}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease }}
              className={cn(
                "group relative isolate overflow-hidden rounded-3xl border border-black/[0.06] bg-white p-7 shadow-monad-card",
                "transition-shadow duration-300 hover:shadow-monad-glow",
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100",
                  a.accent,
                )}
                aria-hidden
              />

              <header className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-monad-purple-light text-monad-purple shadow-inner">
                  <a.icon className="h-6 w-6" strokeWidth={2.2} />
                </span>
                <Eyebrow tone="muted">{a.role}</Eyebrow>
              </header>

              <h3 className="mt-8 font-display text-2xl font-bold leading-tight tracking-tight text-ink">
                {a.headline}
              </h3>

              <div className="mt-6 space-y-4 text-[14px] leading-relaxed">
                <p className="text-ink-link">
                  <span className="font-semibold text-ink/55">Bugün</span>{" "}
                  <span className="text-ink-soft/85">— {a.pain}</span>
                </p>
                <p>
                  <span className="font-semibold text-monad-purple">Klink ile</span>{" "}
                  <span className="text-ink">— {a.win}</span>
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
