import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { HeroSection } from "@/components/landing/hero-section";
import { PainBeforeAfterSection } from "@/components/landing/pain-before-after-section";
import { AiDarkSection } from "@/components/landing/ai-dark-section";
import { DailyFocusSection } from "@/components/landing/daily-focus-section";
import { FeaturesBentoSection } from "@/components/landing/features-bento-section";
import { AudienceSection } from "@/components/landing/audience-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ClientPortalSection } from "@/components/landing/client-portal-section";
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
        <AiDarkSection />
        <DailyFocusSection />
        <FeaturesBentoSection />
        <AudienceSection />
        <HowItWorksSection />
        <ClientPortalSection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
