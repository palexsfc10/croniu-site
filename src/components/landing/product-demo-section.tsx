import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductDemo } from "./product-demo";

export function ProductDemoSection() {
  return (
    <section id="como-funciona" className="scroll-mt-32 py-16 sm:py-24">
      <Container className="flex max-w-5xl flex-col gap-10">
        <SectionHeading
          eyebrow="Veja funcionando"
          title="Um dia de trabalho dentro do Croniu"
          description="Seis telas reais do sistema, na ordem em que o seu dia acontece. Sem cadastro para assistir."
        />
        <ProductDemo />
      </Container>
    </section>
  );
}
