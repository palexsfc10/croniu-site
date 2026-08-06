import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const VARIANT_CLASSES = {
  brand: "bg-brand-50 text-brand-700",
  ai: "bg-ai-50 text-ai-700",
  progress: "bg-progress-50 text-progress-700",
  neutral: "bg-ink/5 text-ink/70",
} as const;

export function Badge({
  children,
  variant = "brand",
  className,
}: {
  children: ReactNode;
  variant?: keyof typeof VARIANT_CLASSES;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
