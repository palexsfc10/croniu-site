import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FragmentedRoutineSection } from "@/components/landing/fragmented-routine-section";
import { ProductShowcaseSection } from "@/components/landing/product-showcase-section";
import { AiDarkSection } from "@/components/landing/ai-dark-section";
import { DevicesSection } from "@/components/landing/devices-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";

/**
 * Sete blocos narrativos: solução imediata (hero) → rotina fragmentada →
 * virada para o Croniu (mesma seção, ScatteredRoutineDemo) → demonstrações
 * do produto → Cronia → computador/celular → prova, oferta e CTA final.
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <FragmentedRoutineSection />
        <ProductShowcaseSection />
        <AiDarkSection />
        <DevicesSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
