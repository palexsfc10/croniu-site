import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import HomePage from "./page";

vi.mock("@/lib/analytics/gtm", () => ({
  trackCtaClick: vi.fn(),
  trackSignUpStart: vi.fn(),
  trackLoginStart: vi.fn(),
  trackFeatureView: vi.fn(),
  trackFaqInteraction: vi.fn(),
  trackPricingView: vi.fn(),
  isGtmEnabled: () => false,
}));

/**
 * Only asserts the narrative order (solução imediata → rotina fragmentada →
 * demonstrações → Cronia → dispositivos → prova/oferta/CTA final) — content
 * of each section is covered by that section's own test file.
 */
describe("HomePage narrative order", () => {
  it("follows the seven-block structure", () => {
    const { container } = render(<HomePage />);
    const headings = Array.from(container.querySelectorAll("h1, h2")).map((el) => el.textContent?.trim());

    const expectedOrder = [
      "Sua rotina profissional, sob controle.",
      "A rotina continua acontecendo — só que espalhada",
      "Telas reais, do jeito que você vai usar todo dia",
      "Pergunte como está o seu dia",
      "No computador para organizar. No celular para acompanhar.",
      "Um plano, sem letras miúdas",
      "Perguntas que você pode estar se fazendo",
      "Comece a organizar sua rotina hoje",
    ];

    const indexes = expectedOrder.map((title) => headings.indexOf(title));
    expect(indexes).not.toContain(-1);
    const sorted = [...indexes].sort((a, b) => a - b);
    expect(indexes).toEqual(sorted);
  });
});
