import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  IconCalendar,
  IconChart,
  IconLink,
  IconRefresh,
  IconUsers,
  IconWallet,
} from "@/components/ui/icons";

const FEATURES = [
  {
    icon: IconRefresh,
    title: "Ciclos de atendimento",
    description: "Acompanhe cada cliente por ciclo: aulas restantes, datas e status de renovação.",
    span: "lg:col-span-2",
  },
  {
    icon: IconWallet,
    title: "Recebimentos",
    description: "Veja o que está pago, pendente e vencido, sem depender de planilha.",
    span: "",
  },
  {
    icon: IconCalendar,
    title: "Agenda do dia",
    description: "Compromissos organizados por horário, com visão diária clara.",
    span: "",
  },
  {
    icon: IconUsers,
    title: "Avaliações de evolução",
    description: "Registre a evolução de cada cliente ao longo do tempo, em um histórico acessível.",
    span: "lg:col-span-2",
  },
  {
    icon: IconLink,
    title: "Portal do cliente",
    description: "Um link exclusivo para o cliente acompanhar seu próprio progresso, sem precisar de login.",
    span: "",
  },
  {
    icon: IconChart,
    title: "Renovações no radar",
    description: "Saiba com antecedência quem está perto de terminar o ciclo atual.",
    span: "",
  },
];

export function FeaturesBentoSection() {
  return (
    <section id="produto" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Tudo em um só lugar"
          title="O essencial da sua rotina, organizado"
          description="Croniu junta o que hoje vive espalhado em planilhas, agendas e conversas de WhatsApp."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`flex flex-col gap-3 rounded-3xl border border-ink/10 bg-white p-6 ${feature.span}`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                  <Icon width={20} height={20} />
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">{feature.title}</h3>
                <p className="text-sm text-ink/70">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
