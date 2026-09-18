import { BrandWordmark } from "@/components/brand";
import { Container } from "@/components/ui/container";
import { AppCtaLink } from "@/components/landing/app-cta-link";
import { registerUrl } from "@/lib/site";

/** Minimal header for the Google Ads landing page: no nav menu, no /login link — a single path to conversion. */
export function LpHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <span className="flex items-baseline gap-1.5">
          <BrandWordmark size="md" tone="dark" />
          <span className="text-xs font-medium text-white/40 sm:text-sm">Workspace</span>
        </span>
        <AppCtaLink
          href={registerUrl}
          intent="register"
          ctaName="testar_gratis_header"
          ctaLocation="lp_ads_header"
          variant="primary"
          size="md"
        >
          Testar grátis
        </AppCtaLink>
      </Container>
    </header>
  );
}
