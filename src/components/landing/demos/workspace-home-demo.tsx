import { cn } from "@/lib/cn";
import { ProductScreenshot } from "@/components/ui/product-screenshot";

type WorkspaceHomeDemoProps = {
  variant?: "desktop" | "mobile";
  priority?: boolean;
  sizes?: string;
  className?: string;
  animate?: boolean;
};

/**
 * A Home real do Croniu Workspace — captura do produto real via
 * scripts/demo-harness (rota /app, dados fictícios de Marina Prado). É a
 * demonstração principal do site: aparece em grande destaque no hero da Home
 * e da /personal-trainer, e reaparece em miniatura como alvo de convergência
 * do ScatteredRoutineDemo.
 */
export function WorkspaceHomeDemo({
  variant = "desktop",
  priority = false,
  sizes,
  className,
  animate = true,
}: WorkspaceHomeDemoProps) {
  if (variant === "mobile") {
    return (
      <div className={cn("mx-auto w-full max-w-[240px]", animate && "croniu-rise-in", className)}>
        <ProductScreenshot
          src="/images/demo/inicio-mobile.png"
          alt="Tela inicial do Croniu no celular: prioridade do dia, próximo compromisso e resumo da rotina"
          width={1170}
          height={2532}
          quality={95}
          frame="phone"
          sizes={sizes ?? "240px"}
        />
      </div>
    );
  }

  return (
    <div className={cn("w-full", animate && "croniu-rise-in", className)}>
      <ProductScreenshot
        src="/images/demo/inicio.png"
        alt="Tela inicial do Croniu Workspace: itens que precisam de decisão hoje, resumo financeiro do mês, clientes ativos e próximo compromisso"
        width={3024}
        height={1800}
        priority={priority}
        quality={95}
        sizes={sizes ?? "(min-width: 1024px) 720px, calc(100vw - 32px)"}
      />
    </div>
  );
}
