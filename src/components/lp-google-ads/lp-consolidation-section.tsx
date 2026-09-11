import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconCalendar, IconMessageCircle, IconSparkles, IconSpreadsheet } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const SCATTERED_ITEMS = [
  { icon: IconMessageCircle, title: "WhatsApp", description: "Convites, contato e portal do aluno." },
  { icon: IconSpreadsheet, title: "Planilhas", description: "Alunos, ciclos, renovações e recebimentos." },
  { icon: IconCalendar, title: "Agenda", description: "Compromissos, rotinas e avaliações." },
] as const;

const DESTINATION_ITEM = {
  icon: IconSparkles,
  title: "Croniu",
  description: "Uma visão clara de todo o seu trabalho.",
} as const;

/**
 * Sits right after the hero — this is "Croniu como solução centralizadora"
 * in the page's narrative order, before the real-screenshot proof section.
 * Intentionally not wired to feature_view/SectionViewTracker: the existing
 * event map (docs/ANALYTICS.md) reserves that event's feature_id values for
 * the 4 designated proof sections, and this isn't one of them — same
 * "reserved, no trigger" treatment as the home page's static features grid.
 */
export function LpConsolidationSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading title="Tudo que hoje está espalhado, agora em um só lugar" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCATTERED_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-white p-6"
            >
              <item.icon width={22} height={22} className="text-ink/40" />
              <h3 className="font-display text-base font-semibold text-ink">{item.title}</h3>
              <p className="text-sm text-ink/60">{item.description}</p>
            </div>
          ))}

          <div
            className={cn(
              "flex flex-col gap-3 rounded-2xl border border-brand-200 bg-brand-50/60 p-6",
            )}
          >
            <DESTINATION_ITEM.icon width={22} height={22} className="text-brand-700" />
            <h3 className="font-display text-base font-semibold text-brand-700">
              {DESTINATION_ITEM.title}
            </h3>
            <p className="text-sm text-ink/70">{DESTINATION_ITEM.description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
