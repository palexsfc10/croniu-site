import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconCheck, IconClose } from "@/components/ui/icons";

const BEFORE_ITEMS = [
  "Renovação lembrada tarde, quando o cliente já esfriou",
  "Recebimentos e datas de vencimento espalhados em planilhas e cabeça",
  "Nenhuma visão clara de quem precisa de atenção hoje",
  "Histórico de evolução do cliente perdido em conversas de WhatsApp",
];

const AFTER_ITEMS = [
  "Renovações sinalizadas com antecedência, antes do ciclo terminar",
  "Recebimentos e vencimentos organizados em um só painel",
  "Um resumo diário com o que realmente precisa da sua atenção",
  "Evolução de cada cliente registrada e acessível a qualquer momento",
];

export function PainBeforeAfterSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="O problema de quem cuida de clientes recorrentes"
          title="Rotina recorrente não deveria depender só da sua memória"
          description="Aulas, sessões e atendimentos que se repetem em ciclos criam um tipo de trabalho invisível: lembrar de renovar, cobrar e acompanhar cada cliente no tempo certo."
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
