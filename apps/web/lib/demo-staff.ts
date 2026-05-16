/**
 * Çalışan (staff) dashboard demo verileri.
 */

export interface StaffTipEntry {
  id: string;
  ts: string;
  merchant: string;
  masa: string;
  bill: number;
  tip: number;
}

export interface DemoStaffProfile {
  name: string;
  role: string;
  merchant: string;
  walletShort: string;
  todayTip: number;
  weekTip: number;
  monthTip: number;
  weekShifts: number;
  recent: StaffTipEntry[];
}

export const demoStaff: DemoStaffProfile = {
  name: "Ali",
  role: "Barmen",
  merchant: "Kafe Boğaz",
  walletShort: "0x9A12…cE03",
  todayTip: 180,
  weekTip: 1_240,
  monthTip: 4_850,
  weekShifts: 5,
  recent: [
    { id: "s1", ts: "14:32", merchant: "Kafe Boğaz", masa: "Masa 4", bill: 140, tip: 21 },
    { id: "s2", ts: "14:25", merchant: "Kafe Boğaz", masa: "Masa 1", bill: 95, tip: 14 },
    { id: "s3", ts: "13:48", merchant: "Kafe Boğaz", masa: "Masa 6", bill: 175, tip: 18 },
    { id: "s4", ts: "13:22", merchant: "Kafe Boğaz", masa: "Masa 3", bill: 110, tip: 11 },
    { id: "s5", ts: "12:55", merchant: "Kafe Boğaz", masa: "Masa 5", bill: 95, tip: 9 },
    { id: "s6", ts: "12:30", merchant: "Kafe Boğaz", masa: "Masa 2", bill: 240, tip: 36 },
  ],
};
