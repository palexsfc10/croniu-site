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

  it("matches the Meta Ads campaign's pain point exactly — eyebrow, H1, subtitle", () => {
    render(<LpHeroSection />);
    expect(screen.getByText("PARA PERSONAL TRAINERS")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Seu trabalho está espalhado entre WhatsApp, planilhas e agenda?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Centralize sua rotina e acompanhe cada aluno com mais clareza."),
    ).toBeInTheDocument();
  });

  it("renders the CTA text and microcopy exactly, pointing at app.croniu.com.br/register", () => {
    render(<LpHeroSection />);
    const link = screen.getByRole("link", { name: /Começar grátis por 7 dias/ });
    expect(link).toHaveAttribute("href", "https://app.croniu.com.br/register");
    expect(
      screen.getByText("Sem cartão de crédito. Funciona no computador e no celular."),
    ).toBeInTheDocument();
  });

  it("shows real product screenshots (desktop and mobile), not a recreated dashboard", () => {
    render(<LpHeroSection />);
    const desktop = screen.getByAltText(/tela inicial do croniu no computador/i);
    const mobile = screen.getByAltText(/tela inicial do croniu no celular/i);
    expect(desktop).toHaveAttribute("src", expect.stringContaining("home-desktop.png"));
    expect(mobile).toHaveAttribute("src", expect.stringContaining("home-mobile.png"));
  });

  it("no longer shows the AI conversation demo — that moved to LpAssistantSection", () => {
    render(<LpHeroSection />);
    expect(
      screen.queryByLabelText(/exemplo de conversa com o assistente/i),
    ).not.toBeInTheDocument();
  });

  it("shows the WhatsApp + Planilhas + Agenda → Croniu transition labels", () => {
    render(<LpHeroSection />);
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Planilhas")).toBeInTheDocument();
    expect(screen.getByText("Agenda")).toBeInTheDocument();
    expect(screen.getByText("Croniu")).toBeInTheDocument();
  });
});
