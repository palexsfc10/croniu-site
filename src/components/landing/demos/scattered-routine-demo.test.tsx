import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ScatteredRoutineDemo } from "./scattered-routine-demo";

let observerCallback: IntersectionObserverCallback = () => {};
const disconnect = vi.fn();

beforeEach(() => {
  disconnect.mockClear();
  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn().mockImplementation(function (this: unknown, callback: IntersectionObserverCallback) {
      observerCallback = callback;
      return { observe: vi.fn(), disconnect, unobserve: vi.fn() };
    }),
  );
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("ScatteredRoutineDemo", () => {
  it("renders the six default routine signals, each shown twice (desktop cloud + mobile list)", () => {
    render(<ScatteredRoutineDemo />);
    expect(screen.getAllByText("Mensagem no WhatsApp")).toHaveLength(2);
    expect(screen.getAllByText("Ciclo perto de renovar")).toHaveLength(2);
  });

  it("converges (stops observing) once the section enters the viewport", () => {
    render(<ScatteredRoutineDemo />);
    const stage = screen.getByTestId("scattered-routine-stage");
    expect(stage).not.toHaveClass("croniu-scatter-converged");

    observerCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(disconnect).toHaveBeenCalled();
  });

  it("accepts a custom signal set (used by the personal-trainer LP)", () => {
    render(
      <ScatteredRoutineDemo
        signals={[
          {
            id: "custom",
            icon: <span />,
            label: "Sinal customizado",
            detail: "Detalhe",
            x: "0",
            y: "0",
            rotate: "0deg",
            delay: 0,
          },
        ]}
      />,
    );
    expect(screen.getAllByText("Sinal customizado")).toHaveLength(2);
  });
});
