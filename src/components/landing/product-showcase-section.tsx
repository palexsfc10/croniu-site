import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionViewTracker } from "@/components/lp-google-ads/section-view-tracker";
import { ClientRecordDemo } from "./demos/client-record-demo";
import { AgendaCycleDemo } from "./demos/agenda-cycle-demo";

export function ProductShowcaseSection() {
  return (
    <section id="produto" className="scroll-mt-24 py-20 sm:py-28">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="O produto, sem enrolação"
          title="Telas reais, do jeito que você vai usar todo dia"
          description="A interface real do Croniu, com dados fictícios criados só para esta demonstração."
        />

        <ClientRecordDemo />
        <AgendaCycleDemo />
      </Container>
      <SectionViewTracker featureId="home_product_showcase" />
    </section>
  );
}
