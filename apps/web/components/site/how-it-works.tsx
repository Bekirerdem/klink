"use client";

import { motion } from "framer-motion";
import { Mail, QrCode, Sparkles, Wallet } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";

const ease = [0.4, 0, 0.2, 1] as const;

const steps = [
  {
    icon: QrCode,
    title: "Masa QR'ını tara",
    body: "Mekan masaya yapıştırılmış sticker. Telefon kamerasını aç — 1 saniye.",
  },
  {
    icon: Mail,
    title: "Email gir",
    body: "Privy embedded wallet sessizce kurulur. Seed phrase yok, uzantı yok.",
  },
  {
    icon: Wallet,
    title: "Bahşişi seç, öde",
    body: "%10 / %15 / %20 preset. Tek transaction'da hesap → mekan, bahşiş → garson.",
  },
  {
    icon: Sparkles,
    title: "Sadakat NFT alındı",
    body: "Cüzdana otomatik düşer. 10 ziyaret = bedava içecek. Koalisyon paylaşımlı.",
  },
];

export function HowItWorks() {
  return (
    <section id="nasil" className="relative scroll-mt-24 bg-bg-mute py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <Eyebrow>/ MÜŞTERİ AKIŞI</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-6xl">
              QR'dan ödemeye{" "}
              <span className="italic text-monad-purple">30 saniye</span>.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-ink-soft/85">
            İlk kullanımda email girişi 10 saniye sürer; sonraki ziyaretlerde
            cüzdan zaten kurulu, ödeme 5 saniye.
          </p>
        </motion.div>

        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, idx) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease }}
              className="group relative isolate flex h-full flex-col rounded-2xl border border-black/[0.05] bg-white p-6 transition-shadow hover:shadow-monad-card"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-bold tabular-nums text-monad-purple">
                  0{idx + 1}
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-monad-purple-light text-monad-purple transition-transform group-hover:rotate-[8deg]">
                  <s.icon className="h-5 w-5" strokeWidth={2.2} />
                </span>
              </div>
              <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink-soft/85">
                {s.body}
              </p>

              {idx < steps.length - 1 && (
                <span
                  className="pointer-events-none absolute -right-[10px] top-1/2 hidden h-px w-[20px] -translate-y-1/2 bg-gradient-to-r from-monad-purple/40 to-transparent lg:block"
                  aria-hidden
                />
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
