import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionViewTracker } from "@/components/lp-google-ads/section-view-tracker";
import { ProductCrop, type CropRect } from "@/components/ui/product-crop";
import { IconCalendar, IconClipboard, IconRefresh, IconUsers } from "@/components/ui/icons";

/**
 * Três decisões da rotina, cada uma provada por um recorte legível da tela
 * real (ver ProductCrop). O enquadramento é escolhido por seção: mostrar a
 * janela inteira reduzida devolvia texto de interface ilegível e áreas vazias
 * — exatamente o oposto do que "telas reais" promete.
 *
 * As linhas alternam o lado da imagem e usam títulos alinhados à esquerda, em
 * vez de repetir pela quinta vez o bloco centralizado das outras seções.
 */

// Cada recorte começa e termina numa borda de cartão da tela real: cortar um
// item pela metade faz o enquadramento parecer defeito, não escolha. Por isso
// as alturas não são idênticas — o limite é o conteúdo, não a proporção.
const CLIENTES_CROP: CropRect = { left: 28.2, top: 22.8, width: 58.8, height: 42.7 };
const AGENDA_CROP: CropRect = { left: 28.0, top: 28.6, width: 59.0, height: 48.5 };
const CICLOS_CROP: CropRect = { left: 28.0, top: 42.0, width: 59.0, height: 48.8 };

// No celular a coluna é a largura da tela menos o respiro do Container; o
// recorte de celular é mais estreito e mostra menos itens, para o texto da
// interface chegar legível em vez de virar textura.
const CROP_CONTAINER = "520px";
const CROP_CONTAINER_MOBILE = "(100vw - 32px)";

const CLIENTES_CROP_MOBILE: CropRect = { left: 28.2, top: 22.8, width: 17.5, height: 26.0 };
const AGENDA_CROP_MOBILE: CropRect = { left: 28.0, top: 28.6, width: 24.0, height: 26.5 };
const CICLOS_CROP_MOBILE: CropRect = { left: 28.0, top: 42.0, width: 18.0, height: 26.0 };

function ShowcaseRow({
  eyebrow,
  icon,
  title,
  children,
  media,
  /** Lado da imagem no desktop. No celular o título vem sempre antes dela. */
  mediaSide = "start",
}: {
  eyebrow: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
  media: ReactNode;
  mediaSide?: "start" | "end";
}) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
      {/* No celular o texto vem primeiro: um recorte de tela antes do próprio
          título chega sem contexto nenhum. No desktop as linhas alternam. */}
      <div className={cn("order-2", mediaSide === "end" ? "lg:order-2" : "lg:order-1")}>{media}</div>

      <div className={cn("order-1", mediaSide === "end" ? "lg:order-1" : "lg:order-2")}>
        <p className="flex items-center gap-2 text-sm font-semibold text-ink/50">
          {icon}
          {eyebrow}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {title}
        </h3>
        <div className="mt-4 flex flex-col gap-4 text-base text-ink/70">{children}</div>
      </div>
    </div>
  );
}

export function ProductShowcaseSection() {
  return (
    <section id="produto" className="scroll-mt-24 py-20 sm:py-28">
      <Container className="flex flex-col gap-16 sm:gap-24">
        <SectionHeading
          eyebrow="O produto, sem enrolação"
          title="Telas reais, do jeito que você vai usar todo dia"
          description="A interface real do Croniu, com dados fictícios criados só para esta demonstração."
        />

        <ShowcaseRow
          eyebrow="Clientes"
          icon={<IconUsers width={18} height={18} />}
          title="Quem você atende, com o próximo passo à vista"
          media={
            <ProductCrop
              src="/images/demo/clientes.png"
              alt="Lista de clientes do Croniu: Ana Ferreira, Diego Farias, Helena Duarte, Rafael Nunes e Camila Rocha, cada um com a situação do ciclo ao lado"
              naturalWidth={3024}
              naturalHeight={1800}
              crop={CLIENTES_CROP}
              cropMobile={CLIENTES_CROP_MOBILE}
              screen="Croniu · Clientes"
              containerWidth={CROP_CONTAINER}
              containerWidthMobile={CROP_CONTAINER_MOBILE}
            />
          }
        >
          <p>
            Cada pessoa aparece com a situação do acompanhamento ao lado do nome. Quem está sem
            ciclo preparado não se perde no meio da lista — aparece marcado, junto dos demais.
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
        </ShowcaseRow>

        <ShowcaseRow
          eyebrow="Agenda"
          icon={<IconCalendar width={18} height={18} />}
          title="O dia na ordem em que ele acontece"
          mediaSide="end"
          media={
            <ProductCrop
              src="/images/demo/agenda.png"
              alt="Compromissos do dia na agenda do Croniu: quatro atendimentos entre 09:00 e 19:30, cada um com estúdio, situação e tipo de acompanhamento"
              naturalWidth={3024}
              naturalHeight={1800}
              crop={AGENDA_CROP}
              cropMobile={AGENDA_CROP_MOBILE}
              screen="Croniu · Agenda"
              containerWidth={CROP_CONTAINER}
              containerWidthMobile={CROP_CONTAINER_MOBILE}
            />
          }
        >
          <p>
            Os atendimentos do dia ficam em uma lista só, na sequência das horas, com quem é e o
            que é cada um. Nada de conferir três lugares para saber se às 16h você está livre.
          </p>
          <p>Cada compromisso no horário certo, sem conflito.</p>
        </ShowcaseRow>

        <ShowcaseRow
          eyebrow="Ciclos"
          icon={<IconRefresh width={18} height={18} />}
          title="A renovação aparece antes de virar problema"
          media={
            <ProductCrop
              src="/images/demo/ciclos.png"
              alt="Ciclos em andamento no Croniu: Ana Ferreira com renovação em 18 set e 10 de 12 aulas, Diego Farias com renovação em 22 set e 9 de 12 aulas"
              naturalWidth={3024}
              naturalHeight={1800}
              crop={CICLOS_CROP}
              cropMobile={CICLOS_CROP_MOBILE}
              screen="Croniu · Ciclos"
              containerWidth={CROP_CONTAINER}
              containerWidthMobile={CROP_CONTAINER_MOBILE}
            />
          }
        >
          <p>
            Período, aulas feitas, valor e data de renovação de cada cliente ficam à vista. Você
            descobre que um ciclo está acabando pela tela, não pelo cliente perguntando.
          </p>
          <p>Planos e renovações deixam de depender da sua memória.</p>
        </ShowcaseRow>
      </Container>
      <SectionViewTracker featureId="home_product_showcase" />
    </section>
  );
}
