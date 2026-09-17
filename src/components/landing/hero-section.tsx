import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { IconArrowRight } from "@/components/ui/icons";
import { registerUrl, siteConfig } from "@/lib/site";
import { AppCtaLink } from "./app-cta-link";
import { WorkspaceHomeDemo } from "./demos/workspace-home-demo";

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-navy-950 pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-navy-800 via-navy-950 to-navy-950"
      />
      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-10">
        <div className="flex flex-col gap-6">
          <Badge variant="ai" className="w-fit">
            Croniu Workspace
          </Badge>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Sua rotina profissional, sob controle.
          </h1>

          <p className="max-w-xl text-lg text-white/70">
            Organize clientes, agenda, ciclos, avaliações e recebimentos em um único workspace.
          </p>

          <p className="max-w-xl text-base text-white/50">Seus clientes. Sua rotina. Tudo em um só lugar.</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <AppCtaLink
              href={registerUrl}
              intent="register"
              ctaName="comecar_gratis_7_dias"
              ctaLocation="hero"
              size="lg"
            >
              Começar grátis
              <IconArrowRight width={18} height={18} />
            </AppCtaLink>
          </div>

          <p className="text-sm text-white/45">
            {siteConfig.trialDays} dias grátis. Sem cartão de crédito.
          </p>
        </div>

        <WorkspaceHomeDemo priority sizes="(min-width: 1024px) 680px, calc(100vw - 32px)" />
      </Container>
    </section>
  );
}
