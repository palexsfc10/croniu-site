import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { CroniaDemo } from "@/components/landing/demos/cronia-demo";
import { SectionViewTracker } from "./section-view-tracker";

export function LpAssistantSection() {
  return (
    <section id="cronia" className="bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900 py-16 text-white sm:py-24">
      <Container className="flex flex-col gap-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="ai">
            <span aria-hidden="true">✦</span> Cronia
          </Badge>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            A Cronia consulta sua operação — e nunca age sozinha
          </h2>
          <p className="text-base text-white/70 sm:text-lg">
            Pergunte sobre seus alunos, ciclos e recebimentos. Quando a resposta envolve mudar algo —
            remarcar, renovar, cobrar — ela sempre pede sua confirmação antes de executar.
          </p>
        </div>
        <CroniaDemo />
      </Container>
      <SectionViewTracker featureId="lp_ads_assistant" />
    </section>
  );
}
