import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { LpConsolidationSection } from "./lp-consolidation-section";

describe("LpConsolidationSection", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the exact title", () => {
    render(<LpConsolidationSection />);
    expect(
      screen.getByRole("heading", { name: "Tudo que hoje está espalhado, agora em um só lugar" }),
    ).toBeInTheDocument();
  });

  it("renders the four benefit items with their exact copy", () => {
    render(<LpConsolidationSection />);
    expect(screen.getByText("WhatsApp")).toBeInTheDocument();
    expect(screen.getByText("Convites, contato e portal do aluno.")).toBeInTheDocument();
    expect(screen.getByText("Planilhas")).toBeInTheDocument();
    expect(screen.getByText("Alunos, ciclos, renovações e recebimentos.")).toBeInTheDocument();
    expect(screen.getByText("Agenda")).toBeInTheDocument();
    expect(screen.getByText("Compromissos, rotinas e avaliações.")).toBeInTheDocument();
    expect(screen.getByText("Croniu")).toBeInTheDocument();
    expect(screen.getByText("Uma visão clara de todo o seu trabalho.")).toBeInTheDocument();
  });
});
