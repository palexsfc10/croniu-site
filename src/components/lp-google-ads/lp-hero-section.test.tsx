import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { LpHeroSection } from "./lp-hero-section";

vi.mock("@/lib/analytics/gtm", () => ({
  trackCtaClick: vi.fn(),
  trackSignUpStart: vi.fn(),
  trackLoginStart: vi.fn(),
}));

describe("LpHeroSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the personal-trainer eyebrow, H1 and subtitle", () => {
    render(<LpHeroSection />);
    expect(screen.getByText("GESTÃO PARA PERSONAL TRAINERS")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Você cuida dos seus alunos. O Croniu organiza o restante.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Centralize alunos, agenda, ciclos, avaliações e recebimentos em um único workspace — no computador ou no celular.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the CTA text and microcopy exactly, pointing at app.croniu.com.br/register", () => {
    render(<LpHeroSection />);
    const link = screen.getByRole("link", { name: /Testar grátis/ });
    expect(link).toHaveAttribute("href", "https://app.croniu.com.br/register");
    expect(screen.getByText("7 dias grátis. Sem cartão de crédito.")).toBeInTheDocument();
  });

  it("shows the editorial composition of the Croniu Workspace home screen", () => {
    render(<LpHeroSection />);
    expect(
      screen.getByRole("img", { name: /composição da tela inicial do croniu workspace/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Renovar o ciclo da Ana Ferreira")).toBeInTheDocument();
  });
});
