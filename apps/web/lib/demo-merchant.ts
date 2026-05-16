/**
 * Mekan dashboard demo verileri.
 * Production'da bu veriler indexer + contract event'lerinden gelir.
 */

export interface StaffRow {
  name: string;
  role: string;
  walletShort: string;
  todayTip: number;
  weekTip: number;
  weight: number; // distribution weight (EQUAL=1, WEIGHTED=variable)
}

export interface LoyalCustomer {
  walletShort: string;
  displayHint: string; // email hint (e.g., "a***@gmail.com")
  visits: number;
  totalSpent: number;
  lastVisit: string;
}

export interface RecentTx {
  id: string;
  ts: string;
  masa: string;
  bill: number;
  tip: number;
  staff: string;
  customer: string;
}

export interface DemoMerchant {
  slug: string;
  name: string;
  district: string;
  cuisineKind: string;
  walletShort: string;
  todayRevenue: number;
  todayTxCount: number;
  newCustomersToday: number;
  todayTipPool: number;
  weekRevenue: number;
  distributionRule: "EQUAL" | "WEIGHTED";
  staff: StaffRow[];
  loyalCustomers: LoyalCustomer[];
  recentTx: RecentTx[];
}

const merchants: Record<string, DemoMerchant> = {
  "kafe-bogaz": {
    slug: "kafe-bogaz",
    name: "Kafe Boğaz",
    district: "Çanakkale Merkez",
    cuisineKind: "Üçüncü dalga kahve",
    walletShort: "0x7Be4…aF21",
    todayRevenue: 4350,
    todayTxCount: 24,
    newCustomersToday: 18,
    todayTipPool: 490,
    weekRevenue: 28_140,
    distributionRule: "EQUAL",
    staff: [
      { name: "Ali", role: "Barmen", walletShort: "0x9A12…cE03", todayTip: 180, weekTip: 1_240, weight: 1 },
      { name: "Ayşe", role: "Garson", walletShort: "0xC4F8…1d97", todayTip: 165, weekTip: 1_080, weight: 1 },
      { name: "Can", role: "Garson", walletShort: "0x33aD…b4e2", todayTip: 145, weekTip: 920, weight: 1 },
    ],
    loyalCustomers: [
      { walletShort: "0x82E1…9b04", displayHint: "b***@gmail.com", visits: 14, totalSpent: 2_180, lastVisit: "bugün 14:32" },
      { walletShort: "0x4Df2…aa55", displayHint: "e***@gmail.com", visits: 11, totalSpent: 1_640, lastVisit: "bugün 13:55" },
      { walletShort: "0x9C28…7715", displayHint: "m***@icloud.com", visits: 9, totalSpent: 1_410, lastVisit: "dün 19:22" },
      { walletShort: "0x1FaB…3c8d", displayHint: "s***@gmail.com", visits: 7, totalSpent: 1_080, lastVisit: "dün 17:05" },
      { walletShort: "0xBe55…d201", displayHint: "k***@yahoo.com", visits: 6, totalSpent: 920, lastVisit: "2 gün önce" },
    ],
    recentTx: [
      { id: "t1", ts: "14:32", masa: "Masa 4", bill: 140, tip: 21, staff: "Ali", customer: "0x82E1…9b04" },
      { id: "t2", ts: "14:30", masa: "Masa 7", bill: 75, tip: 8, staff: "Ayşe", customer: "0x4Df2…aa55" },
      { id: "t3", ts: "14:28", masa: "Masa 2", bill: 210, tip: 32, staff: "Can", customer: "0x9C28…7715" },
      { id: "t4", ts: "14:25", masa: "Masa 1", bill: 95, tip: 14, staff: "Ali", customer: "0x1FaB…3c8d" },
      { id: "t5", ts: "14:22", masa: "Masa 5", bill: 180, tip: 27, staff: "Ayşe", customer: "0xBe55…d201" },
    ],
  },
};

export function getDemoMerchant(slug: string): DemoMerchant {
  return merchants[slug] ?? merchants["kafe-bogaz"];
}
