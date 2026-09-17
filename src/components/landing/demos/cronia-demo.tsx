import { Button } from "@/components/ui/button";
import { IconShield } from "@/components/ui/icons";
import { ProductScreenshot } from "@/components/ui/product-screenshot";
import { AiChatDemo } from "@/components/landing/ai-chat-demo";

/**
 * Fluxo real da Cronia: uma pergunta sobre o dia, a resposta com dados da
 * operação e — quando envolve mudar algo — a confirmação antes de agir. O
 * texto "Aguardando confirmação" / "Confirmar" segue o mesmo padrão real de
 * apps/web/src/components/app/assistant/proposal-card.tsx, já em produção
 * (backend/app/agent/tools.py tem os pares propose/execute para renovar
 * ciclo, remarcar, registrar pagamento etc.) — por isso a confirmação
 * aparece direto, sem aviso de "em desenvolvimento".
 */
export function CroniaDemo() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div className="mx-auto w-full max-w-[220px] sm:max-w-[240px] lg:mx-0">
        <ProductScreenshot
          src="/images/demo/cronia-mobile.png"
          alt="Cronia no celular, respondendo sobre o dia com os itens que precisam de atenção"
          width={1170}
          height={2532}
          frame="phone"
          sizes="240px"
        />
      </div>

      <div className="flex flex-col gap-4">
        <AiChatDemo
          variant="dark"
          exchanges={[
            {
              question: "Como está meu dia?",
              answer:
                "4 atendimentos hoje. Um ciclo termina em 3 dias — Ana Ferreira, 10 de 12 aulas feitas — e o recebimento de Helena Duarte está vencido desde ontem. Quer que eu prepare a renovação da Ana?",
            },
          ]}
        />

        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
          <p className="text-sm text-white/80">
            Renovar o ciclo de Ana Ferreira por mais 8 aulas, mesmo valor do ciclo atual?
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-ai-500/20 px-3 py-1 text-xs font-semibold text-ai-200">
              Aguardando confirmação
            </span>
            <Button variant="ai" size="md" type="button">
              Confirmar
            </Button>
          </div>
        </div>

        <p className="flex items-center gap-2 text-sm text-white/60">
          <IconShield width={16} height={16} />
          Nada é alterado sem a sua confirmação explícita.
        </p>
      </div>
    </div>
  );
}
