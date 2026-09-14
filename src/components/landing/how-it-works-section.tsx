import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductScreenshot } from "@/components/ui/product-screenshot";

const STEPS = [
  {
    number: "1",
    title: "Crie sua conta",
    description: "Cadastro rápido, sem cartão de crédito, direto no navegador.",
  },
  {
    number: "2",
    title: "Cadastre seu primeiro cliente",
    description: "Adicione quem você atende e convide direto pelo WhatsApp, se quiser.",
  },
  {
    number: "3",
    title: "Organize seu primeiro atendimento",
    description: "Crie o ciclo, marque na agenda e acompanhe tudo no resumo diário.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-comecar" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Como começar" title="Três passos para organizar sua rotina" />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ProductScreenshot
            src="/images/lp-personal-trainer/convite-aluno.png"
            alt="Modal de convite de cliente do Croniu, com opção de enviar pelo WhatsApp ou copiar o link"
            width={1596}
            height={622}
            sizes="(min-width: 1024px) 524px, calc(100vw - 32px)"
          />

          <ol className="flex flex-col gap-6">
            {STEPS.map((step) => (
              <li key={step.number} className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-700 font-display text-sm font-semibold text-white">
                  {step.number}
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="text-sm text-ink/70">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-center text-sm text-ink/50">Sem cartão de crédito para começar.</p>
      </Container>
    </section>
  );
}
