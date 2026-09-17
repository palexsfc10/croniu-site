import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const ORIGINAL_ENV = process.env.NEXT_PUBLIC_AI_ACTION_DEMOS;

async function loadAiDarkSection() {
  vi.resetModules();
  const { AiDarkSection } = await import("./ai-dark-section");
  return AiDarkSection;
}

describe("AiDarkSection", () => {
  afterEach(() => {
    process.env.NEXT_PUBLIC_AI_ACTION_DEMOS = ORIGINAL_ENV;
  });

  it("shows the 'Como está meu dia?' flow with data from the operation", async () => {
    process.env.NEXT_PUBLIC_AI_ACTION_DEMOS = "false";
    const AiDarkSection = await loadAiDarkSection();
    render(<AiDarkSection />);

    expect(screen.getByText(/Como está meu dia\?/i)).toBeInTheDocument();
    expect(screen.getByText(/ciclo termina em 3 dias/i)).toBeInTheDocument();
    expect(screen.getByText(/recebimento de Helena Duarte está vencido/i)).toBeInTheDocument();
  });

  it("shows the confirmation-required note when write demos are disabled", async () => {
    process.env.NEXT_PUBLIC_AI_ACTION_DEMOS = "false";
    const AiDarkSection = await loadAiDarkSection();
    render(<AiDarkSection />);

    expect(screen.getByText(/estão em desenvolvimento/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Confirmar" })).not.toBeInTheDocument();
  });

  it("shows the write-action confirmation demo when explicitly enabled", async () => {
    process.env.NEXT_PUBLIC_AI_ACTION_DEMOS = "true";
    const AiDarkSection = await loadAiDarkSection();
    render(<AiDarkSection />);

    expect(screen.getByText(/Renovar o ciclo de Ana Ferreira/i)).toBeInTheDocument();
    expect(screen.getByText(/Aguardando confirmação/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeInTheDocument();
  });
});
