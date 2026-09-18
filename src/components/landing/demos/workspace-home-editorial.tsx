import { cn } from "@/lib/cn";
import { BrandWordmark } from "@/components/brand";
import {
  IconCalendar,
  IconClipboard,
  IconRefresh,
  IconSparkles,
  IconUsers,
} from "@/components/ui/icons";

const NAV_ITEMS = [
  { label: "Início", active: true },
  { label: "Agenda", active: false },
  { label: "Clientes", active: false },
  { label: "Rotinas", active: false },
  { label: "Mais", active: false },
];

const TODAY_ACTIONS = [
  {
    status: "ATRASADA",
    tone: "text-amber-600 bg-amber-50",
    title: "Revisar anotações do cliente",
    subtitle: "Rafael Nunes",
  },
  {
    status: "HOJE",
    tone: "text-progress-700 bg-progress-50",
    title: "Enviar feedback da semana",
    subtitle: "Camila Rocha",
  },
];

/**
 * Composição editorial em HTML/CSS da Home real do Croniu (rota /app),
 * construída com os mesmos textos e hierarquia da captura em
 * public/images/demo/inicio.png — não é um screenshot. Usada só no hero
 * (Home e /personal-trainer): mais nítida e legível em qualquer densidade
 * de tela do que uma imagem ampliada. A prova em screenshot completo e real
 * continua nas seções mais abaixo (ClientRecordDemo, AgendaCycleDemo,
 * ResponsiveWorkspaceDemo).
 */
export function WorkspaceHomeEditorial({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-[136px_1fr] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl shadow-black/40 sm:grid-cols-[160px_1fr]",
        className,
      )}
      role="img"
      aria-label="Composição da tela inicial do Croniu Workspace: prioridade do dia, ações pendentes e navegação lateral"
    >
      <aside className="flex flex-col justify-between border-r border-ink/10 bg-bg p-3 sm:p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-baseline gap-1">
            <BrandWordmark size="sm" />
          </div>
          <nav className="flex flex-col gap-1" aria-hidden="true">
            {NAV_ITEMS.map((item) => (
              <span
                key={item.label}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-xs font-medium sm:text-sm",
                  item.active ? "bg-brand-50 text-brand-700" : "text-ink/50",
                )}
              >
                {item.label}
              </span>
            ))}
          </nav>
        </div>
        <span
          aria-hidden="true"
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-ai-600 sm:text-sm"
        >
          <IconSparkles width={14} height={14} />
          Assistente
        </span>
      </aside>

      <div className="flex flex-col gap-4 p-4 sm:p-6">
        <div>
          <p className="font-display text-lg font-semibold text-ink sm:text-xl">Boa tarde, Marina</p>
          <p className="text-xs text-ink/50 sm:text-sm">Studio Marina Prado</p>
        </div>

        <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-3 sm:p-4">
          <p className="text-[10px] font-semibold tracking-wide text-brand-700 sm:text-xs">PRIORIDADE</p>
          <p className="mt-1 text-sm font-semibold text-ink sm:text-base">Renovar o ciclo da Ana Ferreira</p>
          <p className="mt-0.5 text-xs text-ink/60 sm:text-sm">Termina em 3 dias, com 10 de 12 aulas concluídas</p>
          <span className="mt-2 inline-flex rounded-full bg-brand-700 px-3 py-1 text-xs font-semibold text-white">
            Ver ciclo
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wide text-ink/50 sm:text-xs">
            <IconClipboard width={12} height={12} />
            SUAS AÇÕES DE HOJE
          </p>
          {TODAY_ACTIONS.map((action) => (
            <div key={action.title} className="rounded-lg border border-ink/10 p-2.5 sm:p-3">
              <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-semibold", action.tone)}>
                {action.status}
              </span>
              <p className="mt-1 text-xs font-semibold text-ink sm:text-sm">{action.title}</p>
              <p className="text-[11px] text-ink/50 sm:text-xs">{action.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-4 border-t border-ink/10 pt-3 text-[11px] text-ink/50 sm:text-xs">
          <span className="flex items-center gap-1.5">
            <IconUsers width={13} height={13} />5 clientes ativos
          </span>
          <span className="flex items-center gap-1.5">
            <IconCalendar width={13} height={13} />4 hoje
          </span>
          <span className="flex items-center gap-1.5">
            <IconRefresh width={13} height={13} />2 ciclos perto do fim
          </span>
        </div>
      </div>
    </div>
  );
}
