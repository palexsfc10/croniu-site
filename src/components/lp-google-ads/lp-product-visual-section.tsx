import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductScreenshot } from "./product-screenshot";
import { SectionViewTracker } from "./section-view-tracker";

export function LpProductVisualSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="O produto, sem enrolação"
          title="O Croniu, do jeito que ele é"
          description="Nada de simulação: essa é a tela inicial real do Croniu, mostrando o que precisa da sua atenção assim que você entra."
        />
        <ProductScreenshot
          src="/images/lp-personal-trainer/home-desktop.png"
          alt="Tela inicial do Croniu mostrando itens que precisam de decisão, financeiro do mês e próximo compromisso"
          width={1918}
          height={907}
          priority
        />
        <SectionViewTracker featureId="lp_ads_visual" />
      </Container>
    </section>
  );
}
