import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import PersonalTrainerLpPage from "./page";

vi.mock("@/lib/analytics/gtm", () => ({
  trackCtaClick: vi.fn(),
  trackSignUpStart: vi.fn(),
  trackLoginStart: vi.fn(),
  trackFeatureView: vi.fn(),
  trackFaqInteraction: vi.fn(),
  isGtmEnabled: () => false,
}));

/**
 * Only asserts the narrative order (the thing the spec called out
 * explicitly) — content/copy of each section is covered by that section's
 * own test file.
 */
describe("PersonalTrainerLpPage narrative order", () => {
  it("follows: dor → solução centralizadora → provas reais → benefícios → Cronia/IA → teste grátis", () => {
    const { container } = render(<PersonalTrainerLpPage />);
    const headings = Array.from(container.querySelectorAll("h1, h2")).map(
      (el) => el.textContent?.trim(),
    );

    const expectedOrder = [
      "Seu trabalho está espalhado entre WhatsApp, planilhas e agenda?",
      "Tudo que hoje está espalhado, agora em um só lugar",
      "O Croniu, do jeito que ele é",
      "Gerenciar tudo de cabeça deixa de funcionar em algum ponto",
      "Uma lista clara do que precisa de decisão hoje",
      "Agenda, alunos, ciclos, renovações e financeiro",
      "Organize no computador. Resolva pelo celular.",
      "A Cronia consulta sua operação — e nunca age sozinha",
      "Três passos para organizar sua rotina",
      "Perguntas que você pode estar se fazendo",
      "Comece a organizar a sua agenda hoje",
    ];

    const indexes = expectedOrder.map((title) => headings.indexOf(title));
    expect(indexes).not.toContain(-1);
    const sorted = [...indexes].sort((a, b) => a - b);
    expect(indexes).toEqual(sorted);
  });
});
