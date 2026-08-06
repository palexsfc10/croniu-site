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

  it("only surfaces verified read-only data types by default", async () => {
    process.env.NEXT_PUBLIC_AI_ACTION_DEMOS = "false";
    const AiDarkSection = await loadAiDarkSection();
    render(<AiDarkSection />);

    expect(screen.getByText(/ciclos estão terminando/i)).toBeInTheDocument();
    expect(screen.getByText(/recebimentos pendentes/i)).toBeInTheDocument();
    expect(screen.getByText(/tenho hoje na agenda/i)).toBeInTheDocument();
  });

  it("shows the confirmation-required note when write demos are disabled", async () => {
    process.env.NEXT_PUBLIC_AI_ACTION_DEMOS = "false";
    const AiDarkSection = await loadAiDarkSection();
    render(<AiDarkSection />);

    expect(screen.getByText(/estão em desenvolvimento/i)).toBeInTheDocument();
    expect(screen.queryByText(/Renova o ciclo da Ana Ferreira/i)).not.toBeInTheDocument();
  });

  it("shows the extended write-action demo when explicitly enabled", async () => {
    process.env.NEXT_PUBLIC_AI_ACTION_DEMOS = "true";
    const AiDarkSection = await loadAiDarkSection();
    render(<AiDarkSection />);

    expect(screen.getByText(/Renova o ciclo da Ana Ferreira/i)).toBeInTheDocument();
    expect(screen.getByText(/confirmação explícita/i)).toBeInTheDocument();
  });
});
