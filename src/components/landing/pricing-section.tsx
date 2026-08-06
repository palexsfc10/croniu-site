import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconCheck } from "@/components/ui/icons";
import { formatPriceBRL, registerUrl, siteConfig } from "@/lib/site";

const INCLUDED_ITEMS = [
  "Clientes, ciclos e serviços ilimitados",
  "Agenda diária e resumo de prioridades",
  "Recebimentos e controle de renovações",
  "Portal de acompanhamento para seus clientes",
  "Assistente de IA para consultar sua operação",
];

export function PricingSection() {
  return (
    <section id="preco" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Preço simples"
          title="Um plano, sem letras miúdas"
          description={`Teste grátis por ${siteConfig.trialDays} dias, sem cartão de crédito. Depois, ${formatPriceBRL()} por mês.`}
        />

        <div className="mx-auto flex w-full max-w-lg flex-col gap-6 rounded-3xl border border-brand-200 bg-white p-8 shadow-lg sm:p-10">
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

          <Button href={registerUrl} size="lg" className="w-full">
            Começar grátis por {siteConfig.trialDays} dias
          </Button>
          <p className="text-center text-xs text-ink/50">Sem cartão de crédito para começar.</p>
        </div>
      </Container>
    </section>
  );
}
