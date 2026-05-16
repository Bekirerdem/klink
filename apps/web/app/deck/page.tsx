"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ScanLine } from "lucide-react";
import { PulseDot } from "@/components/ui/pulse-dot";

/**
 * Klink pitch deck — 8 slide. Startup-grade headlines + somut market
 * sayıları. Bekir Erdem · Monad Blitz Çanakkale · 16.05.2026.
 */

const ease = [0.16, 1, 0.3, 1] as const;

export default function DeckPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const container = document.getElementById("deck-scroll");
    if (!container) return;
    const onScroll = () => {
      const h = window.innerHeight;
      setCurrent(Math.round(container.scrollTop / h));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const container = document.getElementById("deck-scroll");
      if (!container) return;
      const h = window.innerHeight;
      const cur = Math.round(container.scrollTop / h);

      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        container.scrollTo({ top: (cur + 1) * h, behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        container.scrollTo({
          top: Math.max(0, (cur - 1) * h),
          behavior: "smooth",
        });
      } else if (e.key === "Home") {
        e.preventDefault();
        container.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "End") {
        e.preventDefault();
        container.scrollTo({ top: 8 * h, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main
      id="deck-scroll"
      className="h-dvh snap-y snap-mandatory overflow-y-scroll"
      style={{ scrollSnapType: "y mandatory" }}
    >
      <CoverSlide />
      <ProblemSlide />
      <ActorsSlide />
      <SolutionSlide />
      <DemoSlide />
      <ArchitectureSlide />
      <WhyMonadSlide />
      <FinalSlide />
      <ProgressDots total={8} current={current} />
    </main>
  );
}

function Slide({
  children,
  bg,
  className,
}: {
  children: React.ReactNode;
  bg: "light" | "dark" | "mute";
  className?: string;
}) {
  const bgClass =
    bg === "dark"
      ? "bg-ink text-white"
      : bg === "mute"
        ? "bg-bg-mute text-ink"
        : "bg-white text-ink";
  return (
    <section
      className={`relative flex h-dvh w-full snap-start snap-always items-center justify-center overflow-hidden px-6 py-16 md:px-16 ${bgClass} ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="fixed right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
            i === current
              ? "h-6 bg-monad-purple"
              : "bg-black/15 hover:bg-black/30"
          }`}
          aria-hidden
        />
      ))}
    </div>
  );
}

function Eyebrow({
  children,
  tone = "purple",
}: {
  children: React.ReactNode;
  tone?: "purple" | "white";
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${
        tone === "white"
          ? "border-white/15 bg-white/[0.04] text-white"
          : "border-black/[0.08] bg-white/80 text-ink-soft"
      } backdrop-blur-sm`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${tone === "white" ? "bg-monad-purple-pale" : "bg-monad-purple"}`}
      />
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
        {children}
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
 * 1. COVER
 * ───────────────────────────────────────────────────────── */

function CoverSlide() {
  return (
    <Slide bg="light">
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        aria-hidden
      >
        <span className="font-display text-[44vw] font-black leading-none tracking-[-0.06em] text-monad-purple/[0.05] md:text-[28vw]">
          K
        </span>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(0,0,0,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
        }}
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Eyebrow>KLINK · ON-CHAIN POS · ÇANAKKALE 2026</Eyebrow>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-8 font-display text-[64px] font-bold leading-[0.92] tracking-[-0.035em] md:text-[148px]"
        >
          Türk F&B'sinin
          <br />
          <span className="italic text-monad-purple">on-chain POS'u.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mt-7 max-w-xl text-balance text-[18px] leading-relaxed text-ink-soft/85"
        >
          Sıfır komisyon, anlık settle, cüzdansız UX. Türkiye'de Stripe yok —
          biz Monad'la girdik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-link"
        >
          <span>MONAD BLITZ ÇANAKKALE · 16.05.2026</span>
          <span className="h-3 w-px bg-ink-link/30" />
          <span>BEKİR ERDEM · SOLO · 6H</span>
        </motion.div>
      </div>
    </Slide>
  );
}

/* ─────────────────────────────────────────────────────────
 * 2. PROBLEM
 * ───────────────────────────────────────────────────────── */

