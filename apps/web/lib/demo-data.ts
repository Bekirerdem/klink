/**
 * Hackathon demo verileri.
 *
 * Production'da bunlar merchant onboarding flow'undan ve `/m/[mekanId]`
 * admin dashboard'undan üretilir. Demo'da statik mock — masaId'ye göre
 * adisyon, masa numarası, mekan bilgisi seç.
 */

export interface BillLine {
  name: string;
  qty: number;
  price: number; // TL cinsinden, kuruşsuz
}

export interface DemoBill {
  masa: string;
  bar: string;
  merchantName: string;
  merchantSlug: string;
  merchantAddress: `0x${string}`;
  staff: { name: string; role: string; address: `0x${string}` };
  lines: BillLine[];
}

/**
 * Demo merchant cüzdanı — hackathon scope'unda Bekir'in deploy wallet'ı
 * hem mekan hem staff olarak rol oynuyor. Production'da bunlar onboarding
 * flow'unda ayrı kayıt edilir.
 */
const DEMO_MERCHANT_ADDRESS = "0x39AEfbC8388da12907A21d9De888B288a9fa5794" as const;

const billLibrary: Record<string, DemoBill> = {
  demo: {
    masa: "Masa 4",
    bar: "Kafe Boğaz · Çanakkale",
    merchantName: "Kafe Boğaz",
    merchantSlug: "kafe-bogaz",
    merchantAddress: DEMO_MERCHANT_ADDRESS,
    staff: { name: "Ali", role: "Barmen", address: DEMO_MERCHANT_ADDRESS },
    lines: [
      { name: "Espresso", qty: 2, price: 30 },
      { name: "Cheesecake", qty: 1, price: 80 },
      { name: "Filtre kahve", qty: 1, price: 20 },
    ],
  },
  "demo-2": {
    masa: "Masa 7",
    bar: "Bar Asit · Çanakkale",
    merchantName: "Bar Asit",
    merchantSlug: "bar-asit",
    merchantAddress: DEMO_MERCHANT_ADDRESS,
    staff: { name: "Ayşe", role: "Garson", address: DEMO_MERCHANT_ADDRESS },
    lines: [
      { name: "Negroni", qty: 2, price: 180 },
      { name: "Karışık meze", qty: 1, price: 140 },
    ],
  },
};

export function getDemoBill(masaId: string): DemoBill {
  return billLibrary[masaId] ?? billLibrary.demo;
}

export function billTotal(bill: DemoBill): number {
  return bill.lines.reduce((sum, l) => sum + l.qty * l.price, 0);
}
