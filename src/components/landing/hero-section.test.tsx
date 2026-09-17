import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { HeroSection } from "./hero-section";

vi.mock("@/lib/analytics/gtm", () => ({
  trackCtaClick: vi.fn(),
  trackSignUpStart: vi.fn(),
  trackLoginStart: vi.fn(),
}));

describe("HeroSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the eyebrow, H1 and subheadline", () => {
    render(<HeroSection />);
    expect(screen.getByText("Croniu Workspace")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Sua rotina profissional, sob controle." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Organize clientes, agenda, ciclos, avaliações e recebimentos em um único workspace.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the CTA pointing at app.croniu.com.br/register with the trial microcopy", () => {
    render(<HeroSection />);
    const link = screen.getByRole("link", { name: /Começar grátis/ });
    expect(link).toHaveAttribute("href", "https://app.croniu.com.br/register");
    expect(screen.getByText("7 dias grátis. Sem cartão de crédito.")).toBeInTheDocument();
  });

  it("shows the real Croniu Workspace home screen, not a recreated dashboard", () => {
    render(<HeroSection />);
    const demo = screen.getByAltText(/tela inicial do croniu workspace/i);
    expect(demo).toHaveAttribute("src", expect.stringContaining("inicio.png"));
  });
});
