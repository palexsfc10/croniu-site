import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { IconShield } from "@/components/ui/icons";
import { siteConfig } from "@/lib/site";
import { AiChatDemo } from "./ai-chat-demo";

const VERIFIED_EXCHANGES = [
  {
    question: "Quais ciclos estão terminando?",
    answer:
      "2 ciclos terminam nos próximos 5 dias: Ana Ferreira (2 dias) e Lucas Prado (5 dias). Nenhum deles tem renovação agendada ainda.",
  },
  {
    question: "Tenho recebimentos pendentes?",
    answer:
      "Sim, 4 recebimentos estão pendentes, totalizando R$ 640,00. O mais antigo é de Carla Dias, vencido há 3 dias.",
  },
  {
    question: "O que tenho hoje na agenda?",
    answer:
      "Hoje você tem 3 atendimentos: 9h com Pedro Martins, 14h com Julia Ramos e 17h30 com Felipe Costa.",
  },
];

const WRITE_ACTION_EXCHANGE = {
  question: "Renova o ciclo da Ana Ferreira por mais 8 aulas?",
  answer:
    "Posso preparar a renovação de Ana Ferreira: novo ciclo de 8 aulas, mesmo valor do ciclo atual. Confirma para eu criar?",
};

export function AiDarkSection() {
  return (
    <section id="ia" className="bg-ink py-20 text-white sm:py-28">
      <Container className="flex flex-col gap-14">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="ai">
            <span aria-hidden="true">✦</span> Diferencial Croniu
          </Badge>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Uma IA que consulta sua operação — não um chatbot genérico
          </h2>
          <p className="text-base text-white/70 sm:text-lg">
            O assistente do Croniu responde com dados reais da sua conta: ciclos, recebimentos e
            agenda. E quando a pergunta envolve mudar algo, ele sempre pede a sua confirmação antes de
            agir.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {VERIFIED_EXCHANGES.map((exchange) => (
            <AiChatDemo key={exchange.question} variant="dark" exchanges={[exchange]} />
          ))}
        </div>

        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          {siteConfig.aiActionDemosEnabled ? (
            <div className="flex w-full flex-col gap-4">
              <AiChatDemo variant="dark" exchanges={[WRITE_ACTION_EXCHANGE]} />
              <p className="flex items-center justify-center gap-2 text-sm text-white/60">
                <IconShield width={16} height={16} />
                Nenhuma ação de escrita é executada sem a sua confirmação explícita.
              </p>
            </div>
          ) : (
            <p className="flex items-center justify-center gap-2 text-sm text-white/60">
              <IconShield width={16} height={16} />
              Ações de escrita (como renovar um ciclo direto pela IA) estão em desenvolvimento e, quando
              chegarem, sempre vão pedir sua confirmação antes de executar.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
