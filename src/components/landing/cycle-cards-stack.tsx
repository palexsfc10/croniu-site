const CYCLES = [
  { client: "Marina Alves", progress: 85, note: "Ciclo termina em 3 dias" },
  { client: "Rafael Souza", progress: 45, note: "12 aulas restantes" },
  { client: "Beatriz Lima", progress: 100, note: "Pronta para renovar" },
] as const;

export function CycleCardsStack() {
  return (
    <div aria-hidden="true" className="relative flex flex-col gap-3">
      {CYCLES.map((cycle, index) => (
        <div
          key={cycle.client}
          style={{ animationDelay: `${index * 0.4}s` }}
          className="motion-safe:[animation:croniu-float_6s_ease-in-out_infinite] flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-ink">{cycle.client}</span>
            <span className="text-xs text-ink/60">{cycle.note}</span>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-progress-50 text-xs font-bold text-progress-700">
            {cycle.progress}%
          </div>
        </div>
      ))}
    </div>
  );
}
