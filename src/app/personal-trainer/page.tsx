import type { Metadata } from "next";
import { LpHeader } from "@/components/lp-google-ads/lp-header";
import { LpHeroSection } from "@/components/lp-google-ads/lp-hero-section";
import { LpFragmentedSection } from "@/components/lp-google-ads/lp-fragmented-section";
import { LpProductShowcaseSection } from "@/components/lp-google-ads/lp-product-showcase-section";
import { LpAssistantSection } from "@/components/lp-google-ads/lp-assistant-section";
import { LpDevicesSection } from "@/components/lp-google-ads/lp-devices-section";
import { LpStepsSection } from "@/components/lp-google-ads/lp-steps-section";
import { LpFaqSection } from "@/components/lp-google-ads/lp-faq-section";
import { LpFinalCtaSection } from "@/components/lp-google-ads/lp-final-cta-section";
import { LpStickyCtaBar } from "@/components/lp-google-ads/lp-sticky-cta-bar";
import { LpFooter } from "@/components/lp-google-ads/lp-footer";

export const metadata: Metadata = {
  title: "Sistema para personal trainer: agenda, alunos e renovações organizados",
  description:
    "Chega de espalhar sua rotina entre WhatsApp, planilhas e agenda. O Croniu centraliza alunos, ciclos, renovações e recebimentos num único workspace, com a Cronia ajudando a decidir o que fazer primeiro. 7 dias grátis, sem cartão de crédito.",
  alternates: {
    canonical: "/personal-trainer",
  },
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Sete blocos, mesma espinha dorsal da home institucional com copy própria
 * de personal trainer:
 * 1. Solução imediata — LpHeroSection
 * 2. Rotina fragmentada → virada para o Croniu — LpFragmentedSection
 * 3. Demonstrações do produto — LpProductShowcaseSection
 * 4. Cronia — LpAssistantSection
 * 5. Computador e celular — LpDevicesSection
 * 6. Como começar + dúvidas + CTA final — Steps, Faq, FinalCta
 */
export default function PersonalTrainerLpPage() {
  return (
    <>
      <LpHeader />
      <div className="pb-20 lg:pb-0">
        <main>
          <LpHeroSection />
          <LpFragmentedSection />
          <LpProductShowcaseSection />
          <LpAssistantSection />
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
