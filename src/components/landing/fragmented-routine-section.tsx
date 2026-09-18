import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ScatteredRoutineDemo } from "./demos/scattered-routine-demo";

export function FragmentedRoutineSection() {
  return (
    <section id="rotina" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Entre um cliente e outro"
          title="A rotina continua acontecendo — só que espalhada"
          description="Mensagem no WhatsApp, horário que muda, avaliação anotada num bloco de notas, recebimento numa planilha à parte. Quando chega a hora de organizar, você não deveria começar procurando informações."
        />
        <ScatteredRoutineDemo />
        <div className="mx-auto flex max-w-lg flex-col gap-2 text-center">
          <p className="font-display text-xl font-semibold text-ink sm:text-2xl">
            O Croniu transforma informações espalhadas em uma rotina sob controle.
          </p>
          <p className="text-sm text-ink/60 sm:text-base">
            Ele não decide o que você faz com cada cliente — isso continua só seu. Só garante que nada do
            que você já decidiu se perca.
          </p>
        </div>
      </Container>
    </section>
  );
}
