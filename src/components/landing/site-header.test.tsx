import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  it("links primary CTA to the app register page", () => {
    render(<SiteHeader />);
    const ctas = screen.getAllByRole("link", { name: "Começar grátis" });
    expect(ctas[0]).toHaveAttribute("href", "https://app.croniu.com.br/register");
  });

  it("links login CTA to the app login page", () => {
    render(<SiteHeader />);
    const logins = screen.getAllByRole("link", { name: "Entrar" });
    expect(logins[0]).toHaveAttribute("href", "https://app.croniu.com.br/login");
  });

  it("toggles the mobile menu", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    expect(screen.queryByRole("navigation", { name: "Navegação principal" })).toBeInTheDocument();
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(document.getElementById("mobile-menu")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Fechar menu" }));
    expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
  });
});
