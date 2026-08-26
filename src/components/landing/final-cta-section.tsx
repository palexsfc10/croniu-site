import { Container } from "@/components/ui/container";
import { IconArrowRight } from "@/components/ui/icons";
import { AppCtaLink } from "@/components/landing/app-cta-link";
import { registerUrl, siteConfig } from "@/lib/site";

export function FinalCtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-ink to-brand-800 px-6 py-16 text-center text-white sm:px-12">
          <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Comece a organizar sua rotina hoje
          </h2>
          <p className="max-w-xl text-white/70">
            {siteConfig.trialDays} dias grátis, sem cartão de crédito. Configure seus primeiros
            clientes em minutos.
          </p>
          <AppCtaLink
            href={registerUrl}
            intent="register"
            ctaName="comecar_gratis_final"
            ctaLocation="final_cta"
            size="lg"
            className="bg-white text-ink hover:bg-white/90"
          >
            Começar grátis por {siteConfig.trialDays} dias
            <IconArrowRight width={18} height={18} />
          </AppCtaLink>
        </div>
      </Container>
    </section>
  );
}
