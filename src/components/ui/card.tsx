import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-ink/10 bg-white p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}
