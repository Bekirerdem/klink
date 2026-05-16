import type { Metadata } from "next";
import { StaffDashboard } from "@/components/staff/staff-dashboard";

export const metadata: Metadata = {
  title: "Bahşişim · Klink",
  description: "Klink çalışan paneli — bugünkü bahşiş, hafta/ay özeti ve BtcTurk off-ramp.",
};

export default function StaffPage() {
  return <StaffDashboard />;
}