function ProblemSlide() {
  return (
    <Slide bg="dark">
      <div className="relative z-10 w-full max-w-7xl">
        <Eyebrow tone="white">PROBLEM</Eyebrow>

        <h2 className="mt-8 font-display text-[44px] font-bold leading-[0.95] tracking-[-0.03em] md:text-[88px]">
          Sektör akıyor.
          <br />
          <span className="italic text-monad-purple-pale">Para kayboluyor.</span>
        </h2>

        <div className="mt-20 grid gap-12 md:grid-cols-3">
          <BigStat
            value="100K+"
            label="MEKAN"
            sub="Türkiye F&B işletmesi"
          />
          <BigStat
            value="1.5M+"
            label="ÇALIŞAN"
            sub="Konaklama + yiyecek istihdamı"
          />
          <BigStat
            value="%2-3"
            label="KOMİSYON"
            sub="Iyzico/Param standart POS bandı"
          />
        </div>

        <p className="mt-20 max-w-2xl text-balance text-[18px] leading-relaxed text-white/70">
          Iyzico %2-3 alır, settle 72 saat, müşteri data bankanın kasasında.
          Bahşiş havuzu manipülasyona açık, garson tam payını alamaz. Mevcut
          POS üç tarafı da yoruyor.
        </p>
      </div>
    </Slide>
  );
}

function BigStat({
  value,
  label,
  sub,
}: {
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, ease }}
    >
      <p className="font-mono text-[72px] font-bold leading-none tabular-nums md:text-[112px]">
        {value}
      </p>
      <p className="mt-3 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-monad-purple-pale">
        {label}
      </p>
      <p className="mt-2 max-w-[16ch] text-[14px] text-white/60">{sub}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
 * 3. AKTÖRLER
 * ───────────────────────────────────────────────────────── */

