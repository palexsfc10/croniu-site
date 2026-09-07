import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { IconShield } from "@/components/ui/icons";
import { ProductScreenshot } from "./product-screenshot";
import { SectionViewTracker } from "./section-view-tracker";

export function LpAssistantSection() {
  return (
    <section id="cronia" className="bg-ink py-16 text-white sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-2 flex flex-col gap-5 lg:order-1">
          <Badge variant="ai">
            <span aria-hidden="true">✦</span> Assistente do Croniu
          </Badge>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            A Cronia consulta sua operação — e nunca age sozinha
          </h2>
          <p className="text-base text-white/70 sm:text-lg">
            Pergunte o que quiser sobre seus alunos, ciclos e recebimentos. A Cronia responde com
            dados reais da sua conta. Quando uma resposta envolve mudar algo — remarcar, renovar,
            cobrar — ela sempre pede sua confirmação antes de executar.
          </p>
          <p className="flex items-center gap-2 text-sm text-white/60">
            <IconShield width={16} height={16} />
            Nada é alterado sem a sua confirmação.
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <ProductScreenshot
            src="/images/lp-personal-trainer/cronia-mobile.png"
            alt="Tela da Cronia, assistente do Croniu, aberta no celular com sugestões de perguntas"
            width={390}
            height={901}
            frame="phone"
            sizes="280px"
          />
        </div>
      </Container>
      <SectionViewTracker featureId="lp_ads_assistant" />
    </section>
  );
}
