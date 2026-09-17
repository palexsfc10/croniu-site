import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { CroniaDemo } from "./demos/cronia-demo";

export function AiDarkSection() {
  return (
    <section id="ia" className="bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900 py-20 text-white sm:py-28">
      <Container className="flex flex-col gap-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="ai">
            <span aria-hidden="true">✦</span> Cronia
          </Badge>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Pergunte como está o seu dia
          </h2>
          <p className="text-base text-white/70 sm:text-lg">
            A Cronia consulta dados reais da sua conta — clientes, ciclos, agenda e recebimentos — e
            aponta o que precisa de atenção. Quando a resposta envolve mudar algo, ela sempre pede a
            sua confirmação antes de agir.
          </p>
        </div>

        <CroniaDemo />
      </Container>
    </section>
  );
}
