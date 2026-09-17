import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AgendaCycleDemo } from "./agenda-cycle-demo";

describe("AgendaCycleDemo", () => {
  it("shows the real agenda and ciclos screenshots, framed large (not compressed)", () => {
    render(<AgendaCycleDemo />);
    const agenda = screen.getByAltText(/agenda do dia no croniu/i);
    const cycles = screen.getByAltText(/ciclos em andamento no croniu/i);
    expect(agenda).toHaveAttribute("src", expect.stringContaining("agenda.png"));
    expect(cycles).toHaveAttribute("src", expect.stringContaining("ciclos.png"));
  });
});
