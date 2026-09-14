import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductScreenshot } from "@/components/ui/product-screenshot";

export function ClientTrackingSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <ProductScreenshot
            src="/images/lp-personal-trainer/ciclo-plano.png"
            alt="Tela do profissional com o ciclo atual e o plano de acompanhamento de um cliente, com status de renovação"
            width={1599}
            height={469}
            sizes="(min-width: 1024px) 524px, calc(100vw - 32px)"
          />
          <p className="mt-2 text-xs text-ink/40">Visão do profissional dentro do Croniu.</p>
        </div>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Acompanhamento do cliente"
            eyebrowVariant="progress"
            title="Na hora de atender, tenha o histórico do cliente por perto"
            description="Ciclo atual, aulas ou sessões restantes, status de renovação e evoluções registradas — tudo reunido na ficha de cada cliente, sem precisar procurar em conversas antigas."
          />
        </div>
      </Container>
    </section>
  );
}
