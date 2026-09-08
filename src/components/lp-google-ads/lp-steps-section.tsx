import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductScreenshot } from "./product-screenshot";

const STEPS = [
  {
    number: "1",
    title: "Cadastre seus alunos e ciclos",
    description: "Adicione cada aluno e convide direto pelo WhatsApp — sem ele precisar criar conta.",
  },
  {
    number: "2",
    title: "Confira o resumo diário e as renovações no radar",
    description: "Todo dia, uma lista curta do que precisa da sua atenção: quem atender, cobrar e renovar.",
  },
  {
    number: "3",
    title: "Use a Cronia quando quiser consultar sua operação",
    description: "Pergunte sobre ciclos, agenda ou recebimentos e receba respostas com dados reais da sua conta.",
  },
];

export function LpStepsSection() {
  return (
    <section id="como-comecar" className="py-16 sm:py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Como começar" title="Três passos para organizar sua rotina" />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ProductScreenshot
            src="/images/lp-personal-trainer/convite-aluno.png"
            alt="Modal de convite de aluno do Croniu, com opção de enviar pelo WhatsApp ou copiar o link"
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
