import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const AUDIENCES = [
  "Professores de dança",
  "Instrutores de artes marciais",
  "Professores de música",
  "Professores de idiomas",
  "Reforço escolar particular",
  "Instrutores de pilates e yoga",
  "Treinadores esportivos",
  "Personal trainers",
];

export function AudienceSection() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Para quem é"
          title="Feito para quem tem clientes recorrentes"
          description="Se o seu trabalho se repete em ciclos — aulas, sessões, atendimentos — o Croniu foi desenhado para a sua rotina."
        />

        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
          {AUDIENCES.map((audience) => (
            <span
              key={audience}
              className="rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium text-ink/80"
            >
              {audience}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
