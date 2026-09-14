import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductScreenshot } from "@/components/ui/product-screenshot";

export function FinancialSection() {
  return (
    <section className="bg-brand-50/50 py-20 sm:py-28">
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Financeiro"
          title="Saiba o que recebeu e o que ainda falta receber"
          description="Recebido no mês, previsto e vencido, com a evolução dos últimos meses em um só painel. O Croniu organiza os recebimentos gerados pelos seus ciclos — a cobrança em si continua sendo feita por você, fora da plataforma."
        />

        <ProductScreenshot
          src="/images/lp-personal-trainer/financeiro.png"
          alt="Painel financeiro do Croniu com recebido no mês, previsto, vencidos e evolução do recebido"
          width={1633}
          height={800}
          sizes="(min-width: 1024px) 524px, calc(100vw - 32px)"
        />
      </Container>
    </section>
  );
}
