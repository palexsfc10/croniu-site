import { IconArrowRight, IconClipboard, IconRefresh } from "@/components/ui/icons";
import { ProductScreenshot } from "@/components/ui/product-screenshot";

/**
 * Ficha do cliente — "aba Acompanhamento" de /app/clients/[clientId} no
 * croniu-app. A tela real também tem um terceiro cartão ("Plano") ligado a
 * um recurso que o Croniu não oferece e que esta LP não pode sugerir — por
 * isso o painel de ficha abaixo é recriado com os mesmos textos, rótulos e
 * hierarquia dos cartões "Ciclo atual" e "Avaliações" (client-profile.tsx /
 * client-evaluations-section.tsx), sem esse terceiro cartão. A lista à
 * esquerda é a captura real de /app/clients.
 */
export function ClientRecordDemo() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:items-center">
      <div className="relative">
        <ProductScreenshot
          src="/images/demo/clientes.png"
          alt="Lista de clientes do Croniu, com atendimento, próxima sessão e situação de cada um"
          width={3024}
          height={1800}
          quality={95}
          sizes="(min-width: 1024px) 460px, calc(100vw - 32px)"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink/50">
          <IconArrowRight width={16} height={16} className="hidden lg:block" />
          Ana Ferreira · ficha do cliente
        </p>

        <div className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
            <IconRefresh width={18} height={18} />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-ink">Ciclo atual</p>
            <p className="text-sm text-ink/70">Acompanhamento individual · 18 ago – 18 set</p>
            <p className="text-sm text-ink/50">10 de 12 aulas realizadas · renovação em 3 dias</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-ink/10 bg-white p-5 shadow-sm">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-progress-50 text-progress-600">
            <IconClipboard width={18} height={18} />
          </span>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-ink">Avaliações</p>
            <p className="text-sm text-ink/70">Avaliação de setembro · Publicada</p>
            <p className="text-sm text-ink/50">
              A última avaliação aparece aqui. O cliente só vê o que você publicar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
