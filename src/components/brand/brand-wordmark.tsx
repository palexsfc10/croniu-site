import { cn } from "@/lib/cn";

const SIZE_CLASSES = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-6xl",
} as const;

type BrandWordmarkProps = {
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
};

/**
 * Wordmark homologado: "Cron" em negrito + "iu" com degradê da marca.
 * Nome acessível permanece "Croniu" via role="img" + aria-label.
 */
export function BrandWordmark({ size = "md", className }: BrandWordmarkProps) {
  return (
    <span
      role="img"
      aria-label="Croniu"
      className={cn("inline-flex items-baseline font-display tracking-tight", SIZE_CLASSES[size], className)}
    >
      <span aria-hidden="true" className="font-bold text-ink">
        Cron
      </span>
      <span
        aria-hidden="true"
        className="font-bold bg-gradient-to-r from-[var(--color-wordmark-from)] to-[var(--color-wordmark-to)] bg-clip-text text-transparent"
      >
        iu
      </span>
    </span>
  );
}
