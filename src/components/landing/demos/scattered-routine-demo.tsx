"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  IconCalendar,
  IconClipboard,
  IconMessageCircle,
  IconRefresh,
  IconUserPlus,
  IconWallet,
} from "@/components/ui/icons";
import { WorkspaceHomeDemo } from "./workspace-home-demo";
import { WorkspaceHomeEditorial } from "./workspace-home-editorial";

export type Signal = {
  id: string;
  icon: ReactNode;
  label: string;
  detail: string;
  /** Posição espalhada em desktop (lg+), relativa ao centro do palco. */
  x: string;
  y: string;
  rotate: string;
  delay: number;
};

const DEFAULT_SIGNALS: Signal[] = [
  {
    id: "mensagem",
    icon: <IconMessageCircle width={18} height={18} />,
    label: "Mensagem no WhatsApp",
    detail: "Cliente pedindo para remarcar amanhã",
    x: "-15.5rem",
    y: "-6rem",
    rotate: "-6deg",
    delay: 0,
  },
  {
    id: "agenda",
    icon: <IconCalendar width={18} height={18} />,
    label: "Compromisso da agenda",
    detail: "Atendimento às 9h, confirmado ontem à noite",
    x: "13rem",
    y: "-8.5rem",
    rotate: "5deg",
    delay: 90,
  },
  {
    id: "avaliacao",
    icon: <IconClipboard width={18} height={18} />,
    label: "Avaliação pendente",
    detail: "Anotada no bloco de notas há duas semanas",
    x: "-17rem",
    y: "6rem",
    rotate: "4deg",
    delay: 180,
  },
  {
    id: "aluno",
    icon: <IconUserPlus width={18} height={18} />,
    label: "Cliente novo",
    detail: "Indicação chegou por mensagem direta",
    x: "15.5rem",
    y: "5.5rem",
    rotate: "-4deg",
    delay: 270,
  },
  {
    id: "recebimento",
    icon: <IconWallet width={18} height={18} />,
    label: "Recebimento em aberto",
    detail: "Guardado numa planilha à parte",
    x: "-4.5rem",
    y: "-11rem",
    rotate: "-3deg",
    delay: 360,
  },
  {
    id: "renovacao",
    icon: <IconRefresh width={18} height={18} />,
    label: "Ciclo perto de renovar",
    detail: "Só na memória de quando começou",
    x: "5rem",
    y: "10.5rem",
    rotate: "3deg",
    delay: 450,
  },
];

/**
 * Cada cartão controla seu próprio transform/opacity via `style` — em vez de
 * depender só de uma classe CSS externa — para o estado convergido (cartão
 * encolhe e some, revelando o Workspace) ser verificável diretamente em
 * teste (element.style), sem precisar simular o motor de CSS real. Nunca
 * termina em translate(0,0) opaco por cima da tela: o card se aproxima do
 * centro E desaparece.
 */
function SignalCard({
  signal,
  converged,
  reducedMotion,
  stacked,
}: {
  signal: Signal;
  converged: boolean;
  reducedMotion: boolean;
  stacked?: boolean;
}) {
  if (stacked) {
    return (
      <div className="w-full" style={{ animationDelay: `${signal.delay}ms` }}>
        <div className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-md croniu-rise-in">
          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            {signal.icon}
          </span>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-ink">{signal.label}</p>
            <p className="text-xs text-ink/55">{signal.detail}</p>
          </div>
        </div>
      </div>
    );
  }

  // Sem movimento: o cartão fica legível na posição espalhada, sem
  // encolher/desaparecer — só quem tem animação ativa vê a convergência.
  const dissolve = converged && !reducedMotion;
  const style: CSSProperties = {
    transform: dissolve
      ? "translate(-50%, -50%) scale(0.55)"
      : `translate(calc(-50% + ${signal.x}), calc(-50% + ${signal.y})) rotate(${signal.rotate})`,
    opacity: dissolve ? 0 : 1,
    transition: reducedMotion
      ? "none"
      : "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 900ms ease-in",
    transitionDelay: reducedMotion ? "0ms" : `${signal.delay}ms`,
  };

  return (
    <div
      data-testid={`signal-card-${signal.id}`}
      data-dissolved={dissolve}
      className="absolute top-1/2 left-1/2 w-56"
      style={style}
    >
      <div className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-md">
        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          {signal.icon}
        </span>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-ink">{signal.label}</p>
          <p className="text-xs text-ink/55">{signal.detail}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * "Entre um cliente e outro, a rotina continua acontecendo." Seis sinais do
 * dia a dia (mensagem, agenda, avaliação, cliente novo, recebimento,
 * renovação) nascem espalhados e, quando a seção entra na tela, se
 * aproximam do centro e desaparecem, revelando a Home do Croniu — a
 * transformação central da narrativa do site. Em telas pequenas a versão
 * espalhada daria overflow, então vira uma lista que sobe em sequência até
 * o Workspace, sem posicionamento absoluto.
 */
export function ScatteredRoutineDemo({ signals = DEFAULT_SIGNALS }: { signals?: Signal[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [converged, setConverged] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setConverged(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setConverged(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="flex flex-col gap-10">
      {/* Desktop: nuvem de sinais que se aproxima do centro e some, revelando o Workspace. */}
      <div
        data-testid="scattered-routine-stage"
        className="relative mx-auto hidden h-[34rem] w-full max-w-4xl items-center justify-center lg:flex"
      >
        <div className="w-full max-w-xl">
          <WorkspaceHomeEditorial />
        </div>
        {signals.map((signal) => (
          <SignalCard key={signal.id} signal={signal} converged={converged} reducedMotion={reducedMotion} />
        ))}
      </div>

      {/* Mobile/tablet: lista que sobe em sequência, sem posicionamento absoluto. */}
      <div className="flex flex-col gap-3 lg:hidden">
        {signals.map((signal) => (
          <SignalCard key={signal.id} signal={signal} converged={converged} reducedMotion={reducedMotion} stacked />
        ))}
        <div className="mx-auto mt-4 w-full max-w-[220px]">
          <WorkspaceHomeDemo variant="mobile" />
        </div>
      </div>
    </div>
  );
}
