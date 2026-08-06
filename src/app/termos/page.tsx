import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { siteConfig, formatPriceBRL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do Croniu, incluindo período de teste e cobrança.",
};

export default function TermosPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Termos de Uso</h1>
          <p className="mt-3 text-sm text-ink/60">Última atualização: conteúdo em preparação.</p>

          <div className="mt-10 space-y-8 text-ink/80">
            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-ink">Conteúdo pendente</h2>
              <p>
                Esta página é um placeholder. O texto definitivo dos Termos de Uso — incluindo política
                de cancelamento, reembolso e regras completas de cobrança — está em preparação e será
                publicado antes do lançamento comercial do {siteConfig.name}.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-ink">O que já podemos afirmar</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  O cadastro inicia com {siteConfig.trialDays} dias de teste grátis, sem necessidade de
                  cartão de crédito.
                </li>
                <li>
                  Após o período de teste, a continuidade do uso é cobrada em {formatPriceBRL()} por mês
                  do profissional titular da conta.
                </li>
                <li>
                  O {siteConfig.name} não cobra automaticamente os clientes do profissional — a cobrança
                  dos clientes finais é de responsabilidade do próprio profissional, fora da plataforma.
                </li>
                <li>A política detalhada de cancelamento será publicada nesta página em breve.</li>
              </ul>
            </section>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
