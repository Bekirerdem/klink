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
  staff: { name: string; role: string };
  lines: BillLine[];
}

const billLibrary: Record<string, DemoBill> = {
  demo: {
    masa: "Masa 4",
    bar: "Kafe Boğaz · Çanakkale",
    merchantName: "Kafe Boğaz",
    merchantSlug: "kafe-bogaz",
    staff: { name: "Ali", role: "Barmen" },
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
    staff: { name: "Ayşe", role: "Garson" },
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
