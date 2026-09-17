import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { IconArrowRight } from "@/components/ui/icons";
import { AppCtaLink } from "@/components/landing/app-cta-link";
import { WorkspaceHomeEditorial } from "@/components/landing/demos/workspace-home-editorial";
import { registerUrl, siteConfig } from "@/lib/site";

/**
 * Continuidade com a campanha Meta/Google Ads: paleta escura, dor da rotina
 * espalhada, prova em tela real, CTA único de teste grátis. A composição é
 * baseada na Home real do croniu-app (WorkspaceHomeEditorial, mesma usada na
 * home institucional) — a prova em screenshot completo vem nas seções
 * abaixo (ClientRecordDemo, AgendaCycleDemo, ResponsiveWorkspaceDemo).
 */
export function LpHeroSection() {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-navy-800 via-navy-950 to-navy-950"
      />
      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10">
        <div className="flex flex-col gap-6">
          <Badge variant="ai" className="w-fit">
            GESTÃO PARA PERSONAL TRAINERS
          </Badge>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.1rem] lg:leading-[1.1]">
            Você cuida dos seus alunos. O Croniu organiza o restante.
          </h1>

          <p className="max-w-xl text-lg text-white/70">
            Centralize alunos, agenda, ciclos, avaliações e recebimentos em um único workspace — no
            computador ou no celular.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <AppCtaLink
              href={registerUrl}
              intent="register"
              ctaName="testar_gratis_7_dias"
              ctaLocation="lp_ads_hero"
              size="lg"
            >
              Testar grátis
              <IconArrowRight width={18} height={18} />
            </AppCtaLink>
          </div>

          <p className="text-sm text-white/45">
            {siteConfig.trialDays} dias grátis. Sem cartão de crédito.
          </p>
        </div>

        <WorkspaceHomeEditorial className="croniu-rise-in" />
      </Container>
    </section>
  );
}
