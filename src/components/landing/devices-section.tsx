import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconMonitor, IconSmartphone } from "@/components/ui/icons";
import { ProductScreenshot } from "@/components/ui/product-screenshot";
import { SectionViewTracker } from "@/components/lp-google-ads/section-view-tracker";

export function DevicesSection() {
  return (
    <section className="bg-brand-50/50 py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          eyebrow="Onde você já trabalha"
          title="No computador, espaço para planejar. No celular, praticidade para acompanhar."
          description="A mesma conta, sempre sincronizada, direto no navegador — sem instalar nada e sem versão limitada no celular."
        />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink/60">
              <IconMonitor width={18} height={18} />
              Computador
            </p>
            <ProductScreenshot
              src="/images/lp-personal-trainer/home-desktop.png"
              alt="Croniu aberto no computador, com visão completa do dia e do financeiro"
              width={1918}
              height={870}
              sizes="(min-width: 1024px) 611px, calc(100vw - 32px)"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink/60">
              <IconSmartphone width={18} height={18} />
              Celular
            </p>
            <ProductScreenshot
              src="/images/lp-personal-trainer/home-mobile.png"
              alt="Croniu aberto no celular, com o mesmo resumo do dia em versão compacta"
              width={382}
              height={829}
              frame="phone"
              sizes="280px"
            />
          </div>
        </div>
      </Container>
      <SectionViewTracker featureId="home_devices" />
    </section>
  );
}
