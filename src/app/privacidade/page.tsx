import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o Croniu trata dados de profissionais e de seus clientes.",
};

export default function PrivacidadePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Política de Privacidade
          </h1>
          <p className="mt-3 text-sm text-ink/60">Última atualização: conteúdo em preparação.</p>

          <div className="mt-10 space-y-8 text-ink/80">
            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-ink">Conteúdo pendente</h2>
              <p>
                Esta página é um placeholder. O texto definitivo da Política de Privacidade — incluindo
                as bases legais de tratamento (LGPD), os dados coletados de profissionais e de seus
                clientes, os prazos de retenção e os canais para exercício de direitos do titular — será
                publicado antes do lançamento comercial do {siteConfig.name}.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-ink">O que já podemos afirmar</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  O {siteConfig.name} opera com isolamento por organização (multi-tenant): dados de um
                  profissional não são acessíveis por outro.
                </li>
                <li>
                  Os dados dos clientes de cada profissional pertencem à operação desse profissional e
                  são usados apenas para prestar o serviço a ele.
                </li>
                <li>Não vendemos dados de clientes a terceiros.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display text-xl font-semibold text-ink">Contato</h2>
              <p>
                Dúvidas sobre privacidade podem ser enviadas para o suporte informado no rodapé, quando
                disponível.
              </p>
            </section>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
