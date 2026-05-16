"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { type DemoBill, billTotal } from "@/lib/demo-data";
import { BillSummary } from "./bill-summary";
import { TipSelector, type TipChoice } from "./tip-selector";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { PulseDot } from "@/components/ui/pulse-dot";
import { cn } from "@/lib/utils";
import { isContractsDeployed } from "@/lib/contracts";
import { shortAddress } from "@/lib/format";

type Step = "idle" | "submitting" | "success";

const ease = [0.4, 0, 0.2, 1] as const;

export function PayFlow({ bill }: { bill: DemoBill }) {
  const subtotal = useMemo(() => billTotal(bill), [bill]);

  const [tipChoice, setTipChoice] = useState<TipChoice>(15);
  const [customTip, setCustomTip] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState<string | null>(null);

  const tipAmount = useMemo(() => {
    if (tipChoice === "custom") {
      const v = Number(customTip);
      return Number.isFinite(v) && v > 0 ? v : 0;
    }
    return Math.round((subtotal * tipChoice) / 100);
  }, [tipChoice, customTip, subtotal]);

  const total = subtotal + tipAmount;

  const { ready, authenticated, login, user, logout } = usePrivy();
  const { address } = useAccount();
  const activeWallet = address ?? (user?.wallet?.address as `0x${string}` | undefined);

  const handlePay = async () => {
    setError(null);
    if (!authenticated) {
      login();
      return;
    }

    setStep("submitting");

    // Demo flow: contractlar deploy edilmediyse simüle et.
    // Production'da useWriteContract ile approve + payBill çağrılır.
    if (!isContractsDeployed) {
      await new Promise((r) => setTimeout(r, 1800));
      setStep("success");
      return;
    }

    try {
      // TODO: useWriteContract ile gerçek transaction
      //   1. MockUSDC.approve(payBill, total)
      //   2. PayBill.payBill(merchant, tipPool, billAmount, tipAmount, receiptHash)
      // Hackathon scope: yer tutucu — addresses .env.local'a gelince enable.
      await new Promise((r) => setTimeout(r, 1800));
      setStep("success");
    } catch (e) {
      setError(e instanceof Error ? e.message : "İşlem başarısız");
      setStep("idle");
    }
  };

  if (step === "success") {
    return <SuccessScreen bill={bill} subtotal={subtotal} tip={tipAmount} />;
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="overflow-hidden rounded-[28px] border border-black/[0.06] bg-white shadow-monad-card"
      >
        <Header bill={bill} />

        <div className="space-y-7 px-6 py-7">
          <BillSummary bill={bill} />

          <TipSelector
            value={tipChoice}
            onChange={setTipChoice}
            customAmount={customTip}
            onCustomChange={setCustomTip}
            staffName={bill.staff.name}
          />

          <TotalRow subtotal={subtotal} tip={tipAmount} total={total} />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-[13px] text-error"
            >
              {error}
            </motion.p>
          )}

          <Button
            type="button"
            size="lg"
            className="w-full"
            onClick={handlePay}
            disabled={step === "submitting" || !ready}
          >
            {step === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Onaylanıyor…
              </>
            ) : authenticated ? (
              <>
                <Wallet className="h-5 w-5" />
                Öde · {total}₺
                <ArrowRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Email ile öde · {total}₺
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <Footer
            authenticated={authenticated}
            activeWallet={activeWallet}
            onLogout={logout}
          />
        </div>
      </motion.div>
    </div>
  );
}

function Header({ bill }: { bill: DemoBill }) {
  return (
    <div className="relative isolate overflow-hidden border-b border-black/[0.05] bg-gradient-to-br from-monad-purple-light/60 via-white to-white px-6 py-7">
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-monad-purple opacity-[0.06] blur-3xl"
        aria-hidden
      />
      <Eyebrow>/ KLINK · ÖDEME</Eyebrow>
      <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
        {bill.merchantName}
      </h1>
      <p className="mt-1 flex items-center gap-2 text-[13px] text-ink-link">
        <PulseDot size="sm" />
        {bill.masa} · {bill.staff.name} ({bill.staff.role})
      </p>
    </div>
  );
}

