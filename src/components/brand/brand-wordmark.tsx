import { cn } from "@/lib/cn";

const SIZE_CLASSES = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl",
} as const;

type BrandWordmarkProps = {
  size?: keyof typeof SIZE_CLASSES;
  /** "dark" is for use over navy/dark section backgrounds (header, hero, footer-on-dark). */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Wordmark homologado: "Cron" em negrito + "iu" com degradê da marca.
 * Nome acessível permanece "Croniu" via role="img" + aria-label.
 */
export function BrandWordmark({ size = "md", tone = "light", className }: BrandWordmarkProps) {
  const isDark = tone === "dark";
  return (
    <span
      role="img"
      aria-label="Croniu"
      className={cn("inline-flex items-baseline font-display tracking-tight", SIZE_CLASSES[size], className)}
    >
      <span aria-hidden="true" className={cn("font-bold", isDark ? "text-white" : "text-ink")}>
        Cron
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "font-bold bg-gradient-to-r bg-clip-text text-transparent",
          isDark ? "from-brand-200 to-ai-200" : "from-[var(--color-wordmark-from)] to-[var(--color-wordmark-to)]",
        )}
      >
        iu
      </span>
    </span>
  );
}
