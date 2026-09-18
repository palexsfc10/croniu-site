import { IconCalendar, IconRefresh } from "@/components/ui/icons";
import { ProductScreenshot } from "@/components/ui/product-screenshot";

/**
 * Agenda (/app/agenda) e Ciclos, aba "Em andamento" (/app/cycles) — capturas
 * reais via scripts/demo-harness. Telas grandes de propósito: o pedido era
 * não comprimir a agenda inteira dentro de um mockup pequeno.
 */
export function AgendaCycleDemo() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink/60">
          <IconCalendar width={18} height={18} />
          Agenda
        </p>
        <ProductScreenshot
          src="/images/demo/agenda.png"
          alt="Agenda do dia no Croniu, com os atendimentos posicionados na grade de horários e o próximo compromisso em destaque"
          width={3024}
          height={1800}
          quality={95}
          sizes="(min-width: 1024px) 560px, calc(100vw - 32px)"
        />
        <p className="text-sm text-ink/60">Cada compromisso no horário certo, sem conflito.</p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink/60">
          <IconRefresh width={18} height={18} />
          Ciclos
        </p>
        <ProductScreenshot
          src="/images/demo/ciclos.png"
          alt="Ciclos em andamento no Croniu, com período, progresso de sessões e data de renovação de cada cliente"
          width={3024}
          height={1800}
          quality={95}
          sizes="(min-width: 1024px) 560px, calc(100vw - 32px)"
        />
        <p className="text-sm text-ink/60">Planos e renovações deixam de depender da sua memória.</p>
      </div>
    </div>
  );
}
