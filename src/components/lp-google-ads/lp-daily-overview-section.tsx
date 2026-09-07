import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductScreenshot } from "./product-screenshot";

export function LpDailyOverviewSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Organização do dia"
          eyebrowVariant="progress"
          title="Uma lista clara do que precisa de decisão hoje"
          description="Planos vencidos, avaliações pendentes, rotinas atrasadas: o Croniu junta tudo isso em uma lista só, por cliente e por prazo — sem você precisar abrir vários lugares para descobrir."
        />
        <ProductScreenshot
          src="/images/lp-personal-trainer/rotinas-dia.png"
          alt="Tela de rotinas do Croniu com pendências atrasadas e próximas, organizadas por aluno e prazo"
          width={1639}
          height={901}
          sizes="(min-width: 1024px) 524px, calc(100vw - 32px)"
        />
      </Container>
    </section>
  );
}
