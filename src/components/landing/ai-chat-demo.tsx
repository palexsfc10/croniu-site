import { cn } from "@/lib/cn";
import { IconSparkles } from "@/components/ui/icons";

export type ChatExchange = {
  question: string;
  answer: string;
};

export function AiChatDemo({
  exchanges,
  variant = "light",
  className,
}: {
  exchanges: ChatExchange[];
  variant?: "light" | "dark";
  className?: string;
}) {
  const isDark = variant === "dark";

  return (
    <div
      role="group"
      aria-label="Exemplo de conversa com o assistente de IA do Croniu"
      className={cn(
        "flex w-full flex-col gap-4 rounded-3xl border p-5 shadow-lg sm:p-6",
        isDark
          ? "border-white/10 bg-white/[0.04] backdrop-blur"
          : "border-ink/10 bg-white",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-full",
            isDark ? "bg-ai-500/20 text-ai-300" : "bg-ai-50 text-ai-600",
          )}
        >
          <IconSparkles width={16} height={16} />
        </span>
        <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-ink")}>
          Assistente Croniu
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {exchanges.map((exchange) => (
          <div key={exchange.question} className="flex flex-col gap-2">
            <p
              className={cn(
                "self-end rounded-2xl rounded-br-md px-4 py-2 text-sm font-medium",
                isDark ? "bg-brand-600 text-white" : "bg-brand-700 text-white",
              )}
            >
              {exchange.question}
            </p>
            <p
              className={cn(
                "self-start rounded-2xl rounded-bl-md px-4 py-2.5 text-sm leading-relaxed",
                isDark ? "bg-white/10 text-white/90" : "bg-ink/[0.04] text-ink/80",
              )}
            >
              {exchange.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
