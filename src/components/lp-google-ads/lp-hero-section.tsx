import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { IconArrowRight, IconCalendar, IconMessageCircle, IconSpreadsheet } from "@/components/ui/icons";
import { AppCtaLink } from "@/components/landing/app-cta-link";
import { registerUrl, siteConfig } from "@/lib/site";
import { ProductScreenshot } from "./product-screenshot";

/**
 * First-fold continuity with the Meta Ads campaign: the ad's pain point
 * ("trabalho espalhado entre WhatsApp, planilhas e agenda") is the H1 here,
 * word for word — no bridge copy, no re-introduction. The visual is real
 * product screenshots (never a recreated dashboard); the AI conversation
 * demo that used to live here moved to LpAssistantSection, further down the
 * page, once the centralizing-tool promise has already landed.
 */
export function LpHeroSection() {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-brand-50 via-bg to-bg"
      />
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-10">
        <div className="flex flex-col gap-6">
          <Badge variant="brand">PARA PERSONAL TRAINERS</Badge>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.1rem] lg:leading-[1.1]">
            Seu trabalho está espalhado entre WhatsApp, planilhas e agenda?
          </h1>

          <p className="max-w-xl text-lg text-ink/70">
            Centralize sua rotina e acompanhe cada aluno com mais clareza.
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

        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-ink/50 lg:justify-start">
            <span className="flex items-center gap-1.5">
              <IconMessageCircle width={16} height={16} />
              WhatsApp
            </span>
            <span aria-hidden="true" className="text-ink/30">
              +
            </span>
            <span className="flex items-center gap-1.5">
              <IconSpreadsheet width={16} height={16} />
              Planilhas
            </span>
            <span aria-hidden="true" className="text-ink/30">
              +
            </span>
            <span className="flex items-center gap-1.5">
              <IconCalendar width={16} height={16} />
              Agenda
            </span>
            <IconArrowRight aria-hidden="true" width={16} height={16} className="text-ink/30" />
            <span className="font-display font-semibold text-brand-700">Croniu</span>
          </div>

          <div className="flex flex-col gap-5">
            <ProductScreenshot
              src="/images/lp-personal-trainer/home-desktop.png"
              alt="Tela inicial do Croniu no computador, com os itens do dia, financeiro e próximos compromissos"
              width={1918}
              height={870}
              sizes="(min-width: 1024px) 560px, calc(100vw - 32px)"
              priority
            />
            <div className="mx-auto w-full max-w-[220px] sm:max-w-[240px]">
              <ProductScreenshot
                src="/images/lp-personal-trainer/home-mobile.png"
                alt="Tela inicial do Croniu no celular, com o mesmo resumo do dia em versão compacta"
                width={382}
                height={829}
                frame="phone"
                sizes="240px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
