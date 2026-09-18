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
  it("follows: solução imediata → rotina fragmentada → produto → Cronia → dispositivos → teste grátis", () => {
    const { container } = render(<PersonalTrainerLpPage />);
    const headings = Array.from(container.querySelectorAll("h1, h2")).map(
      (el) => el.textContent?.trim(),
    );

    const expectedOrder = [
      "Você cuida dos seus alunos. O Croniu organiza o restante.",
      "Entre uma aula e outra, a informação se espalha",
      "O Croniu, do jeito que ele é",
      "A Cronia consulta sua operação — e nunca age sozinha",
      "No computador para organizar. No celular para acompanhar.",
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
