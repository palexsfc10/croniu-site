import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AiDarkSection } from "./ai-dark-section";

describe("AiDarkSection", () => {
  it("shows the 'Como está meu dia?' flow with data from the operation", () => {
    render(<AiDarkSection />);

    expect(screen.getByText(/Como está meu dia\?/i)).toBeInTheDocument();
    expect(screen.getByText(/ciclo termina em 3 dias/i)).toBeInTheDocument();
    expect(screen.getByText(/recebimento de Helena Duarte está vencido/i)).toBeInTheDocument();
  });

  it("shows the write-action confirmation — live in production, not a future promise", () => {
    render(<AiDarkSection />);

    expect(screen.getByText(/Renovar o ciclo de Ana Ferreira/i)).toBeInTheDocument();
    expect(screen.getByText(/Aguardando confirmação/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeInTheDocument();
    expect(screen.queryByText(/em desenvolvimento/i)).not.toBeInTheDocument();
  });
});
