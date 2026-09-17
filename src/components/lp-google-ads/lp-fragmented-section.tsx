import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  IconCalendar,
  IconClipboard,
  IconMessageCircle,
  IconRefresh,
  IconUserPlus,
  IconWallet,
} from "@/components/ui/icons";
import { ScatteredRoutineDemo } from "@/components/landing/demos/scattered-routine-demo";

const PERSONAL_TRAINER_SIGNALS = [
  {
    id: "remarcacao",
    icon: <IconMessageCircle width={18} height={18} />,
    label: "Remarcação pelo WhatsApp",
    detail: "Aluno pedindo para mudar o horário de amanhã",
    x: "-15.5rem",
    y: "-6rem",
    rotate: "-6deg",
    delay: 0,
  },
  {
    id: "aluno-novo",
    icon: <IconUserPlus width={18} height={18} />,
    label: "Aluno novo para cadastrar",
    detail: "Chegou por indicação, ainda sem ficha",
    x: "13rem",
    y: "-8.5rem",
    rotate: "5deg",
    delay: 90,
  },
  {
    id: "avaliacao",
    icon: <IconClipboard width={18} height={18} />,
    label: "Avaliação para registrar",
    detail: "Anotada no papel na última sessão",
    x: "-17rem",
    y: "6rem",
    rotate: "4deg",
    delay: 180,
  },
  {
    id: "ciclo",
    icon: <IconRefresh width={18} height={18} />,
    label: "Ciclo perto da renovação",
    detail: "Só na memória de quando começou",
    x: "15.5rem",
    y: "5.5rem",
    rotate: "-4deg",
    delay: 270,
  },
  {
    id: "recebimento",
    icon: <IconWallet width={18} height={18} />,
    label: "Recebimento para acompanhar",
    detail: "Controlado numa planilha à parte",
    x: "-4.5rem",
    y: "-11rem",
    rotate: "-3deg",
    delay: 360,
  },
  {
    id: "compromissos",
    icon: <IconCalendar width={18} height={18} />,
    label: "Compromissos da semana",
    detail: "Divididos entre agenda de papel e memória",
    x: "5rem",
    y: "10.5rem",
    rotate: "3deg",
    delay: 450,
  },
];

export function LpFragmentedSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="A rotina de quem tem alunos"
          title="Entre uma aula e outra, a informação se espalha"
          description="Mensagens chegam, horários mudam e informações importantes ficam espalhadas. O problema não é falta de dedicação — é depender de lugares demais para controlar a rotina."
        />
        <ScatteredRoutineDemo signals={PERSONAL_TRAINER_SIGNALS} />
        <p className="mx-auto max-w-lg text-center font-display text-xl font-semibold text-ink sm:text-2xl">
          Com o Croniu, alunos, agenda, avaliações, ciclos e recebimentos passam a fazer parte da mesma
          rotina.
        </p>
      </Container>
    </section>
  );
}
