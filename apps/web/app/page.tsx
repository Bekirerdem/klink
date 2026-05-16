import { SiteNav } from "@/components/site/site-nav";
import { Hero } from "@/components/site/hero";
import { MostActiveMerchants } from "@/components/site/most-active-merchants";
import { PowerTheMerchant } from "@/components/site/power-the-merchant";
import { DarkLiveNetwork } from "@/components/site/dark-live-network";
import { CtaBand } from "@/components/site/cta-band";
import { SiteFooter } from "@/components/site/site-footer";

export default function HomePage() {
  return (
    <main className="relative">
      <SiteNav />
      <Hero />
      <MostActiveMerchants />
      <PowerTheMerchant />
      <DarkLiveNetwork />
      <CtaBand />
      <SiteFooter />
    </main>
  );
}
