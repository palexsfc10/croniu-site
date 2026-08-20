import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SiteHeader } from "@/components/landing/site-header";
import { SiteFooter } from "@/components/landing/site-footer";
import { legalConfig, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Condições de uso do Croniu, incluindo período de teste, cobrança e cancelamento.",
};

export default function TermosPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Container className="max-w-3xl py-16 sm:py-24">
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">Termos de Uso</h1>
          <p className="mt-3 text-sm text-ink/60">Última atualização: 19 de agosto de 2026.</p>

          <div className="mt-10 space-y-8 text-ink/80">
            <Section title="1. Sobre o Croniu">
              <p>
                O {siteConfig.name} é um serviço de gestão de rotina, clientes e ciclos de atendimento,
                oferecido por <strong>{legalConfig.legalName}</strong> (MEI), CNPJ{" "}
                <strong>{legalConfig.cnpj}</strong>, com sede em {legalConfig.addressLine}, CEP{" "}
                {legalConfig.cep} (&quot;{siteConfig.name}&quot;, &quot;nós&quot;), voltado a
                profissionais autônomos com clientes recorrentes. Ao criar uma conta, você concorda com
                estes Termos e com a nossa{" "}
                <Link href="/privacidade" className="font-semibold text-brand-700 underline underline-offset-2">
                  Política de Privacidade
                </Link>
                .
              </p>
            </Section>

            <Section title="2. Cadastro e responsabilidades do profissional">
              <p>
                Você é responsável por manter seus dados de cadastro corretos e atualizados, e por
                proteger sua senha. Ao cadastrar clientes no {siteConfig.name}, você atua como
                controlador desses dados perante a LGPD — ou seja, é sua responsabilidade ter base legal
                para coletar e tratar os dados dos seus próprios clientes (nome, contato, respostas de
                anamnese e demais informações que você registrar).
              </p>
            </Section>

            <Section title="3. Período de teste e cobrança">
              <p>
                Novas contas começam com um período de teste gratuito de {siteConfig.trialDays} dias. A
                primeira cobrança só ocorre ao final desse período, e você será avisado da data exata
                dentro do próprio {siteConfig.name} antes que isso aconteça. Após o teste, a assinatura é
                cobrada mensalmente pelo valor vigente no momento da contratação, processada pelo nosso
                parceiro de pagamentos (Asaas).
              </p>
              <p>
                Quando um desconto de indicação é aplicado no cadastro, ele permanece vinculado à conta
                enquanto a assinatura estiver ativa ou for reativada após um cancelamento. Esse desconto é
                uma condição comercial da sua conta — não é uma garantia de que o preço base do plano, ou
                o próprio produto, permanecerão inalterados para sempre.
              </p>
            </Section>

            <Section title="4. Cancelamento">
              <p>
                Você pode cancelar sua assinatura a qualquer momento entrando em contato pelo e-mail{" "}
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="font-semibold text-brand-700 underline underline-offset-2"
                >
                  {siteConfig.supportEmail}
                </a>{" "}
                ou pelo WhatsApp {siteConfig.supportWhatsapp}. Ao cancelar, seu acesso permanece
                disponível até o fim do período já pago, e seus dados são mantidos conforme descrito na
                nossa Política de Privacidade.
              </p>
            </Section>

            <Section title="5. Uso aceitável">
              <p>
                Você concorda em usar o {siteConfig.name} apenas para fins lícitos, e em não inserir no
                sistema dados que você não tenha o direito de tratar. Não é permitido tentar acessar dados
                de outras contas, sobrecarregar a plataforma deliberadamente, ou usar o assistente de IA
                para gerar conteúdo ilegal ou prejudicial a terceiros.
              </p>
            </Section>

            <Section title="6. Natureza do serviço — não substitui julgamento profissional">
              <p>
                O {siteConfig.name} é uma ferramenta de organização e gestão. Ele não prescreve treinos,
                exercícios, dietas ou avaliações físicas, e as sugestões do assistente de IA não
                substituem o julgamento técnico do profissional responsável pelo atendimento. Cabe a você,
                profissional, cumprir as normas do seu conselho de classe (quando aplicável) na condução
                do seu trabalho.
              </p>
            </Section>

            <Section title="7. Propriedade intelectual">
              <p>
                O {siteConfig.name}, sua marca e seu software são de propriedade de{" "}
                <strong>{legalConfig.ownerName}</strong>. Você mantém a propriedade sobre os dados que
                insere no sistema.
              </p>
            </Section>

            <Section title="8. Disponibilidade e suporte">
              <p>
                Fazemos esforços razoáveis para manter o serviço disponível, mas não garantimos operação
                ininterrupta. Manutenções programadas e eventuais indisponibilidades serão comunicadas
                quando possível.
              </p>
            </Section>

            <Section title="9. Limitação de responsabilidade">
              <p>
                O {siteConfig.name} não se responsabiliza por decisões profissionais tomadas com base nas
                informações organizadas na plataforma, nem por prejuízos decorrentes do uso indevido do
                serviço por terceiros com acesso não autorizado à sua conta.
              </p>
            </Section>

            <Section title="10. Alterações destes termos">
              <p>
                Podemos atualizar estes Termos para refletir mudanças no produto ou na legislação.
                Alterações relevantes serão comunicadas dentro do próprio {siteConfig.name} ou por e-mail
                antes de entrarem em vigor.
              </p>
            </Section>

            <Section title="11. Lei aplicável e foro">
              <p>
                Estes Termos são regidos pelas leis brasileiras. Fica eleito o foro da comarca de{" "}
                <strong>{legalConfig.forum}</strong> para dirimir eventuais controvérsias, com renúncia a
                qualquer outro, por mais privilegiado que seja.
              </p>
            </Section>

            <Section title="12. Contato">
              <p>
                Dúvidas sobre estes Termos podem ser enviadas para{" "}
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="font-semibold text-brand-700 underline underline-offset-2"
                >
                  {siteConfig.supportEmail}
                </a>{" "}
                ou pelo telefone/WhatsApp {siteConfig.supportWhatsapp}.
              </p>
            </Section>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed sm:text-base">{children}</div>
    </section>
  );
}
