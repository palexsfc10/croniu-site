import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ClientRecordDemo } from "@/components/landing/demos/client-record-demo";
import { AgendaCycleDemo } from "@/components/landing/demos/agenda-cycle-demo";
import { SectionViewTracker } from "./section-view-tracker";

export function LpProductShowcaseSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="O produto, sem enrolação"
          title="O Croniu, do jeito que ele é"
          description="Nada de simulação: essas são as telas reais que você vai usar todo dia com seus alunos."
        />
        <ClientRecordDemo />
        <AgendaCycleDemo />
      </Container>
      <SectionViewTracker featureId="lp_ads_product_showcase" />
    </section>
  );
}
