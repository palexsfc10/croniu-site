import { BrandWordmark } from "@/components/brand";
import { Container } from "@/components/ui/container";
import { AppCtaLink } from "@/components/landing/app-cta-link";
import { registerUrl } from "@/lib/site";

/** Minimal header for the Google Ads landing page: no nav menu, no /login link — a single path to conversion. */
export function LpHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-bg/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <span className="flex items-baseline gap-1.5">
          <BrandWordmark size="md" />
          <span className="hidden text-sm font-medium text-ink/40 sm:inline">Workspace</span>
        </span>
        <AppCtaLink
          href={registerUrl}
          intent="register"
          ctaName="comecar_gratis_header"
          ctaLocation="lp_ads_header"
          variant="primary"
          size="md"
        >
          Começar grátis
        </AppCtaLink>
      </Container>
    </header>
  );
}
