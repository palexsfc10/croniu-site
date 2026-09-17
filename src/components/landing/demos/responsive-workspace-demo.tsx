import { IconMonitor, IconSmartphone } from "@/components/ui/icons";
import { WorkspaceHomeDemo } from "./workspace-home-demo";

/**
 * Mesma Home real do Croniu em dois enquadramentos — computador para
 * organizar, celular para acompanhar. Reaproveita WorkspaceHomeDemo nas duas
 * variantes em vez de duplicar o componente de screenshot.
 */
export function ResponsiveWorkspaceDemo() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink/60">
          <IconMonitor width={18} height={18} />
          Computador
        </p>
        <WorkspaceHomeDemo variant="desktop" animate={false} sizes="(min-width: 1024px) 611px, calc(100vw - 32px)" />
      </div>

      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-ink/60">
          <IconSmartphone width={18} height={18} />
          Celular
        </p>
        <WorkspaceHomeDemo variant="mobile" animate={false} sizes="280px" />
      </div>
    </div>
  );
}
