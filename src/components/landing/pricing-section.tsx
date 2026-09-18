import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconCheck } from "@/components/ui/icons";
import { AppCtaLink } from "@/components/landing/app-cta-link";
import { PricingViewTracker } from "@/components/landing/pricing-view-tracker";
import { formatPriceBRL, registerUrl, siteConfig } from "@/lib/site";

const INCLUDED_ITEMS = [
  "Clientes ilimitados — o preço não sobe conforme sua base cresce",
  "Agenda diária e resumo de prioridades",
  "Ciclos, renovações e recebimentos organizados",
  "Portal de acompanhamento para seus clientes",
  "Assistente de IA para consultar e agir na sua operação",
];

export function PricingSection() {
  return (
    <section id="preco" className="py-20 sm:py-28">
      <PricingViewTracker />
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Preço simples"
          title="Um plano, sem letras miúdas"
          description={`Teste grátis por ${siteConfig.trialDays} dias, sem cartão de crédito. Depois, ${formatPriceBRL()} por mês — não importa quantos clientes você atenda.`}
        />

        <div className="mx-auto grid w-full max-w-4xl gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div className="flex flex-col gap-6 rounded-3xl border border-brand-200 bg-white p-8 shadow-lg sm:p-10">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-brand-700">Plano Croniu</p>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold text-ink">{formatPriceBRL()}</span>
                <span className="text-ink/60">/mês</span>
              </div>
              <p className="text-sm text-ink/60">
                Primeiros {siteConfig.trialDays} dias grátis. Cancele quando quiser.
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {INCLUDED_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
                  <IconCheck className="mt-0.5 shrink-0 text-progress-600" width={18} height={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <AppCtaLink
              href={registerUrl}
              intent="register"
              ctaName="comecar_gratis_planos"
              ctaLocation="pricing"
              size="lg"
              className="w-full"
            >
              Começar grátis
            </AppCtaLink>
            <p className="text-center text-xs text-ink/50">
              Sem cartão de crédito para começar. Pagamento processado com segurança pela Asaas — seus
              dados de cartão nunca passam pelos nossos servidores.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <blockquote className="rounded-2xl border border-ink/10 bg-white p-8">
              <p className="font-display text-2xl text-ink">&ldquo;Layout prático e organizado.&rdquo;</p>
              <footer className="mt-3 text-sm text-ink/50">Feedback de personal trainer</footer>
            </blockquote>
          </div>
        </div>
      </Container>
    </section>
  );
}
