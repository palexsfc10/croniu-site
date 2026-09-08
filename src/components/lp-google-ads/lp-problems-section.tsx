import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconCheck, IconClose } from "@/components/ui/icons";

const BEFORE_ITEMS = [
  "Aluno pergunta quando vence o pacote e você não sabe de cabeça",
  "Renovação lembrada tarde, quando o aluno já esfriou",
  "Recebimento pendente descoberto só no fim do mês",
  "Agenda dividida entre WhatsApp, caderno e memória",
];

const AFTER_ITEMS = [
  "Status de cada aluno visível sem precisar procurar",
  "Renovações sinalizadas com antecedência, antes do ciclo terminar",
  "Painel de recebimentos sempre atualizado",
  "Agenda do dia em um só lugar",
];

export function LpProblemsSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="O problema de quem tem 15 a 60 alunos"
          title="Gerenciar tudo de cabeça deixa de funcionar em algum ponto"
          description="Com poucos alunos, dá para lembrar de tudo. Quando a base cresce, cada renovação, cobrança e horário esquecido custa caro."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-ink/60">Sem o Croniu</h3>
            <ul className="flex flex-col gap-3">
              {BEFORE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink/70">
                  <IconClose className="mt-0.5 shrink-0 text-ink/40" width={18} height={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-brand-200 bg-brand-50/60 p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-brand-700">Com o Croniu</h3>
            <ul className="flex flex-col gap-3">
              {AFTER_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink/80">
                  <IconCheck className="mt-0.5 shrink-0 text-progress-600" width={18} height={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
