"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Minus } from "lucide-react";

interface Row {
  rank: number;
  name: string;
  tagline: string;
  emoji: string;
  change: number;
  href: string;
}

const TOP_ROWS: Row[] = [
  {
    rank: 1,
    name: "Kafe Boğaz",
    tagline: "Üçüncü dalga kahve · Çanakkale",
    emoji: "☕",
    change: 4,
    href: "/m/kafe-bogaz",
  },
  {
    rank: 2,
    name: "Bar Asit",
    tagline: "Doğal şarap bar",
    emoji: "🍸",
    change: -1,
    href: "/m/bar-asit",
  },
  {
    rank: 3,
    name: "Bistro Mart",
    tagline: "Akdeniz bistro",
    emoji: "🍽",
    change: -1,
    href: "/m/bistro-mart",
  },
  {
    rank: 4,
    name: "Pub Salt",
    tagline: "Zanaat biracı pub",
    emoji: "🍺",
    change: 0,
    href: "/m/pub-salt",
  },
  {
    rank: 5,
    name: "Cafe 18.5",
    tagline: "Spesiyalite kafe",
    emoji: "☕",
    change: -2,
    href: "/m/cafe-18-5",
  },
];

const HOT_ROWS: Row[] = [
  {
    rank: 1,
    name: "Kafe Boğaz",
    tagline: "Üçüncü dalga kahve · Çanakkale",
    emoji: "☕",
    change: 68,
    href: "/m/kafe-bogaz",
  },
  {
    rank: 2,
    name: "Demirhan",
    tagline: "Kokteyl bar · 1 yıldız",
    emoji: "🥃",
    change: 33,
    href: "/m/demirhan",
  },
  {
    rank: 3,
    name: "Marina Pub",
    tagline: "Sahil pub",
    emoji: "🌊",
    change: 9,
    href: "/m/marina-pub",
  },
  {
    rank: 4,
    name: "Sahil Kahve",
    tagline: "Deniz kenarı kafe",
    emoji: "🍵",
    change: 4,
    href: "/m/sahil-kahve",
  },
  {
    rank: 5,
    name: "Tatlı Niyet",
    tagline: "Pastane",
    emoji: "🍰",
    change: 3,
    href: "/m/tatli-niyet",
  },
];

const QUICK_LINKS = [
  { label: "ÖDE", href: "/pay/demo", icon: PayIcon },
  { label: "BAHŞİŞ", href: "/staff", icon: TipIcon },
  { label: "SADAKAT", href: "/m/kafe-bogaz", icon: LoyaltyIcon },
  { label: "KAYIT", href: "/onboard", icon: OnboardIcon },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function MostActiveMerchants() {
  return (
    <section className="relative bg-white py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.55, ease }}
          className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end"
        >
          <div>
            <h2 className="font-display text-[32px] font-bold leading-[0.95] tracking-[-0.025em] text-ink md:text-[56px]">
              En Aktif Mekanlar
            </h2>
            <p className="mt-3 text-[14px] text-ink-link">
              Bugünün saatlik işlem hacmine göre Klink mekanları
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-link">
            Bugün · 17:00'da güncellendi
          </span>
        </motion.div>

        {/* Two-column lists */}
        <div className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2">
          <Column title="EN AKTİF · şu an" dotTone="purple" rows={TOP_ROWS} />
          <Column
            title="POPÜLER · saat-saat"
            dotTone="error"
            rows={HOT_ROWS}
            percentChange
            delay={0.1}
          />
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/m/kafe-bogaz"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-link transition-colors hover:text-monad-purple"
          >
            Hepsini Mekan Hub'da gör <ArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>

        {/* Quick actions */}
        <div className="mt-24 grid grid-cols-2 border-y border-black/[0.06] md:grid-cols-4">
          {QUICK_LINKS.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease }}
              className={
                i < QUICK_LINKS.length - 1
                  ? "border-r border-black/[0.06]"
                  : ""
              }
            >
              <Link
                href={link.href}
                className="group flex flex-col items-center gap-4 py-12 transition-colors hover:bg-bg-mute"
              >
                <link.icon className="h-12 w-12 text-ink transition-transform group-hover:scale-110" />
                <span className="font-display text-[13px] font-bold uppercase tracking-[0.18em] text-ink">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Column({
  title,
  dotTone,
  rows,
  percentChange,
  delay = 0,
}: {
  title: string;
  dotTone: "purple" | "error";
  rows: Row[];
  percentChange?: boolean;
  delay?: number;
}) {
  const dotColor = dotTone === "purple" ? "bg-monad-purple" : "bg-error";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.55, delay, ease }}
    >
      <div className="mb-4 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${dotColor}`} />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
          {title}
        </span>
      </div>
      <ul className="divide-y divide-black/[0.05] rounded-2xl border border-black/[0.05] bg-white">
        {rows.map((row) => (
          <li key={row.rank}>
            <Link
              href={row.href}
              className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-bg-mute"
            >
              <span className="w-4 font-mono text-[13px] font-bold tabular-nums text-ink-link">
                {row.rank}
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-monad-purple-light text-xl">
                {row.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-[15px] font-semibold tracking-tight text-ink">
                  {row.name}
                </p>
                <p className="truncate text-[12px] text-ink-link">
                  {row.tagline}
                </p>
              </div>
              <ChangeIndicator change={row.change} percent={percentChange} />
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ChangeIndicator({
  change,
  percent,
}: {
  change: number;
  percent?: boolean;
}) {
  if (change === 0) return <Minus className="h-3 w-3 text-ink-link" />;
  if (change > 0) {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-[13px] font-bold text-success">
        ↑ {change}
        {percent && "%"}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-mono text-[13px] font-bold text-error">
      ↓ {Math.abs(change)}
      {percent && "%"}
    </span>
  );
}

function PayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <rect x="6" y="14" width="36" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="29" width="8" height="3" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function TipIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M24 10 L30 22 L24 38 L18 22 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="18" y1="22" x2="30" y2="22" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LoyaltyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M24 14 L26.5 21 L34 21 L28 25.5 L30 32.5 L24 28.5 L18 32.5 L20 25.5 L14 21 L21.5 21 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OnboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden>
      <path d="M10 18 L24 8 L38 18 L38 38 L10 38 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="20" y="26" width="8" height="12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
