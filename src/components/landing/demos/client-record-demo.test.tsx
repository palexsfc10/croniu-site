import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ClientRecordDemo } from "./client-record-demo";

describe("ClientRecordDemo", () => {
  it("shows the real 'Ciclo atual' and 'Avaliações' card labels from the client profile screen", () => {
    render(<ClientRecordDemo />);
    expect(screen.getByText("Ciclo atual")).toBeInTheDocument();
    expect(screen.getByText("Avaliações")).toBeInTheDocument();
    expect(
      screen.getByText("A última avaliação aparece aqui. O cliente só vê o que você publicar."),
    ).toBeInTheDocument();
  });

  it("never mentions workout plans/protocols — Croniu doesn't build or prescribe workouts", () => {
    render(<ClientRecordDemo />);
    const text = document.body.textContent ?? "";
    expect(text).not.toMatch(/plano de treino|protocolo|prescri[cç][aã]o/i);
  });
});
