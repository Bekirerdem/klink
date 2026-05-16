import type { Metadata } from "next";
import { getDemoBill } from "@/lib/demo-data";
import { PayFlow } from "@/components/pay/pay-flow";

interface PayPageProps {
  params: Promise<{ masaId: string }>;
}

export async function generateMetadata({ params }: PayPageProps): Promise<Metadata> {
  const { masaId } = await params;
  const bill = getDemoBill(masaId);
  return {
    title: `${bill.merchantName} · ${bill.masa} · Klink`,
    description: `${bill.merchantName} adisyonunu Klink ile cüzdansız öde. Bahşiş ${bill.staff.name} cüzdanına anlık.`,
  };
}

export default async function PayPage({ params }: PayPageProps) {
  const { masaId } = await params;
  const bill = getDemoBill(masaId);

  return (
    <main className="relative isolate min-h-dvh overflow-hidden bg-bg-mute">
      {/* Watermark + radial glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 radial-purple opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20 dot-grid opacity-40"
        aria-hidden
      />

      <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center px-4 py-10 md:py-16">
        <PayFlow bill={bill} />
      </div>
    </main>
  );
}
