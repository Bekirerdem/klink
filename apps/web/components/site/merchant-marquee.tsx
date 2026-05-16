"use client";

import { motion } from "framer-motion";
import { Eyebrow } from "@/components/ui/eyebrow";

const merchants = [
  "Kafe Boğaz",
  "Bar Asit",
  "Bistro Mart",
  "Pub Salt",
  "Cafe 18.5",
  "Demirhan",
  "Liman Çay Evi",
  "Mekan 17",
  "Sapatık Espresso",
  "Vali Sokak",
  "Marina Pub",
  "Tatlı Niyet",
  "Yeniçeri Coffee",
  "Sahil Kahve",
  "Limonata Bar",
];

const row = [...merchants, ...merchants];

export function MerchantMarquee() {
  return (
    <section
      id="mekanlar"
      className="relative scroll-mt-24 overflow-hidden border-y border-black/[0.05] bg-bg-mute py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-xl"
        >
          <Eyebrow>/ KOALİSYON</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold leading-[1.08] tracking-tight text-ink md:text-5xl">
            Çanakkale Kahve Pasaportu.
          </h2>
          <p className="mt-5 max-w-md text-balance text-[17px] leading-relaxed text-ink-soft/85">
            Bir mekanda topladığın sadakat mührü diğer mekanlarda{" "}
            <span className="text-ink">%10 indirim</span>. 50 mekan ziyaret
            edersen <span className="text-ink">Lokal Hero</span> NFT'si cüzdanında.
          </p>
        </motion.div>
      </div>

      <div className="relative mt-12 select-none">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg-mute to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg-mute to-transparent" />

        <div className="flex gap-3 marquee-track">
          {row.map((m, idx) => (
            <Capsule
              key={`row1-${idx}`}
              name={m}
              variant={idx % 3 === 0 ? "filled" : "outline"}
            />
          ))}
        </div>

        <div className="mt-3 flex gap-3 marquee-track-reverse pl-[8%]">
          {row.map((m, idx) => (
            <Capsule
              key={`row2-${idx}`}
              name={m}
              variant={idx % 2 === 0 ? "outline" : "filled"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Capsule({
  name,
  variant,
}: {
  name: string;
  variant: "filled" | "outline";
}) {
  return (
    <span
      className={
        variant === "filled"
          ? "inline-flex h-12 shrink-0 items-center rounded-pill bg-white px-6 font-display text-[15px] font-semibold tracking-tight text-ink shadow-monad-card"
          : "inline-flex h-12 shrink-0 items-center rounded-pill border border-black/[0.07] bg-transparent px-6 font-display text-[15px] font-medium tracking-tight text-ink-soft"
      }
    >
      <span className="mr-2.5 h-1.5 w-1.5 rounded-full bg-monad-purple" aria-hidden />
      {name}
    </span>
  );
}
