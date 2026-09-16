import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductDemo } from "./product-demo";

/**
 * jsdom não implementa IntersectionObserver nem matchMedia, e é justamente
 * neles que o player decide se toca sozinho. Os stubs abaixo mantêm o
 * componente no estado pausado/manual, que é o caminho que importa testar:
 * capítulos navegáveis e conteúdo legível sem depender de animação.
 */
beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      observe() {}
      disconnect() {}
      unobserve() {}
    },
  );

  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    onchange: null,
  }));
});

describe("ProductDemo", () => {
  it("renders every chapter as a control", () => {
    render(<ProductDemo />);

    for (const chapter of ["Início", "Agenda", "Clientes", "Ciclos", "Financeiro", "Cronia"]) {
      expect(screen.getByRole("button", { name: chapter })).toBeInTheDocument();
    }
  });

  it("starts on the first scene and marks it as current", () => {
    render(<ProductDemo />);

    expect(screen.getByRole("button", { name: "Início" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByText(/o dia inteiro em uma tela/i)).toBeInTheDocument();
  });

  it("jumps to the chosen chapter and updates the caption", async () => {
    const user = userEvent.setup();
    render(<ProductDemo />);

    await user.click(screen.getByRole("button", { name: "Financeiro" }));

    expect(screen.getByRole("button", { name: "Financeiro" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByText(/sem planilha paralela/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Início" })).not.toHaveAttribute("aria-current");
  });

  it("keeps every screenshot in the DOM with a descriptive alt", () => {
    render(<ProductDemo />);

    // Todas as cenas ficam montadas para o crossfade — e, com isso, nenhuma
    // informação depende da animação ter rodado.
    expect(screen.getAllByRole("img", { hidden: true })).toHaveLength(6);
    expect(
      screen.getByRole("img", { name: /agenda semanal do croniu/i, hidden: true }),
    ).toBeInTheDocument();
  });

  it("exposes a play control that toggles to pause", async () => {
    const user = userEvent.setup();
    render(<ProductDemo />);

    const play = screen.getByRole("button", { name: /reproduzir demonstração/i });
    await user.click(play);

    expect(screen.getByRole("button", { name: /pausar demonstração/i })).toBeInTheDocument();
  });
});
