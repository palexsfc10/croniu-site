import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen } from "@testing-library/react";
import { ScatteredRoutineDemo } from "./scattered-routine-demo";

let observerCallback: IntersectionObserverCallback = () => {};
const disconnect = vi.fn();

function stubMatchMedia(reduced: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: reduced,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

beforeEach(() => {
  disconnect.mockClear();
  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn().mockImplementation(function (this: unknown, callback: IntersectionObserverCallback) {
      observerCallback = callback;
      return { observe: vi.fn(), disconnect, unobserve: vi.fn() };
    }),
  );
  stubMatchMedia(false);
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

function converge() {
  act(() => {
    observerCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
  });
}

describe("ScatteredRoutineDemo", () => {
  it("renders the six default routine signals, each shown twice (desktop cloud + mobile list)", () => {
    render(<ScatteredRoutineDemo />);
    expect(screen.getAllByText("Mensagem no WhatsApp")).toHaveLength(2);
    expect(screen.getAllByText("Ciclo perto de renovar")).toHaveLength(2);
  });

  it("starts scattered (offset, visible) and stops observing once converged", () => {
    render(<ScatteredRoutineDemo />);
    const card = screen.getByTestId("signal-card-mensagem");
    expect(card.style.opacity).toBe("1");
    expect(card.style.transform).toContain("-15.5rem");
    expect(card.dataset.dissolved).toBe("false");

    converge();
    expect(disconnect).toHaveBeenCalled();
  });

  it("converges by approaching the center and dissolving (opacity 0) — never stacks opaque on top of the screen", () => {
    render(<ScatteredRoutineDemo />);
    const card = screen.getByTestId("signal-card-mensagem");

    converge();

    expect(card.dataset.dissolved).toBe("true");
    expect(card.style.opacity).toBe("0");
    // Aproxima do centro (-50%,-50%) e encolhe — nunca fica opaco em cima da tela.
    expect(card.style.transform).toBe("translate(-50%, -50%) scale(0.55)");
  });

  it("under prefers-reduced-motion, stays scattered and visible instead of dissolving", () => {
    stubMatchMedia(true);
    render(<ScatteredRoutineDemo />);
    const card = screen.getByTestId("signal-card-mensagem");

    converge();

    expect(card.dataset.dissolved).toBe("false");
    expect(card.style.opacity).toBe("1");
    expect(card.style.transition).toBe("none");
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
