import Link from "next/link";
import { BrandWordmark } from "@/components/brand";
import { Container } from "@/components/ui/container";
import { CookiePreferencesLink } from "@/components/analytics/cookie-preferences-link";
import { currentYear, siteConfig } from "@/lib/site";

/**
 * LP-only footer: same legal links as SiteFooter, but without the MEI/CNPJ/
 * address identification line — kept out of this campaign page on request.
 * SiteFooter (used by the home page and elsewhere) is untouched.
 */
export function LpFooter() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <Container className="flex flex-col gap-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <BrandWordmark size="sm" />
            <p className="text-sm text-ink/60">
              &copy; {currentYear()} Croniu &middot; Todos os direitos reservados
            </p>
          </div>

          <nav
            aria-label="Links legais"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/70"
          >
            <Link href="/privacidade" className="hover:text-ink">
              Privacidade
            </Link>
            <Link href="/termos" className="hover:text-ink">
              Termos de uso
            </Link>
            <CookiePreferencesLink />
            {siteConfig.supportEmail ? (
              <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-ink">
                {siteConfig.supportEmail}
              </a>
            ) : null}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
