import type { Metadata } from "next";
import { getDemoMerchant } from "@/lib/demo-merchant";
import { DashboardHeader } from "@/components/merchant/dashboard-header";
import { StatCard } from "@/components/merchant/stat-card";
import { TipPoolPanel } from "@/components/merchant/tip-pool-panel";
import { LoyalCustomers } from "@/components/merchant/loyal-customers";
import { RecentTxPanel } from "@/components/merchant/recent-tx";

interface MerchantPageProps {
  params: Promise<{ mekanId: string }>;
}

export async function generateMetadata({
  params,
}: MerchantPageProps): Promise<Metadata> {
  const { mekanId } = await params;
  const merchant = getDemoMerchant(mekanId);
  return {
    title: `${merchant.name} · Klink Dashboard`,
    description: `${merchant.name} mekanının canlı Klink dashboard'u — ciro, bahşiş havuzu, sadık müşteri.`,
  };
}

export default async function MerchantPage({ params }: MerchantPageProps) {
  const { mekanId } = await params;
  const merchant = getDemoMerchant(mekanId);

  return (
    <main className="relative isolate min-h-dvh bg-bg-mute pb-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 radial-purple" aria-hidden />

      <DashboardHeader merchant={merchant} />

      <div className="mx-auto max-w-7xl px-6 pt-8 md:pt-10">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="BUGÜN CİRO"
            value={merchant.todayRevenue}
            format={(v) => `${Math.round(v).toLocaleString("tr-TR")}₺`}
            sub={`${merchant.todayTxCount} işlem · ${merchant.newCustomersToday} yeni müşteri`}
            accent="purple"
            delay={0}
          />
          <StatCard
            label="HAFTA CİRO"
            value={merchant.weekRevenue}
            format={(v) => `${Math.round(v).toLocaleString("tr-TR")}₺`}
            sub="Mon → Sun"
            delay={0.05}
          />
          <StatCard
            label="BUGÜN BAHŞİŞ"
            value={merchant.todayTipPool}
            format={(v) => `${Math.round(v).toLocaleString("tr-TR")}₺`}
            sub={`${merchant.staff.length} çalışana otomatik`}
            delay={0.1}
          />
          <StatCard
            label="KOMİSYON"
            value={0}
            format={(v) =>
              v === 0 ? "0₺" : `${Math.round(v).toLocaleString("tr-TR")}₺`
            }
            sub="Iyzico %3 yerine sıfır"
            accent="purple"
            delay={0.15}
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <RecentTxPanel merchant={merchant} />
          <TipPoolPanel merchant={merchant} />
        </section>

        <section className="mt-6">
          <LoyalCustomers merchant={merchant} />
        </section>
      </div>
    </main>
  );
}
