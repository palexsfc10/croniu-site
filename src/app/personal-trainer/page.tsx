import type { Metadata } from "next";
import { LpHeader } from "@/components/lp-google-ads/lp-header";
import { LpHeroSection } from "@/components/lp-google-ads/lp-hero-section";
import { LpProductVisualSection } from "@/components/lp-google-ads/lp-product-visual-section";
import { LpProblemsSection } from "@/components/lp-google-ads/lp-problems-section";
import { LpDailyOverviewSection } from "@/components/lp-google-ads/lp-daily-overview-section";
import { LpAssistantSection } from "@/components/lp-google-ads/lp-assistant-section";
import { LpManagementSection } from "@/components/lp-google-ads/lp-management-section";
import { LpDevicesSection } from "@/components/lp-google-ads/lp-devices-section";
import { LpStepsSection } from "@/components/lp-google-ads/lp-steps-section";
import { LpFaqSection } from "@/components/lp-google-ads/lp-faq-section";
import { LpFinalCtaSection } from "@/components/lp-google-ads/lp-final-cta-section";
import { LpStickyCtaBar } from "@/components/lp-google-ads/lp-sticky-cta-bar";
import { LpFooter } from "@/components/lp-google-ads/lp-footer";

export const metadata: Metadata = {
  title: "Para personal trainers: organize agenda, ciclos e renovações",
  description:
    "O Croniu mostra todo dia o que precisa da sua atenção — renovações, recebimentos e agenda dos seus alunos — e a Cronia ajuda você a resolver, sempre com sua confirmação antes de agir.",
  alternates: {
    canonical: "/personal-trainer",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PersonalTrainerLpPage() {
  return (
    <>
      <LpHeader />
      <div className="pb-20 lg:pb-0">
        <main>
          <LpHeroSection />
          <LpProductVisualSection />
          <LpProblemsSection />
          <LpDailyOverviewSection />
          <LpAssistantSection />
          <LpManagementSection />
          <LpDevicesSection />
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
