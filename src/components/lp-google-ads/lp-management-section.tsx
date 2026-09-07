"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconCalendar, IconRefresh, IconUsers, IconWallet } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { ProductScreenshot } from "./product-screenshot";
import { SectionViewTracker } from "./section-view-tracker";

const TABS = [
  {
    id: "agenda",
    label: "Agenda",
    icon: IconCalendar,
    src: "/images/lp-personal-trainer/agenda.png",
    width: 1624,
    height: 649,
    alt: "Agenda semanal do Croniu com os compromissos marcados por dia e horário",
  },
  {
    id: "alunos",
    label: "Alunos",
    icon: IconUsers,
    src: "/images/lp-personal-trainer/alunos-lista.png",
    width: 1914,
    height: 904,
    alt: "Lista de alunos do Croniu com colunas de atendimento, agenda, evolução, financeiro, renovação e atenção",
  },
  {
    id: "ciclos",
    label: "Ciclos e renovações",
    icon: IconRefresh,
    src: "/images/lp-personal-trainer/ciclo-plano.png",
    width: 1599,
    height: 469,
    alt: "Ciclo atual e plano de acompanhamento de um aluno, com status de renovação",
  },
  {
    id: "financeiro",
    label: "Financeiro",
    icon: IconWallet,
    src: "/images/lp-personal-trainer/financeiro.png",
    width: 1879,
    height: 901,
    alt: "Painel financeiro do Croniu com recebido no mês, previsto, vencidos e evolução do recebido",
  },
] as const;

export function LpManagementSection() {
  const [activeId, setActiveId] = useState<(typeof TABS)[number]["id"]>("agenda");
  const active = TABS.find((tab) => tab.id === activeId) ?? TABS[0];

  return (
    <section className="py-16 sm:py-24">
      <Container className="flex flex-col gap-10">
        <SectionHeading
          eyebrow="Tudo em um só lugar"
          title="Agenda, alunos, ciclos, renovações e financeiro"
          description="As mesmas telas reais que você vai usar todo dia — sem precisar alternar entre planilha, agenda de papel e WhatsApp."
        />

        <div className="mx-auto flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveId(tab.id)}
                aria-pressed={isActive}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-brand-700 bg-brand-700 text-white"
                    : "border-ink/10 bg-white text-ink/70 hover:border-ink/20",
                )}
              >
                <Icon width={16} height={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <ProductScreenshot
          key={active.id}
          src={active.src}
          alt={active.alt}
          width={active.width}
          height={active.height}
          className="mx-auto max-w-4xl"
        />
      </Container>
      <SectionViewTracker featureId="lp_ads_management" />
    </section>
  );
}
