"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Download,
  Plus,
  QrCode,
  Trash2,
  Wallet,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";
import { shortAddress } from "@/lib/format";

type Step = 1 | 2 | 3 | 4;
type DistributionRule = "EQUAL" | "WEIGHTED";

interface StaffEntry {
  id: string;
  address: string;
  role: string;
  weight: number;
}

const STEPS: { id: Step; title: string; sub: string }[] = [
  { id: 1, title: "Cüzdan", sub: "Bağlan" },
  { id: 2, title: "İşletme", sub: "Bilgi" },
  { id: 3, title: "Bahşiş", sub: "Havuz" },
  { id: 4, title: "Masa", sub: "QR'lar" },
];

const ease = [0.4, 0, 0.2, 1] as const;

export function OnboardFlow() {
  const [step, setStep] = useState<Step>(1);

  const [bizName, setBizName] = useState("");
  const [bizDistrict, setBizDistrict] = useState("Çanakkale Merkez");
  const [bizKind, setBizKind] = useState("Kafe");

  const [rule, setRule] = useState<DistributionRule>("EQUAL");
  const [staff, setStaff] = useState<StaffEntry[]>([]);
  const [draftAddress, setDraftAddress] = useState("");
  const [draftRole, setDraftRole] = useState("Garson");

  const [tableCount, setTableCount] = useState(6);

  const { authenticated } = usePrivy();
  const { address } = useAccount();

  const canNext = useMemo(() => {
    if (step === 1) return authenticated;
    if (step === 2) return bizName.trim().length >= 2;
    if (step === 3) return staff.length >= 1;
    return true;
  }, [step, authenticated, bizName, staff.length]);

  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-bg-mute">
      <div className="pointer-events-none absolute inset-0 -z-10 radial-purple opacity-80" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[80%] dot-grid opacity-50" aria-hidden />

      <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-6 py-10 md:py-16">
        <header className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-wider text-ink-link transition-colors hover:text-monad-purple"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Anasayfa
          </Link>
          <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
            Mekanın için <span className="italic text-monad-purple">Klink</span>{" "}
            kur.
          </h1>
          <p className="mt-2 text-[15px] text-ink-soft/85">
            4 adım, ~10 dakika. İlk ödemen bu akşam gelir.
          </p>
        </header>

        <Stepper step={step} />

        <div className="mt-10 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease }}
            >
              {step === 1 && (
                <ConnectStep authenticated={authenticated} address={address} />
              )}
              {step === 2 && (
                <BusinessStep
                  name={bizName}
                  district={bizDistrict}
                  kind={bizKind}
                  onName={setBizName}
                  onDistrict={setBizDistrict}
                  onKind={setBizKind}
                />
              )}
              {step === 3 && (
                <StaffStep
                  rule={rule}
                  onRule={setRule}
                  staff={staff}
                  onAdd={(entry) => setStaff((prev) => [...prev, entry])}
                  onRemove={(id) =>
                    setStaff((prev) => prev.filter((s) => s.id !== id))
                  }
                  draftAddress={draftAddress}
                  draftRole={draftRole}
                  onDraftAddress={setDraftAddress}
                  onDraftRole={setDraftRole}
                />
              )}
              {step === 4 && (
                <QrStep
                  bizName={bizName || "Demo Mekan"}
                  tableCount={tableCount}
                  onTableCount={setTableCount}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="sticky bottom-0 mt-10 flex items-center justify-between border-t border-black/[0.05] bg-bg-mute/80 py-5 backdrop-blur-xl">
          <Button
            variant="ghost"
            size="md"
            disabled={step === 1}
            onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Geri
          </Button>

          {step < 4 ? (
            <Button
              variant="primary"
              size="md"
              disabled={!canNext}
              onClick={() => setStep((s) => (s + 1) as Step)}
              className="gap-2"
            >
              Devam
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="primary" size="md" className="gap-2">
              <Check className="h-4 w-4" />
              Yayına Al
            </Button>
          )}
        </footer>
      </div>
    </main>
  );
}

function Stepper({ step }: { step: Step }) {
  return (
    <nav aria-label="Onboarding progress" className="grid grid-cols-4 gap-2 md:gap-3">
      {STEPS.map((s) => {
        const active = step === s.id;
        const done = step > s.id;
        return (
          <div key={s.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full border text-[11px] font-mono font-bold transition-colors",
                  done && "border-monad-purple bg-monad-purple text-white",
                  active && !done && "border-monad-purple bg-monad-purple-light text-monad-purple",
                  !active && !done && "border-black/[0.1] bg-white text-ink-link",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : s.id}
              </span>
              <span
                className={cn(
                  "hidden text-[11px] font-semibold uppercase tracking-[0.14em] md:inline",
                  active ? "text-monad-purple" : "text-ink-link",
                )}
              >
                {s.title}
              </span>
            </div>
            <div
              className={cn(
                "h-1 rounded-full transition-colors",
                done ? "bg-monad-purple" : active ? "bg-monad-purple/40" : "bg-black/[0.05]",
              )}
            />
          </div>
        );
      })}
    </nav>
  );
}

function ConnectStep({
  authenticated,
  address,
}: {
  authenticated: boolean;
  address?: `0x${string}`;
}) {
  const { login } = usePrivy();
  return (
    <div className="space-y-5">
      <Eyebrow>/ ADIM 1 · CÜZDAN</Eyebrow>
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
        Mekanının cüzdanını bağla.
      </h2>
      <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft/85">
        Klink seninle <span className="font-mono text-monad-purple">non-custodial</span>{" "}
        konuşur — para hiç bize uğramaz, doğrudan cüzdanına akar.
        MetaMask, WalletConnect veya yeni cüzdan: hepsi olur.
      </p>

      <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-monad-card md:p-7">
        {authenticated ? (
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-success/15 text-success">
              <Check className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-semibold text-ink">
                Cüzdan bağlandı
              </p>
              <p className="truncate font-mono text-[12px] text-ink-link">
                {address ? shortAddress(address) : "—"}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-monad-purple-light text-monad-purple">
              <Wallet className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[15px] font-semibold text-ink">
                Henüz cüzdan bağlı değil
              </p>
              <p className="mt-1 text-[13px] text-ink-link">
                "Cüzdanı Bağla" → MetaMask seçeneği modal'da görünür.
              </p>
            </div>
            <Button onClick={() => login()} className="gap-2">
              <Wallet className="h-4 w-4" />
              Cüzdanı Bağla
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function BusinessStep({
  name,
  district,
  kind,
  onName,
  onDistrict,
  onKind,
}: {
  name: string;
  district: string;
  kind: string;
  onName: (v: string) => void;
  onDistrict: (v: string) => void;
  onKind: (v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <Eyebrow>/ ADIM 2 · İŞLETME</Eyebrow>
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
        Mekanını tanıyalım.
      </h2>
      <div className="space-y-3 rounded-3xl border border-black/[0.06] bg-white p-6 shadow-monad-card md:p-7">
        <Field label="MEKAN ADI">
          <input
            value={name}
            onChange={(e) => onName(e.target.value)}
            placeholder="Kafe Boğaz"
            className="w-full bg-transparent text-[18px] font-semibold text-ink placeholder:text-ink-link/60 focus:outline-none"
          />
        </Field>
        <Field label="BÖLGE">
          <input
            value={district}
            onChange={(e) => onDistrict(e.target.value)}
            placeholder="Çanakkale Merkez"
            className="w-full bg-transparent text-[15px] text-ink placeholder:text-ink-link/60 focus:outline-none"
          />
        </Field>
        <Field label="KATEGORİ">
          <div className="flex flex-wrap gap-2">
            {["Kafe", "Bar", "Restoran", "Pub", "Bistro"].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => onKind(k)}
                className={cn(
                  "h-10 rounded-full border px-4 text-[13px] font-medium transition-all",
                  kind === k
                    ? "border-monad-purple bg-monad-purple text-white"
                    : "border-black/[0.07] bg-white text-ink-soft hover:border-monad-purple/40",
                )}
              >
                {k}
              </button>
            ))}
          </div>
        </Field>
      </div>
    </div>
  );
}

function StaffStep({
  rule,
  onRule,
  staff,
  onAdd,
  onRemove,
  draftAddress,
  draftRole,
  onDraftAddress,
  onDraftRole,
}: {
  rule: DistributionRule;
  onRule: (v: DistributionRule) => void;
  staff: StaffEntry[];
  onAdd: (entry: StaffEntry) => void;
  onRemove: (id: string) => void;
  draftAddress: string;
  draftRole: string;
  onDraftAddress: (v: string) => void;
  onDraftRole: (v: string) => void;
}) {
  const isValidAddress = /^0x[a-fA-F0-9]{40}$/.test(draftAddress);

  const addStaff = () => {
    if (!isValidAddress) return;
    onAdd({
      id: `${Date.now()}`,
      address: draftAddress,
      role: draftRole,
      weight: 1,
    });
    onDraftAddress("");
  };

  return (
    <div className="space-y-5">
      <Eyebrow>/ ADIM 3 · BAHŞİŞ HAVUZU</Eyebrow>
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
        Bahşişler nasıl bölünsün?
      </h2>

      <div className="grid gap-3 md:grid-cols-2">
        {(
          [
            {
              key: "EQUAL",
              title: "Eşit",
              hint: "Her vardiyada çalışan eşit pay alır.",
            },
            {
              key: "WEIGHTED",
              title: "Ağırlıklı",
              hint: "Pozisyona göre farklı yüzde (örn. barmen ×3, garson ×1).",
            },
          ] as const
        ).map((opt) => {
          const active = rule === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onRule(opt.key)}
              className={cn(
                "rounded-3xl border p-5 text-left transition-all",
                active
                  ? "border-monad-purple bg-monad-purple-light/50 shadow-monad-glow"
                  : "border-black/[0.06] bg-white hover:border-monad-purple/40",
              )}
            >
              <p
                className={cn(
                  "font-display text-lg font-bold tracking-tight",
                  active ? "text-monad-purple" : "text-ink",
                )}
              >
                {opt.title}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-link">
                {opt.hint}
              </p>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-monad-card md:p-7">
        <Eyebrow tone="muted">ÇALIŞAN CÜZDANLARI</Eyebrow>

        <div className="mt-4 space-y-2">
          {staff.length === 0 && (
            <p className="rounded-2xl border border-dashed border-black/[0.08] bg-bg-mute px-4 py-6 text-center text-[13px] text-ink-link">
              Henüz çalışan eklenmedi. En az 1 çalışan eklenmeli.
            </p>
          )}
          {staff.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-2xl border border-black/[0.05] bg-bg-mute px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-mono text-[12px] text-ink">
                  {shortAddress(s.address)}
                </p>
                <p className="text-[11px] text-ink-link">{s.role}</p>
              </div>
              <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[11px] text-ink-soft">
                ×{s.weight}
              </span>
              <button
                type="button"
                onClick={() => onRemove(s.id)}
                className="grid h-8 w-8 place-items-center rounded-full text-ink-link transition-colors hover:bg-error/10 hover:text-error"
                aria-label="Kaldır"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto_auto]">
          <input
            value={draftAddress}
            onChange={(e) => onDraftAddress(e.target.value)}
            placeholder="0x… cüzdan adresi"
            className="h-11 rounded-pill border border-black/[0.08] bg-white px-4 font-mono text-[13px] text-ink placeholder:text-ink-link/60 focus:border-monad-purple focus:outline-none"
          />
          <select
            value={draftRole}
            onChange={(e) => onDraftRole(e.target.value)}
            className="h-11 rounded-pill border border-black/[0.08] bg-white px-4 text-[13px] text-ink focus:border-monad-purple focus:outline-none"
          >
            <option>Barmen</option>
            <option>Garson</option>
            <option>Hostes</option>
            <option>Yardımcı</option>
          </select>
          <Button
            type="button"
            onClick={addStaff}
            disabled={!isValidAddress}
            size="md"
            className="gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Ekle
          </Button>
        </div>
      </div>
    </div>
  );
}

function QrStep({
  bizName,
  tableCount,
  onTableCount,
}: {
  bizName: string;
  tableCount: number;
  onTableCount: (n: number) => void;
}) {
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://klink.app";

  return (
    <div className="space-y-5">
      <Eyebrow>/ ADIM 4 · MASA QR'LARI</Eyebrow>
      <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
        Masalarına yapıştır, akşam ödemeler gelsin.
      </h2>

      <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-monad-card md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Eyebrow tone="muted">MASA SAYISI</Eyebrow>
            <p className="mt-2 font-mono text-3xl font-bold tabular-nums text-ink">
              {tableCount}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {[3, 6, 12, 20].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onTableCount(n)}
                className={cn(
                  "h-10 rounded-pill border px-4 text-[13px] font-semibold transition-all",
                  tableCount === n
                    ? "border-monad-purple bg-monad-purple text-white"
                    : "border-black/[0.08] bg-white text-ink-soft hover:border-monad-purple/40",
                )}
              >
                {n}
              </button>
            ))}
            <Button variant="secondary" size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              PDF
            </Button>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: Math.min(tableCount, 8) }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.04 * i, ease }}
              className="flex flex-col items-center rounded-2xl border border-black/[0.05] bg-white p-4"
            >
              <div className="grid h-32 w-32 place-items-center rounded-xl bg-bg-mute">
                <QRCodeSVG
                  value={`${baseUrl}/pay/demo-masa-${i + 1}`}
                  size={108}
                  level="M"
                  fgColor="#0a0a0a"
                  bgColor="transparent"
                />
              </div>
              <p className="mt-3 font-display text-sm font-bold tracking-tight text-ink">
                {bizName}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-ink-link">
                Masa {i + 1}
              </p>
              <p className="mt-1 font-mono text-[10px] text-ink-link">
                klink/pay/{i + 1}
              </p>
            </motion.div>
          ))}
        </div>
        {tableCount > 8 && (
          <p className="mt-4 text-center text-[12px] text-ink-link">
            + {tableCount - 8} masa daha (PDF'de hepsi)
          </p>
        )}
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-monad-purple/15 bg-monad-purple-light/40 px-4 py-3 text-[13px] text-ink">
        <QrCode className="h-4 w-4 text-monad-purple" />
        <span>
          Yazıcıdan A4'e bas, makasla kes, masaya yapıştır.{" "}
          <span className="text-ink-link">İlk ödemen bu akşam gelir.</span>
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-2xl border border-warning/20 bg-warning/5 px-4 py-3 text-[13px] text-ink-soft">
        <Building2 className="h-4 w-4 text-warning" />
        <span>
          Hackathon demo'su — gerçek QR'lar contract deploy edildikten sonra
          aktive olur.
        </span>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5 rounded-2xl border border-black/[0.05] bg-bg-mute/60 px-4 py-3 transition-colors focus-within:border-monad-purple/40">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-monad-purple">
        {label}
      </p>
      {children}
    </div>
  );
}
