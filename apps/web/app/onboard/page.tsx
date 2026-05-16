import type { Metadata } from "next";
import { OnboardFlow } from "@/components/onboard/onboard-flow";

export const metadata: Metadata = {
  title: "Mekanım için Klink · Onboarding",
  description: "4 adımda Klink'i mekanın için kur — cüzdan, işletme bilgisi, bahşiş kuralı, masa QR'ları.",
};

export default function OnboardPage() {
  return <OnboardFlow />;
}
