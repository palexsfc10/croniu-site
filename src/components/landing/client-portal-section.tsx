import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconLink } from "@/components/ui/icons";

export function ClientPortalSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-2 text-sm font-medium text-ink/50">
              <IconLink width={16} height={16} />
              <span>croniu.com.br/c/marina-alves</span>
            </div>
            <div className="mt-5 flex flex-col gap-4">
              <div>
                <p className="text-sm text-ink/50">Ciclo atual</p>
                <p className="font-display text-2xl font-semibold text-ink">7 de 10 aulas concluídas</p>
              </div>
              <div className="h-2 w-full rounded-full bg-ink/10">
                <div className="h-2 w-[70%] rounded-full bg-progress-500" />
              </div>
              <div className="flex flex-col gap-2 border-t border-ink/10 pt-4 text-sm text-ink/70">
                <p className="font-semibold text-ink">Últimas evoluções</p>
                <p>15/07 — Boa progressão na resistência, manter frequência semanal.</p>
                <p>08/07 — Ajuste de carga, cliente relatou mais disposição.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            align="left"
            eyebrow="Portal do cliente"
            eyebrowVariant="progress"
            title="Seus clientes acompanham o próprio progresso"
            description="Cada cliente recebe um link exclusivo para ver o andamento do ciclo atual e o histórico de evolução registrado por você — sem precisar criar conta ou senha."
          />
        </div>
      </Container>
    </section>
  );
}
