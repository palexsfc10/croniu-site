import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { LpAssistantSection } from "./lp-assistant-section";

vi.mock("@/lib/analytics/gtm", () => ({
  trackFeatureView: vi.fn(),
}));

describe("LpAssistantSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("still leads with the Cronia headline and real screenshot", () => {
    render(<LpAssistantSection />);
    expect(
      screen.getByRole("heading", { name: /a cronia consulta sua operação/i }),
    ).toBeInTheDocument();
    expect(screen.getByAltText(/tela da cronia/i)).toBeInTheDocument();
  });

  it("now also shows the conversation example repositioned from the hero", () => {
    render(<LpAssistantSection />);
    expect(
      screen.getByLabelText(/exemplo de conversa com o assistente/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/quais alunos têm ciclo terminando essa semana/i)).toBeInTheDocument();
  });
});
