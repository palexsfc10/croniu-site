import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge } from "./badge";

export function SectionHeading({
  eyebrow,
  eyebrowVariant = "brand",
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  eyebrowVariant?: "brand" | "ai" | "progress" | "neutral";
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <Badge variant={eyebrowVariant}>{eyebrow}</Badge> : null}
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description ? <p className="text-base text-ink/70 sm:text-lg">{description}</p> : null}
    </div>
  );
}
