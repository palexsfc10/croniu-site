import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type CropRect = {
  /** Distância da borda esquerda da captura original, em % da largura. */
  left: number;
  /** Distância do topo da captura original, em % da altura. */
  top: number;
  /** Largura da região visível, em % da largura da captura original. */
  width: number;
  /** Altura da região visível, em % da altura da captura original. */
  height: number;
};

type ProductCropProps = {
  src: string;
  alt: string;
  /** Dimensões reais do arquivo de origem, em pixels. */
  naturalWidth: number;
  naturalHeight: number;
  /** Região exibida do `lg` para cima. */
  crop: CropRect;
  /**
   * Região exibida abaixo do `lg`. A origem é a captura de um monitor de
   * 3024px: o recorte de desktop espremido na largura de um celular volta a
   * ~0,2× de escala, ou seja, ilegível de novo. O recorte de celular mostra
   * **menos itens e menos largura** — o lado direito dessas telas é espaço
   * vazio e distintivos que o texto da seção já afirma, então nada essencial
   * se perde. Sem ele, o recorte de desktop vale para as duas larguras.
   */
  cropMobile?: CropRect;
  /**
   * Nome da tela de onde o recorte saiu ("Croniu · Agenda"). Sem ele o
   * recorte perde a moldura do produto e passa a parecer mais um cartão do
   * próprio site. A faixa não simula uma janela inteira — ela só nomeia a
   * origem, que é o que o recorte pode afirmar com honestidade.
   */
  screen?: string;
  /** Largura CSS do **contêiner** do recorte no desktop, ex. `"520px"`. */
  containerWidth: string;
  /** Largura CSS do **contêiner** do recorte no celular, ex. `"(100vw - 32px)"`. */
  containerWidthMobile: string;
  /**
   * Capturas com texto de interface precisam de qualidade alta — o padrão 75
   * do Next borra letra miúda. Só 92 está liberado em `next.config.ts`
   * (`images.qualities`); qualquer outro valor é silenciosamente aproximado.
   */
  quality?: number;
  priority?: boolean;
  className?: string;
};

/**
 * O recorte amplia a origem por `100 / crop.width`, então `sizes` precisa
 * descrever a largura da **imagem inteira**, não a do contêiner. Escrito com
 * a largura do contêiner, o Next entrega um arquivo pequeno demais e o texto
 * da interface sai borrado.
 */
function imageSizeFor(crop: CropRect, containerWidth: string): string {
  return `calc(${containerWidth} * ${(100 / crop.width).toFixed(3)})`;
}

/**
 * Mostra **uma região ampliada** de uma captura real do Croniu, em vez da
 * janela inteira reduzida. A captura de origem é um print de viewport do
 * produto: exibida por completo dentro de uma coluna de site ela fica com
 * texto de ~6px, áreas vazias grandes e a última linha cortada no meio pelo
 * próprio limite do viewport — o recorte resolve os três de uma vez, porque
 * enquadra de propósito a parte que sustenta a afirmação da seção.
 *
 * Os pixels da captura nunca são alterados: o enquadramento é só CSS
 * (`overflow-hidden` + imagem ampliada e deslocada, ver `.croniu-crop` em
 * globals.css), então não existe um segundo arquivo derivado para manter em
 * sincronia com o produto.
 */
export function ProductCrop({
  src,
  alt,
  naturalWidth,
  naturalHeight,
  crop,
  cropMobile,
  screen,
  containerWidth,
  containerWidthMobile,
  quality = 92,
  priority = false,
  className,
}: ProductCropProps) {
  const mobile = cropMobile ?? crop;

  // Proporção de cada enquadramento, para o contêiner reservar altura antes
  // de a imagem chegar (sem salto de layout).
  const ratio = (rect: CropRect) =>
    `${naturalWidth * rect.width} / ${naturalHeight * rect.height}`;

  const cropVars = {
    "--crop-left-lg": crop.left,
    "--crop-top-lg": crop.top,
    "--crop-width-lg": crop.width,
    "--crop-height-lg": crop.height,
    "--crop-ratio-lg": ratio(crop),
    "--crop-left-sm": mobile.left,
    "--crop-top-sm": mobile.top,
    "--crop-width-sm": mobile.width,
    "--crop-height-sm": mobile.height,
    "--crop-ratio-sm": ratio(mobile),
  } as CSSProperties;

  return (
    <div
      className={cn(
        "croniu-crop overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-xl",
        className,
      )}
      style={cropVars}
    >
      {screen ? (
        <p className="flex items-center gap-2 border-b border-ink/10 bg-ink/[0.03] px-4 py-2.5 text-xs font-semibold tracking-wide text-ink/50">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
          {screen}
        </p>
      ) : null}

      <div className="croniu-crop-window relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={naturalWidth}
          height={naturalHeight}
          sizes={`(min-width: 1024px) ${imageSizeFor(crop, containerWidth)}, ${imageSizeFor(mobile, containerWidthMobile)}`}
          quality={quality}
          priority={priority}
          className="croniu-crop-image absolute max-w-none"
        />
      </div>
    </div>
  );
}
