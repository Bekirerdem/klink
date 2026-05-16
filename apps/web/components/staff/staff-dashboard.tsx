"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, LogOut, TrendingUp } from "lucide-react";
import { demoStaff } from "@/lib/demo-staff";
import { CountUp } from "@/components/ui/count-up";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PulseDot } from "@/components/ui/pulse-dot";

const ease = [0.4, 0, 0.2, 1] as const;

export function StaffDashboard() {
  const profile = demoStaff;

  return (
    <main className="relative isolate min-h-dvh bg-bg-mute pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 radial-purple" aria-hidden />

      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="border-b border-black/[0.06] bg-white/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-monad-purple text-white shadow-monad-button">
              <span className="font-display text-[15px] font-bold">
                {profile.name[0]}
              </span>
            </span>
            <div>
              <Eyebrow tone="muted">ÇALIŞAN PANELİ</Eyebrow>
              <h1 className="mt-0.5 font-display text-xl font-bold tracking-tight text-ink">
                {profile.name} · <span className="text-ink-link">{profile.role}</span>
              </h1>
              <p className="text-[12px] text-ink-link">
                {profile.merchant} · <span className="font-mono">{profile.walletShort}</span>
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-bg-mute px-3 text-[12px] font-medium text-ink-link transition-colors hover:bg-monad-purple-light/40 hover:text-monad-purple"
          >
            <LogOut className="h-3.5 w-3.5" />
            Çıkış
          </Link>
        </div>
      </motion.header>

      <div className="mx-auto max-w-3xl space-y-6 px-6 pt-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease }}
          className="relative isolate overflow-hidden rounded-[28px] border border-monad-purple/15 bg-gradient-to-br from-monad-purple-light/60 via-white to-white p-8 shadow-monad-card md:p-10"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-monad-purple/20 opacity-60 blur-3xl"
            aria-hidden
          />
          <div className="flex items-center gap-2.5">
            <PulseDot />
            <Eyebrow>/ BUGÜNKÜ BAHŞİŞ · CANLI</Eyebrow>
          </div>

          <p className="mt-4 font-mono text-[72px] font-bold leading-none tracking-tight tabular-nums text-ink md:text-[96px]">
            <CountUp to={profile.todayTip} duration={1.4} />
            <span className="ml-2 text-monad-purple">₺</span>
          </p>

          <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft/85">
            Anlık cüzdanına aktı. Patron havuzunda beklemez,{" "}
            <span className="font-mono text-monad-purple">~0.4 saniyede</span>{" "}
            on-chain settle.
          </p>

          <a
            href="https://www.btcturk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-pill bg-ink px-6 text-[14px] font-semibold text-white shadow-monad-button transition-transform hover:scale-[1.02]"
          >
            BtcTurk'e Çek (TL)
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard label="HAFTA" value={profile.weekTip} sub={`${profile.weekShifts} vardiya`} />
          <SummaryCard label="AY" value={profile.monthTip} sub="kümülatif" />
          <SummaryCard
            label="AYLIK ARTIŞ"
            value={18}
            format={(v) => `+${Math.round(v)}%`}
            sub="önceki aya göre"
            icon
          />
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.55, ease }}
          className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-monad-card"
        >
          <header className="flex items-center justify-between border-b border-black/[0.05] px-6 py-4">
            <Eyebrow>/ SON BAHŞİŞLER</Eyebrow>
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-link">
              {profile.recent.length} işlem
            </span>
          </header>
          <ul className="divide-y divide-black/[0.04]">
            {profile.recent.map((entry, idx) => (
              <motion.li
                key={entry.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.06 * idx, ease }}
                className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-6 py-3.5"
              >
                <span className="font-mono text-[12px] tabular-nums text-ink-link">
                  {entry.ts}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-ink">{entry.masa}</p>
                  <p className="text-[11px] text-ink-link">
                    {entry.merchant} · hesap {entry.bill}₺
                  </p>
                </div>
                <span className="rounded-full bg-success/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-success">
                  +{entry.tip}₺
                </span>
                <ExternalLink className="h-3.5 w-3.5 text-ink-link" />
              </motion.li>
            ))}
          </ul>
        </motion.section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  value,
  sub,
  format = (v) => `${Math.round(v).toLocaleString("tr-TR")}₺`,
  icon = false,
}: {
  label: string;
  value: number;
  sub?: string;
  format?: (v: number) => string;
  icon?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.45, ease }}
      className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-monad-purple">
          {label}
        </p>
        {icon && <TrendingUp className="h-4 w-4 text-success" />}
      </div>
      <p className="mt-3 font-mono text-2xl font-bold tabular-nums text-ink">
        <CountUp to={value} format={format} />
      </p>
      {sub && <p className="mt-1 text-[12px] text-ink-link">{sub}</p>}
    </motion.div>
  );
}
