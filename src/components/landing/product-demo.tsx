"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { IconPause, IconPlay, IconReplay } from "@/components/ui/icons";

type Scene = {
  id: string;
  chapter: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  frame: "desktop" | "phone";
  /** Duração da cena em ms. Cenas com mais texto para ler ficam mais tempo. */
  duration: number;
};

/**
 * Roteiro do demo. Cada cena é um screenshot real do produto — a mesma regra
 * do ProductScreenshot vale aqui: nada de UI recriada ou inventada.
 * A ordem segue a jornada de um dia de trabalho: o que é hoje, onde isso
 * acontece, para quem, por quanto tempo, quanto entra, e quem ajuda.
 */
const SCENES: readonly [Scene, ...Scene[]] = [
  {
    id: "inicio",
    chapter: "Início",
    caption: "Abriu o Croniu: o dia inteiro em uma tela só.",
    src: "/images/lp-personal-trainer/home-desktop.png",
    alt: "Tela inicial do Croniu no computador, com os itens do dia, resumo financeiro e próximos compromissos",
    width: 1918,
    height: 870,
    frame: "desktop",
    duration: 4200,
  },
  {
    id: "agenda",
    chapter: "Agenda",
    caption: "Cada compromisso no horário certo, sem conflito.",
    src: "/images/lp-personal-trainer/agenda.png",
    alt: "Agenda semanal do Croniu com os atendimentos distribuídos por dia e horário",
    width: 1624,
    height: 649,
    frame: "desktop",
    duration: 4000,
  },
  {
    id: "clientes",
    chapter: "Clientes",
    caption: "Quem você atende, com o histórico junto.",
    src: "/images/lp-personal-trainer/alunos-lista.png",
    alt: "Lista de clientes do Croniu, com status de cada um e acesso ao histórico",
    width: 1668,
    height: 500,
    frame: "desktop",
    duration: 4000,
  },
  {
    id: "ciclos",
    chapter: "Ciclos",
    caption: "Planos e renovações deixam de depender da sua memória.",
    src: "/images/lp-personal-trainer/ciclo-plano.png",
    alt: "Plano de ciclo de um cliente no Croniu, com período, sessões e data de renovação",
    width: 1599,
    height: 469,
    frame: "desktop",
    duration: 4600,
  },
  {
    id: "financeiro",
    chapter: "Financeiro",
    caption: "O que entrou, o que falta receber — sem planilha paralela.",
    src: "/images/lp-personal-trainer/financeiro.png",
    alt: "Tela financeira do Croniu, com recebimentos do mês, pendências e totais",
    width: 1633,
    height: 800,
    frame: "desktop",
    duration: 4400,
  },
  {
    id: "cronia",
    chapter: "Cronia",
    caption: "E uma assistente que consulta sua operação e responde em português.",
    src: "/images/lp-personal-trainer/cronia-mobile.png",
    alt: "Conversa com a Cronia no celular, respondendo sobre os ciclos que estão terminando",
    width: 390,
    height: 901,
    frame: "phone",
    duration: 5000,
  },
];

