import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomePage from "./page";

describe("HomePage", () => {
  it("shows the maintenance notice without legacy calls to action", () => {
    render(<HomePage />);

    expect(screen.getByRole("img", { name: "CRONIU Labs" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Estamos preparando uma nova experiência." })).toBeInTheDocument();
    expect(screen.getByText("Nosso site está em manutenção. Em breve, novidades.")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
