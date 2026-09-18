import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge } from "./badge";

export function SectionHeading({
  eyebrow,
  eyebrowVariant = "brand",
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  eyebrowVariant?: "brand" | "ai" | "progress" | "neutral";
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  /** "dark" flips text colors for use on navy/dark section backgrounds. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <Badge variant={eyebrowVariant}>{eyebrow}</Badge> : null}
      <h2
        className={cn(
          "font-display text-3xl font-semibold tracking-tight sm:text-4xl",
          isDark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("text-base sm:text-lg", isDark ? "text-white/70" : "text-ink/70")}>{description}</p>
      ) : null}
    </div>
  );
}
