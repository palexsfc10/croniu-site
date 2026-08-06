import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  it("renders as a link when href is provided", () => {
    render(<Button href="/register">Começar grátis</Button>);
    const link = screen.getByRole("link", { name: "Começar grátis" });
    expect(link).toHaveAttribute("href", "/register");
  });

  it("renders as a native button when no href is provided", () => {
    render(<Button type="button">Confirmar</Button>);
    expect(screen.getByRole("button", { name: "Confirmar" })).toBeInTheDocument();
  });

  it("renders external absolute URLs as plain anchors", () => {
    render(<Button href="https://app.croniu.com.br/login">Entrar</Button>);
    const link = screen.getByRole("link", { name: "Entrar" });
    expect(link).toHaveAttribute("href", "https://app.croniu.com.br/login");
  });
});
