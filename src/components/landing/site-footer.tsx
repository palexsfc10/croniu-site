import Link from "next/link";
import { BrandWordmark } from "@/components/brand";
import { Container } from "@/components/ui/container";
import { currentYear, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <BrandWordmark size="sm" />
          <p className="text-sm text-ink/60">
            &copy; {currentYear()} Croniu. Um produto da NTWS Labs.
          </p>
        </div>

        <nav aria-label="Links legais" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/70">
          <Link href="/privacidade" className="hover:text-ink">
            Privacidade
          </Link>
          <Link href="/termos" className="hover:text-ink">
            Termos de uso
          </Link>
          {siteConfig.supportEmail ? (
            <a href={`mailto:${siteConfig.supportEmail}`} className="hover:text-ink">
              {siteConfig.supportEmail}
            </a>
          ) : null}
        </nav>
      </Container>
    </footer>
  );
}
