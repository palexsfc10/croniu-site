import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { IconArrowRight } from "@/components/ui/icons";
import { AppCtaLink } from "@/components/landing/app-cta-link";
import { AiChatDemo } from "@/components/landing/ai-chat-demo";
import { registerUrl, siteConfig } from "@/lib/site";

export function LpHeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-brand-50 via-bg to-bg"
      />
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-10">
        <div className="flex flex-col gap-6">
          <Badge variant="brand">Para personal trainers com 15 a 60 alunos</Badge>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.1rem] lg:leading-[1.1]">
            Chega de perder o controle da agenda, das renovações e dos recebimentos dos seus alunos
          </h1>

          <p className="max-w-xl text-lg text-ink/70">
            O Croniu mostra todo dia o que precisa da sua atenção — quem renovar, quem cobrar, quem
            atender — e a Cronia ajuda você a resolver, sempre pedindo sua confirmação antes de
            qualquer ação.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <AppCtaLink
              href={registerUrl}
              intent="register"
              ctaName="comecar_gratis_7_dias"
              ctaLocation="lp_ads_hero"
              size="lg"
            >
              Começar grátis por {siteConfig.trialDays} dias
              <IconArrowRight width={18} height={18} />
            </AppCtaLink>
          </div>

          <p className="text-sm text-ink/50">Sem cartão de crédito. Funciona no computador e no celular.</p>
        </div>

        <AiChatDemo
          exchanges={[
            {
              question: "Quais alunos têm ciclo terminando essa semana?",
              answer:
                "3 ciclos terminam até domingo: Marina Alves (3 dias), João Pedro (5 dias) e Clara Nunes (6 dias). Quer que eu prepare a renovação de algum deles?",
            },
          ]}
        />
      </Container>
    </section>
  );
}
