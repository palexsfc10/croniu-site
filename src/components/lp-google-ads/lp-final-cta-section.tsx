import { Container } from "@/components/ui/container";
import { IconArrowRight } from "@/components/ui/icons";
import { AppCtaLink } from "@/components/landing/app-cta-link";
import { registerUrl, siteConfig } from "@/lib/site";

export function LpFinalCtaSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-gradient-to-br from-ink to-brand-800 px-6 py-16 text-center text-white sm:px-12">
          <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Comece a organizar a sua agenda hoje
          </h2>
          <p className="max-w-xl text-white/70">
            {siteConfig.trialDays} dias grátis, sem cartão de crédito. Cadastre seus primeiros alunos
            em minutos.
          </p>
          <AppCtaLink
            href={registerUrl}
            intent="register"
            ctaName="comecar_gratis_final"
            ctaLocation="lp_ads_final_cta"
            variant="secondary"
            size="lg"
          >
            Começar grátis por {siteConfig.trialDays} dias
            <IconArrowRight width={18} height={18} />
          </AppCtaLink>
        </div>
      </Container>
    </section>
  );
}