function TotalRow({
  subtotal,
  tip,
  total,
}: {
  subtotal: number;
  tip: number;
  total: number;
}) {
  return (
    <div className="space-y-2 rounded-2xl bg-bg-mute px-4 py-4">
      <Row label="Adisyon" value={`${subtotal}₺`} />
      <Row
        label={tip > 0 ? "Bahşiş" : "Bahşiş seçilmedi"}
        value={tip > 0 ? `+${tip}₺` : "—"}
        tone="purple"
      />
      <div className="my-1 border-t border-black/[0.05]" />
      <Row label="Toplam" value={`${total}₺`} tone="strong" />
    </div>
  );
}

function Row({
  label,
  value,
  tone = "normal",
}: {
  label: string;
  value: string;
  tone?: "normal" | "purple" | "strong";
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span
        className={cn(
          "text-[13px]",
          tone === "strong" ? "font-semibold uppercase tracking-wider text-ink" : "text-ink-link",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-mono tabular-nums",
          tone === "strong" && "text-xl font-bold text-ink",
          tone === "purple" && "text-monad-purple",
          tone === "normal" && "text-ink",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Footer({
  authenticated,
  activeWallet,
  onLogout,
}: {
  authenticated: boolean;
  activeWallet?: `0x${string}`;
  onLogout: () => void;
}) {
  return (
    <div className="space-y-3 text-[12px] text-ink-link">
      {authenticated && activeWallet ? (
        <div className="flex items-center justify-between rounded-xl border border-black/[0.05] bg-white px-3 py-2.5">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-success" />
            <span className="font-mono text-ink-soft">
              {shortAddress(activeWallet)}
            </span>
          </span>
          <button
            type="button"
            onClick={onLogout}
            className="text-[11px] uppercase tracking-wider text-ink-link hover:text-error"
          >
            Çıkış
          </button>
        </div>
      ) : (
        <p className="leading-relaxed">
          Email ile bağlanınca cüzdanın saniyede kurulur. Seed phrase yok,
          uzantı yok. Cüzdan tam olarak senin — biz sadece arayüz.
        </p>
      )}

      <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-[11px] uppercase tracking-wider text-ink-link/70">
        Built on <span className="font-mono text-monad-purple">Monad</span>
      </p>
    </div>
  );
}

function SuccessScreen({
  bill,
  subtotal,
  tip,
}: {
  bill: DemoBill;
  subtotal: number;
  tip: number;
}) {
  const total = subtotal + tip;
  return (
    <AnimatePresence>
      <motion.div
        key="success"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className="mx-auto w-full max-w-md"
      >
        <div className="relative isolate overflow-hidden rounded-[28px] border border-monad-purple/20 bg-white p-8 shadow-monad-glow">
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-60"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 0%, rgba(110,84,255,0.18), transparent 70%)",
            }}
            aria-hidden
          />

          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="grid h-16 w-16 place-items-center rounded-2xl bg-monad-purple text-white shadow-monad-button"
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>

          <h2 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-ink">
            Ödeme alındı.
          </h2>
          <p className="mt-2 text-[15px] text-ink-soft/85">
            <span className="font-mono font-semibold tabular-nums text-ink">
              {total}₺
            </span>{" "}
            {bill.merchantName}'a aktarıldı.
            {tip > 0 && (
              <>
                {" "}
                Bahşiş{" "}
                <span className="font-mono font-semibold tabular-nums text-monad-purple">
                  +{tip}₺
                </span>{" "}
                anlık {bill.staff.name}'ın cüzdanında.
              </>
            )}
          </p>

          <div className="mt-7 grid gap-2 rounded-2xl border border-monad-purple/15 bg-monad-purple-light/30 px-4 py-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-monad-purple" />
              <span className="text-[13px] font-semibold text-monad-purple">
                Sadakat mührü eklendi
              </span>
            </div>
            <p className="text-[12px] leading-relaxed text-ink-link">
              {bill.merchantName} koleksiyonuna 1 mühür düştü. 10 mühür = 1 bedava
              içecek. Aynı pasaport Çanakkale'deki diğer Klink mekanlarında
              %10 indirim.
            </p>
          </div>

          <a
            href="/"
            className="mt-6 inline-flex w-full items-center justify-center rounded-pill border border-black/[0.07] bg-bg-mute px-6 py-3.5 text-[14px] font-semibold text-ink transition-colors hover:bg-monad-purple-light/40"
          >
            Anasayfaya dön
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