export function ProductDemo() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  // Começa true para que a primeira entrada na viewport dê play sozinha; depois
  // disso, só volta a tocar ao reentrar se foi o próprio autoplay que pausou —
  // se a pessoa apertou pause, a escolha dela prevalece.
  const pausedByViewport = useRef(true);

  const scene = SCENES[index] ?? SCENES[0];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReducedMotion(query.matches);
      if (query.matches) setPlaying(false);
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Um único observer cuida de dar play na primeira aparição e de pausar/retomar
  // depois: animação rodando fora da tela gasta bateria sem entregar nada, e
  // ainda faz a pessoa "perder" cenas que nunca viu.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (pausedByViewport.current) {
            pausedByViewport.current = false;
            setPlaying(true);
          }
        } else {
          setPlaying((current) => {
            if (current) pausedByViewport.current = true;
            return false;
          });
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const goTo = useCallback((next: number) => {
    setIndex(next);
    setEnded(false);
    pausedByViewport.current = false;
  }, []);

  // A barra de progresso É o relógio da cena: quando ela termina, avança.
  const handleProgressEnd = useCallback(() => {
    setIndex((current) => {
      const next = current + 1;
      if (next >= SCENES.length) {
        setPlaying(false);
        setEnded(true);
        return current;
      }
      return next;
    });
  }, []);

  const togglePlay = useCallback(() => {
    pausedByViewport.current = false;
    if (ended) {
      setIndex(0);
      setEnded(false);
      setPlaying(true);
      return;
    }
    setPlaying((current) => !current);
  }, [ended]);

  const paused = !playing || reducedMotion;

  return (
    <div
      ref={rootRef}
      className={cn("flex flex-col gap-4", paused && "croniu-demo-paused")}
    >
      <div
        role="group"
        aria-roledescription="demonstração do produto"
        aria-label={`Demonstração do Croniu — cena ${index + 1} de ${SCENES.length}: ${scene.chapter}`}
        className="overflow-hidden rounded-2xl border border-ink/10 bg-gradient-to-br from-brand-50 via-white to-ai-50 shadow-xl"
      >
        {/* Palco de proporção fixa: as telas do produto têm formatos bem
            diferentes (de 2:1 a 3.4:1) e deixá-lo variar por cena empurraria o
            resto da página a cada troca de cena. `container-type: size` deixa
            cada quadro se medir contra a ALTURA do palco (unidade cqh), então
            todo screenshot entra inteiro — sem corte, sem distorção e sem
            depender de qual dos dois lados é o limitante. */}
        <div
          className="relative aspect-[16/10] w-full sm:aspect-[16/8]"
          style={{ containerType: "size" }}
        >
          {SCENES.map((item, itemIndex) => {
            const active = itemIndex === index;
            return (
              <div
                key={item.id}
                aria-hidden={!active}
                className={cn(
                  "absolute inset-0 flex items-center justify-center p-3 transition-opacity duration-500 ease-out sm:p-5",
                  active ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                {item.frame === "phone" ? (
                  <div
                    className={cn(
                      "h-full overflow-hidden rounded-[1.75rem] border-4 border-ink/10 bg-white shadow-xl",
                      active && "croniu-demo-scene-in",
                    )}
                    style={{ aspectRatio: `${item.width} / ${item.height}` }}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      quality={92}
                      sizes="280px"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div
                    className={cn(
                      // Só a deriva aqui: a entrada já é o crossfade do
                      // container. Duas classes definindo `animation` no mesmo
                      // elemento fariam uma anular a outra.
                      "overflow-hidden rounded-xl border border-ink/10 bg-white shadow-lg",
                      active && !paused && "croniu-demo-drift",
                    )}
                    style={{
                      // Largura máxima que ainda cabe na altura do palco,
                      // descontando o respiro e a barra de cromo do quadro.
                      width: `min(100%, calc((100cqh - 5rem) * ${(item.width / item.height).toFixed(3)}))`,
                      ...(active ? { animationDuration: `${item.duration}ms` } : {}),
                    }}
                  >
                    {/* Mesmo cromo de navegador do resto do site: sinaliza
                        "produto rodando" sem precisar de legenda. */}
                    <div className="flex items-center gap-1.5 border-b border-ink/10 bg-ink/[0.03] px-3 py-2">
                      <span className="h-2 w-2 rounded-full bg-ink/15" />
                      <span className="h-2 w-2 rounded-full bg-ink/15" />
                      <span className="h-2 w-2 rounded-full bg-ink/15" />
                      <span className="ml-1.5 truncate text-[10px] font-medium text-ink/40 sm:text-xs">
                        app.croniu.com.br
                      </span>
                    </div>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      priority={itemIndex === 0}
                      quality={92}
                      sizes="(min-width: 1024px) 1024px, calc(100vw - 32px)"
                      className="h-auto w-full"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="relative h-1 w-full bg-ink/[0.06]">
          <div
            // key: recria o elemento a cada cena para a animação reiniciar do zero
            key={`${scene.id}-${ended}`}
            className={cn("h-full w-full bg-brand-700", !ended && "croniu-demo-progress")}
            style={{ animationDuration: `${scene.duration}ms` }}
            onAnimationEnd={handleProgressEnd}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white text-ink/70 transition-colors hover:border-brand-300 hover:text-brand-700"
            aria-label={ended ? "Ver de novo" : playing ? "Pausar demonstração" : "Reproduzir demonstração"}
          >
            {ended ? (
              <IconReplay width={18} height={18} />
            ) : playing ? (
              <IconPause width={18} height={18} />
            ) : (
              <IconPlay width={18} height={18} />
            )}
          </button>

          {/* aria-live: quem usa leitor de tela acompanha a troca de cena sem
              precisar caçar a imagem que mudou. */}
          <p className="text-sm text-ink/70 sm:text-base" aria-live="polite">
            {scene.caption}
          </p>
        </div>

        <ol className="flex flex-wrap gap-1.5" aria-label="Capítulos da demonstração">
          {SCENES.map((item, itemIndex) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(itemIndex)}
                aria-current={itemIndex === index ? "true" : undefined}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                  itemIndex === index
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-ink/10 bg-white text-ink/60 hover:border-brand-300 hover:text-brand-700",
                )}
              >
                {item.chapter}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
