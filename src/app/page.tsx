import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { HeroSection } from "@/components/landing/hero-section";
import { PainBeforeAfterSection } from "@/components/landing/pain-before-after-section";
import { DailyFocusSection } from "@/components/landing/daily-focus-section";
import { ClientPortalSection } from "@/components/landing/client-portal-section";
import { FinancialSection } from "@/components/landing/financial-section";
import { ManagementSection } from "@/components/landing/management-section";
import { AiDarkSection } from "@/components/landing/ai-dark-section";
import { DevicesSection } from "@/components/landing/devices-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { FinalCtaSection } from "@/components/landing/final-cta-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <PainBeforeAfterSection />
        <DailyFocusSection />
        <ClientPortalSection />
        <FinancialSection />
        <ManagementSection />
        <AiDarkSection />
        <DevicesSection />
        <AudienceSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
