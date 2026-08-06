import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconCalendar, IconRefresh, IconWallet } from "@/components/ui/icons";

const FOCUS_ITEMS = [
  {
    icon: IconCalendar,
    tone: "brand" as const,
    title: "3 atendimentos hoje",
    detail: "9h Pedro Martins · 14h Julia Ramos · 17h30 Felipe Costa",
  },
  {
    icon: IconRefresh,
    tone: "progress" as const,
    title: "2 ciclos terminando essa semana",
    detail: "Ana Ferreira e Lucas Prado ainda sem renovação agendada",
  },
  {
    icon: IconWallet,
    tone: "ai" as const,
    title: "1 recebimento vencido",
    detail: "Carla Dias · R$ 160,00 · vencido há 3 dias",
  },
];

const TONE_CLASSES = {
  brand: "bg-brand-50 text-brand-700",
  progress: "bg-progress-50 text-progress-700",
  ai: "bg-ai-50 text-ai-600",
} as const;

export function DailyFocusSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Foco do dia"
          eyebrowVariant="progress"
          title="Todo dia, um resumo do que realmente importa"
          description="Em vez de abrir várias telas, o Croniu te mostra a prioridade do dia: quem atender, quem cobrar e quem renovar — em uma lista curta, sem ruído."
        />

        <div className="flex flex-col gap-3 rounded-3xl border border-ink/10 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm font-semibold text-ink/50">Hoje · quarta-feira</p>
          {FOCUS_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-ink/5 bg-bg/60 p-4"
              >
                <span
                  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${TONE_CLASSES[item.tone]}`}
                >
                  <Icon width={18} height={18} />
                </span>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold text-ink">{item.title}</p>
                  <p className="text-sm text-ink/60">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
