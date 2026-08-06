import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconArrowRight } from "@/components/ui/icons";
import { registerUrl } from "@/lib/site";
import { AiChatDemo } from "./ai-chat-demo";
import { CycleCardsStack } from "./cycle-cards-stack";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-brand-50 via-bg to-bg"
      />
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
        <div className="flex flex-col gap-6">
          <Badge variant="ai">
            <span aria-hidden="true">✦</span> Assistente de IA incluído
          </Badge>

          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            Sua rotina organizada. Seus clientes acompanhados. Uma IA trabalhando com você.
          </h1>

          <p className="max-w-xl text-lg text-ink/70">
            Croniu é o companheiro de quem cuida de clientes recorrentes: ciclos, recebimentos,
            renovações e agenda em um só lugar — com uma IA que consulta sua operação e te avisa antes
            de qualquer coisa ficar para trás.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={registerUrl} size="lg">
              Começar grátis por 7 dias
              <IconArrowRight width={18} height={18} />
            </Button>
            <Button href="#como-funciona" variant="secondary" size="lg">
              Ver como funciona
            </Button>
          </div>

          <p className="text-sm text-ink/50">Sem cartão de crédito. Cancele quando quiser.</p>
        </div>

        <div className="flex flex-col gap-6">
          <AiChatDemo
            exchanges={[
              {
                question: "Quais ciclos terminam essa semana?",
                answer:
                  "3 ciclos terminam até domingo: Marina Alves (3 dias), João Pedro (5 dias) e Clara Nunes (6 dias). Quer que eu prepare a renovação de algum deles?",
              },
            ]}
          />
          <CycleCardsStack />
        </div>
      </Container>
    </section>
  );
}
