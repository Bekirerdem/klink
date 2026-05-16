import { SiteNav } from "@/components/site/site-nav";
import { Hero } from "@/components/site/hero";
import { StatsStrip } from "@/components/site/stats-strip";
import { SolutionCards } from "@/components/site/solution-cards";
import { HowItWorks } from "@/components/site/how-it-works";
import { LiveFeed } from "@/components/site/live-feed";
import { MerchantMarquee } from "@/components/site/merchant-marquee";
import { Trilemma } from "@/components/site/trilemma";
import { CtaBand } from "@/components/site/cta-band";
import { SiteFooter } from "@/components/site/site-footer";

export default function HomePage() {
  return (
    <main className="relative">
      <SiteNav />
      <Hero />
      <StatsStrip />
      <SolutionCards />
      <HowItWorks />
      <LiveFeed />
      <MerchantMarquee />
      <Trilemma />
      <CtaBand />
      <SiteFooter />
    </main>
  );
}
