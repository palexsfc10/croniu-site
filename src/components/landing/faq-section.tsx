"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconChevronDown } from "@/components/ui/icons";
import { trackFaqInteraction } from "@/lib/analytics/gtm";
import { formatPriceBRL, siteConfig } from "@/lib/site";

/**
 * `schemaAnswer` é o texto puro para o FAQPage JSON-LD — precisa bater com o
 * que a página mostra (exigência do Google para rich snippets), então
 * quando `answer` é JSX (com links), `schemaAnswer` traz a mesma resposta
 * em texto corrido.
 */
const FAQ_ITEMS = [
  {
    id: "computador_celular",
    question: "Funciona no computador e no celular?",
    answer:
      "Sim. O Croniu funciona direto no navegador, no computador ou no celular, sem precisar instalar nenhum aplicativo — a mesma conta, sempre sincronizada.",
  },
  {
    id: "cartao_credito",
    question: `Preciso de cartão de crédito para testar?`,
    answer: `Não. Você começa os ${siteConfig.trialDays} dias de teste grátis sem informar cartão de crédito.`,
  },
  {
    id: "fim_teste_gratis",
    question: "O que acontece quando o teste grátis termina?",
    answer: `Para continuar usando, a assinatura passa a ser cobrada em ${formatPriceBRL()} por mês, referente à sua conta de profissional.`,
  },
  {
    id: "cancelamento",
    question: "Posso cancelar quando quiser?",
    answer: (
      <>
        Sim. Basta escrever para{" "}
        <a href={`mailto:${siteConfig.supportEmail}`} className="font-semibold text-brand-700 underline underline-offset-2">
          {siteConfig.supportEmail}
        </a>{" "}
        ou pelo WhatsApp {siteConfig.supportWhatsapp}. Seu acesso segue disponível até o fim do período já
        pago. Veja os detalhes completos nos{" "}
        <Link href="/termos" className="font-semibold text-brand-700 underline underline-offset-2">
          Termos de Uso
        </Link>
        .
      </>
    ),
    schemaAnswer: `Sim. Basta escrever para ${siteConfig.supportEmail} ou pelo WhatsApp ${siteConfig.supportWhatsapp}. Seu acesso segue disponível até o fim do período já pago.`,
  },
  {
    id: "cobranca_automatica",
    question: "O Croniu cobra os meus clientes automaticamente?",
    answer:
      "Não. O Croniu ajuda você a acompanhar recebimentos e vencimentos, mas a cobrança dos seus clientes finais continua sendo feita por você, fora da plataforma.",
  },
  {
    id: "portal_cliente",
    question: "Meus clientes precisam criar conta para acompanhar o progresso?",
    answer:
      "Não. Cada cliente pode receber um link próprio para acompanhar o andamento do ciclo, sem precisar criar conta ou senha.",
  },
  {
    id: "ia_altera_dados",
    question: "A IA consegue alterar dados sozinha?",
    answer:
      "A IA responde perguntas com dados reais da sua conta (ciclos, recebimentos, agenda). Ações que mudam algo na sua operação sempre exigem sua confirmação explícita antes de acontecer.",
  },
  {
    id: "tipos_atendimento",
    question: "O Croniu funciona para qualquer tipo de atendimento recorrente?",
    answer:
      "Foi desenhado para profissionais autônomos com clientes recorrentes em ciclos — aulas, sessões e atendimentos que se repetem, como dança, artes marciais, música, idiomas, reforço escolar, pilates, yoga e treinamento esportivo.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.schemaAnswer ?? (typeof item.answer === "string" ? item.answer : ""),
    },
  })),
};

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="duvidas" className="py-20 sm:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Container className="flex flex-col gap-14">
        <SectionHeading eyebrow="Dúvidas frequentes" title="Perguntas que você pode estar se fazendo" />

        <div className="mx-auto flex w-full max-w-2xl flex-col divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-white">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => {
                    trackFaqInteraction({ question_id: item.id, action: isOpen ? "close" : "open" });
                    setOpenIndex(isOpen ? null : index);
                  }}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-medium text-ink">{item.question}</span>
                  <IconChevronDown
                    width={18}
                    height={18}
                    className={`shrink-0 text-ink/50 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen ? (
                  <div id={panelId} role="region" aria-labelledby={buttonId} className="px-6 pb-5 text-sm text-ink/70">
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
