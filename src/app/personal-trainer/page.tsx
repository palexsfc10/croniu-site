import type { Metadata } from "next";
import { LpHeader } from "@/components/lp-google-ads/lp-header";
import { LpHeroSection } from "@/components/lp-google-ads/lp-hero-section";
import { LpConsolidationSection } from "@/components/lp-google-ads/lp-consolidation-section";
import { LpProductVisualSection } from "@/components/lp-google-ads/lp-product-visual-section";
import { LpProblemsSection } from "@/components/lp-google-ads/lp-problems-section";
import { LpDailyOverviewSection } from "@/components/lp-google-ads/lp-daily-overview-section";
import { LpManagementSection } from "@/components/lp-google-ads/lp-management-section";
import { LpDevicesSection } from "@/components/lp-google-ads/lp-devices-section";
import { LpAssistantSection } from "@/components/lp-google-ads/lp-assistant-section";
import { LpStepsSection } from "@/components/lp-google-ads/lp-steps-section";
import { LpFaqSection } from "@/components/lp-google-ads/lp-faq-section";
import { LpFinalCtaSection } from "@/components/lp-google-ads/lp-final-cta-section";
import { LpStickyCtaBar } from "@/components/lp-google-ads/lp-sticky-cta-bar";
import { LpFooter } from "@/components/lp-google-ads/lp-footer";

export const metadata: Metadata = {
  title: "Sistema para personal trainer: agenda, alunos e renovações organizados",
  description:
    "Chega de espalhar sua rotina entre WhatsApp, planilhas e agenda. O Croniu é o aplicativo para personal trainer que centraliza a organização de alunos, ciclos, renovações e recebimentos — com a Cronia ajudando você a resolver, sempre com sua confirmação antes de agir.",
  alternates: {
    canonical: "/personal-trainer",
  },
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Narrative order (matches the Meta Ads campaign's pain point directly in
 * the hero, then builds the case before asking for the trial):
 * 1. Dor concreta — LpHeroSection
 * 2. Croniu como solução centralizadora — LpConsolidationSection
 * 3. Telas reais como prova — LpProductVisualSection
 * 4. Benefícios e transformação da rotina — Problems, DailyOverview,
 *    Management, Devices
 * 5. Cronia/IA como diferencial — LpAssistantSection (moved down from its
 *    previous slot right after the hero)
 * 6. Teste grátis — Steps, Faq, FinalCta
 */
export default function PersonalTrainerLpPage() {
  return (
    <>
      <LpHeader />
      <div className="pb-20 lg:pb-0">
        <main>
          <LpHeroSection />
          <LpConsolidationSection />
          <LpProductVisualSection />
          <LpProblemsSection />
          <LpDailyOverviewSection />
          <LpManagementSection />
          <LpDevicesSection />
          <LpAssistantSection />
          <LpStepsSection />
          <LpFaqSection />
          <LpFinalCtaSection />
        </main>
        <LpFooter />
      </div>
      <LpStickyCtaBar />
    </>
  );
}
