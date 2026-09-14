import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductScreenshot } from "@/components/ui/product-screenshot";

export function DailyFocusSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Organização do dia"
          eyebrowVariant="progress"
          title="Comece o dia sabendo o que precisa da sua atenção"
          description="Renovações, recebimentos vencidos e atendimentos pendentes — o Croniu junta tudo em uma lista só, por cliente e por prazo, sem você precisar abrir vários lugares para descobrir."
        />

        <ProductScreenshot
          src="/images/lp-personal-trainer/rotinas-dia.png"
          alt="Tela de rotinas do Croniu com pendências atrasadas e próximas, organizadas por cliente e prazo"
          width={1639}
          height={901}
          sizes="(min-width: 1024px) 524px, calc(100vw - 32px)"
        />
      </Container>
    </section>
  );
}