function ActorsSlide() {
  const cards = [
    {
      emoji: "🏪",
      role: "MEKAN",
      pain: "%3 komisyon, 72h settle, müşteri data kilitli.",
      win: "Gas-only ücret, anlık settle, müşteri profili senin elinde.",
    },
    {
      emoji: "🙋",
      role: "MÜŞTERİ",
      pain: "Split hesap zor, sadakat kart-taşıma, cüzdan korkusu.",
      win: "Email ile saniyede cüzdan, tek tap split + bahşiş, NFT sadakat.",
    },
    {
      emoji: "🧑‍🍳",
      role: "ÇALIŞAN",
      pain: "Bahşiş havuzda kayboluyor, ay sonu maaş, vergi belirsiz.",
      win: "On-chain havuz, anlık cüzdan, BtcTurk ile TL'ye çek.",
    },
  ];

  return (
    <Slide bg="mute">
      <div className="relative z-10 w-full max-w-7xl">
        <Eyebrow>AKTÖRLER</Eyebrow>

        <h2 className="mt-7 font-display text-[40px] font-bold leading-[0.95] tracking-[-0.03em] md:text-[80px]">
          Aynı transaction.
          <br />
          <span className="italic text-monad-purple">Üç kazanan.</span>
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <motion.article
              key={c.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
              className="rounded-3xl border border-black/[0.06] bg-white p-7 shadow-monad-card"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-monad-purple-light text-2xl">
                {c.emoji}
              </span>
              <p className="mt-7 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-monad-purple">
                {c.role}
              </p>
              <div className="mt-5 space-y-3 text-[14px] leading-relaxed">
                <p className="text-ink-link">
                  <span className="font-semibold text-ink/60">Bugün —</span>{" "}
                  {c.pain}
                </p>
                <p className="text-ink">
                  <span className="font-semibold text-monad-purple">Klink —</span>{" "}
                  {c.win}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ─────────────────────────────────────────────────────────
 * 4. ÇÖZÜM
 * ───────────────────────────────────────────────────────── */

function SolutionSlide() {
  const modules = [
    { label: "Cüzdansız Onboarding", desc: "Privy email/SMS · ~10sn" },
    { label: "PayBill Contract", desc: "Tek tx · split + bahşiş + NFT" },
    { label: "TipPool", desc: "On-chain havuz · patron değiştiremiyor" },
    { label: "Koalisyon NFT", desc: "Şehir bazlı sadakat pasaportu" },
  ];

  return (
    <Slide bg="light">
      <div className="relative z-10 w-full max-w-7xl">
        <Eyebrow>ÇÖZÜM</Eyebrow>

        <div className="mt-7 grid items-end gap-12 md:grid-cols-12">
          <h2 className="font-display text-[40px] font-bold leading-[0.95] tracking-[-0.03em] md:col-span-7 md:text-[96px]">
            Tek tap.
            <br />
            <span className="italic text-monad-purple">Üç kazanan.</span>
          </h2>
          <p className="max-w-md text-balance text-[16px] leading-relaxed text-ink-soft/85 md:col-span-5">
            Müşteri ödüyor, mekan tahsil ediyor, garson bahşişini alıyor,
            sadakat mührü cüzdana düşüyor — hepsi tek call'da, 0.4 saniyede.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-x-12 gap-y-10 md:grid-cols-4">
          {modules.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="border-t-2 border-monad-purple pt-5"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-monad-purple">
                MODÜL {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-display text-[20px] font-bold leading-tight tracking-tight">
                {m.label}
              </p>
              <p className="mt-2 text-[13px] text-ink-link">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ─────────────────────────────────────────────────────────
 * 5. DEMO
 * ───────────────────────────────────────────────────────── */

function DemoSlide() {
  const steps = [
    "QR'ı tara",
    "Email gir",
    "Bahşişi seç",
    "Tek tap öde",
    "Sadakat alındı",
  ];

  return (
    <Slide bg="dark">
      <div className="relative z-10 w-full max-w-7xl">
        <div className="flex items-center gap-3">
          <PulseDot tone="success" />
          <Eyebrow tone="white">DEMO · CANLI</Eyebrow>
        </div>

        <h2 className="mt-8 font-display text-[44px] font-bold leading-[0.95] tracking-[-0.03em] md:text-[112px]">
          30 saniye.
          <br />
          <span className="italic text-monad-purple-pale">Cüzdan yok. Komisyon yok.</span>
        </h2>

        <ol className="mt-16 grid grid-cols-1 gap-3 md:grid-cols-5">
          {steps.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur"
            >
              <span className="font-mono text-[11px] font-bold tabular-nums text-monad-purple-pale">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 font-display text-[15px] font-semibold leading-tight">
                {s}
              </p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-16 flex flex-wrap items-center gap-4">
          <Link
            href="/pay/demo"
            className="inline-flex h-12 items-center gap-2 rounded-pill bg-monad-purple px-7 text-[12px] font-bold uppercase tracking-[0.18em] shadow-monad-button transition-transform hover:scale-[1.04]"
          >
            <ScanLine className="h-4 w-4" />
            DEMO'YA GİT
          </Link>
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/50">
            /pay/demo · Kafe Boğaz · Masa 4 · 161₺
          </span>
        </div>
      </div>
    </Slide>
  );
}

/* ─────────────────────────────────────────────────────────
 * 6. MİMARİ
 * ───────────────────────────────────────────────────────── */

function ArchitectureSlide() {
  const stack = [
    { layer: "Frontend", value: "Next.js 16 · React 19 · Tailwind v4" },
    { layer: "Cüzdan", value: "Privy embedded · @privy-io/wagmi · viem" },
    { layer: "Contract", value: "Solidity 0.8.27 · Foundry · OpenZeppelin v5" },
    { layer: "Chain", value: "Monad Testnet · chainId 10143" },
  ];

  const contracts = [
    { name: "PayBill", addr: "0x3262F974…2c891247" },
    { name: "LoyaltyNFT", addr: "0x20963027…d8FC822D8" },
    { name: "MockUSDC", addr: "0x53c10844…65030ceB" },
  ];

  return (
    <Slide bg="mute">
      <div className="relative z-10 w-full max-w-7xl">
        <Eyebrow>MİMARİ</Eyebrow>

        <h2 className="mt-7 font-display text-[40px] font-bold leading-[0.95] tracking-[-0.03em] md:text-[88px]">
          4 contract. 5 route.
          <br />
          <span className="italic text-monad-purple">6 saat. Solo.</span>
        </h2>

        <div className="mt-16 grid items-start gap-16 md:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-monad-purple">
              KATMANLAR
            </p>
            <div className="mt-5 divide-y divide-black/[0.06]">
              {stack.map((s) => (
                <div
                  key={s.layer}
                  className="grid grid-cols-[1fr_2fr] items-baseline gap-4 py-4"
                >
                  <span className="font-display text-[14px] font-semibold uppercase tracking-wider text-ink">
                    {s.layer}
                  </span>
                  <span className="font-mono text-[13px] text-ink-soft/85">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-monad-purple">
              MONAD TESTNET'TE CANLI
            </p>
            <ul className="mt-5 space-y-2">
              {contracts.map((c) => (
                <li
                  key={c.name}
                  className="flex items-center justify-between rounded-2xl border border-black/[0.06] bg-white px-4 py-3"
                >
                  <span className="font-display text-[14px] font-semibold text-ink">
                    {c.name}
                  </span>
                  <span className="font-mono text-[12px] text-ink-link">
                    {c.addr}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-link">
              6/6 forge test geçti · happy + revert + weighted dağıtım
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ─────────────────────────────────────────────────────────
 * 7. NEDEN MONAD
 * ───────────────────────────────────────────────────────── */

function WhyMonadSlide() {
  const stats = [
    { value: "10,000", unit: "TPS" },
    { value: "0.4", unit: "SN · FINALITY" },
    { value: "$0.001", unit: "GAS / TX" },
    { value: "100%", unit: "EVM" },
  ];

  return (
    <Slide bg="light">
      <div className="relative z-10 w-full max-w-7xl">
        <Eyebrow>NEDEN MONAD</Eyebrow>

        <h2 className="mt-7 font-display text-[40px] font-bold leading-[0.95] tracking-[-0.03em] md:text-[96px]">
          5 TL bahşiş için
          <br />
          <span className="italic text-monad-purple">sub-cent gas.</span>
        </h2>

        <p className="mt-6 max-w-2xl text-balance text-[16px] leading-relaxed text-ink-soft/85">
          Ethereum L1'de gas $5-10 — Klink'in mikro-ödeme ekonomisi orada
          imkansız. Monad'ın 10K TPS + sub-cent gas'ı bu modelin tek mantıklı
          altyapısı.
        </p>

        <div className="mt-20 grid grid-cols-2 gap-x-12 gap-y-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.unit}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            >
              <p className="font-mono text-[56px] font-bold leading-none tabular-nums md:text-[96px]">
                {s.value}
              </p>
              <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-monad-purple">
                {s.unit}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ─────────────────────────────────────────────────────────
 * 8. FİNAL
 * ───────────────────────────────────────────────────────── */

function FinalSlide() {
  const roadmap = [
    { ver: "v0.1", status: "BUGÜN", what: "Hackathon MVP · Monad testnet canlı" },
    { ver: "v0.2", status: "ÇEYREK", what: "Fiat onramp · koalisyon · dispute" },
    { ver: "v0.3", status: "YIL 1", what: "Indexer · mobile · merchant scale" },
    { ver: "v1.0", status: "MAINNET", what: "Circle USDC · EU MiCA · TR KVHS" },
  ];

  return (
    <Slide bg="dark">
      <div className="relative z-10 w-full max-w-7xl">
        <div className="grid items-end gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <Eyebrow tone="white">YARIN</Eyebrow>

            <h2 className="mt-8 font-display text-[44px] font-bold leading-[0.92] tracking-[-0.03em] md:text-[124px]">
              Bugün canlı.
              <br />
              <span className="italic text-monad-purple-pale">Yarın mainnet.</span>
            </h2>

            <div className="mt-14 space-y-3">
              {roadmap.map((r, i) => (
                <motion.div
                  key={r.ver}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease }}
                  className="grid grid-cols-[auto_auto_1fr] items-center gap-5 border-b border-white/[0.06] pb-3"
                >
                  <span className="w-16 font-mono text-[20px] font-bold tabular-nums text-monad-purple-pale">
                    {r.ver}
                  </span>
                  <span className="w-24 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    {r.status}
                  </span>
                  <span className="text-[15px] text-white/85">{r.what}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-monad-purple-pale">
              LİNKLER
            </p>
            <div className="mt-5 space-y-3">
              <DeckLink
                label="REPO"
                href="https://github.com/Bekirerdem/klink"
                value="github.com/Bekirerdem/klink"
              />
              <DeckLink
                label="DEMO"
                href="/pay/demo"
                value="/pay/demo · Kafe Boğaz"
              />
              <DeckLink
                label="MEKAN"
                href="/m/kafe-bogaz"
                value="/m/kafe-bogaz · canlı feed"
              />
              <DeckLink
                label="EXPLORER"
                href="https://testnet.monadexplorer.com"
                value="testnet.monadexplorer.com"
                external
              />
            </div>

            <div className="mt-14 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur">
              <p className="font-display text-[18px] font-bold leading-tight">
                Built on <span className="italic text-monad-purple-pale">Monad.</span>
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
                10,000 TPS · 0.4s · %100 EVM
              </p>
            </div>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              Bekir Erdem · Solo · 6h · Monad Blitz Çanakkale
            </p>
          </div>
        </div>
      </div>
    </Slide>
  );
}

function DeckLink({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  const content = (
    <div className="group flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 backdrop-blur transition-colors hover:bg-white/[0.06]">
      <div className="min-w-0">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-monad-purple-pale">
          {label}
        </p>
        <p className="truncate font-mono text-[13px] text-white">{value}</p>
      </div>
      {external ? (
        <ArrowUpRight className="h-4 w-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : (
        <ArrowRight className="h-4 w-4 text-white/50 transition-transform group-hover:translate-x-1" />
      )}
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return <Link href={href}>{content}</Link>;
}
