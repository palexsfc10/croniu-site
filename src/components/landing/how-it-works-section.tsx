import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const STEPS = [
  {
    number: "01",
    title: "Cadastre seus clientes e serviços",
    description: "Em poucos minutos, organize quem você atende e o que oferece.",
  },
  {
    number: "02",
    title: "Crie os ciclos de atendimento",
    description: "Defina quantidade de aulas ou sessões e valores — o Croniu acompanha o andamento.",
  },
  {
    number: "03",
    title: "Acompanhe agenda, recebimentos e renovações",
    description: "Tudo aparece no seu resumo diário, priorizado pelo que precisa da sua atenção.",
  },
  {
    number: "04",
    title: "Pergunte à IA quando precisar",
    description: "Consulte ciclos, recebimentos e agenda em linguagem natural, a qualquer momento.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Como funciona" title="Do cadastro ao dia a dia, em 4 passos" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col gap-3">
              <span className="font-display text-3xl font-semibold text-brand-200">{step.number}</span>
              <h3 className="font-display text-lg font-semibold text-ink">{step.title}</h3>
              <p className="text-sm text-ink/70">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
