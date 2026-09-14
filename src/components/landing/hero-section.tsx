import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { IconArrowRight } from "@/components/ui/icons";
import { ProductScreenshot } from "@/components/ui/product-screenshot";
import { registerUrl, siteConfig } from "@/lib/site";
import { AppCtaLink } from "./app-cta-link";
import { HeroSecondaryCta } from "./hero-secondary-cta";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-brand-50 via-bg to-bg"
      />
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
        <div className="flex flex-col gap-6">
          <Badge variant="ai">
            <span aria-hidden="true">✦</span> Assistente de IA incluído
          </Badge>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            Seu dia já é cheio. Organizar tudo não precisa ocupar o resto dele.
          </h1>

          <p className="max-w-xl text-lg text-ink/70">
            Clientes, agenda e recebimentos em um só lugar, com uma IA que consulta sua operação e
            ajuda no dia a dia — no computador e no celular.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <AppCtaLink
              href={registerUrl}
              intent="register"
              ctaName="comecar_gratis_7_dias"
              ctaLocation="hero"
              size="lg"
            >
              Teste grátis por {siteConfig.trialDays} dias
              <IconArrowRight width={18} height={18} />
            </AppCtaLink>
            <HeroSecondaryCta
              href="#como-funciona"
              ctaName="ver_como_funciona"
              ctaLocation="hero"
              variant="secondary"
              size="lg"
            >
              Veja como funciona
            </HeroSecondaryCta>
          </div>

          <p className="text-sm text-ink/50">Sem cartão de crédito no cadastro.</p>
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
      </Container>
    </section>
  );
}
